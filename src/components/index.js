import '../pages/index.css';
import {popups, popupEdit, popupAdd, popupContainerEditForm, popupContainerAddForm, inputName, inputDescription} from './modal.js';
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
export function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
}

//Закрытие popup по overlay
popups.forEach ((popup) => popup.addEventListener('click', event => {
  if (event.target === event.currentTarget) {
    closePopup(popupOpened);
  }
}));

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  })
})

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

enableValidation({
  formSelector: '.popup__container',
  fieldSetSelector: '.popup__input-container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error'
});
