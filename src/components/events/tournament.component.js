import React, { Component } from "react";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import "react-vertical-timeline-component/style.min.css";
import { faTwitch } from "@fortawesome/free-brands-svg-icons";
import {
  Statistic,
  Button,
  Label,
  Divider,
  Grid,
  Segment,
  Accordion,
  Header,
  List,
  Message,
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import $ from "jquery";
import userService from "services/user.service";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Countdown from "react-countdown";
import { Col, ProgressBar } from "react-bootstrap";
import {
  setAvatar,
  rendererBig,
  printEventBTN,
  vsComponentTitle,
  getMatchTitle,
  getColorStatus,
  printStatus,
  handleTagForm,
  vsComponentPlayer,
  getGroupBadgeBlock,
  printJoinalerts,
  genMatch,
  findMatch,
  genLink,
} from "components/include";
import { POSTURLTest } from "const";
import UserContext from "context/UserState";
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
var defaultActiveIndex = 0;
class TournamentSection extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.showDetails = this.showDetails.bind(this);
    this.handleJoinMatch = this.handleJoinMatch.bind(this);
    this.printErr = this.printErr.bind(this);
    this.handleHowStream = this.handleHowStream.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      myState: this.props.myState,
      item: this.props.event,

      eventid: this.props.event.id,
      matchid: this.props.findStateId(this.props.myState, "matchIDQ"),

      matchidFind: this.props.findStateId(this.props.myState, "match"),
      activeIndex: -1,

      progress: 0,
      selectedFile: null,

      isUpLoading: false,
      progressLable: "I Win",
      successful: false,
      loading: false,
      message: "",
    };
  }
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
          //alert(response)
          if (response.data.accessToken) {
            this.context.setUList({ currentUser: response.data });
            localStorage.setItem("user", JSON.stringify(response.data));
            Toast.fire({
              icon: "success",
              title: "Joined.",
            });
          } else {
            this.setState({
              loading: false,
            });

            {
              printJoinalerts(
                response.data,
                GName,
                this.context.uList.currentUser,
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
    const item = this.props.event;
    const currentUser = this.context.uList.currentUser;
    const matchid = this.props.findStateId(this.state.myState, "matchIDQ");
    let { loading } = this.state;
    item.matchTables.sort((a, b) => (a.level > b.level ? 1 : -1));
    item.players.sort((a, b) => (a.id > b.id ? 1 : -1));
    var isJoin = false;
    var lists = item.matchTables;

    mymatchFind = null;

    matchLevelFind = findMatch(item);
    if (item.status == "Finished") {
      lists.sort((a, b) => (a.level < b.level ? 1 : -1));
    } else {
      lists.sort((a, b) => (a.level > b.level ? 1 : -1));
    }
    lists.map((tblmatch) => {
      if (
        tblmatch.status != "Finished" &&
        (tblmatch.matchPlayers[0].username == currentUser.username ||
          tblmatch.matchPlayers[1].username == currentUser.username)
      ) {
        mymatchFind = tblmatch;
      }
    });
    if (matchLevelFind?.level > 0) {
      defaultActiveIndex = matchLevelFind.level - 1;
    }

    var activePlayer = 0;
    {
      item.players.map((user) => (
        <>{currentUser.username == user.username && (isJoin = true)}</>
      ));
    }
    if (item.gameMode == "Tournament") {
      if (!item.tournamentPayout) {
        item.tournamentPayout = "1-8, 65.00, 35.00|9-64, 50.00, 30.00, 20.00";
      }
      if (!item.matchLevel) {
        item.matchLevel = [];
        if (item.totalPlayer == 4) {
          item.matchLevel.push(genMatch(1, 2, "SemiFinal"));
          item.matchLevel.push(genMatch(2, 1, "Final"));
        }
        if (item.totalPlayer == 8) {
          item.matchLevel.push(genMatch(1, 4, "Round 1"));
          item.matchLevel.push(genMatch(2, 2, "SemiFinal"));
          item.matchLevel.push(genMatch(3, 1, "Final"));
        }
        if (item.totalPlayer == 16) {
          item.matchLevel.push(genMatch(1, 8, "Round 1"));
          item.matchLevel.push(genMatch(2, 4, "Round 2"));
          item.matchLevel.push(genMatch(3, 2, "SemiFinal"));

          item.matchLevel.push(genMatch(4, 1, "Final"));
          //item.matchLevel.push(genMatch(4, 1, "3rd Place"));
        }
        if (item.totalPlayer == 32) {
          item.matchLevel.push(genMatch(1, 16, "Round 1"));
          item.matchLevel.push(genMatch(2, 8, "Round 2"));
          item.matchLevel.push(genMatch(3, 4, "Round 3"));
          item.matchLevel.push(genMatch(4, 2, "SemiFinal"));

          item.matchLevel.push(genMatch(5, 1, "Final"));
          //item.matchLevel.push(genMatch(5, 1, "3rd Place"));
        }
      }
      var current_brackets = [];

      //var tournamentPayout = "8,100.00@16,65.00,35.00@32,50.00,30.00,20.00@64,48.00,27.00,15.00,10.00"
      var tournamentPayout =
        "4,100.00@8,65.00,35.00@16,50.00,30.00,10.00,10.00@32,50.00,30.00,10.00,10.00@64,50.00,30.00,10.00,10.000";
      //var events = eventGet;

      if (item.tournamentPayout) {
        var tournamentPayout = item.tournamentPayout
          .replace("4,", "1-4,")
          .replace("8,", "5-8,")
          .replace("16,", "9-16,")
          .replace("32,", "17-32,")
          .replace("64,", "33-64,");
        var payArr = tournamentPayout.split("@");
        var totalPay = item.prize;
        for (var i = 0; i < payArr.length; i++) {
          var paylvl = payArr[i].split(",");
          var payplyer = paylvl[0].split("-");
          var tItem = item.players.length;

          if (item.status == "Pending" || item.gameMode == "League") {
            tItem = item.totalPlayer;
          }
          // console.log(payplyer[0])
          if (
            item.players.length > item.totalPlayer ||
            item.players.length == 0
          ) {
            tItem = item.totalPlayer;
          }
          if (
            parseInt(payplyer[0]) <= tItem &&
            parseInt(payplyer[1]) >= tItem
          ) {
            for (var j = 1; j < paylvl.length; j++) {
              if (paylvl[j].indexOf("x") == -1) {
                paylvl[j] = paylvl[j] + "x1";
              }
              var intX = paylvl[j].split("x");
              current_brackets.push({
                prize: (intX[0] * totalPay) / 100,
                percent: intX[0],
                number: intX[1],
              });
            }
          }
        }
        for (var i = payArr.length - 1; i < payArr.length; i++) {
          var paylvl = payArr[i].split(",");
          var payplyer = paylvl[0].split("-");
          var tItem = item.players.length;
          if (item.status == "Pending" || item.gameMode == "League") {
            tItem = item.totalPlayer;
          }
          if (
            item.players.length > item.totalPlayer ||
            item.players.length == 0
          ) {
            tItem = item.totalPlayer;
          }
          if (
            parseInt(payplyer[0]) <= tItem &&
            parseInt(payplyer[1]) >= tItem
          ) {
            for (var j = 1; j < paylvl.length; j++) {
              if (paylvl[j].indexOf("x") == -1) {
                paylvl[j] = paylvl[j] + "x1";
              }
              var intX = paylvl[j].split("x");
              item.potential_brackets.push({
                prize: (intX[0] * totalPay) / 100,
                percent: intX[0],
                number: intX[1],
              });
            }
          }
        }
      }
    }

    const panels = item.matchLevel.map((match, i) => {
      var hatchbackCar = lists.filter(
        (list) => list.level === item.matchLevel[i].level
      );
      hatchbackCar.sort((a, b) => (a.id > b.id ? 1 : -1));

      return {
        key: `panel-${i}`,
        title: {
          content: (
            <>
              <br />
              <br />
              {hatchbackCar.length == 1 ? (
                <Label size="big" color="red">
                  {getMatchTitle(hatchbackCar[0].level, item.totalPlayer)}
                </Label>
              ) : (
                <>
                  {getMatchTitle(hatchbackCar[0].level, item.totalPlayer)}
                  <br />
                  <Label as="small" color="orange">
                    {hatchbackCar.length} MATCHES
                  </Label>
                </>
              )}
              <Countdown
                renderer={rendererBig}
                match={hatchbackCar[0]}
                size="mini"
                txt="@@@Start at"
                colorfinish={getColorStatus(item.status)}
                finish={item.status + "@@@Not Avalable"}
                date={hatchbackCar[0].startTime}
              />
            </>
          ),
        },

        content: hatchbackCar.map((mtch, z) => {
          hatchbackCar[z].matchPlayers.sort((a, b) => (a.id > b.id ? 1 : -1));
          var _link = genLink(item, mtch, z + 1);
          var _tit =
            item.gameMode +
            " " +
            item.gameName +
            " for " +
            item.prize +
            item.outSign
              .replace("Dollar", " USD")
              .replace("Point", " Diamonds") +
            " Prize  - " +
            getMatchTitle(mtch.level, item.totalPlayer) +
            " - No:" +
            z +
            1;
          return (
            <span key={z.toString()}>
              <Link to={_link} title={_tit}>
                <Segment inverted style={{ background: "none !important" }}>
                  <Grid columns={2}>
                    <Grid.Column
                      className={
                        mtch.winner == mtch?.matchPlayers[0]?.username
                          ? "coverwinner"
                          : null
                      }
                    >
                      {vsComponentPlayer(
                        item,
                        mtch,
                        0,
                        matchid,
                        currentUser,
                        loading,
                        false,
                        false
                      )}
                    </Grid.Column>
                    <Grid.Column
                      className={
                        mtch.winner == mtch?.matchPlayers[1]?.username
                          ? "coverwinner"
                          : null
                      }
                    >
                      {vsComponentPlayer(
                        item,
                        mtch,
                        1,
                        matchid,
                        currentUser,
                        loading,
                        false,
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

    if (item.status == "Canceled" || item.status == "Expired") {
      _color = "black";
      defaultActiveIndex = "";
    }
    var _finishTxt = "Not Joinable";

    if (item?.winner) {
      _finishTxt = item.winner;
    }
    icEnd = 0;
    icStart = 0;
    setTimeout(() => {
      $("#jsonhtml").html($("#jsonhtml2").text());
    }, 100);
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
          <Countdown
            renderer={rendererBig}
            match={matchLevelFind}
            txt="@@@Start at"
            colorfinish={getColorStatus(item.status)}
            finish={item.status + "@@@Not Avalable"}
            date={matchLevelFind.startTime}
          />
          <Divider fitted style={{ opacity: 0 }} />

          {printEventBTN(
            item,
            currentUser,
            loading,
            activePlayer,
            isJoin,
            mymatchFind,
            this.handleJoinMatch,
            this.props.onUpdateItem
          )}
          {item.status == "Pending" &&
          item.players.length < item.totalPlayer ? (
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
                  {item.status == "InPlay" && (
                    <Statistic inverted color="violet" size="mini">
                      <Statistic.Label>Match Level</Statistic.Label>
                      <Statistic.Value>
                        {getMatchTitle(matchLevelFind.level, item.totalPlayer)}
                      </Statistic.Value>
                    </Statistic>
                  )}
                  <Divider style={{ opacity: 0 }} />
                </>
              )}
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
          {item.status != "Canceled" && item.status != "Expired" && (
            <>
              <Divider style={{ opacity: 0 }} />
              <Accordion
                defaultActiveIndex={[matchLevelFind.level - 1]}
                panels={panels}
                exclusive={false}
                fluid
                inverted
              />
            </>
          )}
          <Col
            className="mx-auto text-center "
            lg="8"
            md="10"
            style={{ padding: 0, marginTop: 120 }}
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
              <h3>Nobody is currently live</h3>
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
                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    transform: "scale(1.3 )",
                  }}
                >
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
                  {current_brackets.map((win, i) => {
                    icStart = icStart + 1;
                    icEnd = icEnd + parseInt(win.number);
                    var icShow = "#" + icStart;
                    if (icStart != icEnd) {
                      icShow = icShow + " - #" + icEnd;
                      icStart = icEnd;
                    }

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
                          <span style={{ textAlign: "left", marginLeft: 5 }}>
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
            </Segment>
            <Segment inverted color="purple">
              <Header as="h2">Rules</Header>
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

export default withRouter(TournamentSection);
