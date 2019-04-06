import React, { Component } from 'react';
import { StatusBar, ScrollView, StyleSheet } from 'react-native';
import { Box, Text } from 'react-native-design-utility';
import { observer, inject } from 'mobx-react/native';

import CloseBtn from '../commons/CloseBtn';
import{Input,Button,Textarea,Item} from 'native-base';
import { theme } from '../constants/theme';
import { observable,autorun } from 'mobx';
import { NavigationService } from '../API/NavigationService';

@inject('authStore')
@observer
class AddressFormScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Add Address',
    headerLeft: (
      <CloseBtn left size={25} onPress={() => navigation.goBack(null)} />
    ),
  });
  @observable
  line1=""
  
  @observable
  line2=""

  @observable
  pin_code=""

  @observable
  buttonState=true

  @observable
  addressObject={}

  reaction = autorun(() => {
   if(this.line1.length>5 && this.pin_code.length==6){
    this.buttonState=false
    this.addressObject.line1=this.line1;
    this.addressObject.line2=this.line2;
    this.addressObject.pin_code=this.pin_code;
   }
  else
    this.buttonState=true
  });

  saveAddress = async () => {
    try {
      await this.props.authStore.info.createAddress(this.addressObject)
      await  this.props.authStore.info.getUserAddresses();
      NavigationService.back(null);
    } catch (error) {
      console.log('save address error',error)
    }
  }

  state = {};
  render() {
    return (
      <Box f={1} bg="white" p="sm">
        <StatusBar barStyle="dark-content" />
        <ScrollView>
          <Box mb="sm">
          <Item>
            <Input 
              placeholder="Address line 1*"
              onChangeText={(text)=>this.line1=text}
              value={this.line1}
            />
          </Item>
          <Item>
            <Input 
              placeholder="Address line 2 "
              onChangeText={(text)=>this.line2=text}
              value={this.line2}
               />
          </Item>
            <Box dir="row">
              <Box f={1}>
              <Item>
                <Input 
                placeholder="Pin Code*" 
                onChangeText={(text)=>this.pin_code=text}
                value={this.pin_code}
                />
              </Item>
              </Box>
              <Box w={theme.space.xs} />
              <Box f={1}>
              <Item>
                <Input placeholder="New Delhi" disabled />
              </Item>
              </Box>
            </Box>
            <Item>
            <Textarea
              placeholder="Instructions for delivery (optional)"
              rowSpan={5} 
              // containerStyle={{ height: 100 }}
              // multiline
            />
            </Item>
          </Box>
        <Box w='100%'>
          <Button 
            success
            disabled={this.buttonState} 
            onPress={this.saveAddress} 
            full 
            disabledStyle={styles.buttonDisabled}
             >
            <Text bold color="white">
              Save
            </Text>
          </Button>
        </Box>
        </ScrollView>
      </Box>
    );
  }
}

const styles = StyleSheet.create({
  buttonDisabled: {
    backgroundColor: theme.color.greyLight,
    borderColor: theme.color.greyLight,
  },
});

export default AddressFormScreen;