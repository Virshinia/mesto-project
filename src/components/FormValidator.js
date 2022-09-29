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

  _checkInputValidity(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      this._showInputError(
        this._fieldSet,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(this._fieldSet, inputElement);
    }
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonOff();
    } else {
      this._buttonOn();
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _buttonOff() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  _buttonOn() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  _setEventListeners() {
    this._fieldSet = this._formToValidate.querySelector(this._fieldSetSelector);
    this._inputList = Array.from(
      this._fieldSet.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._fieldSet.querySelector(
      this._submitButtonSelector
    );
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener(
        "input",
        function () {
          this._checkInputValidity(inputElement);
          this.toggleButtonState();
        }.bind(this)
      );
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
