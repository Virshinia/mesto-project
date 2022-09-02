export const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-14',
  headers: {
    authorization: '3de2ed96-a0f0-47aa-922d-bdf7446c33cf',
    'Content-Type': 'application/json'
  },
  myId: ''
}

// проверка статуса обращения на сервер
const checkRes = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

//  получить карточки с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => checkRes(res))
    .catch((err) => {
      console.log(err);
    });
}

// Получить информацию о профиле с сервера
export const getProfileInfo = () => {
 return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => checkRes(res))
    .catch((err) => {
      console.log(err);
    });
}

// Изменить информацию о профиле на сервере
export const submitNewProfileInfo = (name, description) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: description
    })
  })
    .then(res => checkRes(res))
}

export const submitNewAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
    .then(res => checkRes(res))
}

export const postNewCard = (name, imageUrl) => {
 return fetch(`${config.baseUrl}/cards`,{
   method: 'POST',
   headers: config.headers,
   body: JSON.stringify({
     name: name,
     link: imageUrl
     })
 })
   .then(res => checkRes(res))
}

export const deleteMyCard = (cardId) =>{
  return fetch(`${config.baseUrl}/cards/${cardId}`,{
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => checkRes(res))
}

export const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(res => checkRes(res))
}

export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => checkRes(res))
}
