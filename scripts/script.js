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
const locations = document.querySelector('.locations'),
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
    addLocation (card.name, card.link);
})

//Переключаем like на карточке
function toggleLike (evt) {
    evt.target.classList.toggle('location__like-icon_active');
}

//Добавление карточки
function addLocation (name, link) {
    const locationTemplate = document.querySelector('#location-template').content;
    const locationElement = locationTemplate.querySelector('.location').cloneNode(true);
    const locationPhoto = locationElement.querySelector('.location__photo');
    locationPhoto.src = link;
    locationPhoto.setAttribute('alt', name);
    locationPhoto.addEventListener('click', openBigPhoto);
    locationElement.querySelector('.location__title').textContent = name;
    locationElement.querySelector('.location__delete-icon').addEventListener('click', deleteLocation);
    locationElement.querySelector('.location__like-icon').addEventListener('click', toggleLike)
    locations.prepend(locationElement);
}

//Открытие модального окна с фото
function openBigPhoto (evt){
    popupGallery.classList.add ('popup_opened');
    popupImg.src = evt.target.src;
    popupImg.setAttribute('alt', evt.target.alt)
    popupCaption.textContent = evt.target.alt;

}

//Удаление локации
function deleteLocation (evt) {
    evt.target.closest('.location').remove();
}

//Открытие формы для редактирования информации в профиле
function openEditForm () {
    popupEdit.classList.add ('popup_opened');
    inputName.setAttribute('placeholder', profileName.textContent);
    inputDescription.setAttribute('placeholder', profileDescription.textContent);
}

//Открытие формы для добавления новой локации
function openAddForm () {
    popupAdd.classList.add ('popup_opened');
}

// Закрытие всех модальных окон
function closeForm (evt) {
    let formContainer =  evt.target.closest('.popup');
    formContainer.classList.remove ('popup_opened');

    if (formContainer.classList.contains('popup_edit')) {
        inputName.value = '';
        inputDescription.value = '';
    }
}

buttonsClose.forEach ((button) => button.addEventListener('click', (evt) => closeForm(evt)));

// Сохранение изменений в профиле
function submitEditForm (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closeForm (evt);
}

// Сохранение данных
function submitAddForm (evt) {
    evt.preventDefault();
    const inputNameOfPlace = popupAdd.querySelector('#nameOfPlace').value;
    const inputLinkImg = popupAdd.querySelector('#linkImg').value;
    addLocation (inputNameOfPlace, inputLinkImg);
    closeForm (evt);
}

//События на кнопках
buttonAdd.addEventListener('click', openAddForm);
buttonEdit.addEventListener('click', openEditForm);
popupContainerEditForm.addEventListener('submit', submitEditForm);
popupContainerAddForm.addEventListener('submit', submitAddForm);

