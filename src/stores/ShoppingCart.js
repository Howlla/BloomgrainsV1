import { types } from 'mobx-state-tree'
import { AddonModel } from '../models/Addon';
import { ProductModel } from '../models/Product';
// import {AddonModel} from '../models/Addon'
// groups: types.maybe(types.map(GroupModel))


export const ShoppingCartStore = types.model('ShoppingCartStore',{
    product:types.maybe(ProductModel),
    addons:types.optional(types.array(AddonModel),[]),
    // addons:types.maybe(types.map(AddonModel)),
    qty:types.optional(types.enumeration("qty",["1","2","5","10"]),'1')
}).views(self => ({ 
    get getWheat() { // B
        totalAddons = 0
        totalAddons = self.addons.reduce((sum,el) => (sum+el.percentage),0)
      return 100-totalAddons
    }
  }))
    .actions(self => ({
        setProduct(product){
        self.product=product
        self.product.isSelected=true
    },
    setQty(qty){
        self.qty=qty
    },
    setAddons(addons){
        self.addons=addons
    }
}))