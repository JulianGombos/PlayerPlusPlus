import React, { Component } from 'react';
import axios from 'axios';
import "./style-sheets/gamepage.css";
import NavBar from "./navbar.component";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom';

const Post = props => (
    <div>
      <LazyLoad onContentVisible={() => console.log('lazyloaded!')}>
        <div className="post">
          <div className="postHeader">
            <div className="headerCircle">
              <div style={{height: '50px', width: '50px', backgroundImage: `url(${require(`./style-sheets/pics/profilePic.png`)})`}}></div>
            </div>
            <div className="posterName">
              {props.post.name}
              <br></br>
              <div className="postDate">{props.post.date.split("T")[0]}</div>
            </div>
            <div className="topRightHeaderContainer">
              <div className="platformIcon" style={{display: props.post.platform == "noPlatform" ? "none" : "block"}}>
                <div style={{height: "25px", width: "25px", backgroundImage: props.post.platform == "noPlatform" ? "url()" : `url(${require(`./style-sheets/pics/PlatformPics/${props.post.platform}.png`)})`}}></div>
              </div>
              {/*-------------------------------------------------------------------------------------------------- */}
              <div className="dropdown postOptionsContainer">
              <button className="dropdown-toggle postOptionsButton" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                ...
              </button>
              <div className="dropdown-menu dropdown-menu-right postOptionsDropdown" aria-labelledby="dropdownMenuButton">
                <div>
                  <button className="deletePost dropdown-item"
                    onClick={() => {
                      axios.delete('/replies/delete/postDeleted/' + props.post._id)
                        .then();

                      axios.delete('/posts/delete/' + props.post._id)
                        .then(res => {
                          console.log("Post deleted!");
                          window.location.reload(true);
                        });
                    }}
                    style={{display: props.post.name == props.loggedInUser ? 'block' : 'none'}}>Delete Post</button>
                  <div className="postNoOptions" style={{display: props.post.name == props.loggedInUser ? 'none' : 'block'}}>No Options</div>
                </div>
              </div>
              </div>
            {/*-------------------------------------------------------------------------------------------------- */}
            </div>
          </div>
          <div className="contentBox">
            <div className="contentText">{props.post.message}</div>
            <div className="replyInfo">
              <p style={{fontSize: "14px", color: "#c9c4c2", display: "inline-block", marginLeft: "10px"}}>{props.post.replyCount} Replies</p>
            </div>
            <hr className="replyOptionsDivider"></hr>
            <div className="replyOptions">
              <Link to={{pathname: "/game/viewpost", id: props.post._id}}><p className="viewReplies">View Replies</p></Link>
            </div>
          </div>
        </div>
      </LazyLoad>
    </div>
)

class GamePage extends Component{
  constructor(props) {
    super(props);

    this.state = this.getInitialState();
    console.log(this.state);
  }

  componentDidMount() {
    console.log("In componentDidMount");
    window.scrollTo(0,0);
    var gameId = this.props.location.id == undefined ? this.state.id : this.props.location.id;
    console.log("Game id: " + gameId);
    axios.get('/games/' + gameId)
      .then(res => {
        this.setGameId(gameId);
        this.setSavedGame(res.data);
        this.getPosts(this.state.game._id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setGameId(gameId){
    localStorage.setItem('GameId', gameId);
    this.setState({id: gameId});
  }

  onSubmitPost = e => {
    e.preventDefault();

    const newPost = {
      name: this.props.auth.user.name,
      message: this.state.postContent,
      game: this.state.game._id,
      platform: this.state.platform
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

  getPosts(){
    axios.get('/posts/' + this.state.game._id)
      .then(res => {
        this.setSavedPosts(res.data.reverse());
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  getInitialState() {
    
    /* var game = JSON.parse(localStorage.getItem('Game')) || [];
    var posts = JSON.parse(localStorage.getItem('Posts')) || [];
    var postContent = "";
    var platform = "noPlatform";
    var id = localStorage.getItem('Id') || this.props.location.id;
    var focusPost = []; */
    var game = JSON.parse(localStorage.getItem('Game')) || [];
    var id = localStorage.getItem('GameId') || [];
    console.log("In getInitialState: " + id);

    return {
      game: game,
      posts: [],
      postContent: '',
      platform: "noPlatform",
      id: id,
      focusPost: []
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

  setFocusPost(post){

  }

  createPosts(){
    return this.state.posts.map(currentPost =>{
      return <Post post={currentPost} loggedInUser={this.props.auth.user.name} key={currentPost._id} />
    })
  }

  render() {
    return(
      <div>
        {/*----------------------------------------REPLY MODAL--------------------------------------------------------- */}
        {/*----------------------------------------REPLY MODAL END--------------------------------------------------------- */}
        <div className="background">
          <NavBar />
          <div className="page">
            <div className="pageGrid">
              {/*----------------------------------------LEFT COLUMN--------------------------------------------------------- */}
              <div className="leftColumn">
                {console.log(this.state.game)}
                <div style={{height: '100px', width: '475px', backgroundImage: `url(${require(`./style-sheets/pics/GamePageHeadPics/${this.state.game.gameHeadPicUrl}`)})`, borderRadius: '15px', position: "fixed"}}>
                  <div className="gameTitle">{this.state.game.name}</div>
                </div>
                <div>
                  <button type="button" className="btn btn-lg followButton">Follow This Game</button>
                </div>
                <div className="popularPosts">
                  <p style={{color: 'white', marginLeft: '10px'}}>Popular Posts</p>
                </div>
                <div className="popularPosters">
                  <p style={{color: 'white', marginLeft: '10px'}}>Popular Posters</p>
                </div>
              </div>
              {/*----------------------------------------LEFT COLUMN END--------------------------------------------------------- */}
              {/*----------------------------------------MIDDLE COLUMN--------------------------------------------------------- */}
              <div className="middleColumn">
                {/*----------------------------------------CREATE POST--------------------------------------------------------- */}
                  <div style={{display: this.props.auth.isAuthenticated ? 'block' : 'none'}}>
                    <div className="createPost">
                      <div className="postHeader">
                        <div className="headerCircle">
                          <div style={{height: '50px', width: '50px', backgroundImage: `url(${require(`./style-sheets/pics/profilePic.png`)})`}}></div>
                        </div>
                        <div className="createPostName">
                          {this.props.auth.user.name}
                        </div>
                      </div>
                      <div className="contentBox">
                        <form noValidate onSubmit={this.onSubmitPost}>
                          <div className="postBar">
                            <div className="form-group">
                              <input
                                onChange={this.onChange}
                                value={this.state.postContent}
                                id="postContent"
                                style={{color: "black"}}
                                placeholder="Create a Post Here"
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div style={{paddingBottom: "10px"}}>
                            <div style={{ paddingLeft: "10px", marginTop: "-5px", display: "inline"}}>
                              <button className="btn submitPostButton" type="submit">Submit Post</button>
                            </div>
                            <div style={{display: "inline", marginLeft: "120px"}}>
                              <label for="platform" style={{color: "white"}}>Choose a platform: </label>
                              <select id="platform" value={this.state.platform} onChange={this.onChange}>
                                <option value="noPlatform">No platform</option>
                                <option value="xbox">Xbox</option>
                                <option value="playstation">Playstation</option>
                                <option value="pc">PC</option>
                                <option value="steam">Steam</option>
                              </select> 
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  {/*----------------------------------------CREATE POST END--------------------------------------------------------- */}
                  {/*----------------------------------------FEED--------------------------------------------------------- */}
                <div className="feed">
                  {this.createPosts()}
                  <p style={{color: "#615f5e", marginLeft: "200px", marginTop: "10px"}}>End of feed</p>
                </div>
                {/*----------------------------------------FEED--------------------------------------------------------- */}
              </div>
              {/*----------------------------------------MIDDLE COLUMN END--------------------------------------------------------- */}
              <div className="rightColumn"></div>
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