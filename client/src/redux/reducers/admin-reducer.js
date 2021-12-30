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
    UPDATE_STAFF_SUBJECTS_FAILED,
    STUDENTS_IN_CLASS_PER_TERM_SUCCEEDED,
    STUDENTS_IN_CLASS_PER_TERM_FAILED,
    IS_FETCHING_STUDENTS_CLASS,
    DELETE_STUDENT_FROM_CLASS_SUCCEEDED,
    DELETE_STUDENT_FROM_CLASS_FAILED,
    DELETE_SUBJECT_FROM_CLASS_SUCCEEDED,
    DELETE_SUBJECT_FROM_CLASS_FAILED,
    STUDENTS_SUBJECTS_PER_TERM_SUCCEEDED,
    STUDENTS_SUBJECTS_PER_TERM_FAILED,
    IS_FETCHING_STUDENTS_SUBJECTS,
    GENERATE_SCRATCH_CARDS_SUCCEEDED,
    GENERATE_SCRATCH_CARDS_FAILED,
    IS_FETCHING_SCRATCH_CARDS,
    FETCH_SCRATCH_CARDS_SUCCEEDED,
    FETCH_SCRATCH_CARDS_FAILED,
    FETCH_RESULTSLIP_SUCCEEDED,
    FETCH_RESULTSLIP_FAILED,
    IS_FETCHING_RESULTSLIP,
    PRINT_CARDS_FAILED,
    PRINT_CARDS_SUCCEEDED,
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
        case IS_FETCHING_STUDENTS_CLASS:
            return {
                ...state,
                studentsClass: {
                    data: null,
                    error: null,
                    isFetchingStudentsClass: true,
                }
            }
        case IS_FETCHING_STUDENTS_SUBJECTS:
            return {
                ...state,
                classSubjects: {
                    data: null,
                    error: null,
                    isFetchingStudentsSubjects: true,
                }
            }
        case DELETE_STUDENT_FROM_CLASS_SUCCEEDED:
        case STUDENTS_IN_CLASS_PER_TERM_SUCCEEDED:
            return {
                ...state,
                studentsClass: {
                    data: action.payload,
                    error: null,
                    isFetchingStudentsClass: false,
                }
            }
        case DELETE_STUDENT_FROM_CLASS_FAILED:
        case STUDENTS_IN_CLASS_PER_TERM_FAILED:
            return {
                ...state,
                studentsClass: {
                    data: null,
                    error: action.payload,
                    isFetchingStudentsClass: false,
                }
            }
        case DELETE_SUBJECT_FROM_CLASS_SUCCEEDED:
        case STUDENTS_SUBJECTS_PER_TERM_SUCCEEDED:
            return {
                ...state,
                classSubjects: {
                    data: action.payload,
                    error: null,
                    isFetchingStudentsSubjects: false,
                }
            }
        case DELETE_SUBJECT_FROM_CLASS_FAILED:
        case STUDENTS_SUBJECTS_PER_TERM_FAILED:
            return {
                ...state,
                classSubjects: {
                    data: null,
                    error: action.payload,
                    isFetchingStudentsSubjects: false,
                }
            }
        case IS_FETCHING_SCRATCH_CARDS:
            return {
                ...state,
                scratchCards: {
                    data: null,
                    error: null,
                    isFetchingScratchCard: true,
                }
            }
        case GENERATE_SCRATCH_CARDS_SUCCEEDED:
        case FETCH_SCRATCH_CARDS_SUCCEEDED:
        case PRINT_CARDS_SUCCEEDED:
            return {
                ...state,
                scratchCards: {
                    data: action.payload,
                    error: null,
                    isFetchingScratchCard: false,
                }
            }
        case GENERATE_SCRATCH_CARDS_FAILED:
        case FETCH_SCRATCH_CARDS_FAILED:
        case PRINT_CARDS_FAILED:
            return {
                ...state,
                scratchCards: {
                    data: null,
                    error: action.payload,
                    isFetchingScratchCard: false,
                }
            }

        case IS_FETCHING_RESULTSLIP:
            return {
                ...state,
                oneResult: {
                    data: null,
                    error: null,
                    isFetchingResult: true,
                },
            }

        case FETCH_RESULTSLIP_SUCCEEDED:
            return {
                ...state,
                oneResult: {
                    data: action.payload,
                    error: null,
                    isFetchingResult: false,
                },
            }

        case FETCH_RESULTSLIP_FAILED:
            return {
                ...state,
                oneResult: {
                    data: null,
                    error: action.payload,
                    isFetchingResult: false,
                },
            }
        default:
            return state
    }
}

export default adminReducer;