import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._elementImageBigPicture = document.querySelector(".popup__image");
    this._elementTitleBigPicture = document.querySelector(
      ".popup__title_big_picture"
    );
  }

  openPopup(name, link) {
    this._elementImageBigPicture.src = link;
    this._elementImageBigPicture.alt = name;
    this._elementTitleBigPicture.textContent = name;
    super.openPopup();
  }
}
