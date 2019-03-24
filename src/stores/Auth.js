import {AsyncStorage} from 'react-native';
import {types,flow} from 'mobx-state-tree';

import {loginApi, baseApi} from '../API/Api'
import {NavigationService} from '../API/NavigationService'
import {CurrentUserModel} from '../models/CurrentUser'

 
export const AuthStore = types.model('AuthStore', {
    authToken : types.maybe(types.string),
    info: types.maybe(CurrentUserModel),
}).actions(self => ({
    setupAuth: flow(function*(){
        yield self.getAuthToken();
        yield self.getUserInfo();
    }),
    getAuthToken: flow(function*(){
        try{
            const token = yield AsyncStorage.getItem('token');
            console.log("Token present in async",token)
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
            const res = yield loginApi.post({
                "auth":{
                    "email":number,
                    "password":password
                }
                // send object to backend for login
            }).json(json => json)
            console.log("res",res)
            //SAVE TOKEN IF FOUND IN RESPONSE
            if (res.jwt){
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
                const res = yield baseApi.url('/users/me').headers({Authorization:`JWT ${self.authToken}`}).get()
                .json();
                console.log("UserInfo",res);
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
