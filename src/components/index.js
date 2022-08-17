import '../pages/index.css';
import {buttonsClose, popups, popupEdit, popupAdd, popupContainerEditForm, popupContainerAddForm, inputName, inputDescription, popupOpened} from './modal.js';
import {openPopup, closePopup} from './utils.js';
import {enableValidation} from './validate.js';
import {renderLocation, initialCards} from './card.js';
//Переменные в блоке профиля
const profile = document.querySelector('.profile'),
  profileName = profile.querySelector('.profile__name'),
  profileDescription = profile.querySelector('.profile__description'),
  buttonEdit = profile.querySelector('.profile__button-edit'),
  buttonAdd = profile.querySelector('.profile__button-add');


// Сохранение изменений в профиле
function submitEditForm (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup (popupEdit);
}

// Сохранение данных локации
function submitAddForm (evt) {
  evt.preventDefault();
  const inputNameOfPlace = popupAdd.querySelector('#nameOfPlace-input');
  const inputLinkImg = popupAdd.querySelector('#linkImg-input');
  renderLocation (inputNameOfPlace.value, inputLinkImg.value);
  closePopup (popupAdd);
}


// Закрытие popup по esc
document.addEventListener('keyup', event => {
  if (event.key === 'Escape') {
    closePopup(popupOpened);
  }
});

//Закрытие popup по overlay
popups.forEach ((popup) => popup.addEventListener('click', event => {
  if (event.target === event.currentTarget) {
    closePopup(popupOpened);
  }
}));

//Установка слушателя на все кнопки закрытия модальных окон
buttonsClose.forEach ((button) => button.addEventListener('click', (evt) => closePopup(evt.target.closest('.popup'))));


//События на кнопках "редактировать" и "добавить"
buttonAdd.addEventListener('click', () => {
  popupContainerAddForm.reset();
  openPopup(popupAdd);
});
buttonEdit.addEventListener('click', ()=> {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(popupEdit);
});


// Добавление карточек из массива initialCards при загрузке
initialCards.forEach((card) => renderLocation (card.name, card.link));

//Добавление слушателей на формы
popupContainerEditForm.addEventListener('submit', submitEditForm);
popupContainerAddForm.addEventListener('submit', submitAddForm);

enableValidation();
