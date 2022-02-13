const popupElement = document.querySelector(".popup");
const popupCloseButtonElelement = popupElement.querySelector(".popup__close");
const popupOpenButtonElement = document.querySelector(".profile__edit-button");

// Находим форму в DOM
let formElement = document.querySelector(".popup__form"); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector(".popup__input_meaning_name"); // Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector(".popup__input_meaning_job"); // Воспользуйтесь инструментом .querySelector()
let nameInputValue = document.querySelector(".profile__title");
let jobInputValue = document.querySelector(".profile__subtitle");

const openPopup = function () {
  popupElement.classList.add("popup_opened");
  nameInput.value = nameInputValue.textContent;
  jobInput.value = jobInputValue.textContent;
};

const closePopup = function () {
  popupElement.classList.remove("popup_opened");
};

popupOpenButtonElement.addEventListener("click", openPopup);
popupCloseButtonElelement.addEventListener("click", closePopup);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value

  // Выберите элементы, куда должны быть вставлены значения полей

  // Вставьте новые значения с помощью textContent
  nameInputValue.textContent = nameInput.value;
  jobInputValue.textContent = jobInput.value;
  closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

formElement.addEventListener("submit", formSubmitHandler);
