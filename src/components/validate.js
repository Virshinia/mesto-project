import {buttonOn, buttonOff} from './utils.js';

//Добавить сообщение об ошибке
const showInputError = (popupElement, inputElement, errorMessage, settings) => {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
};

//Убрать сообщение об ошибке
const hideInputError = (popupElement, inputElement, settings) => {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.textContent = '';
};

// Функция показа/скрытия сообщения об ошибке
const checkInputValidity = (popupElement, inputElement, settings) => {

  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(popupElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(popupElement, inputElement, settings);
  }
};

// Установка слушателей для проверки полей во время ввода
const setEventListeners = (fieldSet, settings) => {
  const inputList = Array.from(fieldSet.querySelectorAll(settings.inputSelector));
  const buttonElement = fieldSet.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(fieldSet, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

//Установка валидации на все формы
export const enableValidation = (settings) => {
  const popupList = Array.from(document.querySelectorAll(settings.formSelector));
  popupList.forEach((popupElement) => {
    const fieldsetList = Array.from(popupElement.querySelectorAll(settings.fieldSetSelector));
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet, settings);
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
const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonOff (buttonElement, settings.inactiveButtonClass);
  } else {
    buttonOn (buttonElement, settings.inactiveButtonClass);
  }
};


