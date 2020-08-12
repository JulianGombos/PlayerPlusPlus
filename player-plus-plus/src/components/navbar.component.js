import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./style-sheets/navbar.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class Navbar extends Component{
  constructor(props){
    super(props);
  }


  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();

    //Reloads the page so the authentication data is not in the object anymore
    window.location.reload(false);
  };

  render(){
    const { user } = this.props.auth; //This might be the way to keep track of user data throughout the components
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
