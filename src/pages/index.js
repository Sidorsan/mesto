import "../pages/index.css";
import { Card, initialCards } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";
import Section from "../scripts/Section.js";
import Popup from "../scripts/Popup.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import { UserInfo } from "../scripts/UserInfo.js";
import {
  settings,
  nameInput,
  jobInput,
  popupOpenButtonElementAddUser,
  nameInputValue,
  jobInputValue,
  popupOpenButtonElementAddCard,
  cardsSection,
} from "../scripts/utils/constants.js";

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

export const popupWithImage = new PopupWithImage(".popup_big_picture");
popupWithImage.setEventListeners();

const popupAddUser = new Popup(".popup_add_user");

const popupAddCard = new Popup(".popup_add_card");

const userInfo = new UserInfo(nameInputValue, jobInputValue);

function openPopupAddUser() {
  popupAddUser.openPopup();
  const { profileName, job } = userInfo.getUserInfo();
  nameInput.value = profileName;
  jobInput.value = job;
  formValidators["form_add_user"].resetValidation();
}
popupOpenButtonElementAddUser.addEventListener("click", openPopupAddUser);

const handleProfileFormSubmit = new PopupWithForm(".popup_add_user", {
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
  },
});
handleProfileFormSubmit.setEventListeners();

function openPopupAddCard() {
  popupAddCard.openPopup();
  formValidators["form_add_card"].resetValidation();
}
popupOpenButtonElementAddCard.addEventListener("click", openPopupAddCard);

const handleCardFormSubmit = new PopupWithForm(".popup_add_card", {
  handleFormSubmit: (formData) => {
    const newArray = [
      {
        name: formData.title,
        link: formData.link,
      },
    ];
    cardList.renderItem(newArray);
  },
});
handleCardFormSubmit.setEventListeners();

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
