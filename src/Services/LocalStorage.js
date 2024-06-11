class StoreApi {
  static USER_DATA_KEY = "user_data_key";
  static setUserData(data) {
    localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(data));
  }

  static getUserData() {
    let data = localStorage.getItem(this.USER_DATA_KEY);
    return JSON.parse(data)
  }

  static getToken(){
    let data = this.getUserData()
    return data.token 
  }
  static getDealers(){
    let data = this.getUserData()
    return data.dealers
  }
 
  static getMobileNumber(){
    let data = this.getUserData()
    return data.mobileNumber
  }
}

export default StoreApi;
