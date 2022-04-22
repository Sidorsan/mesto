export class UserInfo {
  constructor(nameSelector, jobSelector) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
  }
  getUserInfo() {
    const userInfo = {
      profileName: this._nameSelector.textContent,
      job: this._jobSelector.textContent,
    };
    return userInfo;
  }

  setUserInfo(formData) {
    this._nameSelector.textContent = formData.name;
    this._jobSelector.textContent = formData.description;
  }
}
