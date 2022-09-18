class Api {
  constructor({baseUrl, headers, myId}){
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._myId = myId;
  }

  _checkRes = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getInitialCards = () => {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(res => this._checkRes(res))
  }

  getProfileInfo = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(res => this._checkRes(res))
  }

  submitNewProfileInfo = (name, description) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: description
      })
    })
      .then(res => this._checkRes(res))
  }

  submitNewAvatar = (link) => {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(res => this._checkRes(res))
  }

  postNewCard = (name, imageUrl) => {
    return fetch(`${this._baseUrl}/cards`,{
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: imageUrl
      })
    })
      .then(res => this._checkRes(res))
  }

  deleteMyCard = (cardId) => {
    return fetch(`${this._baseUrl}/cards/${cardId}`,{
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._checkRes(res))
  }

  putLike = (cardId) => {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => this._checkRes(res))
  }

  deleteLike = (cardId) => {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._checkRes(res))
  }
}

const api = new Api ({
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-14',
  headers: {
    authorization: '3de2ed96-a0f0-47aa-922d-bdf7446c33cf',
    'Content-Type': 'application/json'
  },
  myId: ''
});

export { api };
