import { types,flow , getSnapshot,applySnapshot } from 'mobx-state-tree'
import { AddonModel } from '../models/Addon';
import { ProductModel } from '../models/Product';
import { baseApi } from '../API/Api';
import { ordersApi } from '../API/Api';
import { UserAddressModel } from '../models/UserAddresses';
// import {AddonModel} from '../models/Addon'
// groups: types.maybe(types.map(GroupModel))



export const ShoppingCartStore = types.model('ShoppingCartStore',{
    product:types.maybe(ProductModel),
    addons:types.optional(types.array(AddonModel),[]),
    // addons:types.maybe(types.map(AddonModel)),
    qty:types.optional(types.enumeration("qty",["1","2","5","10"]),'1'),
    // Maybe should be 0 check karna
    selectedAddressID:types.optional(types.number,1)
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
        sendOrder: flow(function*(Token){
            try{
                const res= yield ordersApi.post({
                    "order":{
                        // need to create seperate screen to update name later 
                        "address_id" :self.selectedAddressID
                    },
                    "order_summary":{
                        "product_id":self.product.id,
                        "quantity":self.qty,
                        "add_ons":self.addons.reduce((str,el)=> {
                            return str+el.id+"$"+el.percentage+"#"},""),  //# seperated values of addons 1$3 first addon 3 percent
                        "payment_mode":"COD"
                    }
                }).auth(`JWT ${Token}`).json(json => json)
    
                if(res.status==200){
                    yield self.login(number,password);
                }
            }catch(err){
                console.log(err)
            }
            
        }),
        resetAddons(){
            self.addons.forEach(addon=>{
                addon.percentage=0;
            })
        },
        setProduct(product){
        self.product=product
        self.product.isSelected=true
    },
    setAddressForOrder(id){
        self.selectedAddressID=id
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