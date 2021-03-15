const ALERT_SHOW_TIME = 5000;
const ALERT_MESSAGE = 'Не удалось загрузить данные с сервера :(';

const HOUSING = {
  bungalow: 'Бунгало',
  flat: 'Квартира',
  house: 'Дом',
  palace: 'Дворец',
};

const HOUSING_PRICE = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const getHousingType = (type) => {
  return HOUSING[type];
};

const getHousingPrice = (type) => {
  return HOUSING_PRICE[type];
};

const declOfRoomsNumber = (rooms) => {
  const val = rooms % 10;
  const val2 = rooms % 100;
  if ([11, 12, 13, 14].includes(val2)) {
    return `${rooms} комнат`;
  }
  if (val === 1) {
    return `${rooms} комната`;
  }
  if ([2,3,4].includes(val)) {
    return `${rooms} комнаты`;
  }
  return `${rooms} комнат`;
};

const declOfGuestsNumber = (guests) => {
  return guests === 1 || guests > 20 && guests % 10 === 1 && guests % 100 !== 11 ? `${guests} гостя` : `${guests} гостей`;
};

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const showAlert = () => {
  const alertContainer = document.createElement('div');

  alertContainer.style.zIndex = 9999;
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '28px';
  alertContainer.style.fontStyle = 'Tahoma';
  alertContainer.style.color = '#ffffff';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = ALERT_MESSAGE;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, time) => {
  let interval;
  return (...args) => {
    clearTimeout(interval);
    interval = setTimeout(() => {
      interval = null;
      callback(...args);
    }, time);
  };
};

export {
  declOfRoomsNumber,
  declOfGuestsNumber,
  getHousingType,
  getHousingPrice,
  showAlert,
  isEscEvent,
  debounce
};
