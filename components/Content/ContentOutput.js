import { View, StyleSheet } from 'react-native';
import ContentList from './ContentList';
import ContentSummary from './ContentSummary';
import { Colors } from '../../constants/styles';

function ContentOutput({ content, contentCollectionTitle }) {
  return (
    <View style={styles.container}>
      <ContentSummary
        content={content}
        collectionTitle={contentCollectionTitle}
      />
      <ContentList content={content} />
    </View>
  );
}

export default ContentOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: Colors.primary100,
  },
});
