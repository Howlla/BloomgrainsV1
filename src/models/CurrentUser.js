import { types} from 'mobx-state-tree'


export const CurrentUserModel = types.model('CurrentUserModel',{
    id: types.identifierNumber,
    name: types.maybeNull(types.string),
    is_verified: types.maybeNull(types.boolean),
    email: types.string
    // address:types.maybe(types.array)
})
