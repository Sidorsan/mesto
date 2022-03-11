const getErrorElement =(inputElement) => {
    return inputElement.closest('.popap__form_section')
    .querySelector('.popup__input-error');
}

const showError = (formElement, inputElement, errorMessage) => {
    const errorElement = getErrorElement(inputElement);

    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
    inputElement.classList.add('popup__input_type_error');
};

const hideError = (formElement, inputElement) => {
    const errorElement = getErrorElement(inputElement);

    errorElement.textContent = "";
    errorElement.classList.remove('popup__input-error_active')
    inputElement.classList.remove('popup__input_type_error');
};

const checkValidity = (formElement, inputElement) => {
    console.log(inputElement.validity);
    const isInputNotValid = !inputElement.validity.valid;

    if(isInputNotValid) {
        const errorMessage = inputElement.validationMessage;
        showError(formElement, inputElement, errorMessage);
    } else {
        hideError(formElement, inputElement);
    };
}

const setEventListenersValidate = (formElement) => {
    const inputList = formElement.querySelectorAll('.popup__input');
    const inputListIterator = (inputElement) => {
        const handleInput = (event) => {
           checkValidity(formElement, inputElement);
        }
        inputElement.addEventListener('input', handleInput);
    };
    inputList.forEach(inputListIterator);
};

const enableValidation = () => {
   const formList = document.querySelectorAll(".popup__form");
   const formListIterator = (formElement) => {
    const hendleFormSubmit = (event) => {
    event.preventDefault();
    };
   
      formElement.addEventListener("submit", hendleFormSubmit)
      setEventListenersValidate(formElement); 
  };
  formList.forEach(formListIterator);
};

enableValidation();
