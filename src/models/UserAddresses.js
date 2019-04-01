import {types} from 'mobx-state-tree';

export const UserAddressModel = types.model({
    id:types.identifier,
    line1:types.string,
    line2:types.string,
    pin_code:types.string,
    user_id:types.string,
})