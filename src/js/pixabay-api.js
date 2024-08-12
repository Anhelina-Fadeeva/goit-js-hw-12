'use strict';
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

const API_KEY = '45109890-d15cee52eedc615dd4ac8bedf';

async function searchImagesPixaby({ q, page, per_page }) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: per_page,
  });

  return await axios
    .get('?', { params })
    .then(({ data }) => data)
    .catch(err => console.log(err));
}

export { searchImagesPixaby };