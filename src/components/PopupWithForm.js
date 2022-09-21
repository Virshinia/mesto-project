import { Popup } from "./Popup.js"

class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallBack){
    super(popupSelector);
    this._submitForm = submitFormCallBack;
    this._inputContainer = this._popup.querySelector('.popup__container')
    this._inputs = this._popup.querySelectorAll('.popup__input');

  }
  open() {
    super.open();
  }
  close() {
    super.close();
    this._inputContainer.reset();
  }

  _getInputValues (){
    this._InputsArr = {};
    this._inputs.forEach((input) => {this._InputsArr[input.name] = input.value;});
    return this._InputsArr;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => this._submitForm(evt, this._getInputValues()))
  }
}

export { PopupWithForm }
