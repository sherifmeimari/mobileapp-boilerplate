import { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import ContentOutput from '../components/Content/ContentOutput';
import { ContentContext } from '../store/content-context';
import { AuthContext } from '../store/auth-context';
import { fetchContent } from '../util/http';
import { getDateMinusDays } from '../util/date';

import LoadingOverlay from '../components/ui/LoadingOverlay';
import ErrorOverlay from '../components/ui/ErrorOverlay';

function RecentContentScreen() {
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

  const recentContent = contentCtx.content.filter((contentItem) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return contentItem.date > date7DaysAgo;
  });

  return (
    <ContentOutput
      content={recentContent}
      contentPeriod="Last 7 Days "
      fallbackText="No content registered for the last 7 days."
    />
  );
}

export default RecentContentScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
