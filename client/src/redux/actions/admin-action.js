import axios from 'axios';
import { 
    ALL_STUDENTS_FETCH_FAILED,
    ALL_STUDENTS_FETCH_SUCCEEDED,
    AUTH_SENT_STAFF_TOKEN,
    AUTH_SENT_STAFF_TOKEN_FAILED,
    CREATE_RESULT_MANAGER_FAILED,
    CREATE_RESULT_MANAGER_SUCCEEDED,
    IS_FETCHING_STUDENTS,
    ALL_CURRENT_STUDENTS_FETCH_SUCCEEDED,
    ALL_CURRENT_STUDENTS_FETCH_FAILED,
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

const allStudentFetchFailed = err => ({
    type: ALL_STUDENTS_FETCH_FAILED,
    payload: err,
})

const currentStudentFetchSucceeded = data => ({
    type: ALL_CURRENT_STUDENTS_FETCH_SUCCEEDED,
    payload: data,
})

const currentStudentFetchFailed = err => ({
    type: ALL_CURRENT_STUDENTS_FETCH_FAILED,
    payload: err,
})

const isFetchingStudent = () => ({
    type: IS_FETCHING_STUDENTS
})

const createResultManagerSucceeded = data => ({
    type: CREATE_RESULT_MANAGER_SUCCEEDED,
    payload: data,
})

const createResultManagerFailed = err => ({
    type: CREATE_RESULT_MANAGER_FAILED,
    payload: err,
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

export const fetchCurrentStudents = () => async dispatch => {
    dispatch(isFetchingStudent());
    try {
        const responds = await axios({
            url: '/admin/fetch/current/students',
            method: 'GET',
            headers: tokenConfig('application/json')
        });

        dispatch(currentStudentFetchSucceeded(responds.data));
    }catch(errors) {
        dispatch(currentStudentFetchFailed(errorParser(errors.response)));
    }
}


export const createResultManager = data => async dispatch => {
    try {
        const responds = await axios({
            url: '/admin/create/result-manager',
            method: 'POST',
            data: data,
            headers: tokenConfig('application/json')
        });

        dispatch(createResultManagerSucceeded(responds.data));
    }catch(errors) {
        dispatch(createResultManagerFailed(errorParser(errors.response)));
    }
}
