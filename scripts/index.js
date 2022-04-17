import { Card, initialCards } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import Section from "./Section.js";

const popupElementAddUser = document.querySelector(".popup_add_user");
const popupOpenButtonElementAddUser = document.querySelector(
  ".profile__edit-button"
);

const popupElementAddCard = document.querySelector(".popup_add_card");
const popupOpenButtonElementAddCard = document.querySelector(
  ".profile__add-button"
);

const formElementAddUser = popupElementAddUser.querySelector(".form_add_user");
const formElementAddCard = popupElementAddCard.querySelector(".form_add_card");
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

const page = document.querySelector(".page");

const popupElementBigPicture = document.querySelector(".popup_big_picture");
const elementImageBigPicture =
  popupElementBigPicture.querySelector(".popup__image");
const elementTitleBigPicture = popupElementBigPicture.querySelector(
  ".popup__title_big_picture"
);

const cardsSection = document.querySelector(".element__container");




const cardList = new Section({ items: initialCards, renderer: (item) => {
  const card = new Card (item, ".item-template", handleCardClick)
    const cardElement = card.createCard();
    cardList.addItem(cardElement);} }, cardsSection);
    cardList.renderItems();






function openPopup(item) {
  item.classList.add("popup_opened");
  page.addEventListener("keydown", handleEscKey);
}

function handleEscKey(evt) {
  if (evt.key === "Escape") {
    const foundPopup = popups.find(function (popup) {
      return popup.classList.contains("popup_opened");
    });
    closePopup(foundPopup);
  }
}

function closePopup(item) {
  item.classList.remove("popup_opened");
  page.removeEventListener("keydown", handleEscKey);
}

function openPopupAddUser() {
  openPopup(popupElementAddUser);
  nameInput.value = nameInputValue.textContent;
  jobInput.value = jobInputValue.textContent;
  formValidators["form_add_user"].resetValidation();
}

function openPopupAddCard() {
  openPopup(popupElementAddCard);
  resetForm(popupElementAddCard);
  formValidators["form_add_card"].resetValidation();
}

popupOpenButtonElementAddUser.addEventListener("click", openPopupAddUser);
popupOpenButtonElementAddCard.addEventListener("click", openPopupAddCard);

function resetForm(item) {
  item.querySelector(".form").reset();
}

const popupList = document.querySelectorAll(".popup");
const popups = Array.from(popupList);
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

function closeClosestPopup(event) {
  const itemElement = event.target.closest(".popup");
  closePopup(itemElement);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameInputValue.textContent = nameInput.value;
  jobInputValue.textContent = jobInput.value;
  closeClosestPopup(evt);
}
formElementAddUser.addEventListener("submit", handleProfileFormSubmit);

function handleCardClick(name, link) {
  elementImageBigPicture.src = link;
  elementImageBigPicture.alt = name;
  elementTitleBigPicture.textContent = name;
  openPopup(popupElementBigPicture);
}

// function createCard(item) {
//   const card = new Card(item, ".item-template", handleCardClick);
//   const cardElement = card.createCard();
//   return cardElement;
// }

// function renderItem(item) {
//   const cardElement = createCard(item);
//   cardsSection.prepend(cardElement);
// }

// function renderItems(items) {
//   items.forEach(renderItem);
// }
// renderItems(initialCards);

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
  cardList.renderItem(newArray);
  closeClosestPopup(evt);
  resetForm(popupElementAddCard);
}
popupElementAddCard.addEventListener("submit", handleCardFormSubmit);

const settings = {
  formSelector: ".form",
  formSection: ".form__section",
  inputSelector: ".form__input",
  inputSelectorError: ".form__input-error",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",

};
const formValidators = {};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((form) => {
    const validator = new FormValidator(settings, form);

    const formName = form.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(settings);
