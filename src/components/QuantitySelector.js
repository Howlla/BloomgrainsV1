import React, { Component } from 'react'
import { Box,Text } from 'react-native-design-utility';
import { Image,StyleSheet } from 'react-native';

export default class QuantitySelector extends Component {
  render() {
      console.log(this.props,"props")
      const { product } = this.props;
    return (
      <Box f={1}dir ="row" align="center">
            <Box f={0.3}>
            <Image style={{
              
              height: 80,
              width: 80,
              left:10,
              top: 10,
              borderWidth: 1,
              // borderRadius: 75,
            }} 
              resizeMode="contain"
              source={product.photo}/>
            </Box>
            <Box>
                <Text>{product.name} </Text>
            </Box>
      </Box>
    )
  }
}

const styles = StyleSheet.create({
    img:{
        width:20
    }
})