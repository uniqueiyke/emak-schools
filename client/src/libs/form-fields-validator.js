import { formatPhoneNumber, isEmptyArrayOrObject, isFunction, isRegExp } from "./utility-functions";
if (!Number.MAX_SAFE_INTEGER) {
    Number.MAX_SAFE_INTEGER = 9007199254740991; // Math.pow(2, 53) - 1;
}



class FormFieldsValidator {
    errorObj = {};
    errorMgs;
    formInputs = {};
    currentField = {};
    DEFAULT_LENGTH_VALUE = { minLength: 0, maxLength: Number.MAX_SAFE_INTEGER };
    constructor(formInputs) {
        this.formInputs = formInputs;
    }

    /**
     * This method is use to retrive the form field you want to validate.
     * The fieldName parameter should be a key in the object passed as a 
     * parameter when the validation object was created.
     * 
     * You need to call this method before calling any validation method.
     * Even if you want to call isStringMatch method which dose not need 
     * need form field, you still need to call this method before calling the 
     * method so that you will able to pass error message with withMessage method.
     * @param {string} fieldName 
     * @returns 
     */
    field = fieldName => {
        this.currentField = {};
        this.currentField.fieldName = fieldName;
        this.currentField.value = this.formInputs[fieldName];
        return this;
    }

    /**
     * Use to trim this string. it calls String.trim() under the hood.
     * You should chain this method call with any of the validation method 
     * to trim off ecess white characters if needed.
     * @returns 
     */
    trim = () => {
        this.currentField.value = this.currentField.value.trim();
        return this;
    }

    /**
     * This function check if length of the text from the input field is upto the 
     * specified length passed as an argument.
     * 
     * The parameter is an object specifing the minimum and maximum string length.
     * The default minimum length value is 0 and the default maximum legth value 
     * is Number.MAX_SAFE_INTEGER.
     * This method must be chained with this call to field method.
     * @param {object} length 
     * @returns 
     */
    isLength = (length = this.DEFAULT_LENGTH_VALUE) => {
        length.maxLength = length.maxLength ? length.maxLength : this.DEFAULT_LENGTH_VALUE.maxLength;
        length.minLength = length.minLength ? length.minLength : this.DEFAULT_LENGTH_VALUE.minLength;
        this.currentField.isError = false; // reset error flag
        if (this.currentField.value.length < length.minLength) {
            this.currentField.isError = true
        } else if (this.currentField.value.length > length.maxLength) {
            this.currentField.isError = true
        }
        return this;
    }

    isEmpty = () => {
        this.currentField.isError = false; // reset error flag
        if (this.currentField.value.trim().length <= 0 || this.currentField.value.trim() === '') {
            this.currentField.isError = true
        }
        return this;
    }
    /** 
    * @param{string} string
    * @returns{this}
    * Compares if the two string value are lexicographically equal.
    * This can be use to compare password fields for a match
   */
    isStringMatch = (string) => {
        this.currentField.isError = false; // reset error flag
        if (this.currentField.value.trim() !== string.trim())
            this.currentField.isError = true
        return this;
    }


    /**
     * Validate input string to be a valid email address
     * @returns 
     */
    isValidEmail = () => {
        // eslint-disable-next-line
        const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.currentField.isError = false; //reset error flag
        if (!emailRegex.test(this.currentField.value)) {
            this.currentField.isError = true;
        }

        return this;
    }

    /**
     * Validate an input password to be strong. The veryStrong flag determing 
     * if the password show contain at least a lowercase letter, an uppercase 
     * letter a number and a special character and should not be less the eight (8)
     * charaters long. 
     * 
     * If the flag is off, the password should contains at least
     * one uppercase letter, a lowercase letter or a number and should be at least
     * 8 characters long.
     * 
     * The flag is true by default
     * @param {boolean} veryStrong 
     * @returns 
     */
    isPasswordStrong = (veryStrong = true) => {
        let passwordRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/;

        //use a strong regular expression for a stonger password instead        
        if (veryStrong === true) { // eslint-disable-next-line
            passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#_\-\+\$%\^&\*=\\])(?=.{8,})/;
        }
        this.currentField.isError = false; //reset error flag
        if (!passwordRegex.test(this.currentField.value)) {
            this.currentField.isError = true;
        }
        return this;
    }

    arrayValues = () => {
        this.currentField.isError = false; //reset error flag
        if (!Array.isArray(this.currentField.value) || this.currentField.value.length <= 0) {
            this.currentField.isError = true;
        }
        return this;
    }

    /**
     * Validate an input field value by calling a the provide function or method.
     * The return value of the funtion should be a boolean - true if the test fail or false of the test pass.
     * This method throw an Exception if the argument is not a callable
     * @param {function} func 
     */
    exec = (func) => {
        if(!isFunction(func)) {
            throw TypeError('The argument to this method should be a function or callable with a return value of type boolean.');
        }

        const retValue = func();
        if (typeof retValue !== 'boolean'){
            throw Error('The argument to this method should be a function or callable with a return value of type boolean.');
        }

        if (retValue) {
            this.currentField.isError = true;
        }
        return this;
    }

    /**
     * Validate an input field value by testing of the value match the provided 
     * Regular Expression pattern. This method throw an Exception if the argument fail
     * @param {RegExp} pattern 
     * @returns 
     */
    matchPattern = pattern => {
        if(!isRegExp(pattern)){
            throw TypeError('The argument to this method should be a Reguler Expression object');
        }

        if (!pattern.test(this.currentField.value)) {
            this.currentField.isError = true;
        }
        return this;
    }

    /**
     * This supply the error message of a field if is fail the validation.
     * 
     * It should be chain with the validation method
     * @param {string} message 
     * @returns 
     */
    withMessage = message => {
        if (this.currentField.isError)
            this.errorObj[this.currentField.fieldName] = message;
        return this;
    };

    errorMessage = () => this.errorObj;
}

export default FormFieldsValidator;

const defaultOptions = {
    minLength: 1,
    maxLength: 25,
    password_field_name: 'password',
    optionalFields: []
}

/**
 * Validate form input fields received as a parameter and returns an error object.
 * @param {object} inputFields This object should be all the form field name and their corresponding value as a key: value pair
 * @param {object} fieldsToValidate This object value should be the fields to be validated as key and the type of validation as value.
 * the type of validation will also help to provide appropriate error message if failed.
 * The validation types are:  email | min_length | max_length | phone | password | password_match | array | date | select
 * If you do not want a input value to be empty string with any special validation, you can provide '' or any text string that is not listed as the validation type 
 * @param {object} options This is use to provide addition argument for the minimum and maximum string length
 * with default values include  {
    minLength: 1,
    maxLength: 25,
    password_field_name: 'password', optionalFields: []
}
 * @returns returns null if all the validations pass or an error object. The key corresponds to your value key (field name) and the value is the error message
 */
export const validateFormFields = (inputFields, fieldsToValidate, options = defaultOptions) => {
    const formFieldsValidator = new FormFieldsValidator(inputFields);
    const fields = Object.keys(inputFields);
    const validateFields = Object.keys(fieldsToValidate);
    options.minLength = options.minLength || defaultOptions.minLength;
    options.maxLength = options.maxLength || defaultOptions.maxLength;
    options.optionalFields = options.optionalFields || defaultOptions.optionalFields;
    options.password_field_name = options.password_field_name || defaultOptions.password_field_name;
    const phoneField = {
        includePhoneField: false,
        fieldName: '',
        value: '',
    };
    for (const field of fields) {
        if (validateFields.includes(field)) {
            if (options.optionalFields.includes(field) && inputFields[field] === "") {
                continue;
            } else {
                if (fieldsToValidate[field] === 'email') {
                    formFieldsValidator.field(field).trim().isValidEmail().withMessage('Please enter a valid email address');
                }
                else if (fieldsToValidate[field] === 'min_length') {
                    formFieldsValidator.field(field).trim().isLength({ minLength: options.minLength }).withMessage('text is too short');
                }
                else if (fieldsToValidate[field] === 'phone') {
                    phoneField.value = formatPhoneNumber(inputFields[field]);
                    phoneField.includePhoneField = true;
                    phoneField.fieldName = field;
                }
                else if (fieldsToValidate[field] === 'password') {
                    formFieldsValidator.field(field).isPasswordStrong().withMessage('This password is too weak. Your password should have at least one upper case leter, one lower case letter, one number and one special character');
                }
                else if (fieldsToValidate[field] === 'max_length') {
                    formFieldsValidator.field(field).trim().isLength({ maxLength: options.maxLength }).withMessage('The text is too long');
                }
                else if (fieldsToValidate[field] === 'array') {
                    formFieldsValidator.field(field).arrayValues().withMessage('Please select a role');
                }
                else if (fieldsToValidate[field] === 'select') {
                    formFieldsValidator.field(field).trim().isEmpty().withMessage('Please select a value from the list.');
                }
                else if (fieldsToValidate[field] === 'password_match') {
                    formFieldsValidator.field(field).isStringMatch(inputFields[options.password_field_name]).withMessage('The password did not match');
                }
                else if (fieldsToValidate[field] === 'date') {
                    formFieldsValidator.field(field).trim().isEmpty().withMessage('Please choose a currect date.');
                }
                else {
                    formFieldsValidator.field(field).trim().isEmpty().withMessage('Field cannot be empty. Please enter some values.');
                }
            }
        }
    }

    const errors = formFieldsValidator.errorMessage();

    if (phoneField.includePhoneField && phoneField.value === '') {
        errors[phoneField.fieldName] = 'Please enter a valid phone number';
    }
    return isEmptyArrayOrObject(errors) ? null : errors;
}
