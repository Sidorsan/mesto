const getErrorElement = (inputElement) => {
  return inputElement.closest(".form__section").querySelector(".form__input-error");
};

const showError = (formElement, inputElement, errorMessage) => {
  const errorElement = getErrorElement(inputElement);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(enableValidation.errorClass);
  inputElement.classList.add(enableValidation.inputErrorClass);
};

const hideError = (formElement, inputElement) => {
  const errorElement = getErrorElement(inputElement);

  errorElement.textContent = "";
  errorElement.classList.remove(enableValidation.errorClass);
  inputElement.classList.remove(enableValidation.inputErrorClass);
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
    submitButtonElement.classList.add(enableValidation.inactiveButtonClass);
    submitButtonElement.setAttribute("disabled", true);
  } else {
    submitButtonElement.classList.remove(enableValidation.inactiveButtonClass);
    submitButtonElement.removeAttribute("disabled");
  }
};

const setEventListenersValidate = (formElement) => {
  const inputList = formElement.querySelectorAll(enableValidation.inputSelector);

  const submitButtonElement = formElement.querySelector(
    enableValidation.submitButtonSelector
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

const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) => {
  enableValidation.formSelector = formSelector;
  enableValidation.inputSelector = inputSelector;
  enableValidation.submitButtonSelector = submitButtonSelector;
  enableValidation.inactiveButtonClass = inactiveButtonClass;
  enableValidation.inputErrorClass = inputErrorClass;
  enableValidation.errorClass = errorClass;


  const formList = document.querySelectorAll(enableValidation.formSelector);

  const formListIterator = (formElement) => {
    setEventListenersValidate(formElement);
  };

  formList.forEach(formListIterator);
};


enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
});

