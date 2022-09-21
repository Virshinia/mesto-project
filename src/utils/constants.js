// Переменные профиля
export const profileSelector = document.querySelector(".profile"),
  profileNameSelector = profileSelector.querySelector(".profile__name"),
  profileDescriptionSelector = profileSelector.querySelector(
    ".profile__description"
  ),
  profileAvatarSelector = profileSelector.querySelector(".profile__photo");

// Кнопки
export const buttonEdit = profileSelector.querySelector(".profile__button-edit"),
  buttonAdd = profileSelector.querySelector(".profile__button-add"),
  buttonChangeAvatar = profileSelector.querySelector(".profile__button-avatar");


// Переменные для формы добавления нового места
export const popupAddSelector = document.querySelector(".popup_addPlace");

// Переменные для формы смены аватара
export const popupChangeAvatarSelector = document.querySelector(".popup_changeAvatar");

// Переменные для изменения данных профиля
export const popupEditSelector = document.querySelector(".popup_edit"),
  inputName = document.querySelector("#name-input"),
  inputDescription = document.querySelector("#description-input");

// Селектор для попапа с большой картинкой
export const popupGallerySelector = document.querySelector(".popup_gallery");

// Селектор для попапа удаления карточки
export const popupDeletePlaceSelector = document.querySelector(".popup_deletePlace");

//селекторы Template разметки, класса шаблона карточки

export const LOCATION_TEMPLATE_CLASS = ".location";
export const LOCATION_TEMPLATE =
  document.querySelector("#location-template").content;
