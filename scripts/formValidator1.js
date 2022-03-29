class FormValidator {
  constructor(enableValidation, formElement) {
    this._formSelector = enableValidation.formSelector;
    this._inputSelector = enableValidation.inputSelector;
    this._submitButtonSelector = enableValidation.submitButtonSelector;
    this._inactiveButtonClass = enableValidation.inactiveButtonClass;
    this._inputErrorClass = enableValidation.inputErrorClass;
    this._errorClass = enableValidation.errorClass;
    this._formElement = formElement;
  }
  enableValidation() {
    const formList = document.querySelectorAll(this._formSelector);

    const formListIterator = (formElement) => {
      setEventListenersValidate(formElement);
    };

    formList.forEach(formListIterator);
  }
}

_setEventListenersValidate = (formElement) => {
    const inputList = formElement.querySelectorAll(this._inputSelector);
  
    const submitButtonElement = formElement.querySelector(
        this._submitButtonSelector
    );
  
    const inputListIterator = (inputElement) => {
      const handleInput = (event) => {
        checkValidity(formElement, inputElement);
        toggleButtonState(inputList, submitButtonElement);
      };
      //checkValidity(formElement, inputElement);
      inputElement.addEventListener("input", handleInput);
    };
  
    toggleButtonState(inputList, submitButtonElement);
    inputList.forEach(inputListIterator);
  };
