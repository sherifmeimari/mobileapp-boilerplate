import { View, Text, StyleSheet } from 'react-native';

function ContentDetailsScreen({ navigation }) {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Content Details Screen</Text>
    </View>
  );
}

export default ContentDetailsScreen;

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
