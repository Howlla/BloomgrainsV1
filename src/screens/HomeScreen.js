import React, { Component } from 'react';
import { Box, Text } from 'react-native-design-utility';
import { View, StyleSheet, Image, Linking, StatusBar, FlatList } from 'react-native';

import {theme} from '../constants//theme'
import ProductCard from '../components/ProductCard';
import DealCarousel from '../components/DealCarousel';

const Categories = [
  {
    id:1,
    title:'MP Sharbati Platinum',
    price:'50',
    photo:'WheatPlatinum.jpg'
    // image:require()
  },
  {
    id:2,
    title:'MP Sharbati Diamond',
    price:'44',
    photo:'WheatDiamond.jpg'
  },
  {
    id:3,
    title:'MP Sharbati Gold',
    price:'37',
    photo:'WheatGold.jpg'
  },
  {
    id:4,
    title:'Other Grains',
    price:'-',
    photo:'OtherGrains.jpg'
  },
]
// const others=[{
//     id:5,
//     title:'Soyabean',
//     price:'50'
//     // image:require()
//   },
//   {
//     id:6,
//     title:'Chickpea',
//     price:'44',
//   },
//   {
//     id:7,
//     title:'Sorghum',
//     price:'37'
//   },
//   {
//     id:8,
//     title:'Millets',
//     price:'44'
//   },

// ]

class HomeScreen extends Component {
  state={
    Categories:[]
  }
  componentDidMount(){
    this.setState({Categories})
  }
  static navigationOptions = {
    title:"Home"
  }
  renderOptions = ({item,index}) => {
    let style ={};
    if(index%2==1){
      style.borderLeftWidth=2;
      style.borderLeftColor=theme.color.greyLighter;
    }
    // if(item.id==4){
    //   item.onPress=()=>{
    //     this.setState({Categories:this.state.Categories.slice(0,3).concat(others)})
    //     console.log(this.state.Categories)
    //   }
    // }

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
              data={this.state.Categories}
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