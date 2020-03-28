import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component{

  render(){
    return(
      <div className = "topBar">
        <div className = "topBarGrid">
          <div className = "circle"></div>
          <div><Link to='/' className='websiteNameButton'>Website Name</Link></div>
          <div><Link to='/testpage' className='allGamesButton'>All Games</Link></div>
        </div>
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
