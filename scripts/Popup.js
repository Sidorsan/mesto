const popupList = document.querySelectorAll(".popup");
const popups = Array.from(popupList);

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }
  openPopup(item) {
    item.classList.add("popup_opened");
    page.addEventListener("keydown", this._handleEscClose);
  }
  closePopup(item) {
    item.classList.remove("popup_opened");
    page.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      const foundPopup = popups.find(function (popup) {
        return popup.classList.contains("popup_opened");
      });
      closePopup(foundPopup);
    }
  }
  
  setEventListeners() {
    popups.forEach((popup) => {
      popup.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains("popup_opened")) {
          closePopup(popup);
        }
        if (evt.target.classList.contains("popup__close")) {
          closePopup(popup);
        }
      });
    });
  }
}
