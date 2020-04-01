import React, { Component } from 'react';
import axios from 'axios';
import "./style-sheets/test.css";

const GameName = props => (
  
  <div className="square">
    <h1 className="whiteText">{props.game.name}</h1>
    <div className="gameTilePic"></div>
  </div>
)

export default class TestPage extends Component{
  constructor(props) {
    super(props);

   this.state = {games: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/gametiles/')
      .then(res => {
        console.log(res.data);
        this.setState({games: res.data})
      })
      .catch((error) => {
        console.Console.log(error);
      })
  }

  /* gameList(){
    return this.state.games.map(currentGame =>{
      return <GameName game={currentGame} key={currentGame._id} />
    })
  } */

  gameList(){
    return this.state.games.map(currentGame =>{
      return <GameName game={currentGame} key={currentGame._id} />
    })
  }

  render() {
    return(
      <div className="page">
        <div className="gameTileGrid"> {/*This gameTileGrid goes into another grid that organizes all the elements on this page */}
          <h1 className="headingText">Featured Games</h1>
          {this.gameList()}
        </div>
      </div>
    );
  }
}