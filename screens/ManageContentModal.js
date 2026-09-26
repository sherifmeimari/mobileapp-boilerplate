import { useContext, useLayoutEffect, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import IconButton from '../components/ui/IconButton';
import Button from '../components/ui/Button';
import ContentForm from '../components/ManageContent/ContentForm';
import { Colors } from '../constants/styles';

import { ContentContext } from '../store/content-context';
import { storeContent, updateContent, deleteContent } from '../util/http';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import ErrorOverlay from '../components/ui/ErrorOverlay';

function ManageContentModal({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const contentCtx = useContext(ContentContext);
  // route.params might be undefined
  const editedContentItemId = route.params?.contentItemId;
  // !! is a trick to convert into a boolean
  const isEditing = !!editedContentItemId;

  const selectedContentItem = contentCtx.content.find(
    (contentItem) => contentItem.id === editedContentItemId,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Content' : 'Add Content',
    });
  }, [navigation, isEditing]);

  async function deleteContentHandler() {
    setIsSubmitting(true);
    try {
      await deleteContent(editedContentItemId);
      setIsSubmitting(false);
      contentCtx.deleteContent(editedContentItemId);
      navigation.goBack();
    } catch (error) {
      setError('Could not delete content - please try again later!');
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(contentData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        contentCtx.updateContent(editedContentItemId, contentData);
        await updateContent(editedContentItemId, contentData);
      } else {
        const id = await storeContent(contentData);
        contentCtx.addContent({ ...contentData, id: id });
      }
      setIsSubmitting(false);
      navigation.goBack();
    } catch (error) {
      setError('Could not save data - please try again later!');
      setIsSubmitting(false);
    }
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ContentForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedContentItem}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={Colors.error500}
            size={36}
            onPress={deleteContentHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageContentModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: Colors.primary200,
    alignItems: 'center',
  },
});
