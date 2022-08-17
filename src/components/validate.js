//Добавить сообщение об ошибке
const showInputError = (popupElement, inputElement, errorMessage) => {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
};

//Убрать сообщение об ошибке
const hideInputError = (popupElement, inputElement) => {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
};

// Функция показа/скрытия сообщения об ошибке
const checkInputValidity = (popupElement, inputElement) => {

  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(popupElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(popupElement, inputElement);
  }
};

// Установка слушателей для проверки полей во время ввода
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

//Установка валидации на все формы
export const enableValidation = () => {
  const popupList = Array.from(document.querySelectorAll('.popup__container'));
  popupList.forEach((popupElement) => {
    const fieldsetList = Array.from(popupElement.querySelectorAll('.popup__input-container'));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet);
    });
  });
};

// Проверка валидности поля
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Активация-деактивация кнопки
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit-button_inactive');
  } else {
    buttonElement.classList.remove('popup__submit-button_inactive');
  }
};
