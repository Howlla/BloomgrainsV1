import { types, getParent,flow} from 'mobx-state-tree'

import { UserAddressModel } from './UserAddresses';
import {baseApi} from '../API/Api'

export const CurrentUserModel = types.model('CurrentUserModel',{
    id: types.identifierNumber,
    name: types.maybeNull(types.string),
    is_verified: types.maybeNull(types.boolean),
    email: types.string,
    addresses:types.optional(types.array(UserAddressModel), []),
}).views(self => ({
    get addressesIsEmpty(){
        return self.addresses.length==0;
    },
    get auth(){
        return getParent(self)
    }
}))
.actions(self => ({
    verifyNumber(){
        self.is_verified=true
    },
    createAddress:flow(function*(data){
        try{
            const res = yield baseApi
            .url('/addresses')
            .auth(`JWT ${self.auth.authToken}`)
            .post({"address":data})
            .json()
        }
        catch(err){
            throw err;
        }
    }),
    getUserAddresses: flow(function*(){
        try{
                const res = yield baseApi.url('/addresses/fetch').auth(`JWT ${self.auth.authToken}`).get()
                .json();
                self.addresses = res;
                console.log(self.addresses)
            
        }catch(err){
            console.log(err)
        }
    }),
}))
