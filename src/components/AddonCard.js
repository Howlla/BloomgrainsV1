import React, { Component } from 'react'
import {TouchableOpacity} from 'react-native'
import { Content, Card, CardItem,Right,Icon } from 'native-base';
import {Box,Text} from 'react-native-design-utility'
import {theme} from '../constants/theme'
import {inject,observer} from 'mobx-react'
import { ShoppingCartStore } from '../stores/ShoppingCart';

@observer
class AddonCard extends Component {
  state={
    // isHover:false,
    // percentage:1
  }

  // handlePlusPress = () => {
  //   // this.setState({isHover:true})
  // }
  handleIncrement = () => {
    // this.setState(s=>({
    //   percentage:s.percentage+1
    // }))
    console.log(this.props)
    this.props.addon.incPercentage();
    // this.props.addon[this.props.id-1].incPercentage()
  }
  handleDecrement = () =>{
   if(this.props.addon.percentage>0){
   this.props.addon.decPercentage();
  
  }
  // if(this.props.addon.percentage==1){
  //   this.setState({isHover:false})
  // }
  }
  render() {
    const {isHover} =this.state;
    // console.log(this.props,"yo")
    const {addon} = this.props;
    // const addon = this.props.shoppingCartStore.addons[this.props.id-1];
// console.log(this.props,"props LELO")
    return (
      <Box center
            dir="row"
            rows={[1]}>
        <Box >
        <Card>
            <CardItem header>
                {/* <Text  right size="xm">Millets(Bajra)@</Text>
                <Text center bold size="sm">₹ 70/kg   </Text>
         */}
              <Text  right size="xm">{addon.name}@</Text>
                <Text center bold size="sm">₹{addon.kgPrice}/kg  </Text>
                <Text right size="xs" bold >₹ {this.props.addon.price}</Text>
        
              
                  <Box dir="row" justify="between" p={5}align="center"  bg="white" style={{position:'absolute',top:8,left:250}} >
                  {/* <Text>{this.props.addon.price}</Text> */}
                   <TouchableOpacity onPress={this.handleDecrement}>
                     <Icon name="remove-circle" />
                    </TouchableOpacity>
                    <Text>{addon.percentage}% </Text>
                    <TouchableOpacity onPress={this.handleIncrement}>
                     <Icon name="add-circle" />
                    </TouchableOpacity>
                  </Box>
                
                

 
            </CardItem>
            
        </Card>
        </Box>  
      </Box>
    )
  }
}
export default AddonCard;