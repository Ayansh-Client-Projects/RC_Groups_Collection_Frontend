class StoreApi {
  static USER_DATA_KEY = "user_data_key";
  static setUserData(data) {
    let finalData = {
      "token" : data.token,
      "mobileNumber":data.mobileNumber
    } 
    localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(finalData));
    
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

static removeToken(){
  localStorage.removeItem(this.USER_DATA_KEY)
}

}

export default StoreApi;
