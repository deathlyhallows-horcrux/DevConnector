import React, { Component } from 'react'
//import axios from 'axios'; //allows to call API from JS code 
import classnames from 'classname';
import { connect } from 'react-redux';
import {loginUser} from '../../actions/authActions';
import PropTypes from 'prop-types';


class Login extends Component {

  constructor(){
    super(); // inheriting parent class constructor

    //local state of the component: binding data from text boxes to state
    this.state = {
      email: '',
      password: '',
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

    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(user);

    // axios.post("api/users/login", newUser)
    // .then(res => console.log(res.data))
    // .catch(err => this.setState({errors: err.response.data}));
  }
  
  //2nd life cyle stage after consructor
  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
  }

  //component needs to be alive to receive the props
  componentWillReceiveProps(nextProps){
    //can write logic based on the props - to route if, 
    if(nextProps.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
  }

  render() {
    const {errors} = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your DevConnector account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input type="email" className={classnames("form-control form-control-lg", {'is-invalid': errors.email})} placeholder="Email Address" name="email" value={this.state.email} onChange={this.onChange}/>
                  {errors.email && (<div className="invalid-feedback"> {errors.email}</div>)}
                </div>
                <div className="form-group">
                  <input type="password" className={classnames("form-control form-control-lg", {'is-invalid': errors.password})} placeholder="Password" name="password" value = {this.state.password} onChange={this.onChange}/>
                  {errors.password && (<div className="invalid-feedback"> {errors.password}</div>)}
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) =>(
  {
  errors: state.errors,
  auth: state.auth
});

//export default Login;
export default connect(mapStateToProps, {loginUser})(Login);
