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
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    if (passwordRegex.test(password)) {
      return {
        valid: true,
        message: "Password is valid.",
      };
    } else {
      return {
        valid: false,
        message:
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one special character.",
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

  static validateForm(invoiceNumber, amount) {
    let result1 = this.validateInvoiceNumber(invoiceNumber);
    if (result1.valid == false) {
      return result1;
    }
    let result2 = this.validateAmount(amount);
    if (result2 == false) {
      return result2;
    } else {
      return {
        valid: true,
        message: "Valid Information",
      };
    }
  }
}
export default Validation;
