import './css/styles.css';
import './css/button.css';
import { refs } from './js/refs.js';
import { searchMechanics } from './js/searchMechanics.js';
import { gallery } from './js/gallery.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { infinityPage } from './js/infinityPage.js';


async function clickSearch(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'BUTTON') return;

  gallery.clear();
  const { value } = e.currentTarget.searchQuery;
  await beginSearch(value);
  Notify.info(`Hooray! We found ${searchMechanics.lastRespons.total} images.`, {
    timeout: 5000,
  });

  setTimeout(scrollAfterSearch, 250);
  
}

async function beginSearch(query) {
  await searchMechanics
    .fetchPhotos(query)
    .then(response => {
      searchMechanics.lastRespons = response;
      const data = response.hits;

      //   console.log(response);
      if (data.length) gallery.render(data);
      else throw error;

      if (searchMechanics.checkRechedEnd(response)) gallery.rechedEnd();
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
      top: cardHeight * 1.5,
      behavior: 'smooth',
    });
}

async function loadMore() {
    await beginSearch();
    scrollAfterLoadMore();
}

infinityPage.init(loadMore);
refs.buttonLoadMore.disabled = true;
refs.form.addEventListener('click', clickSearch);
refs.buttonLoadMore.addEventListener('click', loadMore);
