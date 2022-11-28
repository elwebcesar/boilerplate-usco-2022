import './_preloadImages.scss';

export default function preloadImages(imagesToLoad) {

  const loadImages = (image) => {
    image.setAttribute('src', image.getAttribute('data-src'));
    image.onload = () => {
      image.removeAttribute('data-src');
    };
  };

  // Loading on demand
  if('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((items, observer) => {
      items.forEach((item) => {
        if(item.isIntersecting) {
          loadImages(item.target);
          observer.unobserve(item.target);
        }
      });
    });

    imagesToLoad.forEach((img) => {
      observer.observe(img);
    });
  }
  else {
    imagesToLoad.forEach((img) => {
      loadImages(img);
    });
  }
}
