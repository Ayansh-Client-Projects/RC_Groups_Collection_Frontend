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
    const invoiceNumberRegex = /^[a-zA-Z0-9-_]{5,15}$/;
    if (invoiceNumberRegex.test(invoiceNumber)) {
      return {
        valid: true,
        message: "Invoice number is valid.",
      };
    } else {
      return {
        valid: false,
        message:
          "Invoice number must be 5-15 characters long and can only contain letters, numbers, dashes, and underscores. EX: INV-12345 ",
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
    const otpRegex = /^\d{4}$/;
    if (otpRegex.test(otp)) {
      return {
        valid: true,
        message: "OTP is valid.",
      };
    } else {
      return {
        valid: false,
        message: "OTP must be exactly 4 digits.",
      };
    }
  }

  static verifyOtp(otp) {
    let result = this.validateOTP(otp);

    return result;
  }

  static validateDate(date) {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4})$/;

    if (!dateRegex.test(date)) {
      return {
        valid: false,
        message: "Date must be in DD-MM-YYYY format.",
      };
    }

    const [day, month, year] = date.split("-").map(Number);

    const isValidDay = (day, month, year) => {
      if (month === 2) {
        const isLeapYear =
          (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        if (isLeapYear) {
          return day <= 29;
        } else {
          return day <= 28;
        }
      }

      const monthsWith30Days = [4, 6, 9, 11];
      if (monthsWith30Days.includes(month)) {
        return day <= 30;
      }

      return day <= 31;
    };

    if (!isValidDay(day, month, year)) {
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
    const UpiIdRegex = /^[a-zA-Z0-9-_]{5,50}$/;
    if (UpiIdRegex.test(UpiId)) {
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
    const BankNameRegex = /^[a-zA-Z0-9-_]{3,15}$/;
    if (BankNameRegex.test(BankName)) {
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

    if (payment.toLowerCase() == "upi") {
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
}
export default Validation;
