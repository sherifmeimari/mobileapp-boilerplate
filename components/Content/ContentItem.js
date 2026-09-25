import { Pressable, Text, View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/styles';
import { useNavigation } from '@react-navigation/native';

function ContentItem({ description, amount, date }) {
  const navigation = useNavigation();

  function contentPressHandler() {
    navigation.navigate('Details');
  }

  return (
    <Pressable
      onPress={contentPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.contentItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{date}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{amount}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ContentItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  contentItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    // shadow for android
    elevation: 3,
    // shadow for ios
    shadowColor: 'gray',
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: Colors.primary100,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  amount: {
    color: Colors.primary500,
    fontWeight: 'bold',
  },
});
