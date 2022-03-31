import {Card, initialCards} from "./card.js"
import {FormValidator} from "./formValidator.js"

const popupElementAddUser = document.querySelector(".popup_add_user");
const popupOpenButtonElementAddUser = document.querySelector(
  ".profile__edit-button"
);

const popupElementAddCard = document.querySelector(".popup_add_card");
const popupOpenButtonElementAddCard = document.querySelector(
  ".profile__add-button"
);

const formElementAddUser = document.querySelector(".form_add_user");
const nameInput = formElementAddUser.querySelector(".form__input_meaning_name");
const jobInput = formElementAddUser.querySelector(".form__input_meaning_job");
const nameInputValue = document.querySelector(".profile__title");
const jobInputValue = document.querySelector(".profile__subtitle");
const inputCardTitle = popupElementAddCard.querySelector(
  ".form__input_card_title"
);
const inputCardLink = popupElementAddCard.querySelector(
  ".form__input_card_link"
);

const keyEscapeListener = document.querySelector(".page");

const popupElementBigPicture = document.querySelector(".popup_big_picture");
const elementImageBigPicture = popupElementBigPicture.querySelector(".popup__image");
    const elementTitleBigPicture = popupElementBigPicture.querySelector(  ".popup__title_big_picture"
    );

export function openPopup(item) {
  item.classList.add("popup_opened");
  keyEscapeListener.addEventListener("keydown", closeKeyEscape);
}

 function closeKeyEscape(evt) {
  if (evt.key === "Escape") {
    const foundPopup = popups.find(function (popupList) {
      return popupList.classList.contains("popup_opened");
    });
    closePopup(foundPopup);
  }
}

function closePopup(item) {
  item.classList.remove("popup_opened");
  keyEscapeListener.removeEventListener("keydown", closeKeyEscape);
}

function openPopupAddUser() {
  openPopup(popupElementAddUser);
  nameInput.value = nameInputValue.textContent;
  jobInput.value = jobInputValue.textContent;
  const submitButtonElement = popupElementAddUser.querySelector(
    ".popup__submit-button"
  );
  submitButtonElement.classList.remove("popup__submit-button_inactive");
  submitButtonElement.removeAttribute("disabled");
  const errorElement =
    popupElementAddUser.querySelectorAll(".form__input-error");
  errorElement.forEach((item) => {
    item.classList.remove("form__input-error_active");
  });
  const inputElement = popupElementAddUser.querySelectorAll(".form__input");
  inputElement.forEach((item) => {
    item.classList.remove("form__input_type_error");
  });
}



function openPopupAddCard() {
  openPopup(popupElementAddCard);
  resetForm(popupElementAddCard);
  

}


popupOpenButtonElementAddUser.addEventListener("click", openPopupAddUser);
popupOpenButtonElementAddCard.addEventListener("click", openPopupAddCard);

function resetForm(item) {
  item.querySelector(".form").reset();
}

const popupList = document.querySelectorAll(".popup");
const popups = Array.from(popupList);
popups.forEach((popupList) => {
  popupList.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popupList);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popupList);
    }
  });
});

function submitPopupClose(event) {
  const itemElement = event.target.closest(".popup");
  closePopup(itemElement);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameInputValue.textContent = nameInput.value;
  jobInputValue.textContent = jobInput.value;
  submitPopupClose(evt);
}
formElementAddUser.addEventListener("submit", handleProfileFormSubmit);

function handleCardClick(name, link) {
    elementImageBigPicture.src = link;
    elementImageBigPicture.alt = name;
    elementTitleBigPicture.textContent =name;
  openPopup(popupElementBigPicture);
}





function renderItem(item) {
  const card = new Card(item, ".item-template", handleCardClick);
  const cardElement = card.createCard();
  document.querySelector(".element__container").prepend(cardElement);
}

function renderItems(items) {
  items.forEach(renderItem);
}
renderItems(initialCards);




function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const title = inputCardTitle.value;
  const link = inputCardLink.value;
  const newArray = [
    {
      name: title,
      link: link,
    },
  ];
  renderItems(newArray);
  submitPopupClose(evt);
  resetForm(popupElementAddCard);
  const submitButtonAddCard = popupElementAddCard.querySelector(
    ".popup__submit-button"
  );
  submitButtonAddCard.classList.add("popup__submit-button_inactive");
  submitButtonAddCard.setAttribute("disabled", true);
}
popupElementAddCard.addEventListener("submit", handleCardFormSubmit);



const validtionClass = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
  formSection: ".form__section"
};



function startValidation() {

  const formValidator = new FormValidator(validtionClass);
  const startEnableValidation = formValidator.enableValidation();
  
  return startEnableValidation;
}
startValidation();