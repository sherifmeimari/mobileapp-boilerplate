import { useContext } from 'react';
import { Pressable, ScrollView, View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/styles';

import { AuthContext } from '../store/auth-context';

function MyAccountScreen({ navigation }) {
  const authCtx = useContext(AuthContext);

  return (
    <View style={styles.rootContainer}>
      {/* <Text style={styles.title}>My Account</Text>
      <Pressable onPress={() => navigation.navigate('Favorites')}>
        <View style={styles.FavoritesContainer}>
          <Text>Favorites</Text>
        </View>
      </Pressable>
      <Button onPress={authCtx.logout}>Logout</Button> */}

      <ScrollView>
        <Pressable onPress={() => navigation.navigate('Favorites')}>
          <View style={styles.itemContainer}>
            <Text>Favorites</Text>
          </View>
        </Pressable>
        <Pressable onPress={authCtx.logout}>
          <View style={styles.itemContainer}>
            <Text>Logout</Text>
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
}

export default MyAccountScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  itemContainer: {
    padding: 10,
    borderBottomColor: Colors.primary200,
    borderBottomWidth: 1,
    borderRadius: 8,
  },
});
