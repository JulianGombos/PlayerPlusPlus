import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./style-sheets/homepage.css";
import NavBar from "./navbar.component";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const GameName = props => (
  
  <Link to={{pathname:'/game', id: props.game._id}}>
    <div className="square">
      <div style={{height: '230px', width: '230px', backgroundImage: `url(${require(`./style-sheets/pics/${props.game.picUrl}`)})`, borderRadius: '15px'}}>
      </div>
    </div>
  </Link>
)

const FeaturedGames = props => (
  <div id="carouselExampleControls" className="carousel slide" data-interval="false">
    <div className="carousel-inner" style={{maxWidth: "750px"}}>
      <div className="carousel-item active" style={{maxWidth: "750px"}}>
        <div style={{display: "inline-block"}}>{props.games[0]}</div>
        <div style={{display: "inline-block"}}>{props.games[1]}</div>
        <div style={{display: "inline-block"}}>{props.games[2]}</div>
      </div>
      <div className="carousel-item" style={{maxWidth: "750px"}}>
        <div style={{display: "inline-block"}}>{props.games[3]}</div>
        <div style={{display: "inline-block"}}>{props.games[4]}</div>
        <div style={{display: "inline-block"}}>{props.games[5]}</div>
      </div>
    </div>
    <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="sr-only">Previous</span>
    </a>
    <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="sr-only">Next</span>
    </a>
  </div>
)

class HomePage extends Component{
  constructor(props) {
    super(props);
    
   this.state = {games: [], gameTiles: [], featuredGames: []};

  }

  componentDidMount() {
    axios.get('/games/')
      .then(res => {
        /* while(res.data.length > 6){
          res.data.pop();
        } */
        this.setState({games: res.data});
        this.gameList();
      })
      .catch((error) => {
        console.log(error);
      })

  }

  gameList(){
    var tiles = this.state.games.map(currentGame =>{
      return <GameName game={currentGame} key={currentGame._id} />
    });
    this.setState({gameTiles: tiles});
  }

  createFeaturedGames(){
      return <FeaturedGames games={this.state.gameTiles} />
  }

  render() {
    return(
      <div>
        <NavBar />
        <div className="page">
          <div>
            <h1 className="headingTextWhite">Featured</h1>
            <h1 className="headingText"> Games</h1>
          </div>
          <div style={{marginLeft: "-20px"}}>
            {this.createFeaturedGames()}
          </div>
          <hr className="purple" />
        </div>
      </div>
    );
  }
} 

HomePage.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(HomePage);