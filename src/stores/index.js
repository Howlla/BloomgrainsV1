import { AuthStore } from './Auth'
import { AddonsStore } from './Addon'
import { ShoppingCartStore } from './ShoppingCart'
import { ProductsStore} from './Product'
import { ProductModel } from '../models/Product';
import { AddonModel } from '../models/Addon';

const authStore = AuthStore.create()

const addonsStore = AddonsStore.create({
        data:[
            AddonModel.create({
                id:'1',
                name:'Millets',
                unityPrice:0.4,
                kgPrice:40,
                percentage:0,
                inCart:false
            }),
            AddonModel.create({
                id:'2',
                name:'Soyabean',
                unityPrice:0.7,
                kgPrice:70,
                percentage:0,
                inCart:false
            }),
            AddonModel.create({
                id:'3',
                name:'Chickpeas',
                unityPrice:0.7,
                kgPrice:70,
                percentage:0,
                inCart:false
            }),
            AddonModel.create({
                id:'4',
                name:'Sorghum',
                unityPrice:7.5,
                kgPrice:75,
                percentage:0,
                inCart:false
            }),
            AddonModel.create({
                id:'5',
                name:'Oats',
                unityPrice:1.7,
                kgPrice:170,
                percentage:0,
                inCart:false
            }),
            AddonModel.create({
                id:'6',
                name:'Corn',
                unityPrice:1.0,
                kgPrice:100,
                percentage:0,
                inCart:false
            }),
            AddonModel.create({
                id:'7',
                name:'Quinoa',
                unityPrice:4,
                kgPrice:400,
                percentage:0,
                inCart:false
            }),
            AddonModel.create({
                id:'8',
                name:'Barley',
                unityPrice:0.5,
                kgPrice:50,
                percentage:0,
                inCart:false
            }),
            AddonModel.create({
                id:'9',
                name:'RiceFlour',
                unityPrice:0.5,
                kgPrice:50,
                percentage:0,
                inCart:false
            }),
            AddonModel.create({
                id:'10',
                name:'PaniPhal',
                unityPrice:10,
                kgPrice:1000,
                percentage:0,
                inCart:false
            }),
            AddonModel.create({
                id:'11',
                name:'Lapsi',
                unityPrice:8.0,
                kgPrice:800,
                percentage:0,
                inCart:false
            }),
            AddonModel.create({
                id:'12',
                name:'Rye',
                unityPrice:0.2,
                kgPrice:200,
                percentage:0,
                inCart:false
            })
        ]
})
const productsStore = ProductsStore.create({
    data:[
        ProductModel.create({
            id:'1',
            name:'Diamond',
            photo:require('../../assets/img/products/WheatDiamond.jpg'),
            kgPrice:55
        }),
        ProductModel.create({
            id:'2',
            name:'Platinum',
            photo:require('../../assets/img/products/WheatPlatinum.jpg'),
            kgPrice:45
        }),
        ProductModel.create({
            id:'3',
            name:'Gold',
            photo:require('../../assets/img/products/WheatGold.jpg'),
            kgPrice:35
        }),
        
    ]
})
const shoppingCartStore = ShoppingCartStore.create();


export const store = {
    authStore,
    shoppingCartStore,
    productsStore,
    addonsStore,
}

window.MobxStore = store;