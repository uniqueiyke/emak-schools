export const isEmptyArray = array => {
    if (!Array.isArray(array)) {
        throw new TypeError('value must be array type')
    }
    return array.length <= 0;
}

export const isNotEmptyObject = object => {
    return object.constructor === Object && Object.keys(object).length >= 1; 
}

export const isEmptyObject = object => {
    return !isNotEmptyObject(object);
}

export const isEmptyString = str => {
    str = str.trim();
    return str.length <= 0;
}

export const isEmptyArrayOrObject = object => {
  if(object === null){
    return true;
  }
  if (Array.isArray(object)) {
    return object.length <= 0;
  }
  if (object.constructor === Object) {
    return Object.keys(object).length <= 0;
  }

  throw new TypeError('value must be a type array or object');
}

export const setPageTitle = title => {
  document.title = `Emak God's Own Schools | ${title}`;
}

export const formatPhoneNumber = (phoneNumber) => {
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

