import { refs } from './refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const gallery = {
  placeForRender: refs.gallery,

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
        // `
        // <div class='gallery__item'>
        //     <div class='gallery__img'>
        //         <img src=${webformatURL} alt=${tags} />
        //     </div>
        //     <div class='gallery__description'>
        //         <div class='gallery__description-item'>
        //             <span class="title-accent">likes:</span><span class="title-accent2"> ${likes} </span>
        //         </div>
        //         <div class='gallery__description-item'>
        //             <span class="title-accent">views:</span><span class="title-accent2"> ${views} </span>
        //         </div>
        //         <div class='gallery__description-item'>
        //             <span class="title-accent">comments:</span><span class="title-accent2"> ${comments} </span>
        //         </div>
        //         <div class='gallery__description-item'>
        //             <span class="title-accent">downloads:</span><span class="title-accent2"> ${downloads} </span>
        //         </div>
        //     </div>
        // </div>`

        `
                <div class="photo-card">
                     <div class='photo-card__img'>
                        <img src=${webformatURL} alt=${tags} loading="lazy" />
                    </div>
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
  }
};
