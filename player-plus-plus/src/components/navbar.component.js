import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./style-sheets/navbar.css";

export default class Navbar extends Component{

  render(){
    return(
      <div className="pageBackground">
        <div className = "topBar">
          <div className = "topBarGrid">
            <div className = "circle"></div>
            <div><Link to='/' className='websiteNameButton'>Player Plus Plus</Link></div>
            <div><Link to='/allgames' className='allGamesButton'>All Games</Link></div>
            <div><Link to="/register" style={{width: "140px", borderRadius: "3px", letterSpacing: "1.5px"}} className="btn btn-large waves-effect waves-light hoverable blue accent-3">Register</Link></div>
            <div><Link to="/login" style={{width: "140px", borderRadius: "3px", letterSpacing: "1.5px"}} className="btn btn-large btn-flat waves-effect white black-text">Log In</Link></div>
          </div>
        </div>
        <div className="leftBar"></div>
      </div>
    );
  }
}

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
