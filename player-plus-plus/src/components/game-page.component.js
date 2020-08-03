import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Link } from 'react-router-dom';

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
        console.Console.log(error);
      })
  }

  render() {
    return(
      <div>
        <NavBar />
        <div className="page">
          <h1 className="headingText">Featured Games</h1>
          <h2>{this.state.game.name}</h2>
        </div>
      </div>
    );
  }
} 