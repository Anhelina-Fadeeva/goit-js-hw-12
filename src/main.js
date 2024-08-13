'use strict';
import { searchImages } from './js/pixabay-api';

import { renderImages, onFetchError } from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import axios from 'axios';

const gallery = document.querySelector('.gallery');

const form = document.querySelector('.form');

const input = document.querySelector('.input');

const loader = document.querySelector('.loader');

const loadMoreBtn = document.querySelector('.btn');

let inputValue;
let page = 1;
let limit = 15;
let totalPages = 0;

form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleClick);

function handleSubmit(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('visually-hidden');
  loader.classList.remove('visually-hidden');

  inputValue = input.value.trim();
  if (inputValue === '') {
    loader.classList.add('visually-hidden');
    iziToast.error({
      maxWidth: '370px',
      position: 'topRight',
      messageColor: 'white',
      backgroundColor: 'red',
      message: 'This field can not be empty! Please, write your request!',
    });
    return;
  }

  page = 1;

  searchImages(inputValue, page)
    .then(images => {
      totalPages = Math.ceil(images.totalHits / limit);
      loader.classList.add('visually-hidden');
      if (images.hits.length === 0) {
        iziToast.error({
          maxWidth: '370px',
          position: 'topRight',
          messageColor: 'white',
          backgroundColor: 'red',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      } else {
        loader.classList.add('visually-hidden');
        renderImages(images);
        if (page < totalPages) {
          loadMoreBtn.classList.remove('visually-hidden');
        }
      }
    })
    .catch(onFetchError);

  form.reset();
}

async function handleClick(event) {
  page += 1;
  loader.classList.remove('visually-hidden');
  loadMoreBtn.classList.add('visually-hidden');
  const newPage = await searchImages(inputValue, page);

  renderImages(newPage);

  const firstCard = document.querySelector('.gallery li');
  const cardHeight = firstCard.getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
  if (page < totalPages) {
    loadMoreBtn.classList.remove('visually-hidden');
    loader.classList.add('visually-hidden');
  }

  if (page >= totalPages) {
    loadMoreBtn.classList.add('visually-hidden');
    loader.classList.add('visually-hidden');
    return iziToast.error({
      position: 'topRight',
      messageColor: 'black',
      backgroundColor: 'blue',
      message: "We're sorry, but you've reached the end of search results.",
    });
  }
}