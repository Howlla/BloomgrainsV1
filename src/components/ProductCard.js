import React, { PureComponent } from 'react';
import {Image,TouchableOpacity,StyleSheet} from 'react-native';
import { Box,Text } from 'react-native-design-utility';
import { productImages } from '../constants/images';
import { theme } from '../constants/theme';

import { NavigationService } from '../API/NavigationService'

class ProductCard extends PureComponent {
  handlePress = () => {
    NavigationService.navigate('Addon', { name: this.props.title });
  };
  render() {
    const {title,price,photo,onPress} = this.props;
    return (
      <TouchableOpacity onPress={onPress||this.handlePress} style={styles.button}>

      <Box f={1} center pt ={50}>
       {price!='-' && (<Box>
          <Image style={{
              alignSelf: 'center',
              height: 150,
              width: 150,
              borderWidth: 1,
              borderRadius: 75,
            }} 
              resizeMode="contain"
              source={productImages.diamond}/>
          <Text color="greyDark">₹ {price}/kg</Text>
       </Box> )
       }
        <Box>
          <Text size="md" color="greyDark" center capitalizeEach>
            {title}
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