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
          <button type="button" data-toggle="modal" data-target="#replyModal" className="replyButton">Reply</button>
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

    this.state = this.getInitialState();
  }

  componentDidMount(){
    window.scrollTo(0,0);
    axios.get('/posts/getpost/' + this.props.location.id)
      .then(res => {
        var postComp = <Post post={res.data} key={res.data._id} />
        this.setState({postComp: postComp});
        this.setPostInfo(res.data);
        this.getReplies(res.data._id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmitReply = e => {
    e.preventDefault();

    const newReply = {
      name: this.props.auth.user.name,
      message: this.state.replyContent,
      game: this.state.postInfo.game,
      postId: this.state.postInfo._id
    };

    axios.post('/replies/reply', newReply)
      .then(res => {
        this.getReplies(this.state.postInfo._id);
      });
      
    this.setState({replyContent: ""});
  };

  getReplies(postId){
    axios.get('/replies/' + postId)
    .then(res => {
      console.log("Replies:" + res.data);
      this.setReplies(res.data.reverse());
    })
    .catch((error) => {
      console.log(error);
    });
  }

  setPostComp(post) {
    console.log("In setPostComp: " + post);
    localStorage.setItem('PostComp', JSON.stringify(post));
    this.setState({postComp: post});
  }

  setPostInfo(postInfo) {
    localStorage.setItem('PostInfo', JSON.stringify(postInfo));
    this.setState({postInfo: postInfo});

  }

  setReplies(replies) {
    localStorage.setItem('Replies', JSON.stringify(replies));
    this.setState({replies: replies});
  }

  createReplies(){
    return this.state.replies.map(currentReply =>{
      return <Reply reply={currentReply} key={currentReply._id} />
    })
  }

  getInitialState() {
    var postInfo = JSON.parse(localStorage.getItem('PostInfo')) || [];
    var replies = JSON.parse(localStorage.getItem('Replies')) || [];
    var replyContent = "";
    var postComp = <Post post={postInfo} key={postInfo._id} />
    /* var postComp = [];
    var postInfo = [];
    var replies = [];
    var replyContent = ""; */

    return {
      postComp: postComp,
      postInfo: postInfo,
      replies: replies,
      replyContent: replyContent
    };
  }
 
  render(){
    return(
      <div>
        <div className="modal fade" id="replyModal" tabindex="-1" aria-labelledby="replyModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <form noValidate onSubmit={this.onSubmitReply}>
            <div className="modal-content" style={{backgroundColor: "#262525"}}>
              <div className="modal-header">
                <h5 className="modal-title" id="replyModalLabel" style={{marginLeft: "167px", color: "white"}}>Write a Reply</h5>
              </div>
              <div className="modal-body" style={{color: "white"}}>
                <textarea
                  className="form-control"
                  aria-label="ReplyBox" 
                  placeholder="Write a reply..."
                  onChange={this.onChange}
                  value={this.state.replyContent}
                  id="replyContent"
                  style={{color: "black"}}>
                </textarea>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn closeModalButton" data-dismiss="modal">Close</button>
                <button type="button" className="btn postReplyButton" type="submit">Post Reply</button>
              </div>
            </div>
            </form>
          </div>
        </div>
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