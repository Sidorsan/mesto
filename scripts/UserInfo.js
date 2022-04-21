const nameInputValue = document.querySelector(".profile__title");
const jobInputValue = document.querySelector(".profile__subtitle");

export class UserInfo {
  constructor(nameSelector, jobSelector) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
  }
  getUserInfo() {
    this._nameSelector.value = nameInputValue.textContent;
    this._jobSelector.value = jobInputValue.textContent;
  }
  setUserInfo() {
    nameInputValue.textContent = this._nameSelector.value;
    jobInputValue.textContent = this._jobSelector.value;
  }
}
