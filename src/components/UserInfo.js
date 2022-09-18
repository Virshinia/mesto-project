import {
  profileAvatarSelector,
  profileDescriptionSelector,
  profileNameSelector,
} from "../utils/constants";

class UserInfo {
  constructor(userName, userDescription, userAvatar) {
    this._userName = userName;
    this._userDescription = userDescription;
    this._userAvatar = userAvatar;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      description: this._userDescription.textContent,
      avatar: this._userAvatar.src,
    };
  }
  setUserInfo({ name, description, avatar }) {
    this._userName.textContent = name;
    this._userDescription.textContent = description;
    this._userAvatar.src = avatar;
  }
}

const myUserInfo = new UserInfo(
  profileNameSelector,
  profileDescriptionSelector,
  profileAvatarSelector
);

export { UserInfo, myUserInfo };