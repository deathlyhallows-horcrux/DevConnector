import './App.css';
import {Provider} from 'react-redux';
import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Footer from './components/layouts/Footer';
import Navbar from './components/layouts/Navbar';
import Landing from './components/layouts/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import store from './store';
import {logoutUser} from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import { SET_USER } from './actions/types'

if(localStorage.jwtToken){
  //decode the token
  const decoded = jwt_decode(localStorage.jwtToken);
  //expiry of the token
  const currentTime = Date.now()/1000;
  if(currentTime > decoded.exp){
    //expired 
    //should trigger an action and logout user
    store.dispatch(logoutUser());
    //redirect user to login
    window.location.href = "/login";
  }

  //set auth token
  setAuthToken(localStorage.jwtToken);
  //dispatch
  store.dispatch({
    type: SET_USER,
    payload: decoded
  });
}

class App extends Component {

  render(){
    return (
     // this provider provides store to this component
      <Provider store={store}> 
      <Router>
        <div className="App">
          {/* <Navbar/> */}
          <Route path="/" exact component={Landing}></Route> 
          <Route path="/register" exact component={Register}></Route> 
          <Route path="/login" exact component={Login}></Route> 
          <Footer/>
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
