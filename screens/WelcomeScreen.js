import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

import { AuthContext } from '../store/auth-context';

function WelcomeScreen() {
  const [fetchedMessage, setFetchedMessage] = useState('');

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  useEffect(() => {
    // depends on the API how we prove we are authenticated
    // for some we add headers
    // for firebase we add the token in the auth query parameter
    axios
      .get(
        'https://boilerplate-33dd4-default-rtdb.firebaseio.com/message.json?auth=' +
          token,
      )
      .then((response) => {
        setFetchedMessage(response.data);
      });
  }, [token]);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>You authenticated successfully!</Text>
      <Text style={styles.title}>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

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
