import React, { Component } from 'react'
import {FlatList} from 'react-native'

import ProductCard from '../components/ProductCard';
import { Box,Text } from 'react-native-design-utility';
import AddonCard from '../components/AddonCard'
import QuantitySelector from '../components/QuantitySelector'


import{inject,observer} from 'mobx-react/native'

import {Button} from 'native-base';

 @inject('addonsStore','shoppingCartStore')
class AddonScreen extends Component {
  state={
    addons:[]
  }
componentDidMount(){
  const {data} = this.props.addonsStore
  this.props.shoppingCartStore.setAddons(data.slice())
  // console.log(data.slice())
  // console.log("hey",this.props.shoppingCartStore.product)
  // this.setState({addons:data.slice()})
  console.log(data)
}
  static navigationOptions = {
     title:'Customize Your Wheat'
 }
 keyExtractor = item => String(item.id);
 renderOptions = ({item,index}) => {
return(
    <AddonCard  {...item}/>
)
};
    render() {
    const {product,addons}=this.props.shoppingCartStore
    console.log("Product",product.name)
      state={active:true}
    return (
      <Box f={1}>
        <Box f={0.3}bg="red" >
          <QuantitySelector product={product}/>
        </Box>
        <Box f={0.7} >
        <FlatList
              data={addons}
              renderItem={this.renderOptions}
              keyExtractor={this.keyExtractor}
              numColumns={1}
              />
          {/* <AddonCard name={this.props.addonsStore.data.slice()[0].name} kgPrice={this.props.addonsStore.data.slice()[0].kgPrice}/> */}
        </Box>
        <Box f={0.1}>
        <Button full success>
            <Text>Checkout</Text>
          </Button>
        </Box>
      </Box>
    )
  }
}

export default AddonScreen;
