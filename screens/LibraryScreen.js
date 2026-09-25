import { View, Text, StyleSheet } from 'react-native';

function LibraryScreen({ navigation }) {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>My Library</Text>
    </View>
  );
}

export default LibraryScreen;

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
