class FormValidator {
  constructor(inputElement, formSelector) {
    this._inputElement = inputElement;
    this._formSelector = formSelector;
  }

  _getErrorElement() {
    return inputElement
      .closest(".form__section")
      .querySelector(".form__input-error");
  }

  _showError() {
    this._errorElement = this._getErrorElement();
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add("form__input-error_active");
    this._inputElement.classList.add("form__input_type_error");
  }

  _hideError() {
    this._errorElement = _getErrorElement();
    this._errorElement.textContent = "";
    this._errorElement.classList.remove("form__input-error_active");
    this._inputElement.classList.remove("form__input_type_error");
  }

  _checkValidity() {
    const isInputNotValid = !this._inputElement.validity.valid;

    if (isInputNotValid) {
      const errorMessage = this._inputElement.validationMessage;
      this._showError();
    } else {
      this._hideError();
    }
  }
  _toggleButtonState() {
    const submitButtonElement = formElement.querySelector(
      ".popup__submit-button"
    );
    const inputList = formElement.querySelectorAll(".form__input");
    const inputElements = Array.from(inputList);
    const hasInvalidInput = inputElements.some((inputElement) => {
      //console.log (inputElement.validity)
      return !inputElement.validity.valid;
    });

    if (hasInvalidInput) {
      submitButtonElement.classList.add("popup__submit-button_inactive");
      submitButtonElement.setAttribute("disabled", true);
    } else {
      submitButtonElement.classList.remove("popup__submit-button_inactive");
      submitButtonElement.removeAttribute("disabled");
    }
  }

  _setEventListenersValidate() {
   
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
  }
}
