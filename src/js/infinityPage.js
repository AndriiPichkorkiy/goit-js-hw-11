export const infinityPage = {
  heightRedLine: 32,
    isScrollingRightNow: false,
    funtionToDo: null,

  init(fun) {
      window.addEventListener('scroll', this.checkBottton);
      this.funtionToDo = fun;
  },

    checkBottton: () => {
    if (!infinityPage.isScrollingRightNow) {
      infinityPage.isScrollingRightNow = true;
      window.requestAnimationFrame(() => {
        //reset
          infinityPage.isScrollingRightNow = false;
        //check if we reached bottom
        if (
          window.innerHeight + window.scrollY >=
          document.body.scrollHeight - infinityPage.heightRedLine
        ) {
            infinityPage.funtionToDo();
        }
      });
    }
  },
};
