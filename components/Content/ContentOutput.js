import { View, StyleSheet } from 'react-native';
import ContentList from './ContentList';
import ContentSummary from './ContentSummary';
import { Colors } from '../../constants/styles';

const DUMMY_CONTENT = [
  {
    id: 'c1',
    description: 'A pair of shoes',
    amount: 59.99,
  },
  {
    id: 'c2',
    description: 'A pair of shoes',
    amount: 59.99,
  },
  {
    id: 'c3',
    description: 'A pair of shoes',
    amount: 59.99,
  },
  {
    id: 'c4',
    description: 'A pair of shoes',
    amount: 59.99,
  },
  {
    id: 'c5',
    description: 'A pair of shoes',
    amount: 59.99,
  },
];

function ContentOutput({ content, contentCollectionTitle }) {
  return (
    <View style={styles.container}>
      <ContentSummary
        content={DUMMY_CONTENT}
        collectionTitle={contentCollectionTitle}
      />
      <ContentList content={DUMMY_CONTENT} />
    </View>
  );
}

export default ContentOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.primary100,
  },
});
