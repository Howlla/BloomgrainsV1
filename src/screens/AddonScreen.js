import React, { Component } from 'react'
import {FlatList} from 'react-native'

import ProductCard from '../components/ProductCard';
import { Box,Text } from 'react-native-design-utility';
import AddonCard from '../components/AddonCard'
import QuantitySelector from '../components/QuantitySelector'


import{inject,observer} from 'mobx-react/native'

import {Button,Right, Icon} from 'native-base';
import { NavigationService } from '../API/NavigationService';

 @inject('authStore','addonsStore','shoppingCartStore')
 @observer
class AddonScreen extends Component {

  state = { addons:false }
   
componentDidMount(){
  
  const {data} = this.props.addonsStore
  this.props.shoppingCartStore.setAddons(data.slice())
  this.props.shoppingCartStore.resetAddons();

}
  static navigationOptions = ()=> ({
     title:'Customize Your Wheat'
 })
 keyExtractor = item => String(item.id);

 renderOptions = ({item,index}) => {
return(
    <AddonCard  addon={item}/>
)
};
onCheckout = () =>{
  if(this.props.authStore.info.addresses.length==0){
    NavigationService.navigate('Addresses')
  }
  else{
    this.props.shoppingCartStore.setAddressForOrder(this.props.authStore.info.addresses[0].id)
    NavigationService.navigate('Checkout')

  }
}
    render() {

    const {product,addons}=this.props.shoppingCartStore
    
    console.log("Product",product.name)
      state={active:true}
    return (
      <Box f={1}>
        <Box f={0.2}bg="red" >
          <QuantitySelector product={product}/>
        </Box>
        {this.state.addons && <Box f={0.7} >
        <FlatList
              data={addons}
              renderItem={this.renderOptions}
              keyExtractor={this.keyExtractor}
              numColumns={1}
              />
        </Box>}
       {!this.state.addons && 
          <Box f={0.20}>
        <Box center f={0.5}>
          <Text size="md" bold>Customize your grain?</Text>
        </Box>
        <Box f={1} p="xs">
        <Button full success onPress ={()=>{this.setState({addons:true})}}>
          <Text bold>Yes</Text>
         </Button>
        </Box>
        </Box>
        }
        <Box f={0.1}p="xs">
        <Button full warning iconRight onPress={this.onCheckout}>
            <Text bold>Checkout</Text>
          </Button>
        </Box>
      </Box>
    )
  }
}

export default AddonScreen;
