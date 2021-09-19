const FormFieldsValidator = require('./form-fields-validator');
const { isEmptyArrayOrObject, formatPhoneNumber } = require('./utility-functions');

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
exports.validateFormFields = (inputFields, fieldsToValidate, options = defaultOptions) => {
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
                    formFieldsValidator.field(field).isPasswordStrong().withMessage('This password is too weak. Your password should have at least one upper case leter, one lower case letter, one nomber and one special character');
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