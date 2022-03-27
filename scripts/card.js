import { openPopup } from "./index.js";
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

const popupElementBigPicture = document.querySelector(".popup_big_picture");

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    const itemTemplateContent = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element__item")
      .cloneNode(true);
    return itemTemplateContent;
  }
  createCard() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();
    this._cardElement.querySelector(".element__image").src = this._link;
    this._cardElement.querySelector(".element__title").textContent = this._name;
    this._cardElement.querySelector(".element__title").alt = this._name;

    return this._cardElement;
  }

  _handleDelete(evt) {
    const itemElement = evt.target.closest(".element__item");
    itemElement.remove();
  }

  _handleBigPicture() {
    const elementImageBigPicture =
      popupElementBigPicture.querySelector(".popup__image");
    const elementTitleBigPicture = popupElementBigPicture.querySelector(
      ".popup__title_big_picture"
    );
    elementImageBigPicture.src = this._link;
    elementImageBigPicture.alt = this._name;
    elementTitleBigPicture.textContent = this._name;
    this._openPopupBigPicture();
  }

  _openPopupBigPicture() {
    openPopup(popupElementBigPicture);
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".element__delete")
      .addEventListener("click", this._handleDelete);

    this._cardElement
      .querySelector(".element__like")
      .addEventListener("click", (evt) => {
        evt.target.classList.toggle("element__like_active");
      });

    this._cardElement
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleBigPicture();
      });
  }
}
