import React, { PureComponent } from 'react';
import {Image,TouchableOpacity,StyleSheet} from 'react-native';

import { Box,Text } from 'react-native-design-utility';
import { productImages } from '../constants/images';
import { theme } from '../constants/theme';

import { NavigationService } from '../API/NavigationService'
import {inject} from 'mobx-react/native'

@inject('shoppingCartStore')
class ProductCard extends PureComponent {
  handlePress = () => {
    // console.log(this.props,"PROPS HERE")
    this.props.shoppingCartStore.setProduct(this.props)
    // console.log('shoppingcart',this.props.shoppingCartStore)
    NavigationService.navigate('Addon');
  };
  componentDidMount(){
    const {id,name,kgPrice,photo,onPress} = this.props;
    console.log(this.props,"hello")
  }
  render() {
    const {id,name,kgPrice,photo,onPress} = this.props;
    
    return (
      <TouchableOpacity onPress={onPress||this.handlePress} style={styles.button}>

      <Box f={1} center pt ={20}>
       {kgPrice!='-' && (<Box>
          <Image style={{
              alignSelf: 'auto',
              height: 130,
              width: 130,
              borderWidth: 1,
              // borderRadius: 75,
            }} 
              resizeMode="contain"
              source={photo}/>
              <Box center>
          <Text  color="greyDark">₹ {kgPrice}/kg</Text>
          </Box>
       </Box> )
       }
        <Box>
          <Text size="sm" color="greyDark" center capitalizeEach>
            MP Sharbati {name}
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>

    )
  }
}
const styles = StyleSheet.create({
  button: {
    flex: 1,
  },
});
 export default ProductCard;