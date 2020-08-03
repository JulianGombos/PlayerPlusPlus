import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Link } from 'react-router-dom';
import "./style-sheets/gamepage.css";

import NavBar from "./navbar.component";

export default class TestPage extends Component{
  constructor(props) {
    super(props);

    this.state = {game: []}
  }

  componentDidMount() {
    axios.get('http://localhost:5000/games/' + this.props.location.id)
      .then(res => {
        console.log(res.data);
        this.setState({game: res.data})
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return(
      <div className="background">
        <NavBar />
        <div className="page">
          <div className="pageGrid">
            <div className="leftColumn">
              <div className="gameTitle">
                {this.state.game.name}
              </div>
              <div className="popularPosts">
                <h1 style={{color: 'white'}}>Popular Posts</h1>
              </div>
              <div className="popularPosters">
                <h1 style={{color: 'white'}}>Popular Posters</h1>
              </div>
            </div>
            <div className="middleColumn">
              <h1 style={{color: 'white'}}>Feed</h1>
            </div>
            <h1 style={{color: 'white'}}>{this.state.game.name}</h1>
          </div>
        </div>
      </div>
    );
  }
} 