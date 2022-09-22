import "./index.css";
import { buttonOff, showLoading, renderLocation } from "../utils/utils.js";
import { enableValidation } from "../components/validate.js";
import { Card } from "../components/card.js";
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
  profileNameSelector,
  profileDescriptionSelector,
  profileAvatarSelector,
  popupEditSelector,
  popupAddSelector,
  popupChangeAvatarSelector,
  popupGallerySelector,
  inputName,
  inputDescription,
  popupDeletePlaceSelector
} from "../utils/constants.js";
import { Section } from "../components/Section";

//
const myUserInfo = new UserInfo(
  profileNameSelector,
  profileDescriptionSelector,
  profileAvatarSelector
);

//Инициализация всех форм
const popupAdd = new PopupWithForm (popupAddSelector, submitAddForm);
const popupEdit = new PopupWithForm (popupEditSelector, submitEditForm);
const popupChangeAvatar = new PopupWithForm (popupChangeAvatarSelector, submitChangePhoto);

//Инициализация попапа с подтверждением удаления
const popupDeleteConfirmation = new PopupForDeletion(popupDeletePlaceSelector, submitDeletePlace);

// Попап с картинкой
const popupWithImage = new PopupWithImage (popupGallerySelector);

// Сохранение изменений в профиле
function submitEditForm(evt, data) {
  evt.preventDefault();
  showLoading(true, evt.submitter);
  api
    .submitNewProfileInfo(data.name, data.description)
    .then((info) => {
      myUserInfo.setUserInfo({ name: info.name, description: info.about });
      popupEdit.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      showLoading(false, evt.submitter);
    });
}

// Сохранение данных локации
function submitAddForm(evt, data) {
  evt.preventDefault();
  showLoading(true, evt.submitter);
  api
    .postNewCard(data.nameOfPlace, data.linkImg)
    .then((card) => {
      const newCard = [];
      newCard.push(
        new Card(
          LOCATION_TEMPLATE,
          LOCATION_TEMPLATE_CLASS,
          card.name,
          card.link,
          card.likes,
          card.owner._id,
          card._id,
          api.myId,
          setEventListenerIconLike,
          openBigPhotoPopup,
          openPopupDeleteLocation
        )
      );
      const sectionWithNewCard = new Section(
        {
          items: newCard,
          renderer: renderLocation,
        },
        CARDS_CONTAINER_SELECTOR
      );
      sectionWithNewCard.addOneElement(newCard[0].create());
      popupAdd.close();

    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      showLoading(false, evt.submitter);
    });

  buttonOff(evt.submitter, "popup__submit-button_inactive");
}

function submitChangePhoto(evt, data) {
  evt.preventDefault();
  showLoading(true, evt.submitter);
  api
    .submitNewAvatar(data.linkAvatar)
    .then((res) => {
      myUserInfo.setUserInfo({ avatar: res.avatar });
      popupChangeAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      showLoading(false, evt.submitter);
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


//События на кнопках "редактировать", "добавить", "изменить фото"
buttonAdd.addEventListener("click", () => {
  popupAdd.open();
});

buttonEdit.addEventListener("click", () => {
  const userData = myUserInfo.getUserInfo();
  inputName.value = userData.name;
  inputDescription.value = userData.description;
  popupEdit.open();
});

buttonChangeAvatar.addEventListener("click", () => {
  popupChangeAvatar.open();
});

//проблема при передачи данных из асинхронного запроса в синхронный код
// let temporaryInfo;
// api.getProfileInfo().then((info) => {
//   temporaryInfo = info;
//   console.log(temporaryInfo);
// });
// console.log(temporaryInfo);

// Получение данных о профиле и карточках с сервера

Promise.all([api.getInitialCards(), api.getProfileInfo()])
  .then(([cards, info]) => {
    myUserInfo.setUserInfo({
      name: info.name,
      description: info.about,
      avatar: info.avatar,
    });
    api.myId = info._id;
    const initialCards = [];
    cards.reverse().forEach((card) => {
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
      initialCards.push(newCard.create());
    });
    const sectionWithInitialCards = new Section(
      {
        items: initialCards,
        renderer: renderLocation,
      },
      CARDS_CONTAINER_SELECTOR
    );
    sectionWithInitialCards.addArrayOfELements();
  })
  .catch((err) => {
    console.log(err);
  });



function openPopupDeleteLocation (cardId) {
  popupDeleteConfirmation.open(cardId);
}

function handleCardClick ({name, link}) {
  popupWithImage.open({name, link});
}
// Установка слушателей на иконку лайка
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

//Вызов валидации с настройками
enableValidation({
  formSelector: ".popup__container",
  fieldSetSelector: ".popup__input-container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
});

