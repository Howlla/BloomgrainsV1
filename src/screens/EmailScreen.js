import React, { Component } from 'react';
import { Box, Text } from 'react-native-design-utility';
import { Content, Form, Input, Item, Button, Label } from 'native-base';
import {AsyncStorage} from 'react-native'


import {inject,observer} from 'mobx-react/native'

// data={
//     "auth":{
//         "email":"9205266153",
//         "password":"12345678"
//     }
// }
@inject('authStore')
class EmailScreen extends Component {
    state = {
        email: '',
        password: '',
        buttonText:'Login'
    };

    componentDidMount(){
     this.setState({buttonText:this.props.navigation.getParam('buttonText','Login')})
    }
    loginUser = async (email, password) => {
        try {
            if (this.state.password.length < 8) {
                alert("Password should have atleast 8 characters")
                return
            }
            await this.props.authStore.login(email,password)
    
        }
        catch (error) {
            console.log(error.toString())
        }

    }

    signupUser = async (email, password) => {
        try{
            if (this.state.password.length < 8) {
                alert("Password should have atleast 8 characters")
                return
            }
            await this.props.authStore.signup(email,password)
    
        }
        catch(error){
            console.log(error.toString())
        }
        // try {
        //     firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
        //         console.log(user);
        //         this.props.navigation.navigate('MobileAuth');
        //     })
        // }
        // catch (error) {
        //     console.log(error.toString())

        // }
        
    }
    render() {
        return (

            <Box f={1} bg="backgroundColor" justify="center" p="md">
                <Form>
                    <Item floatingLabel>
                        <Label
                            style={{ color: "orange" }}
                        >
                            Phone Number</Label>
                        <Input
                            style={{ color: "white" }}
                            autoCorrect={false}
                            keyboardType="phone-pad"
                            autoCapitalize="none"
                            textContentType="telephoneNumber"
                            onChangeText={(email) => this.setState({ email })}
                        />
                    </Item>
                    <Item f={1} floatingLabel>
                        <Label
                            style={{ color: "orange" }}
                        >
                            Password</Label>
                        <Input
                            style={{ color: "white" }}
                            secureTextEntry={true}
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(password) => this.setState({ password })}

                        />
                    </Item>
                    {/* <Button
                        style={{ marginTop: 10 }}
                        block
                        rounded
                        light
                        onPress={() => { this.loginUser(this.state.email, this.state.password) }}>
                        <Text>Login</Text>
                    </Button> */}
            
                    <Button
                        style={{ marginTop: 10,backgroundColor: "#5CC747",color:"white" }}
                        block
                        rounded
                        // success
                        onPress={() => { 
                            if(this.state.buttonText=="Login"){
                                this.loginUser(this.state.email, this.state.password)
                            }
                            else this.signupUser(this.state.email,this.state.password)
                         }}>

                        <Text color="white">{this.state.buttonText}</Text>
                    </Button>
   
                </Form>
            </Box>

        );
    }
}

export default EmailScreen;