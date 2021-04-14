import React, { Component ,useState } from "react";
import { Link, useLocation, Redirect } from "react-router-dom";
import Avatar, { ConfigProvider } from "react-avatar";
import axios from "axios";

import uploadHeader from "services/upload-header";
import PropTypes from "prop-types";
import AuthService from "services/auth.service";
import { POSTURLTest } from "const";

import eventBus from "views/eventBus";

const API_URL_TEST = POSTURLTest;

import userService from "services/user.service";
import {
  setAvatar,
  printTime,
  getIcon,
  renderer,
  getQueryVariable,
} from "components/include";
// react-bootstrap components
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Collapse,
  Form,
  Alert,
  InputGroup,
  Navbar,
  Nav,
  Pagination,
  Container,
  ProgressBar,
  Row,
  Col,
} from "react-bootstrap";
import { faHourglassEnd } from "@fortawesome/free-solid-svg-icons";


class Chatbar extends Component {
  
  constructor(props) {
    super(props);
    this.changeMessageBox = this.changeMessageBox.bind(this);
    this.fileUpload = React.createRef();
    this.handleChat = this.handleChat.bind(this);
    this.setProgress = this.setProgress.bind(this);

    this.handleChatUpload = this.handleChatUpload.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.showFileUpload = this.showFileUpload.bind(this);
    this.state = {
      messageBox: "",
      selectedFile: null,
      progress:0,
      progressLable:'Upload',
      isUpLoading:false,
      isLoading: false,
      eventID: this.props.eventID,
      eventstatus: this.props.eventstatus,
      chats: this.props.chats,
      eventchats: this.props.eventchats,
      masterplayer: this.props.masterplayer,
      secondplayer: this.props.secondplayer,
    };
  }
  
  componentWillReceiveProps(newProps) {
    this.setState({ eventchats: newProps.eventchats });
    this.setState({ chats: newProps.chats });
    this.setState({ eventstatus: newProps.eventstatus });
    this.setState({ masterplayer: newProps.masterplayer });
    this.setState({ secondplayer: newProps.secondplayer });
    
  }
  changeMessageBox(e) {
    console.log(e.target.value)
    this.setState({
      messageBox: e.target.value,
    });
  }
  setProgress(e) {
    
    this.setState({
      progress: e,
      progressLable:e+'%'
    });
  }
  handleChat(e) {
    e.preventDefault();
    if(this.state.messageBox==''){return false}
this.setState({
          
          isLoading:true
        });
    userService.sendChat(this.state.messageBox, this.state.eventID).then(
      (response) => {
        this.setState({
          messageBox: "",
          isLoading:false
        });
      },
      (error) => {
        alert(error.message)
        this.setState({
         
          isLoading:false
        });
      }
    );
  }
  showFileUpload() {
    this.fileUpload.current.click();
  }
  onChangeHandler=event=>{
    this.setState({
      selectedFile: this.fileUpload.current.files[0],
      
    })
    
    setTimeout(() =>{this.handleChatUpload()},500)
    
  }
  
  handleChatUpload = () => {
   
    this.setState({
          progress:1,
          progressLable:'Uploading...',
      isUpLoading:true
    });
    let uploadInfo = new FormData()
    uploadInfo.append('id', this.state.eventID)
    uploadInfo.append('file', this.state.selectedFile)
    console.log(uploadInfo)
    axios
      .post(
        API_URL_TEST + "uploadFile",
        uploadInfo,
        { headers:uploadHeader(),
          onUploadProgress: data => {
          //Set the progress value to show the progress bar
          this.setProgress(Math.round((100 * data.loaded) / data.total))
        }}
      )
      .then((response) => {
        this.setState({
          progress: 0,
          progressLable:'Upload',
          isUpLoading:false
        });
      }).catch(error => {
        alert(error.response.data.error);
        this.setState({
          progressLable:'Upload',
          isUpLoading:false
        });
     });
  }
  render() {
    const currentUser = AuthService.getCurrentUser();
    let { chats, eventchats, masterplayer, eventstatus,secondplayer,isLoading,progress,isUpLoading,progressLable } = this.state;
    // this is for the rest of the collapses
    var finalChat = []
    {chats.map((item, i) => {
      finalChat.push(item)
    })}
    {eventchats.map((item, i) => {
      finalChat.push(item)
    })}
    
    // this creates the intial state of this component based on the collapse routes
    // that it gets through routes prop

    finalChat.sort((a, b) => ((a.time <= b.time) ? 1 : -1));
    finalChat.sort((a, b) => ((a.time <= b.time) ? 1 : -1));
    

    return (
      <>
      
        <div
          className="sidebar"
          data-color="black"
          style={{ zIndex: 15, height: "100vh" }}
        >
          <div className="sidebar-wrapper" style={{ padding: 0 }}>
            <Card
              className="card-lock card-plain card-chat"
              style={{ color: "#fff", margin: 0, height: "90vh" }}
            >
              <Card.Header>
                <Link to={"/panel/dashboard"}  onClick={() =>
      document.documentElement.classList.toggle("nav-open")
    }>Back</Link>
                <h4 style={{ margin: "10px 0px" }}>Match Lobby</h4>
                <h4 style={{ margin: "10px 0px" }}>{currentUser.username}</h4>
              </Card.Header>
              <Card.Body
                style={{
                  display: "flex",
                  height: "75vh",
                  padding: 10,
                  overflow: "hidden",
                  paddingBottom: 0,
                }}
              >
                <Card
                  style={{
                    backgroundColor: "black",
                    width: "100vh",
                    overflow: "auto",
                    margin: 0,
                  }}
                >
                  <Card.Body
                    style={{ padding: 10, paddingBottom: 50, overflow: "auto" }}
                  >
                    <p className="l-quote quote alertmsg alert-primary  hide">
                      <Avatar
                        className="chatavatar"
                        size="25"
                        round={true}
                        src={require("assets/img/logo.svg").default}
                      />
                      Match Finished.
                      <small>
                        <small
                          className="chatdate"
                          style={{ display: "block", textAlign: "center" }}
                        >
                          21:6:43
                        </small>
                      </small>
                    </p>
                    {finalChat.map((item, i) => {
                      var timestamp = item.time;
                      var date = new Date(timestamp);

                      var dateExpired = date.toISOString();
                      var today = new Date(dateExpired),
                        dateExpired = 
                          today.getHours() +
                          ":" +
                          today.getMinutes() +
                          ":" +
                          today.getSeconds();
                          var classChat = "sys-quote text-center text-muted"
                          if (item.message.indexOf(' is  ready ')>-1){classChat = "sys-quote text-center text-success"}
                          if (item.message.indexOf(' join ')>-1 ){classChat = "sys-quote text-center text-info"}
                          if (item.message.indexOf(' leave ')>-1 ){classChat = "sys-quote text-center text-warning"}
                          if (item.message.indexOf(' not ready')>-1 ){classChat = "sys-quote text-center text-danger"}
                      return (
                        <>
                        
                          
                            {(item.mode == "CHAT" && (masterplayer == item.username || secondplayer == item.username)) ? (
                              <>
                              <p
                            key={i}
                            className={
                              masterplayer != item.username
                                ? "l-quote quote right"
                                : "l-quote quote "
                            }
                          >
                                
                            <small className="text-warning">{item.username}</small><br/>
                            <div className="text-justify">
                                <small>
                                
                                  
                                    {item.message}
                                  
                                </small>
                                </div>
                                <Avatar
                                  size="25"
                                  className="chatavatar"
                                  round={true}
                                  title={item.username}
                                  name={setAvatar(item.username)}
                                  style={
                                    masterplayer != item.username
                                      ? { right: 5 }
                                      : { left: 5 }
                                  }
                                />
                                <div
                              className="chatdate"
                            
                            >
                              {dateExpired}
                            </div>
                                </p>
                              </>
                            ):(
                              <>
                              {(item.mode != "SYSTEM" && item.mode != "ALERT" && item.mode != "FILE") &&  (
                              <p
                            key={i}
                            className={classChat}
                            
                              style={{opacity:.7}}
                            >
                              <Avatar
                                  size="25"
                                  className="chatavatar"
                                  round={true}
                                  title={item.username}
                                  name={setAvatar(item.username)}
                                  style={
                                    masterplayer != item.username
                                      ? { right: 5 }
                                      : { left: 5 }
                                  }
                                />
                                   <div
                              className="chatdate float"
                              
                            >
                            {dateExpired}
                            </div>
                            <div className="text-muted text-left">{item.username}: </div>
                                <small>
                                 
                                  <div  className="text-justify" style={{color:'#fff',maxHeight:50,overflow:'auto'}}>{item.message}</div>
                                  </small>
                                  
                         
                                  
                                  </p>
                              )}
                              
                              </>
                            )}
                            {item.mode == "SYSTEM" &&  (
                              <>
                              
                              <p
                            key={i}
                            className={classChat}
                            style={(masterplayer != item.username && secondplayer != item.username) ? ({opacity:.5}):({opacity:1})}
                            >
                              <Avatar
                                  size="25"
                                  className="chatavatar"
                                  round={true}
                                  title={item.username}
                                  name={setAvatar(item.username)}
                                  style={
                                    masterplayer != item.username
                                      ? { right: 5 }
                                      : { left: 5 }
                                  }
                                />
                                 <small>
                                    {item.message}
                                    </small>
                                  <div
                              className="chatdate"
                            
                            >
                              {dateExpired}
                            </div>
                                  </p>
                              </>

                            )}
                            {item.mode == "ALERT" &&  (
                              <>
                              
                              <p
                            key={i}
                            className="sys-quote alertmsg text-center alert-primary ">
                           
                             
                                    {item.message}
                         
                                  <div
                              className="chatdate"
                            
                            >
                              {dateExpired}
                            </div>
                            </p>
                              </>

                            )}
                            {item.mode == "FILE" && (
                                  <>
                                  <p
                            key={i}
                            className={
                              masterplayer != item.username
                                ? "l-quote quote right"
                                : "l-quote quote "
                            }
                          >
                                
                            <small className="text-warning">{item.username} uploaded.</small><br/>
                            <video preload="none" controls>
                                      <source
                                      
                                        src={item.message}
                                        type="video/mp4"
                                      />
                                    </video>
                                <Avatar
                                  size="25"
                                  className="chatavatar"
                                  round={true}
                                  title={item.username}
                                  name={setAvatar(item.username)}
                                  style={
                                    masterplayer != item.username
                                      ? { right: 5 }
                                      : { left: 5 }
                                  }
                                />
                                <div
                              className="chatdate"
                            
                            >
                              {dateExpired}
                            </div>
                                </p>
                                   
                                  </>
                                )}
                           
                          
                        </>
                      );
                    })}
                    
                  </Card.Body>
                </Card>
              </Card.Body>
              <Card.Footer style={{ padding: 10 }}>
                <Card style={{ backgroundColor: "#222", margin: 0 }}>
                  <Card.Body style={{ padding: 10 }}>
                    <Form
                      onSubmit={this.handleChat}
                      ref={(c) => {
                        this.form = c;
                      }}
                      
                    >
                      <Form.Group>
                        <Form.Control
                          placeholder="type something..."
                          value={this.state.messageBox}
                          onChange={this.changeMessageBox}
                        ></Form.Control>
                      </Form.Group>
                      <Row>
                        <Col>
                          <Button
                            className="btn-fill btn-block btn-sm"
                            type="submit"
                            variant="danger"
                            disabled={isLoading}
                          >
                            Send
                          </Button>
                        </Col>
                        {(eventstatus == "InPlay" && (masterplayer == currentUser.username || secondplayer == currentUser.username)) && (
                          <Col>
                          <input type="file" id="uploadfile" accept="video/*" name="file" className="hide" ref={this.fileUpload} onChange={this.onChangeHandler}/>
                            <Button
                              className="btn-fill btn-block btn-sm"
                              type="button"
                              variant="warning"
                              style={{position:'relative',zIndex:1}}
                              onClick={this.showFileUpload}
                              disabled={isUpLoading}
                            >
                              {progressLable}
                            </Button>
                            {progress>0 && <div className="prosbar"><ProgressBar variant="warning" now={progress} label={''} /></div>}
                          </Col>
                        )}
                      </Row>
                    </Form>
                  </Card.Body>
                </Card>
              </Card.Footer>
            </Card>
          </div>
          <div className="sidebar-background"></div>
        </div>
        
      </>
    );
  }
}

export default Chatbar;
