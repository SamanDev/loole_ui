import React, { Component } from "react";
import Avatar from "react-avatar";

import { NavLink, Link } from "react-router-dom";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { faInstagram,faTwitch, faYoutube,faTwitter } from '@fortawesome/free-brands-svg-icons'
import CurrencyFormat from 'react-currency-format';
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Container,
  Pagination,
  Col,
  Table,
  Row,
  Form,
  FormCheck,
  ProgressBar,
  ListGroup,
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
import League from "server/league";
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
  getCode,
  getGroupBadge,
  getModalTag,
  getGameTag
} from "components/include";
import { UPLOADURL,POSTURLTest } from "const";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


var firstLoad = true;

const API_URL_TEST = POSTURLTest;
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
class LockScreenPage extends Component {
  constructor(props) {
    super(props);
    this.handleJoinMatch = this.handleJoinMatch.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleLeaveMatch = this.handleLeaveMatch.bind(this);
    this.handlechangeReadyEvent = this.handlechangeReadyEvent.bind(this);
    this.handlecAlertLost = this.handlecAlertLost.bind(this);
    this.handlecAlertWin = this.handlecAlertWin.bind(this);
    this.handleClashFinished = this.handleClashFinished.bind(this);
    this.handleHowStream = this.handleHowStream.bind(this);
    this.fileUpload = React.createRef();
    
    this.setProgress = this.setProgress.bind(this);

    this.handleChatUpload = this.handleChatUpload.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.showFileUpload = this.showFileUpload.bind(this);
    this.state = {
      events: userService.getCurrentEvent(),
      currentUserTag: AuthService.getCurrentUserTest(),
      tag:'R0P0C8R89',
      eventid: getQueryVariable("id"),
      curPlayerReady: false,
      progress:0,
      selectedFile: null,
      isloading: false,
      isUpLoading:false,
      progressLable:'I Win',
      league: League
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
  handleHowStream(e) {
    e.preventDefault();
   
  Swal.fire({
    title: 'How to Stream',
    html: `<div class="card-plain card text-left" >
          <ol><li><b>Join Tournament</b>
          <p>
          Click the Join Tournament button above to participate in the event.</p></li>
          <li><b>Connect Twitch          </b>
          <p>
          Go to your profile and connect Twitch account to Loole.gg</p></li>
          <li><b>Start Streaming          </b>
          <p>
          If you've joined the event and connected your Twitch, just start streaming and that's it!</p></li>
          </ol>
   
          
          `,
    icon:"question",
    showConfirmButton: false,
    showCancelButton: true,
    confirmButtonText: `Go to Cashier`,
    canceleButtonText: `Back`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      this.props.history.push("/panel/cashier");
    }
  })
  }
  handleJoinMatch(e) {
    e.preventDefault();
    this.setState({
      isloading: true,
    });
    userService.joinEvent(this.state.eventid).then(
      
      (response) => {
        this.setState({
          isloading: false,
        });
        if (response=='Join event successful'){
          
          
          Toast.fire({
            icon: 'success',
            title: 'Joined.'
          })
        }else{
          
          if (response=='balanceError'){
          var resMessage = "To enter this event you need to have more balance!"
  Swal.fire({
    title: 'Error!',
    text:resMessage,
    icon:"error",
    showCancelButton: true,
    confirmButtonText: `Go to Cashier`,
    canceleButtonText: `Back`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      this.props.history.push("/panel/cashier");
    }
  })
        }else if (response=='tagError'){
          const resetPw = async () => {
            const swalval = await Swal.fire(getModalTag(this.state.GameName));
  
            let v = (swalval && swalval.value) || swalval.dismiss;
            console.log(swalval);
            if (v) {
              if (v.tagid) {
                var tags = v.tagid.split("@@");
                if(tags.length==0){
                  if (tags[0] != "") {
                    this.setState({
                      GameTag: v.tagid,
                    });
                    console.log(this.state);
                    this.handleSaveTags();
                  }
                }
                if(tags.length==1){
                  if (tags[0] != "" && tags[1] != "") {
                    this.setState({
                      GameTag: v.tagid,
                    });
                    console.log(this.state);
                    this.handleSaveTags();
                  }
                }
                //setformdata(swalval);
                
              }
            }
          };
  
          resetPw();
        }
      }
      },
      (error) => {
        const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
                Swal.fire("", resMessage, "error");
      }
    );
  }
  handleClashFinished(e) {
    this.setState({
      isloading: true,
    });
    userService
        .saveTags(
         
          'ClashRoyale',
          'finish',
          this.state.tag,
          this.state.eventid,
  
        ).then(
      (response) => {
        this.setState({
          isloading: false,
        });
        //this.props.history.push("/panel/dashboard");
      },
      (error) => {}
    );
  }
  handleLoseMatch(e) {
    
    this.setState({
      isloading: true,
    });
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
          progressLable:'0%',
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
    this.setState({
      isloading: true,
    });
    userService.leaveEvent(this.state.eventid).then(
      (response) => {
        if (response=='Leave event successful'){
          this.setState({
            isloading: false,
          });
          
          Toast.fire({
            icon: 'success',
            title: 'UnJoined.'
          })
        }
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
    if (response=='changeReadyEvent successful'){
          
          
      Toast.fire({
        icon: 'success',
        title: 'Updated.'
      })
    }
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
    customClass:'dark',
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
      customClass:'dark',
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
    
    var currentUser = AuthService.getCurrentUser();
    let { events,eventid } = this.state;
    events = JSON.parse(events);
    var icEnd = 0;
    var icStart = 0;
    var icStartL = 0;
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
   
    function addDays(date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }
    var timestamp = item.expire;
    var date = new Date(timestamp);
    
    var now = new Date();
    var dateExpired = date.toISOString();
    var dateExpiredTest = addDays(date.toISOString(),2);
    var dateExpiredTest2 = addDays(date.toISOString(),4);
    var dateExpiredTest3 = addDays(date.toISOString(),5);

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
                {(item.gameMode == "League") ? (
                  <Col className="mx-auto" lg="10" md="11">
                    <Card
                      className="card-lock text-center card-plain card-league"
                      style={{ color: "#fff" }}
                    >
                      <Card.Header>
                        <Row>
                        <Col
                                  xs="12"  
                                    style={{
                                      lineHeight: "20px",
                                      color: "#fff",
                                      fontSize: "20px",
                                    }}
                                  >
                                   
                                 
  {getGroupBadge('dollar',item.amount,'')}
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
                                    <VerticalTimeline layout="1-column-left" className="hide2">
                                    <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
    
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    
  >
    <img
                      alt={item.gameName}
                     style={{maxWidth:'60%',marginBottom:15}}
                      src={require("assets/images/games/"+item.gameName+".jpg").default}
                    ></img>
    <h3 className="vertical-timeline-element-title">Registration Open</h3>
    <h4 className="vertical-timeline-element-subtitle"><Countdown
                                        renderer={renderer}
                                        date={dateExpiredTest}
                                      /></h4>
    
    <small style={{marginBottom: 15,display: 'block',fontSize:13}}>
    Score Update: 
Every 60 minutes
    <br/>
    Total Score:
Top 10 games
<br/>
    Regions:
All Regions
<br/>
Servers:
All Servers
    </small>
    <ProgressBar animated variant="warning" now={45} style={{marginLeft:'auto',marginRight:'auto',maxWidth:'70%'}}  />
    <Button
                                      className="btn-round"
                                      onClick={this.handleJoinMatch}
                                      variant="danger"
                                      disabled={this.state.isloading}
                                    >
                                      Join Match ${item.amount}
                                    </Button>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    contentStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(233, 30, 99)' }}
  
    iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
    
  >
    <h3 className="vertical-timeline-element-title">Results Tracking</h3>
    <h4 className="vertical-timeline-element-subtitle"><Countdown
                                        renderer={renderer}
                                        date={dateExpiredTest2}
                                      /></h4>
    
    <ListGroup>
  <ListGroup.Item>Kills <Badge variant="primary">x 20 Points</Badge></ListGroup.Item>
  <ListGroup.Item>Damage Done
 <Badge variant="primary">x 0.06 Points</Badge></ListGroup.Item>
  <ListGroup.Item>Time Played
 <Badge variant="primary">x 0.04 Points</Badge></ListGroup.Item>
  <ListGroup.Item>1st Place
 <Badge variant="primary">+ 240 Points</Badge></ListGroup.Item>
  <ListGroup.Item>2nd or 3rd Place
 <Badge variant="primary">+ 60 Points</Badge></ListGroup.Item>
  <ListGroup.Item>4th to 8th Place
+ <Badge variant="primary">+ 20 Points</Badge></ListGroup.Item>
  
</ListGroup>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    contentStyle={{ background: '#7209b7', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid #7209b7' }}
   
    iconStyle={{ background: '#7209b7', color: '#fff' }}
    
  >
    <h3 className="vertical-timeline-element-title">Watch Live</h3>
    <p><FontAwesomeIcon  icon={faTwitch} style={{color: '#fff',fontSize:40}} />
    
    </p>
    <h5>Nobody is currently live</h5>
<p>
By connecting your Twitch account you will automatically be shown on the Watch Live pages of the tournaments you are playing in</p>

<Button
                                      className="btn-round"
                                      onClick={this.handleHowStream}
                                      variant="danger"
                                      disabled={this.state.isloading}
                                    >
                                      How to Stream
                                    </Button>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    contentStyle={{ background: '#2a9d8f', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid #2a9d8f' }}
   
    iconStyle={{ background: '#2a9d8f', color: '#fff' }}
    
  >
    <h3 className="vertical-timeline-element-title">Payment Pending</h3>
    <h4 className="vertical-timeline-element-subtitle"><Countdown
                                        renderer={renderer}
                                        date={dateExpiredTest3}
                                      /></h4>
                                      <div style={{height:230,overflow:'auto'}}>
    <ListGroup>
    {this.state.league.current_brackets.map((item, i) => {
         icStart = icStart + 1;
         icEnd=icEnd+parseInt(item.number);
         var icShow = '#'+icStart;
         if (icStart!=icEnd){
           icShow = icShow + ' - #'+icEnd;
           icStart = icEnd;
         }
         if (icStart<=2005){

         
         return (

          <ListGroup.Item >
           <span style={{fontSize:20}}> {icShow}</span>
            <Badge variant="warning"><img
                            alt={"loole dollar"}
                           style={{width:16}}
                            src={"/assets/images/dollar.svg"}
                          ></img><CurrencyFormat value={item.prize} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => <span className="lable">{value}</span>} />
                          </Badge>
          </ListGroup.Item>
         )
         }
     }
     )
   }
  
  
</ListGroup>
</div>

  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    contentStyle={{ background: '#e76f51', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid #e76f51' }}
  
    iconStyle={{ background: '#e76f51', color: '#fff' }}
    
  >
    <h3 className="vertical-timeline-element-title">Finished &amp; Paid</h3>
    <h4 className="vertical-timeline-element-subtitle"><Countdown
                                        renderer={renderer}
                                        date={dateExpiredTest3}
                                      /></h4>
                                      <div style={{height:280,overflow:'auto'}}>
                                      <Table striped hover variant="dark">
                                      <thead>
    <tr>
      <th>#</th>
      <th>Username</th>
      <th>Average Score</th>
    </tr>
  </thead>
  <tbody>
  {this.state.league.entries.map((item, i) => {
         icStartL = icStartL + 1;
         if (icStartL<=225){
         return (
    <tr>
      <td>#{icStartL}</td>
      <td style={{textAlign:'left'}}><Avatar
                                        size="20"
                                        round={true}
                                        title={item.user_game_region.username}
                                        name={setAvatar(item.user_game_region.username)}
                                      /> {item.user_game_region.username}
                                       <ListGroup horizontal style={{display:'inline-flex',marginTop:0,lineHeight:'20px',float:'right'}}>
  <ListGroup.Item action><FontAwesomeIcon  icon={faInstagram} style={{color: '#e95950'}}/></ListGroup.Item>
  <ListGroup.Item action><FontAwesomeIcon  icon={faTwitch} style={{color: '#6441a5'}} /></ListGroup.Item>
  <ListGroup.Item action><FontAwesomeIcon  icon={faYoutube} style={{color: '#FF0000'}}/></ListGroup.Item>
  <ListGroup.Item action><FontAwesomeIcon  icon={faTwitter} style={{color: '#00acee'}} /></ListGroup.Item>
</ListGroup>
                                      </td>
      <td>{item.score}</td>
     
    </tr>
    )
  }
}
)
}
  </tbody>
</Table>
</div>
    <ListGroup>
    {this.state.league.entries.map((item, i) => {
         icStartL = icStartL + 1;
         if (icStartL<=5){
         return (

          <ListGroup.Item>
            <ListGroup horizontal>
  <ListGroup.Item>{icStart}</ListGroup.Item>
  <ListGroup.Item><Avatar
                                        size="30"
                                        round={true}
                                        title={item.user_game_region.username}
                                        name={setAvatar(item.user_game_region.username)}
                                      />
                                      {item.user_game_region.username}</ListGroup.Item>
  <ListGroup.Item>{item.score}</ListGroup.Item>
  
</ListGroup>
          </ListGroup.Item>
         )
         }
     }
     )
   }
  
  
</ListGroup>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    contentStyle={{ background: '#264653', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid #264653' }}
    date="{dateExpiredTest2}"
    iconStyle={{ background: '#264653', color: '#fff' }}
    
  >
    <h3 className="vertical-timeline-element-title">League Rules</h3>
    
                                    <p>Refer to the tournament details to see what game modes are tracked</p><p>Smurfing (creating a new account to compete with) will result in an immediate and permanent ban from <span data-ignore='true'>loole.gg</span> and all winnings will be forfeited.</p><p>You must play the minimum number of games in order to get paid out in a tournament. The minimum number of games to play is the same as the number of games we count for your score, which can be found in the Tournament Details.</p>
  </VerticalTimelineElement>
  
</VerticalTimeline>

                                    
                                  </Col>
                                
                      
                        </Row>
                      </Card.Header>
                     
                    </Card>
                  </Col>
                ):(<Col className="mx-auto" lg="7" md="10">
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
                               
                             
{getGroupBadge('dollar',item.amount,'')}
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
                              <p>---------</p>
                              {getGameTag(item.gameName,this.state.currentUserTag.userTags)}
                              <small><a href="https://link.clashroyale.com/?playerInfo?id=GPGPCQCP">{player.username}</a></small>
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
                        {(item.gameName == "ClashRoyale" && item.status == "InPlay") ? (
                          <>
                          <Button
                          className="btn-fill btn-block btn-lg"
                          type="button"
                          variant="danger"
                          style={{position:'relative',zIndex:1}}
                          onClick={this.handleClashFinished}
                          disabled={this.state.isloading}
                        >
                          Game finished
                        </Button>
                          </>
                        ):(
                          <>
                          {(item.players[0].username ==
                              currentUser.username ||
                            item.players[1].username ==
                              currentUser.username) && (
                          <>
                          {(item.status == "InPlay") && (
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
                      {(item.status == "InPlay") && (
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
                                </>
                      )}
                          </>
                        )}
                          </>
                        )}
                          
                        {(item.status !== "") ? (
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
                        {(item.status == 'Pending' || item.status == 'Ready') && (
                          <>
                            {(item.players[0].username ==
                              currentUser.username ||
                            item.players[1].username ==
                              currentUser.username) ? (
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
                                item.players[1].username && item.status == 'Ready' ? (
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
                                  disabled={this.state.isloading}
                                >
                                  Leave Match
                                </Button>
                              )}
                              </>
                            ) : (
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
                                {parseInt(item.totalPlayer) > activePlayer && (
                                  <Button
                                  className="btn-round"
                                  onClick={this.handleJoinMatch}
                                  variant="danger"
                                  disabled={this.state.isloading}
                                >
                                  Join Match ${item.amount}
                                </Button>
                                )}
                                
                              </>
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
            )}
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
