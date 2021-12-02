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
    IS_COMPUTING_RESULTS,
    COMPUTE_RESULTS_FAILED,
    COMPUTE_RESULTS_SUCCEEDED,
    FETCH_RESULTSHEET_SUCCEEDED,
    FETCH_RESULTSHEET_FAILED,
    IS_FETCHING_RESULTSHEET,
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

const isComputingResults = () => ({
    type: IS_COMPUTING_RESULTS,
})

const computeResultsFailed = err => ({
    type: COMPUTE_RESULTS_FAILED,
    payload: err,
})

const computeResultsSucceeded = data => ({
    type: COMPUTE_RESULTS_SUCCEEDED,
    payload: data,
})

const fetchResultsFailed = err => ({
    type: FETCH_RESULTSHEET_FAILED,
    payload: err,
})

const fetchResultsSucceeded = data => ({
    type: FETCH_RESULTSHEET_SUCCEEDED,
    payload: data,
})

const isFetchingResultSheet = () => ({
    type: IS_FETCHING_RESULTSHEET,
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

export const computeResults = params => async dispatch => {
    try {
        dispatch(isComputingResults());
        const responds = await axios({
            url: '/gradebooks/comput/results',
            method: 'GET',
            params,
            headers: tokenConfig('application/json'),
        });
        dispatch(computeResultsSucceeded(responds.data));
    }catch(errors) {
        dispatch(computeResultsFailed(errorParser(errors.response)))
    }
}

export const fetchResults = params => async dispatch => {
    try {
        dispatch(isFetchingResultSheet());
        const responds = await axios({
            url: '/gradebooks/fetch/results-sheet',
            method: 'GET',
            params,
            headers: tokenConfig('application/json'),
        });
        dispatch(fetchResultsSucceeded(responds.data));
    }catch(errors) {
        dispatch(fetchResultsFailed(errorParser(errors.response)))
    }
}