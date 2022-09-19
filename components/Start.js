import React from 'react';
import { View, Text, Button, TextInput, ImageBackground, StyleSheet } from 'react-native';

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state
     = { name: '' };
  }

  render() {    
    return (
      <View style={{
        flex:1, 
        justifyContent: 'center', 
        alignItems: 'center'}}>

        <ImageBackground 
          source={require('../assets/BackgroundImage.png')} 
          resizeMode="cover" 
          style={styles.image}
          imageStyle={{ borderRadius: 50/2}}>
        <Text style={styles.text}>Chat App</Text>

        <Text>Hello there!</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(name) => this.setState({ name })}
          value={this.state.name}
          placeholder='Type here...' />

        <Button
          title="Go to Chat"
          onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name })}
        />

        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    flexDirection: 'column',
    alignItems: 'center',
},
  text: {
    flex: 1,
    padding: '20%',
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
},

})