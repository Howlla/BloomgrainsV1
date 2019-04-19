import React, { Component } from 'react'
import { Container, Header, Card,CardItem, Footer, FooterTab, Button,Body,Text} from 'native-base';
import { theme } from '../constants/theme';

import {Box} from 'react-native-design-utility'
import { observer,inject } from 'mobx-react';
import { NavigationService } from '../API/NavigationService';

@inject('authStore','shoppingCartStore')
@observer
export default class CheckoutScreen extends Component {
  state={deliveryAddress:""};
  componentDidMount(){
    const deliveryAddress = this.props.authStore.info.addresses.find(address=>{
      console.log('address',address)
      return address.id==this.props.shoppingCartStore.selectedAddressID
     })
     this.setState({deliveryAddress})
    }
    changeAddress= ()=>{
      NavigationService.navigate("Addresses");
    }
  render() {
    return (
      <Box f={1}>
      <Box f={0.3}>
      <Card>
        <CardItem header>
          <Text bold>Delivery Address</Text>
         </CardItem>
         <CardItem>
           <Body>
              <Text>{`${this.state.deliveryAddress.line1}, ${this.state.deliveryAddress.line2}`} </Text>
              <Text>{this.state.deliveryAddress.pin_code} </Text>
            </Body>
          </CardItem>
          <CardItem button onPress={()=>this.changeAddress()}>
          <Box onPress={()=>this.changeAddress()} w={1}>
          <Button success block onPress={()=>this.changeAddress()} >
              <Text size={theme.text.lg} color={theme.color.black}>
                Change or Add Address
              </Text>
            </Button>
          </Box>
          </CardItem>
      </Card>
      </Box>
      <Box f={0.7}>
      </Box>
      <Footer>
        <FooterTab>
          <Button full warning>
            <Text bold style={{color:"white"}}>Confirm Order</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Box>
    )
  }
}
