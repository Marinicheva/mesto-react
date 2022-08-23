import { API_URL, TOKEN } from "./utils";

class Api {
  constructor(url, token) {
    this._url = url;
    this._token = token;
  }

  //Обработка ответа сервера
  _getResponseData(res, errorMessage) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}.${errorMessage}`);
    }
    return res.json();
  }

  //Получение данных о пользователе
  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: "GET",
      headers: {
        authorization: this._token,
      },
    }).then((res) =>
      this._getResponseData(res, "Данные о пользователе не получены")
    );
  }

  //Получение карточек с сервера
  getCards() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: {
        authorization: this._token,
      },
    }).then((res) =>
      this._getResponseData(res, "Карточки с сервера не пришли")
    );
  }

  //Изменить статус лайка карточки
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._getResponseData(res, "Статус лайка не изменен"));
  }

  //Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "authorization": this._token,
      }
    })
    .then(res => this._getResponseData(res, "Карточка не удалена"));
  }
}

const api = new Api(API_URL, TOKEN);

export default api;
