import { View, StyleSheet } from 'react-native';
import { Colors } from '../constants/styles';

import ContentOutput from '../components/Content/ContentOutput';

function FavoritesScreen() {
  return (
    <View style={styles.rootContainer}>
      <ContentOutput contentCollectionTitle="Favorites" />
    </View>
  );
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: Colors.primary100,
  },
});
