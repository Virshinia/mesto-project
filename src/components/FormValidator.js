export class FormValidator {
  constructor(
    {
      fieldSetSelector,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
    },
    formToValidate
  ) {
    this._fieldSetSelector = fieldSetSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._formToValidate = formToValidate;
  }

  _showInputError(popupElement, inputElement, errorMessage) {
    this._errorElement = popupElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = errorMessage;
  }

  _hideInputError(popupElement, inputElement) {
    this._errorElement = popupElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.textContent = "";
  }

  _checkInputValidity(popupElement, inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      this._showInputError(
        popupElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(popupElement, inputElement);
    }
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this.buttonOff(buttonElement, this._inactiveButtonClass);
    } else {
      this.buttonOn(buttonElement, this._inactiveButtonClass);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _setEventListeners(fieldSet) {
    this._inputList = Array.from(
      fieldSet.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = fieldSet.querySelector(this._submitButtonSelector);
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener(
        "input",
        function () {
          this._checkInputValidity(fieldSet, inputElement);
          this._toggleButtonState(this._inputList, this._buttonElement);
        }.bind(this)
      );
    });
  }

  buttonOff(button, inactiveStyle) {
    button.classList.add(inactiveStyle);
    button.disabled = true;
  }

  buttonOn(button, inactiveStyle) {
    button.classList.remove(inactiveStyle);
    button.disabled = false;
  }

  enableValidation() {
    this._fieldsetList = Array.from(
      this._formToValidate.querySelectorAll(this._fieldSetSelector)
    );
    this._fieldsetList.forEach((fieldSet) => {
      this._setEventListeners(fieldSet);
    });
  }
}
