import {openPopup} from "./utils.js";
import {popupContainerDeletePlace, popupDeletePlace} from "./modal.js";
import {submitDeletePlace} from "./index.js"
import {config, deleteLike, putLike} from './api.js'
import {openBigPhotoPopup} from './modal.js'

import {data} from "autoprefixer";

//Переменные для загрузки и добавления локаций
const locationTemplate = document.querySelector('#location-template').content,
  cardsContainer = document.querySelector('.locations');

//Переменная для карточки для удаления
export let cardForDeletion = null;
//Отрисовка карточки с локацией на странице
export function renderLocation (name, link, likes, ownerId, cardId) {
  cardsContainer.prepend(createLocation(name, link, likes, ownerId, cardId));
}

// Проверка моего Id
 function isMine (id) {
  return id === config.myId;
 }

// Создание карточки с локацией
function createLocation (name, link, likes, ownerId, cardId) {
  const locationElement = locationTemplate.querySelector('.location').cloneNode(true);
  const locationPhoto = locationElement.querySelector('.location__photo');
  const trashBin = locationElement.querySelector('.location__delete-icon');
  const likesCounter = locationElement.querySelector('.location__like-counter');
  const iconLike = locationElement.querySelector('.location__like-icon');
  locationPhoto.src = link;
  locationPhoto.setAttribute('alt', name);
  locationElement.setAttribute('id', cardId);
  locationPhoto.addEventListener('click',() => openBigPhotoPopup({ name, link }));
  locationElement.querySelector('.location__title').textContent = name;
  likesCounter.textContent = likes.length;
  likes.forEach(like => {
    if (isMine(like._id)) {
      iconLike.classList.add('location__like-icon_active');
    }
  })
  iconLike.addEventListener('click', () => setEventListenerIconLike (iconLike, cardId, likesCounter))
  if (isMine (ownerId)) {
    trashBin.addEventListener('click', () => openPopupDeleteLocation (cardId));
  } else {
    trashBin.remove();
  }
  return locationElement;
}

// Установка слушателей на иконку лайка
function setEventListenerIconLike (iconLike, cardId, likesCounter) {
  if (iconLike.classList.contains('location__like-icon_active')){
    deleteLike(cardId)
      .then ( card => {
        iconLike.classList.remove('location__like-icon_active');
        likesCounter.textContent = card.likes.length
      })
      .catch((err) => {
        console.log(err);
      })
  } else {
    putLike (cardId)
      .then (card => {
        iconLike.classList.add('location__like-icon_active');
        likesCounter.textContent = card.likes.length
      })
      .catch((err) => {
        console.log(err);
      })
  }}

//Открыть попап карточки с локацией
function openPopupDeleteLocation (cardId) {
  openPopup(popupDeletePlace);
  cardForDeletion = cardId
}
