import React, { Component } from 'react';
import "./style-sheets/searchresults.css";
import NavBar from "./navbar.component";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import axios from 'axios';

const GameName = props => (
  
  <Link to={{pathname:'/game', id: props.game._id}}>
    <div className="square">
      <div style={{height: '230px', width: '230px', backgroundImage: `url(${require(`./style-sheets/pics/${props.game.picUrl}`)})`, borderRadius: '15px'}}>
        {/* <h1 className="whiteText">{props.game.name}</h1> */}
      </div>
    </div>
  </Link>
)

export default class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {games: []};
  }

  componentDidMount(){
    axios.get('/games/search/' + this.props.location.games)
      .then(res => {
        this.setState({games: res.data});
      })
      .catch((error) => {
        console.log(error);
      })
  }

  componentDidUpdate(){
    axios.get('/games/search/' + this.props.location.games)
      .then(res => {
        this.setState({games: res.data});
      })
      .catch((error) => {
        console.log(error);
      })
  }

  gameList(){
    return this.state.games.map(currentGame =>{
      return <GameName game={currentGame} key={currentGame._id} />
    })
  }

  render(){
    return(
      <div>
        <NavBar />
        <div className="page">
          <div>
            <h1 className="headingTextWhite">Search Results for </h1>
            <h1 className="headingText">{this.props.location.games}</h1>
          </div>
          <div className="gameTileContainer">
            {this.gameList()}
          </div>
        </div>
      </div>
    );
  }
}

