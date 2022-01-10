import React, { Component } from "react";
import Avatar from "react-avatar";



import Swal from 'sweetalert2'
import userService from "services/user.service";
import {
  setAvatar,
} from "components/include";
// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { Input,Comment,Icon } from 'semantic-ui-react'

function getchatTime(date) {
  var today = new Date(date);
  var dateExpired = 
        today.getHours() +
        ":" +
        today.getMinutes() +
        ":" +
        today.getSeconds();
        return dateExpired

}
function getchatClass(message,mode) {
  if(mode =='Alert'){
    var classAlert = "alert-primary"
    if (message.indexOf(' Finished')>-1 ){classAlert = "alert-danger"}
    return classAlert
  }else{
    var classChat = "sys-quote text-center text-muted"
                          if (message.indexOf(' is  ready ')>-1){classChat = "sys-quote text-center text-success"}
                          if (message.indexOf(' join ')>-1 ){classChat = "sys-quote text-center text-muted"}
                          if (message.indexOf(' leave ')>-1 ){classChat = "sys-quote text-center text-warning"}
                          if (message.indexOf(' not ready')>-1 ){classChat = "sys-quote text-center text-danger"}
                          if (message.indexOf(' accepted')>-1 ){classChat = "sys-quote text-center text-danger"}
                          
                          if (message.indexOf(': ')>-1 ){classChat = "alert-warning sys-quote text-center"}
        return classChat
  }
  
                          

}
function mycreateChats(finalChat,masterplayer,secondplayer,matchid,onUpdateItem) {
  const listItems = finalChat.map((item, i) => (
 
    <Comment
          key={i.toString()}
         >
          
          {(item.mode == "CHAT" && (masterplayer == item.username || secondplayer == item.username)) ? (
                          <>
                         
                          <div
                        
                        className={
                          masterplayer != item.username
                            ? "l-quote quote right"
                            : "l-quote quote "
                        }
                      >
                            
                        <small className="text-warning" style={{textTransform: 'uppercase'}}>{item.username}</small><br/>
                        <div className="text-justify" style={{paddingBottom:10}}>
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
                          {getchatTime(item.time)}
                        </div>
                            </div>
                          </>
                        ):(
                          <>
                          {(item.mode != "SYSTEM" && item.mode != "ALERT" && item.mode != "FILE") &&  (
                          <div
                        
                        className={getchatClass(item.message,'Chat')}
                        
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
                        {getchatTime(item.time)}
                        </div>
                        <div style={{padding: 4}}>
                        
                            <small>
                            <div className="text-warning text-left" style={{textTransform: 'uppercase'}}>{item.username}: </div>
                              <div  className="text-justify" style={{color:'#fff',maxHeight:50,overflow:'auto'}}>{item.message}</div>
                              </small>
                              
                              </div>
                              
                              </div>
                          )}
                          
                          </>
                        )}
                        {item.mode == "SYSTEM" &&  (
                          <>
                           
                          <div
                        
                        className={getchatClass(item.message,'Chat')}
                        style={(masterplayer != item.username && secondplayer != item.username) ? ({opacity:.9}):({opacity:1})}
                        >
                          <Avatar
                              size="5"
                              className="chatavatar"
                              round={true}
                              title={item.username}
                              name={setAvatar(item.username)}
                              style={
                                masterplayer != item.username
                                  ? { right: 5,opacity:0 }
                                  : { left: 5,opacity:0 }
                              }
                            />
                            
                             <small>{item.mode}<br/>
                                {item.message}
                                </small>
                              <div
                          className="chatdate"
                        style={{top:-10}}
                        >
                          {getchatTime(item.time)}
                        </div>
                              </div>
                          </>

                        )}
                        {item.mode == "ALERT" &&  (
                          <>
                          
                          <div
                        
                        className={getchatClass(item.message,'Alert')+" sys-quote alertmsg text-center  "}>
                       
                         
                                {item.message}
                     
                              <div
                          className="chatdate"
                        
                        >
                          {getchatTime(item.time)}
                        </div>
                        </div>
                          </>

                        )}
                        {item.mode == "FILE" && (
                              <>
                              <div
                        
                        className={
                          masterplayer != item.username
                            ? "l-quote quote right"
                            : "l-quote quote "
                        }
                      >
                          
                        <small className="text-warning" style={{textTransform: 'uppercase'}}>{item.username} uploaded. </small><br/>
                        <div onClick={()=>{onUpdateItem("openModalVideo", true);onUpdateItem("openModalVideoSRC", item.message)}} style={{padding:'20px 10px',textAlign: 'center',background:'rgba(0,0,0,0.4)'}} >
                        <Icon name='play circle outline' size='huge' color='grey' />
                                 
                                  
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
                          {getchatTime(item.time)}
                        </div>
                            </div>
                               
                              </>
                            )}
                    
                       {i == finalChat.length-1 && !matchid &&  (
                          <>
                          
                          <div
                        
                        className="sys-quote alertmsg text-center alert-danger hide">
                       
                         
                                Match Created.
                     
                              <div
                          className="chatdate"
                        
                        >
                          {getchatTime(item.time)}
                        </div>
                        </div>
                          </>

                        )}
        </Comment>
      
  )  
  );
    
    return <Comment.Group minimal>{listItems}</Comment.Group>
  };
class Chatbar extends Component {
  
  constructor(props) {
    super(props);
    this.changeMessageBox = this.changeMessageBox.bind(this);
    this.handleChat = this.handleChat.bind(this);
    
    
    this.state = {
      messageBox: "",
      
      isLoading: false,
      eventID: this.props.eventID,
      matchID: this.props.matchID,
      eventstatus: this.props.eventstatus,
      chats: this.props.chats,
      eventchats: this.props.eventchats,
      masterplayer: this.props.masterplayer,
      secondplayer: this.props.secondplayer,
      currentUser: this.props.username
    };
  }
  static getDerivedStateFromProps(props, state) {
    // Any time the current user changes,
    // Reset any parts of state that are tied to that user.
    // In this simple example, that's just the email.
    if (props.eventchats !== state.eventchats || props.chats !== state.chats || props.matchID !== state.matchID) {
      return {
        eventID: props.eventID,
        matchID: props.matchID,
        eventstatus: props.eventstatus,
        chats: props.chats,
        eventchats: props.eventchats,
        masterplayer: props.masterplayer,
        secondplayer: props.secondplayer,
        currentUser: props.username
      };
    }
    return null;
  }
  
  changeMessageBox(e) {
    
    this.setState({
      messageBox: e.target.value,
    });
  }
  
  handleChat(e) {
    e.preventDefault();
    if(!this.state.isLoading){
      if(this.state.messageBox==''){return false}
      this.setState({
                
                isLoading:true
              });
              if(this.state.matchID){
                userService.sendChatMatch(this.state.messageBox, this.state.eventID,this.state.matchID).then(
                  (response) => {
                    this.setState({
                      messageBox: "",
                      isLoading:false
                    });
                    const Toast = Swal.mixin({
                      toast: true,
                      position: 'top-end',
                      showConfirmButton: false,
                      timer: 3000,
                      timerProgressBar: true,
                     
                    })
                    
                    Toast.fire({
                      icon: 'success',
                      title: 'Saved.'
                    })
                  },
                  (error) => {
                    alert(error.message)
                    this.setState({
                     
                      isLoading:false
                    });
                  }
                );
              }else{
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
    }
    
    
  }
  
  
  
  render() {
    
    let { chats, eventchats, masterplayer, eventstatus,secondplayer,isLoading,currentUser ,matchID,messageBox,eventID} = this.state;
    // this is for the rest of the collapses
    var finalChat = []
    if(chats!='null'){
      {chats.map((item, i) => {
        finalChat.push(item)
      })}
    }
    if(eventchats!='null'){
    {eventchats.map((item, i) => {
      finalChat.push(item)
    })}
  }
  finalChat.sort((a, b) => ((a.time < b.time) ? 1 : -1));
    // this creates the intial state of this component based on the collapse routes
    // that it gets through routes prop
    
    
    
    
  
                          
    
    return (
      <>
      
            <Card
              className="card-lock card-plain card-chat"
              style={{ color: "#fff", margin: 0, height: "100%",zIndex:10000,background: 'rgb(50,50,50)' }}
            >
              {(eventstatus=='Pending' || eventstatus=='Ready' || eventstatus=='InPlay') &&(
                <Card.Header>
              <Form
                      onSubmit={this.handleChat}
                      
                      ref={(c) => {
                        this.form = c;
                      }}
                      
                    >
                      <Input loading={(currentUser.accessToken != '' && isLoading) && (true)} disabled={(currentUser.accessToken == '' || isLoading) && (true)} fluid value={(messageBox) && (messageBox)} placeholder='type something...' onChange={this.changeMessageBox} />
                      
                      <Row>
                        <Col>
                          <Button
                            className="btn-fill btn-block btn-sm hide"
                            type="submit"
                            variant="danger"
                            disabled={isLoading}
                          >
                            Send
                          </Button>
                        </Col>
                        
                      </Row>
                    </Form>
             
                
              </Card.Header>
              )}
              
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
                    style={{  overflow: "auto" }}
                  >
                   {mycreateChats(finalChat,masterplayer,secondplayer,matchID,this.props.onUpdateItem)}
                    
                    
                  </Card.Body>
                </Card>
              </Card.Body>
              <Card.Footer style={{ padding: 5 }}>
                
              </Card.Footer>
            </Card>
          
      </>
    );
  }
}

export default Chatbar;
