import './css/styles.css';
import './css/button.css';
import './js/saveImg.js';
import './js/themeChanger';

import { refs } from './js/refs.js';
import { searchMechanics } from './js/searchMechanics.js';
import { gallery } from './js/gallery.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { infinityPage } from './js/infinityPage.js';

async function clickSearch(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'FORM') return;
  gallery.clear();
  const { value } = e.currentTarget.searchQuery;
  
  if (!value) return Notify.info(`Hey! Please fill in something in the fild. Thanks.`, {
    timeout: 3000,
  })
    
  await beginSearch(value);
  Notify.info(`Hooray! We found ${searchMechanics.lastRespons.total} images.`, {
    timeout: 5000,
  });

  setTimeout(scrollAfterSearch, 250);
}

async function beginSearch(query) {
  infinityPage.clear();
  await searchMechanics
    .fetchPhotos(query)
    .then(response => {
      if (response === 0) return true;
      const data = response.hits;

      // console.log(response);
      if (data.length) gallery.render(data);
      else throw error;

      // if (searchMechanics.checkRechedEnd(response)) return
      infinityPage.init(loadMore, refs.buttonLoadMore);
    })
    .catch(error => {
      console.error(error);
      Notify.warning('Sorry, there are no images matching your search query. Please try again.', {
        timeout: 6000,
      });
    });
}

function scrollAfterSearch() {
  const { x, y } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
  const { top, bottom } = document
    .querySelector('.search-container')
    .firstElementChild.getBoundingClientRect();

  const heightSearchBar = top + bottom;
  window.scrollTo(x, y - heightSearchBar);
}

function scrollAfterLoadMore() {
  const { clientHeight: cardHeight } = document.querySelector('.gallery').firstElementChild;
  window.scrollBy({
    top: cardHeight,
    behavior: 'smooth',
  });
}

async function loadMore() {
  await beginSearch();
  scrollAfterLoadMore();
}

refs.buttonLoadMore.disabled = true;
refs.form.addEventListener('submit', clickSearch);
refs.buttonLoadMore.addEventListener('click', loadMore);
