import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";
import "./style-sheets/registerpage.css"

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  
  onSubmit = e => {
    e.preventDefault();
    
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
    
    console.log(newUser);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="pageBackground">
        <div className="container">
          <div className="row">
            <div className="col s8 offset-s2">
              <Link to="/" className="backToHome">
                <i className="material-icons left">keyboard_backspace</i> Back to
                home
              </Link>
              <div>
                <h4 style={{color: "white"}}>Become a <b style={{color: "#8015E8"}}>PlayerPlusPlus Member</b></h4>
                <p style={{color: "white"}}>Already have an account? <Link to="/login" className="login">Log in</Link></p>
              </div>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label for="name" style={{color: "white"}}>Username (Display Name)</label>
                  <input
                    onChange={this.onChange}
                    value={this.state.name}
                    error={errors.name}
                    id="name"
                    type="text"
                    className={classnames("form-control", {
                      invalid: errors.name
                    })}
                  />
                  <span className="red-text">{errors.name}</span>
                </div>
                <div className="form-group">
                  <label for="email" style={{color: "white"}}>Email</label>
                  <input
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="email"
                    className={classnames("form-control", {
                      invalid: errors.email
                    })}
                  />
                  <span className="red-text">{errors.email}</span>
                </div>
                <div className="form-group">
                  <label for="password" style={{color: "white"}}>Password</label>
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                    className={classnames("form-control", {
                      invalid: errors.password
                    })}
                  />
                  <span className="red-text">{errors.password}</span>
                </div>
                <div className="form-group">
                  <label for="password2" style={{color: "white"}}>Confirm Password</label>
                  <input
                    onChange={this.onChange}
                    value={this.state.password2}
                    error={errors.password2}
                    id="password2"
                    type="password"
                    className={classnames("form-control", {
                      invalid: errors.password2
                    })}
                  />
                  <span className="red-text">{errors.password2}</span>
                </div>
                <div><button type="submit" className="btn btn-lg registerButton">Sign up</button></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));