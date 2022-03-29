class FormValidator {
  constructor(enableValidation, formElement) {
    this._formSelector = ".form",
    this._inputSelector = ".form__input";
    this._submitButtonSelector = ".popup__submit-button";
    this._inactiveButtonClass = "popup__submit-button_inactive";
    this._inputErrorClass = "form__input_type_error";
    this._errorClass = "form__input_type_error";
    this._formElement = formElement;
  }

  _getErrorElement() {
    return inputElement
      .closest(".form__section")
      .querySelector(".form__input-error");
  }

  _showError(inputElement, errorMessage) {
    const errorElement = _getErrorElement();

    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideError(inputElement) {
    const errorElement = _getErrorElement();

    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
  }

  _checkValidity(inputElement) {
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
      const errorMessage = inputElement.validationMessage;
      showError(inputElement, errorMessage);
    } else {
      hideError(inputElement);
    }
  }

  _toggleButtonState  (inputList, submitButtonElement) {
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
  };

  _setEventListenersValidate  ()  {
    const inputList = formElement.querySelectorAll(this._inputSelector);
    const submitButtonElement = formElement.querySelector(this._submitButtonSelector);
  
    const inputListIterator = (inputElement) => {
      const handleInput = (event) => {
        this._checkValidity(inputElement);
        this._toggleButtonState(inputList, submitButtonElement);
      };
      //checkValidity(formElement, inputElement);
      inputElement.addEventListener("input", handleInput);
    };
    toggleButtonState(inputList, submitButtonElement);
    inputList.forEach(inputListIterator);
  };


  enableValidation() {
    const formList = document.querySelectorAll(this._formSelector);

    const formListIterator = (formElement) => {
      setEventListenersValidate(formElement);
    };

    formList.forEach(formListIterator);
  }

}
const wer = FormValidator.enableValidation()

// enableValidation({
//   formSelector: ".form",
//   inputSelector: ".form__input",
//   submitButtonSelector: ".popup__submit-button",
//   inactiveButtonClass: "popup__submit-button_inactive",
//   inputErrorClass: "form__input_type_error",
//   errorClass: "form__input-error_active",
// });
