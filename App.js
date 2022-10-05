import React, { Component } from 'react';
// import { StyleSheet, View, Text, TextInput, Alert, Button } from 'react-native';
import 'react-native-gesture-handler';

import Chat from './components/Chat';
import Start from './components/Start';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class App extends React.Component {

  render() {
    return (

      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Start"
        >
          <Stack.Screen
            name="Start"
            component={Start}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
          />
        </Stack.Navigator>
      </NavigationContainer>

    );
  }
}