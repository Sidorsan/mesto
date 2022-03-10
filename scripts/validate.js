const getErrorElement =(inputElement) => {
    return inputElement.closest('.popap__form_section')
    .querySelector('.popup__input-error');
}

const showError = (formElement, inputElement, errorMessage) => {
    const errorElement = getErrorElement(inputElement);

    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active')
};

const hideError = (formElement, inputElement) => {
    const errorElement = getErrorElement(inputElement);

    errorElement.textContent = "";
    errorElement.classList.remove('popup__input-error_active')
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

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', (event) => {
            console.log(event.target.name, event.target.value)

            checkValidity(formElement, inputElement);
        })
    })
}

const enableValidation = () => {
   const formList = document.querySelectorAll(".popup__form");
  
   formList.forEach((formElement) => {
      formElement.addEventListener("submit", (event) => {
          event.preventDefault();
      });
      setEventListenersValidate(formElement);
  });
};

enableValidation();
