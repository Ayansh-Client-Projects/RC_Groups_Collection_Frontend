class ApiServices {
  
  // static BASE_URL = "http://localhost:4042";
  static BASE_URL = "https://uk7lfdwcuj.execute-api.ap-south-1.amazonaws.com/dev";


  static LOGIN_URL = `${ApiServices.BASE_URL}/rc-group/salesman/login`;
  static SEND_MSG = `${ApiServices.BASE_URL}/rc-group/salesman/sendMessage`;
  static ADD_DEALER_TO_SALESAMN = `${ApiServices.BASE_URL}/rc-group/salesman/get-dealers`;
  static VRF_OTP = `${ApiServices.BASE_URL}/rc-group/salesman/verifyOtp`;
  static RESEND_OTP = `${ApiServices.BASE_URL}/rc-group/salesman/resendOtp`;
  static GETALLTRANSACTIONS  = `${ApiServices.BASE_URL}/rc-group/salesman/get-previous-transactions` 
}

export default ApiServices;
