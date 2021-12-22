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
  if (object === null) {
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
  document.title = title ? `Emak God's Own Schools | ${title}` : "Emak God's Own Schools";
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

export const isValidDate = date => {
  if(date === '' || date === 0 || typeof(date) === 'number' || date === null){
    return false;
  }
  const d = new Date(date);
  return (Object.prototype.toString.call(d) === "[object Date]" && !isNaN(d.getTime()));
}

export const formatDate = date => {
  const fDate = new Date(date);
  const y = fDate.getFullYear();
  const m = `${fDate.getMonth() + 1}`.padStart(2, '0');
  const d = `${fDate.getDate()}`.padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export const formatDatePrint = date => {
  if(!isValidDate(date)){
    return date;
  }
  const d = new Date(date);
  return d.toDateString();
}

export const parseInputValue = inputVal => {
  if(inputVal === null || inputVal === undefined || inputVal === 'undefined'){
    return '';
  }
  return isValidDate(inputVal) ? formatDate(inputVal) : inputVal;
}

export const alertMessageParser = (msg) => {
  if(typeof(msg) === 'string'){
      return msg;
  }
  if(!isEmptyArrayOrObject(msg)){
      const keys = Object.keys(msg);
      let m = '';
      for (const key of keys) {
          m = m + msg[key] + '. ';
      }

      return m;
  }
}

export const teachersRemake = score => {
  if(score >= 70) {
    return 'Excellent';
  }
  if(score >= 60 && score < 70) {
    return 'Very Good';
  }
  if(score >= 50 && score < 60) {
    return 'Good';
  }
  if(score >= 40 && score < 50) {
    return 'Fair';
  }
    return 'Poor';
}