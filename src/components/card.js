//Переменные для загрузки и добавления локаций
const locationTemplate = document.querySelector('#location-template').content,
  cardsContainer = document.querySelector('.locations');
export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];


//Отрисовка карточки с локацией на странице
export function renderLocation (name, link) {
  cardsContainer.prepend(createLocation(name, link));
}

import {openBigPhotoPopup} from './modal.js'

// Создание карточки с локацией
function createLocation (name, link) {
  const locationElement = locationTemplate.querySelector('.location').cloneNode(true);
  const locationPhoto = locationElement.querySelector('.location__photo');
  locationPhoto.src = link;
  locationPhoto.setAttribute('alt', name);
  locationPhoto.addEventListener('click',() => openBigPhotoPopup({ name, link }));
  locationElement.querySelector('.location__title').textContent = name;
  locationElement.querySelector('.location__delete-icon').addEventListener('click', deleteLocation);
  locationElement.querySelector('.location__like-icon').addEventListener('click', toggleLike);
  return locationElement;
}

//Переключение like на карточке
function toggleLike (evt) {
  evt.target.classList.toggle('location__like-icon_active');
}

//Удаление карточки с локацией
function deleteLocation (evt) {
  evt.target.closest('.location').remove();
}
