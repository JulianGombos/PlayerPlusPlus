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
        <p style={{fontSize: "14px", color: "#c9c4c2", marginLeft: "10px",marginBottom: "-8px", paddingTop: "10px"}}>{props.post.replyCount} Replies</p>
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
          <div className="dropdown">
            <button className="dropdown-toggle optionsButton" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              ...
            </button>
            <div className="dropdown-menu dropdown-menu-right optionsDropdown" aria-labelledby="dropdownMenuButton">
              <div>
                <button className="deleteReply dropdown-item"
                  onClick={() => {
                    axios.delete('/replies/delete/' + props.reply._id)
                      .then();

                    const updatedPost = {
                      name: props.postInfo.name,
                      message: props.postInfo.message,
                      game: props.postInfo.game,
                      replyCount: Number(props.postInfo.replyCount) - 1,
                      platform: props.postInfo.platform
                    }
  
                    axios.post('/posts/update/' + props.postInfo._id, updatedPost)
                      .then(res => {
                        console.log("Post updated");
                        window.location.reload(true);
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }}
                  style={{display: props.reply.name == props.loggedInUser ? 'block' : 'none'}}>Delete Reply</button>
                <div className="noOptions" style={{display: props.reply.name == props.loggedInUser ? 'none' : 'block'}}>No Options</div>
              </div>
            </div>
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
    var id = this.props.location.id == undefined ? this.state.postId : this.props.location.id;
    axios.get('/posts/getpost/' + id)
      .then(res => {
        this.setPostId(id);
        this.setPostInfo(res.data);
        this.getReplies(res.data._id);
        var postComp = <Post post={res.data} key={res.data._id} />
        this.setState({postComp: postComp});
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
      })
      .catch((error) => {
        console.log(error);
      });

    const updatedPost = {
      name: this.state.postInfo.name,
      message: this.state.postInfo.message,
      game: this.state.postInfo.game,
      replyCount: Number(this.state.postInfo.replyCount) + 1,
      platform: this.state.postInfo.platform
    }

    axios.post('/posts/update/' + this.state.postInfo._id, updatedPost)
      .then(res => {
        console.log("Post updated");
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({replyContent: ""});
    window.location.reload(true);
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

  setPostId(postId) {
    localStorage.setItem('PostId', postId);
    this.setState({postId: postId});
  }

  createReplies(){
    return this.state.replies.map(currentReply =>{
      return <Reply reply={currentReply} loggedInUser={this.props.auth.user.name} postInfo={this.state.postInfo} key={currentReply._id} />
    })
  }

  getInitialState() {
    /* var postInfo = JSON.parse(localStorage.getItem('PostInfo')) || [];
    var replies = JSON.parse(localStorage.getItem('Replies')) || [];
    var replyContent = "";
    var postComp = <Post post={postInfo} replyCount={replies.length} key={postInfo._id} /> */
    var postId = localStorage.getItem('PostId') || [];

    return {
      postComp: '',
      postInfo: '',
      replies: [],
      replyContent: '',
      postId: postId
    };
  }
 
  render(){
    return(
      <div>
        <div className="modal fade" id="replyModal" tabIndex="-1" aria-labelledby="replyModalLabel" aria-hidden="true">
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