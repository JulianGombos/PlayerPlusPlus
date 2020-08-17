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
                    <Link to={{pathname:'/searchResults', games: this.state.search}}><button className="btn btn-dark" type="button" id="button-addon2">Search</button></Link>
                  </div>
                </div>
              </div>
            </form>
            <div className="userName">{user.name}</div>
            {/* <div><Link to="/register" style={{width: "120px", borderRadius: "20px", letterSpacing: "1.5px"}} className="btn btn-large waves-effect waves-light hoverable blue accent-3">Register</Link></div> */}
            <div className="loginButton">
              {user.name == undefined ? <Link to="/login" className="btn btn-lg btn-secondary">Log In/Register</Link> :
                <button onClick={this.onLogoutClick} className="btn btn-lg btn-secondary">Logout</button>}
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
