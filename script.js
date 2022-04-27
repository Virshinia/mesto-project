let profile = document.querySelector('.profile'),
    buttonEdit = profile.querySelector('.profile__button-edit'),
    buttonAdd = profile.querySelector('.profile__button-add'),
    buttonsClose = document.querySelectorAll('.popup__close-button'),
    popupEdit = document.querySelector('.popup_edit'),
    popupAdd = document.querySelector('.popup_addPlace'),
    popupContainerEditForm = document.querySelector('[name="edit-profile"]'),
    popupContainerAddForm = document.querySelector('[name="add-place"]'),
    profileName = document.querySelector('.profile__name'),
    profileDescription = document.querySelector('.profile__description'),
    inputName = document.querySelector('#name'),
    inputDescription = document.querySelector('#description')

const initialCards = [
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

const locations = document.querySelector('.locations');
const popupGallery = document.querySelector('.popup_gallery');
const popupImg = popupGallery.querySelector('.popup__image');
const popupCaption = popupGallery.querySelector('.popup__caption');

// Добавление карточек из массива карточек при загрузке
initialCards.forEach(function (card) {
    addLocation (card.name, card.link);
})

//Переключаем like на карточке
function toggleLike (evt) {
    evt.target.classList.toggle('location__like-icon_active');
}

function addLocation (name, link) {
    const locationTemplate = document.querySelector('#location-template').content;
    const locationElement = locationTemplate.querySelector('.location').cloneNode(true);
    locationElement.querySelector('.location__photo').src = link;
    locationElement.querySelector('.location__photo').setAttribute('alt', name);
    locationElement.querySelector('.location__photo').addEventListener('click', openBigPhoto);
    locationElement.querySelector('.location__title').textContent = name;
    locationElement.querySelector('.location__delete-icon').addEventListener('click', deleteLocation);
    locationElement.querySelector('.location__like-icon').addEventListener('click', toggleLike)
    locations.prepend(locationElement);
}

function openBigPhoto (evt){
    popupGallery.classList.add ('popup_opened');
    popupGallery.querySelector('.popup__image').src = evt.target.src;
    popupGallery.querySelector('.popup__image').setAttribute('alt', evt.target.alt)
    popupGallery.querySelector('.popup__caption').textContent = evt.target.alt;

}

function deleteLocation (evt) {
    evt.target.closest('.location').remove();
}

function openEditForm () {
    popupEdit.classList.add ('popup_opened');
    inputName.setAttribute('placeholder', profileName.textContent);
    inputDescription.setAttribute('placeholder', profileDescription.textContent);
}

function openAddForm () {
    popupAdd.classList.add ('popup_opened');
}

function closeForm (evt) {
    let formContainer =  evt.target.closest('.popup');
    formContainer.classList.remove ('popup_opened');

    if (formContainer.classList.contains('popup_edit')) {
        inputName.value = '';
        inputDescription.value = '';
    }
}

function submitEditForm (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closeForm (evt);
}

function submitAddForm (evt) {
    evt.preventDefault();
    let inputNameOfPlace = popupAdd.querySelector('#nameOfPlace').value;
    let inputLinkImg = popupAdd.querySelector('#linkImg').value;
    addLocation (inputNameOfPlace, inputLinkImg);
    closeForm (evt);
}




buttonsClose.forEach ((button) => button.addEventListener('click', (evt) => closeForm(evt)));
buttonAdd.addEventListener('click', openAddForm);
buttonEdit.addEventListener('click', openEditForm);
popupContainerEditForm.addEventListener('submit', submitEditForm);
popupContainerAddForm.addEventListener('submit', submitAddForm);

