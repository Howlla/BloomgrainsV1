import {types} from 'mobx-state-tree';

import {AddonModel} from '../models/Addon'
import { baseApi } from '../API/Api';

export const AddonsStore = types.model('AddonsStore',{
    //Maybe mapping
    data:types.array(types.reference(AddonModel)),
})
// .actions(self => ({
//     setupAddons: flow(function*(){
       
//     }),
// }));