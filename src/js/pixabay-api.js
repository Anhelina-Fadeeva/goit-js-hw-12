import axios from 'axios';

import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const loader = document.querySelector('.loader');

const API_KEY = '45157034-b6e4e263cfc131778ce7a37cc';
const URL = 'https://pixabay.com/api/';

export async function searchImages(query, page) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: page,
  });

  try {
    const response = await axios.get(`${URL}?${params}`);
    return response.data;
  } catch (error) {
    iziToast.error({
      maxWidth: '370px',
      position: 'topRight',
      messageColor: 'white',
      backgroundColor: 'red',
      message: `${error}`,
    });
    loader.classList.add('visually-hidden');
  }
}