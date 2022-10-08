import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import 'react-native-gesture-handler';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'

const firebase = require('firebase');
require('firebase/firestore');

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      user: {
        _id: '',
        avatar: 'http://placeimg.com/140/140/any',
        name: '',
      }
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


  componentDidMount() {

      //Display username in navigation
      let { name } = this.props.route.params;
      this.props.navigation.setOptions({ title: name });

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
                  avatar: 'https://placeimg.com/140/140/any'
              },
          });
          this.unsubscribe = this.referenceChatMessages
              .orderBy('createdAt', 'desc')
              .onSnapshot(this.onCollectionUpdate);
      });
  }

  componentWillUnmount() {
      this.unsubscribe();
      this.authUnsubscribe();
  }


  //Appends new message to previous  
  onSend(messages = []) {
      this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
      }), () => {
          this.addMessages(this.state.messages[0]);
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
              wrapperStyle={styles.bubble}
          />
      )
  }

  render() {
      const { color, name } = this.props.route.params;

      return (
          <View style={[{ backgroundColor: color }, styles.container]}>
              <GiftedChat
                  renderBubble={this.renderBubble.bind(this)}
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
  },
  chatTitle: {
      color: '#FFFFFF'
  },
  bubble: {
      left: {
          backgroundColor: 'white',
      },
      right: {
          backgroundColor: 'blue'
      }
  }
})