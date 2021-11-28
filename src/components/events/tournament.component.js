import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from "react-select";
import Avatar from "react-avatar";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { NavLink, Link } from "react-router-dom";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {
  faInstagram,
  faTwitch,
  faYoutube,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import Moment from 'moment';
import CurrencyFormat from "react-currency-format";
import { IMaskInput } from "react-imask";
import {  withRouter} from 'react-router-dom';
import $ from "jquery";
import AuthService from "services/auth.service";
import userService from "services/user.service";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import eventBus from "views/eventBus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Countdown from "react-countdown";
import uploadHeader from "services/upload-header";
import PropTypes from "prop-types";
import axios from "axios";
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
    
    ProgressBar,
    ListGroup,
    Spinner,
    Accordion,
  } from "react-bootstrap";
  import {
    setAvatar,
    getColor,
    getIcon,
    renderer,
    getQueryVariable,
    getCode,
    getGroupBadge,
    getGroupBadgeList,
    getGroupBadgePrice,
    getModalTag,
    getGameTag,
    getMatchTitle,
    haveGameTag,
    getPlayerTag,
    isJson,
    haveAdmin,
    handleTagForm
  } from "components/include";
  import { UPLOADURL, POSTURLTest } from "const";
  
  
  var firstLoad = true;
  var isLoading = true;
  
  const API_URL_TEST = POSTURLTest;
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  var isInPlayers = false;
  var matchidFind = []
  var lists = [];
  var item = false;
  var expiryDate = new Date();
  var dateStart = null;
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
              var mymatchFind = null;
              var matchLevelFind =null
              var isJoin = false;
     
class TournamentSection extends Component {
  constructor(props) {
    super(props);
    this.showDetails = this.showDetails.bind(this);
    this.handleJoinMatch = this.handleJoinMatch.bind(this);
    this.handleLeaveMatch = this.handleLeaveMatch.bind(this);
    this.handlechangeReadyEvent = this.handlechangeReadyEvent.bind(this);
    this.handlecAlertLost = this.handlecAlertLost.bind(this);
    this.handleHowStream = this.handleHowStream.bind(this);
    this.handleClashFinished = this.handleClashFinished.bind(this);
    this.setProgress = this.setProgress.bind(this);
    this.fileUpload = React.createRef();
    this.state = {
        eventid: getQueryVariable("id"),
        matchid: getQueryVariable("matchid"),
        item : this.props.item,
    currentUser : this.props.token,
        curPlayerReady: false,
        progress: 0,
        selectedFile: null,
        matchidFind: this.props.item.matchTables[0],
        isloading: this.props.isLoading,
        isUpLoading: false,
        progressLable: "I Win",
      successful: false,
      loading: false,
      message: ""
    };
  }
  componentWillReceiveProps(newProps) {
    
       
    this.setState({ currentUser: newProps.token });
    this.setState({ item: newProps.item });
    this.setState({ matchidFind: newProps.item.matchTables[0] });
    this.setState({ isloading:false });
    
  }
  handleHowStream(e) {
    e.preventDefault();

    Swal.fire({
      title: "How to Stream",
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
      icon: "question",
      showConfirmButton: false,
      showCancelButton: true,
      confirmButtonText: `Go to Cashier`,
      canceleButtonText: `Back`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.props.history.push("/panel/cashier");
      }
    });
  }
  handleClashFinished(e) {
    this.setState({
      isloading: true,
    });
    userService
      .saveTags("ClashRoyale", "finish", this.state.tag, this.state.eventid)
      .then(
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
    if(this.state.matchid){
      userService.loseEvent(this.state.eventid,this.state.matchid).then(
        (response) => {
          //this.reGetevents();
          
          //this.props.history.push("/panel/dashboard");
        },
        (error) => {}
      );
    }else{
      userService.loseEvent(this.state.eventid).then(
        (response) => {
          //this.reGetevents();
          //this.props.history.push("/panel/dashboard");
        },
        (error) => {}
      );
    }

    
  }
  handleChatUpload = () => {
    this.setState({
      progress: 1,
      progressLable: "0%",
      isUpLoading: true,
    });
    let uploadInfo = new FormData();
    uploadInfo.append("id", this.state.eventid);
    if(this.state.matchid){uploadInfo.append("idMatch", this.state.matchid);}
    uploadInfo.append("file", this.state.selectedFile);
    
    //console.log(uploadInfo);
    axios
      .post(API_URL_TEST + "uploadFile", uploadInfo, {
        headers: uploadHeader(),
        onUploadProgress: (data) => {
          //Set the progress value to show the progress bar
          this.setProgress(Math.round((100 * data.loaded) / data.total));
        },
      })
      .then((response) => {
        this.setState({
          progress: 0,
          progressLable: "I win",
          isUpLoading: false,
        });
        document.documentElement.classList.toggle("nav-open");
      })
      .catch((error) => {
        alert(error.response.data.error);
        this.setState({
          progressLable: "I win",
          isUpLoading: false,
        });
      });
  };
  setProgress(e) {
    this.setState({
      progress: e,
      progressLable: e + "%",
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
        if (response.indexOf("successful") > -1) {
          this.setState({
            isloading: false,
          });
         // this.reGetevents();
          Toast.fire({
            icon: "success",
            title: "UnJoined.",
          });
        }
        //this.props.history.push("/panel/dashboard");
      },
      (error) => {}
    );
  }
  handlechangeReadyEvent(checked) {
    //firstLoad = false;
    this.setState({
      isloading: true,
    });
    //this.setState({ curPlayerReady: checked });
    userService.changeReadyEvent(this.state.eventid).then(
      (response) => {
        if (response == "changeReadyEvent successful") {
          Toast.fire({
            icon: "success",
            title: "Updated.",
          });
          
          //this.reGetevents();
        }
        //this.props.history.push("/panel/dashboard");
      },
      (error) => {}
    );
  }
  handlecAlertLost(checked) {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
      title: "Are you sure? ",
      icon: "question",
      iconColor: "#FB404B",
      text: "Please confirm your lose.",
      customClass: "dark",
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Yes, I lost.",

      cancelButtonText: "Back",
      confirmButtonColor: "#FB404B",
      cancelButtonColor: "rgba(255, 255, 255,.2)",
    }).then((result) => {
      if (result.isConfirmed) {
        this.handleLoseMatch();
      }
    });
  }
  
  handlecAlertWin(checked) {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
      title: "Confirm needed",
      text: "Upload a  video to approve  your win.",
      icon: "info",
      iconColor: "#87CB16",
      customClass: "dark",
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Upload video",

      cancelButtonText: "Back",
      confirmButtonColor: "#87CB16",
      cancelButtonColor: "rgba(255, 255, 255,.2)",
    }).then((result) => {
      if (result.isConfirmed) {
        this.fileUpload.current.click();
      }
    });
  }
  showFileUpload() {
    this.fileUpload.current.click();
  }
  onChangeHandler = (event) => {
    this.setState({
      selectedFile: this.fileUpload.current.files[0],
    });

    setTimeout(() => {
      this.handleChatUpload();
    }, 500);
  };
  showDetails(player){
    $('.gdetails').addClass('hide');
    $('.gdetails.no'+player).removeClass('hide');
    
      }
  handleJoinMatch(e) {
    e.preventDefault();
    this.setState({
      isloading: true,
    });
    userService.joinEvent(this.state.item.id).then(
      (response) => {
      
        //alert(response)
        if (response.indexOf("successful") > -1) {
          //this.reGetevents();
          Toast.fire({
            icon: "success",
            title: "Joined.",
          });
          
          
        } else {
          this.setState({
            isloading: true,
          });
          if (response == "balanceError") {
            var resMessage =
              "To enter this event you need to have more balance!";
            Swal.fire({
              title: "Error!",
              text: resMessage,
              icon: "error",
              showCancelButton: true,
              confirmButtonText: `Go to Cashier`,
              canceleButtonText: `Back`,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                this.state.history.push("/panel/cashier");
              }
            });
          } else if (response == "tagError") {
            handleTagForm(this.state.item.gameName,this.state.item.gameConsole,this.state.currentUser)
           
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
  

  render() {
    let { currentUser, item,progress, isUpLoading, progressLable,matchidFind } = this.state;
   var  lists = item.matchTables;
   if((item.status=='InPlay' || item.status=='Pending' || item.status=='Ready') && item.gameMode=='Tournament'){
    lists.map((tblmatch, w) => {
      if(tblmatch.status=='InPlay' || tblmatch.status=='Pending' || tblmatch.status=='Ready'){
        if(!matchLevelFind){matchLevelFind = tblmatch;}
      }
      if(tblmatch.status!='Finished' && (tblmatch.matchPlayers[0].username==currentUser.username || tblmatch.matchPlayers[1].username==currentUser.username)){
        mymatchFind = tblmatch;
      }
    }

    )
    
      //matchidFind = lists.filter( (list) => list.id === );
    }
    var activePlayer = 0; 
    return (
      <>
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
                                  {getGroupBadge(item.inSign, item.amount, "")}
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
                                  {getGroupBadgePrice(item.outSign, item.prize , "")}
                                  <small>
                                    {item.players.map((user, z) => (
                                      <span key={z}>
                                        {currentUser.username ==
                                          user.username && (isJoin = true)}
                                        {z < 5 ? (
                                          <>
                                            {z < 4 ? (
                                              <Avatar
                                                size="25"
                                                title={user.username}
                                                round={true}
                                                name={setAvatar(user.username)}
                                              />
                                            ) : (
                                              <Avatar
                                                size="25"
                                                round={true}
                                                value={
                                                  "+" +
                                                  (item.players.length - 4)
                                                }
                                                color="gray"
                                              />
                                            )}
                                          </>
                                        ) : null}

                                      </span>
                                    ))}
                                  </small>
                                  {item.status == 'Pending' ? (
                                    <>
                                  <small
                                        style={{
                                          marginTop: 10,
                                          marginBottom: 10,
                                          display: "block",
                                          fontSize: 20,
                                        }}
                                      >
                                        {item.players.length}/{item.totalPlayer}
                                      </small>
                                      <ProgressBar
                                        animated
                                        variant="danger"
                                        now={
                                          (item.players.length /
                                            item.totalPlayer) *
                                          100
                                        }
                                        style={{
                                          marginLeft: "auto",
                                          marginRight: "auto",
                                          maxWidth: "50%",
                                        }}
                                      />
                                      </>
                                  ):(
                                    <small
                                        style={{
                                          marginTop: 10,
                                          marginBottom: 10,
                                          display: "block",
                                          fontSize: 20,
                                        }}
                                      >
                                        {item.status}
                                        {matchLevelFind && (
                                          <>
                                          <small
                                        style={{
                                          marginTop: 10,
                                          marginBottom: 10,
                                          display: "block",
                                          fontSize: 30,
                                        }}
                                      >
{getMatchTitle(matchLevelFind.level,item.totalPlayer)}
</small>
</>
                                        )}
                                        
                                      </small>
                                    
                                  )}
                                  <VerticalTimeline
                                    layout="1-column-left"
                                    className="hide2"
                                    style={{
                                      marginLeft: "-30px",
                                      marginRight: "-30px",
                                      width: "110%",
                                    }}
                                  >
                                    <VerticalTimelineElement
                                      className="vertical-timeline-element--work"
                                      contentStyle={{
                                        background: "rgb(33, 150, 243)",
                                        color: "#fff",
                                      }}
                                      contentArrowStyle={{
                                        borderRight:
                                          "7px solid  rgb(33, 150, 243)",
                                      }}
                                      iconStyle={{
                                        background: "rgb(33, 150, 243)",
                                        color: "#fff",
                                      }}
                                    >
                                      <img
                                        alt={item.gameName}
                                        style={{
                                          maxWidth: "60%",
                                          marginBottom: 15,
                                        }}
                                        src={
                                          require("assets/images/games/" +
                                            item.gameName +
                                            ".jpg").default
                                        }
                                      ></img>
                                      
                                      
                                      {!isJoin && item.totalPlayer > item.players.length ? (
                                        <>
                                        <h3 className="vertical-timeline-element-title">
                                      <Countdown
                                          renderer={renderer}
                                          date={item.expire}
                                        />
                                        
                                      </h3>
                                        <h4 className="vertical-timeline-element-subtitle"  style={{paddingBottom:0}}>
                                        <Button
                                          className="btn-roun2d"
                                          onClick={this.handleJoinMatch}
                                          variant="danger"
                                          disabled={this.state.isloading}
                                        >
                                          <b>Join Tournament</b><br/> {item.inSign.replace('Dollar','$')} <CurrencyFormat value={item.amount} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => <span >{value}</span>} />
                                        </Button>
                                        </h4>
                                        </>
                                      ):(
                                        <>
                                        {mymatchFind && (
                                          <>
                                          <h3 className="vertical-timeline-element-title">
                                      <Countdown
                                          renderer={renderer}
                                          date={mymatchFind.startTime}
                                        />
                                        
                                      </h3>
                                          <h4 className="vertical-timeline-element-subtitle"  style={{paddingBottom:0}}>
                                            <Link to={'/panel/matchlobby?id='+item.id+'&matchid='+mymatchFind.id}>
                                          <Button
                                            className="btn-roun2d"
                                            
                                            variant="warning"
                                            
                                          >
                                            <b>Open My Match</b>
                                          </Button>
                                          </Link>
                                          </h4>
                                          </>
                                        )}
                                        </>
                                      )}
                                      

                                      
                                      
                                    </VerticalTimelineElement>

                                    <VerticalTimelineElement
                                      className="vertical-timeline-element--education"
                                      contentStyle={{
                                        background: "#7209b7",
                                        color: "#fff",
                                      }}
                                      contentArrowStyle={{
                                        borderRight: "7px solid #7209b7",
                                      }}
                                      iconStyle={{
                                        background: "#7209b7",
                                        color: "#fff",
                                      }}
                                    >
                                      <h3 className="vertical-timeline-element-title">
                                        Watch Live
                                      </h3>
                                      <p>
                                        <FontAwesomeIcon
                                          icon={faTwitch}
                                          style={{
                                            color: "#fff",
                                            fontSize: 40,
                                          }}
                                        />
                                      </p>
                                      <h5>Nobody is currently live</h5>
                                      <p>
                                        By connecting your Twitch account you
                                        will automatically be shown on the Watch
                                        Live pages of the tournaments you are
                                        playing in
                                      </p>
                                      <br />
                                      <Button
                                        className="btn-round"
                                        onClick={this.handleHowStream}
                                        variant="warning"
                                        disabled={this.state.isloading}
                                      >
                                        How to Stream
                                      </Button>
                                    </VerticalTimelineElement>
                                    <VerticalTimelineElement
                                      className="vertical-timeline-element--education  my-list"
                                      contentStyle={{
                                        background: "#222",
                                        color: "#fff",
                                      }}
                                      contentArrowStyle={{
                                        borderRight: "7px solid #222",
                                      }}
                                      iconStyle={{
                                        background: "#222",
                                        color: "#fff",
                                      }}
                                    >
                                      <h3 className="vertical-timeline-element-title">
                                        Matches
                                      </h3>
                                      <Accordion >
                                        {item.matchLevel.map((match, i) => {
                                          //console.log(match)
                                          
                                          
                                          //lists.matchPlayers.sort((a, b) => (a.id > b.id ? 1 : -1));
                                            var hatchbackCar = lists.filter( (list) => list.level === item.matchLevel[i].level);
                                            hatchbackCar.sort((a, b) => (a.id > b.id ? 1 : -1));
                                            
                                          //console.log(hatchbackCar)
                                          return (
                                           
                                            <Card
                                              className="card-lock text-center card-plain"
                                              style={{ color: "#fff" }}
                                              key={i}
                                            >
                                              <Card.Header>
                                                
                                                <Accordion.Toggle
                                                  as={Button}
                                                  variant="link"
                                                  eventkey={i}
                                                >
                                                  <Card.Title
                                                    as="h3"
                                                    style={{ color: "#fff" }}
                                                  >
                                                    {getMatchTitle(hatchbackCar[0].level,item.totalPlayer)}
                                                  </Card.Title>
                                                  <Countdown
                                                    renderer={renderer}
                                                    date={hatchbackCar[0].startTime}
                                                  />
                                                </Accordion.Toggle>
                                              </Card.Header>
                                              <Accordion.Collapse
                                                eventkey={i}
                                                className="show"
                                              >
                                                <Card.Body
                                                  style={{
                                                    background: "rgba(0,0,0,.9",
                                                    padding: 0,
                                                    fontSize: 13,
                                                  }}
                                                >
                                                  {
                                                  
                                                  hatchbackCar.map(
                                                    (mtch, z) => {
                                                      var avSize = 30;
                                                      var avT = getMatchTitle(hatchbackCar[0].level,item.totalPlayer);
                                                      if (avT == 'SemiFinal') {
                                                        avSize = 40;
                                                      }
                                                      if (avT == 'Final') {
                                                        avSize = 60;
                                                      }
                                                      if (avT == '3rd Place') {
                                                        avSize = 50;
                                                      }
                                                      return (
                                                        <>
                                                         <Link key={z} onClick={() =>(this.props.passedFunction(mtch.id))} to={'/panel/matchlobby?id='+item.id+'&matchid='+mtch.id}>
                                                          <Row
                                                          
                                                            
                                                            style={{
                                                              borderBottom:
                                                                "1px rgba(255,255,255,.2) solid",
                                                              paddingBottom: 10,
                                                              paddingTop: 15,
                                                            }}
                                                          >
                                                            {mtch.matchPlayers.map(
                                                              (player, j) => {
                                                                var pName  = player.username;
                                                              
                                                                return (
                                                                  <>
                                                                    <Col
                                                                      xs="4"
                                                                      key={j}
                                                                      style={
                                                                        !pName
                                                                          ? {
                                                                              opacity: 0.3,
                                                                            }
                                                                          : null
                                                                      }
                                                                    >
                                                                      <div>
                                                                        {pName ? (
                                                                          <Avatar
                                                                            size={
                                                                              avSize
                                                                            }
                                                                            round={
                                                                              true
                                                                            }
                                                                            title={
                                                                              pName
                                                                            }
                                                                            name={setAvatar(
                                                                              pName
                                                                            )}
                                                                          />
                                                                        ) : (
                                                                          <Avatar
                                                                            size={
                                                                              avSize
                                                                            }
                                                                            round={
                                                                              true
                                                                            }
                                                                            src="https://graph.facebook.com/100008343750912/picture?width=200&height=200"
                                                                            color="lightgray"
                                                                          />
                                                                        )}
                                                                      </div>
                                                                      {!pName && (
                                                                        <>...</>
                                                                      )}
                                                                      <small>
                                                                        {" "}
                                                                        {
                                                                          pName
                                                                        }
                                                                      </small>
                                                                    </Col>
                                                                    {j == 0 && (
                                                                      <Col
                                                                        xs="4"
                                                                        key={j+item.totalPlayer/2}
                                                                      >
                                                                        {mtch.winner ? (
                                                                          <>
                                                                            <div
                                                                              className=" winner avatar"
                                                                              style={{
                                                                                width:
                                                                                  avSize,
                                                                                height:
                                                                                  avSize,
                                                                                zIndex: 0,
                                                                                backgroundColor:
                                                                                  "transparent",
                                                                              }}
                                                                            ></div>
                                                                            <div className=" ">
                                                                              <Avatar
                                                                                size={
                                                                                  avSize
                                                                                }
                                                                                round={
                                                                                  true
                                                                                }
                                                                                title={
                                                                                  mtch.winner
                                                                                }
                                                                                name={setAvatar(
                                                                                  mtch.winner
                                                                                )}
                                                                              />
                                                                            </div>
                                                                            <div>
                                                                              {
                                                                                mtch.winner
                                                                              }{" "}
                                                                              is
                                                                              winner
                                                                            </div>
                                                                          </>
                                                                        ):(
                                                                          <>
                                                                            
                                                                            
                                                                            <div style={{lineHeight:avSize +'px'}}>
                                                                              {
                                                                                mtch.status}
                                                                              
                                                                            </div>
                                                                          </>
                                                                        )}
                                                                      </Col>
                                                                    )}
                                                                  </>
                                                                );
                                                              }
                                                            )}
                                                          </Row>
                                                          </Link>
                                                        </>
                                                      );
                                                    }
                                                  )}
                                                </Card.Body>
                                              </Accordion.Collapse>
                                            </Card>
                                          );
                                        })}
                                      </Accordion>
                                    </VerticalTimelineElement>

                                    
                                    <VerticalTimelineElement
                                  className="vertical-timeline-element--education  my-list"
                                  contentStyle={{
                                    background: "#2a9d8f",
                                    color: "#fff",
                                  }}
                                  contentArrowStyle={{
                                    borderRight: "7px solid #2a9d8f",
                                  }}
                                  iconStyle={{
                                    background: "#2a9d8f",
                                    color: "#fff",
                                  }}
                                >
                                  <h3 className="vertical-timeline-element-title">
                                    Prizes
                                    <div style={{position:'relative',zIndex:1,margin:20}}>
                                    {getGroupBadgePrice(item.outSign, item.prize , "")}
                                    </div>
                                  </h3>
                                  
                                  <div
                                    style={{ maxHeight: 230, overflow: "auto" }}
                                  >
                                    <ListGroup>
                                      {item.current_brackets.map(
                                        (win, i) => {
                                          icStart = icStart + 1;
                                          icEnd = icEnd + parseInt(win.number);
                                          var icShow = "#" + icStart;
                                          if (icStart != icEnd) {
                                            icShow = icShow + " - #" + icEnd;
                                            icStart = icEnd;
                                          }
                                          if (icStart <= 2005) {
                                            return (
                                              <ListGroup.Item>
                                                <span style={{ fontSize: 17 }}>
                                                  {" "}
                                                  {icShow} <small> - %{win.percent}</small>
                                                </span>
                                                {getGroupBadgeList(item.inSign,win.prize,'badgegroup')}
                                                
                                               
                                              </ListGroup.Item>
                                            );
                                          }
                                        }
                                      )}
                                    </ListGroup>
                                  </div>
                                </VerticalTimelineElement>
                                    <VerticalTimelineElement
                                      className="vertical-timeline-element--education"
                                      contentStyle={{
                                        background: "#264653",
                                        color: "#fff",
                                      }}
                                      contentArrowStyle={{
                                        borderRight: "7px solid #264653",
                                      }}
                                      iconStyle={{
                                        background: "#264653",
                                        color: "#fff",
                                      }}
                                    >
                                      <h3 className="vertical-timeline-element-title">
                                        Tournament Rules
                                      </h3>
                                      <p id="jsonhtml"></p>
                                      <span id="jsonhtml2" className="hide">
                                        {" "}
                                        {item.rules}
                                      </span>
                                    </VerticalTimelineElement>
                                  </VerticalTimeline>
                                </Col>
                              </Row>
                            </Card.Header>
                            <Card.Body></Card.Body>
                          </Card>
                        </Col>
        </>
    );
  }
}

export default withRouter(TournamentSection) ;