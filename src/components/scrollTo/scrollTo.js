const scrollToThis = elements => {
  elements.forEach(function(element) {
    element.addEventListener("click", function() {
      // let bigRect = element.getBoundingClientRect();
      // console.log(bigRect.top,' /// ', element.offsetTop);
      window.scrollTo(0, element.offsetTop-30);
    });
  });
}

const scrollToTop = doomScrollToTop => {
  doomScrollToTop.addEventListener("click", function() {
    window.scrollTo(0,0);
  });
}

export { scrollToThis, scrollToTop };
