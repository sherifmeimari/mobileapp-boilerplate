import { View, TextInput, StyleSheet } from 'react-native';
import IconButton from '../ui/IconButton';
import { Colors } from '../../constants/styles';

function ChatInput() {
  return (
    <View style={styles.container}>
      <View style={styles.attachmentButton}>
        <IconButton icon="add" size={24} color="#fff" />
      </View>
      <TextInput style={styles.input} />
      <View style={styles.cameraButton}>
        <IconButton icon="camera" size={24} color="#fff" />
      </View>
      <View style={styles.sendButton}>
        <IconButton icon="send" size={24} color="#fff" />
      </View>
    </View>
  );
}

export default ChatInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: Colors.primary100,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.primary800,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary300,
  },
  sendButton: {
    backgroundColor: Colors.primary500,
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: 30,
  },
  attachmentButton: {
    backgroundColor: Colors.primary800,
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: 30,
    marginRight: 8,
  },
  cameraButton: {
    backgroundColor: Colors.primary800,
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: 30,
    marginRight: 8,
  },
});
