import "./index.css";
import {
  popups,
  popupEdit,
  popupAdd,
  popupContainerEditForm,
  popupContainerAddForm,
  popupChangeAvatar,
  popupContainerChangeAvatarForm,
  inputName,
  inputDescription,
  inputNameOfPlace,
  inputLinkImg,
  inputLinkAvatar,
  popupDeletePlace,
  showLoading,
  popupContainerDeletePlace,
  openBigPhotoPopup,
  openPopupDeleteLocation,
  cardForDeletion,
} from "../components/modal.js";
import { openPopup, closePopup, buttonOff } from "../utils/utils.js";
import { enableValidation } from "../components/validate.js";
import { renderLocation, Card } from "../components/card.js";
import { api } from "../components/Api.js";
import {UserInfo} from "../components/UserInfo.js";
import {
  buttonEdit,
  buttonAdd,
  buttonChangeAvatar,
  LOCATION_TEMPLATE_CLASS,
  LOCATION_TEMPLATE,
  profileNameSelector,
  profileDescriptionSelector,
  profileAvatarSelector,
} from "../utils/constants.js";

const myUserInfo = new UserInfo(
  profileNameSelector,
  profileDescriptionSelector,
  profileAvatarSelector
);

// Сохранение изменений в профиле
function submitEditForm(evt) {
  evt.preventDefault();
  showLoading(true, evt.submitter);
  api
    .submitNewProfileInfo(inputName.value, inputDescription.value)
    .then((info) => {
      myUserInfo.setUserInfo({ name: info.name, description: info.about });
      closePopup(popupEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      showLoading(false, evt.submitter);
    });
}

// Сохранение данных локации
function submitAddForm(evt) {
  evt.preventDefault();
  showLoading(true, evt.submitter);
  api
    .postNewCard(inputNameOfPlace.value, inputLinkImg.value)
    .then((card) => {
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
        openBigPhotoPopup,
        openPopupDeleteLocation
      );
      renderLocation(newCard.create());
      closePopup(popupAdd);
      popupContainerAddForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      showLoading(false, evt.submitter);
    });

  buttonOff(evt.submitter, "popup__submit-button_inactive");
}

function submitChangePhoto(evt) {
  evt.preventDefault();
  showLoading(true, evt.submitter);
  api
    .submitNewAvatar(inputLinkAvatar.value)
    .then((res) => {
      myUserInfo.setUserInfo({ avatar: res.avatar });
      closePopup(popupChangeAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      showLoading(false, evt.submitter);
    });
}

export function submitDeletePlace(evt) {
  evt.preventDefault();
  const cardTemplateForDeletion = document.getElementById(cardForDeletion);
  api
    .deleteMyCard(cardForDeletion)
    .then(() => {
      cardTemplateForDeletion.remove();
      closePopup(popupDeletePlace);
    })
    .catch((err) => {
      console.log(err);
    });
}

// Закрытие popup по esc
export function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

// Закрытие popup по overlay и по крестику
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});

//События на кнопках "редактировать", "добавить", "изменить фото"
buttonAdd.addEventListener("click", () => {
  openPopup(popupAdd);
});

buttonEdit.addEventListener("click", () => {
  const userData = myUserInfo.getUserInfo();
  inputName.value = userData.name;
  inputDescription.value = userData.description;
  openPopup(popupEdit);
});

buttonChangeAvatar.addEventListener("click", () => {
  popupContainerChangeAvatarForm.reset();
  openPopup(popupChangeAvatar);
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
        openBigPhotoPopup,
        openPopupDeleteLocation
      );
      renderLocation(newCard.create());
    });
  })
  .catch((err) => {
    console.log(err);
  });

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

//Добавление слушателей на формы
popupContainerEditForm.addEventListener("submit", submitEditForm);
popupContainerAddForm.addEventListener("submit", submitAddForm);
popupContainerChangeAvatarForm.addEventListener("submit", submitChangePhoto);
popupContainerDeletePlace.addEventListener("click", submitDeletePlace);

//Вызов валидации с настройками
enableValidation({
  formSelector: ".popup__container",
  fieldSetSelector: ".popup__input-container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
});
