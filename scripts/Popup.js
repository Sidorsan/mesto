const page = document.querySelector(".page");
const popupList = document.querySelectorAll(".popup");
const popups = Array.from(popupList);

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }
  openPopup() {
    this._popupSelector.classList.add("popup_opened");
    page.addEventListener("keydown", this._handleEscClose);
  }
  closePopup() {
    this._popupSelector.classList.remove("popup_opened");
    page.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
    this.closePopup();
    }
  }

//   setEventListeners() {
//     popups.forEach((popup) => {
//       popup.addEventListener("mousedown", (evt) => {
//         if (evt.target.classList.contains("popup_opened")) {
//           closePopup(popup);
//         }
//         if (evt.target.classList.contains("popup__close")) {
//           closePopup(popup);
//         }
//       });
//     });
//   }
// }
