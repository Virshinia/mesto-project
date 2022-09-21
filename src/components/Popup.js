class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
  }
  open(){
    this._popup.classList.add("popup_opened");
    this.setEventListeners();
  }
  close(){
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
    this._popup.removeEventListener("mousedown", this._handleOverlayAndIconCrossClose)

  }
  _handleEscClose = (evt) =>{
    if (evt.key === "Escape") {
      this.close();
    }
  }
  _handleOverlayAndIconCrossClose = (evt) => {
    if (evt.target.classList.contains("popup_opened") || evt.target.classList.contains("popup__close-button")) {
      this.close()
    }
  }
  setEventListeners(){
    document.addEventListener("keydown", this._handleEscClose);
    this._popup.addEventListener("mousedown", this._handleOverlayAndIconCrossClose)
  }

}

export { Popup }
