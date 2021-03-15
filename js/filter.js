import { removeMarkers, setMarkers } from './map.js';
import { debounce } from './util.js';

const mapFiltersForm = document.querySelector('.map__filters');
const mapFilters = mapFiltersForm.querySelectorAll('.map__filter')
const mapFeatures = document.querySelector('.map__features');
const housingTypeFilter = mapFiltersForm.querySelector('#housing-type');
const housingPriceFilter = mapFiltersForm.querySelector('#housing-price');
const housingRoomsFilter = mapFiltersForm.querySelector('#housing-rooms');
const housingGuestsFilter = mapFiltersForm.querySelector('#housing-guests');

const MAX_FILTERED_COUNT = 10;
const RERENDER_DELAY = 500;
const PRICE_LOW = 10000;
const PRICE_HIGH = 50000;

const deactivateFilterForm = () => {
  mapFiltersForm.classList.add('map__filters--disabled');
  mapFilters.forEach((filter) => {
    filter.setAttribute('disabled', '');
  });
  mapFeatures.setAttribute('disabled', 'disabled');
};

const activateFilterForm = () => {
  mapFiltersForm.classList.remove('map__filters--disabled');
  mapFilters.forEach((filter) => {
    filter.removeAttribute('disabled');
  });
  mapFeatures.removeAttribute('disabled');
};

const featuresFilter = (advert) => {
  const checkedFeatures = mapFiltersForm.querySelectorAll('.map__checkbox:checked');
  let i = 0;
  checkedFeatures.forEach((feature) => {
    if (advert.offer.features.includes(feature.value)) {
      i++;
    }
  });
  return i === checkedFeatures.length;
};

const typeFilter  = (advert) => {
  return housingTypeFilter.value === 'any' || advert.offer.type === housingTypeFilter.value;
};

const roomsFilter = (advert) => {
  return housingRoomsFilter.value === 'any' || advert.offer.rooms === Number(housingRoomsFilter.value);
};

const capacityFilter = (advert) => {
  return housingGuestsFilter.value === 'any' || advert.offer.guests === Number(housingGuestsFilter.value);
};

const priceFilter = (advert) => {
  const filterPrice = housingPriceFilter.value;
  const advertPrice = advert.offer.price;

  switch (filterPrice) {
    case 'middle': return advertPrice >= PRICE_LOW && advertPrice < PRICE_HIGH;
    case 'low': return advertPrice < PRICE_LOW;
    case 'high': return advertPrice >= PRICE_HIGH;
    default: return true;
  }
};

const isAdvertMatched = (advert) => {
  return featuresFilter(advert) &&
  roomsFilter(advert) &&
  capacityFilter(advert) &&
  priceFilter(advert) &&
  typeFilter(advert);
};

const getFilteredAdverts = (adverts) => {
  const filteredAdverts = [];
  for (let i = 0; i < adverts.length; i++) {
    const advert = adverts[i];
    if (isAdvertMatched(advert)) {
      filteredAdverts.push(advert);
    }
    if (filteredAdverts.length === MAX_FILTERED_COUNT) {
      return filteredAdverts;
    }
  }
  return filteredAdverts;
};

const debouncedOnFilterChange = debounce((adverts) => {
  onFilterChange(adverts)
}, RERENDER_DELAY);

const onFilterChange = (adverts) => {
  const filteredAdverts = getFilteredAdverts(adverts);
  removeMarkers();
  setMarkers(filteredAdverts);
};

const initFilterChangeListener = (adverts) => {
  mapFiltersForm.addEventListener('change', () => debouncedOnFilterChange(adverts));
};

export { mapFiltersForm, deactivateFilterForm, activateFilterForm, initFilterChangeListener }
