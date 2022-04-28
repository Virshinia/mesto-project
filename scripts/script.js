//Переменные в блоке профиля
const profile = document.querySelector('.profile'),
    profileName = profile.querySelector('.profile__name'),
    profileDescription = profile.querySelector('.profile__description'),
    buttonEdit = profile.querySelector('.profile__button-edit'),
    buttonAdd = profile.querySelector('.profile__button-add');

// Переменные для модальных окон
const buttonsClose = document.querySelectorAll('.popup__close-button'),
    popupEdit = document.querySelector('.popup_edit'),
    popupAdd = document.querySelector('.popup_addPlace'),
    popupContainerEditForm = document.querySelector('[name="edit-profile"]'),
    popupContainerAddForm = document.querySelector('[name="add-place"]'),
    inputName = document.querySelector('#name'),
    inputDescription = document.querySelector('#description');

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

// Переменные для модального окна с большой картинкой
const popupGallery = document.querySelector('.popup_gallery'),
    popupImg = popupGallery.querySelector('.popup__image'),
    popupCaption = popupGallery.querySelector('.popup__caption');

// Добавление карточек из массива initialCards при загрузке
initialCards.forEach(function (card) {
    renderLocation (card.name, card.link);
})

//Добавление карточки
function renderLocation (name, link) {
    cardsContainer.prepend(createLocation(name, link));
}

// Создание карточки
function createLocation (name, link) {
    const locationElement = locationTemplate.querySelector('.location').cloneNode(true);
    const locationPhoto = locationElement.querySelector('.location__photo');
    locationPhoto.src = link;
    locationPhoto.setAttribute('alt', name);
    locationPhoto.addEventListener('click',() => openBigPhoto({ name, link }));
    locationElement.querySelector('.location__title').textContent = name;
    locationElement.querySelector('.location__delete-icon').addEventListener('click', deleteLocation);
    locationElement.querySelector('.location__like-icon').addEventListener('click', toggleLike);
    return locationElement;
}

//Переключаем like на карточке
function toggleLike (evt) {
    evt.target.classList.toggle('location__like-icon_active');
}

//Создание модального окна с фото
function openBigPhoto ({name, link}){
    popupImg.src = link;
    popupImg.setAttribute('alt', name)
    popupCaption.textContent = name;
    openPopup(popupGallery);
}

//Удаление локации
function deleteLocation (evt) {
    evt.target.closest('.location').remove();
}

// Закрытие всех модальных окон
function closePopup (popup) {
    popup.classList.remove ('popup_opened');
}

buttonsClose.forEach ((button) => button.addEventListener('click', (evt) => closePopup (evt.target.closest('.popup'))));

//Открытие всех модальных окон
function openPopup (popup) {
    popup.classList.add('popup_opened');
}

// Сохранение изменений в профиле
inputName.value = profileName.textContent;
inputDescription.value = profileDescription.textContent;

function submitEditForm (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closePopup (evt);
}

// Сохранение данных
function submitAddForm (evt) {
    evt.preventDefault();
    const inputNameOfPlace = popupAdd.querySelector('#nameOfPlace');
    const inputLinkImg = popupAdd.querySelector('#linkImg');
    renderLocation (inputNameOfPlace.value, inputLinkImg.value);
    closePopup (evt);
    inputNameOfPlace.value = '';
    inputLinkImg.value = '';
}

//События на кнопках
buttonAdd.addEventListener('click', () => openPopup(popupAdd));
buttonEdit.addEventListener('click', ()=> openPopup(popupEdit));
popupContainerEditForm.addEventListener('submit', submitEditForm);
popupContainerAddForm.addEventListener('submit', submitAddForm);

