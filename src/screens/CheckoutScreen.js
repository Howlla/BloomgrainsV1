import React, { Component } from 'react'
import {View, TouchableWithoutFeedback, Dimensions,Animated, Easing} from 'react-native'
import {Header, Card,CardItem, Footer, FooterTab, Button,Body} from 'native-base';
import { theme } from '../constants/theme';

import Svg, {G} from 'react-native-svg';

import * as scale from 'd3-scale';
import * as shape from 'd3-shape';


import {
  scaleBand,
  scaleLinear
} from 'd3-scale';

// import PureChart from 'react-native-pure-chart';

import {Box,Text} from 'react-native-design-utility'
import { observer,inject } from 'mobx-react';
import { NavigationService } from '../API/NavigationService';

import Slice from '../components/Slice'

const AnimatedSlice = Animated.createAnimatedComponent(Slice);
const {color} = theme
const colors = [color.orange,color.redDark,color.purpleLight,color.green,color.blueDarker,color.blueLightest,color.greenLight,color.greenDarkest,color.grey,color.greenDarkest,color.redLightest,color.red,color.purple]
@inject('authStore','shoppingCartStore')
@observer
export default class CheckoutScreen extends Component {
    state={
      animValue: new Animated.Value(0.1),
      highlightedIndex:0
    }
    resetPie = ()=>{
      this.state.animValue.setValue(0.1);
  };
  componentDidMount(){
    this.animate();
  }
    animate = ()=>{

      Animated.timing(
          this.state.animValue,
          {
              toValue: 2,
              duration: 1000,
              easing: Easing.inOut(Easing.quad)
          }
      ).start();
  };
    _value=(item)=> { return item.value; }

    _label=(item) => { return item.label; }

    _color=(index)=> { return colors[index] }

    _onPieItemSelected=(index) => {
      this.setState({...this.state, highlightedIndex: index});
    }
    placeOrder = async() =>{
      await this.props.shoppingCartStore.sendOrder(this.props.authStore.authToken);
    }
    changeAddress= ()=>{
      NavigationService.navigate("Addresses");
    }
  //    dynamicColors = () =>{
  //     var r = Math.floor(Math.random() * 255);
  //     var g = Math.floor(Math.random() * 255);
  //     var b = Math.floor(Math.random() * 255);
  //     return "rgb(" + r + "," + g + "," + b + ")";
  //  };
  
  render() {
    const margin = styles.container.margin;
    var {height, width} = Dimensions.get('window');
    const x = width / 4 + margin;
    const y = height / 8 + margin;

    let endAngle = Animated.multiply(this.state.animValue, Math.PI);

    const deliveryAddress=this.props.authStore.info.addresses.find(address=>{
      return address.id==this.props.shoppingCartStore.selectedAddressID
     })
    let sampleData = [
      {
        value: this.props.shoppingCartStore.getWheat ,
        label: 'Wheat',
        color: colors[0]
      } 
    ]
    this.props.shoppingCartStore.addons.forEach(el=>{
      if(el.percentage>0 && el.percentage<=100)
      sampleData.push({
        value:el.percentage,
        label:el.name,
        color:colors[el.id]
      })
    })
    console.log(sampleData)
    return (
      <Box f={1} >
      <Box f={0.3} w={1}>
      <Card>
        <CardItem header>
          <Text bold>Delivery Address</Text>
         </CardItem>
         <CardItem>
           <Body>
              <Text>{`${deliveryAddress.line1}, ${deliveryAddress.line2}`} </Text>
              <Text>{deliveryAddress.pin_code} </Text>
            </Body>
          </CardItem>
          {/* HACKEY CODE PLEASE FIX THIS ISSUE FOR THE CLICK SIZE OF BUTTON */}
          <CardItem button onPress={()=>this.changeAddress()}>
          <Box onPress={()=>this.changeAddress()} w={1}>
          <Button success block onPress={()=>this.changeAddress()} >
              <Text size={theme.text.lg} color={theme.color.black}>
                Change or Add Address
              </Text>
            </Button>
          </Box>
          </CardItem>
      </Card>
      </Box>
      <Box f={0.2} w={1} mt={80}>
        <Card>
          <CardItem>
            <Text>MP Sharbati {this.props.shoppingCartStore.product.name} Wheat</Text>
            <Text bold> x{this.props.shoppingCartStore.qty}kg</Text>
           </CardItem> 
        </Card>
      </Box>
      <Box f={0.5} dir="row">
        <Box w={1} f={0.5} align="center">
              <Svg
                    width={width/2}
                    height={250}
                    style={styles.pieSVG}
                    viewBox={`${x-150} ${y-75} 250 250`}
                >
                 <G x={x} y={y}>
                 {
                   
             sampleData.map( (item, index) =>
              (<AnimatedSlice
                index={index}
                data={sampleData}
                 key={'pie_shape_' + index}
                 color={sampleData[index].color}
                 endAngle={endAngle}
                 onPress={()=>this._onPieItemSelected(index)}
              />)
              )
            }
            </G>
        </Svg>
        <Box f={0.5} style={{position: 'absolute', top:0, left: 2*margin +200}}>
          {
            sampleData.map( (item, index) =>
            {
              var fontWeight = this.state.highlightedIndex == index ? 'bold' : 'normal';
              return (
                <TouchableWithoutFeedback key={index}>
                  <View>
                    <Text style={[styles.label, {color: sampleData[index].color, fontWeight: fontWeight}]}>{this._label(item)}: {this._value(item)}%</Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })
          }
        </Box>
        </Box>
        {/* <PureChart
          data={sampleData} 
          type='pie'
          width={'100%'} /> */}

        </Box>   
      <Footer>
        <FooterTab>
          <Button full warning onPress={this.placeOrder}>
            <Text bold style={{color:"white"}}>Confirm Order  ₹{this.props.shoppingCartStore.getTotalPrice}</Text>
            
          </Button>
        </FooterTab>
      </Footer>
    </Box>
    )
  }
}
const styles = {
  container: {
    margin: 20,
  },
  label: {
    fontSize: 15,
    marginTop: 5,
    fontWeight: 'normal',
  },
  pieSVG: {
    shadowColor: "rgba(59, 74, 116, 0.35)",
    shadowOffset: {
        width: 0,
        height: 32
    },
    elevation: 12,
    shadowRadius: 12.5,
    shadowOpacity: 1,
},
};
