import { sendData } from './api.js';
import { getHousingPrice } from './util.js';
import { deactivateFilterForm, activateFilterForm, mapFiltersForm } from './filter.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { setAddress, setMarkersToDefaultState } from './map.js';
import { initImageUploaders, clearPreview } from './photo.js';

const adForm = document.querySelector('.ad-form');
const address = adForm.querySelector('#address');
const typeList = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const checkInList = adForm.querySelector('#timein');
const checkOutList = adForm.querySelector('#timeout');
const advertTitle = adForm.querySelector('#title');
const roomNumber = adForm.querySelector('#room_number');
const roomCapacity = adForm.querySelector('#capacity');
const optionCapacity = roomCapacity.querySelectorAll('option');

const MAX_ROOMS_NUMBER = 100;
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const deactivateAdForm = () => {
  adForm.classList.add('ad-form--disabled');
  adForm.querySelectorAll('.ad-form fieldset').forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'disabled');
  });
  deactivateFilterForm();
};

const activateAdForm = () => {
  adForm.classList.remove('ad-form--disabled');
  adForm.querySelectorAll('.ad-form fieldset').forEach((fieldset) => {
    fieldset.removeAttribute('disabled');
  });
  address.setAttribute('readonly', 'readonly');
  activateFilterForm();
  initImageUploaders();
};

const initListeners = () => {
  typeList.addEventListener('change', () => {
    priceInput.placeholder = getHousingPrice(typeList.value);
    priceInput.min = getHousingPrice(typeList.value);
  });

  checkInList.addEventListener('change', () => {
    checkOutList.value = checkInList.value;
  });

  checkOutList.addEventListener('change', () => {
    checkInList.selectedIndex = checkOutList.selectedIndex;
  });
};

const setFormValidity = () => {
  advertTitle.addEventListener('input', () => {
    const valueLength = advertTitle.value.length;
    if (valueLength < MIN_TITLE_LENGTH) {
      advertTitle.setCustomValidity(`Ещё ${(MIN_TITLE_LENGTH - valueLength)} симв.`);
    } else if (valueLength > MAX_TITLE_LENGTH) {
      advertTitle.setCustomValidity(`Удалите лишние ${(valueLength - MAX_TITLE_LENGTH)} симв.`);
    } else {
      advertTitle.setCustomValidity('');
    }
    advertTitle.reportValidity();
  });

  priceInput.addEventListener('input', () => {
    const minPrice = getHousingPrice(typeList.value);

    if (priceInput.validity.valueMissing) {
      priceInput.setCustomValidity('Это поле обязательно для заполнения');
    } else if (priceInput.value < minPrice) {
      priceInput.setCustomValidity(`Стоимость должна быть не менее ${minPrice}`);
    } else {
      priceInput.setCustomValidity('');
    }
    priceInput.reportValidity();
  });

  roomNumber.addEventListener('change', () => {
    if (Number(roomNumber.value) === MAX_ROOMS_NUMBER) {
      roomCapacity.selectedIndex = 0;
      optionCapacity.forEach((option) => {
        option.disabled = option.value > roomCapacity.selectedIndex;
      });
    } else {
      roomCapacity.selectedIndex = roomNumber.value;
      optionCapacity.forEach((option, index) => {
        option.disabled = index === 0 || option.value > roomNumber.value;
      });
    }
  });
};

const resetToDefaultState = (adverts) => {
  adForm.reset();
  mapFiltersForm.reset();
  setMarkersToDefaultState(adverts);
  setAddress();
  clearPreview();
};

const onAdFormSubmit = (adverts) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => {
        showSuccessMessage();
        resetToDefaultState(adverts);
      },
      () => showErrorMessage(),
      new FormData(evt.target),
    );
  });
};

const onAdFormReset = (adverts) => {
  const buttonReset = document.querySelector('.ad-form__reset');
  buttonReset.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetToDefaultState(adverts);
  });
};

export { address, deactivateAdForm, activateAdForm, initListeners, setFormValidity, onAdFormSubmit, onAdFormReset }
