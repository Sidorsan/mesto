const page = document.querySelector(".page");

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }
  openPopup() {
    this._popupSelector.classList.add("popup_opened");
    page.addEventListener("keydown", this._handleEscClose);
    this.setEventListeners()
  }
  closePopup() {
    this._popupSelector.classList.remove("popup_opened");
    page.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  };

  setEventListeners() {
    this._popupSelector.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.closePopup();
      }
      if (evt.target.classList.contains("popup__close")) {
        this.closePopup();
      }
    });
  }
}

