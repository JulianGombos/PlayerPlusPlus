import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./style-sheets/navbar.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class Navbar extends Component{

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render(){
    const { user } = this.props.auth; //This might be the way to keep track of user data throughout the components
    console.log("User name is: " + user.name);
    return(
      <div className="pageBackground">
        <div className = "topBar">
          <div className = "topBarGrid">
            <div className = "circle"></div>
            <div><Link to='/' className='websiteNameButton'>Player Plus Plus</Link></div>
            <div><Link to='/allgames' className='allGamesButton'>All Games</Link></div>
            <div className="allGamesButton">{user.name}</div>
            {/* <div><Link to="/register" style={{width: "120px", borderRadius: "20px", letterSpacing: "1.5px"}} className="btn btn-large waves-effect waves-light hoverable blue accent-3">Register</Link></div> */}
            <div>
              {user.name == undefined ? <Link to="/login" className="btn btn-large waves-effect waves-light white hoverable black-text accent-3 loginButton">Log In/Register</Link> :
               <button onClick={this.onLogoutClick} className="btn btn-large waves-effect waves-light hoverable blue accent-3 loginButton">Logout</button>}
            </div>
          </div>
        </div>
        <div className="leftBar"></div>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);

/* export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">ExcerTracker</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Exercises</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Exercise Log</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create User</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
} */
