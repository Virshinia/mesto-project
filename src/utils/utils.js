// Неактивная кнопка
export const buttonOff = (button, inactiveStyle) => {
  button.classList.add(inactiveStyle);
  button.disabled = true;
};
//Активная кнопка
export const buttonOn = (button, inactiveStyle) => {
  button.classList.remove(inactiveStyle);
  button.disabled = false;
};

export function showLoading(status, button) {
  if (status) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}
