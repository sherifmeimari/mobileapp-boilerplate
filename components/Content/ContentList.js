import { Text, FlatList } from 'react-native';

function renderItem(itemData) {
  return <Text>{itemData.item.description}</Text>;
}

function ContentList({ content }) {
  return (
    <FlatList
      data={content}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ContentList;
