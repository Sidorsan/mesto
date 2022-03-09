const getErrorElement = (inputElement) => {
    return inputElement
    .closest ('.form_section')
    .querySelector('.form_input-error');
};

const showError = (formElement, inputElement, errorMessage) => {
const errorElement = getErrorElement(inputElement);

errorElement.textcontent = errorMessage;
inputElement.classList.remove("form_input_is_valid")
errorElement.classList.add('form_input-error_active');
};

