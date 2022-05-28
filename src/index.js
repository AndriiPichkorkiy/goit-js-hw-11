import './css/styles.css';
import './css/button.css';
import { refs } from './js/refs.js';
import { searchMechanics } from './js/searchMechanics.js';
import { gallery } from './js/renderGallery.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

async function clickSearch(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'BUTTON') return;

  gallery.clear();
  const { value } = e.currentTarget.searchQuery;
  await beginSearch(value);
  Notify.info(`Hooray! We found ${searchMechanics.lastRespons.total} images.`, {
    timeout: 5000,
  });
}

async function beginSearch(query) {
  const data = await searchMechanics
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
  return data;
}

refs.buttonLoadMore.disabled = true;
refs.form.addEventListener('click', clickSearch);
refs.buttonLoadMore.addEventListener('click', () => beginSearch());
