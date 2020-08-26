import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./style-sheets/navbar.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import axios from 'axios';

class Navbar extends Component{
  constructor(){
    super();

    this.state = {search: ""};
  }


  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();

    //Reloads the page so the authentication data is not in the object anymore
    window.location.reload(false);
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render(){
    const { user } = this.props.auth; //This might be the way to keep track of user data throughout the components
    return(
      <div>
        <div className="pageBackground"></div>
          <div className = "topBar">
            <div className = "topBarGrid">
              <div className = "circle"></div>
              <div><Link to='/' className='websiteNameButton'>Player Plus Plus</Link></div>
              <div><Link to='/allgames' className='allGamesButton'>All Games</Link></div>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="searchBar">
                  <div className="input-group mb-3">
                    <input type="text" onChange={this.onChange} id="search" value={this.state.search} className="form-control" placeholder="Search for Game" aria-label="Search for Game" aria-describedby="button-addon2" />
                    <div className="input-group-append">
                      <Link to={{pathname:'/searchResults/' + this.state.search, games: this.state.search}}><button className="btn btn-dark" type="button" id="button-addon2">Search</button></Link>
                    </div>
                  </div>
                </div>
              </form>
              <div style={{paddingLeft: "125px"}}>
                <div style={{display: user.name == undefined ? "block" : "none"}}>
                  <Link to="/login" className="btn btn-lg btn-secondary loginButton">Log In/Register</Link>
                </div>
              </div>
              <div style={{display: user.name == undefined ? "none" : "block"}}>
                <div className="profileDropdown">
                  <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      {user.name}
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                      <a className="dropdown-item" href="#">Edit Profile</a>
                      <button className="dropdown-item" type="button">Settings</button>
                      <div className="dropdown-divider"></div>
                      <button className="dropdown-item" type="button" onClick={this.onLogoutClick}>Logout</button>
                    </div>
                  </div>
                </div>
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
