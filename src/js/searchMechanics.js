export const searchMechanics = {
  API_PRIVAT_KEY: '27649790-7921965d78458e948654f4c92',
  page: 1,
  per_page: 40,
  currentQuery: null,
  lastRespons: null,

  fetchPhotos: async function (userQuery) {
    if (userQuery) {
      this.page = 1;
      this.currentQuery = userQuery;
    }
    const urlQuery = `https://pixabay.com/api/?key=${this.API_PRIVAT_KEY}&q=${this.currentQuery}&image_type=photo&orientation=horizontal&=safesearch=true&page=${this.page}&per_page=${this.per_page}`;
    this.page += 1;
    const response = await fetch(urlQuery);
    const dataFromBackEnd = await response.json();
    return dataFromBackEnd;
  },

  checkRechedEnd: function (response) {
    // console.log(this.currentQuery * 1, '>' ,response.totalHits);
    if (this.per_page * this.page > response.totalHits) return true;
  },
};
