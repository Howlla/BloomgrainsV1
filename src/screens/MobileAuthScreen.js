import React, { Component } from 'react';
import { Box,Text } from 'react-native-design-utility';
import PhoneAuth from '../components/MobileVerifier';
// import * as firebase from 'firebase';
// import axios from 'axios';

// import { Container, Card, CardItem, Form, Item, Input, Button, Text, View, Body } from 'native-base';
class MobileAuthScreen extends Component {
    
 state={
     phone:'',
     code:'',
 };
    signInWithPhone(phone){
        this.setState({phone});
       return fetch("https://api.authy.com/protected/json/phones/verification/start", {
  body: `via=sms&phone_number=${this.state.phone}&country_code=91&code_length=6&locale=en`,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "X-Authy-Api-Key": "HfJbI48l3s0prXGuBo7dz3vimnuZ96CH"
  },
  method: "POST"
})
      }
     
      redeemCode(code){
    //    return fetch(`https://api.authy.com/protected/json/phones/verification/check?phone_number=${this.state.phone}&country_code=91&verification_code=${code}`, {
    //         headers: {
    //           "X-Authy-Api-Key": "HfJbI48l3s0prXGuBo7dz3vimnuZ96CH"
    //         }
    //       })
          this.state.props.navigation.navigate('Main')
          
      }
      componentDidMount(){
        // const phone = this.props.navigation.getParam('phone', '');
        // this.setState({phone})
      }
    render() {
     
        // const itemId = navigation.getParam('phone', '');
        // const otherParam = navigation.getParam('otherParam', 'some default value');
        return (
            <Box f={1} bg="backgroundColor" justify="center" p="lg">
                {/* <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: 'center',

                        margin: 10
                    }}
                >
                    <CardItem style={{ backgroundColor: "none" }}>
                        <Item>
                            <Input placeholder="Enter Number" />
                        </Item>
                    </CardItem>

                    <CardItem style={{ backgroundColor: "none" }}>
                        <Button primary style={{ textAlign: "center" }}>
                            <Text>Submit</Text>
                        </Button>
                    </CardItem>
                </View> */}
                <Box f={0.1} center mt={20} >
                    <Text size='2xl' color="orange"> SMS verification</Text>
                </Box>
                <PhoneAuth
                signInWithPhone={phone => this.signInWithPhone(phone)}
                redeemCode={code => this.redeemCode(code)}
                number={this.props.navigation.getParam('phone', '')}
                codeLength={6}
                buttonTextColor='black'
                spinnerColor='black'
                color='orange'
                androidFont='monospace'
                iOSFont='Menlo'
                containerStyle={{flex: 1}}
                verifyButtonMessage='Verify Phone Number*'
                disclaimerMessage='*Message & data rates may apply.'
                cca2='IN'
                callingCode='91'
            />
            </Box>
        )
    }
}

export default MobileAuthScreen