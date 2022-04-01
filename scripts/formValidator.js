export class FormValidator {
  constructor(validtionClass) {
    this._formSelector = validtionClass.formSelector;
    this._inputSelector = validtionClass.inputSelector;
    this._submitButtonSelector = validtionClass.submitButtonSelector;
    this._inactiveButtonClass = validtionClass.inactiveButtonClass;
    this._inputErrorClass = validtionClass.inputErrorClass;
    this._errorClass = validtionClass.errorClass;
    this._formSection = validtionClass.formSection;
    this._inputList = this._formSelector.querySelectorAll(this._inputSelector)
    this._formlist = document.querySelectorAll(this._formSelector);
  }
  _getErrorElement(inputElement) {
    return inputElement
      .closest(this._formSection)
      .querySelector(".form__input-error");
  }

  _showError(inputElement, errorMessage) {
    const errorElement = this._getErrorElement(inputElement);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideError(inputElement) {
    const errorElement = this._getErrorElement(inputElement);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  }

  _checkValidity(inputElement) {
    const isInputNotValid = !inputElement.validity.valid;
    if (isInputNotValid) {
      const errorMessage = inputElement.validationMessage;
      this._showError(inputElement, errorMessage);
    } else {
      this._hideError(inputElement);
    }
  }

  _toggleButtonState(inputList, submitButtonElement) {
    const inputElements = Array.from(inputList);
    const hasInvalidInput = inputElements.some((inputElement) => {
      return !inputElement.validity.valid;
    });
    if (hasInvalidInput) {
      submitButtonElement.classList.add(this._inactiveButtonClass);
      submitButtonElement.setAttribute("disabled", true);
    } else {
      submitButtonElement.classList.remove(this._inactiveButtonClass);
      submitButtonElement.removeAttribute("disabled");
    }
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement);
    });
  }

  _setEventListenersValidate() {
    // this._inputList = formElement.querySelectorAll(this._inputSelector);
    console.log(this._inputList);
    this._submitButton = formElement.querySelector(this._submitButtonSelector);
    const inputListIterator = (inputElement) => {
      const handleInput = (event) => {
        this._checkValidity(inputElement);
        this._toggleButtonState(this._inputList, this._submitButton);
      };
      inputElement.addEventListener("input", handleInput);
    };
    this._toggleButtonState(this._inputList, this._submitButton);
    this._inputList.forEach(inputListIterator);
  }

  enableValidation() {
    // const formListIterator = (formElement) => {
      this._setEventListenersValidate();
  //   };
  //   this._formlist.forEach(formListIterator);
  }
}
