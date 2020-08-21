import React, { Component } from 'react';
import axios from 'axios';
import NavBar from "./navbar.component";
import "./style-sheets/postpage.css"
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Post = props => (
  <div>
    <div className="postPost">
      <div className="postPostHeader">
        <div className="postHeaderCircle">
          <div style={{height: '50px', width: '50px', backgroundImage: `url(${require(`./style-sheets/pics/profilePic.png`)})`}}></div>
        </div>
        <div className="postPosterName">
          {props.post.name}
          <br></br>
          <div className="postPostDate">{props.post.date.split("T")[0]}</div>
        </div>
        <div className="postPlatformIcon" style={{display: props.post.platform == "noPlatform" ? "none" : "block"}}>
          <div style={{height: "25px", width: "25px", backgroundImage: props.post.platform == "noPlatform" ? "url()" : `url(${require(`./style-sheets/pics/PlatformPics/${props.post.platform}.png`)})`}}></div>
        </div>
      </div>
      <div className="postContentBox">
        <div className="postContentText">{props.post.message}</div>
        <hr className="postReplyOptionsDivider"></hr>
        <div className="replyOptions">
          <button type="button" data-toggle="" data-target="" className="postQuickReplyButton">Quick Reply</button>
          <button type="button" data-toggle="modal" data-target="#replyModal" className="postReplyButton">Reply</button>
        </div>
      </div>
    </div>
  </div>
)

const Reply = props => (
  <div>
    <div className="repliesContainter">
      <div className="reply">
        <div className="replyHeader">
          <div className="replyHeaderCircle">
            {/* <div style={{height: '40px', width: '40px', backgroundImage: `url(${require(`./style-sheets/pics/profilePic.png`)})`}}></div> */}
          </div>
          <div className="replyName">
            {props.reply.name}
            <br></br>
            <div className="replyDate">{props.reply.date.split("T")[0]}</div>
          </div>
        </div>
      </div>
      <div className="replyContentBox">
        <div className="replyContentText">{props.reply.message}</div>
      </div>
    </div>
  </div>
)

class PostPage extends Component {
  constructor(props){
    super(props);

    this.state = {postComp: [], postInfo: [], replies: []};
  }

  componentDidMount(){
    axios.get('/posts/getpost/' + this.props.location.id)
      .then(res => {
        var postComp = <Post post={res.data} key={res.data._id} />
        this.setState({postComp: postComp});
        this.setState({postInfo: res.data});
        this.getReplies(res.data._id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getReplies(postId){
    axios.get('/replies/' + postId)
    .then(res => {
      console.log(res.data);
      this.setState({replies: res.data.reverse()});
    })
    .catch((error) => {
      console.log(error);
    });
  }

  createReplies(){
    return this.state.replies.map(currentReply =>{
      return <Reply reply={currentReply} key={currentReply._id} />
    })
  }

  /* getInitialState() {
    var game = JSON.parse(localStorage.getItem('Game')) || [];
    var posts = JSON.parse(localStorage.getItem('Posts')) || [];
    var postContent = "";
    var platform = "noPlatform";
    var id = localStorage.getItem('Id') || this.props.location.id;

    return {
      game: game,
      posts: posts,
      postContent: postContent,
      platform: platform,
      id: id,
    };
  }
 */

  render(){
    return(
      <div>
        <NavBar />
        <div className="page">
          <div className="postFeed">
            {this.state.postComp}
            <div style={{marginTop: "-1px"}}>
              <hr className="postReplyOptionsDivider2"></hr>
              {this.createReplies()}
              <div className="replyFooter"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

PostPage.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(PostPage);