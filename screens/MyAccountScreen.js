import { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/ui/Button';

import { AuthContext } from '../store/auth-context';

function MyAccountScreen({ navigation }) {
  const authCtx = useContext(AuthContext);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>My Account</Text>
      <Button onPress={authCtx.logout}>Logout</Button>
    </View>
  );
}

export default MyAccountScreen;

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
