import {types} from 'mobx-state-tree';

import {AddonModel} from '../models/Addon'
export const AddonsStore = types.model('AddonsStore',{
    //Maybe mapping
    data:types.array(types.reference(AddonModel)),
});