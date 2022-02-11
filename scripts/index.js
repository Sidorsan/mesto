const popupElement = document.querySelector(".popup");
const popupCloseButtonElelement = popupElement.querySelector(".popup__close");
const popupOpenButtonElement = document.querySelector(".profile__edit-button");

// Находим форму в DOM
let formElement = document.querySelector(".popup__container"); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector(".popup__nameInput"); // Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector(".popup__jobInput"); // Воспользуйтесь инструментом .querySelector()

const openPopup = function () {
  popupElement.classList.add("popup_opened");
  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__subtitle").textContent;
};
const closePopup = function () {
  popupElement.classList.remove("popup_opened");
  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__subtitle").textContent;
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
  let profile1 = document.querySelector(".profile__title");
  let profile2 = document.querySelector(".profile__subtitle");
  // Вставьте новые значения с помощью textContent
  profile1.textContent = nameInput.value;
  profile2.textContent = jobInput.value;
  popupElement.classList.remove("popup_opened")
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

formElement.addEventListener("submit", formSubmitHandler);
