//this file is the start of the folder reducers since it is named as reducer
//adds all the reducers and this is passed into store
import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});