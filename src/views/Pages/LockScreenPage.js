import React, { Component } from "react";
import Avatar from "react-avatar";

import { NavLink, Link } from "react-router-dom";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Container,
  Col,
  Table,
  Row,
  Form,
  FormCheck,
  ProgressBar,
  Spinner
} from "react-bootstrap";
import axios from "axios";

import uploadHeader from "services/upload-header";
import PropTypes from "prop-types";
import AdminNavbar from "components/Navbars/ChatNavbar.js";
import Switch from 'react-bootstrap-switch';
import Chatbar from "components/Sidebar/Chat.js";
import userService from "services/user.service";
import AuthService from "services/auth.service";
import Match from "server/Match";
import eventBus from "views/eventBus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Countdown from "react-countdown";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import {
  setAvatar,
  getColor,
  getIcon,
  renderer,
  getQueryVariable,
  getCode
} from "components/include";
import { UPLOADURL,POSTURLTest } from "const";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


var firstLoad = true;

const API_URL_TEST = POSTURLTest;
class LockScreenPage extends Component {
  constructor(props) {
    super(props);
    this.handleJoinMatch = this.handleJoinMatch.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleLeaveMatch = this.handleLeaveMatch.bind(this);
    this.handlechangeReadyEvent = this.handlechangeReadyEvent.bind(this);
    this.handlecAlertLost = this.handlecAlertLost.bind(this);
    this.handlecAlertWin = this.handlecAlertWin.bind(this);
    this.fileUpload = React.createRef();
    
    this.setProgress = this.setProgress.bind(this);

    this.handleChatUpload = this.handleChatUpload.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.showFileUpload = this.showFileUpload.bind(this);
    this.state = {
      events: [], //JSON.parse(localStorage.getItem('events')),
      eventid: getQueryVariable("id"),
      curPlayerReady: false,
      progress:0,
      selectedFile: null,
      
      isUpLoading:false,
      progressLable:'I Win',
    };
  }
  
  componentDidMount() {
    Swal.close()
    this._isMounted = true;
    if (this._isMounted) {
      eventBus.on("eventsData", (event) => {
        // console.log("socket events: "+events);

        this.setState({ events: event });
        //console.log("change state: " + this.state.events);
      });
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  setProgress(e) {
    
    this.setState({
      progress: e,
      progressLable:e+'%'
    });
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
  handleJoinMatch(e) {
    e.preventDefault();

    userService.joinEvent(this.state.eventid).then(
      (response) => {
        //this.props.history.push("/panel/dashboard");
      },
      (error) => {}
    );
  }
  handleLoseMatch(e) {
    

    userService.loseEvent(this.state.eventid).then(
      (response) => {
        //this.props.history.push("/panel/dashboard");
      },
      (error) => {}
    );
  }
  handleChatUpload = () => {
   
    this.setState({
          progress:1,
          progressLable:'Uploading...',
      isUpLoading:true
    });
    let uploadInfo = new FormData()
    uploadInfo.append('id', this.state.eventid)
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
          progressLable:'I win',
          isUpLoading:false
        });
        document.documentElement.classList.toggle("nav-open")
      }).catch(error => {
        alert(error.response.data.error);
        this.setState({
          progressLable:'I win',
          isUpLoading:false
        });
     });
  }
  handleDelete(e) {
    e.preventDefault();

    userService.deleteEvent(this.state.eventid).then(
      (response) => {
        this.props.history.push("/panel/dashboard");
      },
      (error) => {}
    );
  }
  handleLeaveMatch(e) {
    e.preventDefault();

    userService.leaveEvent(this.state.eventid).then(
      (response) => {
        //this.props.history.push("/panel/dashboard");
      },
      (error) => {}
    );
  }
  handlechangeReadyEvent(checked) {
    firstLoad = false;
    this.setState({ curPlayerReady: checked })
userService.changeReadyEvent(this.state.eventid).then(
  (response) => {
    //this.props.history.push("/panel/dashboard");
  },
  (error) => {}
);
  }
  handlecAlertLost(checked) {
    const MySwal = withReactContent(Swal)
  
  MySwal.fire({
    title: 'Are you sure? ',
    icon: 'question',
    iconColor:'#FB404B',
    text:'Please confirm your lose.',
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText:
      'Yes, I lost.',
    
    cancelButtonText:
      'Back',
      confirmButtonColor: '#FB404B',
      cancelButtonColor: 'rgba(255, 255, 255,.2)',
  }).then((result) => {
    if (result.isConfirmed) {
      this.handleLoseMatch()
    }
  })
    }
    handlecAlertWin(checked) {
      const MySwal = withReactContent(Swal)
    
    MySwal.fire({
      title: 'Confirm needed',
      text:'Upload a  video to approve  your win.',
      icon:'info',
      iconColor:'#87CB16',
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        'Upload video',
      
      cancelButtonText:
        'Back',
        confirmButtonColor: '#87CB16',
        cancelButtonColor: 'rgba(255, 255, 255,.2)',
    }).then((result) => {
      if (result.isConfirmed) {
        this.fileUpload.current.click();
      }
    })
      }
  render() {
    
    let { progress,isUpLoading,progressLable } = this.state;
    if (!this.state.events.length ){
      userService.getEvents();
      
      return (
<>
      
          <div
            className="full-page lock-page"
            data-color="black"
            style={{ height: "100vh", overflow: "auto" }}
            data-image={require("assets/img/bg.jpg").default}
          >
            <div className="content " style={{fontSize:50,'color':'#fff','position': 'relative',zIndex: '23'}}>
            <Container className="text-center">
            <h4 style={{textAlign: "center"}}>Loading 
      <Spinner animation="grow" size="sm" />
      <Spinner animation="grow" size="sm" />
      <Spinner animation="grow" size="sm" /></h4>
      </Container>
      </div>
      <div
          className="full-page-background"
          style={{
            backgroundImage:
              "url(" +
              require("assets/img/bg.jpg").default +
              ")",
          }}
        ></div>
      </div>
  
      </>
      )
      
      
    }
    
    const currentUser = AuthService.getCurrentUser();
    let { events,eventid } = this.state;
    events = JSON.parse(events);
    
    var nullplayer = {
      id: 100000,
      username: false,
      rank: null,
      winAmount: null,
      ready: false,
    };
    
    var item = events.find((match) => match.id === parseInt(eventid));
    
    if (typeof(item) === 'undefined' ) {
      
      this.props.history.push("/panel/dashboard");
    }
    if (!item.matchTables[0].matchPlayers[1]) {
      item.matchTables[0].matchPlayers.push(nullplayer);
    }
    if (!item.players[1]) {
      item.players.push(nullplayer);
    }
   
    if (!item.winner) {
      
      item.winner = [];
      item.winner.push(nullplayer);
    }
   
    
    var timestamp = item.expire;
    var date = new Date(timestamp);
    
    var now = new Date();
    var dateExpired = date.toISOString();

    var dateNow = now.toISOString();
   
    item.matchTables[0].matchPlayers.sort((a, b) => (a.id > b.id) ? 1 : -1)
    console.log(item.matchTables[0].matchChats)
    var activePlayer = 0;
    return (
      <>
      
        <div className="wrapper">
          <Chatbar eventID={eventid} eventstatus={item.status} masterplayer={item.matchTables[0].matchPlayers[0].username} secondplayer={item.matchTables[0].matchPlayers[1].username} eventchats={item.chats} chats={item.matchTables[0].matchChats } />
          <div className="main-panel">
            <div
              className="full-page lock-page"
              data-color="black"
              style={{ height: "100vh", overflow: "auto" }}
              data-image={require("assets/img/bg.jpg").default}
            >
              <AdminNavbar page="dashboard" />

              <div className="content d-flex align-items-center p-0">
                <Container style={{ marginTop: 50 }}>
                  <Col className="mx-auto" lg="7" md="10">
                    <Card
                      className="card-lock text-center card-plain"
                      style={{ color: "#fff" }}
                    >
                      <Card.Header>
                        <Row>
                          {item.matchTables[0].matchPlayers.map((player, j) => {
                            if(player.username){activePlayer++}
                            if(player.username==currentUser.username && player.ready && !this.state.curPlayerReady  && firstLoad){
                              this.setState({ curPlayerReady: true });
                            }
                            return (
                              <>
                                {j == 1 && (
                                  <Col
                                    xs="4"
                                    style={{
                                      lineHeight: "20px",
                                      color: "#fff",
                                      fontSize: "20px",
                                    }}
                                  >
                                    <Badge variant={getColor(item.amount)}>
                                      ${item.amount}
                                    </Badge>
                                    <h5 style={{ marginTop: 5 }}>
                                      {item.gameName} <br />
                                      <small>{item.gameMode}</small> <br />
                                      <small className="text-muted">
                                        <FontAwesomeIcon
                                          fixedWidth
                                          icon={getIcon(item.gameConsole)}
                                        />{" "}
                                        {item.gameConsole}
                                      </small>
                                    </h5>
                                  </Col>
                                )}
                                {(j == 3 || j == 5) && (
                                  <Col
                                    xs="4"
                                    style={{
                                      lineHeight: "20px",
                                      color: "#fff",
                                      fontSize: "20px",
                                    }}
                                  >
                                    <Badge variant={getColor(item.amount)}>
                                      ${item.amount}
                                    </Badge>
                                    <h4 style={{ marginTop: 5 }}>
                                      {item.game} <br />
                                      <small className="text-muted">
                                        <FontAwesomeIcon
                                          fixedWidth
                                          icon={getIcon(item.gameconsole)}
                                        />{" "}
                                        {item.gameconsole}
                                      </small>
                                    </h4>
                                  </Col>
                                )}
                                <Col
                                  xs="4"
                                  key={j}
                                  style={
                                    !player.username ? { opacity: 0.3 } : null
                                  }
                                >
                                  <div>
                                    {player.username ? (
                                      <Avatar
                                        size="50"
                                        round={true}
                                        title={player.username}
                                        name={setAvatar(player.username)}
                                      />
                                    ) : (
                                      <Avatar
                                        size="50"
                                        round={true}
                                        src="https://graph.facebook.com/100008343750912/picture?width=200&height=200"
                                        color="lightgray"
                                      />
                                    )}
                                  </div>
                                  {!player.username && <>...</>}
                                  <small> {player.username}</small>

                                  {(item.status == "Pending" || item.status == "Ready") && (
                                    <>
                                      <br />
                                      {(item.status != 'Ready' || player.username != currentUser.username) && (
                                        <div style={{position:'absolute',width: '100%',height: 30,zIndex: 3}}></div>
                                      )}
                                      
                                      <div style={
                                    (item.status != 'Ready' || player.username != currentUser.username) ? { opacity: 0.5 } : null
                                  }>
<BootstrapSwitchButton
                                        checked={player.ready}
                                        size="xs"
                                        onlabel="Ready"
                                        onstyle="success"
                                        offlabel="Ready"
                                        onChange={(checked: boolean) => {
                                          
                                          this.handlechangeReadyEvent(checked)
                                      }}
                                        
                                        style="w-100 mx-1"
                                      />
                                  </div>
                                      
                                    </>
                                  )}
                                </Col>
                              </>
                            );
                          })}
                        </Row>
                      </Card.Header>
                      <Card.Body>
                        <Row>
                          <Col xs="12">
                            <h2>{item.status}</h2>
                            {(item.status == "InPlay") && (
                              <>
                              {(item.players[0].username ==
                                  currentUser.username ||
                                item.players[1].username ==
                                  currentUser.username) && (
                              <>
                              <p >Match  Code</p>
                              
                              <Card.Title as="h1" className="matchcode">{getCode('7723')}</Card.Title>
                              <Row>
                          <Col xs="6">
                            <Button
                              className="btn-fill btn-block btn-lg"
                              type="button"
                              variant="danger"
                              style={{position:'relative',zIndex:1}}
                              onClick={this.handlecAlertLost}
                            >
                              I Lost
                            </Button>
                            
                          </Col>
                          
                          <Col xs="6">
                          <input type="file" id="uploadfile" accept="video/*" name="file" className="hide" ref={this.fileUpload} onChange={this.onChangeHandler}/>
                            <Button
                              className="btn-fill btn-block btn-lg"
                              type="button"
                              variant="success"
                              style={{position:'relative',zIndex:1}}
                              onClick={this.handlecAlertWin}
                              
                              disabled={isUpLoading}
                            >
                              {progressLable}
                            </Button>
                            {progress>0 && <div className="prosbar"><ProgressBar variant="success" now={progress} label={''} /></div>}
                          </Col>
                          </Row>
                          </>
                          )}
                          
                              <p>
                                      
                                      <small className="text-muted">
                                        Avalable until
                                      </small>
                                      <br />
                                      <Countdown
                                        renderer={renderer}
                                        date={dateExpired}
                                      />
                                    </p>
                              </>
                            )}
                            {(item.status == "Finished") ? (
                              <>
                            {item.matchTables[0].winner ? (
                              <>
                                <div
                                  className=" winner avatar"
                                  style={{ width: 92, height: 92 }}
                                ></div>
                                <div className=" ">
                                  <Avatar
                                    size="92"
                                    round={true}
                                    title={item.matchTables[0].winner}
                                    name={setAvatar(item.matchTables[0].winner)}
                                  />
                                </div>
                                <h4>{item.matchTables[0].winner} is winner</h4>
                              </>
                            ) : (
                              <>
                            
                                {item.players[0].username ==
                                  currentUser.username ||
                                item.players[1].username ==
                                  currentUser.username ? (
                                  <>
                                    <p>
                                      
                                      <small className="text-muted">
                                        Avalable until
                                      </small>
                                      <br />
                                      <Countdown
                                        renderer={renderer}
                                        date={dateExpired}
                                      />
                                    </p>
                                    {item.players[0].username &&
                                    item.players[1].username ? (
                                      <>
                                        <p
                                          style={{
                                            color: "#fff",
                                            fontSize: "14px",
                                            padding: 20,
                                          }}
                                        >
                                          Waiting for ready...
                                        </p>
                                      </>
                                    ) : (
                                      <>
                                        <p
                                          style={{
                                            color: "#fff",
                                            fontSize: "14px",
                                            padding: 20,
                                          }}
                                        >
                                          Waiting for another player...
                                        </p>
                                      </>
                                    )}
                                    {
                                item.matchTables[0].matchPlayers[0].username !=
                                  currentUser.username && (
                                    <Button
                                      className="btn-round"
                                      onClick={this.handleLeaveMatch}
                                      variant="warning"
                                      disabled={this.state.curPlayerReady}
                                    >
                                      Leave Match
                                    </Button>
                                  )}
                                  </>
                                ) : (
                                  <>
                                    <p>
                                      {" "}
                                      <small className="text-muted">
                                        Avalable until
                                      </small>
                                      <br />
                                      <Countdown
                                        renderer={renderer}
                                        date={dateExpired}
                                      />
                                    </p>
                                    <p
                                      style={{
                                        color: "#fff",
                                        fontSize: "14px",
                                        padding: 20,
                                      }}
                                    >
                                      Match is open, join now before someone
                                      else takes your spot. Winner takes $
                                      {(item.amount * 2 * 90) / 100}, let's get
                                      it! Match open for limited time.
                                    </p>
                                    {parseInt(item.totalPlayer) > activePlayer&& (
                                      <Button
                                      className="btn-round"
                                      onClick={this.handleJoinMatch}
                                      variant="danger"
                                    >
                                      Join Match ${item.amount}
                                    </Button>
                                    )}
                                    
                                  </>
                                )}
                              </>
                            )}
                            </>
                            ):(
                              <>
                              </>
                            )}
                          </Col>
                          <Col className="text-center">
                            {!item.players[1].username && <></>}
                          </Col>
                        </Row>
                      </Card.Body>
                      <Card.Footer>
                        <Card
                          style={{
                            backgroundColor: "black",
                            overflow: "auto",
                            margin: '0 auto',
                            maxWidth:300
                          }}
                        >
                          <Card.Body
                            style={{
                              lineHeight: "10px",
                              overflow: "auto",
                              textAlign: "initial",
                            }}
                          >
                            <img
                          alt={item.gameName}
                         style={{width:'100%'}}
                          src={require("assets/images/games/"+item.gameName+".jpg").default}
                        ></img>
                            <Table
                              striped
                              hover
                              borderless={true}
                              variant="dark"
                            >
                              <tbody>
                                
                                <tr>
                                  <td>Winner takes</td>
                                  <td style={{ textAlign: "right" }}>
                                    ${(item.amount * 2 * 90) / 100}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Mode</td>
                                  <td style={{ textAlign: "right" }}>
                                    {item.gameMode}
                                  </td>
                                </tr>
                                <tr>
                                  <td>Status</td>

                                  <td style={{ textAlign: "right" }}>
                                    {item.status}
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </Card.Body>
                        </Card>
                        {currentUser.roles[0]=='ROLE_ADMIN' && <> <Button
                    className="btn-round"
                   
                    onClick={this.handleDelete}
                    variant="danger"
                  >
                    Delet Match
                    
                  </Button></>}
                       
                      </Card.Footer>
                    </Card>
                  </Col>
                </Container>
              </div>

              <div
                className="full-page-background"
                style={{
                  backgroundImage:
                    "url(" + require("assets/img/bg.jpg").default + ")",
                }}
              ></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default LockScreenPage;
