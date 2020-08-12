import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Link } from 'react-router-dom';
import "./style-sheets/gamepage.css";

import NavBar from "./navbar.component";

const Post = props => (
    <div>
      <div className="post">
        <h2>{props.post.name}</h2>
        <p>{props.post.message}</p>
        <h2>{props.post.name}</h2>
        <p>{props.post.message}</p>
        <h2>{props.post.name}</h2>
        <p>{props.post.message}</p>
        <h2>{props.post.name}</h2>
        <p>{props.post.message}</p>
        <h2>{props.post.name}</h2>
        <p>{props.post.message}</p>
        <h2>{props.post.name}</h2>
        <p>{props.post.message}</p>
        <h2>{props.post.name}</h2>
        <p>{props.post.message}</p>
        <h2>{props.post.name}</h2>
        <p>{props.post.message}</p>
        <h2>{props.post.name}</h2>
        <p>{props.post.message}</p>
        <h2>{props.post.name}</h2>
        <p>{props.post.message}</p>
        <h2>{props.post.name}</h2>
        <p>{props.post.message}</p>
      </div>
    </div>
)

export default class TestPage extends Component{
  constructor(props) {
    super(props);

    this.state = {game: [], posts: []}
  }

  componentDidMount() {
    axios.get('/games/' + this.props.location.id)
      .then(res => {
        this.setState({game: res.data})
        this.getPosts(this.state.game._id);
      })
      .catch((error) => {
        console.log(error);
      })
      
  }

  getPosts(gameId){
    axios.get('/posts/' + gameId)
      .then(res => {
        console.log(res);
        this.setState({posts: res.data});
      })
      .catch((error) => {
        console.log(error);
      })
  }

  createPosts(){
    return this.state.posts.map(currentPost =>{
      return <Post post={currentPost} key={currentPost._id} />
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
                <p style={{color: 'white', marginLeft: '10px'}}>Popular Posts</p>
              </div>
              <div className="popularPosters">
                <p style={{color: 'white', marginLeft: '10px'}}>Popular Posters</p>
              </div>
            </div>
            <div className="middleColumn">
              <h1 style={{color: 'white'}}>Feed</h1>
              {this.createPosts()}
            </div>
            <h1 style={{color: 'white'}}>{this.state.game.name}</h1>
          </div>
        </div>
      </div>
    );
  }
} 