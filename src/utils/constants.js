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

//селектор Template
export const LOCATION_TEMPLATE = ".location";
