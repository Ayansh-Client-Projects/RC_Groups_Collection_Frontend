class Validation {
  static validateUserName(username) {
    const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
    if (usernameRegex.test(username)) {
      return {
        valid: true,
        message: "Username is valid.",
      };
    } else {
      return {
        valid: false,
        message:
          "Username must be 3-20 characters long and can only contain letters, numbers, underscores, and hyphens.",
      };
    }
  }

  static validatePhnNum(phoneNumber) {
    const phoneNumberRegex = /^[6-9]\d{9}$/;
    if (phoneNumberRegex.test(phoneNumber)) {
      return {
        valid: true,
        message: "Phone number is valid.",
      };
    } else {
      return {
        valid: false,
        message:
          "Phone number must be a 10-digit number starting with 6, 7, 8, or 9.",
      };
    }
  }

  static validatePassword(password) {
    const passwordRegex = /^.{3,}$/;
    if (passwordRegex.test(password)) {
      return {
        valid: true,
        message: "Password is valid.",
      };
    } else {
      return {
        valid: false,
        message: "Password must be at least 3 characters long.",
      };
    }
  }

  static signUpValidation(user, mobile, password) {
    let result1 = this.validateUserName(user);
    if (result1.valid == false) {
      return result1;
    }
    let result2 = this.validatePhnNum(mobile);
    if (result2.valid == false) {
      return result2;
    }
    let result3 = this.validatePassword(password);
    if (result3.valid == false) {
      return result3;
    }
    return { valid: true, message: " Valid User" };
  }

  static signInValidation(mobile, password) {
    let result1 = this.validatePhnNum(mobile);
    if (result1.valid == false) {
      return result1;
    }
    let result2 = this.validatePassword(password);
    if (result2.valid == false) {
      return result2;
    }
    return { valid: true, message: " Valid User" };
  }

  static validateInvoiceNumber(invoiceNumber) {
    
    if (invoiceNumber!="" && invoiceNumber.length>=4) {
      return {
        valid: true,
        message: "Invoice number is valid.",
      };
    } else {
      return {
        valid: false,
        message:
          "Invoice number must like INV-12345 ",
      };
    }
  }

  static validateAmount(amount) {
    const amountRegex = /^[0-9]+(\.[0-9]+)?$/;
    if (amountRegex.test(amount)) {
      return {
        valid: true,
        message: "Amount is valid.",
      };
    } else {
      return {
        valid: false,
        message: "Amount must be a valid number.",
      };
    }
  }

  static validateOTP(otp) {
    const otpRegex = /^\d{6}$/;
    if (otpRegex.test(otp)) {
      return {
        valid: true,
        message: "OTP is valid.",
      };
    } else {
      return {
        valid: false,
        message: "OTP must be exactly 6 digits.",
      };
    }
  }

  static verifyOtp(otp) {
    let result = this.validateOTP(otp);

    return result;
  }

  static validateDate(date) {
    // Regular expression to match YYYY-MM-DD format
    const dateRegex = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    if (!dateRegex.test(date)) {
      return {
        valid: false,
        message: "Date must be in YYYY-MM-DD format.",
      };
    }

    const [year, month, day] = date.split("-").map(Number);

    const isValidDay = (year, month, day) => {
      const isLeapYear =
        (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

      const daysInMonth = [
        31,
        isLeapYear ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
      ];

      return day <= daysInMonth[month - 1];
    };

    if (!isValidDay(year, month, day)) {
      return {
        valid: false,
        message: "Invalid day for the given month and year.",
      };
    }

    return {
      valid: true,
      message: "Date is valid.",
    };
  }

  static validateUpiId(UpiId) {
    
    if (UpiId != "" && UpiId.length>=9 ) {
      return {
        valid: true,
        message: "UpiId is valid.",
      };
    } else {
      return {
        valid: false,
        message: "Invalid Upi id  ",
      };
    }
  }
  static validateChequeNumber(ChequeNumber) {
    const ChequeNumberRegex = /^[a-zA-Z0-9-_]{5,15}$/;
    if (ChequeNumberRegex.test(ChequeNumber)) {
      return {
        valid: true,
        message: "Cheque number is valid.",
      };
    } else {
      return {
        valid: false,
        message:
          "Cheque number must be 5-15 characters long and can only contain letters, numbers, dashes, and underscores.",
      };
    }
  }
  static validateBankName(BankName) {
    if (BankName != "" && BankName.length>0 ) {
      return {
        valid: true,
        message: "BankName is valid",
      };
    } else {
      return {
        valid: false,
        message: " Invalid BankName",
      };
    }
  }

  static validateCheque(ChequeNumber, BankName, Date) {
    let result1 = this.validateChequeNumber(ChequeNumber);
    if (result1.valid == false) {
      return result1;
    }
    let result2 = this.validateBankName(BankName);
    if (result2.valid == false) {
      return result2;
    }
    let result3 = this.validateDate(Date);
    if (result3.valid == false) {
      return result2;
    } else {
      return {
        valid: true,
        message: "Valid Information",
      };
    }
  }

  static validateDealerId(dealerId) {
    const dealerIdRegex = /^[a-fA-F0-9]{24}$/;
    if (dealerIdRegex.test(dealerId)) {
      return {
        valid: true,
        message: "Dealer ID is valid.",
      };
    } else {
      return {
        valid: false,
        message: "Invalid Dealer ID.",
      };
    }
  }

  static validateForm(
    invoiceNumber,
    amount,
    payment,
    invdate,
    cheqdate,
    bankname,
    chequenum,
    upiid,
    retailer
  ) {
    let result1 = this.validateInvoiceNumber(invoiceNumber);
    if (result1.valid == false) {
      return result1;
    }
    let result2 = this.validateAmount(amount);
    if (result2.valid == false) {
      return result2;
    }

    let result3 = this.validateDate(invdate);
    if (result3.valid == false) {
      return result3;
    }

    if (payment.toLowerCase() == "online") {
      let result1 = this.validateUpiId(upiid);
      if (result1.valid == false) {
        return result1;
      }
    }
    if (payment.toLowerCase() == "cheque") {
      let result1 = this.validateCheque(chequenum, bankname, cheqdate);
      if (result1.valid == false) {
        return result1;
      }
    }
    let result4 = this.validateDealerId(retailer);
    if (result4.valid == false) {
      return result4;
    }

    return {
      valid: true,
      message: "Valid Information",
    };
  }

  static validatePaymentStatus(paymentStatus) {
    const validStatuses = ["sent", "pending", "failed"];
    if (validStatuses.includes(paymentStatus)) {
        return {
            valid: true,
            message: "Payment status is valid.",
        };
    } else {
        return {
            valid: false,
            message: `Payment status must be one of the following: ${validStatuses.join(", ")}.`,
        };
    }
}
static validateOTPVerificationStatus(otpStatus) {
  const validStatuses = ["true", "false"];
  if (validStatuses.includes(otpStatus.toString())) {
      return {
          valid: true,
          message: "OTP verification status is valid.",
      };
  } else {
      return {
          valid: false,
          message: `OTP verification status must be one of the following: ${validStatuses.join(", ")}.`,
      };
  }
}



  static validateFilter(status,otpVerification,toDate,fromDate){

    let result1 = this.validatePaymentStatus(status);
    if (result1.valid == false) {
      return result1;
    }
    let result2 = this.validateOTPVerificationStatus(otpVerification);
    if (result2.valid == false) {
      return result2;
    }
    let result3 = this.validateDate(toDate);
    if (result3.valid == false) {
      return result3;
    }
    let result4 = this.validateDate(fromDate);
    if (result4.valid == false) {
      return result4;
    }

    return {
      valid: true,
      message: "Valid Information",
    };
    
  }
}
export default Validation;
