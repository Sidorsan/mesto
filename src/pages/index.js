// import "../pages/index.css"; раскоментировать
import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js";
import Section from "../scripts/Section.js";

import PopupWithForm from "../scripts/PopupWithForm.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import { UserInfo } from "../scripts/UserInfo.js";
import {
  settings,
  nameInput,
  jobInput,
  avatar,
  popupOpenButtonElementAvatarEditor,
  popupOpenButtonElementAddUser,
  nameInputValue,
  jobInputValue,
  popupOpenButtonElementAddCard,
  cardsSection,
 } from "../scripts/utils/constants.js";

import { Api } from "../scripts/Api.js";
import PopupWithSubmit from "../scripts/PopupWithSubmit .js";

const api = new Api({
  baseUrl: "nomoreparties.co/v1/cohort-40",
  headers: {
    authorization: "ce53d5da-a469-4e90-8116-8784a96c30a0",
    "Content-Type": "application/json",
  },
});


// const apiCards = new Api({
//   baseUrl: "https://mesto.nomoreparties.co/v1/cohort-40/cards",
//   headers: {
//     authorization: "ce53d5da-a469-4e90-8116-8784a96c30a0",
//     "Content-Type": "application/json",
//   },
// });

// const apiAvatar = new Api({
//   baseUrl: "https://mesto.nomoreparties.co/v1/cohort-40/users/me/avatar",
//   headers: {
//     authorization: "ce53d5da-a469-4e90-8116-8784a96c30a0",
//     "Content-Type": "application/json",
//   },
// });
const userInfo = new UserInfo(nameInputValue, jobInputValue, avatar);


api.getAllNeededData()
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData)
    // rendererCard(cards);
      // тут установка данных пользователя
      // и тут отрисовка карточек
cardList.renderItem(cards)
      
  })
  .catch((err) => alert(err));

// const creatUser = api.getInitialUser();
// creatUser
//   .then((data) => {
//     nameInputValue.textContent = data.name;
//     jobInputValue.textContent = data.about;
//     nameInputValue.id = data._id;
//     avatar.src = data.avatar;
//   })
//   .catch((err) => alert(err));

const popupAddUser = new PopupWithForm(".popup_add_user", {
  handleFormSubmit: (formData) => {
    popupAddUser.renderLoading(true);
    api
      .patchUser(formData)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch((err) => alert(err))
      .finally(() => {
        popupAddUser.renderLoading(false);
     });
  },
});
popupAddUser.setEventListeners();



function openPopupAddUser() {
  popupAddUser.openPopup();
  const { profileName, job } = userInfo.getUserInfo();
  nameInput.value = profileName;
  jobInput.value = job;
  formValidators["form_add_user"].resetValidation();
}
popupOpenButtonElementAddUser.addEventListener("click", openPopupAddUser);



const popupAvatarEditor = new PopupWithForm(".popup_editor_photo", {
  handleFormSubmit: (formData) => {
    popupAvatarEditor.renderLoading(true);
    const patchAvatar = api.patchAvatar(formData);
    patchAvatar
      .then((data) => {
        userInfo.setUserInfo(data)
      })
      .catch((err) => alert(err))
      .finally(() => {
        popupAvatarEditor.renderLoading(false);
     });
  },
});
popupAvatarEditor.setEventListeners();

function openPopupAvatarEditor() {
  popupAvatarEditor.openPopup();
  formValidators["form_editor_photo"].resetValidation();
}
popupOpenButtonElementAvatarEditor.addEventListener(
  "click",
  openPopupAvatarEditor
);

// const rendererCard = (data) => {
//   const cardList = new Section(
//     {
//       items: data,
//       renderer: (item) => {
//         const card = new Card(
//           {
//             item,
//             handleCardClick: () => {
//               popupWithImage.openPopup(item);
//             },
//             handleDeleteIconClick: () => {
//               popupWihtSubmitDeleteCard.openPopup(item);
//             },
//             nameInputValue,
//             api,
//           },

//           ".item-template"
//         );

//         const cardElement = card.createCard();
//         cardList.addItem(cardElement);
//       },
//     },
//     cardsSection
//   );
//   cardList.renderItems();
// };

const cardList = new Section(
  {items: [], renderer: rendererCard}, cardsSection
)
cardList.renderItems()



function createCard(item) {
    const card = new Card(
          {
            item,
            handleCardClick: () => {
              popupWithImage.openPopup(item);
            },
            handleDeleteIconClick: () => {
              popupWihtSubmitDeleteCard.openPopup(item);
            },
            nameInputValue,
            api,
          },

          ".item-template"
        );

        const cardElement = card.createCard();
       return cardElement
}

function rendererCard(cardData) {
  const cardElement = createCard(cardData);
  cardList.addItem(cardElement)
}





// const createApiCards = api.getInitialCard();
// createApiCards
//   .then((data) => {
//     rendererCard(data);
//   })
//   .catch((err) => alert(err));

const popupAddCard = new PopupWithForm(".popup_add_card", {
  handleFormSubmit: (formData) => {
    popupAddCard.renderLoading(true);
    const newCard = {
      name: formData.title,
      link: formData.link,
    };

    const postCardApi = api.postInitialCards(newCard);
    postCardApi
      .then((data) => {
        rendererCard([data]);
      })
      .catch((err) => alert(err))
      .finally(() => {
        popupAddCard.renderLoading(false);
     });
  },
});
popupAddCard.setEventListeners();

const popupWithImage = new PopupWithImage(".popup_big_picture");
popupWithImage.setEventListeners();

const popupWihtSubmitDeleteCard = new PopupWithSubmit(
  ".popup_deleteCard",
  {
    handleFormSubmit: (data) => {
      api
        .deleteCard(data)
        .then(() => {
          const el = document.getElementById(data);
          el.remove();
        })
        .catch((err) => alert(err));
    },
  },
  api
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
