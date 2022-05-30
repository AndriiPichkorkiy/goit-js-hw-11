import { refs } from './refs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const gallery = {
  placeForRender: refs.gallery,
  simpleLightbox: new SimpleLightbox('.gallery .photo-card a', { captionsData: 'alt' }),

  render: function (data) {
    // webformatURL - посилання на маленьке зображення для списку карток.
    // largeImageURL - посилання на велике зображення.
    // tags - рядок з описом зображення. Підійде для атрибуту alt.
    // likes - кількість лайків.
    // views - кількість переглядів.
    // comments - кількість коментарів.
    // downloads - кількість завантажень.
    const markup = data.reduce((preMarkup, img) => {
      const { webformatURL, largeImageURL, tags, likes, views, comments, downloads, pageURL } = img;
      const pageURLSplit = pageURL.split('/');
      const imgName = pageURLSplit[pageURLSplit.length - 2];
      return (
        preMarkup +
        `
                <div class="photo-card">
                <button class='button-33 download-button '>download me</button>
                     <a class='photo-card__img' href=${largeImageURL} data-name='${imgName}'>
                        <img src=${webformatURL} alt='${tags}' loading="lazy" />
                    </a>
                    <div class="info">
                        <p class="info-item">
                        <b class="info-accent">Likes</b>
                        ${likes}
                        </p>
                        <p class="info-item">
                        <b class="info-accent">Views</b>
                        ${views}
                        </p>
                        <p class="info-item">
                        <b class="info-accent">Comments</b>
                        ${comments}
                        </p>
                        <p class="info-item">
                        <b class="info-accent">Downloads</b>
                        ${downloads}
                        </p>
                    </div>
                    </div>
              `
      );
    }, '');

    this.placeForRender.insertAdjacentHTML('beforeEnd', markup);
    refs.buttonLoadMore.disabled = false;

    this.refreshGalleryModule();
  },

  clear: function () {
    refs.buttonLoadMore.disabled = true;
    this.placeForRender.innerHTML = '';
  },

  refreshGalleryModule: function () {
    this.simpleLightbox.refresh();
    // console.log(test);
  },
};
