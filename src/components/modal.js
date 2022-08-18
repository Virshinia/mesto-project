// Переменные для модальных окон
export const popups = document.querySelectorAll('.popup'),
  popupEdit = document.querySelector('.popup_edit'),
  popupAdd = document.querySelector('.popup_addPlace'),
  popupContainerEditForm = document.querySelector('[name="edit-profile"]'),
  popupContainerAddForm = document.querySelector('[name="add-place"]'),
  inputName = document.querySelector('#name-input'),
  inputDescription = document.querySelector('#description-input');

// Переменные для модального окна с большой картинкой
const popupGallery = document.querySelector('.popup_gallery'),
  popupImg = popupGallery.querySelector('.popup__image'),
  popupCaption = popupGallery.querySelector('.popup__caption');

//Создание и открытие модального окна с фото
import {openPopup} from './utils.js';
export function openBigPhotoPopup ({name, link}){
  popupImg.src = link;
  popupImg.setAttribute('alt', name)
  popupCaption.textContent = name;
  openPopup(popupGallery);
}




