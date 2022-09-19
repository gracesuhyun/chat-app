import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Alert, Button } from 'react-native';

// import 'react-native-gesture-handler';
// import Screen1 from './components/Screen1';
// import Screen2 from './components/Screen2';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

   // alert the user input
  alertMyText (input = []) {
    Alert.alert(input.text);
  }

  render() {
    return (
      <View style={{flex:1, justifyContent:'center'}}>

       <TextInput
         style={{height: 40, borderColor: 'gray', borderWidth: 1}}
         onChangeText={(text) => this.setState({text})}
         value={this.state.text}
         placeholder='Type here ...'
       />

        <Text>You wrote: {this.state.text}</Text>

       <Button
        onPress={() => {
        this.alertMyText({text: this.state.text});
        }}
        title="Press Me"
      />
{/* 
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Screen1"
        >
        <Stack.Screen
          name="Screen1"
          component={Screen1}
        />
        <Stack.Screen
          name="Screen2"
          component={Screen2}
        />
        </Stack.Navigator>
      </NavigationContainer> */}

     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },

  box1: {
    flex: 10,
    backgroundColor: 'blue',
  },

  box2: {
    flex: 120,
    backgroundColor: 'red',
  },

  box3: {
    flex: 50,
    backgroundColor: 'green',
  },
})