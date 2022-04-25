let profile = document.querySelector('.profile'),
    buttonsOfProfile = profile.querySelectorAll('button'),
    buttonsClose = document.querySelectorAll('.popup__close-button'),
    buttonsLike = document.querySelectorAll('.location__like-icon'),
    popup = document.querySelectorAll('.popup'),
    popupContainer = document.querySelectorAll('.popup__container'),
    profileName = document.querySelector('.profile__name'),
    profileDescription = document.querySelector('.profile__description'),
    inputName = document.querySelector('#name'),
    inputDescription = document.querySelector('#description')

function openForm (index) {
    popup[index].classList.add ('popup_opened');
    if (index === 0) {
    inputName.setAttribute('placeholder', profileName.textContent);
    inputDescription.setAttribute('placeholder', profileDescription.textContent);
    }
}

function closeForm (evt) {
    let formContainer =  evt.target.parentElement.parentElement;
    formContainer.classList.remove ('popup_opened');

    if (formContainer.classList.contains('popup_edit')) {
        inputName.value = '';
        inputDescription.value = '';
    }
}

function submitForm (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closeForm ();
}

function toggleLike(evt) {
    evt.target.classList.toggle('location__like-icon_active');
}

buttonsLike.forEach((button) => button.addEventListener('click', (evt) => toggleLike (evt)));
buttonsClose.forEach ((button) => button.addEventListener('click', (evt) => closeForm(evt)));
buttonsOfProfile.forEach ((button, index) => button.addEventListener('click', function() {openForm(index)}));
popupContainer.forEach ((button) => button.addEventListener('submit', submitForm));