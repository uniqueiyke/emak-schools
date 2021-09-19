import { combineReducers } from 'redux';
import adminReducer from './admin-reducer';
import staffReducer from './staff-reducer';
import studentReducer from './student-reducer';


export default combineReducers({
  admin: adminReducer,
  staff: staffReducer,
  student: studentReducer,
});