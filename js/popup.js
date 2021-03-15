import { declOfRoomsNumber, declOfGuestsNumber, getHousingType } from './util.js';

const advertTemplate = document.querySelector('#card').content.querySelector('.popup');

const createAdvertElement = ({author, offer}) => {
  const advertElement = advertTemplate.cloneNode(true);

  advertElement.querySelector('.popup__title').textContent = offer.title;
  advertElement.querySelector('.popup__text--address').textContent = offer.address;
  advertElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  advertElement.querySelector('.popup__type').textContent = getHousingType(offer.type);
  advertElement.querySelector('.popup__text--capacity').textContent = `${declOfRoomsNumber(offer.rooms)} для ${declOfGuestsNumber(offer.guests)}`;
  advertElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const featureList = advertElement.querySelector('.popup__features');
  featureList.innerHTML = '';
  offer.features.forEach((feature) => {
    const featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature', `popup__feature--${feature}`);
    featureList.appendChild(featureElement);
  });

  advertElement.querySelector('.popup__description').textContent = offer.description;

  const photoList = advertElement.querySelector('.popup__photos');
  photoList.innerHTML = '';
  offer.photos.forEach((photo) => {
    const photoElement = document.createElement('img');
    photoElement.src = `${photo}`;
    photoElement.height = 40;
    photoElement.width = 45;
    photoElement.classList.add('popup__photo');
    photoList.appendChild(photoElement);
  });

  advertElement.querySelector('.popup__avatar').src = `${author.avatar}`;

  return advertElement;
};

export { createAdvertElement }
