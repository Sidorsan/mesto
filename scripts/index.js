const popupElementAddUser = document.querySelector(".popup_add_user");
const popupOpenButtonElementAddUser = document.querySelector(
  ".profile__edit-button"
);

const popupElementAddCard = document.querySelector(".popup_add_card"); 

const popupOpenButtonElementAddCard = document.querySelector(
  ".profile__add-button"
);

const popupElementBigPicture = document.querySelector(".popup_big_picture");
const elementImageBigPicture =
  popupElementBigPicture.querySelector(".popup__image");
const elementTitleBigPicture = popupElementBigPicture.querySelector(
  ".popup__title_big_picture"
);

const formElementAddUser = document.querySelector(".form_add_user");
const nameInput = formElementAddUser.querySelector(".form__input_meaning_name");
const jobInput = formElementAddUser.querySelector(".form__input_meaning_job");
const nameInputValue = document.querySelector(".profile__title");
const jobInputValue = document.querySelector(".profile__subtitle");

const itemTemplateContent = document.querySelector(".item-template").content;
const elementContainer = document.querySelector(".element__container"); 
const inputCardTitle = popupElementAddCard.querySelector(
  ".form__input_card_title"
);
const inputCardLink = popupElementAddCard.querySelector(
  ".form__input_card_link"
);

function openPopup(item) {
  item.classList.add("popup_opened");
}

function closePopup(item) {
  item.classList.remove("popup_opened");
}

function openPopupAddUser() {
  openPopup(popupElementAddUser);
  nameInput.value = nameInputValue.textContent;
  jobInput.value = jobInputValue.textContent;
  //setEventListenersPopupClose(popupElementAddUser);
  enableValidation();
}


function openPopupAddCard() {
  openPopup(popupElementAddCard);
  //setEventListenersPopupClose(popupElementAddCard);
  resetForm(popupElementAddCard);
}



function openPopupBigPicture() {
  openPopup(popupElementBigPicture);
  //setEventListenersPopupClose(popupElementBigPicture);
}


popupOpenButtonElementAddUser.addEventListener("click", openPopupAddUser);


popupOpenButtonElementAddCard.addEventListener("click", openPopupAddCard);


function resetForm(item) {
  item.querySelector(".form").reset();
  };
 

  const inputList1 = document.querySelectorAll(".popup"); 
  const popups = Array.from(inputList1);
  popups.forEach((inputList1) => { 
    inputList1.addEventListener('click', (evt) => { 
        // закрытие попапов по клику на оверлей 
        if (evt.target.classList.contains('popup_opened')) { 
            closePopup(inputList1) 
        } 
        // закрытие попапов на клику на крестик 
        if (evt.target.classList.contains('popup__close')) { 
            closePopup(inputList1)
        } 
    }) 
})  









/*
function setEventListenersPopupClose(itemElement) {
  const closePopupByClickOnOverlay = function (event) {
    if (event.target !== event.currentTarget) {
      return;
    }
    closePopup(itemElement);
  };
  itemElement.addEventListener("click", closePopupByClickOnOverlay);

  const closePopupKeyEscape = document.querySelector(".page");
  closePopupKeyEscape.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      closePopup(itemElement);
      evt.target.removeEventListener("keydown", closePopupKeyEscape);
    }
  });

  const closePopupButton = itemElement.querySelector(".popup__close");
  closePopupButton.addEventListener("click", handleOrSubmitPopupClose);
}
*/
function handleOrSubmitPopupClose(event) {
  const itemElement = event.target.closest(".popup");
  closePopup(itemElement);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  nameInputValue.textContent = nameInput.value;
  jobInputValue.textContent = jobInput.value;
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
  handleOrSubmitPopupClose(evt);
  resetForm(popupElementAddCard);
  
  const submitButtonAddCard = popupElementAddCard.querySelector(".popup__submit-button");
  submitButtonAddCard.classList.add("popup__submit-button_inactive");
  submitButtonAddCard.setAttribute("disabled", true);
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
