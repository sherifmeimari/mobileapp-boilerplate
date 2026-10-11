import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/styles';
import { messageTypes } from '../../constants/chat';

function MessageCard({ type, message }) {
  return (
    <View
      style={[
        styles.container,
        {
          justifyContent:
            type === messageTypes.SENT ? 'flex-end' : 'flex-start',
        },
      ]}
    >
      <View
        style={[
          styles.messageContainer,
          {
            backgroundColor:
              type === messageTypes.SENT
                ? Colors.primary500
                : Colors.primary800,
          },
        ]}
      >
        <Text style={styles.messageText}>{message}</Text>
      </View>
    </View>
  );
}

export default MessageCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  messageContainer: {
    borderRadius: 16,
    padding: 8,
    maxWidth: '80%',
  },
  messageText: {
    color: 'white',
    fontSize: 16,
  },
});
