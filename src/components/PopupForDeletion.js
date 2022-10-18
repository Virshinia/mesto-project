import { Popup } from "./Popup.js"

class PopupForDeletion extends Popup {
  constructor(popupSelector, submitFormCallBack) {
    super(popupSelector);
    this._submitForm = submitFormCallBack;
    this._cardForDeletion = '';
   }

   open(id) {
    this._cardForDeletion = id;
    super.open();
  }
  close(id) {
    this._cardForDeletion = '';
    super.close();
   }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => this._submitForm(evt, this._cardForDeletion))
  }
 }
export {PopupForDeletion}
