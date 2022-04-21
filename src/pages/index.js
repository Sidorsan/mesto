import '../pages/index.css'
import { Card, initialCards } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";
import Section from "../scripts/Section.js";
import Popup from "../scripts/Popup.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import { UserInfo } from "../scripts/UserInfo.js";


const popupElementAddUser = document.querySelector(".popup_add_user");
const popupOpenButtonElementAddUser = document.querySelector(
  ".profile__edit-button"
);
const formElementAddUser = popupElementAddUser.querySelector(".form_add_user");
const nameInput = formElementAddUser.querySelector(".form__input_meaning_name");
const jobInput = formElementAddUser.querySelector(".form__input_meaning_job");

const popupElementAddCard = document.querySelector(".popup_add_card");
const popupOpenButtonElementAddCard = document.querySelector(
  ".profile__add-button"
);


const inputCardTitle = popupElementAddCard.querySelector(
  ".form__input_card_title"
);
const inputCardLink = popupElementAddCard.querySelector(
  ".form__input_card_link"
);

const cardsSection = document.querySelector(".element__container");
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, ".item-template");
      const cardElement = card.createCard();
      cardList.addItem(cardElement);
    },
  },
  cardsSection
);
cardList.renderItems();

const popupAddUser = new Popup(popupElementAddUser);
const userInfo = new UserInfo(nameInput, jobInput);

function openPopupAddUser() {
  popupAddUser.openPopup();
  userInfo.getUserInfo()
  formValidators["form_add_user"].resetValidation();
}
popupOpenButtonElementAddUser.addEventListener("click", openPopupAddUser);


const handleProfileFormSubmit = new PopupWithForm(popupElementAddUser, {
  handleFormSubmit: () => {
    userInfo.setUserInfo()
  },
});
handleProfileFormSubmit.setEventListeners();

const popupAddCard = new Popup(popupElementAddCard);

function openPopupAddCard() {
  popupAddCard.openPopup();
  formValidators["form_add_card"].resetValidation();
}
popupOpenButtonElementAddCard.addEventListener("click", openPopupAddCard);


const handleCardFormSubmit = new PopupWithForm(popupElementAddCard, {
  handleFormSubmit: () => {
    const title = inputCardTitle.value;
    const link = inputCardLink.value;
    const newArray = [
      {
        name: title,
        link: link,
      },
    ];
    cardList.renderItem(newArray);
  },
});
handleCardFormSubmit.setEventListeners();

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
