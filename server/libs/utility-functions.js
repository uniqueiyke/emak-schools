module.exports.formatPhoneNumber = (phoneNumber) => {
    const phRegex1 = /^\+\d{13}$/; //test for numbers with international code
    const phRegex2 = /^\d{11}$/; //test for numbers in local format
    const wsRegex = /\s/g; //remove all white spaces
    let noWhiteSpaceNum = phoneNumber.replace(wsRegex, '');
    if (noWhiteSpaceNum.length > 11 && noWhiteSpaceNum.length < 14 && !noWhiteSpaceNum.startsWith('+', 0)) {
      noWhiteSpaceNum = `+${noWhiteSpaceNum}`;
    }
  
    if (phRegex1.test(noWhiteSpaceNum) || phRegex2.test(noWhiteSpaceNum)) {
      return noWhiteSpaceNum
    }
    return '';
  }