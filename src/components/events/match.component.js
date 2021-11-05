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
    haveAdmin
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

  function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum / 1000;
  }
   //console.log(item);
  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  function addHoursToDate(date, hours) {
    return new Date(new Date(date).setHours(date.getHours() + hours));
  }
  var isInPlayers = false;
  var matchidFind = []
  var lists = [];
  var item = false;
  var dateExpired = null;
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
      var activePlayer = 0;
class LeagueSection extends Component {
  constructor(props) {
    super(props);
    this.showDetails = this.showDetails.bind(this);
    this.handleJoinMatch = this.handleJoinMatch.bind(this);
    this.handleLeaveMatch = this.handleLeaveMatch.bind(this);
    this.handlechangeReadyEvent = this.handlechangeReadyEvent.bind(this);
    this.handlecAlertLost = this.handlecAlertLost.bind(this);
    this.handlecAlertWin = this.handlecAlertWin.bind(this);
    this.handleClashFinished = this.handleClashFinished.bind(this);
  
    this.state = {
        eventid: getQueryVariable("id"),
        matchid: getQueryVariable("matchid"),
        item : this.props.item,
    currentUser : this.props.token,
        curPlayerReady: false,
        progress: 0,
        selectedFile: null,
        isloading: this.props.isLoading,
        isUpLoading: false,
        progressLable: "I Win",
      successful: false,
      loading: false,
      message: ""
    };
  }
  componentWillReceiveProps(newProps) {
    
       
    console.log('Props updated' + JSON.stringify(newProps.token))
    

    this.setState({ currentUser: newProps.token });
    this.setState({ item: newProps.item });
    this.setState({ isloading: newProps.isLoading });
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
    firstLoad = false;
    this.setState({
      isloading: true,
    });
    this.setState({ curPlayerReady: checked });
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
            this.setSelectedTag(this.state.item.gameName,this.state.item.gameConsole)
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
    let { currentUser, item,progress, isUpLoading, progressLable } = this.state;
       
    console.log(item)
    matchidFind = item.matchTables[0];
    dateStart = item.startTime;
         dateExpired = item.expire;
         activePlayer = 0;
         
    return (
      <>
     <Col className="mx-auto" lg="7" md="10">
                          <Card
                            className="card-lock text-center card-plain card-match"
                            style={{ color: "#fff" }}
                          >
                            <Card.Header>
                              <Row>
                                {
                                
                                matchidFind.matchPlayers.map(
                                  (player, j) => {
                                    if (player.username) {
                                      activePlayer++;
                                    }
                                    if (
                                      player.username == currentUser.username &&
                                      player.ready &&
                                      !this.state.curPlayerReady &&
                                      firstLoad
                                    ) {
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
                                            {getGroupBadge(
                                              item.outSign,
                                              item.amount,
                                              ""
                                            )}
                                            <h5 style={{ marginTop: 5 }}>
                                              {item.gameName} <br />
                                              <small>
                                                {item.gameMode}
                                              </small>{" "}
                                              <br />
                                              <small className="text-muted">
                                                <FontAwesomeIcon
                                                  fixedWidth
                                                  icon={getIcon(
                                                    item.gameConsole
                                                  )}
                                                />{" "}
                                                {item.gameConsole}
                                              </small>
                                            </h5>
                                           
                              {getGroupBadgePrice(item.outSign, item.prize , "")}
                             
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
                                            <Badge
                                              variant={getColor(item.amount)}
                                            >
                                              ${item.amount}
                                            </Badge>
                                            <h4 style={{ marginTop: 5 }}>
                                              {item.game} <br />
                                              <small className="text-muted">
                                                <FontAwesomeIcon
                                                  fixedWidth
                                                  icon={getIcon(
                                                    item.gameconsole
                                                  )}
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
                                            !player.username
                                              ? { opacity: 0.3 }
                                              : null
                                          }
                                        >
                                          <div>
                                            {player.username ? (
                                              <a href={"/user/"+player.username}  target="_blank">
                                              <Avatar
                                                size="50"
                                                round={true}
                                                title={player.username}
                                                name={setAvatar(
                                                  player.username
                                                )}
                                              />
                                              </a>
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
                                          {(!this.state.matchid) && (
                                            <>
                                          {(matchidFind.status == "Pending" ||
                                            matchidFind.status == "Ready") && (
                                            <>
                                              <br />
                                              {(matchidFind.status != "Ready" ||
                                                player.username !=
                                                  currentUser.username) && (
                                                <div
                                                  style={{
                                                    position: "absolute",
                                                    width: "100%",
                                                    height: 30,
                                                    zIndex: 3,
                                                  }}
                                                ></div>
                                              )}

                                              <div
                                                style={
                                                  matchidFind.status != "Ready" ||
                                                  player.username !=
                                                    currentUser.username
                                                    ? { opacity: 0.5 }
                                                    : null
                                                }
                                              >
                                                <BootstrapSwitchButton
                                                  checked={player.ready}
                                                  size="xs"
                                                  onlabel="Ready"
                                                  onstyle="success"
                                                  offlabel="Ready"
                                                  onChange={(
                                                    checked: boolean
                                                  ) => {
                                                    this.handlechangeReadyEvent(
                                                      checked
                                                    );
                                                  }}
                                                  style="w-100 mx-1"
                                                />
                                              </div>
                                            </>
                                          )}
                                          </>
                                          )}
                                          {(player.username && matchidFind.status=='InPlay') && (
                                            <>
                                          {(isInPlayers) && (
                                            <>
                                          <div>---------</div>

                                          <p><small className="text-muted">{getPlayerTag(player.username,item.players,'console',item.gameName)} ID</small><br/>{getPlayerTag(player.username,item.players,'tagid',item.gameName)}</p>
                                          {(getPlayerTag(player.username,item.players,'nickname',item.gameName).length > 3) &&(
                                            <p><small className="text-muted">Nickname</small><br/>{getPlayerTag(player.username,item.players,'nickname',item.gameName)}</p>
                                          )}
                                          
                                          </>
                                          )}
                                          </>
                                          )}
                                        </Col>
                                      </>
                                    );
                                  }
                                )}
                              </Row>
                            </Card.Header>
                            
                              <Card.Body>
                              <Row>
                                <Col xs="12">
                                  <h2>{matchidFind.status}</h2>
                                  {(matchidFind.status == "Pending" || matchidFind.status == "Ready") && (
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
                                                  
                                                  
                                                  {matchidFind
                                                    .matchPlayers[0].username ==
                                                currentUser.username ||
                                                matchidFind
                                                .matchPlayers[1].username ==
                                                currentUser.username ? (
                                                  <>
                                                  
                                                  {item.players[0].username &&
                                                  item.players[1].username &&
                                                  matchidFind.status == "Ready" ? (
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
                                                        Waiting for another
                                                        player...
                                                      </p>
                                                    </>
                                                  )}
                                                  {matchidFind
                                                    .matchPlayers[0].username !=
                                                    currentUser.username    && !matchidFind
                                                    .matchPlayers[1].ready && (
                                                    <Button
                                                      className="btn-round"
                                                      onClick={
                                                        this.handleLeaveMatch
                                                      }
                                                      variant="warning"
                                                      disabled={
                                                        this.state.isloading
                                                      }
                                                    >
                                                      Leave Match
                                                    </Button>
                                                  )}
                                                    </>
                                                  ):(<>
                                                  <p
                                                    style={{
                                                      color: "#fff",
                                                      fontSize: "14px",
                                                      padding: 20,
                                                    }}
                                                  >
                                                    Match is open, join now
                                                    before someone else takes
                                                    your spot. Winner takes $
                                                    {item.prize}
                                                    , let's get it! Match open
                                                    for limited time.
                                                  </p>
                                                  {((item.totalPlayer) >
                                                    activePlayer) && (
                                                      <>
                                                      {currentUser.accessToken != '' ? (
                                                        <Button
                                                      className="btn-round"
                                                      onClick={
                                                        this.handleJoinMatch
                                                      }
                                                      variant="danger"
                                                      disabled={
                                                        this.state.isloading
                                                      }
                                                    >
                                                      Join Match {item.inSign.replace('Dollar','$')}  {item.amount}
                                                    </Button>
                                                      ):(
                                                        <>
                                                        <Link to="/auth/login-page" className="btn btn-round btn-danger" as={Link}>Login to Join
</Link>
 <br/>
  <Link to="/auth/register-page"  className="btn btn-round btn-link" as={Link}>Don’t have an account? Create Account
</Link>
                                                        </>
                                                        
                                                      )}
                                                    
                                                    </>
                                                    )}
                                                  </>)}
                                            </>
                                          )}
                                          {matchidFind.status == "InPlay" && (
                                            <>
                                            {(matchidFind
                                                    .matchPlayers[0].username ==
                                                currentUser.username ||
                                                matchidFind
                                                .matchPlayers[1].username ==
                                                currentUser.username) && (
                                                  <>
                                              <p>Match Code</p>

                                              <Card.Title
                                                as="h1"
                                                className="matchcode"
                                              >
                                                {getCode(matchidFind.matchCode)}
                                              </Card.Title>
                                              <Row>
                                                <Col xs="6">
                                                  <Button
                                                    className="btn-fill btn-block btn-lg"
                                                    type="button"
                                                    variant="danger"
                                                    style={{
                                                      position: "relative",
                                                      zIndex: 1,
                                                    }}
                                                    onClick={
                                                      this.handlecAlertLost
                                                    }
                                                  >
                                                    I Lost
                                                  </Button>
                                                </Col>

                                                <Col xs="6">
                                                  <input
                                                    type="file"
                                                    id="uploadfile"
                                                    accept="video/*"
                                                    name="file"
                                                    className="hide"
                                                    ref={this.fileUpload}
                                                    onChange={
                                                      this.onChangeHandler
                                                    }
                                                  />
                                                  <Button
                                                    className="btn-fill btn-block btn-lg"
                                                    type="button"
                                                    variant="success"
                                                    style={{
                                                      position: "relative",
                                                      zIndex: 1,
                                                    }}
                                                    onClick={
                                                      this.handlecAlertWin
                                                    }
                                                    disabled={isUpLoading}
                                                  >
                                                    {progressLable}
                                                  </Button>
                                                  {progress > 0 && (
                                                    <div className="prosbar">
                                                      <ProgressBar
                                                        variant="success"
                                                        now={progress}
                                                        label={""}
                                                      />
                                                    </div>
                                                  )}
                                                </Col>
                                              </Row>
                                              </>
                                                )}
                                            </>

                                          )}
                                          {matchidFind.winner && (
                                        <>
                                        <div
                                            
                                            style={{ position:'relative',top:20}}
                                          >
                                          <div
                                            className=" winner avatar"
                                            style={{ width: 92, height: 92}}
                                          ></div>
                                          <div className=" ">
                                            <Avatar
                                              size="92"
                                              round={true}
                                              title={matchidFind.winner}
                                              name={setAvatar(
                                                matchidFind.winner
                                              )}
                                            />
                                          </div>
                                          </div>
                                          <h3 style={{color:'gold'}}>
                                            {matchidFind.winner}<br/><small className="text-muted" style={{position:'relative',top:-5}}>is
                                            winner</small>
                                          </h3>
                                        </>
                                      )}
                                  {item.gameName == "ClashRoyale" &&
                                  matchidFind.status == "InPlay" ? (
                                    <>
                                      <Button
                                        className="btn-fill btn-block btn-lg"
                                        type="button"
                                        variant="danger"
                                        style={{
                                          position: "relative",
                                          zIndex: 1,
                                        }}
                                        onClick={this.handleClashFinished}
                                        disabled={this.state.isloading}
                                      >
                                        Game finished
                                      </Button>
                                    </>
                                  ) : (
                                    <>
                                      {(item.players[0].username ==
                                        currentUser.username ||
                                        item.players[1].username ==
                                          currentUser.username) && (
                                        <>
                                          
                                          {matchidFind.status == "InPlay" && (
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
                                  margin: "0 auto",
                                  maxWidth: 300,
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
                                    style={{ width: "100%" }}
                                    src={
                                      require("assets/images/games/" +
                                        item.gameName +
                                        ".jpg").default
                                    }
                                  ></img>
                                  <Table
                                    striped
                                    hover
                                    borderless={true}
                                    variant="dark"
                                  >
                                    <tbody>
                                    <tr>
                                        <td>Event ID</td>
                                        <td style={{ textAlign: "right" }}>
                                          {item.id}
                                        </td>
                                      </tr>
                                      
                                      <tr>
                                        <td>Match ID</td>
                                        <td style={{ textAlign: "right" }}>
                                          {matchidFind.id}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Match Status</td>

                                        <td style={{ textAlign: "right" }}>
                                          {matchidFind.status}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Winner takes</td>
                                        <td style={{ textAlign: "right" }}>
                                          {item.outSign.replace('Dollar','$')} <CurrencyFormat value={item.prize} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => <span >{value}</span>} />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Mode</td>
                                        <td style={{ textAlign: "right" }}>
                                          {item.gameMode}
                                        </td>
                                      </tr>
                                      
                                    </tbody>
                                  </Table>
                                </Card.Body>
                              </Card>
                              
                            </Card.Footer>
                              
                          </Card>
                        </Col>
        </>
    );
  }
}

export default withRouter(LeagueSection) ;