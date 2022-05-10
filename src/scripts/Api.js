export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;

  }

  _checkJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitial() {
    return fetch(this._baseUrl, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._checkJson(res));
  }

  postInitialCards(data) {
    return fetch(this._baseUrl, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._checkJson(res));
  }

  patchUser(data) {
    return fetch(this._baseUrl, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._checkJson(res));
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkJson(res));
  }

  likeCard(id) {
    return fetch(`${this._baseUrl}/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._checkJson(res));
  }

  disLikeCard(id) {
    return fetch(`${this._baseUrl}/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkJson(res));
  }

  patchAvatar(data) {
    return fetch(this._baseUrl, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._checkJson(res));
  }
}
