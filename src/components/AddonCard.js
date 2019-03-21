import React, { Component } from 'react'
import { Content, Card, CardItem, Text } from 'native-base';

class AddonCard extends Component {
  render() {
    return (
      <Box>
        <Card>
            <CardItem header>
                <Text>Millets(Bajra)</Text>
            </CardItem>
            <Text>Rs0.7</Text>
            <Right>
            
            </Right>
        </Card>
      </Box>
    )
  }
}
export default AddonCard;