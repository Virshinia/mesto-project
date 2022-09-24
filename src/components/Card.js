/*класс карточки*/
class Card {
  constructor(
    location_template,
    location_template_class,
    name,
    link,
    likes,
    ownerId,
    cardId,
    myId,
    setEventListenerIconLike,
    handleCardClick,
    openPopupDeleteLocation
  ) {
    this._location_template = location_template;
    this._location_template_class = location_template_class;
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._ownerId = ownerId;
    this._cardId = cardId;
    this._myId = myId;
    this._setEventListenerIconLike = setEventListenerIconLike;
    this._openBigPhotoPopup = handleCardClick;
    this._openPopupDeleteLocation = openPopupDeleteLocation;
  }

  _getCard() {
    this._card = this._location_template
      .querySelector(this._location_template_class)
      .cloneNode(true);
  }

  _isMine(id) {
    return id === this._myId;
  }

  _openBigPhotoMethod() {
    this._openBigPhotoPopup({ name: [this._name], link: [this._link] });
  }

  _activateLikeIcon(likes, iconLike) {
    if (
      likes.some((like) => {
        return this._isMine(like._id);
      })
    ) {
      iconLike.classList.add("location__like-icon_active");
    }
  }

  _setListenerIconLikeMethod() {
    this._setEventListenerIconLike(
      this._iconLike,
      this._cardId,
      this._likesCounter
    );
  }

  _setListenerForCardDelete() {
    if (this._isMine(this._ownerId)) {
      this._trashBin.addEventListener("click", () => {
        this._openPopupDeleteLocation(this._cardId)
      });
    } else {
      this._trashBin.remove();
    }
  }


  create() {
    this._getCard();
    this._locationPhoto = this._card.querySelector(".location__photo");
    this._trashBin = this._card.querySelector(".location__delete-icon");
    this._likesCounter = this._card.querySelector(".location__like-counter");
    this._iconLike = this._card.querySelector(".location__like-icon");

    this._locationPhoto.src = this._link;
    this._locationPhoto.setAttribute("alt", this._name);
    this._card.setAttribute("id", this._cardId);
    this._card.querySelector(".location__title").textContent = this._name;
    this._likesCounter.textContent = this._likes.length;

    this._locationPhoto.addEventListener(
      "click",
      this._openBigPhotoMethod.bind(this)
    );

    this._activateLikeIcon(this._likes, this._iconLike);

    this._iconLike.addEventListener(
      "click",
      this._setListenerIconLikeMethod.bind(this)
    );

    this._setListenerForCardDelete();

    return this._card;
  }


}

export { Card };