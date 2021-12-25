import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from "react-select";
import Avatar from "react-avatar";

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
    this.state = {
       
      eventid: this.props.item.id,
       
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
  showDetails(player){
    $('.gdetails').addClass('hide');
    $('.gdetails.no'+player).removeClass('hide');
    
      }
  handleJoinMatch(e) {
    e.preventDefault();
    this.setState({
      isloading: true,
    });
    userService.joinEvent(this.props.item.id).then(
      (response) => {
        this.setState({
          isloading: false,
        });
        //alert(response)
        if (response.indexOf("successful") > -1) {
         // this.reGetevents();
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
                this.props.history.push("/panel/cashier");
              }
            });
          } else if (response == "tagError") {
            var e = this.state.item.gameName;
            var p = this.state.item.gameConsole;
            var currentUser = this.state.currentUser;
          if(p=='PS4'||e=='PS4'){e='PSN';p='PSN';}
          if(p=='PS5'||e=='PS5'){e='PSN';p='PSN';}
          if(p=='XBOX'||e=='XBOX'){e='XBOX';p='XBOX';}
          
            
            handleTagForm(e.replace(' Warzone',''),p,currentUser)
            //this.setSelectedTag(this.props.item.gameName,this.props.item.gameConsole)
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
  
  componentWillReceiveProps(newProps) {
    
    this.setState({ eventid: newProps.item.id });
    this.setState({ currentUser: newProps.token });
    this.setState({ matchidFind: newProps.matchidFind });
    this.setState({ item: newProps.item });
    this.setState({ isloading:false });
    
  }
  render() {
    let { currentUser, item,progress, isUpLoading, progressLable,matchidFind } = this.state;
   
    setTimeout(() => {$("#jsonhtml").html($("#jsonhtml2").text());},1000)
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
                                    {currentUser.username == user.username &&
                                      (isJoin = true)}
                                    {z < 5 ? (
                                      <>
                                        {z < 4 ? (
                                          <a href={"/user/"+user.username}  target="_blank">
                                          <Avatar
                                            size="25"
                                            title={user.username}
                                            round={true}
                                            name={setAvatar(user.username)}
                                          />
                                          </a>
                                        ) : (
                                          <Avatar
                                            size="25"
                                            round={true}
                                            value={
                                              "+" + (item.players.length - 4)
                                            }
                                            color="gray"
                                          />
                                        )}
                                      </>
                                    ) : null}
                                  </span>
                                ))}
                              </small>
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
                                    borderRight: "7px solid  rgb(33, 150, 243)",
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
                                  <h3 className="vertical-timeline-element-title">
                                    Registration Open
                                  </h3>
                                  

                                  <small
                                    style={{
                                      marginBottom: 15,
                                      display: "block",
                                      fontSize: 13,
                                    }}
                                  >
                                    Score Update: Every 60 minutes
                                    <br />
                                    Total Score: Top 10 games
                                    <br />
                                    Regions: All Regions
                                    <br />
                                    Servers: All Servers
                                    
                                  </small>
                                  
                                  <h3 className="vertical-timeline-element-title">
                                      <Countdown
                                          renderer={renderer}
                                          date={dateStart}
                                        />
                                        <small className="text-muted">
                                                      Avalable until {item.expire}
                                                    </small>
                                      </h3>
                                      {(parseInt(item.totalPlayer) >=
                                                    activePlayer) && (
                                                      <>
                                                     
                                                    
                                                    </>
                                                    )}
                                   {!isJoin && item.totalPlayer > item.players.length && (
                                    <h4 className="vertical-timeline-element-subtitle"  style={{paddingBottom:0}}>
                                     {currentUser.accessToken != '' ? (
                                                        <Button
                                                        className="btn-roun2d"
                                                        onClick={this.handleJoinMatch}
                                                        variant="danger"
                                                        disabled={this.state.isloading}
                                                      >
                                                        <b>Join League</b><br/> {item.inSign.replace('Dollar','$')} <CurrencyFormat value={item.amount} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => <span >{value}</span>} />
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
                                    
                                    </h4>
                                  )}
                                </VerticalTimelineElement>
                                <VerticalTimelineElement
                                  className="vertical-timeline-element--education my-list"
                                  contentStyle={{
                                    background: "rgb(233, 30, 99)",
                                    color: "#fff",
                                  }}
                                  contentArrowStyle={{
                                    borderRight: "7px solid  rgb(233, 30, 99)",
                                  }}
                                  iconStyle={{
                                    background: "rgb(233, 30, 99)",
                                    color: "#fff",
                                  }}
                                >
                                  <h3 className="vertical-timeline-element-title">
                                    Results Tracking
                                  </h3>
                                  <h4 className="vertical-timeline-element-subtitle">
                                    <Countdown
                                      renderer={renderer}
                                      date={dateExpired}
                                    />
                                  </h4>

                                  <ListGroup>
                                    <ListGroup.Item>
                                      Kills{" "}
                                      <Badge variant="primary">
                                        x 20 Points
                                      </Badge>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                      Damage Done
                                      <Badge variant="primary">
                                        x 0.06 Points
                                      </Badge>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                      Time Played
                                      <Badge variant="primary">
                                        x 0.04 Points
                                      </Badge>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                      1st Place
                                      <Badge variant="primary">
                                        + 240 Points
                                      </Badge>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                      2nd or 3rd Place
                                      <Badge variant="primary">
                                        + 60 Points
                                      </Badge>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                      4th to 8th Place +{" "}
                                      <Badge variant="primary">
                                        + 20 Points
                                      </Badge>
                                    </ListGroup.Item>
                                  </ListGroup>
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
                                      style={{ color: "#fff", fontSize: 40 }}
                                    />
                                  </p>
                                  <h5>Nobody is currently live</h5>
                                  <p>
                                    By connecting your Twitch account you will
                                    automatically be shown on the Watch Live
                                    pages of the tournaments you are playing in
                                  </p>
                                  <br />
                                  <Button
                                    className="btn-round"
                                    onClick={this.handleHowStream}
                                    variant="warning"
                                  >
                                    How to Stream
                                  </Button>
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
                                  <h4 className="vertical-timeline-element-subtitle">
                                    <Countdown
                                      renderer={renderer}
                                      date={dateExpired}
                                    />
                                  </h4>
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
                                                {getGroupBadgeList(item.inSign,item.prize*win.percent/100,'badgegroup')}
                                                
                                               
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
                                    background: "#e76f51",
                                    color: "#fff",
                                  }}
                                  contentArrowStyle={{
                                    borderRight: "7px solid #e76f51",
                                  }}
                                  iconStyle={{
                                    background: "#e76f51",
                                    color: "#fff",
                                  }}
                                >
                                  <h3 className="vertical-timeline-element-title">
                                    Finished &amp; Paid
                                  </h3>
                                  <h4 className="vertical-timeline-element-subtitle">
                                    <Countdown
                                      renderer={renderer}
                                      date={item.finished}
                                    />
                                  </h4>
                                  <div
                                    style={{ maxHeight: 580, overflow: "auto" }}
                                  >
                                    <Table striped  variant="dark">
                                      <thead>
                                        <tr>
                                          <th>#</th>
                                          <th>Username</th>
                                          <th>Average Score</th>
                                          <th></th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {item.players.map((player, i) => {
                                          icStartL = icStartL + 1;
                                          if (icStartL <= 225 && player.username) {
                                            return (
                                              <>
                                                <tr>
                                                  <td>#{icStartL}</td>
                                                  <td
                                                    style={{
                                                      textAlign: "left",
                                                    }}
                                                  >
                                                    <Avatar
                                                      size="25"
                                                      round={true}
                                                      title={player.username}
                                                      name={setAvatar(
                                                        player.username
                                                      )}
                                                    />{" "}
                                                    {player.username} ---
                                                    
                                                    {player.nickName}
                                                    {player.social && (
                                                      <ListGroup
                                                        horizontal
                                                        style={{
                                                          display:
                                                            "inline-flex",
                                                          marginTop: 0,
                                                          lineHeight: "20px",
                                                          float: "right",
                                                        }}
                                                      >
                                                        {player.social
                                                          .instagram && (
                                                          <ListGroup.Item
                                                            action
                                                          >
                                                            <FontAwesomeIcon
                                                              icon={faInstagram}
                                                              style={{
                                                                color:
                                                                  "#e95950",
                                                              }}
                                                            />
                                                          </ListGroup.Item>
                                                        )}

                                                        <ListGroup.Item action>
                                                          <FontAwesomeIcon
                                                            icon={faTwitch}
                                                            style={{
                                                              color: "#fff",
                                                            }}
                                                          />
                                                        </ListGroup.Item>
                                                        <ListGroup.Item action>
                                                          <FontAwesomeIcon
                                                            icon={faYoutube}
                                                            style={{
                                                              color: "#FF0000",
                                                            }}
                                                          />
                                                        </ListGroup.Item>
                                                        <ListGroup.Item action>
                                                          <FontAwesomeIcon
                                                            icon={faTwitter}
                                                            style={{
                                                              color: "#00acee",
                                                            }}
                                                          />
                                                        </ListGroup.Item>
                                                      </ListGroup>
                                                    )}
                                                  </td>
                                                  <td>{item.score} </td>
                                                  <td>
                                                    <Button
                                                      variant="dark"
                                                      className="btn-block"
                                                      onClick={ () => this.showDetails(player.username) }
                                                      
                                                    >
                                                      View
                                                    </Button>
                                                  </td>
                                                </tr>
                                                <tr className={"hide gdetails no"+player.username}>
                                                 
                                                  <td colSpan={4} style={{
                                                              display: "table-cell",
                                                              background:"#eee"
                                                            }}>
                                                    <Table
                                                      striped size="sm"
                                                      
                                                    >
                                                      <thead>
                                                        <tr>
                                                          <th>Date</th>
                                                          <th>Score</th>
                                                          <th>Kills</th>
                                                          <th>Damage Done</th>
                                                          <th>Time Played</th>
                                                          <th>Rank</th>
                                                        </tr>
                                                      </thead>
                                                      <tbody>
                                                        {player.callOfDuties.map(
                                                          (callOfDuties, i) => {
                                                            return (
                                                              <tr>
                                                                <td>
                                                                  {
                                                                    callOfDuties.utcStartTime
                                                                  }
                                                                </td>
                                                                <td>
                                                                  {
                                                                    callOfDuties.score
                                                                  }
                                                                </td>
                                                                <td>
                                                                  {
                                                                    callOfDuties.kills
                                                                  }
                                                                </td>
                                                                <td>
                                                                  {
                                                                    callOfDuties.damageDone
                                                                  }
                                                                </td>
                                                                <td>
                                                                  {
                                                                    callOfDuties.timePlayed
                                                                  }
                                                                </td>
                                                                <td>
                                                                  {
                                                                    callOfDuties.ranking
                                                                  }
                                                                </td>
                                                              </tr>
                                                            );
                                                          }
                                                        )}
                                                      </tbody>
                                                    </Table>
                                                  </td>
                                                </tr>
                                              </>
                                            );
                                          }
                                        })}
                                      </tbody>
                                    </Table>
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
                                    League Rules
                                  </h3>
                                  <p id="jsonhtml"></p>
                                  <span id="jsonhtml2" className="hide">
                                    {item.rules}
                                  </span>
                                </VerticalTimelineElement>
                              </VerticalTimeline>
                            </Col>
                          </Row>
                        </Card.Header>
                      </Card>
                    </Col>
        </>
    );
  }
}

export default withRouter(LeagueSection) ;