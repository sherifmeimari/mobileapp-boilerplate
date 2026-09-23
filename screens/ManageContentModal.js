import { View, Text, StyleSheet } from 'react-native';

function ManageContentModal() {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Manage Content Form</Text>
    </View>
  );
}

export default ManageContentModal;

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
