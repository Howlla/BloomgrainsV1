import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Header = (props) => (
    <View style={styles.headerView}>
      <Text style={styles.headerText} >{props.title}</Text>
    </View>
  );


const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    color: '#000',
  },
  headerView: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
  }
});

export default Header;