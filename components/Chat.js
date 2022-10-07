import React from 'react';
import 'react-native-gesture-handler';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as firebase from 'firebase';
import 'firebase/firestore';

export default class Chat extends React.Component {

  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
          _id: '',
          avatar: '',
          name: '',
      },
    }

    const firebaseConfig = {
      databaseURL: "chat-app-b0680.firebaseio.com",
      apiKey: "AIzaSyCySJTysG-rullhFQttw8hFAdoRTRcg1Ec",
      authDomain: "chat-app-b0680.firebaseapp.com",
      projectId: "chat-app-b0680",
      storageBucket: "chat-app-b0680.appspot.com",
      messagingSenderId: "707100552837",
      appId: "1:707100552837:web:47a613d1c7253c42ab03ec",
      measurementId: "G-KLSCV8FY1Z"
    };

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
        name: data.user.name,
        avatar: data.user.avatar,
       },
      });
    });
    this.setState({
      messages,
    });
  };

  addMessages() {
    const message = this.state.messages[0];

    this.referenceChatMessages.add({
        _id: this.state._id,
        text: message.text,
        createdAt: message.createdAt,
        user: message.user,
    });
}

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

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      this.addMessages(this.state.messages[0]);
    });
  }

  render() {
    let color = this.props.route.params.color;

    return (
      <View style={{
        flex: 1,
        backgroundColor: color
      }}>
        
      <GiftedChat
        renderBubble={this.renderBubble.bind(this)}
        placeholder='Type your message'
        messages={this.state.messages}
        showAvatarForEveryMessage={true}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.state.uid,
          name: this.state.name,
          avatar: 'ttps://placeimg.com/140/140/people'
        }}
      />

      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }

      </View>
    );
  };

  componentDidMount() {
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    this.referenceChatMessages = firebase.firestore().collection('messages');

    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
          firebase.auth().signInAnonymously();
      }
      this.setState({
        // uid: user.uid,
        messages: [],
        user: {
            // _id: user.uid,
            name: name,
        },
      });

      this.referenceChatMessages = firebase.firestore().collection('messages').where('uid', '==', this.state.uid);

      this.unsubscribe = this.referenceChatMessages
      .orderBy('createdAt', 'desc')
      .onSnapshot(this.onCollectionUpdate);
    });
  }

  // componentWillUnmount() {
  //   this.authUnsubscribe();
  //   this.unsubscribe();
  // }
}




    // this.setState({
    //   messages: [
    //     {
    //       _id: 1,
    //       text: 'first test message',
    //       createdAt: new Date(),
    //       user: {
    //         _id: 2,
    //         name: 'react native',
    //         avatar: 'http://placeimg.com/140/140/any'
    //       },
    //     },
    //     {
    //       _id: 2,
    //       text: 'This is a system message',
    //       createdAt: new Date(),
    //       system: true,
    //     },
    //   ]
    // })