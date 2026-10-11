import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/styles';

function SearchScreen() {
  return <View style={styles.rootContainer}></View>;
}

export default SearchScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.primary100,
  },
});
