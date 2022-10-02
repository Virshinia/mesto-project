// Переменные профиля
export const profile = document.querySelector(".profile"),
  profileName = profile.querySelector(".profile__name"),
  profileDescription = profile.querySelector(".profile__description"),
  profileAvatar = profile.querySelector(".profile__photo");

// Кнопки
export const buttonEdit = profile.querySelector(".profile__button-edit"),
  buttonAdd = profile.querySelector(".profile__button-add"),
  buttonChangeAvatar = profile.querySelector(".profile__button-avatar");

// Переменные для формы добавления нового места
export const popupAddSelector = ".popup_addPlace";

// Переменные для формы смены аватара
export const popupChangeAvatarSelector = ".popup_changeAvatar";

// Переменные для изменения данных профиля
export const popupEditSelector = ".popup_edit";

// Селектор для попапа с большой картинкой
export const popupGallerySelector = ".popup_gallery";

// Селектор для попапа удаления карточки
export const popupDeletePlaceSelector = ".popup_deletePlace";

//селекторы Template разметки, класса шаблона карточки

export const LOCATION_TEMPLATE_CLASS = ".location";
export const LOCATION_TEMPLATE =
  document.querySelector("#location-template").content;
export const CARDS_CONTAINER_SELECTOR = ".locations";

export const VALIDATION_SETTINGS = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
};
