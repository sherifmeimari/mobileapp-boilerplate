import { useContext, useLayoutEffect, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import IconButton from '../components/ui/IconButton';
import Button from '../components/ui/Button';
import PreferencesForm from '../components/ManagePreferences/PreferencesForm';
import { Colors } from '../constants/styles';

import { PreferencesContext } from '../store/preferences-context';
import {
  storePreferences,
  updatePreferences,
  deletePreferences,
} from '../util/http';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import ErrorOverlay from '../components/ui/ErrorOverlay';

function ManagePreferencesModal({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();
  const preferencesCtx = useContext(PreferencesContext);
  // route.params might be undefined
  const editedPreferenceId = route.params?.preferencesItemId;
  // !! is a trick to convert into a boolean
  const isEditing = !!editedPreferenceId;

  const selectedPreferenceItem = preferencesCtx.preferences.find(
    (preferenceItem) => preferenceItem.id === editedPreferenceId,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Preference' : 'Add Preference',
    });
  }, [navigation, isEditing]);

  async function deletePreferencesHandler() {
    setIsSubmitting(true);
    try {
      await deletePreferences(editedPreferenceId);
      setIsSubmitting(false);
      preferencesCtx.deletePreferences(editedPreferenceId);
      navigation.goBack();
    } catch (error) {
      setError('Could not delete preference - please try again later!');
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
        preferencesCtx.updatePreferences(editedPreferenceId, contentData);
        await updatePreferences(editedPreferenceId, contentData);
      } else {
        const id = await storePreferences(contentData);
        preferencesCtx.addPreference({ ...contentData, id: id });
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
      <PreferencesForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedPreferenceItem}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={Colors.error500}
            size={36}
            onPress={deletePreferencesHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManagePreferencesModal;

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
