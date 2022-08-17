//Открытие всех модальных окон
import {popupOpened} from "./modal";

export function openPopup (popup) {
  popup.classList.add('popup_opened');
  popupOpened = popup;
}

// Закрытие всех модальных окон
export function closePopup (popup) {
  popup.classList.remove ('popup_opened');
}
