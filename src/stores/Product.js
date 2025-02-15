import {types }  from 'mobx-state-tree';

import { ProductModel } from '../models/Product';

export const ProductsStore = types.model('ProductsStore',{
    data: types.frozen(types.array(types.reference(ProductModel))),
})