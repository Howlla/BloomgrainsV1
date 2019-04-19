import React, { Component } from 'react';
import { Box, Text } from 'react-native-design-utility';
import { View, StyleSheet, Image, Linking, StatusBar, FlatList } from 'react-native';

import {theme} from '../constants//theme'
import ProductCard from '../components/ProductCard';
import DealCarousel from '../components/DealCarousel';

import {inject,observer} from 'mobx-react/native'


@inject('productsStore',"shoppingCartStore")
@observer
class HomeScreen extends Component {

  static navigationOptions = {
    title:"Home"
  }
  renderOptions = ({item,index}) => {
    let style ={};
    if(index%2==1){
      style.borderLeftWidth=2;
      style.borderLeftColor=theme.color.greyLighter;
    }


  return(
    <Box w={1/2} bg="white" h={200} style={style}>
      <ProductCard  {...item}/>
    </Box>
  )
  };
  keyExtractor = item => String(item.id);
  seperator = () => <Box h={2} bg="greyLighter" />
  
  render() {
    return (
    <Box f={1}>
        <StatusBar barStyle="light-content" />
        <Box h={130} bg="white" w="100%">
          <DealCarousel />
        </Box>

          <Box f={1} p={10}>
            <FlatList
              data={this.props.productsStore.data.map((product)=>product)}
              renderItem={this.renderOptions}
              keyExtractor={this.keyExtractor}
              numColumns={2}
              ItemSeparatorComponent={this.seperator}
              />
          </Box>
    </Box>
    );
   
  }
}
const styles = StyleSheet.create({
    headerContentStyle: {
      flexDirection: 'column',
      justifyContent: 'space-around',
    },
    headerTextStyle: {
      fontSize: 18
    },
    thumbnailStyle: {
      height: 50,
      width: 50
    },
    thumbnailContainerStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
      marginRight: 10,
    },
    imageStyle: {
      height: 200,
      flex: 1,
      width: null,
    }
  });
  

export default HomeScreen;