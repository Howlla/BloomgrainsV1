import React, { Component } from 'react';
import { Box,Text } from 'react-native-design-utility';
import PhoneAuth from '../components/MobileVerifier';
// import axios from 'axios';

import {inject,observer} from 'mobx-react'
import { Container, Card, CardItem, Form, Item, Input, Button, View, Body } from 'native-base';
@inject('authStore')
@observer
class MobileAuthScreen extends Component {
    
 state={
     phone:'',
     code:'',
 };
    signInWithPhone=async ()=>{
       await this.props.authStore.startTwoFactor()
      }
     
      redeemCode=async (code) =>{
       await this.props.authStore.checkTwoFactor(code)
        //   this.state.props.navigation.navigate('Main')
          
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
                            <Input placeholder={this.props.authStore.info.email} disabled />
                        </Item>
                    </CardItem>

                    <CardItem style={{ backgroundColor: "none" }}>
                        <Button primary style={{ textAlign: "center" }}>
                            <Text>SMS Verify</Text>
                        </Button>
                    </CardItem>
                </View> */}
                <Box f={0.1} center mt={20} >
                    <Text size='2xl' color="orange"> SMS verification</Text>
                </Box>
                <PhoneAuth
                signInWithPhone={()=>this.signInWithPhone()}
                redeemCode={code => this.redeemCode(code)}
                number={this.props.authStore.info.email}
                codeLength={6}
                buttonTextColor='black'
                spinnerColor='black'
                // keyboardType={'none'}
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