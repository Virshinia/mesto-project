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
  setUserInfo({name, about, avatar}) {
    this._userName.textContent = name;
    this._userDescription.textContent = about;
    this._userAvatar.src = avatar;
  }
}



export { UserInfo };
