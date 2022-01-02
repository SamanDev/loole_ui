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
import {
  Statistic,
  Button,
  Icon,
  Label,
  Divider,
  Grid,
  Segment,
  Accordion,
  Header,
  List, Message
} from "semantic-ui-react";
import Moment from "moment";
import CurrencyFormat from "react-currency-format";
import { IMaskInput } from "react-imask";
import { withRouter } from "react-router-dom";
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
  getGroupBadgesmall,
  rendererBig,
  printEventBTN,
  vsComponentTitle,
  getModalTag,
  getGameTag,
  getMatchTitle,
  getColorStatus,
  printStatus,
  haveGameTag,
  getPlayerTag,
  isJson,
  haveAdmin,
  handleTagForm,
  vsComponentPlayer,
  getGroupBadgeBlock,
  printJoinalerts,
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

var mymatchFind = null;
var matchLevelFind = null;
var icEnd = 0;
var icStart = 0;

class TournamentSection extends Component {
  constructor(props) {
    super(props);
    this.showDetails = this.showDetails.bind(this);
    this.handleJoinMatch = this.handleJoinMatch.bind(this);
    this.printErr = this.printErr.bind(this);
    this.handleHowStream = this.handleHowStream.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      activeIndex: -1,
      eventid: this.props.item.id,
      matchid: getQueryVariable("matchid"),
      item: this.props.item,
      currentUser: this.props.token,
      curPlayerReady: false,
      progress: 0,
      selectedFile: null,
      matchidFind: this.props.matchidFind,
      isloading: this.props.isLoading,
      isUpLoading: false,
      progressLable: "I Win",
      successful: false,
      loading: false,
      message: "",
    };
  }
  static getDerivedStateFromProps(props, state) {
    // Any time the current user changes,
    // Reset any parts of state that are tied to that user.
    // In this simple example, that's just the email.
    document.title = props.item.gameName + ' '+ props.item.gameMode + ' - ' + props.item.outSign.replace('Dollar','$').replace('Point','Diamonds ') + props.item.prize +  ' Prize';
    
    if (props.item !== state.item) {
      icEnd = 0;
    icStart = 0;
      return {
        eventid: props.item.id,
    
      item: props.item,
      currentUser: props.token,
    
      matchidFind: props.matchidFind,
      isloading: props.isLoading,
      };
    }
    return null;
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };
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
  showDetails(player) {
    $(".gdetails").addClass("hide");
    $(".gdetails.no" + player).removeClass("hide");
  }
  handleJoinMatch(e) {
    e.preventDefault();
    this.setState({
      isloading: true,
    });
    var GName = {
      value: this.state.item.gameName + " - " + this.state.item.gameConsole,
      label: this.state.item.gameName + " - " + this.state.item.gameConsole,
    };
    userService
      .joinEvent(this.state.item.id)
      .then(
        (response) => {
          //alert(response)
          if (response.data.accessToken) {
            this.props.onUpdateItem("currentUser", response.data);

            Toast.fire({
              icon: "success",
              title: "Joined.",
            });
          } else {
            this.setState({
              isloading: false,
            });

            {
              printJoinalerts(
                response.data,
                GName,
                this.state.currentUser,
                handleTagForm
              );
            }
          }
        },
        (error) => {
          this.printErr(error);
        }
      )
      .catch((error) => {
        this.printErr(error);
      });
  }

  printErr = (error) => {
    var GName = {
      value: this.state.item.gameName + " - " + this.state.item.gameConsole,
      label: this.state.item.gameName + " - " + this.state.item.gameConsole,
    };
    this.setState({
      successful: false,
      message: "",
      submit: false,
      isloading: false,
    });
    
    if (error?.response?.data?.status == 401) {
      this.props.onUpdateItem("openModalLogin", true);
      localStorage.setItem("user", JSON.stringify(defUser));
      this.props.onUpdateItem("currentUser", defUser);
    } else {
      const resMessage = error?.response?.data || error.toString();

      if (resMessage.indexOf("Error") > -1) {
        {
          printJoinalerts(
            resMessage,
            GName,
            this.state.currentUser,
            handleTagForm
          );
        }
      } else {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: resMessage,
        });
      }
    }
  };

  render() {
    let {
      currentUser,
      item,
      progress,
      isUpLoading,
      progressLable,
      matchidFind,
      matchid,
      isloading,
      activeIndex,
    } = this.state;
    var isJoin = false;
    var lists = item.matchTables;
    icEnd = 0;
    icStart = 0;
    lists.sort((a, b) => (a.level < b.level ? 1 : -1));
    if (
      (item.status == "InPlay" ||
        item.status == "Pending" ||
        item.status == "Ready") &&
      item.gameMode == "Tournament"
    ) {
      lists.map((tblmatch, w) => {
        if (
          tblmatch.status == "InPlay" ||
          tblmatch.status == "Pending" ||
          tblmatch.status == "Ready"
        ) {
          if (!matchLevelFind) {
            matchLevelFind = tblmatch;
          }
        }
        if (
          tblmatch.status != "Finished" &&
          (tblmatch.matchPlayers[0].username == currentUser.username ||
            tblmatch.matchPlayers[1].username == currentUser.username)
        ) {
          mymatchFind = tblmatch;
        }
      });

      //matchidFind = lists.filter( (list) => list.id === );
    }

    if (matchLevelFind && activeIndex == -1) {
      //this.setState({ activeIndex: matchLevelFind.level - 1 });
    }

    var activePlayer = 0;
    {
      item.players.map((user, z) => (
        <>{currentUser.username == user.username && (isJoin = true)}</>
      ));
    }
    const panels = item.matchLevel.map((match, i) => {
      var hatchbackCar = lists.filter(
        (list) => list.level === item.matchLevel[i].level
      );
      hatchbackCar.sort((a, b) => (a.id > b.id ? 1 : -1));

      return {
        key: `panel-${i}`,
        title: {
          content:
            hatchbackCar.length == 1
              ? getMatchTitle(hatchbackCar[0].level, item.totalPlayer)
              : getMatchTitle(hatchbackCar[0].level, item.totalPlayer) +
                " - " +
                hatchbackCar.length +
                " match",
       
        },

        content: hatchbackCar.map((mtch, z) => {
         
          return (
            <span key={z.toString()}>
            
          
              {z == 0 && (
                <Countdown
                  renderer={rendererBig}
                  size="mini"
                  finish={"@@@" + item.status}
                  txt={"@@@Start at"}
                  date={hatchbackCar[0].startTime}
                />
              )}
              <Link
                
                onClick={() => this.props.onUpdateItem("matchIDQ", mtch.id)}
                to={"/panel/matchlobby?id=" + item.id + "&matchid=" + mtch.id}
              >
                <Segment inverted style={{ background: "none !important" }}>
                  <Grid columns={2}>
                    <Grid.Column
                      className={mtch.winner == mtch?.matchPlayers[0]?.username ? "coverwinner":null}
                    >
                      {vsComponentPlayer(
                        item,
                        mtch,
                        0,
                        matchid,
                        currentUser,
                        isloading,
                        false
                      )}
                    </Grid.Column>
                    <Grid.Column
                      className={mtch.winner == mtch?.matchPlayers[1]?.username ? "coverwinner":null}
                    >
                      {vsComponentPlayer(
                        item,
                        mtch,
                        1,
                        matchid,
                        currentUser,
                        isloading,
                        false
                      )}
                    </Grid.Column>
                  </Grid>

                  <Divider vertical inverted>
                    VS
                  </Divider>
                </Segment>
              </Link>
              <Divider inverted fitted></Divider>
            </span>
          );
        }),
      };
    });
    var _mode = " 1 vs 1 ";
    var _color = "#404040";
   
   
  
    if (item.gameMode == "Tournament" || item.gameMode == "League") {
      _mode = item.gameMode;
    }
    
   
    if (item.status=='Canceled' || item.status=='Expired') {
      _color = "black"; 
    }
    var _finishTxt = 'Not Avalable';
  if (item?.winner) { _finishTxt = item.winner}
    setTimeout(() => {
      $("#jsonhtml").html($("#jsonhtml2").text());
    }, 100);
    return (
      <>
       <Col
          className="mx-auto text-center "
          lg="8"
          md="10"
          style={{ padding: 0, marginTop: 20 }}
        >
          {vsComponentTitle(item)}
          <Divider fitted style={{ opacity: 0 }} />
          {printStatus(item,_mode,_color ,item.status+'@@@'+_finishTxt,item.status)}
          <Divider fitted style={{ opacity: 0 }} />
          <Countdown
            renderer={rendererBig}
            match={lists[0]}
            txt="@@@Start at"
            colorfinish={getColorStatus(item.status)}
            finish={item.status + "@@@Not Avalable"}
           
            date={item.expire}
          />
{printEventBTN(
              item,
              currentUser,
              isloading,
              activePlayer,
              isJoin,
              mymatchFind,
              this.handleJoinMatch,
              this.props.onUpdateItem
            )}
          {item.status == "Pending" ? (
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
                now={(item.players.length / item.totalPlayer) * 100}
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  maxWidth: "50%",
                }}
              />
            </>
          ) : (
            <>
              {matchLevelFind && item.status != "Finished" && (
                <>
                  <Statistic inverted color="violet" size="mini">
                    <Statistic.Label>Match Level</Statistic.Label>
                    <Statistic.Value>
                      {getMatchTitle(matchLevelFind.level, item.totalPlayer)}
                    </Statistic.Value>
                  </Statistic>
                </>
              )}
            </>
          )}
<Divider fitted style={{ opacity: 0 }} />
          {item.players.map((user, z) => (
            <span key={z}>
              {currentUser.username == user.username && (isJoin = true)}
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
                      value={"+" + (item.players.length - 4)}
                      color="gray"
                    />
                  )}
                </>
              ) : null}
            </span>
          ))}
          {item.status != "Canceled" && item.status != "Expired" && (
            <>
              <Divider style={{ opacity: 0 }} />
              <Accordion
                defaultActiveIndex={[0, 1]}
                panels={panels}
                exclusive={false}
                fluid
                inverted
              />
<Col
          className="mx-auto text-center "
          lg="8"
          md="10"
          style={{ padding: 0, marginTop: 20 }}
        >
              <Segment inverted color="violet">
                <Header as="h2">Watch Live</Header>
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
                <Message>
    
    <p>
                  By connecting your Twitch account you will automatically be
                  shown on the Watch Live pages of the tournaments you are
                  playing in
                </p>
                <Button
                   color="violet"
                  onClick={this.handleHowStream}
                  
                  disabled={this.state.isloading}
                >
                  How to Stream
                </Button>
  </Message>
                
            
                
              </Segment>
              <Segment inverted color="blue">
                <Header as="h2">
                  Prizes
                  <div style={{ position: "relative", zIndex: 1,transform:'scale(1.3 )' }}>
                    {getGroupBadgeBlock(
                      item.outSign,
                      item.prize,
                      "Prize",
                      "left",
                      "green"
                    )}
                  </div>
                </Header>
                <Message>
                <List divided inverted relaxed>
                {item.current_brackets.map((win, i) => {
                      icStart = icStart + 1;
                      icEnd = icEnd + parseInt(win.number);
                      var icShow = "#" + icStart;
                      if (icStart != icEnd) {
                        icShow = icShow + " - #" + icEnd;
                        icStart = icEnd;
                      }
                      if (icStart <= 2005) {
                        return (
                          <List.Item key={i.toString()}>

        <List.Content>
          
          <span style={{ fontSize: 17 }}>
                              <Label color="green">%{win.percent}</Label>
                              <Label
                                pointing="left"
                                size="mini"
                                basic
                                color="blue"
                              >
                                {icShow}
                              </Label>
                            </span>
                            <span style={{ textAlign:'left',marginLeft:5 }}>
                              {getGroupBadgeBlock(
                                item.outSign,
                                win.prize,
                                "Prize",
                                "right",
                                "green"
                              )}
                            </span>
        </List.Content>
      </List.Item>
      
                        );
                      }
                    })}
      
    </List>
    </Message>
              </Segment>
              <Segment inverted color="purple">
                <Header as="h2">
                Rules
                </Header>
                <Message id="jsonhtml" style={{ textAlign:'left'}}></Message>
                  <span id="jsonhtml2" className="hide">
                    {" "}
                    {item.rules}
                  </span>
              </Segment>
              </Col>
            </>
          )}
        </Col>
      </>
    );
  }
}

export default withRouter(TournamentSection);
