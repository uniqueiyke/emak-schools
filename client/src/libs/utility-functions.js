import axios from 'axios';

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

export const registerStudent = async data => {
    try {
        const response = await fetch('http://localhost:3002/students/registration/register-student', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
        console.error('Error:', error);
    } 
}

export const registerStaff = async data => {
    try {
        const response = await fetch('http://localhost:3002/staffs/registration/new/register', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
        console.error('Error:', error);
    } 
}


export const staffToJoinRequest = async data => {
  try {
      const response = await fetch('http://localhost:3002/staffs/registration/new/staff/init/registration/', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
      console.error('Error:', error);
  } 
}

export const registerStudent1 = async data => {
    try {
        const response = await axios({
        url: 'http://localhost:3002/students/registration/register-student',
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        data: data
      });
      return response;
    } catch (error) {
        console.error('Error:', error);
    } 
}


export const testRoute = async () => {
    try {
        const response = await fetch('http://localhost:3002', {
        method: 'GET', // or 'PUT'
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
        console.error('Error:', error);
    } 
}

export const insertMany = async () => {
    try {
        const response = await fetch('http://localhost:3002/insert-many', {
        method: 'GET', // or 'PUT'
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    } catch (error) {
        console.error('Error:', error);
    } 
}



    export const testRoute1 = async () => {
        try {
            const response = await axios({
                url: 'http://localhost:3002',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                  }})
        //   const responseData = await response.json();
           console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
        } 
    }