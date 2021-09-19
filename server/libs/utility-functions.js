/**
 * This function verify a Nigerian mobile phone number
 * @param {string} phoneNumber 
 * @returns 
 */
exports.formatPhoneNumber = (phoneNumber) => {
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

/**
 * 
 * @param {object} object 
 * @returns 
 */
exports.isEmptyArrayOrObject = object => {
  if(object === null)
    return true;
  if (Array.isArray(object)) {
    return object.length <= 0;
  }
  if (object.constructor === Object) {
    return Object.keys(object).length <= 0;
  }

  throw new TypeError('value must be a type array or object');
}

/**
 * Returb the time elapse in hours between the current time and the time passed as argument
 * @param {string|number} time 
 * @returns 
 */
exports.getTimeElapse = time => {
  const signinTime = new Date(time);
  const currentTime = new Date();
  const deltaTime = currentTime.getTime() - signinTime.getTime();
  return Math.floor(deltaTime/1000); //Time elapse in seconds
}

exports.capitalizeFirstLetter = val =>{
  if (typeof val !== 'string') val = '';
  return val.charAt(0).toUpperCase() + val.substring(1).toLowerCase();
}