import {
    NEW_STUDENT_REGISTRATION_SUCCEEDED,
    NEW_STUDENT_REGISTRATION_FAILED,
    FETCHING_A_STUDENT_SUCCEEDED,
    FETCHING_A_STUDENT_FAILED,
    IS_FETCHING_A_STUDENT,
    UPDATE_STUDENT_DATA_FAILED,
    UPDATE_STUDENT_DATA_SUCCEEDED,
    FETCH_RESULTSLIP_SUCCEEDED,
    FETCH_RESULTSLIP_FAILED,
    IS_FETCHING_RESULTSLIP,
    UPDATE_PARENT_DATA_SUCCEEDED,
    UPDATE_PARENT_DATA_FAILED,
    ADD_PARENT_DATA_FAILED,
    ADD_PARENT_DATA_SUCCEEDED,
} from '../actions/action-types'
import initialState from './initial-state';


const studentReducer = (state = initialState({ student: true }), action) => {
    switch (action.type) {
        case NEW_STUDENT_REGISTRATION_SUCCEEDED:
            return {
                ...state,
                student: {
                    data: { ...action.payload, new_registration: true },
                    error: null,
                    isFetchingAStudent: false,
                }
            }

        case FETCHING_A_STUDENT_SUCCEEDED:
        case UPDATE_STUDENT_DATA_SUCCEEDED:
        case UPDATE_PARENT_DATA_SUCCEEDED:
        case ADD_PARENT_DATA_SUCCEEDED:
            return {
                ...state,
                student: {
                    data: action.payload,
                    error: null,
                    isFetchingAStudent: false,
                }
            }

        case NEW_STUDENT_REGISTRATION_FAILED:
        case FETCHING_A_STUDENT_FAILED:
        case UPDATE_STUDENT_DATA_FAILED:
        case UPDATE_PARENT_DATA_FAILED:
        case ADD_PARENT_DATA_FAILED:
            return {
                ...state,
                student: {
                    data: null,
                    error: action.payload,
                    isFetchingAStudent: false,
                }
            }

        case IS_FETCHING_A_STUDENT:
            return {
                ...state,
                student: {
                    data: null,
                    error: null,
                    isFetchingAStudent: true,
                }
            }

        case IS_FETCHING_RESULTSLIP:
            return {
                ...state,
                result: {
                    data: null,
                    error: null,
                    isFetchingResult: true,
                },
            }

        case FETCH_RESULTSLIP_SUCCEEDED:
            return {
                ...state,
                result: {
                    data: action.payload,
                    error: null,
                    isFetchingResult: false,
                },
            }

        case FETCH_RESULTSLIP_FAILED:
            return {
                ...state,
                result: {
                    data: null,
                    error: action.payload,
                    isFetchingResult: false,
                },
            }

        default:
            return state
    }
}

export default studentReducer;