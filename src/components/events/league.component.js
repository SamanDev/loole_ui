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
} from "semantic-ui-react";
import { defUser } from "const.js";
import { withRouter } from "react-router-dom";
import $ from "jquery";
import userService from "services/user.service";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddToCal from "components/addtocal.component";
import Table from "components/table.component";
import Tracking from "components/tracking.component";
import Invite from "components/invite.component";
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
  isJson,
  date_edit,
  date_edit_card,
} from "components/include";
import UserContext from "context/UserState";
var moment = require("moment");
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
var _minMatch = 0;
var current_brackets = [];
var potential_brackets = [];
var totalPay = 0;
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
var RuleTrack = [
  {
    text: "Min Match",
    weight: "20",
  },
  {
    text: "Min Level",
    weight: "50",
  },
  {
    text: "Total Point",
    weight: "Average of Top 20",
  },
];
function getchatTime(date) {
  var thisDate2 = date.replace("-07:00", "+00:00");
  var dateExpired = moment(thisDate2).local().format("YYYY/MM/DD - HH:mm");

  return dateExpired;
}
var tournamentPayout = false;
class LeagueSection extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.showDetails = this.showDetails.bind(this);
    this.handleJoinMatch = this.handleJoinMatch.bind(this);
    this.handleHowStream = this.handleHowStream.bind(this);
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

          if (response?.message?.indexOf(" 401") > -1) {
            this.printErr(response);
          } else {
            if (response?.data?.accessToken) {
              this.context.setUList({ currentUser: response.data });
              localStorage.setItem("user", JSON.stringify(response.data));

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
    console.log(error);
    if (
      error?.message.indexOf(" 401") > -1 ||
      error?.response?.data?.status == 401 ||
      error?.data?.status == 401 ||
      error?.response?.data?.details[0] == "Access is denied"
    ) {
      this.props.onUpdateItem("openModalLogin", true);
      localStorage.setItem("user", JSON.stringify(defUser));
      this.context.setUList({ currentUser: defUser });
    } else {
      const resMessage = error?.response?.data || error.toString();

      if (
        resMessage.indexOf("Error") > -1 &&
        resMessage.indexOf(" 401") == -1
      ) {
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
    tournamentPayout = false;
    current_brackets = [];
    potential_brackets = [];
    totalPay = props.event.prize;
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
    const currentUser = this.context.uList.currentUser;
    const tit = this.props.tit;
    const desc = this.props.desc;
    let { progress, isUpLoading, progressLable, loading, activeIndex, item } =
      this.state;
    var _d = new Date();
    var _s = new Date(item.startTime);
    var _track = item.rules;

    if (isJson(_track)) {
      var _JsonTrack = JSON.parse(_track);
      RuleTrack = _JsonTrack["RuleTrack"];
      pointTrack = _JsonTrack["pointTrack"];
    } else {
      pointTrack = [
        {
          text: "Kills",
          weight: " x 20",
        },
        {
          text: "Damage Done",
          weight: " x 0.006",
        },
        {
          text: "Time Played",
          weight: " x 0.04",
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
      RuleTrack = [
        {
          text: "Min Match",
          weight: "20",
        },
        {
          text: "Min Level",
          weight: "50",
        },
        {
          text: "Total Point",
          weight: "Average of Top 20",
        },
      ];
    }
    //var events = eventGet;
    totalPay = item.prize;
    if (item.tournamentPayout && !tournamentPayout) {
      tournamentPayout = item.tournamentPayout
        .replace("2,", "1-2,")
        .replace("5,", "3-5,")
        .replace("10,", "6-10,")
        .replace("20,", "11-20,")
        .replace("50,", "21-50,")
        .replace("70,", "51-70,")
        .replace("100,", "71-100,")
        .replace("200,", "101-200,")
        .replace("400,", "201-500,");
      var payArr = tournamentPayout.split("@");

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
              prize: (intX[0] * totalPay) / 100,
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

        if (item.inSign != item.outSign) {
          var totalPay2 = (totalPay / item.totalPlayer) * item.players.length;
        } else {
          var totalPay2 = (totalPay * item.players.length) / item.totalPlayer;
        }
        if (parseInt(payplyer[0]) <= tItem && parseInt(payplyer[1]) >= tItem) {
          for (var j = 1; j < paylvl.length; j++) {
            if (paylvl[j].indexOf("x") == -1) {
              paylvl[j] = paylvl[j] + "x1";
            }

            var intX = paylvl[j].split("x");

            current_brackets.push({
              prize: (parseInt(intX[0]) * totalPay2) / 100,
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
      if (a.startTime > b.startTime) return 1;
      if (a.startTime < b.startTime) return -1;
      //if (a.ranking > b.ranking) return 1;
      //if (a.ranking < b.ranking) return -1;
    });
    icEnd = 0;
    icStart = 0;
    setTimeout(() => {
      $("#jsonhtml").html($("#jsonhtml2").text());
    }, 1000);
    {
      RuleTrack.map((win, i) => {
        if (win.text == "Min Match") {
          _minMatch = win.weight;
        }
      });
    }
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
            item.status,
            "",
            "yes"
          )}

          <Divider fitted style={{ opacity: 0 }} />
          {item.status == "Pending" && (
            <Countdown
              renderer={rendererBig}
              match={item}
              txt="@@@Start at"
              colorfinish={getColorStatus(item.status)}
              finish={item.status + "@@@Not Available"}
              date={date_edit_card(item.startTime)}
            />
          )}
          <Countdown
            renderer={rendererBig}
            match={item}
            txt="@@@Available Until"
            colorfinish={getColorStatus(item.status)}
            finish={item.status + "@@@Not Available"}
            date={date_edit_card(item.finished)}
          />
          {item.status != "Finished" && (
            <>
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
              <Divider style={{ opacity: 0 }} />
              {_s > _d && item.status == "Pending" && (
                <>
                  <div
                    style={{
                      position: "relative",
                      maxWidth: 300,
                      margin: "auto",
                      zIndex: 55,
                    }}
                  >
                    <AddToCal item={item} tit={tit} desc={desc} match={null} />
                  </div>
                  <br />
                  <br />
                </>
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
            </>
          )}
          <Col
            className="mx-auto text-center "
            lg="8"
            md="10"
            style={{ padding: 0, marginTop: 20 }}
          >
            {item.players?.length > 0 && (
              <Segment inverted color="red">
                <Header as="h2">Players</Header>

                <Message>
                  <List divided inverted selection verticalAlign="middle">
                    {item.players.map((player, i) => {
                      var _set = player.clashRoyaleSet;
                      if (item.gameName == "CallOfDuty") {
                        _set = player.callOfDuties;
                      }
                      return (
                        <List.Item key={i.toString()}>
                          <List.Content
                            style={{ textAlign: "left" }}
                            onClick={() =>
                              $("#" + player.username).toggleClass("hide")
                            }
                          >
                            <span>
                              <Label size="mini" circular color="black">
                                {player.ranking}
                              </Label>
                              <Link
                                to={"/user/" + player.username}
                                target="_blank"
                                style={{ position: "relative", left: 5 }}
                              >
                                <Avatar
                                  size="20"
                                  title={player.username}
                                  round={true}
                                  name={setAvatar(player.username)}
                                />
                              </Link>
                              {item.gameName == "CallOfDuty" && (
                                <>
                                  <Label
                                    style={{ marginLeft: 5 }}
                                    onClick={() =>
                                      window
                                        .open(
                                          "https://cod.tracker.gg/warzone/profile/" +
                                            player.gamePlatform
                                              .toLowerCase()
                                              .replace("battle", "battlenet")
                                              .replace("acti", "atvi") +
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
                                </>
                              )}
                              {item.gameName == "ClashRoyale" && (
                                <>
                                  <Label
                                    size="small"
                                    title={getchatTime(player.startTime)}
                                    onClick={() =>
                                      window
                                        .open(
                                          "https://statsroyale.com/profile/" +
                                            printTag(
                                              item.gameName,
                                              player.tagId
                                            ) +
                                            "/battles/",
                                          "_blank"
                                        )
                                        .focus()
                                    }
                                    style={{ cursor: "pointer" }}
                                  >
                                    {printTag(item.gameName, player.nickName)}
                                  </Label>
                                </>
                              )}
                              {current_brackets[i]?.prize &&
                                (item.status == "InPlay" ||
                                  item.status == "Finished") &&
                                player.totalScore > 0 && (
                                  <span
                                    style={
                                      _set.length < _minMatch &&
                                      item.status == "InPlay"
                                        ? { opacity: 0.4 }
                                        : null
                                    }
                                  >
                                    {getGroupBadgeBlock(
                                      item.outSign,
                                      current_brackets[i]?.prize,
                                      "Prize",
                                      "left hide",
                                      "green"
                                    )}
                                  </span>
                                )}
                            </span>
                            <span style={{ float: "right", marginLeft: 5 }}>
                              {(item.status != "Finished" ||
                                _set.length > 0) && (
                                <Label
                                  size="mini"
                                  color={
                                    _set.length >= _minMatch ? "green" : "red"
                                  }
                                >
                                  {_set.length}/{_minMatch}
                                </Label>
                              )}
                              <Label color="black" size="mini">
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

                            <Table
                              data={_set}
                              className="hide dataresult"
                              minMatch={_minMatch}
                              id={player.username}
                              pointTrack={pointTrack}
                              ruleTrack={RuleTrack}
                              game={item.gameName}
                            />
                          </List.Content>
                        </List.Item>
                      );
                    })}
                  </List>
                </Message>
                <Invite />
              </Segment>
            )}
            <Tracking item={item} rules={item.rules} />

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
              {(item.status == "Pending" || item.status == "InPlay") && (
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
                      specific positions will get paid if the tournament becomes
                      full.
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
              )}
              {item.players.length > 0 && (
                <>
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
                        (totalPay * item.players.length) / item.totalPlayer,
                        "Current Prize",
                        "left",
                        "green"
                      )}
                    </div>
                    <p style={{ margin: "20px 0" }}>
                      Current Prize Pool represents how much are players in
                      specific positions are currently getting paid. When the
                      Tournament is full, the current prize and potential prize
                      pools will be equal.
                    </p>
                    <Invite />
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
                              <span
                                style={{ textAlign: "left", marginLeft: 5 }}
                              >
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
                </>
              )}
            </Segment>
            {item.gameName == "CallOfDuty2" && (
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
            )}
          </Col>
        </Col>
      </>
    );
  }
}

export default withRouter(LeagueSection);
