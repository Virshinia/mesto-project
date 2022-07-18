//Переменные в блоке профиля
const profile = document.querySelector('.profile'),
    profileName = profile.querySelector('.profile__name'),
    profileDescription = profile.querySelector('.profile__description'),
    buttonEdit = profile.querySelector('.profile__button-edit'),
    buttonAdd = profile.querySelector('.profile__button-add');

// Переменные для модальных окон
const buttonsClose = document.querySelectorAll('.popup__close-button'),
    popups = document.querySelectorAll('.popup'),
    popupEdit = document.querySelector('.popup_edit'),
    popupAdd = document.querySelector('.popup_addPlace'),
    popupContainerEditForm = document.querySelector('[name="edit-profile"]'),
    popupContainerAddForm = document.querySelector('[name="add-place"]'),
    inputName = document.querySelector('#name-input'),
    inputDescription = document.querySelector('#description-input');
let popupOpened;

// Переменные для модального окна с большой картинкой
const popupGallery = document.querySelector('.popup_gallery'),
    popupImg = popupGallery.querySelector('.popup__image'),
    popupCaption = popupGallery.querySelector('.popup__caption');

//Переменные для загрузки и добавления локаций
const locationTemplate = document.querySelector('#location-template').content;
const cardsContainer = document.querySelector('.locations'),
    initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


// Добавление карточек из массива initialCards при загрузке
initialCards.forEach((card) => renderLocation (card.name, card.link));

//Отрисовка карточки с локацией на странице
function renderLocation (name, link) {
    cardsContainer.prepend(createLocation(name, link));
}

// Создание карточки с локацией
function createLocation (name, link) {
    const locationElement = locationTemplate.querySelector('.location').cloneNode(true);
    const locationPhoto = locationElement.querySelector('.location__photo');
    locationPhoto.src = link;
    locationPhoto.setAttribute('alt', name);
    locationPhoto.addEventListener('click',() => openBigPhotoPopup({ name, link }));
    locationElement.querySelector('.location__title').textContent = name;
    locationElement.querySelector('.location__delete-icon').addEventListener('click', deleteLocation);
    locationElement.querySelector('.location__like-icon').addEventListener('click', toggleLike);
    return locationElement;
}

//Переключение like на карточке
function toggleLike (evt) {
    evt.target.classList.toggle('location__like-icon_active');
}

//Создание и открытие модального окна с фото
function openBigPhotoPopup ({name, link}){
    popupImg.src = link;
    popupImg.setAttribute('alt', name)
    popupCaption.textContent = name;
    openPopup(popupGallery);
}

//Удаление карточки с локацией
function deleteLocation (evt) {
    evt.target.closest('.location').remove();
}

//Установка слушателя на все кнопки закрытия модальных окон
buttonsClose.forEach ((button) => button.addEventListener('click', (evt) => closePopup(evt.target.closest('.popup'))));

// Закрытие всех модальных окон
function closePopup (popup) {
    popup.classList.remove ('popup_opened');
}

//Открытие всех модальных окон
function openPopup (popup) {
    popup.classList.add('popup_opened');
    popupOpened = popup;
}

// Сохранение изменений в профиле
function submitEditForm (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closePopup (popupEdit);
}

// Сохранение данных локации
function submitAddForm (evt) {
    evt.preventDefault();
    const inputNameOfPlace = popupAdd.querySelector('#nameOfPlace-input');
    const inputLinkImg = popupAdd.querySelector('#linkImg-input');
    renderLocation (inputNameOfPlace.value, inputLinkImg.value);
    closePopup (popupAdd);
}

//События на кнопках
buttonAdd.addEventListener('click', () => {
    popupContainerAddForm.reset();
    openPopup(popupAdd);
});
buttonEdit.addEventListener('click', ()=> {
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
    openPopup(popupEdit);
});



// Закрытие popup по esc
document.addEventListener('keyup', event => {
    if (event.key === 'Escape') {
        closePopup(popupOpened);
    }
});

//Закрытие popup по overlay
popups.forEach ((popup) => popup.addEventListener('click', event => {
    if (event.target === event.currentTarget) {
        closePopup(popupOpened);
    }
}));

//
const showInputError = (popupElement, inputElement, errorMessage) => {
    const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error');
};
const hideInputError = (popupElement, inputElement) => {
    const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error');
    errorElement.textContent = '';
};
const checkInputValidity = (popupElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(popupElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(popupElement, inputElement);
    }
};
const setEventListeners = (fieldSet) => {
    const inputList = Array.from(fieldSet.querySelectorAll('.popup__input'));
    const buttonElement = fieldSet.querySelector('.popup__submit-button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(fieldSet, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};
const enableValidation = () => {
  const popupList = Array.from(document.querySelectorAll('.popup__container'));
  popupList.forEach((popupElement) => {
    const fieldsetList = Array.from(popupElement.querySelectorAll('.popup__input-container'));
    console.log(fieldsetList);
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet);
    });
  });
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__submit-button_inactive');
    } else {
        buttonElement.classList.remove('popup__submit-button_inactive');
    }
};

enableValidation();

popupContainerEditForm.addEventListener('submit', submitEditForm);
popupContainerAddForm.addEventListener('submit', submitAddForm);
