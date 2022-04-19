let buttonEdit = document.querySelector('.profile__button-edit');
let popup = document.querySelector('.popup');
let buttonClose = document.querySelector('.popup__close-button');
function openEditForm () {
    popup.classList.add ('popup_opened');
}
function closeEditForm () {
    popup.classList.remove ('popup_opened');
}
buttonEdit.addEventListener('click', openEditForm);
buttonClose.addEventListener('click', closeEditForm);

