import React from 'react';
import { View, Text, Button, TextInput, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: '',
      color: '#090C08'};
  }

  render() {    
    return (
      <View style={styles.fullContainer}>

        <ImageBackground 
          source={require('../assets/BackgroundImage.png')} 
          resizeMode="cover" 
          style={styles.image}
          imageStyle={{ borderRadius: 50/2}}>
        <Text style={styles.title}>Chat App</Text>

        <View style={styles.userContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(name) => this.setState({ name })}
            value={this.state.name}
            placeholder='  Your Name' />

          <Text style={styles.text}> Choose Background Color: </Text>
              <View style={styles.colorContainer}>
                <TouchableOpacity
                  style={styles.color1}
                  onPress={() => {this.setState({color: '#090C08'})}}
                >
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.color2}
                  onPress={() => {this.setState({color: '#474056'})}}
                >
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.color3}
                  onPress={() => {this.setState({color: '#8A95A5'})}}
                >
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.color4}
                  onPress={() => {this.setState({color: '#B9C6AE'})}}
                >
                </TouchableOpacity>
              </View>

          <Button
            title="Start Chatting"
            color={this.state.color}
            onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, color: this.state.color })}
          />
        </View>

        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  fullContainer: {
    flex:1, 
    justifyContent: 'center', 
    alignItems: 'center'},

  image: {
    flex: 1,
    resizeMode: 'cover',
    flexDirection: 'column',
    alignItems: 'center',
  },

  title: {
    flex: 1,
    padding: '20%',
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  text: {
    marginTop: 30,
    fontWeight: 'bold',
    fontSize: 17,
  },

  userContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
    width: 300,
    marginBottom: 15,
    borderRadius: 10
  },

  input: { 
    height: 50, 
    borderColor: 'gray', 
    borderWidth: 1 
  },

  colorContainer: {
    flexDirection: 'row',
    width: 200,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 30
  },

  color1: {
    flex: 1,
    backgroundColor: '#090C08',
    height: 50,
    borderRadius: 25,
    right: 5
  },

  color2: {
    flex: 1,
    backgroundColor: '#474056',
    borderRadius: 25,
    left: 10
  },

  color3: {
    flex: 1,
    backgroundColor: '#8A95A5',
    borderRadius: 25,
    left: 25
  },

  color4: {
    flex: 1,
    backgroundColor: '#B9C6AE',
    borderRadius: 25,
    left: 40
  },

})