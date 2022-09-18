// Переменные профиля
export const profileSelector = document.querySelector(".profile"),
  profileNameSelector = profileSelector.querySelector(".profile__name"),
  profileDescriptionSelector = profileSelector.querySelector(
    ".profile__description"
  ),
  profileAvatarSelector = profileSelector.querySelector(".profile__photo");

// Кнопки
export const buttonEdit = profileSelector.querySelector(
    ".profile__button-edit"
  ),
  buttonAdd = profileSelector.querySelector(".profile__button-add"),
  buttonChangeAvatar = profileSelector.querySelector(".profile__button-avatar");

//селекторы Template разметки, класса шаблона карточки

export const LOCATION_TEMPLATE_CLASS = ".location";
export const LOCATION_TEMPLATE =
  document.querySelector("#location-template").content;
