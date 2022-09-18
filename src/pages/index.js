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
} from "../components/modal.js";
import { openPopup, closePopup, buttonOff } from "../utils/utils.js";
import { enableValidation } from "../components/validate.js";
import { cardForDeletion, renderLocation } from "../components/card.js";
import { api } from "../components/Api.js";
import { myUserInfo }  from "../components/UserInfo.js";
import {
  buttonEdit,
  buttonAdd,
  buttonChangeAvatar
} from "../utils/constants.js";


// Сохранение изменений в профиле
function submitEditForm(evt) {
  evt.preventDefault();
  showLoading(true, evt.submitter);
  api.submitNewProfileInfo(inputName.value, inputDescription.value)
    .then((info) => {
      myUserInfo.setUserInfo({name: info.name, description: info.about})
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
  api.postNewCard(inputNameOfPlace.value, inputLinkImg.value)
    .then((card) => {
      renderLocation(
        card.name,
        card.link,
        card.likes,
        card.owner._id,
        card._id
      );
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
  api.submitNewAvatar(inputLinkAvatar.value)
    .then((res) => {
      myUserInfo.setUserInfo ({avatar: res.avatar});
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
  api.deleteMyCard(cardForDeletion)
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
  const userData = myUserInfo.getUserInfo()
  inputName.value = userData.name;
  inputDescription.value = userData.description;
  openPopup(popupEdit);
});

buttonChangeAvatar.addEventListener("click", () => {
  popupContainerChangeAvatarForm.reset();
  openPopup(popupChangeAvatar);
});

// Получение данных о профиле и карточках с сервера
Promise.all([api.getInitialCards(), api.getProfileInfo()])
  .then(([cards, info]) => {
    myUserInfo.setUserInfo({
      name:info.name,
      description:info.about,
      avatar: info.avatar
    })
    api._myId = info._id;
    cards
      .reverse()
      .forEach((card) =>
        renderLocation(
          card.name,
          card.link,
          card.likes,
          card.owner._id,
          card._id
        )
      );
  })
  .catch((err) => {
    console.log(err);
  });

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
