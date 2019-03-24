import { types } from 'mobx-state-tree';

export const ProductModel = types.model('ProductModel',{
    id: types.identifier,
    name: types.enumeration("name",["Diamond","Platinum","Gold"]),
    kgPrice: types.number,
    photo: types.number,
    isSelected: types.maybe(types.boolean),
})