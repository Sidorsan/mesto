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
//const popupCloseButtonElelementAddUser = popupElementAddUser.querySelector(".popup__close");
const popupOpenButtonElementAddUser = document.querySelector(
  ".profile__edit-button"
);

const popupElementAddCard = document.querySelector(".popup_add_card"); //formElement
//const popupCloseButtonElelementAddCard = popupElementAddCard.querySelector(".popup__close");
const popupOpenButtonElementAddCard = document.querySelector(
  ".profile__add-button"
);

const popupElementBigPicture = document.querySelector(".popup__big_picture");
//const popupCloseButtonElementBigPicture = popupElementBigPicture.querySelector(".popup__close");
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

function closePopup(item) {item.classList.remove("popup_opened");};

 

function openPopupAddUser() {
  openPopup(popupElementAddUser);
  
  nameInput.value = nameInputValue.textContent;
  jobInput.value = jobInputValue.textContent;
  setEventListenersPopup(popupElementAddUser);
}
/*
function closePopupAddUser() {
  closePopup(popupElementAddUser);

 }
*/

function openPopupAddCard() {
  openPopup(popupElementAddCard);
  setEventListenersPopup(popupElementAddCard);
}
/*
function closePopupAddCard() {
  closePopup(popupElementAddCard);
 // document.querySelector(".popup__form_add_card").reset();
  
}
*/

function openPopupBigPicture() {
  openPopup(popupElementBigPicture);
  setEventListenersPopup(popupElementBigPicture);
}
/*
function closePopupBigPicture() {
  closePopup(popupElementBigPicture);
}
*/

popupOpenButtonElementAddUser.addEventListener("click", openPopupAddUser);
//popupCloseButtonElelementAddUser.addEventListener("click", closePopupAddUser);


popupOpenButtonElementAddCard.addEventListener("click", openPopupAddCard);
//popupCloseButtonElelementAddCard.addEventListener("click", closePopupAddCard);

//popupCloseButtonElementBigPicture.addEventListener(  "click",  closePopupBigPicture);

function resetErrorValidate (itemElement) {
  errorElement.textContent = "";
    errorElement.classList.remove('popup__input-error_active');
    inputElement.classList.remove('popup__input_type_error');
}




function setEventListenersPopup(itemElement) {
  const closePopupByClickOnOverlay = function (event) {
    if (event.target !== event.currentTarget) {
      return;
    } 
      closePopup(itemElement);
    }


  itemElement.addEventListener('click', closePopupByClickOnOverlay);
  
  document.addEventListener('keydown', function(evt) {
    if (evt.key === 'Escape') {
      closePopup(itemElement);
    }
  })
  const popupCloseButton = itemElement.querySelector('.popup__close')
  popupCloseButton.addEventListener('click', handleOrSubmitPopupClose);

  //const arrayInput = Array.from(popupElementAddUser.querySelectorAll(popup__input))
  
  
  const resetErrorValidate = function (inputElement) {
    return inputElement.closest('.popap__form_section')
    .querySelector('.popup__input-error');
  }

}

function handleOrSubmitPopupClose(event) {
  const itemElement = event.target.closest(".popup");
  closePopup(itemElement);
}
 

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameInputValue.textContent = nameInput.value;
  jobInputValue.textContent = jobInput.value;
  //closePopupAddUser();
  handleOrSubmitPopupClose(evt);
}

formElementAddUser.addEventListener("submit", handleProfileFormSubmit);

function setEventListenersCardElement(itemElement) {
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
  setEventListenersCardElement(cardElement);
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
 
    const newArray = [
      {
        name: title,
        link: link,
      },
    ];
    renderItems(newArray);
  
 // closePopupAddCard();
 handleOrSubmitPopupClose(evt);
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
