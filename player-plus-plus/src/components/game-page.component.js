import React, { Component } from 'react';
import axios from 'axios';
import "./style-sheets/gamepage.css";

import NavBar from "./navbar.component";

const Post = props => (
    <div>
      <div className="post">
        <div className="postHeader">
          <div className="headerCircle"></div>
          <div className="posterName">
            {props.post.name}
            <br></br>
            <div className="postDate">{props.post.date}</div>
          </div>
        </div>
        <div className="contentBox">
          <div className="contentText">{props.post.message}</div>
        </div>
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
        this.setState({posts: res.data.reverse()});
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