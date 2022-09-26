// Неактивная кнопка
const buttonOff = (button, inactiveStyle) => {
  button.classList.add(inactiveStyle);
  button.disabled = true;
};

//Изменение кнопки при загрузке
const showLoading = (status, button) => {
  if (status) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
};

export { buttonOff, showLoading };
