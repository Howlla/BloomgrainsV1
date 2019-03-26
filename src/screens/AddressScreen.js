import React, { Component } from 'react';
import { Box, Text } from 'react-native-design-utility';
import { StatusBar } from 'react-native'

import {Button} from 'native-base'
import {EvilIcons} from '@expo/vector-icons'

import { theme } from '../constants/theme';
import{inject} from 'mobx-react';

@inject('authStore')
class AddressScreen extends Component {
  static navigationOptions = {
    title:"Home"
  }
  state = {};
  render() {
    return (
      <Box f={1} center px="md">
        <StatusBar barStyle="dark-content"/>

        <Box center mb="md">
          <EvilIcons name="location" color={theme.color.black} size={200}/>
        </Box>
        <Box center>
          <Text bold size="2lg">Hey</Text>
          <Text bold size="lg"> Add your address</Text>
          <Text size="sm" color="greyLight">You haven't added an address yet </Text>
        </Box>
        <Box width="100%" p="md">
        <Button full success onPress ={()=>{}}>
          <Text bold color="white">Add address</Text>
         </Button>
        </Box>
      </Box>
    );
  }
}

export default AddressScreen;