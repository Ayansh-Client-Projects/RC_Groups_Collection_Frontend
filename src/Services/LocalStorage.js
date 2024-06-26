class StoreApi {
  static USER_DATA_KEY = "user_data_key";
  static setUserData(data) {
    let finalData = {
      token: data.token,
      mobileNumber: data.mobileNumber,
    };
    localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(finalData));
  }

  static getUserData() {
    let data = localStorage.getItem(this.USER_DATA_KEY);
    return JSON.parse(data);
  }

  static getToken() {
    try {
      let data = this.getUserData();
      return data.token;
    } catch (e) {
      return "";
    }
  }
  static getDealers() {
    let data = this.getUserData();
    return data.dealers;
  }

  static getMobileNumber() {
    let phnnum = localStorage.getItem("userPhoneNum");
    return phnnum;
  }

  static removeToken() {
    localStorage.removeItem(this.USER_DATA_KEY);
    localStorage.removeItem("userPhoneNum");
  }
}

export default StoreApi;
