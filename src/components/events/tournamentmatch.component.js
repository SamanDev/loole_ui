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

import MatchCard  from "components/matchcard.component";
import {
  Statistic,
  Button,
  Icon,
  Label,
  Divider,
  Grid,
  Segment,
  Transition
} from "semantic-ui-react";
import {
    Badge,
 
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
    vsComponentTitle,
    isJson,
    haveAdmin,
    handleTagForm,
    rendererBig,
    printEventBTN,
    vsComponentPlayer
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
class MatchTourSection extends Component {
  constructor(props) {
    super(props);
    this.showDetails = this.showDetails.bind(this);
   
   
    this.handlecAlertLost = this.handlecAlertLost.bind(this);
    this.handleLoseMatch = this.handleLoseMatch.bind(this);
    this.handlecAlertWin = this.handlecAlertWin.bind(this);
    this.handleClashFinished = this.handleClashFinished.bind(this);
    this.state = {
      eventid: this.props.item.id,
        matchid: getQueryVariable("matchid"),
        item : this.props.item,
    currentUser : this.props.token,
        curPlayerReady: false,
        progress: 0,
        selectedFile: null,
        matchidFind: this.props.matchidFind,
        isloading: this.props.isLoading,
        isUpLoading: false,
        progressLable: "I Win",
      successful: false,
      loading: false,
      message: ""
    };
  }
  componentWillReceiveProps(newProps) {
    
       
 
    this.setState({ eventid: newProps.item.id });
    this.setState({ currentUser: newProps.token });
    this.setState({ matchidFind: newProps.matchidFind });
    this.setState({ item: newProps.item });
    
    this.setState({ isloading:false });
    
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
  showDetails(player){
$('.gdetails').addClass('hide');
$('.gdetails.no'+player).removeClass('hide');

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
  
  

  render() {
    let { currentUser, item,progress, isUpLoading, progressLable,matchidFind,isloading,matchid } = this.state;
      
    
    setTimeout(() => {$("#jsonhtml").html($("#jsonhtml2").text());},1000)
    var activePlayer = 0; 
    {item.players.map((user, z) => (
     <>
        {currentUser.username ==
          user.username && (isJoin = true)}
       

      </>
    ))}
    dateStart = item.startTime;
         dateExpired = item.expire;
    return (
      <>
      
     <Col className="mx-auto text-center" lg="7" md="10">
     {vsComponentTitle(item)}
        <Divider fitted style={{ opacity: 0 }} />
        
            <Statistic inverted color="violet" size="mini">
            <Statistic.Label>Match Level</Statistic.Label>
              <Statistic.Value>{getMatchTitle(matchidFind.level,item.totalPlayer)}</Statistic.Value>
              
            </Statistic>
            <Divider fitted style={{ opacity: 0 }} />
        <Countdown renderer={rendererBig} match={matchidFind} txt="@@@Start at" finish="@@@" btn={printEventBTN(item,currentUser,isloading,activePlayer,isJoin,mymatchFind,this.handleJoinMatch)} date={item.expire} />
        
     
        <Segment inverted  style={{background:'none !important'}}>
      
      <Grid columns={2}>
        <Grid.Column color={matchidFind.winner == matchidFind.matchPlayers[0].username && ('red')}>
          {vsComponentPlayer(
            item,
            matchidFind,
            0,
            matchid,
            currentUser,
            isloading,
            false
          )}
        </Grid.Column>
        <Grid.Column color={matchidFind.winner == matchidFind.matchPlayers[1].username && ('red')}>
          {vsComponentPlayer(
            item,
            matchidFind,
            1,
            matchid,
            currentUser,
            isloading,
            false
          )}
        </Grid.Column>
      </Grid>

      <Divider vertical inverted>VS</Divider>
    </Segment>
    {matchidFind.status == "InPlay" && (
                                            <>
                                            {(matchidFind
                                                    .matchPlayers[0].username ==
                                                currentUser.username ||
                                                matchidFind
                                                .matchPlayers[1].username ==
                                                currentUser.username) && (
                                                  <>
                                                  <Statistic inverted size="small">
                        <Statistic.Label>
                        Match Code
                        </Statistic.Label>
                        <Statistic.Value className="matchcode"
                                              >
                                                {getCode(matchidFind.matchCode)}
                                             </Statistic.Value>
                      </Statistic>
                                              
                                              
                                              <Button.Group  size='big'  widths='3'>
    <Button color="red" onClick={this.handlecAlertLost} disabled={isloading}>I Lost</Button>
    <Button.Or color="red" style={{minWidth: 5}}/>
    <Button animated onClick={this.handlecAlertWin}
                    color="green"
                    inverted
                    disabled={isUpLoading}>
  <Button.Content visible>{progressLable}</Button.Content>
  <Button.Content hidden>Upload video</Button.Content>
  {progress > 0 && (
                                                    <div className="prosbar">
                                                      <ProgressBar
                                                        variant="success"
                                                        now={progress}
                                                        label={""}
                                                      />
                                                    </div>
                                                  )}
</Button>
   
  </Button.Group>
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
                                              
                                              </>
                                                )}
                                            </>

                                          )}
                                          <MatchCard item={item} matchidFind={matchidFind}/> 
                          <Card
                            className="card-lock text-center card-plain card-match hide"
                            style={{ color: "#fff" }}
                          >
                      
                            {(item.gameMode == "Tournament" && this.state.matchid) ? (
                              
                              <>
                            
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
                                        <td>Mode</td>
                                        <td style={{ textAlign: "right" }}>
                                          {item.gameMode}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Event ID</td>
                                        <td style={{ textAlign: "right" }}>
                                          {item.id}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Event Status</td>

                                        <td style={{ textAlign: "right" }}>
                                          {item.status}
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
                                      <tr style={{ background: "black" }}>
                                        <td>Prizes</td>

                                        <td style={{ textAlign: "right" }}>
                                          {item.outSign.replace('Dollar','$')} <CurrencyFormat value={item.prize} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => <span >{value}</span>} />
                                        </td>
                                      </tr>
                                      {item.current_brackets.map(
                                        (win, w) => {
                                          icStart = icStart + 1;
                                          icEnd = icEnd + parseInt(win.number);
                                          var icShow = "#" + icStart;
                                          var nAmount = Number.parseFloat(win.prize).toFixed(2);
                                            return (
                                              <tr>
                                              <td>{icShow}</td>
                                              <td style={{ textAlign: "right" }}>{item.outSign.replace('Dollar','$')} <CurrencyFormat value={nAmount} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => <span >{value}</span>} /></td>
                                                </tr>
                                            );
                                          
                                        }
                                      )}
                                    </tbody>
                                  </Table>
                                </Card.Body>
                              </Card>
                              
                            </Card.Footer>
                            </>):(
                              <>
                              <Card.Body>
                              <Row>
                                <Col xs="12">
                                  <h2>{matchidFind.status}</h2>
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

                                  {matchidFind.status !== "" ? (
                                    <>
                                      {matchidFind.winner ? (
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
                                      ) : (
                                        <>
                                          {(matchidFind.status == "Pending" ||
                                            matchidFind.status == "Ready") && (
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
                                                    currentUser.username && (
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
                                                    Match is open, join now
                                                    before someone else takes
                                                    your spot. Winner takes $
                                                    {item.prize}
                                                    , let's get it! Match open
                                                    for limited time.
                                                  </p>
                                                  {parseInt(item.totalPlayer) >
                                                    activePlayer && (
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
                                                  )}
                                                </>
                                              )}
                                            </>
                                          )}
                                        </>
                                      )}
                                    </>
                                  ) : (
                                    <></>
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
                              </>
                            )}
                          </Card>
                        </Col>
        </>
    );
  }
}

export default withRouter(MatchTourSection) ;