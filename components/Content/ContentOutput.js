import { View, StyleSheet } from 'react-native';
import ContentList from './ContentList';
import ContentSummary from './ContentSummary';
import { Colors } from '../../constants/styles';

function ContentOutput({ content, contentPeriod, fallbackText }) {
  let feed = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (content.length > 0) {
    feed = <ContentList content={content} />;
  }

  return (
    <View style={styles.container}>
      <ContentSummary content={content} periodName={contentPeriod} />
      {feed}
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
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});
