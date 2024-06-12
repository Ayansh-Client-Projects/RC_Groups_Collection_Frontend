class ApiServices{
    static  BASE_URL = "http://localhost:4042" ;

    static LOGIN_URL = `${ApiServices.BASE_URL}/rc-group/salesman/login`
    static SEND_MSG = `${ApiServices.BASE_URL}/rc-group/salesman/sendMessage`
    static VRF_OTP = `${ApiServices.BASE_URL}/rc-group/salesman/verifyOtp`
}

export default ApiServices