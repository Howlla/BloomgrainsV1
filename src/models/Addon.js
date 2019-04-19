import { types } from 'mobx-state-tree';

export const AddonModel = types.model('AddonModel',{
    id: types.identifier,
    name: types.string,
    rate: types.number,
    kgPrice: types.number,
    percentage: 0,
    inCart: false,
}).views(self=>({
    get price(){
        return (self.rate*self.percentage).toFixed(2)
    }
})).actions(self => ({
    incPercentage(){
        self.percentage += 1;
        self.inCart=true;
    },
    decPercentage(){
        self.percentage -= 1;
        if(self.percentage==0){
            self.inCart=false;
        }
    }
}))