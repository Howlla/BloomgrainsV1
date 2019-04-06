import {AsyncStorage} from 'react-native';
import {types,flow} from 'mobx-state-tree';

import {loginApi, baseApi,usersApi} from '../API/Api'
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
            // AsyncStorage.removeItem('token')
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
    signup:flow(function*(number,password){
        try{
            const res= yield usersApi.post({
                "user":{
                    // need to create seperate screen to update name later 
                    "name" : "JohnDoe",
                    "email":number,
                    "password":password,
		            "password_confirmation":password,
                }
            }).json(json => json)

            if(res.status==200){
                yield self.login(number,password);
            }
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
            // console.log("res",res)
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
                const res = yield usersApi.url('/me').headers({Authorization:`JWT ${self.authToken}`}).get()
                .json();
                console.log("UserInfo",res);
                self.info = res;
                console.log(self.info.is_verified,"here")
                if(self.info.is_verified!=false){
                    self.info.getUserAddresses();
                    NavigationService.navigate('Main')
                }

     
                // NavigationService.navigate('Main')
                else
                NavigationService.navigate('MobileAuth')
            }
        }catch(err){
            console.log(err)
        }
    }),
    startTwoFactor: flow(function*(){
        try{
            const res = yield usersApi.url('/start_verification').auth(`JWT ${self.authToken}`).get().json()
            if(res.success!==true){
                console.log("Failed mobile authentication navigate to splash")
                NavigationService.navigate('Splash')
            }
        }
        catch(err){
            console.log(err)
        }
    }),
    checkTwoFactor : flow(function*(code){
        try{
            const res= yield usersApi.url('/check_verification').auth(`JWT ${self.authToken}`).query({verification_code:code}).get().json();
             if(res.success==true){
                self.info.verifyNumber();
                NavigationService.navigate('Main')
            }
        }
        catch(err){
            console.log(err)
        }
    })
}))
