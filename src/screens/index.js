import {
    createStackNavigator,
    createSwitchNavigator,
    createBottomTabNavigator,
  } from 'react-navigation';
  import React, { Component } from 'react';
 import {theme} from '../constants/theme';
  import TabBar from '../components/TabBar';
  import { NavigationService } from '../API/NavigationService';


  const primaryHeader = {
    headerStyle: {
      backgroundColor: theme.color.green,
    },
    headerTintColor: theme.color.white,
    headerTitleStyle: {
      fontWeight: '400',
    },
  };

  const AuthNavigator = createStackNavigator(
    {
      Login: {
        getScreen: () => require('./LoginScreen').default,
      },
      Signup: {
          getScreen: () => require('./EmailScreen').default,
      },
      MobileAuth: {
        getScreen: () => require("./MobileAuthScreen").default
      }
    },
    {
        navigationOptions: {
          header: null,
        },
    }
  );
  const HomeStack = createStackNavigator(
    {
      Home: {
        getScreen: () => require('./HomeScreen').default,
      },
      Addon: {
        getScreen: () => require('./AddonScreen').default,
      },
      Checkout:{
        getScreen: () => require('./CheckoutScreen').default
      }
    },
    {
      navigationOptions: { ...primaryHeader },
    },
  );


const AddressFormStack = createStackNavigator(
  {
    AddressForm: {
      getScreen: () => require('./AddressFormScreen').default,
    },
  },
  { 
    //  mode: 'modal',
    //  headerMode: 'none',
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: theme.color.green,
      headerStyle: {
        backgroundColor: theme.color.white,
      },
      headerTitleStyle: {
        color: theme.color.black,
      },
    },
  },
);
  
  const TabNavigator = createBottomTabNavigator({
    Home: HomeStack,
    Orders: {
        getScreen: () => require('./OrdersScreen').default,
      },
    Addresses: {
        getScreen: () => require('./AddressScreen').default,
      },
  },{
      tabBarComponent: props => <TabBar {...props} />
  });
  
  
  const MainNavigator = createStackNavigator({
    Tab: TabNavigator,
    AddressForm: AddressFormStack,
  },{  mode: 'modal',
  header:null,
    navigationOptions:{
      mode: 'modal',
      header:null
        // title:"BloomGrains",
        // headerStyle:{
        //     // backgroundColor: "orange",
        
        // },
        // // headerTintColor: 'orange',
        //     headerTitleStyle: {s
        //       fontWeight: 'bold',
        //     },
    }
  }
);
  
  const AppNavigator = createSwitchNavigator(
    {
      Splash: {
        getScreen: () => require('./SplashScreen').default,
      },
      Auth: AuthNavigator,
      Main: MainNavigator,
    },
    {
      initialRouteName: 'Splash',
    },
);

class Navigation extends Component {
  state = {};
  render() {
    return (
      <AppNavigator ref={r=>NavigationService.setTopLevelNavigator(r)}/>
    );
  }
}

export default Navigation;