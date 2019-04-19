import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { observer,inject } from 'mobx-react/native';
import { Box, Text } from 'react-native-design-utility';

import { theme } from '../constants/theme';
import { NavigationService } from '../API/NavigationService';

@inject('shoppingCartStore')
@observer
class AddressListItem extends Component {
  state = {};

  handlePress = (address) => {
    this.props.shoppingCartStore.setAddressForOrder(address.id)
  };

  render() {
    const { address } = this.props;
    var color="";
    if(this.props.shoppingCartStore.selectedAddressID==address.id){
      color=theme.color.greenLightest
    }
    return (
      <TouchableOpacity onPress={()=>this.handlePress(address)}>
        <Box
          h={50}
          px="sm"
          justify="center"
          bg={color}
          style={{
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: theme.color.grey,
          }}
        >
          <Text>{address.line1}, {address.line2}</Text>
        </Box>
      </TouchableOpacity>
    );
  }
}

export default AddressListItem;
