const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const popupElementAddUser = document.querySelector(".popup_add_user");
const popupCloseButtonElelementAddUser =
  popupElementAddUser.querySelector(".popup__close");
const popupOpenButtonElementAddUser = document.querySelector(
  ".profile__edit-button"
);

const popupElementAddCard = document.querySelector(".popup_add_card"); //formElement
const popupCloseButtonElelementAddCard =
  popupElementAddCard.querySelector(".popup__close");
const popupOpenButtonElementAddCard = document.querySelector(
  ".profile__add-button"
);

let formElementAddUser = document.querySelector(".popup__form_add_user");
let nameInput = formElementAddUser.querySelector(".popup__input_meaning_name");
let jobInput = formElementAddUser.querySelector(".popup__input_meaning_job");
let nameInputValue = document.querySelector(".profile__title");
let jobInputValue = document.querySelector(".profile__subtitle");

const itemTemplateContent = document.querySelector(".item-template").content;
const elementContainer = document.querySelector(".element__container"); // listElement
const inputCardTitle = popupElementAddCard.querySelector(
  ".popup__input_card_title"
);
const inputCardLink = popupElementAddCard.querySelector(
  ".popup__input_card_link"
);

function openPopup(item) {
  item.classList.add("popup_opened");
}

function closePopap(item) {
  item.classList.remove("popup_opened");
}

const PopupAddUser = function () {
  openPopup(popupElementAddUser);
  nameInput.value = nameInputValue.textContent;
  jobInput.value = jobInputValue.textContent;
};

const closePopupAddUser = function () {
  closePopap(popupElementAddUser);
};


const PopupAddCard = function () {
  openPopup(popupElementAddCard);
};

const closePopupAddCard = function () {
  closePopap(popupElementAddCard);
};

popupOpenButtonElementAddUser.addEventListener("click", PopupAddUser);
popupCloseButtonElelementAddUser.addEventListener("click", closePopupAddUser);

popupOpenButtonElementAddCard.addEventListener("click", PopupAddCard);
popupCloseButtonElelementAddCard.addEventListener("click", closePopupAddCard);

function formSubmitHandlerAddUser(evt) {
  evt.preventDefault();
  nameInputValue.textContent = nameInput.value;
  jobInputValue.textContent = jobInput.value;
  closePopupAddUser();
}

formElementAddUser.addEventListener("submit", formSubmitHandlerAddUser);

function setEventListeners(itemElement) {
  itemElement
    .querySelector(".element__delete")
    .addEventListener("click", handleDelete);
  itemElement
    .querySelector(".element__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__like_active");
    });
}

function renderItem(item) {
  const itemElement = itemTemplateContent.cloneNode(true);
  const itemImage = itemElement.querySelector(".element__image");
  const elementTitle = itemElement.querySelector(".element__title");

  setEventListeners(itemElement);

  elementTitle.textContent = item.name;
  itemImage.src = item.link;
  elementContainer.prepend(itemElement);
}

function renderItems(items) {
  items.forEach(renderItem);
}
renderItems(initialCards);

function handleDelete(event) {
  const itemElement = event.target.closest(".element__item");
  itemElement.remove();
}

function handleSubmit(evt) {
  evt.preventDefault();
  /*
  const itemElement = itemTemplateContent.cloneNode(true);
  const itemImage = itemElement.querySelector(".element__image");
  const elementTitle = itemElement.querySelector(".element__title");
  elementTitle.textContent = inputCardTitle.value;
  itemImage.src = inputCardLink.value;
  setEventListeners(itemElement);
  elementContainer.prepend(itemElement);
  */

  const name = inputCardTitle.value;
  const link = inputCardLink.value;
  const newArray = [
    {
      name: name,
      link: link,
    },
  ];
  renderItems(newArray);
  closePopupAddCard()
  inputCardTitle.value = '';
  inputCardLink.value = '';

}
popupElementAddCard.addEventListener("submit", handleSubmit);
