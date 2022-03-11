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
const elementImageBigPicture =
  popupElementBigPicture.querySelector(".popup__image");
const elementTitleBigPicture = popupElementBigPicture.querySelector(
  ".popup__title_big_picture"
);

const formElementAddUser = document.querySelector(".popup__form_add_user");
const nameInput = formElementAddUser.querySelector(
  ".popup__input_meaning_name"
);
const jobInput = formElementAddUser.querySelector(".popup__input_meaning_job");
const nameInputValue = document.querySelector(".profile__title");
const jobInputValue = document.querySelector(".profile__subtitle");

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

function openPopupAddUser() {
  openPopup(popupElementAddUser);
  nameInput.value = nameInputValue.textContent;
  jobInput.value = jobInputValue.textContent;
}

function closePopupAddUser() {
  closePopap(popupElementAddUser);
  
}

function openPopupAddCard() {
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

popupOpenButtonElementAddUser.addEventListener("click", openPopupAddUser);
popupCloseButtonElelementAddUser.addEventListener("click", closePopupAddUser);

popupOpenButtonElementAddCard.addEventListener("click", openPopupAddCard);
popupCloseButtonElelementAddCard.addEventListener("click", closePopupAddCard);

popupCloseButtonElementBigPicture.addEventListener(
  "click",
  closePopapBigPicture
);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameInputValue.textContent = nameInput.value;
  jobInputValue.textContent = jobInput.value;
  closePopupAddUser();
}

formElementAddUser.addEventListener("submit", handleProfileFormSubmit);

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

function createCard(item) {
  const cardElement = itemTemplateContent.cloneNode(true);
  const itemImage = cardElement.querySelector(".element__image");
  const elementTitle = cardElement.querySelector(".element__title");
  setEventListeners(cardElement);
  elementTitle.textContent = item.name;
  itemImage.src = item.link;
  itemImage.alt = item.name;
  return cardElement;
}

function renderItem(item) {
  const itemElement = createCard(item);
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

function handleCardFormSubmit(evt) {
  evt.preventDefault();
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
  document.querySelector(".popup__form_add_card").reset();
}

popupElementAddCard.addEventListener("submit", handleCardFormSubmit);

function handleBigPicture(event) {
  const itemImage = event.target.src;
  const itemTitle = event.target.alt;
  elementImageBigPicture.src = itemImage;
  elementImageBigPicture.alt = itemTitle;
  elementTitleBigPicture.textContent = itemTitle;
  openPopupBigPicture();
}
