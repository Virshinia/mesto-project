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

const locations = document.querySelector('.locations');

function openEditForm () {
    popupEdit.classList.add ('popup_opened');
    inputName.setAttribute('placeholder', profileName.textContent);
    inputDescription.setAttribute('placeholder', profileDescription.textContent);
}

function openAddForm () {
    popupAdd.classList.add ('popup_opened');
}

function closeForm (evt) {
    let formContainer =  evt.target.parentElement.parentElement;
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
    let inputNameOfPlace = popupAdd.querySelector('#nameOfPlace');
    let inputLinkImg = popupAdd.querySelector('#linkImg');

    addLocation (inputNameOfPlace, inputLinkImg);
    closeForm (evt);
}

function toggleLike(evt) {
    evt.target.classList.toggle('location__like-icon_active');
}

function addLocation (inputNameOfPlace, inputLinkImg) {
    const locationTemplate = document.querySelector('#location-template').content;
    const locationElement = locationTemplate.querySelector('.location').cloneNode(true);
    locationElement.querySelector('.location__like-icon').addEventListener('click', evt => toggleLike(evt));
    locationElement.querySelector('.location__photo').src = inputLinkImg.value;
    locationElement.querySelector('.location__photo').setAttribute('alt', inputNameOfPlace.value);
    locationElement.querySelector('.location__title').textContent = inputNameOfPlace.value;
    locations.append(locationElement);
}


buttonsClose.forEach ((button) => button.addEventListener('click', (evt) => closeForm(evt)));
buttonAdd.addEventListener('click', openAddForm);
buttonEdit.addEventListener('click', openEditForm);
popupContainerEditForm.addEventListener('submit', submitEditForm);
popupContainerAddForm.addEventListener('submit', submitAddForm);
