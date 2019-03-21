import React, { Component } from 'react';
import { Box, Text } from 'react-native-design-utility';
import { Content, Form, Input, Item, Button, Label } from 'native-base';
import {AsyncStorage} from 'react-native'

import {inject,observer} from 'mobx-react/native'

data={
    "auth":{
        "email":"9205266153",
        "password":"12345678"
    }
}
@inject('currentUser')
class EmailScreen extends Component {
    state = {
        email: '',
        password: '',
        buttonText:'Login'
    };

    componentDidMount(){
     this.setState({buttonText:this.props.navigation.getParam('buttonText','Login')})
    }
    signupUser = async (email, password) => {
        try {
            await this.props.currentUser.login(email,password)
            // if (this.state.password.length < 6) {
            //     alert("Password should have atleast 6 characters")
            //     return
            // }
            //  fetch('http://10.0.1.23:3000/user_token.json', {
            //     method: "POST", // *GET, POST, PUT, DELETE, etc.
            //     mode: "cors", // no-cors, cors, *same-origin
            //     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            //     credentials: "same-origin", // include, *same-origin, omit
            //     headers: {
            //         "Content-Type": "application/json",
            //         // "Content-Type": "application/x-www-form-urlencoded",
            //     },
            //     redirect: "follow", // manual, *follow, error
            //     referrer: "no-referrer", // no-referrer, *client
            //     body: JSON.stringify(data), // body data type must match "Content-Type" header
            // })
            // .then(response => response.json())
            // .then(x=>{console.log(x)}); // parses response to JSON
            if(x.isVerified!=true){
                this.props.navigation.navigate('MobileAuth',{phone:this.state.email});
            }
            this.props.navigation.navigate('MobileAuth',{phone:this.state.email});

        }
        catch (error) {
            console.log(error.toString())
        }

    }

    loginUser = (email, password) => {
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
                            textContentType="number"
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
                        onPress={() => { this.signupUser(this.state.email, this.state.password) }}>

                        <Text color="white">{this.state.buttonText}</Text>
                    </Button>
   
                </Form>
            </Box>

        );
    }
}

export default EmailScreen;