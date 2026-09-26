import { Text, FlatList } from 'react-native';
import ContentItem from './ContentItem';

function renderContentItem(itemData) {
  return <ContentItem {...itemData.item} />;
}

function ContentList({ content }) {
  return (
    <FlatList
      data={content}
      renderItem={renderContentItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ContentList;
