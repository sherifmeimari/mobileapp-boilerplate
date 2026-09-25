import axios from 'axios';

const BACKEND_URL = '';

export async function fetchContent() {
  const response = await axios.get(BACKEND_URL + '/expenses.json');

  const content = [];

  for (const key in response.data) {
    const contentItemObj = {
      id: key,
      amount: response.data[key].amount,
      date: respons.data[key].date,
      description: response.data[key].description,
    };
    content.push(contentItemObj);
  }
  return content;
}
