let buttonEdit = document.querySelector('.profile__button-edit');
let popup = document.querySelector('.popup');
let buttonClose = document.querySelector('.popup__close-button');
let submitButton = popup.querySelector('.popup__submit-button');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

function openEditForm () {
    popup.classList.add ('popup_opened');
}

function closeEditForm () {
    popup.classList.remove ('popup_opened');
}
buttonEdit.addEventListener('click', openEditForm);
buttonClose.addEventListener('click', closeEditForm);

let inputName = popup.querySelector ('#name');
let inputDescription = popup.querySelector ('#description');

function editInput (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closeEditForm ();
}

submitButton.addEventListener('click', editInput)
