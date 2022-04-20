let buttonEdit = document.querySelector('.profile__button-edit');
let popup = document.querySelector('.popup');
let buttonClose = document.querySelector('.popup__close-button');
let editForm = popup.querySelector('.popup__container');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let inputName = popup.querySelector ('#name');
let inputDescription = popup.querySelector ('#description');

function openEditForm () {
    popup.classList.add ('popup_opened');
    inputName.setAttribute('placeholder', profileName.textContent);
    inputDescription.setAttribute('placeholder', profileDescription.textContent);
}

function closeEditForm () {
    popup.classList.remove ('popup_opened');
    inputName.value = '';
    inputDescription.value = '';
}

function submitForm (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closeEditForm ();
}

buttonEdit.addEventListener('click', openEditForm);
buttonClose.addEventListener('click', closeEditForm);
editForm.addEventListener('submit', submitForm);
