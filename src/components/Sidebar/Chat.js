import React, { Component ,useState } from "react";
import { Link, useLocation, Redirect } from "react-router-dom";
import Avatar, { ConfigProvider } from "react-avatar";
import axios from "axios";

import uploadHeader from "services/upload-header";
import PropTypes from "prop-types";
import AuthService from "services/auth.service";
import { UPLOADURL,POSTURLTest } from "const";

import eventBus from "views/eventBus";



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
  
  Row,
  Col,
} from "react-bootstrap";
import { faHourglassEnd } from "@fortawesome/free-solid-svg-icons";


class Chatbar extends Component {
  
  constructor(props) {
    super(props);
    this.changeMessageBox = this.changeMessageBox.bind(this);
    this.handleChat = this.handleChat.bind(this);
    
    
    this.state = {
      messageBox: "",
      
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
    console.log('Props updated')
  }
  changeMessageBox(e) {
    console.log(e.target.value)
    this.setState({
      messageBox: e.target.value,
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
  
  
  
  render() {
    const currentUser = AuthService.getCurrentUser();
    let { chats, eventchats, masterplayer, eventstatus,secondplayer,isLoading } = this.state;
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

    finalChat.sort((a, b) => ((a.time < b.time) ? 1 : -1));
    
    

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
              style={{ color: "#fff", margin: 0, height: "100vh" }}
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
                          var classAlert = "alert-primary"
                          var classChat = "sys-quote text-center text-muted"
                          if (item.message.indexOf(' is  ready ')>-1){classChat = "sys-quote text-center text-success"}
                          if (item.message.indexOf(' join ')>-1 ){classChat = "sys-quote text-center text-info"}
                          if (item.message.indexOf(' leave ')>-1 ){classChat = "sys-quote text-center text-warning"}
                          if (item.message.indexOf(' not ready')>-1 ){classChat = "sys-quote text-center text-danger"}
                          if (item.message.indexOf(' accepted')>-1 ){classChat = "sys-quote text-center text-danger"}
                          if (item.message.indexOf(' Finished')>-1 ){classAlert = "alert-danger"}
                      return (
                        <>
                        
                          
                            {(item.mode == "CHAT" && (masterplayer == item.username || secondplayer == item.username)) ? (
                              <>
                             
                              <div
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
                                </div>
                              </>
                            ):(
                              <>
                              {(item.mode != "SYSTEM" && item.mode != "ALERT" && item.mode != "FILE") &&  (
                              <div
                            key={i}
                            className={classChat}
                            
                              style={{opacity:.7}}
                            >
                              <Avatar
                                  size="15"
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
                            <div style={{padding: 4}}>
                            <div className="text-warning text-left">{item.username}: </div>
                                <small>
                                 
                                  <div  className="text-justify" style={{color:'#fff',maxHeight:50,overflow:'auto'}}>{item.message}</div>
                                  </small>
                                  
                                  </div>
                                  
                                  </div>
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
                                  size="15"
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
                            className={classAlert+" sys-quote alertmsg text-center  "}>
                           
                             
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
                        
                           {i == finalChat.length-1 &&  (
                              <>
                              
                              <p
                            key={i}
                            className="sys-quote alertmsg text-center alert-danger ">
                           
                             
                                    Match Created.
                         
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
