import React, { Component } from 'react';
import { Box, Text } from 'react-native-design-utility';
import { TouchableOpacity, Alert, Animated, Button, AsyncStorage } from 'react-native';

// import { Facebook,Google, Constants } from 'expo';

// import * as firebase from 'firebase';

import OnboardingLogo from '../commons/OnboardingLogo';
import LoginButton from '../commons/LoginButton';

// const googleScopes=['profile','email'];
class LoginScreen extends Component {
  state = {
    opacity: new Animated.Value(0),
    position: new Animated.Value(0),
  };

  componentDidMount() {
    Animated.parallel([this.positionAnim(), this.opacityAnim()]).start();
  }

  opacityAnim = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 200,
      delay: 100
    }).start();
  };

  positionAnim = () => {
    Animated.timing(this.state.position, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  onEmailPress = () => {
    this.props.navigation.navigate('Signup',{buttonText:"Login"});
  };
  onPhonePress = () => {
    this.props.navigation.navigate('Signup',{buttonText:"Signup"});
  };
  render() {
    const { opacity } = this.state;

    const logoTranslate = this.state.position.interpolate({
      inputRange: [0, 1],
      outputRange: [150, 0],
    });

    return (
      <Box f={1} center bg="backgroundColor">
        <Animated.View
          style={{
            flex: 1,
            transform: [
              {
                translateY: logoTranslate,
              },
            ],
          }}
        >
          <Box f={1} center>
            <OnboardingLogo />
          </Box>
        </Animated.View>

        <Animated.View style={{ flex: 0.9, width: '100%', opacity }}>
        <LoginButton onPress={this.onPhonePress} type ="phone">
            Signup With Mobile
          </LoginButton>
          {/* <LoginButton onPress={this.onGooglePress} type="google">
            Continue with Google
          </LoginButton>
          <LoginButton onPress={this.onFacebookPress} type="facebook">
            Continue with Facebook
          </LoginButton>
          <LoginButton onPress={this.onEmailPress} type ="email">
            Continue with E-mail
          </LoginButton> */}
          <Text color="white" center>Already have an account?</Text>
          <Button
            onPress={this.onEmailPress}
            title="Sign In"
            color="orange"
            />
        
        </Animated.View>
      </Box>
    );
  }
}

export default LoginScreen;