class Api {
  constructor({ baseUrl, headers, myId }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this.myId = myId;
  }

  _checkRes = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  };

  _request = (url, options) => {
    return fetch(url, options).then(res => this._checkRes(res));
  }

  getInitialCards = () => {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers
    });
  };

  getProfileInfo = () => {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers
    });
  };

  submitNewProfileInfo = (name, description) => {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: description
      }),
    });
  };

  submitNewAvatar = (link) => {
    return this._request (`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    })
  };

  postNewCard = (name, imageUrl) => {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: imageUrl
      })
    })
  };

  deleteMyCard = (cardId) => {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    })
  };

  putLike = (cardId) => {
    return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers
    })
  };

  deleteLike = (cardId) => {
    return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    })
  };
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/plus-cohort-14",
  headers: {
    authorization: "3de2ed96-a0f0-47aa-922d-bdf7446c33cf",
    "Content-Type": "application/json"
  },
  myId: ""
});

export { api };
