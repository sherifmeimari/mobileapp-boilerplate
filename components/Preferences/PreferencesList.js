import { Text, FlatList } from 'react-native';
import PreferencesItem from './PreferencesItem';

function renderPreferencesItem(itemData) {
  return <PreferencesItem {...itemData.item} />;
}

function PreferencesList({ preferences }) {
  return (
    <FlatList
      data={preferences}
      renderItem={renderPreferencesItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default PreferencesList;
