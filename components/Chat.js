import React from 'react';
import { View, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    }
  }

  componentDidMount(){
    let name = this.props.route.params.name; // OR ...
    // let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    this.setState({
      messages: [
        {
          _id: 1,
          text: 'first test message',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'react native',
            avatar: 'http://placeimg.com/140/140/any'
          },
        },
        {
          _id: 2,
          text: 'This is a system message',
          createdAt: new Date(),
          system: true,
        },
      ]
    })
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
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />

      </View>
    );
};
}