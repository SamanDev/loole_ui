import React, { Component } from "react";
import Avatar from "react-avatar";

import { Link } from "react-router-dom";
import { faTwitch } from "@fortawesome/free-brands-svg-icons";

import CurrencyFormat from "react-currency-format";
import {
  Button,
  Label,
  Divider,
  Segment,
  Header,
  List,
  Message,
  Icon,
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import $ from "jquery";
import userService from "services/user.service";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaystation, faXbox } from "@fortawesome/free-brands-svg-icons";

import {
  faDesktop,
  faMobileAlt,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import Countdown from "react-countdown";
import { Col, ProgressBar } from "react-bootstrap";
import {
  setAvatar,
  rendererBig,
  printEventBTN,
  vsComponentTitle,
  getColorStatus,
  printStatus,
  handleTagForm,
  getGroupBadgeBlock,
  printJoinalerts,
  getIconPlat,
  printTag,
} from "components/include";
import UserContext from "context/UserState";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

//console.log(item);
var dateExpired = null;
var dateStart = null;
var icEnd = 0;
var icStart = 0;
var icStartL = 0;
var isJoin = false;
var activePlayer = 0;
class LeagueSection extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.showDetails = this.showDetails.bind(this);
    this.handleJoinMatch = this.handleJoinMatch.bind(this);
    this.state = {
      myState: this.props.myState,
      item: this.props.event,

      eventid: this.props.event.id,

      matchidFind: this.props.findStateId(this.props.myState, "match"),
      curPlayerReady: false,
      progress: 0,
      selectedFile: null,

      loading: false,
      isUpLoading: false,
      progressLable: "I Win",
      successful: false,
      loading: false,
      message: "",
    };
  }
  showDetails(player) {
    $(".gdetails").addClass("hide");
    $(".gdetails.no" + player).removeClass("hide");
  }
  handleJoinMatch(e) {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    var GName = {
      value: this.state.item.gameName + " - " + this.state.item.gameConsole,
      label: this.state.item.gameName + " - " + this.state.item.gameConsole,
    };
    userService
      .joinEvent(this.state.item.id)
      .then(
        (response) => {
          this.setState({
            loading: false,
          });
          //alert(response)
          if (response.data.accessToken) {
            this.props.onUpdateItem("currentUser", response.data);

            Toast.fire({
              icon: "success",
              title: "Joined.",
            });
          } else {
            {
              printJoinalerts(
                response.data,
                GName,
                this.context.uList.currentUser,
                handleTagForm,
                this.props
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
      loading: false,
    });
    if (
      error?.response?.data?.status == 401 ||
      error?.data?.status == 401 ||
      error?.response?.data?.details[0] == "Access is denied"
    ) {
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
            this.context.uList.currentUser,
            handleTagForm,
            this.props
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

  static getDerivedStateFromProps(props, state) {
    if (props.event !== state.item) {
      return {
        myState: props.myState,
        item: props.event,
        loading: false,
        eventid: props.event.id,
        matchidFind: props.findStateId(props.myState, "match"),
      };
    }
    return null;
  }
  render() {
    const item = this.props.event;
    const currentUser = this.context.uList.currentUser;
    let { progress, isUpLoading, progressLable, loading, activeIndex } =
      this.state;
    var current_brackets = [];
    var potential_brackets = [];
    var pointTrack = [
      {
        text: "Kills",
        weight: "+ 20",
      },
      {
        text: "Damage Done",
        weight: "+ 0.06",
      },
      {
        text: "Time Played",
        weight: "+ 0.04",
      },
      {
        text: "1st Place",
        weight: " + 240",
      },
      {
        text: "2nd or 3rd Place",
        weight: " + 60",
      },
      {
        text: "4th to 8th Place",
        weight: " + 20",
      },
    ];
    //var events = eventGet;
    var tournamentPayout = false;
    if (item.tournamentPayout && !tournamentPayout) {
      tournamentPayout = item.tournamentPayout
        .replace("70,", "1-70,")
        .replace("100,", "71-100,")
        .replace("200,", "101-200,")
        .replace("400,", "201-400,")
        .replace("700,", "401-700,")
        .replace("1000,", "701-1000,");
      var payArr = tournamentPayout.split("@");
      var totalPay = item.prize / item.totalPlayer;
      for (var i = 0; i < payArr.length; i++) {
        var paylvl = payArr[i].split(",");
        var payplyer = paylvl[0].split("-");
        var tItem = item.totalPlayer;

        if (parseInt(payplyer[0]) <= tItem && parseInt(payplyer[1]) >= tItem) {
          for (var j = 1; j < paylvl.length; j++) {
            if (paylvl[j].indexOf("x") == -1) {
              paylvl[j] = paylvl[j] + "x1";
            }
            var intX = paylvl[j].split("x");
            potential_brackets.push({
              prize: intX[0] * totalPay,
              percent: intX[0],
              number: intX[1],
            });
          }
        }
      }
      for (var i = 0; i < payArr.length; i++) {
        var paylvl = payArr[i].split(",");
        var payplyer = paylvl[0].split("-");
        var tItem = item.players.length;
        var totalPay2 = totalPay * tItem;

        if (parseInt(payplyer[0]) <= tItem && parseInt(payplyer[1]) >= tItem) {
          totalPay2 = totalPay2 / parseInt(payplyer[1]);
          for (var j = 1; j < paylvl.length; j++) {
            if (paylvl[j].indexOf("x") == -1) {
              paylvl[j] = paylvl[j] + "x1";
            }
            var intX = paylvl[j].split("x");
            current_brackets.push({
              prize: intX[0] * totalPay2,
              percent: intX[0],
              number: intX[1],
            });
          }
        }
      }
    }

    var _mode = item.gameMode;
    var _color = "#404040";
    var _finishTxt = "Not Joinable";
    if (item?.winner) {
      _finishTxt = item.winner;
    }
    var isJoin = false;
    var lists = item.matchTables;
    {
      item.players.map((user, z) => (
        <>{currentUser.username == user.username && (isJoin = true)}</>
      ));
    }

    item?.players.sort(function (a, b) {
      if (a === b || (a.ranking === b.ranking && a.totalScore === b.totalScore))
        return 0;
      if (a.totalScore > b.totalScore) return -1;
      if (a.totalScore < b.totalScore) return 1;
      if (a.ranking > b.ranking) return 1;
      if (a.ranking < b.ranking) return -1;
    });
    icEnd = 0;
    icStart = 0;
    setTimeout(() => {
      $("#jsonhtml").html($("#jsonhtml2").text());
    }, 1000);
    return (
      <>
        <Col
          className="mx-auto text-center "
          lg="8"
          md="10"
          style={{ padding: 0, marginTop: 20, overflow: "hidden" }}
        >
          {vsComponentTitle(item)}
          <Divider fitted style={{ opacity: 0 }} />
          {printStatus(
            item,
            _mode,
            _color,
            item.status + "@@@" + _finishTxt,
            item.status
          )}
          <Divider fitted style={{ opacity: 0 }} />
          <Countdown
            renderer={rendererBig}
            match={item}
            txt="@@@Start at"
            colorfinish={getColorStatus(item.status)}
            finish={item.status + "@@@Not Available"}
            date={item.startTime}
          />
          <Countdown
            renderer={rendererBig}
            match={item}
            txt="@@@Available Until"
            colorfinish={getColorStatus(item.status)}
            finish={item.status + "@@@Not Available"}
            date={item.expire}
          />
          <Divider fitted style={{ opacity: 0 }} />

          {printEventBTN(
            item,
            currentUser,
            loading,
            activePlayer,
            isJoin,
            null,
            this.handleJoinMatch,
            this.props.onUpdateItem
          )}
          {(item.status == "Pending" || item.status == "InPlay") &&
            item.players.length != item.totalPlayer && (
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
            )}

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
          <Col
            className="mx-auto text-center "
            lg="8"
            md="10"
            style={{ padding: 0, marginTop: 120 }}
          >
            {item.players?.length > 0 && (
              <Segment inverted color="red">
                <Header as="h2">Players</Header>
                <Message>
                  <List divided inverted relaxed>
                    {item.players.map((player, i) => {
                      return (
                        <List.Item key={i.toString()}>
                          <List.Content style={{ textAlign: "left" }}>
                            <span>
                              <Link
                                to={"/user/" + player.username}
                                target="_blank"
                              >
                                <Avatar
                                  size="20"
                                  title={player.username}
                                  round={true}
                                  name={setAvatar(player.username)}
                                />
                              </Link>{" "}
                              <Label
                                style={{ marginLeft: 5 }}
                                onClick={() =>
                                  window
                                    .open(
                                      "https://cod.tracker.gg/warzone/profile/" +
                                        player.gamePlatform
                                          .toLowerCase()
                                          .replace("battle", "battlenet") +
                                        "/" +
                                        player.tagId +
                                        "/",
                                      "_blank"
                                    )
                                    .focus()
                                }
                                style={{ cursor: "pointer" }}
                              >
                                {getIconPlat(player.gamePlatform)}

                                {printTag(item.gameName, player.tagId)}
                              </Label>
                            </span>
                            <span style={{ float: "right", marginLeft: 5 }}>
                              <Label color="black">
                                {player.totalScore ? (
                                  <CurrencyFormat
                                    value={Number.parseFloat(
                                      player.totalScore
                                    ).toFixed(0)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={""}
                                    renderText={(value) => value}
                                  />
                                ) : (
                                  0
                                )}
                              </Label>
                            </span>
                          </List.Content>
                        </List.Item>
                      );
                    })}
                  </List>
                </Message>
              </Segment>
            )}
            <Segment inverted color="yellow">
              <Header as="h2">Results Tracking</Header>
              <Message>
                <List divided inverted relaxed>
                  {pointTrack.map((win, i) => {
                    return (
                      <List.Item key={i.toString()}>
                        <List.Content style={{ textAlign: "left" }}>
                          <span style={{ fontSize: 17 }}>
                            <Label>{win.text}</Label>
                          </span>
                          <span style={{ float: "right", marginLeft: 5 }}>
                            <Label color="green">{win.weight}</Label>
                          </span>
                        </List.Content>
                      </List.Item>
                    );
                  })}
                </List>
              </Message>
            </Segment>
            {item.status != "Canceled" &&
              item.status != "Expired" &&
              item.status != "Finished" && (
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
                      By connecting your Twitch account you will automatically
                      be shown on the Watch Live pages of the tournaments you
                      are playing in
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
              )}
            <Segment inverted color="blue">
              {item.status == "Pending" ||
                (item.status == "InPlay" && (
                  <>
                    <Header as="h2">
                      Potential Prize
                      <div
                        style={{
                          position: "relative",
                          zIndex: 1,
                          marginTop: 20,
                          transform: "scale(1.3 )",
                        }}
                      >
                        {getGroupBadgeBlock(
                          item.outSign,
                          item.prize,
                          "Potential Prize",
                          "left",
                          "green"
                        )}
                      </div>
                      <p style={{ margin: "20px 0" }}>
                        Potential Prize Pool represents how much are players in
                        specific positions will get paid if the tournament
                        becomes full.
                      </p>
                    </Header>
                    <Message>
                      <List divided inverted relaxed>
                        {potential_brackets.map((win, i) => {
                          icStart = icStart + 1;
                          icEnd = icEnd + parseInt(win.number);

                          var icShow = "#" + icStart;
                          if (icStart != icEnd) {
                            icShow = icShow + " - #" + icEnd;
                            icStart = icEnd;
                          }

                          return (
                            <List.Item
                              key={i.toString()}
                              style={
                                item.players.length < parseInt(i + 1)
                                  ? { opacity: 0.4 }
                                  : { opacity: 1 }
                              }
                            >
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
                                <span
                                  style={{ textAlign: "left", marginLeft: 5 }}
                                >
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
                        })}
                      </List>
                    </Message>
                    <Divider clearing />
                  </>
                ))}
              <Header as="h2">
                Current Prize
                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    marginTop: 20,
                    transform: "scale(1.3 )",
                  }}
                >
                  {getGroupBadgeBlock(
                    item.outSign,
                    totalPay * item.players.length,
                    "Current Prize",
                    "left",
                    "green"
                  )}
                </div>
                <p style={{ margin: "20px 0" }}>
                  Current Prize Pool represents how much are players in specific
                  positions are currently getting paid. When the Tournament is
                  full, the current prize and potential prize pools will be
                  equal.
                </p>
              </Header>{" "}
              <Message>
                <List divided inverted relaxed>
                  {current_brackets.map((win, i) => {
                    if (i == 0) {
                      icStart = 0;
                      icEnd = 0;
                    }
                    icStart = icStart + 1;
                    icEnd = icEnd + parseInt(win.number);

                    var icShow = "#" + icStart;
                    if (icStart != icEnd) {
                      icShow = icShow + " - #" + icEnd;
                      icStart = icEnd;
                    }

                    return (
                      <List.Item
                        key={i.toString()}
                        style={
                          item.players.length < parseInt(i + 1)
                            ? { opacity: 0.4 }
                            : { opacity: 1 }
                        }
                      >
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
                          <span style={{ textAlign: "left", marginLeft: 5 }}>
                            {getGroupBadgeBlock(
                              item.outSign,
                              win.prize,
                              "Current",
                              "right",
                              "green"
                            )}
                          </span>
                        </List.Content>
                      </List.Item>
                    );
                  })}
                </List>
              </Message>
            </Segment>
            <Segment inverted color="purple">
              <Header as="h2">Rules</Header>
              <Message color="red" size="big">
                <b>
                  Solo, Duo, Trio and Squad - PC and Console, Excludes Blood
                  Money and Plunder
                </b>
              </Message>
              <Message id="jsonhtml" style={{ textAlign: "left" }}></Message>
              <span id="jsonhtml2" className="hide">
                {" "}
                {item.rules}
              </span>
            </Segment>
          </Col>
        </Col>
      </>
    );
  }
}

export default withRouter(LeagueSection);
