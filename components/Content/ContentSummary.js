import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/styles';

function ContentSummary({ collectionTitle }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{collectionTitle}</Text>
      <Text style={styles.sum}>$177.95</Text>
    </View>
  );
}

export default ContentSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: Colors.primary800,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    color: Colors.primary100,
  },
  sum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary100,
  },
});
