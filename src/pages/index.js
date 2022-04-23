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

const popupWithImage = new PopupWithImage(".popup_big_picture");
popupWithImage.setEventListeners();

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        {
          item,
          handleCardClick: () => {
            popupWithImage.openPopup(item);
          },
        },
        ".item-template"
      );

      const cardElement = card.createCard();
      cardList.addItem(cardElement);
    },
  },
  cardsSection
);
cardList.renderItems();

const popupAddUser = new PopupWithForm(".popup_add_user", {
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
  },
});
popupAddUser.setEventListeners();

const userInfo = new UserInfo(nameInputValue, jobInputValue);

function openPopupAddUser() {
  popupAddUser.openPopup();
  const { profileName, job } = userInfo.getUserInfo();
  nameInput.value = profileName;
  jobInput.value = job;
  formValidators["form_add_user"].resetValidation();
}
popupOpenButtonElementAddUser.addEventListener("click", openPopupAddUser);

const popupAddCard = new PopupWithForm(".popup_add_card", {
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
popupAddCard.setEventListeners();

function openPopupAddCard() {
  popupAddCard.openPopup();
  formValidators["form_add_card"].resetValidation();
}
popupOpenButtonElementAddCard.addEventListener("click", openPopupAddCard);

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
