/*класс карточки*/
class Card {
  constructor(
    locationTemplate,
    locationTemplateClass,
    name,
    link,
    likes,
    ownerId,
    cardId,
    myId,
    handleCardClick,
    openPopupDeleteLocation,
    deleteLike,
    putLike
  ) {
    this._locationTemplate = locationTemplate;
    this._locationTemplateClass = locationTemplateClass;
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._ownerId = ownerId;
    this.cardId = cardId;
    this._myId = myId;
    this._openBigPhotoPopup = handleCardClick;
    this._openPopupDeleteLocation = openPopupDeleteLocation;
    this._deleteLike = deleteLike;
    this._putLike = putLike;
  }

  _getCard() {
    this._card = this._locationTemplate
      .querySelector(this._locationTemplateClass)
      .cloneNode(true);
  }

  _isMine(id) {
    return id === this._myId;
  }

  _activateLikeIcon() {
    if (
      this._likes.some((like) => {
        return this._isMine(like._id);
      })
    ) {
      this._iconLike.classList.add("location__like-icon_active");
    }
  }

  _handleLike() {
    if (this._iconLike.classList.contains("location__like-icon_active")) {
      this._deleteLike(this);
    } else {
      this._putLike(this);
    }
  }

  putLike(card) {
    this._iconLike.classList.add("location__like-icon_active");
    this._likesCounter.textContent = card.likes.length;
  }

  deleteLike(card) {
    this._iconLike.classList.remove("location__like-icon_active");
    this._likesCounter.textContent = card.likes.length;
  }

  _openBigPhotoMethod() {
    this._openBigPhotoPopup({ name: [this._name], link: [this._link] });
  }

  _setListenerForCardDelete() {
    if (this._isMine(this._ownerId)) {
      this._trashBin.addEventListener("click", () => {
        this._openPopupDeleteLocation(this.cardId);
      });
    } else {
      this._trashBin.remove();
    }
  }

  _setEventListeners() {
    this._locationPhoto.addEventListener(
      "click",
      this._openBigPhotoMethod.bind(this)
    );
    this._setListenerForCardDelete();
    this._iconLike.addEventListener("click", this._handleLike.bind(this));
  }

  create() {
    this._getCard();
    this._locationPhoto = this._card.querySelector(".location__photo");
    this._trashBin = this._card.querySelector(".location__delete-icon");
    this._likesCounter = this._card.querySelector(".location__like-counter");
    this._iconLike = this._card.querySelector(".location__like-icon");

    this._locationPhoto.src = this._link;
    this._locationPhoto.setAttribute("alt", this._name);
    this._card.setAttribute("id", this.cardId);
    this._card.querySelector(".location__title").textContent = this._name;
    this._likesCounter.textContent = this._likes.length;

    this._activateLikeIcon();

    this._setEventListeners();

    return this._card;
  }
}

export { Card };
