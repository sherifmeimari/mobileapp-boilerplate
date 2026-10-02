import axios from 'axios';

const BACKEND_URL = 'https://boilerplate-33dd4-default-rtdb.firebaseio.com/';

export async function storePreferences(preferencesItemData) {
  const response = await axios.post(
    BACKEND_URL + '/expenses.json',
    preferencesItemData,
  );
  const id = response.data.name;
  return id;
}

export async function fetchPreferences(token) {
  const response = await axios.get(
    // BACKEND_URL + '/expenses.json' + '?auth=' + token,
    BACKEND_URL + '/expenses.json',
  );
  const preferences = [];

  for (const key in response.data) {
    const preferencesItemObj = {
      id: key,
      amount: response.data[key].amount,
      date: response.data[key].date,
      description: response.data[key].description,
    };
    preferences.push(preferencesItemObj);
  }
  return preferences;
}

export function updatePreferences(id, preferencesItemData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, preferencesItemData);
}

export function deletePreferences(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}

const STOREFRONT_ACCESS_TOKEN = '010ad8dd35c5bd5edf14376482225c47';
const SHOP_DOMAIN = 'sherif-qmfzledc.myshopify.com';
const API_VERSION = '2026-01';

export async function fetchProducts() {
  const query = `
    query Products {
      products(first: 30) {
        edges {
          node {
            id
            title
            description
            featuredImage { url }
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                  price { amount currencyCode }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(
    `https://${SHOP_DOMAIN}/api/${API_VERSION}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query }),
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const { data, errors } = await response.json();

  if (errors) {
    throw new Error(errors[0].message);
  }

  return data.products.edges.map((edge) => edge.node);
}
