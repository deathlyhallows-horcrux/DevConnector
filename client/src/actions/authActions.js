//user submit button is the one that calls this action 
//this action(from component) ->(triggers) dispatch call -> reducer

import { SET_USER, SET_ERROR } from "./types"
import axios from 'axios'; //allows to call API from JS code 
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';


export const registerUser = (userData, history) => dispatch => {
  axios
  .post("api/users/register", userData)
  // .then(res => dispatch({
  //   type: SET_USER,
  //   payload: res.data
  // }))
  .then(
    res => history.push('/login')
  )
  .catch(err => dispatch({
    type: SET_ERROR,
    payload: err.response.data
  })); 

  //dispatch call 
  // return {
  //   type: SET_USER,
  //   payload: userData
  // }
}

//Login api -> gets token -> redux store (set user and auth) -> change Navbar
//set token in local storage of the browser
export const loginUser = userData => dispatch => {
  axios.post("api/users/login", userData)
    .then(res => {
      //save token to local storage for browser
      const {token} = res.data;
      localStorage.setItem ('jwtToken', token);
      //set token to auth header; //every api call henceforth needs the header to have the token set
      setAuthToken(token);

      //decode token
      const decoded = jwt_decode(token);
      //user ino write to redux
      dispatch({
        type: SET_USER,
        payload: decoded
      })
    })
    .catch(err => dispatch({
      type: SET_ERROR,
      payload: err.response.data
    }));
}

export const logoutUser = () => dispatch => {
  //remove token in localstorage
  localStorage.removeItem('jwtToken');
  //remove token in header
  setAuthToken(false);

  //remove user data in redux store
  dispatch({
    type: SET_USER,
    payload: {}
  });

 
}
