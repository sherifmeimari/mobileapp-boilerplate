import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { fetchProducts } from '../util/http';

import LoadingOverlay from '../components/ui/LoadingOverlay';
import ErrorOverlay from '../components/ui/ErrorOverlay';

import { useQuery } from '@tanstack/react-query';

function HomeScreen() {
  // replaced with useQuery
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['AllContent'],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <LoadingOverlay />;
  }
  if (isError) {
    return <ErrorOverlay message={error} />;
  }

  return (
    <View style={styles.rootContainer}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          // const isCheckoutLoading = checkoutProductId === item.id;

          return (
            <View style={styles.card}>
              {item.featuredImage?.url && (
                <Image
                  source={{ uri: item.featuredImage.url }}
                  style={styles.image}
                />
              )}

              <View style={styles.details}>
                <Text style={styles.title}>{item.title}</Text>

                <Text style={styles.price}>
                  ${item.variants.edges[0]?.node.price.amount}{' '}
                  {item.variants.edges[0]?.node.price.currencyCode}
                </Text>
              </View>

              {/* <TouchableOpacity
                style={[
                  styles.button,
                  isCheckoutLoading && styles.buttonDisabled,
                ]}
                onPress={() => handleAddToCart(item)}
                disabled={isCheckoutLoading}
              >
                <Text style={styles.buttonText}>
                  {isCheckoutLoading ? 'Opening...' : 'Add to Cart'}
                </Text>
              </TouchableOpacity> */}
            </View>
          );
        }}
      />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  list: {
    padding: 16,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },

  details: {
    flex: 1,
    marginLeft: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
  },

  price: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },

  button: {
    backgroundColor: '#008060',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
