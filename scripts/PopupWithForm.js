export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmitForm) {
      super(popupSelector);
      this._handleSubmitForm = handleSubmitForm;
    }
  
   
  }