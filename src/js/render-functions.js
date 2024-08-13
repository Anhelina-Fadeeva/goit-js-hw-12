import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const gallery = document.querySelector('.gallery');

const loader = document.querySelector('.loader');

export function renderImages(images) {
  let img = images.hits
    .map(
      image =>
        `<li>
        <a class="gallery-link" href=${image.largeImageURL}>
          <img src="${image.webformatURL}" alt="${image.tags}" width=360 height=200>
          <div class="gallery-text">
            <p><span>Likes</span>${image.likes}</p>
            <p><span>Views</span>${image.views}</p>
            <p><span>Comments</span>${image.comments}</p>
            <p><span>Downloads</span>${image.downloads}</p>
          </div>
        </a>
      </li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', img);

  let lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionPosition: 'bottom',
    captionsData: 'alt',
  });

  lightbox.refresh();
}

export function onFetchError(error) {
  gallery.innerHTML = '';
  iziToast.error({
    maxWidth: '370px',
    position: 'topRight',
    messageColor: 'white',
    backgroundColor: 'red',
    message: `${error}`,
  });
  loader.classList.add('visually-hidden');
}