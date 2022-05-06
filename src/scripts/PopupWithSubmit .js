import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    

    // this._inputList = this._popup.querySelectorAll(".form__input");
    // this._popupForm = this._popup.querySelector(".form");
  }

  //   _getInputValues() {
  //     this._formValues = {};
  //     this._inputList.forEach(
  //       (input) => (this._formValues[input.name] = input.value)
  //     );
  //     return this._formValues;
  //   }
 
 
  // _handleDelete(evt) {
  //   const itemElement = evt.target.closest(".element__item");
  //   // this._handleDeleteIconClick
  //   itemElement.remove();
  // }

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

