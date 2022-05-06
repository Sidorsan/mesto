// import "../pages/index.css"; раскоментировать
import { Card, initialCards } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";
import Section from "../scripts/Section.js";
// import Popup from "../scripts/Popup.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import { UserInfo } from "../scripts/UserInfo.js";
import {
  settings,
  nameInput,
  jobInput,
  avatar,
  popupOpenButtonElementAddUser,
  nameInputValue,
  jobInputValue,
  popupOpenButtonElementAddCard,
  cardsSection,
} from "../scripts/utils/constants.js";

import { Api } from "../scripts/Api.js";
import PopupWithSubmit from "../scripts/PopupWithSubmit .js";
// import { data } from "autoprefixer";

const apiUser = new Api({
  baseUrl: "https://nomoreparties.co/v1/cohort-40/users/me ",
  headers: {
    authorization: "ce53d5da-a469-4e90-8116-8784a96c30a0",
    "Content-Type": "application/json",
  },
});

const apiCards = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-40/cards",
  headers: {
    authorization: "ce53d5da-a469-4e90-8116-8784a96c30a0",
    "Content-Type": "application/json",
  },
});

const deleteCard = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-40/cards/cardId",
  headers: {
    authorization: "ce53d5da-a469-4e90-8116-8784a96c30a0",
    "Content-Type": "application/json",
  },
});



const creatUser = apiUser.getInitial();
creatUser
  .then((data) => {
    nameInputValue.textContent = data.name;
    jobInputValue.textContent = data.about;
    nameInputValue.id = data._id;
    avatar.src = data.avatar;
  })
  .catch((err) => alert(err));

const popupAddUser = new PopupWithForm(".popup_add_user", {
  handleFormSubmit: (formData) => {
    apiUser
      .patchUser(formData)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch((err) => alert(err));
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

const rendererCard = (data) => {
  const cardList = new Section(
    {
      items: data,
      renderer: (item) => {
        const card = new Card(
          {
            item,
            handleCardClick: () => {
              popupWithImage.openPopup(item);
            },
            handleDeleteIconClick: () => {
              popupWihtSubmitDeleteCard.openPopup();
            },
            nameInputValue,
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
};

const createApiCards = apiCards.getInitial();
createApiCards
  .then((data) => {
    rendererCard(data);
  })
  .catch((err) => alert(err));

const popupAddCard = new PopupWithForm(".popup_add_card", {
  handleFormSubmit: (formData) => {
    const newCard = {
      name: formData.title,
      link: formData.link,
    };

    // cardList.renderItem(newArray);
    const postCardApi = apiCards.postInitialCards(newCard);
    postCardApi
      .then((data) => {
        rendererCard([data]);
      })
      .catch((err) => alert(err));
  },
});
popupAddCard.setEventListeners();

const popupWithImage = new PopupWithImage(".popup_big_picture");
popupWithImage.setEventListeners();





const popupWihtSubmitDeleteCard = new PopupWithSubmit(".popap__deleteCard",
{  handleFormSubmit: (data) => {
    deleteCard
      .deleteCard(data)
      .then((data) => {
        console.log(data);;
      })
      .catch((err) => alert(err));
  },
}
);
popupWihtSubmitDeleteCard.setEventListeners();

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
