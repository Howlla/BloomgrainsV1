import React, { Component } from 'react';
import { StatusBar, ScrollView, StyleSheet } from 'react-native';
import { Box, Text } from 'react-native-design-utility';


import CloseBtn from '../commons/CloseBtn';
import{Input,Button,Textarea,Item} from 'native-base';
import { theme } from '../constants/theme';

class AddressFormScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Add Address',
    headerLeft: (
      <CloseBtn left size={25} onPress={() => navigation.goBack(null)} />
    ),
  });
  state = {};
  render() {
    return (
      <Box f={1} bg="white" p="sm">
        <StatusBar barStyle="dark-content" />
        <ScrollView>
          <Box mb="sm">
          <Item>
            <Input placeholder="Address line 1" />
          </Item>
          <Item>
            <Input placeholder="Address line 2 " />
          </Item>
            <Box dir="row">
              <Box f={1}>
              <Item>
                <Input placeholder="Pin Code" />
              </Item>
              </Box>
              <Box w={theme.space.xs} />
              <Box f={1}>
              <Item>
                <Input placeholder="New Delhi" disabled />
              </Item>
              </Box>
            </Box>
            <Item>
            <Textarea
              placeholder="Instructions for delivery (optional)"
              rowSpan={5} bordereds
              // containerStyle={{ height: 100 }}
              // multiline
            />
            </Item>
          </Box>
        <Box w='100%'>
          <Button disabled full disabledStyle={styles.buttonDisabled} >
            <Text bold color="white">
              Save
            </Text>
          </Button>
        </Box>
        </ScrollView>
      </Box>
    );
  }
}

const styles = StyleSheet.create({
  buttonDisabled: {
    backgroundColor: theme.color.greyLight,
    borderColor: theme.color.greyLight,
  },
});

export default AddressFormScreen;