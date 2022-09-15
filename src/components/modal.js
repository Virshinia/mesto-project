import { openPopup } from "../utils/utils.js";

//Все формы
export const popups = document.querySelectorAll(".popup");

// Переменные для формы добавления нового места
export const popupAdd = document.querySelector(".popup_addPlace"),
  popupContainerAddForm = document.querySelector('[name="add-place"]'),
  inputNameOfPlace = popupAdd.querySelector("#nameOfPlace-input"),
  inputLinkImg = popupAdd.querySelector("#linkImg-input");

// Переменные для формы смены аватара
export const popupChangeAvatar = document.querySelector(".popup_changeAvatar"),
  popupContainerChangeAvatarForm = document.querySelector(
    '[name="change-avatar"]'
  ),
  inputLinkAvatar = popupChangeAvatar.querySelector("#linkAvatar-input");

// Переменные для изменения данных профиля
export const popupEdit = document.querySelector(".popup_edit"),
  popupContainerEditForm = document.querySelector('[name="edit-profile"]'),
  inputName = document.querySelector("#name-input"),
  inputDescription = document.querySelector("#description-input");

// Переменные для модального окна с большой картинкой
const popupGallery = document.querySelector(".popup_gallery"),
  popupImg = popupGallery.querySelector(".popup__image"),
  popupCaption = popupGallery.querySelector(".popup__caption");

//Переменные для модального окна с подтверждением удаления карточки
export const popupDeletePlace = document.querySelector(".popup_deletePlace"),
  popupContainerDeletePlace = document.querySelector('[name="delete-place"]');

//Изменение текста кнопки при загрузке
export function showLoading(status, button) {
  if (status) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

//Создание и открытие модального окна с фото
export function openBigPhotoPopup({ name, link }) {
  popupImg.src = link;
  popupImg.setAttribute("alt", name);
  popupCaption.textContent = name;
  openPopup(popupGallery);
}
