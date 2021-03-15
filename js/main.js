import './message.js';
import './popup.js';
import './photo.js';
import { getData } from './api.js';
import { initMap } from './map.js';
import { showAlert } from './util.js';
import { initFilterChangeListener } from './filter.js';
import { deactivateAdForm, initListeners, setFormValidity, onAdFormSubmit, onAdFormReset } from './form.js';

getData((adverts) => {
  initMap(adverts);
  initFilterChangeListener(adverts);
  onAdFormSubmit(adverts);
  onAdFormReset(adverts);
},
(error) => {
  deactivateAdForm();
  showAlert(error);
});

initListeners();
setFormValidity();


