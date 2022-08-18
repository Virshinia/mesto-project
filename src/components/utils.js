import {closeByEscape} from './index.js';

//Открытие всех модальных окон
export function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

// Закрытие всех модальных окон
export function closePopup (popup) {
  popup.classList.remove ('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}
// Неактивная кнопка
export const buttonOff = (button, inactiveStyle) => {
  button.classList.add(inactiveStyle);
  button.disabled = true;
}
//Активная кнопка
export const buttonOn = (button, inactiveStyle) => {
  button.classList.remove(inactiveStyle);
  button.disabled = false;
}
