import {
    ALL_STUDENTS_FETCH_FAILED,
    ALL_STUDENTS_FETCH_SUCCEEDED,
    AUTH_SENT_STAFF_TOKEN,
    AUTH_SENT_STAFF_TOKEN_FAILED,
    IS_FETCHING_STUDENTS,
    CREATE_RESULT_MANAGER_SUCCEEDED,
    CREATE_RESULT_MANAGER_FAILED,
    ALL_CURRENT_STUDENTS_FETCH_SUCCEEDED,
    ALL_CURRENT_STUDENTS_FETCH_FAILED,
    IS_COMPUTING_RESULTS,
    COMPUTE_RESULTS_FAILED,
    COMPUTE_RESULTS_SUCCEEDED,
    FETCH_RESULTSHEET_SUCCEEDED,
    FETCH_RESULTSHEET_FAILED,
    IS_FETCHING_RESULTSHEET,
    IS_FETCHING_ALL_STAFFS,
    ALL_STAFFS_FETCH_FAILED,
    ALL_STAFFS_FETCH_SUCCEEDED,
    UPDATE_STAFF_ROLES_SUCCEEDED,
    UPDATE_STAFF_ROLES_FAILED,
    UPDATE_STAFF_SUBJECTS_SUCCEEDED,
    UPDATE_STAFF_SUBJECTS_FAILED
} from '../actions/action-types'

import initialState from './initial-state'


const adminReducer = (state = initialState({ admin: true }), action) => {
    switch (action.type) {
        case AUTH_SENT_STAFF_TOKEN:
            return {
                ...state,
                staffRegPassport: {
                    data: { ...action.payload, is_successful: true },
                    error: null
                }
            }

        case AUTH_SENT_STAFF_TOKEN_FAILED:
            return {
                ...state,
                staffRegPassport: {
                    data: null,
                    error: { is_error: true, error_msg: action.payload }
                }
            }
        case ALL_STUDENTS_FETCH_SUCCEEDED:
        case ALL_CURRENT_STUDENTS_FETCH_SUCCEEDED:
            return {
                ...state,
                students: {
                    data: action.payload,
                    error: null,
                    isFetchingStudents: false,
                }
            }

        case ALL_STUDENTS_FETCH_FAILED:
        case ALL_CURRENT_STUDENTS_FETCH_FAILED:
            return {
                ...state,
                students: {
                    data: null,
                    error: action.payload,
                    isFetchingStudents: false,
                }
            }

        case IS_FETCHING_STUDENTS:
            return {
                ...state,
                students: {
                    data: null,
                    error: null,
                    isFetchingStudents: true,
                }
            }

        case IS_FETCHING_ALL_STAFFS:
            return {
                ...state,
                staffs: {
                    data: null,
                    error: null,
                    isFetchingAllStaffs: true,
                }
            }

        case UPDATE_STAFF_SUBJECTS_SUCCEEDED:
        case UPDATE_STAFF_ROLES_SUCCEEDED:
        case ALL_STAFFS_FETCH_SUCCEEDED:
            return {
                ...state,
                staffs: {
                    data: action.payload,
                    error: null,
                    isFetchingStudents: false,
                }
            }

        case UPDATE_STAFF_SUBJECTS_FAILED:
        case UPDATE_STAFF_ROLES_FAILED:
        case ALL_STAFFS_FETCH_FAILED:
            return {
                ...state,
                staffs: {
                    data: null,
                    error: action.payload,
                    isFetchingStudents: false,
                }
            }


        case CREATE_RESULT_MANAGER_SUCCEEDED:
            return {
                ...state,
                resultManager: {
                    data: { ...action.payload, is_successful: true },
                    error: null,
                }
            }

        case CREATE_RESULT_MANAGER_FAILED:
            return {
                ...state,
                resultManager: {
                    data: null,
                    error: { is_error: true, error_msg: action.payload },
                }
            }

        case IS_COMPUTING_RESULTS:
            return {
                ...state,
                results: {
                    isComputingResults: true,
                    data: null,
                    error: null,
                }
            }

        case IS_FETCHING_RESULTSHEET:
            return {
                ...state,
                results: {
                    isFetchingResultSheet: true,
                    data: null,
                    error: null,
                }
            }

        case FETCH_RESULTSHEET_SUCCEEDED:
        case COMPUTE_RESULTS_SUCCEEDED:
            return {
                ...state,
                results: {
                    isComputingResults: false,
                    isFetchingResultSheet: false,
                    data: action.payload,
                    error: null,
                }
            }
        case FETCH_RESULTSHEET_FAILED:
        case COMPUTE_RESULTS_FAILED:
            return {
                ...state,
                results: {
                    isComputingResults: false,
                    isFetchingResultSheet: false,
                    data: null,
                    error: action.payload,
                }
            }
        default:
            return state
    }
}

export default adminReducer;