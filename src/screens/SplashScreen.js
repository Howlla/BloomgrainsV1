import React, { Component } from 'react';
import { Box, Text } from 'react-native-design-utility';
// import { AsyncStorage } from 'react-native'
import OnboardingLogo from '../commons/OnboardingLogo';
import {inject} from 'mobx-react/native'

@inject('authStore')
class SplashScreen extends Component {
  state = {};

  componentDidMount() {
    this.checkAuth();
  }
 
  checkAuth = async () => {
    // try{
      this.props.authStore.setupAuth();
//       // await AsyncStorage.setItem('JWT', 'I like to save it.');
// await AsyncStorage.removeItem('JWT')
//   await AsyncStorage.getItem('JWT')
//     .then((userToken) => {
//       this.props.navigation.navigate(userToken?'Main':'Auth')  })
//       .done();
//     }catch(e){
//       console.log(e)
//     }
//     // this.props.navigation.navigate(userToken?'Main':'Auth')

  }

  render() {
    return (
      //<Box f={1} bg="backgroundColor" center>
      <Box f={1} bg="backgroundColor" center>
        <OnboardingLogo />
      </Box>
    );
  }
}

export default SplashScreen;