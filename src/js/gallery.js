import { refs } from './refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const gallery = {
  placeForRender: refs.gallery,
  simpleLightbox: new SimpleLightbox('.gallery .photo-card a'),

  render: function (data) {
    // webformatURL - посилання на маленьке зображення для списку карток.
    // largeImageURL - посилання на велике зображення.
    // tags - рядок з описом зображення. Підійде для атрибуту alt.
    // likes - кількість лайків.
    // views - кількість переглядів.
    // comments - кількість коментарів.
    // downloads - кількість завантажень.
    const markup = data.reduce((preMarkup, img) => {
      const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = img;

      return (
        preMarkup +
        `
                <div class="photo-card">
                     <a class='photo-card__img' href=${largeImageURL}>
                        <img src=${webformatURL} alt=${tags} loading="lazy" />
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

  rechedEnd: function () {
    refs.buttonLoadMore.disabled = true;
    Notify.info("We're sorry, but you've reached the end of search results.", {
      timeout: 6000,
    });
  },

  refreshGalleryModule: function () {
    this.simpleLightbox.refresh();
    // console.log(test);
  },
};
