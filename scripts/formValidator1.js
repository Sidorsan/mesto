export class FormValidator {
    constructor(settings, form) {
     this._form = form;
     this._settings = settings;  
    }
    _getErrorElement(inputElement) {
        return inputElement
          .closest(this._form)
          .querySelector(".form__input-error");
      }

    _showError(inputElement, errorMessage) {
        const errorElement = this._getErrorElement(inputElement);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._settings.errorClass);
        inputElement.classList.add(this._settings.inputErrorClass);
      }
    
      _hideError(inputElement) {
        const errorElement = this._getErrorElement(inputElement);
        errorElement.textContent = "";
        errorElement.classList.remove(this._settings.errorClass);
        inputElement.classList.remove(this._settings.inputErrorClass);
      }
    
    
    _checkValidity(inputElement) {
         if (!inputElement.validity.valid) {
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

    _setEventListenersValidate() {
        const inputlist = Array.from(this._form.querySelector(this._settings.inputSelector));
        const buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
        
        inputlist.forEach((inputElement) => {
            inputElement.addEventListener ('input', () => {
                this._checkValidity(inputElement)
                this._toggleButtonState()
            })
        })
      }
    
    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        
          this._setEventListenersValidate();
       
}
}

const validtionClass = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__submit-button_inactive",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__input-error_active",
    formSection: ".form__section"
  };