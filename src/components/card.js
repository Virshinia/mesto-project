import { openPopup } from "../utils/utils.js";
import { popupDeletePlace } from "./modal.js";
import { api } from "./Api.js";
import { openBigPhotoPopup } from "./modal.js";

//Переменные для загрузки и добавления локаций
const locationTemplate = document.querySelector("#location-template").content,
  cardsContainer = document.querySelector(".locations");

//Переменная для карточки для удаления
export let cardForDeletion = null;
//Отрисовка карточки с локацией на странице
// export function renderLocation(
//   name,
//   link,
//   likes,
//   ownerId,
//   cardId,
//   setEventListenerIconLike
// ) {
//   cardsContainer.prepend(
//     createLocation(name, link, likes, ownerId, cardId, setEventListenerIconLike)
//   );
// }
export function renderLocation(newCard) {
  cardsContainer.prepend(newCard);
}

// Проверка моего Id
// function isMine(id) {
//   return id === api.myId;
// }

// Создание карточки с локацией
// function createLocation(
//   name,
//   link,
//   likes,
//   ownerId,
//   cardId,
//   setEventListenerIconLike
// ) {
//   const locationElement = locationTemplate
//     .querySelector(".location")
//     .cloneNode(true);
//   const locationPhoto = locationElement.querySelector(".location__photo");
//   const trashBin = locationElement.querySelector(".location__delete-icon");
//   const likesCounter = locationElement.querySelector(".location__like-counter");
//   const iconLike = locationElement.querySelector(".location__like-icon");
//   locationPhoto.src = link;
//   locationPhoto.setAttribute("alt", name);
//   locationElement.setAttribute("id", cardId);
//   locationPhoto.addEventListener("click", () =>
//     openBigPhotoPopup({ name, link })
//   );
//   locationElement.querySelector(".location__title").textContent = name;
//   likesCounter.textContent = likes.length;
//   if (
//     likes.some((like) => {
//       return isMine(like._id);
//     })
//   ) {
//     iconLike.classList.add("location__like-icon_active");
//   }
//   iconLike.addEventListener("click", () =>
//     setEventListenerIconLike(iconLike, cardId, likesCounter)
//   );
//   if (isMine(ownerId)) {
//     trashBin.addEventListener("click", () => openPopupDeleteLocation(cardId));
//   } else {
//     trashBin.remove();
//   }
//   return locationElement;
// }

/*класс карточки*/
class Card {
  constructor(
    locationTemplate,
    name,
    link,
    likes,
    ownerId,
    cardId,
    setEventListenerIconLike
  ) {
    this._locationTemplate = locationTemplate;
    this._name = name;
    this._link = link;
    this._likes = likes;
    this.ownerId = ownerId;
    this.cardId = cardId;
    this.setEventListenerIconLike = setEventListenerIconLike;
  }

  _isMine(id) {
    return id === api.myId;
  }

  create() {
    const locationElement = locationTemplate
      .querySelector(this._locationTemplate)
      .cloneNode(true);
    const locationPhoto = locationElement.querySelector(".location__photo");
    const trashBin = locationElement.querySelector(".location__delete-icon");
    const likesCounter = locationElement.querySelector(
      ".location__like-counter"
    );
    const iconLike = locationElement.querySelector(".location__like-icon");
    locationPhoto.src = this._link;
    locationPhoto.setAttribute("alt", this._name);
    locationElement.setAttribute("id", this.cardId);
    locationPhoto.addEventListener("click", () =>
      openBigPhotoPopup({ name: [this._name], link: [this._link] })
    );
    locationElement.querySelector(".location__title").textContent = this._name;
    likesCounter.textContent = this._likes.length;
    if (
      this._likes.some((like) => {
        return this._isMine(like._id);
      })
    ) {
      iconLike.classList.add("location__like-icon_active");
    }
    iconLike.addEventListener("click", () =>
      this.setEventListenerIconLike(iconLike, this.cardId, likesCounter)
    );
    if (this._isMine(this.ownerId)) {
      trashBin.addEventListener("click", () =>
        openPopupDeleteLocation(this.cardId)
      );
    } else {
      trashBin.remove();
    }
    return locationElement;
  }
}

//Открыть попап карточки с локацией
function openPopupDeleteLocation(cardId) {
  openPopup(popupDeletePlace);
  cardForDeletion = cardId;
}

export { Card };
