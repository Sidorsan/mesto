export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export class Card {
  constructor({ item, handleCardClick, handleDeleteIconClick, nameInputValue}, cardSelector) {
    this._name = item.name;
    this._link = item.link;
    this._counter = item.likes.length;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._ownerId = item.owner._id;
    this._userId = nameInputValue.id
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".element__image");
    this._elementCounter = this._cardElement.querySelector(".element__counter");
    this._elementDelete = this._cardElement.querySelector(".element__delete");
  }
  _getTemplate() {
    const itemTemplateContent = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element__item")
      .cloneNode(true);
    return itemTemplateContent;
  }

  createCard() {
    this._likeCounter();
    this._checkId();
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardElement.querySelector(".element__title").textContent = this._name;
    this._cardImage.alt = this._name;
    return this._cardElement;
    
  }

  _checkId() {
    if (this._ownerId !== this._userId) {
      this._elementDelete.remove();
    }
  }

  _likeCounter() {
    if (this._counter > 0) {
      this._elementCounter.textContent = this._counter;
    } else {
      this._elementCounter.textContent = "";
    }
  }

  // _handleDelete(evt) {
  //   const itemElement = evt.target.closest(".element__item");
  //   // this._handleDeleteIconClick
  //   itemElement.remove();
  // }

  _setEventListeners() {
    if (this._cardElement.querySelector(".element__delete")) {
      //проверяем есть элемент в DOM
      this._elementDelete.addEventListener(
        "click",
        // this._handleDelete
        () => {
          this._handleDeleteIconClick();
        }
      );
    }

    this._cardElement
      .querySelector(".element__like")
      .addEventListener("click", (evt) => {
        evt.target.classList.toggle("element__like_active");
      });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick({
        // name: this._name,
        // link: this._link,
      });
    });
  }
}
