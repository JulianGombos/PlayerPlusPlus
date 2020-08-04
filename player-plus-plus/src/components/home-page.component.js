import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Link } from 'react-router-dom';
import "./style-sheets/homepage.css";
import NavBar from "./navbar.component";

const GameName = props => (

  <Link to={{pathname:'/game', id: props.game._id}}>
    <div style={props.gameTileStyle}>
      <h1 className="whiteText">{props.game.name}</h1>
      <div className="gameTilePic"></div>
    </div>
  </Link>
)

export default class TestPage extends Component{
  constructor(props) {
    super(props);

   this.state = {games: []};
  }

  componentDidMount() {
    axios.get('/games/')
      .then(res => {
        console.log(res.data);
        this.setState({games: res.data})
      })
      .catch((error) => {
        console.log(error);
      })
  }

  gameList(){
    return this.state.games.map(currentGame =>{
      var gameTileStyle = {height: '230px', width: '230px', backgroundImage: 'url(' + './style-sheets/pics/MinecraftTilePic.png' + ')', borderRadius: 15};
      return <GameName game={currentGame} gameStyle={gameTileStyle} key={currentGame._id} />
    })
  }

  render() {
    return(
      <div>
        <NavBar />
        <div className="page">
          <div className="gameTileGrid"> {/*This gameTileGrid goes into another grid that organizes all the elements on this page */}
            <h1 className="headingText">Featured Games</h1>
            {this.gameList()}
          </div>
        </div>
      </div>
    );
  }
} 