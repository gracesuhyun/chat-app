import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import 'react-native-gesture-handler';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat'
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';

const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      user: {
        _id: '',
        name: '',
        avatar: 'http://placeimg.com/140/140/any',
      },
      isConnected: false,
    };

    const firebaseConfig = {
      apiKey: "AIzaSyCySJTysG-rullhFQttw8hFAdoRTRcg1Ec",
      authDomain: "chat-app-b0680.firebaseapp.com",
      projectId: "chat-app-b0680",
      storageBucket: "chat-app-b0680.appspot.com",
      messagingSenderId: "707100552837",
      appId: "1:707100552837:web:47a613d1c7253c42ab03ec",
      measurementId: "G-KLSCV8FY1Z"
    };

      // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    this.referenceChatMessages = firebase.firestore().collection('messages');
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: 'http://placeimg.com/140/140/any',
        },
      });
    });
    this.setState({
        messages,
    });
  };

  async getMessages() {
    let messages = '';
    try {
      messages = await AsyncStorage.getItem('messages') || [];
      this.setState({
        messages: JSON.parse(messages)
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: []
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  componentDidMount() {

    //Display username in navigation
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    NetInfo.fetch().then(connection => {
      if (connection.isConnected) {
        console.log('online');
        this.setState({
          isConnected: true,
        });

        this.referenceChatMessages = firebase.firestore().collection('messages');

        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
              firebase.auth().signInAnonymously();
            }
            this.setState({
              messages: [],
              user: {
                _id: user.uid,
                name: name,
                avatar: 'https://placeimg.com/140/140/any',
              },
            });

            this.unsubscribe = this.referenceChatMessages
              .orderBy('createdAt', 'desc')
              .onSnapshot(this.onCollectionUpdate);
            this.saveMessages();
        });
      } else {
        console.log('offline');
        this.setState({
          isConnected: false,
        });
        this.getMessages();
        window.alert('You are currently offline and are unable to send messages.');
      }
    });
  };

  componentWillUnmount() {
      this.unsubscribe();
      this.authUnsubscribe();
  }

  onSend(messages = []) {
      this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
      }), () => {
          this.saveMessages();
          this.addMessages();
      });
  }

  addMessages() {
    const message = this.state.messages[0];

    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text || '',
      createdAt: message.createdAt,
      user: message.user,
    });
  }

//Allows bubble customization   
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: 'blue'
          }
        }}
      />
    )
  }


  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return(
        <InputToolbar
          {...props}
        />
      );
    }
  }

  render() {
      const { color, name } = this.props.route.params;

      return (
          <View style={[{ backgroundColor: color }, styles.container]}>
              <GiftedChat
                  renderBubble={this.renderBubble.bind(this)}
                  renderInputToolbar={this.renderInputToolbar.bind(this)}
                  messages={this.state.messages}
                  onSend={messages => this.onSend(messages)}
                  user={this.state.user}
              />
              {/*Prevent hidden input field on Android*/}
              {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
          </View>
      );
  };
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  }
})