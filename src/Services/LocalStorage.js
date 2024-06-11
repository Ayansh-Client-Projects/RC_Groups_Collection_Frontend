class StoreApi {
static USER_DATA_KEY = "user_data_key"
    static setUserData(data){
        localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(data));

    }
}

export default StoreApi