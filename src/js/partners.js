import fund1 from '../img/funds/save-the-children.png';
import fund1x from '../img/funds/save-the-children-2x.png';
import fund2 from '../img/funds/project-hope.png';
import fund2x from '../img/funds/project-hope-2x.png';
import fund3 from '../img/funds/united24.png';
import fund3x from '../img/funds/united24-2x.png';
import fund4 from '../img/funds/international-medical-corps.png';
import fund4x from '../img/funds/international-medical-corps-2x.png';
import fund5 from '../img/funds/medicines-sans-frontieres.png';
import fund5x from '../img/funds/medicine-sans-frontieres-2x.png';
import fund6 from '../img/funds/razom.png';
import fund6x from '../img/funds/razom-2x.png';
import fund7 from '../img/funds/action-against-hunger.png';
import fund7x from '../img/funds/action-against-hunger-2x.png';
import fund8 from '../img/funds/world-vision.png';
import fund8x from '../img/funds/world-vision-2x.png';
import fund9 from '../img/funds/sergiy-prytula.png';
import fund9x from '../img/funds/sergiy-prytula-2x.png';

const charityFunds = [
  {
    title: 'Save the Children',
    url: 'https://www.savethechildren.net/what-we-do/emergencies/ukraine-crisis',
    img: fund1,
    img1: fund1x,
  },
  {
    title: 'Project HOPE',
    url: 'https://www.projecthope.org/country/ukraine/',
    img: fund2,
    img1: fund2x,
  },
  {
    title: 'UNITED24',
    url: 'https://u24.gov.ua/uk',
    img: fund3,
    img1: fund3x,
  },
  {
    title: 'International Medical Corps',
    url: 'https://internationalmedicalcorps.org/country/ukraine/',
    img: fund4,
    img1: fund4x,
  },
  {
    title: 'Medicins Sans Frontieres',
    url: 'https://www.msf.org/ukraine',
    img: fund5,
    img1: fund5x,
  },
  {
    title: 'RAZOM',
    url: 'https://www.razomforukraine.org/',
    img: fund6,
    img1: fund6x,
  },
  {
    title: 'Action against hunger',
    url: 'https://www.actionagainsthunger.org/location/europe/ukraine/',
    img: fund7,
    img1: fund7x,
  },
  {
    title: 'World vision',
    url: 'https://www.wvi.org/emergencies/ukraine',
    img: fund8,
    img1: fund8x,
  },
  {
    title: 'Serhiy Prytula Charity Foundation',
    url: 'https://prytulafoundation.org/en',
    img: fund9,
    img1: fund9x,
  },
];

import Swiper from 'swiper';
import 'swiper/css';

const charityElem = document.querySelector('.swiper-wrapper');
const swiperBtnElem = document.querySelector('.support-swiper-btn');
const arrowElem = document.querySelector('.swiper-button-icon');

swiperBtnElem.addEventListener('click', onBtnClick);

export function fundsMarkup() {
  const result = charityFunds
    .map(({ title, url, img, img1 }, index) => {
      const paddedIndex = (index + 1).toString().padStart(2, '0');
      return `<div class="swiper-slide ">       
      <a class="support-funds-link" href="${url}" target="_blank"
                    rel="noopener noreferrer nofollow" aria-label="Read more about ${title}">
      <p class="support-fund-number">${paddedIndex}</p>
                <img
                srcset="${img} 1x, ${img1} 2x"
                class="support-funds-list-link-image" src="${img}"
                    alt="${title}" 
            </a></div>`;
    })
    .join('');
  charityElem.innerHTML = result;
}
fundsMarkup();

const swiper = new Swiper('.swiper', {
  direction: 'vertical',
  loop: false,
  effect: 'slide',
  slidesPerView: 6,
  slidesPerGroup: 6,
});
swiper.on('reachBeginning', function () {
  arrowElem.style.transform = '';
});
swiper.on('reachEnd', function () {
  arrowElem.style.transform = 'rotate(180deg)';
});

export function onBtnClick(e) {
  if (arrowElem.style.transform == '') {
    swiper.slideNext(2000);
  } else {
    swiper.slidePrev(2000);
  }
}
