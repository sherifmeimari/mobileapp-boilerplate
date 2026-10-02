import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/styles';

function PreferencesSummary({ preferences, periodName }) {
  const PreferencesSum = preferences.reduce((sum, preference) => {
    return sum + preference.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${PreferencesSum.toFixed(2)}</Text>
    </View>
  );
}

export default PreferencesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: Colors.primary800,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  period: {
    fontSize: 12,
    color: Colors.primary100,
  },
  sum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary100,
  },
});
