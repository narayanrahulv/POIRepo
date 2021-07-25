// React
import React from 'react';
import { createAppContainer, createSwitchNavigator, } from 'react-navigation';

// Screens
import MainScreen from '../screens/MainScreen';

const MainNavigator = createSwitchNavigator({
    Main: { screen: MainScreen }
},
{
    initialRouteName: 'Main'
});

const AppContainer = createAppContainer(MainNavigator);

export default () => {
    return <AppContainer />
}