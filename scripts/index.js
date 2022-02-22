const popupElementAddUser = document.querySelector(".popup_add_user");
const popupCloseButtonElelementAddUser = popupElementAddUser.querySelector(".popup__close_add_user");
const popupOpenButtonElementAddUser = document.querySelector(".profile__edit-button");


let formElementAddUser = document.querySelector(".popup__form_add_user"); 
let nameInput = formElementAddUser.querySelector(".popup__input_meaning_name"); 
let jobInput = formElementAddUser.querySelector(".popup__input_meaning_job"); 
let nameInputValue = document.querySelector(".profile__title");
let jobInputValue = document.querySelector(".profile__subtitle");

const openPopupAddUser = function () {
  popupElementAddUser.classList.add("popup_opened");
  nameInput.value = nameInputValue.textContent;
  jobInput.value = jobInputValue.textContent;
};

const closePopupAddUser = function () {
  popupElementAddUser.classList.remove("popup_opened");
};

popupOpenButtonElementAddUser.addEventListener("click", openPopupAddUser);
popupCloseButtonElelementAddUser.addEventListener("click", closePopupAddUser);

function formSubmitHandler(evt) {
  evt.preventDefault(); 
  nameInputValue.textContent = nameInput.value;
  jobInputValue.textContent = jobInput.value;
  closePopupAddUser();
}

formElementAddUser.addEventListener("submit", formSubmitHandler);
