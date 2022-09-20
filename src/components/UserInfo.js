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
  setUserInfo({name = this._userName.textContent, description = this._userDescription.textContent, avatar = this._userAvatar.src}) {
    this._userName.textContent = name;
    this._userDescription.textContent = description;
    this._userAvatar.src = avatar;
  }
}



export { UserInfo };
