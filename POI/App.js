// React
import React, { Component, Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

// Navigators
import MainNavigator from './src/navigators/MainNavigator';

export default class App extends Component {
	render() {
		return <MainNavigator />
	}
}