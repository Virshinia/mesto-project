import { Popup } from "./Popup.js"

class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallBack){
    super(popupSelector);
    this._submitForm = submitFormCallBack;
    this._formElement = this._popup.querySelector('.popup__container')
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._submitButton = this._popup.querySelector('.popup__submit-button');
    this._submitButtonText = this._submitButton.textContent;
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  _getInputValues (){
    this._inputValues = {};
    this._inputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      this.renderLoading(true);
      this._submitForm(evt, this._getInputValues())
        .then (() => this.close())
        .finally (() => this.renderLoading(false))
    });
  }

  renderLoading(isLoading, loadingText='Сохранение...') {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
      this._submitButton.disabled = true;
    } else {
      this._submitButton.textContent = this._submitButtonText;
      this._submitButton.disabled = false;
    }
  }
}

export { PopupWithForm }
