import { types} from 'mobx-state-tree'

import { UserAddressModel } from './UserAddresses';

export const CurrentUserModel = types.model('CurrentUserModel',{
    id: types.identifierNumber,
    name: types.maybeNull(types.string),
    is_verified: types.maybeNull(types.boolean),
    email: types.string,
    addresses:types.optional(types.array(UserAddressModel), []),
}).actions(self => ({
    verifyNumber(){
        self.is_verified=true
    }
}))
