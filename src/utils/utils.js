// Неактивная кнопка
const buttonOff = (button, inactiveStyle) => {
  button.classList.add(inactiveStyle);
  button.disabled = true;
};
//Активная кнопка
const buttonOn = (button, inactiveStyle) => {
  button.classList.remove(inactiveStyle);
  button.disabled = false;
};

//Изменение кнопки при загрузке
const showLoading = (status, button) => {
  if (status) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

export {buttonOn, buttonOff, showLoading}
