//Переменные для загрузки и добавления локаций
const locationTemplate = document.querySelector("#location-template").content,
  cardsContainer = document.querySelector(".locations");

//Отрисовка карточки с локацией на странице
//СОГЛАСНО БРИФА НАДО БУДЕТ РЕАЛИЗОВАТЬ КАК МЕТОД КЛАССА SECTION
export function renderLocation(newCard) {
  cardsContainer.prepend(newCard);
}

/*класс карточки*/
class Card {
  constructor(
    locationTemplate,
    name,
    link,
    likes,
    ownerId,
    cardId,
    myId,
    setEventListenerIconLike,
    openBigPhotoPopup,
    openPopupDeleteLocation
  ) {
    this._locationTemplate = locationTemplate;
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._ownerId = ownerId;
    this._cardId = cardId;
    this._myId = myId;
    this._setEventListenerIconLike = setEventListenerIconLike;
    this._openBigPhotoPopup = openBigPhotoPopup;
    this._openPopupDeleteLocation = openPopupDeleteLocation;
  }

  _getCard() {
    this._card = locationTemplate
      .querySelector(this._locationTemplate)
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
      this._trashBin.addEventListener("click", () =>
        this._openPopupDeleteLocation.bind(this)(this._cardId)
      );
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
