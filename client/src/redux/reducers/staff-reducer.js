import {
    STAFF_REG_TOKEN_CONFIRM_FAILED,
    STAFF_REG_TOKEN_CONFIRMED,
    STAFF_REGISTRATION_SUCCEEDED,
    STAFF_REGISTRATION_FAILED,
    STAFF_LOGIN_SUCCEEDED,
    STAFF_LOGIN_FAILED,
    STAFF_FETCH_SUCCEEDED,
    STAFF_FETCH_FAILED,
    IS_FETCHING_STAFF,
    STAFF_LOGED_OUT,
    STAFF_DATA_UPDATE_SUCCEEDED,
    STAFF_DATA_UPDATE_FAILED,
    IS_UPDATING_STAFF_DATA,
    CONFIRM_STAFF_EMAIL_SUCCEEDED,
    CONFIRM_STAFF_EMAIL_FAILED,
    PASSWORD_RESET_SUCCESSFUL,
    PASSWORD_RESET_FAILED,
    IS_CONFIRMING_STAFF_EMAIL,
    STUDENTS_IN_CLASS_FAILED,
    STUDENTS_IN_CLASS_SUCCEEDED,
} from '../actions/action-types'
import initialState from './initial-state';

const resFailedState = (state, action, errorType='') => ({
    ...state,
    isAuthenticated: false,
    isFetchingStaff: false,
    isUpdatingStaffData: 0,
    isConfirmingEmail: false,
    staff: {
        data: null,
        error: {errorType, isError: true, errorMsg: action.payload}
    }
});

const staffReducer = (state = initialState({ staff: true }), action) => {
    switch (action.type) {
        case STAFF_REG_TOKEN_CONFIRMED:
            return {
                ...state,
                isFetchingStaff: false,
                regPassport: {
                    data: action.payload,
                    error: null
                }
            }

        case STAFF_REG_TOKEN_CONFIRM_FAILED:
            return {
                ...state,
                isFetchingStaff: false,
                regPassport: {
                    data: null,
                    error: action.payload
                }
            }
        case STAFF_REGISTRATION_SUCCEEDED:
        case STAFF_LOGIN_SUCCEEDED:
        case STAFF_FETCH_SUCCEEDED:
        case PASSWORD_RESET_SUCCESSFUL:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                isAuthenticated: true,
                isFetchingStaff: false,
                isUpdatingStaffData: 0,
                isConfirmingEmail: false,
                staff: {
                    data: action.payload.staff_data,
                    error: null
                }
            }
        case STAFF_DATA_UPDATE_SUCCEEDED:
            return {
                ...state,
                isAuthenticated: true,
                isFetchingStaff: false,
                isUpdatingStaffData: 2,
                isConfirmingEmail: false,
                staff: {
                    data: action.payload.staff_data,
                    error: null
                }
            }

        case CONFIRM_STAFF_EMAIL_SUCCEEDED:
            return {
                ...state,
                isAuthenticated: false,
                isFetchingStaff: false,
                isUpdatingStaffData: 0,
                isConfirmingEmail: false,
                staff: {
                    data: action.payload,
                    error: null
                }
            }

        case CONFIRM_STAFF_EMAIL_FAILED:
            localStorage.removeItem('token');
            return resFailedState(state, action, 'confirm-email-failed');
        case STAFF_REGISTRATION_FAILED:
            localStorage.removeItem('token');
            return resFailedState(state, action, 'registration-failed');
        case STAFF_LOGIN_FAILED:
            localStorage.removeItem('token');
            return resFailedState(state, action, 'login-failed');
        case STAFF_FETCH_FAILED:
            localStorage.removeItem('token');
            return resFailedState(state, action, 'fetch-failed');
        case PASSWORD_RESET_FAILED:
            localStorage.removeItem('token');
            return resFailedState(state, action, 'password-reset-failed');
        case STAFF_DATA_UPDATE_FAILED:
            return {
                ...state,
                isAuthenticated: true,
                isFetchingStaff: false,
                isUpdatingStaffData: -1,
                isConfirmingEmail: false,
                staff: {
                    data: state.staff.data,
                    error: action.payload
                }
            }

        case STAFF_LOGED_OUT:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                isFetchingStaff: false,
                isConfirmingEmail: false,
                staff: {
                    data: null,
                    error: null
                },
                staffRegPassport: {
                    data: null,
                    error: null,
                },
            }

        case IS_FETCHING_STAFF:
            return {
                ...state,
                isFetchingStaff: true
            }

        case IS_UPDATING_STAFF_DATA:
            return {
                ...state,
                isUpdatingStaffdata: 1
            }

        case IS_CONFIRMING_STAFF_EMAIL:
            return {
                ...state,
                isConfirmingEmail: true,
            }

            case STUDENTS_IN_CLASS_SUCCEEDED:
                return {
                    ...state,
                    students: {
                        data: action.payload,
                        error: null,
                    }
                }
            
                case STUDENTS_IN_CLASS_FAILED:
                return {
                    ...state,
                    students: {
                        data: null,
                        error: action.payload,
                    }
                }
        default:
            return state
    }
}

export default staffReducer;