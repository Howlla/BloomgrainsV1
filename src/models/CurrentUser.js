import { types,flow } from 'mobx-state-tree';
import {loginApi} from '../API/Api'

import {AsyncStorage}from 'react-native';
import { NavigationService } from '../API/NavigationService';

const UserInfo = types.model('UserInfo',{
    _id: types.identifier,
    name: types.string,
    isVerified: types.boolean,
    phone: types.number,
    // address:types.array,
})

export const CurrentUser = types.model('CurrentUser', {
    authToken : types.maybe(types.string),
    info: types.maybe(UserInfo),
}).actions(self => ({
    setupAuth: flow(function*(){
        yield self.getAuthToken();
        yield self.getUserInfo();
    }),
    getAuthToken: flow(function*(){
        try{
            const token = yield AsyncStorage.getItem('token');
            if(token){
                self.authToken = token;
            }
            else{
                NavigationService.navigate('Auth')
            }
        }catch(err){
            console.log(err)
        }
    }),
    saveToken : flow(function*(token){
        try{
            yield AsyncStorage.setItem("token",token)
        }catch(err){
            console.log(err)
        }
    }),
    login: flow(function*(number,password){
        try{
            const res = yield LoginApi.post({
                // send object to backend for login
            }).json()
            //SAVE TOKEN IF FOUND IN RESPONSE
            if (res.token){
                self.authToken = res.jwt;
                yield self.saveToken(res.jwt)
                yield self.getUserInfo()
            }
        }catch(err){
            console.log(err)
        }
    }),
    getUserInfo: flow(function*(){
        try{
            if(self.authToken){
                //if token then use wretch to get info
                const res = yield loginApi.url('/me').headers({Authorization:`Bearer ${self.authToken}`}).get()
                .json();
                console.log(res);
                self.info = res;
                //check for isVerified
                // NavigationService.navigate('MobileAuth')
                NavigationService.navigate('Main')
            }
        }catch(err){
            console.log(err)
        }
    })
}))
