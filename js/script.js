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

  // Scroll parallax
  const moon = document.querySelector('.moon');
  const buildings = document.querySelectorAll('.building');
  const tree = document.querySelector('.tree');
  const stairs = document.querySelector('.stairs');
  const train = document.querySelector('.train');
  const santaItems = document.querySelectorAll('.santa');

  window.addEventListener('scroll', createPosition);
  createPosition();

  function createPosition() {
    const contentElement = document.querySelector('.content__container');
    const windowHeight = window.innerHeight;
    const finalPos = (scrollY / (contentElement.offsetTop - windowHeight)) * 100;
    finalPos < 100 ? christmasAnimation(finalPos) : christmasAnimation(100);
  }

  function christmasAnimation(finalPos) {
    const moonAnim = {
      translate: (50 / 100) * finalPos,
      scale: 1 + (2 / 100) * finalPos,
    };
    moon.style.cssText = `
	  transform:
	 	translate(0,${moonAnim.translate}%)
		scale(${moonAnim.scale}) 
	  `;

    const stairsAnim = {
      translate: (70 / 100) * finalPos,
      scale: 1 + (2 / 100) * finalPos,
    };
    stairs.style.cssText = `
	  transform:
	 	translate(0,${stairsAnim.translate}%)
		scale(${stairsAnim.scale}) 
	  `;

    const treeAnim = {
      translate: (70 / 100) * finalPos,
      scale: 1 + (1.5 / 100) * finalPos,
    };
    tree.style.cssText = `
	  transform:
	 	translate(0,${treeAnim.translate}%)
		scale(${treeAnim.scale}) 
	  `;

    buildings.forEach((building, index) => {
      const buildingAmin = {
        translate: ((30 * (buildings.length - index)) / 100) * finalPos,
        scale: 1 + (2 / 100) * finalPos,
      };
      building.style.cssText = `
	  transform:
	 	translate(0,${buildingAmin.translate}%)
		scale(${buildingAmin.scale}) 
	  `;
    });
    const trainAnim = {
      translate: 1 * finalPos,
    };
    train.style.cssText = `
	  transform:
	 	translate(-${trainAnim.translate}%,${trainAnim.translate}%)
		`;

    santaItems.forEach((santaItem, index) => {
      const santaAnim = {
        left: ((100 + 10 * index) / 100) * finalPos,
      };
      santaItem.style.left = `${santaAnim.left}%`;
    });
  }
}
