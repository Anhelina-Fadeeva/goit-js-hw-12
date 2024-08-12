'use strict';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import refs from './refs';

refs.cardBox.addEventListener('click', event => event.preventDefault());

function showLoader() {
  refs.loader.style.display = 'inline-block';
}

function hideLoader() {
  refs.loader.style.display = 'none';
}

function renderSearcCard(data) {
  const createCardCode = data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="list-group-item scrol"><div class="search-card">
   <div class="card-img-box">
     <a clas="card-link" href="${largeImageURL}"><img class="card-img" src="${webformatURL}" alt="${tags}"></a>
   </div>
   <div class="card-box-text">
     <p class="card-text">Likes<br><span>${likes}</span></p>
     <p class="card-text">Views<br><span>${views}</span></p>
     <p class="card-text">Comments<br><span>${comments}</span></p>
     <p class="card-text">Downloads<br><span>${downloads}</span></p>
   </div>
</div></li>`;
      }
    )
    .join('');

  refs.cardBox.insertAdjacentHTML('beforeend', createCardCode);
  const gallery = new SimpleLightbox('.card-container a', {
    captionsData: 'alt',
    captionDelay: 250,
    overlayOpacity: 0.9,
  });
  gallery.refresh();
}

export { renderSearcCard, showLoader, hideLoader };