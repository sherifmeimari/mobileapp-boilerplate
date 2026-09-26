import axios from 'axios';

const BACKEND_URL = 'https://boilerplate-33dd4-default-rtdb.firebaseio.com/';

export async function storeContent(contentItemData) {
  const response = await axios.post(
    BACKEND_URL + '/expenses.json',
    contentItemData,
  );
  const id = response.data.name;
  return id;
}

export async function fetchContent(token) {
  const response = await axios.get(
    // BACKEND_URL + '/expenses.json' + '?auth=' + token,
    BACKEND_URL + '/expenses.json',
  );
  const content = [];

  for (const key in response.data) {
    const contentItemObj = {
      id: key,
      amount: response.data[key].amount,
      date: response.data[key].date,
      description: response.data[key].description,
    };
    content.push(contentItemObj);
  }
  return content;
}

export function updateContent(id, contentItemData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, contentItemData);
}

export function deleteContent(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
