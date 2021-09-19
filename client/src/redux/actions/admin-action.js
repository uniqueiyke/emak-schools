import axios from 'axios';
import { 
    ALL_STUDENTS_FETCH_FAILED,
    ALL_STUDENTS_FETCH_SUCCEEDED,
    AUTH_SENT_STAFF_TOKEN,
    AUTH_SENT_STAFF_TOKEN_FAILED,
    IS_FETCHING_STUDENTS,
} from './action-types';
import errorParser from './error-parser';
import tokenConfig from './token-config';

const sentStaffToken = data => {
    return({
        type: AUTH_SENT_STAFF_TOKEN,
        payload: data
    })
}

const sentStaffTokenFailed = errors => {
    return({
        type: AUTH_SENT_STAFF_TOKEN_FAILED,
        payload: errors
    })
}

const allStudentFetchSucceeded = data => ({
    type: ALL_STUDENTS_FETCH_SUCCEEDED,
    payload: data,
})

const allStudentFetchFailed = data => ({
    type: ALL_STUDENTS_FETCH_FAILED,
    payload: data,
})

const isFetchingStudent = () => ({
    type: IS_FETCHING_STUDENTS
})

export const sendStaffRegistrationToken =  data => async dispatch => {
    try {
        const responds = await axios({
            url: '/admin/send/staff/reg-token',
            method: 'POST',
            data: data,
            headers: tokenConfig('application/json')
        });

        dispatch(sentStaffToken(responds.data));
    }catch(errors) {
        dispatch(sentStaffTokenFailed(errorParser(errors.response)));
    }
}

export const fetchAllStudents = () => async dispatch => {
    dispatch(isFetchingStudent());
    try {
        const responds = await axios({
            url: '/admin/fetch/all/students',
            method: 'GET',
            headers: tokenConfig('application/json')
        });

        dispatch(allStudentFetchSucceeded(responds.data));
    }catch(errors) {
        dispatch(allStudentFetchFailed(errorParser(errors.response)));
    }
}
