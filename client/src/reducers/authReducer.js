/* eslint-disable import/no-anonymous-default-export */
//responsibility of reducer to write authentication information into my store

import { SET_USER } from "../actions/types";
import isEmpty from "../validation/is-empty";


//create a reducer and pass this into createStore saying this is one of the reducers in the store
const initialState = {
  isAuthenticated: false,
  user: {}
};

//this is the function that the store calls when it is created
//we are setting the current state to initialState value
//action is the type of action that is coming through to change this state
export default function(state = initialState, action){

  switch(action.type){
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state ;
  }
}

//always a return in the reducer means this data is written to the store due to an action