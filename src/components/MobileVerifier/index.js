import React from 'react';
import {
  View,
  Dimensions,
  Text,
  Keyboard,
  Animated,
  AppState,
  TextInput,
  Platform
} from 'react-native';
import Button from './Button';
import CountryPicker from 'react-native-country-picker-modal';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react/native'

const {width} = Dimensions.get('window');

@observer
class PhoneVerifyScreen extends React.Component{

  constructor(p){
    super(p);
    this.state = {
      number: '',
      code: '',
      keyboardHeight: 0,
      countryInfo: {
        cca2: p.cca2,
        callingCode: p.callingCode
      },

      verifying: true,
      // verifyOpacity: new Animated.Value(0),
      redeemOpacity: new Animated.Value(0),

      appState: '',

      loading: false,
      loadingRedeem: false
    };
    this.styles = {
      phoneAuthText: {
        color:'orange',
        fontSize: width/10,
        alignItems: 'center',
        // borderBottomWidth: 1,
        // borderBottomColor: this.props.color,
        // textDecorationLine: 'underline',
        margin: 10,
        fontFamily: Platform.OS === 'android' ? this.props.androidFont : this.props.iOSFont
      },
      finePrint: {
        fontSize: 12,
        color: 'gray',
        marginHorizontal: 15,
        marginTop: 10
      }
    };
  }

  componentDidMount(){
    // AppState.addEventListener('change', this._handleAppStateChange.bind(this));
    // let bla = Keyboard.addListener('keyboardDidShow', (e) => {
    //   this.setState({keyboardHeight: e.endCoordinates.height});
    // });
    // this._ref.focus();
    // Animated.timing(this.state.verifyOpacity, {toValue: 1}).start();
    Animated.timing(this.state.redeemOpacity, {toValue: 1}).start();
    // this.setState({number:this.props.number})
    this.props.signInWithPhone().catch((err) => {
      console.log(err)
    });
  }

  renderCode(){
    let arr = [];
    let numbers = this.state.code.split('');
    console.log(numbers)
    for(let i=0; i<this.props.codeLength; i++){
      if(isNaN(numbers[i]))
       numbers[i] = '_';
    }
    console.log(numbers)
    let next = numbers.indexOf('_');
    console.log
    numbers.map((num, index) => {
      let color = 'black';
      if(index === next) color = this.props.color;
      arr.push(React.createElement(
        Text,
        { key: index, style: [this.styles.phoneAuthText, { color, fontSize: width / this.props.codeLength }] },
        num
      ));
    });
    return arr;
  }

  verify(){
    this.setState({loading: true});
    let string = `+${this.state.countryInfo.callingCode}${this.state.number}`;
    this.props.signInWithPhone(string).then(() => {
      Animated.timing(this.state.verifyOpacity, {toValue: 0}).start(() => {
        this.setState({verifying: false}, () => {
          Animated.timing(this.state.redeemOpacity, {toValue: 1}).start();
        });
      });
    }).finally(() => {
      this.setState({loading: false});
    });
  }

  redeemCode(){
    this.setState({loadingRedeem: true});
    console.log(this.state.code)
    this.props.redeemCode(Number(this.state.code).toString().padStart(4, "0")).catch(() => {
      this.setState({loadingRedeem: false});
    });
  }


  render(){

    return(
      // <View style={this.props.containerStyle}>
      //   {this.state.verifying ? verifying : redeeming}
      // </View>
      <Animated.View style={{
        opacity: this.state.redeemOpacity,
        marginBottom: this.state.keyboardHeight+20,
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1
      }}>
        <TextInput
          autoFocus
          keyboardType={'phone-pad'}
          style={{position: 'absolute', top: -100, left: -100}}
          value={this.state.code}
          onChangeText={num => {
            console.log(num);
            if(num.length < this.props.codeLength+1){
              console.log(this.props.codeLength,"code length")
              console.log(num,"num")
              this.setState({code: num});
            }
          }}
        />
        <View/>
        <View style={{flexDirection: 'row'}}>{this.renderCode()}</View>
        <Button
          title={this.props.enterCodeMessage}
          backgroundColor={this.props.color}
          loading={this.state.loadingRedeem}
          onPress={() => this.redeemCode()}
          textColor={this.props.buttonTextColor}
          spinnerColor={this.props.spinnerColor}
        />
      </Animated.View>
    );
  }
}

// list of all RN fonts can be found at https://github.com/react-native-training/react-native-fonts
PhoneVerifyScreen.propTypes = {
  color: PropTypes.string,
  buttonTextColor: PropTypes.string,
  spinnerColor: PropTypes.string,
  redeemCode: PropTypes.func.isRequired,
  signInWithPhone: PropTypes.func.isRequired,
  androidFont: PropTypes.string,
  iOSFont: PropTypes.string,
  containerStyle: PropTypes.object,
  verifyButtonMessage: PropTypes.string,
  enterCodeMessage: PropTypes.string,
  disclaimerMessage: PropTypes.string,
  codeLength: PropTypes.number,
  number: PropTypes.string,

  cca2: PropTypes.string,
  callingCode: PropTypes.string
};

PhoneVerifyScreen.defaultProps = {
  color: '#ff8203',
  buttonTextColor: 'white',
  spinnerColor: 'white',
  redeemCode: () => console.log('Please attach method to redeemCode prop'),
  signInWithPhone: () => console.log('Please attach method to signInWithPhone prop'),
  androidFont: 'monospace',
  iOSFont: 'Menlo',
  containerStyle: {flex: 1},
  verifyButtonMessage: 'Verify Phone Number*',
  enterCodeMessage: 'Enter OTP',
  disclaimerMessage: '*Message & data rates may apply.',
  codeLength: 4,

  cca2: 'US',
  callingCode: '1'
};

export default PhoneVerifyScreen;

