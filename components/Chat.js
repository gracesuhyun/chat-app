import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'

import * as firebase from 'firebase/app';
import 'firebase/firestore';

export default class Chat extends React.Component {

  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: '',
      }
    }

    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyCPv1Gpaiaw4c_f82j1a0_4yn7Qa892J64",
        authDomain: "test-1a507.firebaseapp.com",
        projectId: "test-1a507",
        storageBucket: "test-1a507.appspot.com",
        messagingSenderId: "359452519929",
        appId: "1:359452519929:web:735a5277736c4a062fa128",
        measurementId: "G-N813M3V1X9"
      });
    }
    
    this.referenceChatMessages = firebase.firestore().collection('messages');
  }

  onCollectionUpdate = (QuerySnapshot) => {
    const messages = [];
   // go through each document
   QuerySnapshot.forEach((doc) => {
     // get the QueryDocumentSnapshot's data
     let data = doc.data();
     messages.push({
       _id: data._id,
       text: data.text,
       createdAt: data.createdAt.toDate(),
       user: data.user,
      });
    });
    this.setState({
      messages,
    });
  };

  componentDidMount() {
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    this.referenceChatMessages = firebase.firestore().collection('messages');
    if (this.referenceChatMessages) {
        this.unsubscribe = this.referenceChatMessages.onSnapshot(this.onCollectionUpdate);
    } else {
        this.setState({
            messages: [
                {
                    _id: 2,
                    text: `${name} has entered the chat`,
                    createdAt: new Date(),
                    system: true,
                },
            ]
        });
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
    this.authUnsubscribe();
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
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
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
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />

      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }

      </View>
    );
  };
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