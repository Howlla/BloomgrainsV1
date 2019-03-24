import { types } from 'mobx-state-tree';

export const AddonModel = types.model('AddonModel',{
    id: types.identifier,
    name: types.string,
    unityPrice: types.number,
    kgPrice: types.number,
    percentage: 0,
    inCart: false,
}).views(self=>({
    get price(){
        return self.unityPrice*percentage
    }
})).actions(self => ({
    incPercentage(){
        self.percentage += 1;
        self.inCart=true;
    },
    decPercentage(){
        self.percentage -= 1;
        if(percentage==0){
            self.inCart=false;
        }
    }
}))