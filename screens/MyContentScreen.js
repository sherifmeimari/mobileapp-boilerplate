import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/ui/Button';

function MyContentScreen({ navigation }) {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>My Content</Text>
      <Button onPress={() => navigation.navigate('ManageContent')}>
        Add Content
      </Button>
    </View>
  );
}

export default MyContentScreen;

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
