import React, { Component } from 'react'
import { Box,Text } from 'react-native-design-utility';
import { Image,StyleSheet,TouchableOpacity } from 'react-native';
import {inject,observer} from 'mobx-react/native'
import { theme } from '../constants/theme';

import {ActionSheet} from 'native-base'

var BUTTONS = ["1 Kg","2 Kg","5 Kg","10 Kg","Cancel"];

var CANCEL_INDEX = 4;

@inject('shoppingCartStore','addonsStore')
@observer
export default class QuantitySelector extends Component {
  render() {
      console.log(this.props,"props")
      const { product } = this.props;
    return (
      <Box f={1}dir ="row" align="center" p="xs" bg="white">
            <Box f={0.3}>
            <Image style={{
              
              height: 100,
              width: '100%',
              // left:10,
              // top: 10,
              // borderWidth: 1,
              // borderRadius: 75,
            }} 
              resizeMode="contain"
              source={product.photo}/>
            </Box>
            <Box f={1} pl="xs">
                <Text bold>{product.name} Aata</Text>
                <Text color="greyDark" size="xs">At ₹{product.kgPrice}/Kg</Text>
                <Text>{this.props.shoppingCartStore.getWheat}%</Text>
            </Box>
            <Box center mr="md">
            <Text bold>QTY:</Text>

              <TouchableOpacity
               onPress={() =>
                ActionSheet.show(
                  {
                    options: BUTTONS,
                    cancelButtonIndex: CANCEL_INDEX,
                    title: "Select Quantity of Wheat"
                  },
                  buttonIndex => {
                    this.props.shoppingCartStore.setQty(BUTTONS[buttonIndex].substr(0,BUTTONS[buttonIndex].indexOf(' ')))
                    // this.setState({ clicked: BUTTONS[buttonIndex] });
                  }
                )}
              
              >
                <Box w={45} h={35} center style={{borderWidth:1, borderColor:theme.color.greyLight}}>
                  <Text>{this.props.shoppingCartStore.qty}</Text>
                </Box>
              </TouchableOpacity>
            </Box>
            <Box>
              <Text>Total</Text>
            <Text bold>₹{this.props.shoppingCartStore.getTotalPrice}</Text>

            </Box>

      </Box>
    )
  }
}

const styles = StyleSheet.create({
    img:{
        width:20
    }
})