import React, { Component } from 'react';
import axios from 'axios';

const GameName = props => (
  <tr>
    <td>{props.game.name}</td>
  </tr>
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

  gameList(){
    return this.state.games.map(currentGame =>{
      return <GameName game={currentGame} key={currentGame._id}/>
    })
  }

  render() {
    return(
    <h1>Games: {this.gameList()}</h1>
    );
  }
}