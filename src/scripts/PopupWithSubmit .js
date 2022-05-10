import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
      
  }

  

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      //   this._handleFormSubmit(this._getInputValues());
      this._handleFormSubmit(this._item);
      // this._handleDelete(evt);
     
      this.closePopup();
    });
  }

  closePopup() {
    super.closePopup();
    // this._popupForm.reset();
  }

  openPopup(item) {
    this._item = item._id;
    super.openPopup();
  }
}

