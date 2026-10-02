import { View, StyleSheet } from 'react-native';
import PreferencesList from './PreferencesList';
import PreferencesSummary from './PreferencesSummary';
import { Colors } from '../../constants/styles';

function PreferencesOutput({ preferences, preferencesPeriod, fallbackText }) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (preferences.length > 0) {
    content = <PreferencesList preferences={preferences} />;
  }

  return (
    <View style={styles.container}>
      <PreferencesSummary
        preferences={preferences}
        periodName={preferencesPeriod}
      />
      {content}
    </View>
  );
}

export default PreferencesOutput;

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
