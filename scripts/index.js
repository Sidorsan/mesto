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

const popupElementBigPicture = document.querySelector(".popup_big_picture");
const popupCloseButtonElementBigPicture =
  popupElementBigPicture.querySelector(".popup__close");
let elementImageBigPicture =
  popupElementBigPicture.querySelector(".popup__image");
let elementTitleBigPicture = popupElementBigPicture.querySelector(
  ".popup__title_big_picture"
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

function PopupAddUser() {
  openPopup(popupElementAddUser);
  nameInput.value = nameInputValue.textContent;
  jobInput.value = jobInputValue.textContent;
}
function closePopupAddUser() {
  closePopap(popupElementAddUser);
}

function PopupAddCard() {
  openPopup(popupElementAddCard);
}
function closePopupAddCard() {
  closePopap(popupElementAddCard);
}

function openPopupBigPicture() {
  openPopup(popupElementBigPicture);
}
function closePopapBigPicture() {
  closePopap(popupElementBigPicture);
}

popupOpenButtonElementAddUser.addEventListener("click", PopupAddUser);
popupCloseButtonElelementAddUser.addEventListener("click", closePopupAddUser);

popupOpenButtonElementAddCard.addEventListener("click", PopupAddCard);
popupCloseButtonElelementAddCard.addEventListener("click", closePopupAddCard);

popupCloseButtonElementBigPicture.addEventListener(
  "click",
  closePopapBigPicture
);

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
  itemElement
    .querySelector(".element__image")
    .addEventListener("click", handleBigPicture);
}

function renderItem(item) {
  const itemElement = itemTemplateContent.cloneNode(true);
  const itemImage = itemElement.querySelector(".element__image");
  const elementTitle = itemElement.querySelector(".element__title");
  setEventListeners(itemElement);
  elementTitle.textContent = item.name;
  itemImage.src = item.link;
  itemImage.alt = item.name;
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

  const title = inputCardTitle.value;
  const link = inputCardLink.value;
  if (title != "" && link != "") {
    const newArray = [
      {
        name: title,
        link: link,
      },
    ];
    renderItems(newArray);
  }
  closePopupAddCard();
  inputCardTitle.value = "";
  inputCardLink.value = "";
}
popupElementAddCard.addEventListener("submit", handleSubmit);

function handleBigPicture(event) {
  const itemElement = event.target.closest(".element__item");
  const itemImage = itemElement.querySelector(".element__image").src;
  const itemTitle = itemElement.querySelector(".element__title").textContent;
  elementImageBigPicture.src = itemImage;
  elementImageBigPicture.alt = itemTitle;
  elementTitleBigPicture.textContent = itemTitle;
  openPopupBigPicture();
}