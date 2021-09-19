import axios from 'axios';
import errorParser from './error-parser';
import tokenConfig from './token-config';
import {
    NEW_STUDENT_REGISTRATION_SUCCEEDED,
    NEW_STUDENT_REGISTRATION_FAILED,
    FETCHING_A_STUDENT_SUCCEEDED,
    FETCHING_A_STUDENT_FAILED,
    IS_FETCHING_A_STUDENT,
    UPDATE_STUDENT_DATA_SUCCEEDED,
    UPDATE_STUDENT_DATA_FAILED,
} from './action-types';


const newStudentRegistrationSucceeded = data => ({
    type: NEW_STUDENT_REGISTRATION_SUCCEEDED,
    payload: data
})

const newStudentRegistrationFailed = err => ({
    type: NEW_STUDENT_REGISTRATION_FAILED,
    payload: err,
})

const fetchingAStudentSucceeded = data => ({
    type: FETCHING_A_STUDENT_SUCCEEDED,
    payload: data,
})

const fetchingAStudentfailed = err => ({
    type: FETCHING_A_STUDENT_FAILED,
    payload: err,
})

const isFetchingAStudent = () => ({
    type: IS_FETCHING_A_STUDENT
})

const studentDataUpdateSucceeded = data =>({
    type: UPDATE_STUDENT_DATA_SUCCEEDED,
    payload: data
})

const studentDataUpdateFailed = err =>({
    type: UPDATE_STUDENT_DATA_FAILED,
    payload: err
})


export const registerStudent = (data, token) => async dispatch => {
    try {
        const response = await axios({
            url: '/students/registration/register/student',
            method: 'POST',
            data: data,
            params: { token },
            headers: {
                'Content-Type': 'application/json',
            },
        });

        dispatch(newStudentRegistrationSucceeded(response.data));
    } catch (errors) {
        dispatch(newStudentRegistrationFailed(errorParser(errors.response)));
    }
}

export const fetchStudent = id => async dispatch => {
    dispatch(isFetchingAStudent())
    try {
        const response = await axios({
            url: '/students/get/student/data',
            method: 'GET',
            params: { id },
            headers: tokenConfig('application/json')
        });
        dispatch(fetchingAStudentSucceeded(response.data));
    } catch (error) {
        dispatch(fetchingAStudentfailed(errorParser(error.response)));
    }
}

export const updateStudentData =  (data, id) => async dispatch => {
    try {
        const response = await axios({
            url: '/students/student/data/update',
            method: 'POST',
            data: data,
            params: { id },
            headers: tokenConfig('application/json'),
        });
        dispatch(studentDataUpdateSucceeded(response.data));
        return true;
    } catch (errors) {
        dispatch(studentDataUpdateFailed(errorParser(errors.response)));
        return false;
    }
}