import { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../constants/styles';

import ContentOutput from '../components/Content/ContentOutput';
import { ContentContext } from '../store/content-context';
import { fetchContent } from '../util/http';

function FavoritesScreen() {
  const contentCtx = useContext(ContentContext);

  useEffect(() => {
    async function getContent() {
      const content = await fetchContent();
      contentCtx.setContent(content);
    }
    getContent();
  }, []);

  const favoriteContent = contentCtx.content.filter((contentItem) => {});

  return (
    <View style={styles.rootContainer}>
      <ContentOutput
        content={favoriteContent}
        contentCollectionTitle="Favorites"
      />
    </View>
  );
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
