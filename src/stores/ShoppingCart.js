import { types, getSnapshot,applySnapshot } from 'mobx-state-tree'
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
        const total=self.addons.reduce((sum,el) => (sum+el.percentage),0);
        if(total<100)
            return 100 -  total;
        else return 100
    },
    get getTotalPrice(){
       const basePrice = (self.product.kgPrice*self.qty)*self.getWheat/100;
    //    console.log(self.addons,"addons")
       const addonPrice = self.addons.reduce((sum,addon)=>(sum+Number(addon.price)),0)*self.qty
       return (basePrice+addonPrice).toFixed(2)
    }
  }))
    .actions(self => ({
        resetAddons(){
            self.addons.forEach(addon=>{
                addon.percentage=0;
            })
        },
        setProduct(product){
        self.product=product
        self.product.isSelected=true
    },
    setQty(qty){
        self.qty=qty
    },
    setAddons(addons){
        self.addons=addons
    },
    afterCreate () {
        // const initialState={}
        initialState = getSnapshot(self);
      },
      reset() {
        applySnapshot(self, initialState);
      },
}))