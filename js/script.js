window.addEventListener('load', windowLoad);

function windowLoad() {
  document.documentElement.classList.add('loaded');

  // Mouse parallax
  const page = document.querySelector('.page');
  const parallaxItems = document.querySelectorAll('[class*="__inset"]');
  const speed = 0.05;

  let posX = 0;
  let cXprocent = 0;

  page.addEventListener('mousemove', parallaxAnimation);

  function parallaxAnimation(e) {
    const parallaxWidth = window.innerWidth;
    const cX = e.pageX - parallaxWidth / 2;
    cXprocent = (cX / parallaxWidth) * 100;
  }

  function setParallaxAnimationStyle(e) {
    const distX = cXprocent - posX;
    posX = posX + distX * speed;

    parallaxItems.forEach(parallaxItem => {
      const value = parallaxItem.dataset.prxValue ? +parallaxItem.dataset.prxValue : 1;

      parallaxItem.style.cssText = `
		 transform: translateX(${posX / value}%)`;
    });
    requestAnimationFrame(setParallaxAnimationStyle);
  }
  setParallaxAnimationStyle();
}
