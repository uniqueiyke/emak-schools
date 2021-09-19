import {
    ALL_STUDENTS_FETCH_FAILED,
    ALL_STUDENTS_FETCH_SUCCEEDED,
    AUTH_SENT_STAFF_TOKEN,
    AUTH_SENT_STAFF_TOKEN_FAILED,
    IS_FETCHING_STUDENTS
} from '../actions/action-types'
import initialState from './initial-state'


const adminReducer = (state = initialState({ admin: true }), action) => {
    switch (action.type) {
        case AUTH_SENT_STAFF_TOKEN:
            return {
                ...state,
                staffRegPassport: {
                    data: action.payload,
                    error: null
                }
            }

        case AUTH_SENT_STAFF_TOKEN_FAILED:
            return {
                ...state,
                staffRegPassport: {
                    data: null,
                    error: action.payload
                }
            }
        case ALL_STUDENTS_FETCH_SUCCEEDED:
            return {
                ...state,
                students: {
                    data: action.payload,
                    error: null,
                    isFetchingStudents: false,
                }
            }

        case ALL_STUDENTS_FETCH_FAILED:
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

        default:
            return state
    }
}

export default adminReducer;