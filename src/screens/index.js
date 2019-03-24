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
    },
    {
      navigationOptions: { ...primaryHeader },
    },
  );
  
  const TabNavigator = createBottomTabNavigator({
    Home: HomeStack,
    Orders: {
        getScreen: () => require('./OrdersScreen').default,
      },
    Profile: {
        getScreen: () => require('./ContactScreen').default,
      },
  },{
      tabBarComponent: props => <TabBar {...props} />
  });
  
  const MainNavigator = createStackNavigator({
    Tab: TabNavigator,
  },{
    navigationOptions:{
      header:null
        // title:"BloomGrains",
        // headerStyle:{
        //     // backgroundColor: "orange",
        
        // },
        // // headerTintColor: 'orange',
        //     headerTitleStyle: {
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