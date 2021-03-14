import React, { Component } from 'react'
//import axios from 'axios'; //allows to call API from JS code 
import classnames from 'classname';
import  {connect} from 'react-redux';
import {registerUser} from '../../actions/authActions';
import PropTypes from 'prop-types';


class Register extends Component {
  //constructor initializes the memory first in lifecycle
  constructor(){
    super(); // inheriting parent class constructor

    //local state of the component: binding data from text boxes to state
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this); //short cut if i don't want to use .bind on the html elements
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    //on change in data in text boxes binding it to the state object: property binding
    this.setState({[e.target.name]: e.target.value})
  }
  onSubmit(e){
    e.preventDefault(); //prevent the url have the form values showing up

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      pasword2: this.state.password2
    };
    
    //trigger the action after submit has the state data
    this.props.registerUser(newUser, this.props.history);

    // axios.post("api/users/register", newUser)
    // .then(res => console.log(res.data))
    // .catch(err => this.setState({errors: err.response.data}));
  };

  //another component lifecycle trigged by mapStateToProps
 // componentWillReceiveProps(nextProps){
  componentWillReceiveProps(nextProps){
    //can write logic based on the props - to route if, 
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
  }


  render() {
   // const errors = this.state.errors;
     const {errors} = this.state; //object destructing - extracting property // use it with componentWillReceiveProps lifecycy;le
   // const {errors} = this.props; --use with mapStoreToProps
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input type="text" className={classnames("form-control form-control-lg", {'is-invalid': errors.name})} placeholder="Name" name="name" value={this.state.name} onChange={this.onChange} />
                  {errors.name && (<div className="invalid-feedback"> {errors.name}</div>)}
                </div>
                <div className="form-group">
                  <input type="email" className={classnames("form-control form-control-lg", {'is-invalid': errors.email})} placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange}/>
                  {errors.email && (<div className="invalid-feedback"> {errors.email}</div>)}
                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                </div>
                <div className="form-group">
                  <input type="password" className={classnames("form-control form-control-lg", {'is-invalid': errors.password})} placeholder="Password" name="password" value={this.state.password} onChange={this.onChange}/>
                  {errors.password && (<div className="invalid-feedback"> {errors.password}</div>)}
                </div>
                <div className="form-group">
                  <input type="password" className={classnames("form-control form-control-lg", {'is-invalid': errors.password2})} placeholder="Confirm Password" name="password2" value={this.state.password2} onChange={this.onChange}/>
                  {errors.password2 && (<div className="invalid-feedback"> {errors.password2}</div>)}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    
    )
  }
}

//handling error when dependencies are not loaded or availabe
///good coding practice to prevent component load if the following are not available
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

//state info you want to get back from redux store
const mapToStoreToProps = state => (
  {
    errors: state.errors
  }
)

//written separate to connect to store
//component is connected to Redux store and it gets the data and action function to dispatch call
export default connect(mapToStoreToProps, {registerUser})(Register);


/*NOTES:
The connect() function connects a React component to a Redux store.
 It provides its connected component with the pieces of the data it needs from the store, and the functions it can use to dispatch actions to the store. It does not modify the component class passed to it; instead, it returns a new, connected component class that wraps the component you passed in.

  1. mapStateToProps?: (state, ownProps?) => Object#
 If a mapStateToProps function is specified, the new wrapper component will subscribe to Redux store updates. This means that any time the store is updated, mapStateToProps will be called. The results of mapStateToProps must be a plain object, which will be merged into the wrapped component’s props. If you don't want to subscribe to store updates, pass null or undefined in place of mapStateToProps.
*/