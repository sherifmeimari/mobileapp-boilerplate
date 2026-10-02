import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import PreferencesOutput from '../components/Preferences/PreferencesOutput';
import { PreferencesContext } from '../store/preferences-context';
import { AuthContext } from '../store/auth-context';
import { fetchPreferences } from '../util/http';
import { getDateMinusDays } from '../util/date';

import LoadingOverlay from '../components/ui/LoadingOverlay';
import ErrorOverlay from '../components/ui/ErrorOverlay';

function PreferencesScreen() {
  // const [fetchedMessage, setFetchedMessage] = useState('');
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  // depends on the API how we prove we are authenticated
  //   for some we add headers
  //   for firebase we add the token in the auth query parameter
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  // saves us extra http requests and serves as local memory
  const preferencesCtx = useContext(PreferencesContext);

  useEffect(() => {
    async function getPreferences() {
      // not really needed
      setIsFetching(true);
      try {
        const preferences = await fetchPreferences(token);
        preferencesCtx.setPreferences(preferences);
      } catch (error) {
        setError('Could not fetch preferences!');
      }
      setIsFetching(false);
    }
    getPreferences();
  }, [token]);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <PreferencesOutput
      preferences={preferencesCtx.preferences}
      preferencesPeriod="Last 7 Days "
      fallbackText="No preferences registered for the last 7 days."
    />
  );
}

export default PreferencesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
