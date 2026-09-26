import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fetchContent } from '../util/http';

import ContentOutput from '../components/Content/ContentOutput';
import { ContentContext } from '../store/content-context';
import { AuthContext } from '../store/auth-context';

import LoadingOverlay from '../components/ui/LoadingOverlay';
import ErrorOverlay from '../components/ui/ErrorOverlay';

function HomeScreen() {
  // const [fetchedMessage, setFetchedMessage] = useState('');
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  // depends on the API how we prove we are authenticated
  //   for some we add headers
  //   for firebase we add the token in the auth query parameter
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  // saves us extra http requests and serves as local memory
  const contentCtx = useContext(ContentContext);

  useEffect(() => {
    async function getContent() {
      // not really needed
      setIsFetching(true);
      try {
        const content = await fetchContent(token);
        contentCtx.setContent(content);
      } catch (error) {
        console.log(error);
        setError('Could not fetch content!');
      }
      setIsFetching(false);
    }
    getContent();
  }, [token]);

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.rootContainer}>
      <ContentOutput content={contentCtx.content} contentPeriod="Total" />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
