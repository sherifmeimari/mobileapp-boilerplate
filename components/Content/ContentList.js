import { Text, FlatList } from 'react-native';
import ContentItem from './ContentItem';

function renderItem(itemData) {
  return <ContentItem {...itemData.item} />;
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
