import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { Colors } from '../constants/styles';

function ChatsScreen({ navigation }) {
  const chatList = [
    {
      id: 1,
      name: 'Our Agent',
      lastMessage: 'Hi there! How are you?',
    },
    {
      id: 2,
      name: 'John Doe',
      lastMessage: 'Hey, how are you?',
    },
    {
      id: 3,
      name: 'Jane Smith',
      lastMessage: 'Are you coming to the party?',
    },
    {
      id: 4,
      name: 'Bob Johnson',
      lastMessage: "Don't forget to bring the documents.",
    },
  ];

  return (
    <View style={styles.rootContainer}>
      <FlatList
        data={chatList}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate('Chat', { chatId: item.id })}
          >
            <View style={styles.chatContainer}>
              <Text>{item.name}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

export default ChatsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.primary100,
    justifyContent: 'center',
  },
  chatContainer: {
    padding: 10,
    borderBottomColor: Colors.primary200,
    borderBottomWidth: 1,
    borderRadius: 8,
  },
});
