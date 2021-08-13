if (!Number.MAX_SAFE_INTEGER) {
    Number.MAX_SAFE_INTEGER = 9007199254740991; // Math.pow(2, 53) - 1;
}

class FormFieldsValidator {
    errorObj = {};
    errorMgs;
    formInputs = {};
    currentField = {};
    DEFAULT_LENGTH_VALUE = {minLength:0, maxLength:Number.MAX_SAFE_INTEGER};
    constructor(formInputs){
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
        if (this.currentField.value.length < length.minLength){
            this.currentField.isError = true
        }else if (this.currentField.value.length > length.maxLength){
            this.currentField.isError = true
        }
        return this;
    }

    /** 
     * @param{string} string1
     * @param{string} string2
     * @returns{this}
     * Compares if the two string value are lexicographically equal.
     * This can be use to compare password fields for a match
    */
    isStringMatch = (string1, string2) => {
        this.currentField.isError = false; // reset error flag
        if (string1.trim() !== string2.trim())
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
        if(!emailRegex.test(this.currentField.value)){
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
        if(veryStrong===true){ // eslint-disable-next-line
            passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        }
        this.currentField.isError = false; //reset error flag
        if (!passwordRegex.test(this.currentField.value)) {
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
        if(this.currentField.isError)
        this.errorObj[this.currentField.fieldName] = message;
        return this;
    };

    errorMessage = () => this.errorObj;
}

module.exports = FormFieldsValidator;
