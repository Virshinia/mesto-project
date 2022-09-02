import '../pages/index.css';
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
  popupDeletePlace, popupContainerDeletePlace
} from './modal.js';
import {openPopup, closePopup, buttonOff} from './utils.js';
import {enableValidation} from './validate.js';
import {renderLocation} from './card.js';
import {
  config,
  getInitialCards,
  getProfileInfo,
  submitNewProfileInfo,
  submitNewAvatar,
  postNewCard,
  deleteMyCard
} from './api.js';
import {profileName, profileDescription, profileAvatar, buttonEdit, buttonAdd, buttonChangeAvatar, renderProfileInfo} from './profile.js';



// Сохранение изменений в профиле
function submitEditForm (evt) {
  evt.preventDefault();
  submitNewProfileInfo (inputName.value, inputDescription.value)
    .then (info => {
      profileName.textContent = info.name;
      profileDescription.textContent = info.about
    })
    .catch((err) => {
      console.log(err);
    });
  closePopup (popupEdit);
}

// Сохранение данных локации
function submitAddForm (evt) {
  evt.preventDefault();
  postNewCard(inputNameOfPlace.value, inputLinkImg.value)
    .then (card => {
      renderLocation(card.name, card.link, card.likes, card.owner._id, card._id)
    })
    .catch((err) => {
      console.log(err);
    });
  closePopup (popupAdd);
  buttonOff (evt.target.querySelector('.popup__submit-button'), 'popup__submit-button_inactive');
}

function submitChangePhoto (evt) {
  evt.preventDefault();
  submitNewAvatar (inputLinkAvatar.value)
    .then (link => {
      profileAvatar.src = link.avatar
    })
    .catch((err) => {
      console.log(err);
    });
  closePopup(popupChangeAvatar);
}

export function submitDeletePlace (evt, cardId, currentCard) {
  evt.preventDefault();
  console.log(cardId);
  deleteMyCard (cardId)
    .then (() => {
        currentCard.remove();
        closePopup(popupDeletePlace);
      }
      )
    .catch((err) => {
      console.log(err);
    });
}

// Закрытие popup по esc
export function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
}

// Закрытие popup по overlay и по крестику
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(popup)
    }
  })
})

//События на кнопках "редактировать", "добавить", "изменить фото"
buttonAdd.addEventListener('click', () => {
  popupContainerAddForm.reset();
  openPopup(popupAdd);
});

buttonEdit.addEventListener('click', ()=> {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(popupEdit);
});

buttonChangeAvatar.addEventListener('click', ()=> {
  popupContainerChangeAvatarForm.reset();
  openPopup(popupChangeAvatar);
});

// Получение данных о профиле и карточках с сервера
Promise.all([getInitialCards(), getProfileInfo()])
  .then(([cards, info]) => {
    renderProfileInfo(info.name, info.avatar, info.about);
    config.myId = info._id;
    cards.reverse().forEach((card) =>
      renderLocation(card.name, card.link, card.likes, card.owner._id, card._id),
    )
  }
)

//Добавление слушателей на формы
popupContainerEditForm.addEventListener('submit', submitEditForm);
popupContainerAddForm.addEventListener('submit', submitAddForm);
popupContainerChangeAvatarForm.addEventListener('submit', submitChangePhoto);


//Вызов валидации с настройками
enableValidation({
  formSelector: '.popup__container',
  fieldSetSelector: '.popup__input-container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error'
});
