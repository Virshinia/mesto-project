//Открытие всех модальных окон
import {closeByEscape} from './index.js';


export function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

// Закрытие всех модальных окон
export function closePopup (popup) {
  popup.classList.remove ('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}
