export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    // тело конструктора
  }

  getInitial() {
    return fetch(this._baseUrl, {
      method: 'GET',
      headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Произошла ошибка')
    });
   }

   postInitialCards(data) {
    return fetch(this._baseUrl, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Произошла ошибка')
    });
  }
 
  patchUser(data) {
    return fetch(this._baseUrl, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Произошла ошибка')
    });
  }
  
  deleteCard(id) {
    return fetch(this._baseUrl + "/"+id, {
      method: 'DELETE',
      headers: this._headers,
      
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Произошла ошибка')
    });
  }


}


