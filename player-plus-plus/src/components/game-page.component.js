import React, { Component } from 'react';
import axios from 'axios';
import "./style-sheets/gamepage.css";
import NavBar from "./navbar.component";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LazyLoad from 'react-lazy-load';

const Post = props => (
    <div>
      <LazyLoad onContentVisible={() => console.log('lazyloaded!')}>
        <div className="post">
          <div className="postHeader">
            <div className="headerCircle"></div>
            <div className="posterName">
              {props.post.name}
              <br></br>
              <div className="postDate">{props.post.date.split("T")[0]}</div>
            </div>
          </div>
          <div className="contentBox">
            <div className="contentText">{props.post.message}</div>
          </div>
        </div>
      </LazyLoad>
    </div>
)

class GamePage extends Component{
  constructor(props) {
    super(props);

    /* this.state = {
      game: [],
      posts: [],
      postContent: "",
      id: this.props.location.id
    } */
    this.state = this.getInitialState();
  }

  componentDidMount() {
    axios.get('/games/' + this.props.location.id)
      .then(res => {
        this.setSavedGame(res.data);
        //this.setState({game: res.data})
        this.getPosts(this.state.game._id);
      })
      .catch((error) => {
        console.log(error);
      })
      
      console.log(this.props);
  }

  onSubmit = e => {
    e.preventDefault();

    const newPost = {
      name: this.props.auth.user.name,
      message: this.state.postContent,
      game: this.state.game._id
    };

    axios.post('/posts/post', newPost)
      .then(res => {
        console.log(res);
        this.getPosts();
      })

    this.setState({postContent: ""});
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  getPosts(gameId){
    axios.get('/posts/' + this.state.game._id)
      .then(res => {
        this.setSavedPosts(res.data.reverse());
        //this.setState({posts: res.data.reverse()});
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  getInitialState() {
    var game = JSON.parse(localStorage.getItem('Game')) || [];
    var posts = JSON.parse(localStorage.getItem('Posts')) || [];
    var postContent = "";
    var id = localStorage.getItem('Id') || this.props.location.id;

    return {
      game: game,
      posts: posts,
      postContent: postContent,
      id: id
    };
  }

  setSavedGame(game) {
    localStorage.setItem('Game', JSON.stringify(game));
    this.setState({game: game});
  }

  setSavedPosts(posts) {
    localStorage.setItem('Posts', JSON.stringify(posts));
    this.setState({posts: posts});
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
                <div style={{display: this.props.auth.isAuthenticated ? 'block' : 'none'}}>
                  <div className="createPost">
                    <div className="postHeader">
                      <div className="headerCircle"></div>
                      <div className="createPostName">
                        {this.props.auth.user.name}
                      </div>
                    </div>
                    <div className="contentBox">
                      <form noValidate onSubmit={this.onSubmit}>
                        <div className="postBar">
                          <input
                            onChange={this.onChange}
                            value={this.state.postContent}
                            id="postContent"
                            style={{color: "white"}}
                            placeholder="Create a Post Here"
                          />
                        </div>
                        <div className="col s12" style={{ paddingLeft: "10px", paddingTop: "5px" }}>
                          <button type="submit">Submit Post</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              <div className="feed">
                {this.createPosts()}
              </div>
            </div>
            <div className="leftColumn">
            <h1 style={{color: 'white', position: 'fixed'}}>{this.state.game.name}</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GamePage.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(GamePage);