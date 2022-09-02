//Переменные в блоке профиля
export const profile = document.querySelector('.profile'),
  profileName = profile.querySelector('.profile__name'),
  profileDescription = profile.querySelector('.profile__description'),
  profileAvatar = profile.querySelector('.profile__photo'),
  buttonEdit = profile.querySelector('.profile__button-edit'),
  buttonAdd = profile.querySelector('.profile__button-add'),
  buttonChangeAvatar = profile.querySelector('.profile__button-avatar')

export const renderProfileInfo = (name, avatar, description) => {
  profileName.textContent = name;
  profileDescription.textContent = description;
  profileAvatar.src = avatar;
}
