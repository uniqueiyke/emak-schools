const isLength = (input, length) => {
    if (input.trim().length >= length) return true;
    return false;
}

const isPasswordConfirm = (password, checkPassword) => {
    if (password.trim() !== checkPassword.trim()) 
        return false;
    return true;
}

const validateInput = reqBody => {
    const errObj = {};
    if(!isLength(reqBody.username, 8)){
        errObj.username = 'The username is too short. It should be atleast 8 characters';
    }

    if(!isLength(reqBody.password, 8)){
        errObj.password = 'The password is too short. It should be atleast 8 characters';
    }

    if (!isPasswordConfirm(reqBody.password, reqBody.rpassword)) {
        errObj.misMatch = 'password mis-matched'
    }

    return errObj;
}

module.exports = validateInput;