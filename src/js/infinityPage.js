export const infinityPage = {
  heightRedLine: null,
  isScrollingRightNow: false,
  funtionToDo: null,
  idForDeletEventListner: null,

  init(fun, redLine) {
    this.idForDeletEventListner = this.checkBottom();
    window.addEventListener('scroll', this.idForDeletEventListner);
    this.funtionToDo = fun;
    this.heightRedLine = redLine.getBoundingClientRect().height;
  },

  checkBottom: function () {
    return () => {
      if (!this.isScrollingRightNow) {
        this.isScrollingRightNow = true;
        window.requestAnimationFrame(() => {
          //reset
          this.isScrollingRightNow = false;
          //check if we reached the bottom
          if (
            window.innerHeight + window.scrollY >=
            document.body.scrollHeight - this.heightRedLine
          ) {
            this.funtionToDo();
            // console.log(arguments.callee);
            window.removeEventListener('scroll', this.idForDeletEventListner);
          }
        });
      }
    };
  },

  clear() {
    this.funtionToDo = null;
    window.removeEventListener('scroll', this.idForDeletEventListner);
  },
};
