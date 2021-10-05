import {
    STAFF_REG_TOKEN_CONFIRMED,
    STAFF_REG_TOKEN_CONFIRM_FAILED,
    STAFF_REGISTRATION_SUCCEEDED,
    STAFF_REGISTRATION_FAILED,
    STAFF_LOGIN_FAILED,
    STAFF_LOGIN_SUCCEEDED,
    STAFF_FETCH_SUCCEEDED,
    STAFF_FETCH_FAILED,
    IS_FETCHING_STAFF,
    STAFF_LOGED_OUT,
    STAFF_DATA_UPDATE_FAILED,
    STAFF_DATA_UPDATE_SUCCEEDED,
    IS_UPDATING_STAFF_DATA,
    CONFIRM_STAFF_EMAIL_FAILED,
    CONFIRM_STAFF_EMAIL_SUCCEEDED,
    PASSWORD_RESET_SUCCESSFUL,
    PASSWORD_RESET_FAILED,
    IS_CONFIRMING_STAFF_EMAIL,
    STUDENTS_IN_CLASS_FAILED,
    STUDENTS_IN_CLASS_SUCCEEDED,
} from './action-types';

import axios from 'axios';
import errorParser from './error-parser';
import tokenConfig from './token-config';

const staffRegTokenConfirmed = data => ({
    type: STAFF_REG_TOKEN_CONFIRMED,
    payload: data
})

const staffRegTokenConfirmFailed = err => ({
    type: STAFF_REG_TOKEN_CONFIRM_FAILED,
    payload: err
})

const staffRegistrationSucceeded = data => ({
    type: STAFF_REGISTRATION_SUCCEEDED,
    payload: data,
})

const staffRegistrationFailed = err => ({
    type: STAFF_REGISTRATION_FAILED,
    payload: err,
})

const staffLoginSucceeded = data => ({
    type: STAFF_LOGIN_SUCCEEDED,
    payload: data
})

const staffLoginFailed = err => ({
    type: STAFF_LOGIN_FAILED,
    payload: err
})

const staffFetchSucceeded = data => ({
    type: STAFF_FETCH_SUCCEEDED,
    payload: data,
})

const staffFetchFailed = err => ({
    type: STAFF_FETCH_FAILED,
    payload: err,
})

const isFetchingStaff = () => ({
    type: IS_FETCHING_STAFF
})

const studentsInClassSucceeded = data =>({
    type: STUDENTS_IN_CLASS_SUCCEEDED,
    payload: data,
})

const studentsInClassFailed = err =>({
    type: STUDENTS_IN_CLASS_FAILED,
    payload: err,
})

export const logoutStaff = () => ({
    type: STAFF_LOGED_OUT
})

const staffDataUpdateSucceeded = (data) => ({
    type: STAFF_DATA_UPDATE_SUCCEEDED,
    payload: data,
})

const staffDataUpdateFailed = err => ({
    type: STAFF_DATA_UPDATE_FAILED,
    payload: err,
})

const isUpdatingStaffData = () => ({
    type: IS_UPDATING_STAFF_DATA,
})

const confirmStaffEmailSucceeded = data => ({
    type: CONFIRM_STAFF_EMAIL_SUCCEEDED,
    payload: data,
})

const confirmStaffEmailFailed = err => ({
    type: CONFIRM_STAFF_EMAIL_FAILED,
    payload: err,
})

const passwordResetSuccessful = data => ({
    type: PASSWORD_RESET_SUCCESSFUL,
    payload: data,
})

const passwordResetFailed = data => ({
    type: PASSWORD_RESET_FAILED,
    payload: data,
})

const isConfirmingEmail =  () =>({
    type: IS_CONFIRMING_STAFF_EMAIL,
})

export const confirmStaffRegToken = token => async dispatch => {
    try {
        console.log('from staff action', token)
        const response = await axios({
            url: '/staffs/get/reg-token',
            params: { token },
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch(staffRegTokenConfirmed(response.data));
    } catch (errors) {
        dispatch(staffRegTokenConfirmFailed(errorParser(errors.response)));
    }
}

export const registerStaff = (data, token) => async dispatch => {
    try {
        const response = await axios({
            url: '/staffs/registration/new-staff/register',
            method: 'POST',
            data: data,
            params: { token },
            headers: {
                'Content-Type': 'application/json',
            },
        });

        dispatch(staffRegistrationSucceeded(response.data));
    } catch (errors) {
        dispatch(staffRegistrationFailed(errorParser(errors.response)));
    }
}

export const loginStaff = data => async dispatch => {
    try {
        const response = await axios({
            url: '/staffs/login/staff',
            method: 'POST',
            data: data,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        dispatch(staffLoginSucceeded(response.data));
    } catch (errors) {
        dispatch(staffLoginFailed(errorParser(errors.response)));
    }
}


export const fetchStaff = () => async dispatch => {
    dispatch(isFetchingStaff())
    try {
        const response = await axios({
            url: '/staffs/get/staff/data',
            method: 'GET',
            headers: tokenConfig('application/json')
        });
        dispatch(staffFetchSucceeded(response.data));
    } catch (error) {
        dispatch(staffFetchFailed(errorParser(error.response)));
    }
}

export const updateStaffData = data => async dispatch => {
    dispatch(isUpdatingStaffData());
    try {
        const response = await axios({
            url: '/staffs/staff/data/update',
            method: 'POST',
            data: data,
            headers: tokenConfig('application/json'),
        });
        dispatch(staffDataUpdateSucceeded(response.data));
        return true;
    } catch (errors) {
        dispatch(staffDataUpdateFailed(errorParser(errors.response)));
        return false;
    }
}

export const confirmEmail = email => async dispatch => {
    dispatch(isConfirmingEmail())
    try {
        const response = await axios({
            url: '/staffs/staff/confirm/email',
            method: 'POST',
            data: email,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch(confirmStaffEmailSucceeded(response.data));
        return true;
    } catch (errors) {
        dispatch(confirmStaffEmailFailed(errorParser(errors.response)));
        return false;
    }
}

export const resetPassword = email => async dispatch => {
    try {
        const response = await axios({
            url: '/staffs/staff/password/password-reset',
            method: 'POST',
            data: email,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch(passwordResetSuccessful(response.data));
        return true;
    } catch (errors) {
        dispatch(passwordResetFailed(errorParser(errors.response)));
        return false;
    }
}

export const fecthStudentsInClass = params => async dispatch => {
    try {
        const responds = await axios({
            url: '/admin/fetch/students/class',
            method: 'GET',
            params,
        headers: tokenConfig('application/json'),
        });
        dispatch(studentsInClassSucceeded(responds.data));
    }catch(errors) {
        dispatch(studentsInClassFailed(errorParser(errors.response)))
    }
}