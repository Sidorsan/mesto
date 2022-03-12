const getErrorElement = (inputElement) => {
  return inputElement
    .closest(".popap__form_section")
    .querySelector(".popup__input-error");
};

const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = getErrorElement(inputElement);

  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
  inputElement.classList.add("popup__input_type_error");
};

const hideError = (formElement, inputElement) => {
  const errorElement = getErrorElement(inputElement);

  errorElement.textContent = "";
  errorElement.classList.remove("popup__input-error_active");
  inputElement.classList.remove("popup__input_type_error");
};

const checkValidity = (formElement, inputElement) => {
  const isInputNotValid = !inputElement.validity.valid;

  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;
    showError(formElement, inputElement, errorMessage);
  } else {
    hideError(formElement, inputElement);
  }
};

const toggleButtonState = (inputList, submitButtonElement) => {
  const inputElements = Array.from(inputList);
  const hasInvalidInput = inputElements.some((inputElement) => {
    
    return !inputElement.validity.valid;
  });

  if (hasInvalidInput) {
    submitButtonElement.classList.add("popup__submit-button_inactive");
    submitButtonElement.setAttribute("disabled", true);
  } else {
    submitButtonElement.classList.remove("popup__submit-button_inactive");
    submitButtonElement.removeAttribute("disabled");
  }
};

const setEventListenersValidate = (formElement) => {
  const inputList = formElement.querySelectorAll(".popup__input");
  const submitButtonElement = formElement.querySelector(
    ".popup__submit-button"
  );

  const inputListIterator = (inputElement) => {
    const handleInput = (event) => {
      checkValidity(formElement, inputElement);
      toggleButtonState(inputList, submitButtonElement);
    };
    inputElement.addEventListener("input", handleInput);
  };

  toggleButtonState(inputList, submitButtonElement);
  inputList.forEach(inputListIterator);
 };

const enableValidation = () => {
  const formList = document.querySelectorAll(".popup__form");
  const formListIterator = (formElement) => {
    const hendleFormSubmit = (event) => {
      event.preventDefault();
    };

    formElement.addEventListener("submit", hendleFormSubmit);
    setEventListenersValidate(formElement);
  };

  formList.forEach(formListIterator);
};

enableValidation();
