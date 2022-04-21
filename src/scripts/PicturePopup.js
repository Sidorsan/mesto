import Popup from "./Popup.js";

const elementImageBigPicture = document.querySelector(".popup__image");
const elementTitleBigPicture = document.querySelector(
  ".popup__title_big_picture"
);

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  openPopup(name, link) {
    elementImageBigPicture.src = link;
    elementImageBigPicture.alt = name;
    elementTitleBigPicture.textContent = name;
    super.openPopup();
  }
}
