import { Popup } from "./Popup.js"

class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image");
    this._caption = this._popup.querySelector(".popup__caption");
  }
  open({link, name}) {
    this._image.src = link;
    this._image.setAttribute("alt", name);
    this._caption.textContent = name;
    super.open();
  }
}
export {PopupWithImage}
