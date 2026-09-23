import { View, Text, StyleSheet } from 'react-native';

function ChatScreen() {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Chat with our agent</Text>
    </View>
  );
}

export default ChatScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
