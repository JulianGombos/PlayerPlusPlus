import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from "./navbar.component";
import "./style-sheets/allgamespage.css";

const GameName = props => (
  
  <Link to={{pathname:'/game', id: props.game._id}}>
    <div className="square">
      <div style={{height: '230px', width: '230px', backgroundImage: `url(${require(`./style-sheets/pics/${props.game.picUrl}`)})`, borderRadius: '15px'}}>
        {/* <h1 className="whiteText">{props.game.name}</h1> */}
      </div>
    </div>
  </Link>
)

export default class AllGames extends Component {
  constructor(props){
    super(props);

    this.state = {games: []};
  }

  componentDidMount() {
    axios.get('/games/')
      .then(res => {
        this.setState({games: res.data})
      })
      .catch((error) => {
        console.log(error);
      })
  }

  gameList(){
    return this.state.games.map(currentGame =>{
      var gameTileStyle = {height: '230px', width: '230px', backgroundImage: 'url(./style-sheets/pics/MinecraftTilePic.png)', borderRadius: '15px'};
      return <GameName game={currentGame} gameStyle={gameTileStyle} key={currentGame._id} />
    })
  }

  render(){
    return(
      <div>
        <NavBar />
        <div className="page">
          <div style={{marginLeft: '10px'}}>
            <h1 className="headingTextWhite">All</h1>
            <h1 className="headingText"> Games</h1>
          </div>
          <div className="gameTileContainer">
            {this.gameList()}
          </div>
        </div>
      </div>
    )
  }
} 
