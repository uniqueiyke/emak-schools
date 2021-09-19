import {
    NEW_STUDENT_REGISTRATION_SUCCEEDED,
    NEW_STUDENT_REGISTRATION_FAILED,
    FETCHING_A_STUDENT_SUCCEEDED,
    FETCHING_A_STUDENT_FAILED,
    IS_FETCHING_A_STUDENT,
    UPDATE_STUDENT_DATA_FAILED,
    UPDATE_STUDENT_DATA_SUCCEEDED
} from '../actions/action-types'
import initialState from './initial-state';


const studentReducer = (state = initialState({ student: true }), action) => {
    switch (action.type) {
        case NEW_STUDENT_REGISTRATION_SUCCEEDED:
        case FETCHING_A_STUDENT_SUCCEEDED:
        case UPDATE_STUDENT_DATA_SUCCEEDED:
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
        default:
            return state
    }
}

export default studentReducer;