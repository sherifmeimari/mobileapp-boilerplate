import { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Colors } from '../constants/styles';
import MessageCard from '../components/Chat/MessageCard';
import { messageTypes } from '../constants/chat';
import ChatInput from '../components/Chat/ChatInput';

function ChatScreen() {
  const messageList = [
    {
      id: 1,
      type: messageTypes.SENT,
      message: 'Hello AI, tell me about your store!',
    },
    {
      id: 2,
      type: messageTypes.RECEIVED,
      message:
        'Hello! Welcome to our store. We offer a wide range of products, including electronics, clothing, and home goods. Feel free to browse our categories and let us know if you have any questions!',
    },
    {
      id: 3,
      type: messageTypes.SENT,
      message: 'Ok, tell me more about the electronics section!',
    },
  ];

  const [messages, setMessages] = useState(messageList);

  return (
    <View style={styles.rootContainer}>
      <FlatList
        style={styles.listContainer}
        keyExtractor={(item) => item.id.toString()}
        data={messages}
        renderItem={({ item }) => (
          <MessageCard type={item.type} message={item.message} />
        )}
      />
      <ChatInput />
    </View>
  );
}

export default ChatScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.primary100,
  },
  listContainer: {
    padding: 8,
  },
});
