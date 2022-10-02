import "./index.css";
import { Card } from "../components/Card.js";
import { api } from "../components/Api.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupForDeletion } from "../components/PopupForDeletion.js";
import {
  buttonEdit,
  buttonAdd,
  buttonChangeAvatar,
  LOCATION_TEMPLATE_CLASS,
  LOCATION_TEMPLATE,
  CARDS_CONTAINER_SELECTOR,
  VALIDATION_SETTINGS,
  profileName,
  profileDescription,
  profileAvatar,
  popupEditSelector,
  popupAddSelector,
  popupChangeAvatarSelector,
  popupGallerySelector,
  popupDeletePlaceSelector,
} from "../utils/constants.js";
import { Section } from "../components/Section";
import { FormValidator } from "../components/FormValidator.js";

//
const myUserInfo = new UserInfo(profileName, profileDescription, profileAvatar);

//Инициализация всех форм и добавление слушателей
const popupAdd = new PopupWithForm(popupAddSelector, submitAddForm);
popupAdd.setEventListeners();

const popupEdit = new PopupWithForm(popupEditSelector, submitEditForm);
popupEdit.setEventListeners();

const popupChangeAvatar = new PopupWithForm(
  popupChangeAvatarSelector,
  submitChangePhoto
);
popupChangeAvatar.setEventListeners();

//Инициализация попапа с подтверждением удаления
const popupDeleteConfirmation = new PopupForDeletion(
  popupDeletePlaceSelector,
  submitDeletePlace
);
popupDeleteConfirmation.setEventListeners();

// Попап с картинкой
const popupWithImage = new PopupWithImage(popupGallerySelector);
popupWithImage.setEventListeners();

// Сохранение изменений в профиле
function submitEditForm(evt, data) {
  evt.preventDefault();
  return api
    .submitNewProfileInfo(data.name, data.description)
    .then((info) => {
      myUserInfo.setUserInfo({ name: info.name, description: info.about });
    })
    .catch((err) => {
      console.log(err);
    });
}

// Сохранение данных локации
function submitAddForm(evt, data) {
  evt.preventDefault();
  return api
    .postNewCard(data.nameOfPlace, data.linkImg)
    .then((card) => {
      sectionWithCards.addItem(card);
    })
    .catch((err) => {
      console.log(err);
    });
}

function submitChangePhoto(evt, data) {
  evt.preventDefault();
  return api
    .submitNewAvatar(data.linkAvatar)
    .then((res) => {
      myUserInfo.setUserInfo({ avatar: res.avatar });
      popupChangeAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

export function submitDeletePlace(evt, id) {
  evt.preventDefault();
  const cardTemplateForDeletion = document.getElementById(id);
  api
    .deleteMyCard(id)
    .then(() => {
      cardTemplateForDeletion.remove();
      popupDeleteConfirmation.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

const submitCardForm = document
  .querySelector(".popup_addPlace")
  .querySelector(".popup__container");
const submitCardFormValidate = new FormValidator(
  VALIDATION_SETTINGS,
  submitCardForm
);
submitCardFormValidate.enableValidation();

const editProfileForm = document
  .querySelector(".popup_edit")
  .querySelector(".popup__container");
const editProfileFormValidate = new FormValidator(
  VALIDATION_SETTINGS,
  editProfileForm
);
editProfileFormValidate.enableValidation();

const changeAvatarForm = document
  .querySelector(".popup_changeAvatar")
  .querySelector(".popup__container");
const changeAvatarFormValidate = new FormValidator(
  VALIDATION_SETTINGS,
  changeAvatarForm
);
changeAvatarFormValidate.enableValidation();

//События на кнопках "редактировать", "добавить", "изменить фото"
buttonAdd.addEventListener("click", () => {
  submitCardFormValidate.resetValidation();
  popupAdd.open();
});

buttonEdit.addEventListener("click", () => {
  const userData = myUserInfo.getUserInfo();
  editProfileFormValidate.resetValidation();
  popupEdit.setInputValues(userData);
  popupEdit.open();
});

buttonChangeAvatar.addEventListener("click", () => {
  changeAvatarFormValidate.resetValidation();
  popupChangeAvatar.open();
});

const sectionWithCards = new Section(renderLocation, CARDS_CONTAINER_SELECTOR);

// Получение данных о профиле и карточках с сервера
Promise.all([api.getInitialCards(), api.getProfileInfo()])
  .then(([cards, info]) => {
    myUserInfo.setUserInfo({
      name: info.name,
      description: info.about,
      avatar: info.avatar,
    });
    api.myId = info._id;
    cards = cards.reverse();

    sectionWithCards.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

function openPopupDeleteLocation(cardId) {
  popupDeleteConfirmation.open(cardId);
}

function handleCardClick({ name, link }) {
  popupWithImage.open({ name, link });
}

function setEventListenerIconLike(iconLike, cardId, likesCounter) {
  if (iconLike.classList.contains("location__like-icon_active")) {
    api
      .deleteLike(cardId)
      .then((card) => {
        iconLike.classList.remove("location__like-icon_active");
        likesCounter.textContent = card.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .putLike(cardId)
      .then((card) => {
        iconLike.classList.add("location__like-icon_active");
        likesCounter.textContent = card.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function renderLocation(card, container) {
  const newCard = new Card(
    LOCATION_TEMPLATE,
    LOCATION_TEMPLATE_CLASS,
    card.name,
    card.link,
    card.likes,
    card.owner._id,
    card._id,
    api.myId,
    setEventListenerIconLike,
    handleCardClick,
    openPopupDeleteLocation
  );

  return newCard.create();
}
