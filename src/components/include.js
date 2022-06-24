import React, { lazy } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlaystation,
  faXbox,
  faInstagram,
  faTwitch,
  faYoutube,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faDesktop,
  faMobileAlt,
  faGlobe,
  faAngleDoubleUp,
} from "@fortawesome/free-solid-svg-icons";
import Avatar from "react-avatar";
import Countdown from "react-countdown";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import userService from "services/user.service";
import MatchCard from "components/matchblock.component";
import $ from "jquery";
//import TransitionExampleTransitionExplorer from "components/anim.component";
//const MatchCard = lazy(() => import("components/matchblock.component"));
const TransitionExampleTransitionExplorer = lazy(() =>
  import("components/anim.component")
);
const CopyText = lazy(() => import("components/copy.component"));
const ReadySection = lazy(() => import("components/ready.component"));
import eventBus from "views/eventBus";
//import CopyText from "components/copy.component";
//import ReadySection from "components/ready.component";
import {
  Statistic,
  Button,
  Icon,
  Label,
  Divider,
  Grid,
  Segment,
  Card,
  Dimmer,
  Checkbox,
  Image,
  Flag,
} from "semantic-ui-react";
// react-bootstrap components
import {
  Badge,
  Row,
  Col,
  Carousel,
  ProgressBar,
  ListGroup,
} from "react-bootstrap";

const moment = require("moment");
const nullplayer = {
  id: 100000,

  username: false,
  ready: false,
};
export const getQueryVariable = (variable, q) => {
  if (q) {
    var query = q;
  } else {
    var query = window.location.search.substring(1);
  }
  //console.log(query);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
};
export const getPageVariable = () => {
  var query = window.location.href;
  var vars = query.split("/")[4];
  if (typeof vars == "undefined") {
    vars = query.split("/")[3];
  }
  //console.log(vars)
  return vars;
};

export const get_date_locale = (thisDate) => {
  var d = new Date(thisDate);

  var b = d.toLocaleDateString() + " " + d.toTimeString();
  return b;
};
export const date_edit = (thisDate) => {
  //var thisDate2 = thisDate.replace("-07:00", "+00:00");

  var mom = moment.parseZone(thisDate).utc().format();
  //console.log(mom);
  mom = editDateTime(mom);
  // console.log(mom);
  //console.log('momennt: '+mom)
  return mom;
};
export const date_edit_report = (thisDate) => {
  var thisDate2 = thisDate.replace("-07:00", "+00:00");

  var mom = moment(thisDate2).local().format("MM-DD HH:mm");

  // console.log(mom);
  //console.log('momennt: '+mom)
  return mom;
};
export const date_edit_card = (thisDate) => {
  var thisDate2 = thisDate.replace("-07:00", "+00:00");

  var mom = moment(thisDate2).local().format();

  // console.log(mom);
  //console.log('momennt: '+mom)
  return mom;
};
export const date_edit_dec = (thisDate) => {
  //var thisDate2 = thisDate.replace("-07:00", "+00:00");

  //var mom = moment(thisDate).local().format();
  var mom = moment.parseZone(thisDate).utc().format();
  //mom = moment(mom).utcOffset("+07:00").format();

  //mom = date_edit_report(mom);

  //console.log('momennt: '+mom)
  return mom;
};
export const date_locale = (thisDate) => {
  var d = new Date(thisDate);

  return d.toLocaleDateString();
};
export const isJson = (item) => {
  item = typeof item !== "string" ? JSON.stringify(item) : item;

  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }

  if (typeof item === "object" && item !== null) {
    return true;
  }

  return false;
};
export const setAvatar = (name) => {
  var str = name;

  if (!isJson(str)) {
    var res = str.substring(0, 1);
    res = res + " " + str.substring(str.length - 3, str.length - 2);
  } else {
    var res = "";
  }

  return res;
};

export const getIcon = (name) => {
  if (name == "All") {
    return faGlobe;
  }
  if (name == "Mobile") {
    return faMobileAlt;
  }
  if (name == "PS4" || name == "PS5") {
    return faPlaystation;
  }
  if (name == "XBOX") {
    return faXbox;
  }
  if (name == "PC") {
    return faDesktop;
  }
};
export const getTagName = (game, console) => {
  if (console == "Mobile") {
    if (game.indexOf("Plato") > -1) {
      return "Plato";
    } else {
      return game;
    }
  }
  if (console == "PS4" || console == "PS5") {
    return "PSN";
  }

  if (console == "XBOX") {
    return console;
  }
  if (console == "PC") {
    return game;
  }
};
export const getColor = (amount) => {
  if (amount <= 10) {
    return "green";
  } else if (amount <= 40) {
    return "orange";
  } else if (amount >= 10) {
    return "red";
  }
};
export const printJoinalerts = (
  response,
  GName,
  currentUser,
  setSelectedTag,
  propsSend
) => {
  if (response == "balanceError") {
    var resMessage = "To enter this event you need to have more balance!";
    Swal.fire({
      title: "Error!",
      text: resMessage,
      icon: "error",
      showCancelButton: true,
      confirmButtonText: `Go to Cashier`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        propsSend.onUpdateItem("openModalAdd", false);
        propsSend.history.push("/panel/cashier");
      }
    });
  } else if (response == "pointBalanceError") {
    var resMessage = "To enter this event you need to have more dimonds!";
    Swal.fire({
      title: "Error!",
      text: resMessage,
      icon: "error",
      showCancelButton: true,
      confirmButtonText: `Go to Rewards`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        propsSend.onUpdateItem("openModalAdd", false);
        propsSend.history.push("/panel/rewards");
      }
    });
  } else if (response == "tagError") {
    var e = GName.value.split(" - ")[0];
    var p = GName.value.split(" - ")[1];

    if (p == "PS4" || e == "PS4") {
      e = "PSN";
      p = "PSN";
    }
    if (p == "PS5" || e == "PS5") {
      e = "PSN";
      p = "PSN";
    }
    if (p == "XBOX" || e == "XBOX") {
      e = "XBOX";
      p = "XBOX";
    }

    setSelectedTag(e.replace(" Warzone", "").split(" ")[0], p, currentUser);
  } else {
    Swal.fire({
      title: "Error!",
      text: response,
      icon: "error",

      confirmButtonText: `Ok`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        propsSend.onUpdateItem("openModalAdd", false);
      }
    });
  }
};
export const getColorStatus = (status) => {
  var _col = "red";
  if (status == "Ready") {
    _col = "blue";
  }
  if (status == "InPlay") {
    _col = "purple";
  }
  if (status == "Pending") {
    _col = "green";
  }
  if (status == "Finished") {
    _col = "black";
  }
  if (status == "Canceled" || status == "Expired") {
    _col = "red";
  }
  return _col;
};
export const getMatchTitle = (level, totalPlayer) => {
  var mTitle = "Round 1";
  if (totalPlayer == 4) {
    if (level == 1) {
      mTitle = "SemiFinal";
    }
    if (level == 2) {
      mTitle = "Final";
    }
  }
  if (totalPlayer == 8) {
    if (level == 2) {
      mTitle = "SemiFinal";
    }
    if (level == 3) {
      mTitle = "Final";
    }
  }
  if (totalPlayer == 16) {
    if (level == 2) {
      mTitle = "Round 2";
    }
    if (level == 3) {
      mTitle = "SemiFinal";
    }
    if (level == 4) {
      mTitle = "Final";
    }
    //if(level==4){mTitle = "3rd Place"}
  }
  if (totalPlayer == 32) {
    if (level == 2) {
      mTitle = "Round 2";
    }
    if (level == 3) {
      mTitle = "Round 3";
    }
    if (level == 4) {
      mTitle = "SemiFinal";
    }
    if (level == 5) {
      mTitle = "Final";
    }
    //if(level==5){mTitle = "3rd Place"}
  }
  if (totalPlayer == 64) {
    if (level == 2) {
      mTitle = "Round 2";
    }
    if (level == 3) {
      mTitle = "Round 3";
    }
    if (level == 4) {
      mTitle = "Round 4";
    }
    if (level == 5) {
      mTitle = "SemiFinal";
    }
    if (level == 6) {
      mTitle = "Final";
    }
    //if(level==5){mTitle = "3rd Place"}
  }
  if (totalPlayer == 128) {
    if (level == 2) {
      mTitle = "Round 2";
    }
    if (level == 3) {
      mTitle = "Round 3";
    }
    if (level == 4) {
      mTitle = "Round 4";
    }
    if (level == 5) {
      mTitle = "Round 5";
    }
    if (level == 6) {
      mTitle = "SemiFinal";
    }
    if (level == 7) {
      mTitle = "Final";
    }
    //if(level==5){mTitle = "3rd Place"}
  }
  if (totalPlayer == 256) {
    if (level == 2) {
      mTitle = "Round 2";
    }
    if (level == 3) {
      mTitle = "Round 3";
    }
    if (level == 4) {
      mTitle = "Round 4";
    }
    if (level == 5) {
      mTitle = "Round 5";
    }
    if (level == 6) {
      mTitle = "Round 6";
    }
    if (level == 7) {
      mTitle = "SemiFinal";
    }
    if (level == 8) {
      mTitle = "Final";
    }
    //if(level==5){mTitle = "3rd Place"}
  }
  return mTitle;
};
export const getGroupBadge = (sign, amount, classes) => {
  if (sign == "Dollar") {
    var nAmount = Number.parseFloat(amount).toFixed(2);
  } else {
    var nAmount = Number.parseFloat(amount).toFixed(0);
  }

  return (
    <div style={{ height: 30, padding: "2px 0" }}>
      <Badge variant={getColor(amount)} className={"badgegroup " + classes}>
        <span className="cur">
          <img
            alt={"loole " + sign}
            src={"/assets/images/" + sign + ".svg"}
          ></img>
        </span>
        <CurrencyFormat
          value={nAmount}
          displayType={"text"}
          thousandSeparator={true}
          prefix={""}
          renderText={(value) => <span className="lable">{value}</span>}
        />
      </Badge>
    </div>
  );
};

export const getGroupBadgeBlock = (sign, amount, label, pos) => {
  if (sign == "Dollar") {
    var nAmount = Number.parseFloat(amount).toFixed(2);
    var nIcon = "dollar";
    var nColor = "red";
  } else {
    var nAmount = Number.parseFloat(amount).toFixed(0);
    var nIcon = "diamond";
    var nColor = "teal";
  }

  return (
    <>
      {pos == "right" && (
        <Label pointing={pos} size="mini" basic color="green">
          {label}
        </Label>
      )}

      <Label
        size="small"
        title={sign.replace("Dollar", "USD").replace("Point", "Diamonds")}
        basic
      >
        <Icon name={nIcon} color={nColor} />
        {!isNaN(parseFloat(amount)) && isFinite(amount) ? (
          <CurrencyFormat
            value={nAmount}
            displayType={"text"}
            thousandSeparator={true}
            prefix={""}
            renderText={(value) => value}
          />
        ) : (
          amount
        )}
      </Label>
      {pos == "left" && (
        <Label pointing={pos} size="mini" basic color="blue">
          {label}
        </Label>
      )}
    </>
  );
};
export const getGroupBadgeList = (sign, amount, classes) => {
  if (sign == "Dollar") {
    var nAmount = Number.parseFloat(amount).toFixed(2);
  } else {
    var nAmount = Number.parseFloat(amount).toFixed(0);
  }
  return (
    <Badge variant={getColor(amount)} className={classes}>
      <span className="cur" style={{ float: "left" }}>
        <img alt={"loole dollar"} src={"/assets/images/" + sign + ".svg"}></img>
      </span>
      <CurrencyFormat
        value={nAmount}
        displayType={"text"}
        thousandSeparator={true}
        prefix={""}
        renderText={(value) => (
          <span className="lable">
            &nbsp; <b>{value}</b>
          </span>
        )}
      />
    </Badge>
  );
};
export const getIconPlat = (name) => {
  if (!name) return null;
  var _i = faDesktop;

  if (name.toLowerCase() == "mobile") {
    _i = faMobileAlt;
  }
  if (name.toLowerCase() == "psn") {
    _i = faPlaystation;
  }
  if (name.toLowerCase() == "xbl") {
    _i = faXbox;
  }
  if (name.toLowerCase() == "acti") {
    _i = faAngleDoubleUp;
  }

  return <Icon as={FontAwesomeIcon} fixedWidth icon={_i} />;
};
export const printTag = (game, tag) => {
  var _tag = tag.replace(/-/g, "");

  if (game == "8Pool") {
    _tag =
      _tag.substring(0, 3) +
      "-" +
      _tag.substring(3, 6) +
      "-" +
      _tag.substring(6, 9) +
      "-" +
      _tag.substring(9, 10);
  }
  if (game == "CallOfDuty") {
    _tag = _tag.replace("%23", "#");
  }

  return _tag;
};
export const vsComponentPlayer = (
  item,
  matchidFind,
  num,
  matchid,
  currentUser,
  isloading,
  handlechangeReadyEvent,
  loading,
  matchidQ,
  setVisible,
  setMessageBox
) => {
  try {
    var player = matchidFind.matchPlayers[num];
    player = JSON.parse(
      JSON.stringify(player)
        .replace(/"Tournament Player1"/g, false)
        .replace(/"Tournament Player"/g, false)
    );
  } catch (e) {
    var player = nullplayer;
  }

  var ischeck = false;
  if (player?.ready) {
    ischeck = player?.ready;
  }
  if (isloading && !loading) {
    ischeck = !player?.ready;
  }

  var padd = 10;
  if (
    matchidFind.status == "Ready" &&
    isPlayerInMatch(matchidFind, currentUser.username)
  ) {
    padd = 60;
  }
  if (
    matchidFind.status == "InPlay" &&
    (isPlayerInMatch(matchidFind, currentUser.username) ||
      haveAdmin(currentUser.roles) ||
      haveModerator(currentUser.roles))
  ) {
    padd = 60;
  }
  if (
    matchidFind.status == "InPlay" &&
    item.players[num].nickName &&
    item.players[num].tagId != item.players[num].nickName &&
    (isPlayerInMatch(matchidFind, currentUser.username) ||
      haveAdmin(currentUser.roles) ||
      haveModerator(currentUser.roles))
  ) {
    padd = 150;
  }
  //if(matchidFind.status == "Pending" && item.gameMode == 'Tournament') {padd = padd + 50}
  if (item.gameMode == "Tournament" && !matchidQ) {
    padd = 0;
  }

  var user = (
    <div style={{ overflow: "hidden", padding: "0px 0 " + padd + "px 0" }}>
      {handlechangeReadyEvent || matchidQ > 0 ? (
        <Statistic
          inverted
          size="mini"
          as={player?.username ? Link : Statistic}
          to={player?.username ? "/user/" + player?.username : null}
          target="_blank"
        >
          <Statistic.Value>
            {player?.username == matchidFind.winner && matchidFind.winner && (
              <Icon
                circular
                color="yellow"
                size="mini"
                name="winner"
                style={{ position: "absolute", fontSize: 12, marginLeft: -8 }}
              />
            )}
            {player?.username ? (
              <Avatar
                size="50"
                round={true}
                title={player.username}
                name={setAvatar(player.username)}
              />
            ) : (
              <Image
                size="mini"
                circular
                src="/assets/img/avat.jpg"
                alt="no user"
                color="lightgray"
                className="avatar"
              />
            )}
          </Statistic.Value>
          <Statistic.Label>
            <small>
              {player?.username ? <>{player.username}</> : <>...</>}
            </small>
          </Statistic.Label>
        </Statistic>
      ) : (
        <Statistic inverted size="mini">
          <Statistic.Value>
            {player?.username == matchidFind.winner && matchidFind.winner && (
              <Icon
                circular
                color="yellow"
                size="mini"
                name="winner"
                style={{ position: "absolute", fontSize: 12, marginLeft: -8 }}
              />
            )}
            {player?.username ? (
              <Avatar
                size="50"
                round={true}
                title={player.username}
                name={setAvatar(player.username)}
              />
            ) : (
              <Image
                size="mini"
                circular
                src="/assets/img/avat.jpg"
                alt="no user"
                color="lightgray"
                className="avatar"
              />
            )}
          </Statistic.Value>
          <Statistic.Label>
            <small>
              {player?.username ? <>{player.username}</> : <>...</>}
            </small>
          </Statistic.Label>
        </Statistic>
      )}
    </div>
  );

  var ready = (
    <>
      {player?.username == currentUser.username &&
      isPlayerInMatch(matchidFind, currentUser.username) ? (
        <div
          style={
            matchidFind.status != "Ready" || isloading
              ? {
                  width: "90%",
                  maxWidth: 150,
                  margin: "auto",
                  position: "relative",
                  zIndex: 10,
                  opacity: 0.5,
                }
              : {
                  width: "90%",
                  maxWidth: 150,
                  margin: "auto",
                  position: "relative",
                  zIndex: 10,
                }
          }
        >
          <small>Ready</small>
          <br />
          <Checkbox
            toggle
            defaultChecked={ischeck}
            disabled={player.username != currentUser.username}
            onChange={(checked) => {
              handlechangeReadyEvent(checked);
            }}
          />
        </div>
      ) : (
        <div
          style={{
            width: "90%",
            maxWidth: 150,
            margin: "auto",
            position: "relative",
            zIndex: 10,
            opacity: 0.5,
          }}
        >
          <small>Ready</small>
          <br />
          <Checkbox toggle checked={player?.ready} disabled />
        </div>
      )}
    </>
  );
  var _p = null;
  item.players.map(function (plyr) {
    if (player?.username == plyr.username) {
      _p = plyr;
    }
  });

  var info = (
    <>
      {_p &&
        _p.username != "Tournament Player" &&
        (isPlayerInMatch(matchidFind, currentUser.username) ||
          haveAdmin(currentUser.roles) ||
          haveModerator(currentUser.roles)) && (
          <>
            {item.gameName != "ClashRoyale" &&
            item.gameName.indexOf("Plato") == -1 ? (
              <>
                {_p.tagId && (
                  <Statistic inverted color="red" size="mini">
                    <Statistic.Label>
                      {getTagName(item.gameName, item.gameConsole)} iD
                    </Statistic.Label>
                    <Statistic.Value>
                      {isPlayerInMatch(matchidFind, currentUser.username) ||
                      haveAdmin(currentUser.roles) ||
                      haveModerator(currentUser.roles) ? (
                        <CopyText
                          color="red"
                          size="small"
                          myid={printTag(item.gameName, _p.tagId)}
                        />
                      ) : (
                        "**********"
                      )}
                    </Statistic.Value>
                  </Statistic>
                )}
                {_p.nickName && _p.tagId != _p.nickName && (
                  <>
                    <Divider fitted style={{ opacity: 0 }} />
                    <Statistic inverted color="olive" size="mini">
                      <Statistic.Label>Nickname</Statistic.Label>

                      <Statistic.Value>
                        {isPlayerInMatch(matchidFind, currentUser.username) ||
                        haveAdmin(currentUser.roles) ||
                        haveModerator(currentUser.roles)
                          ? _p.nickName
                          : "**********"}
                      </Statistic.Value>
                    </Statistic>
                  </>
                )}
              </>
            ) : (
              <>
                <Divider fitted style={{ opacity: 0 }} />

                {item.gameName == "ClashRoyale" ? (
                  <>
                    <Statistic inverted color="olive" size="mini">
                      <Statistic.Label>Nickname</Statistic.Label>

                      <Statistic.Value className="nnick">
                        {isPlayerInMatch(matchidFind, currentUser.username) ||
                        haveAdmin(currentUser.roles) ||
                        haveModerator(currentUser.roles)
                          ? _p.nickName
                          : "**********"}
                      </Statistic.Value>
                    </Statistic>
                    <TransitionExampleTransitionExplorer
                      objanim={
                        <div
                          style={{ padding: 10 }}
                          onClick={() => {
                            try {
                              navigator.clipboard
                                .readText()
                                .then((clipText) => {
                                  if (clipText.indexOf("http") > -1) {
                                    setVisible(true);
                                    setMessageBox(clipText);
                                    setMessageBox("");
                                  } else {
                                    setVisible(true);
                                  }
                                });
                            } catch (e) {
                              setVisible(true);
                            }
                          }}
                        >
                          Paste your {item.gameName.split(" ")[0]} Invite link
                          in chat bar.
                        </div>
                      }
                      animation="flash"
                      duration={1500}
                    />
                  </>
                ) : (
                  <>
                    {_p.tagId && (
                      <Statistic inverted color="red" size="mini">
                        <Statistic.Label>
                          {getTagName(item.gameName, item.gameConsole)} iD
                        </Statistic.Label>
                        <Statistic.Value>
                          {isPlayerInMatch(matchidFind, currentUser.username) ||
                          haveAdmin(currentUser.roles) ||
                          haveModerator(currentUser.roles) ? (
                            <CopyText
                              color="red"
                              size="small"
                              myid={printTag(item.gameName, _p.tagId)}
                            />
                          ) : (
                            "**********"
                          )}
                        </Statistic.Value>
                      </Statistic>
                    )}
                    {currentUser.username != _p.username ? (
                      <>
                        <Divider fitted style={{ opacity: 0 }} />
                        <Button as="a" href={_p.nickName} color="red">
                          Open Plato
                        </Button>
                      </>
                    ) : (
                      <>
                        <Divider fitted style={{ opacity: 0 }} />
                        <Button as="a" href="" disabled color="grey">
                          Open Plato
                        </Button>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}
    </>
  );
  return (
    <>
      <div
        style={
          !_p ? { opacity: 0.3, overflow: "hidden" } : { overflow: "hidden" }
        }
      >
        <ReadySection
          user={user}
          player={player}
          item={item}
          objanim={ready}
          info={info}
          matchidFind={matchidFind}
          isUser={currentUser}
          ischeck={ischeck}
          visible={
            (matchidFind.status == "Ready" || matchidFind.status == "InPlay") &&
            (isPlayerInMatch(matchidFind, currentUser.username) ||
              haveAdmin(currentUser.roles) ||
              haveModerator(currentUser.roles))
              ? true
              : false
          }
        />
      </div>
    </>
  );
};
export const printMatchBTN = (
  item,
  match,
  matchid,
  currentUser,
  isloading,
  activePlayer,
  handlechangeReadyEvent,
  handleJoinMatch,
  handleLeaveMatch,
  loading
) => {
  var _res = "VS";
  {
    (item.status == "Pending" || item.status == "Ready") && (
      <>
        {isPlayerInMatch(match, currentUser.username) ? (
          <>
            {match.matchPlayers[0]?.username != currentUser.username &&
              !match.matchPlayers[1]?.ready && (
                <>
                  {
                    (_res = (
                      <>
                        <Button
                          animated
                          size="small"
                          className="mobile hidden"
                          inverted
                          onClick={handleLeaveMatch}
                          color="red"
                          disabled={isloading}
                          loading={loading}
                          style={{ position: "relative", top: -10 }}
                        >
                          <Button.Content visible>Leave Match</Button.Content>
                          <Button.Content hidden>
                            <Icon name="arrow left" />
                          </Button.Content>
                        </Button>
                        <Button
                          size="small"
                          className="mobile only"
                          inverted
                          onClick={handleLeaveMatch}
                          color="red"
                          disabled={isloading}
                          loading={loading}
                          style={{ position: "relative", top: -10 }}
                        >
                          <Button.Content visible>Leave</Button.Content>
                        </Button>
                      </>
                    ))
                  }
                </>
              )}
          </>
        ) : (
          <>
            {item.totalPlayer > activePlayer && (
              <>
                {
                  (_res = (
                    <>
                      <Button
                        animated
                        className="mobile hidden joineventbtn"
                        onClick={handleJoinMatch}
                        color="green"
                        disabled={isloading || !currentUser.userActivate}
                        loading={isloading}
                        style={{ position: "relative", top: -10 }}
                      >
                        <Button.Content visible>Join Match</Button.Content>
                        <Button.Content hidden>Join Now</Button.Content>
                      </Button>
                      <Button
                        size="small"
                        className="mobile only joineventbtn"
                        inverted
                        onClick={handleJoinMatch}
                        color="green"
                        disabled={isloading || !currentUser.userActivate}
                        loading={isloading}
                        style={{ position: "relative", top: -10 }}
                      >
                        <Button.Content visible>Join</Button.Content>
                      </Button>
                    </>
                  ))
                }
              </>
            )}
          </>
        )}
      </>
    );
  }
  return _res;
};
export const printEventBTN = (
  item,
  currentUser,
  isloading,
  activePlayer,
  isJoin,
  mymatchFind,
  handleJoinMatch,
  onUpdateItem
) => {
  var _link = genLink(item, mymatchFind);

  return (
    <>
      {(item.status == "Pending" ||
        item.status == "Ready" ||
        item.status == "InPlay") && (
        <p style={{ margin: 0 }}>
          {!isJoin && item.totalPlayer > item.players.length ? (
            <>
              <Button
                animated
                size="huge"
                onClick={handleJoinMatch}
                loading={isloading}
                color="green"
                className="joineventbtn"
                disabled={isloading || !currentUser.userActivate}
              >
                <Button.Content visible>Join Event</Button.Content>
                <Button.Content hidden>Join now</Button.Content>
              </Button>
            </>
          ) : (
            <>
              {mymatchFind && (
                <>
                  <Link to={_link}>
                    <Button size="big" inverted color="orange">
                      <Button.Content>
                        Open My Match
                        <br />
                        <h1>
                          {getMatchTitle(mymatchFind.level, item.totalPlayer)}
                        </h1>
                      </Button.Content>
                    </Button>
                  </Link>
                </>
              )}
            </>
          )}
        </p>
      )}
    </>
  );
};
export const vsComponentTitle = (item) => {
  var title = document.title;
  title = title.replace(/-/g, " ");
  return (
    <>
      <Statistic inverted color={getColor(item.prize)}>
        <Statistic.Value as="h1">
          {item.gameName} {item.gameMode}{" "}
        </Statistic.Value>
        <Statistic.Label>
          <span className="text-muted">
            <FontAwesomeIcon fixedWidth icon={getIcon(item.gameConsole)} />{" "}
            {item.gameConsole}
          </span>
        </Statistic.Label>
      </Statistic>

      <div style={{ transform: "scale(1.6)" }}>
        <div style={{ margin: "15px 0", overflow: "hidden", width: "100%" }}>
          <div
            className="content left floated "
            style={{ minHeight: 10, padding: 2 }}
          >
            {getGroupBadgeBlock(
              item.outSign,
              item.prize,
              "Prize",
              "left",
              getColor(item.prize)
            )}
          </div>
          <div
            className="content right floated "
            style={{ minHeight: 10, padding: 2 }}
          >
            {getGroupBadgeBlock(
              item.inSign,
              item.amount,
              "Fee",
              "right",
              getColor(item.amount)
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export const vsComponent = (
  item,
  match,
  matchid,
  currentUser,
  isloading,
  activePlayer,
  handlechangeReadyEvent,
  handleJoinMatch,
  handleLeaveMatch,
  handlecAlertLost,
  fileUpload,
  onChangeHandler,
  handlecAlertWin,
  isUpLoading,
  progress,
  progressLable
) => {
  var _finishTxt = "Not Joinable";
  //if (match.status) { _finishTxt = match.status}
  //if (match.winner) { _finishTxt = match.winner}
  var _mode = " 1 vs 1 ";
  var _color = "#404040";

  if (item.gameMode == "Tournament" || item.gameMode == "League") {
    _mode = item.gameMode;
  }

  if (item.status == "Canceled" || item.status == "Expired") {
    //_color = "black";
  }
  return (
    <>
      {vsComponentTitle(item)}
      <Divider fitted style={{ opacity: 0 }} />
      {printStatus(
        item,
        _mode,
        _color,
        item.status + "@@@" + _finishTxt,
        item.status,
        "no"
      )}
      <Countdown
        renderer={rendererBig}
        finish={item.status + "@@@" + _finishTxt}
        txt="@@@Available until"
        match={match}
        colorfinish={getColor(item.prize)}
        date={item.expire}
      />

      <Segment basic>
        <Grid columns={2}>
          <Grid.Column
            style={{ background: "none !important" }}
            className={
              match.winner != null &&
              match.winner == match.matchPlayers[0]?.username
                ? "coverwinner"
                : null
            }
          >
            {vsComponentPlayer(
              item,
              match,
              0,
              matchid,
              currentUser,
              isloading,
              handlechangeReadyEvent
            )}
          </Grid.Column>
          <Grid.Column
            style={{ background: "none !important" }}
            className={
              match.winner != null &&
              match.winner == match.matchPlayers[1]?.username
                ? "coverwinner"
                : null
            }
          >
            {vsComponentPlayer(
              item,
              match,
              1,
              matchid,
              currentUser,
              isloading,
              handlechangeReadyEvent
            )}
          </Grid.Column>
        </Grid>

        <Divider vertical inverted>
          {printMatchBTN(
            item,
            match,
            matchid,
            currentUser,
            isloading,
            activePlayer,
            handlechangeReadyEvent,
            handleJoinMatch,
            handleLeaveMatch
          )}
        </Divider>
      </Segment>
      {match.status == "InPlay" && (
        <>
          {isPlayerInMatch(match, currentUser.username) && (
            <>
              {item.gameName != "ClashRoyale" && (
                <Statistic inverted size="small">
                  <Statistic.Label>Match Code</Statistic.Label>
                  <Statistic.Value className="matchcode">
                    {getCode(match.matchCode)}
                  </Statistic.Value>
                </Statistic>
              )}
              <Button.Group size="big" widths="3">
                <Button
                  color="red"
                  onClick={handlecAlertLost}
                  disabled={isloading}
                  loading={isloading}
                >
                  I Lost
                </Button>
                <Button.Or color="red" style={{ minWidth: 5 }} />
                <Button
                  animated
                  onClick={handlecAlertWin}
                  color="green"
                  inverted
                  disabled={isUpLoading}
                >
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
                ref={fileUpload}
                onChange={onChangeHandler}
              />
            </>
          )}
        </>
      )}
    </>
  );
};
export const getGroupBadgePrice = (sign, amount) => {
  if (sign == "Dollar") {
    var nAmount = Number.parseFloat(amount).toFixed(2);
  } else {
    var nAmount = Number.parseFloat(amount).toFixed(0);
  }
  return (
    <>
      <Button as="div" labelPosition="right" size="small">
        <Button color={getColor(amount)}>
          Prize:{" "}
          <CurrencyFormat
            value={nAmount}
            displayType={"text"}
            thousandSeparator={true}
            prefix={""}
            renderText={(value) => <b>{value}</b>}
          />
        </Button>
        <Label as="div" basic color={getColor(amount)} pointing="left">
          <img
            style={{ width: "20px" }}
            alt={"loole " + sign}
            src={"/assets/images/" + sign + ".svg"}
          ></img>
        </Label>
      </Button>
    </>
  );
};
export const getGroupBadgesmall = (sign, amount) => {
  if (sign == "Dollar") {
    var nAmount = Number.parseFloat(amount).toFixed(2);
  } else {
    var nAmount = Number.parseFloat(amount).toFixed(0);
  }
  return (
    <>
      <Button as="div" labelPosition="right" size="mini">
        <Button color={getColor(amount)} size="mini">
          <CurrencyFormat
            value={nAmount}
            displayType={"text"}
            thousandSeparator={true}
            prefix={""}
            renderText={(value) => <b>{value}</b>}
          />
        </Button>
        <Label as="div" basic color={getColor(amount)} pointing="left">
          <img
            style={{ width: 15 }}
            alt={"loole " + sign}
            src={"/assets/images/" + sign + ".svg"}
          ></img>
        </Label>
      </Button>
    </>
  );
};
export const getModalTag = (filtermode) => {
  // console.log(filtermode)
  if (filtermode.indexOf(" - ") > -1) {
    var filter = filtermode.split(" - ")[0];
    var controlname = filtermode.split(" - ")[1];
  } else {
    var filter = filtermode;
    var controlname = filtermode;
  }

  let tagsof = {};

  if (filter == "8Pool") {
    tagsof = {
      customClass: "tag",
      title: "Connect Your 8Pool Account",
      focusConfirm: false,
      html: `<div class="card-plain card text-left" >
              <ol><li>Open player profile in 8BallPool</li><li>Open player profile in 8BallPool</li><li>Copy Unique ID</li><li>Paste the Unique ID below
              <div className="form-group">
              <label>Enter your Unique ID</label>
                <input class="form-control" id="tagid" type="tel" pattern="[0-9]" /></div>
       </li><li>and then enter your 8BallPool Nickname below
       <div className="form-group">
       <label>Enter your Nickname</label>
       <input class="form-control" id="tagname" type="text" /></div>
    </li></ol>
       
              
              `,

      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "grey",
      confirmButtonText: "Connect",

      showLoaderOnConfirm: true,
      preConfirm: () => {
        if (
          document.getElementById("tagid").value &&
          document.getElementById("tagname").value
        ) {
          return {
            tagid: document.getElementById("tagid").value,
            tagname: document.getElementById("tagname").value,
          };
        } else {
          Swal.showValidationMessage(`All fields are required!!`);
        }
      },

      allowOutsideClick: () => !Swal.isLoading(),
    };
  }
  if (filter == "Plato") {
    var _id = localStorage.getItem("Plato");
    if (!_id) {
      _id = "";
    }
    tagsof = {
      customClass: "tag",
      title: "Connect Your Plato ID",
      focusConfirm: false,
      html: `<div class="card-plain card text-left" >
              <ol><li>Install <a href="https://www.platoapp.com" target="_blank">Plato App</a></li><li>Open player profile in Plato</li><li>Copy Plato ID</li><li>Paste the Plato ID below
              <div className="form-group">
              <label>Enter your Plato ID</label>
                <input class="form-control" id="tagid" value="${_id}" type="text" /></div>
       </li><li>and then enter your Plato Invite Friends Link below
       <div className="form-group">
       <label>Enter Plato Invite Friends Link</label>
       <textarea class="form-control" id="tagname" type="text"></textarea></div>
    </li></ol>
       
              
              `,

      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "grey",
      confirmButtonText: "Connect",

      showLoaderOnConfirm: true,
      preConfirm: () => {
        if (
          document.getElementById("tagid").value &&
          document.getElementById("tagname").value
        ) {
          if (
            document
              .getElementById("tagname")
              .value.indexOf("https://plato.app/") > -1
          ) {
            return {
              tagid: document.getElementById("tagid").value,
              tagname:
                "http" +
                document.getElementById("tagname").value.split("http")[1],
            };
          } else {
            Swal.showValidationMessage(`Enter Plato Invite Friends Link!`);
          }
        } else {
          Swal.showValidationMessage(`All fields are required!!`);
        }
      },

      allowOutsideClick: () => !Swal.isLoading(),
    };
  }
  if (filter == "Social") {
    var accMode = controlname + " Account";
    var tagMode = controlname + " ID";
    var holderMode = "";

    tagsof = {
      customClass: "tag",
      title: "Connect Your " + accMode + "",
      focusConfirm: false,
      html:
        `<div class="card-plain card text-left" >
              <div className="form-group">
              <label>Enter your ` +
        tagMode +
        `</label>
                <input class="form-control" id="tagid" type="text" placeholder="` +
        holderMode +
        `" /></div>
                </div>
              
              `,
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "grey",
      confirmButtonText: "Connect",

      showLoaderOnConfirm: true,
      preConfirm: () => {
        if (document.getElementById("tagid").value) {
          return {
            tagid: document.getElementById("tagid").value,
          };
        } else {
          Swal.showValidationMessage(`All fields are required!!`);
        }
      },

      allowOutsideClick: () => !Swal.isLoading(),
    };
  }
  if (
    controlname == "PS4" ||
    controlname == "PS5" ||
    controlname == "PSN" ||
    controlname == "XBOX"
  ) {
    if (controlname == "PS4" || controlname == "PS5" || controlname == "PSN") {
      var accMode = "PSN Account";
      var tagMode = "PSN ID";
      var holderMode = "";
    }
    if (controlname == "XBOX") {
      var accMode = "XBOX Account";
      var tagMode = "XBOX ID";
      var holderMode = "";
    }

    tagsof = {
      customClass: "tag",
      title: "Connect Your " + accMode + "",
      focusConfirm: false,
      html:
        `<div class="card-plain card text-left" >
              <div className="form-group">
              <label>Enter your ` +
        tagMode +
        `</label>
                <input class="form-control" id="tagid" type="text" placeholder="` +
        holderMode +
        `" /></div>
                </div>
              
              `,
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "grey",
      confirmButtonText: "Connect",

      showLoaderOnConfirm: true,
      preConfirm: () => {
        if (document.getElementById("tagid").value) {
          return {
            tagid: document.getElementById("tagid").value,
          };
        } else {
          Swal.showValidationMessage(`All fields are required!!`);
        }
      },

      allowOutsideClick: () => !Swal.isLoading(),
    };
  }
  if (filter == "ClashRoyale") {
    var accMode = "ClashRoyale Account";
    var tagMode = "ClashRoyale PlayerTag";
    var holderMode = "#123456";

    tagsof = {
      customClass: "tag",
      title: "Connect Your " + accMode + "",
      focusConfirm: false,

      html:
        `<div class="card-plain card text-left" >
              <ol><li>Open player profile in Clash Royale</li> <li>Long-press on your player tag</li> <li>Tap “Copy Tag”</li><li>Paste the Player Tag below
              <div className="form-group">
              <label>Clash Royale Player Tag</label>
                <input class="form-control" id="tagid" type="text" placeholder="` +
        holderMode +
        `" /></div>
                </div>
       </li></ol>
       
              
              `,
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "grey",
      confirmButtonText: "Connect",

      showLoaderOnConfirm: true,
      preConfirm: () => {
        if (document.getElementById("tagid").value) {
          return {
            tagid: document.getElementById("tagid").value,
          };
        } else {
          Swal.showValidationMessage(`All fields are required!!`);
        }
      },

      allowOutsideClick: () => !Swal.isLoading(),
    };
  }
  if (filter == "BrawlStars") {
    var accMode = "BrawlStars Account";
    var tagMode = "BrawlStars PlayerTag";
    var holderMode = "#123456";
    var _id = localStorage.getItem("BrawlStars");
    if (!_id) {
      _id = "";
    }
    tagsof = {
      ustomClass: "tag",
      title: "Connect Your " + accMode + "",
      focusConfirm: false,
      html: `<div class="card-plain card text-left" >
      <ol><li>Open player profile in BrawlStars</li><li>and then enter your Invite Friends Link below
       <div className="form-group">
       <label>Enter Invite Friends Link</label>
       <textarea class="form-control" id="tagname" type="text"></textarea></div>
    </li></ol>
       
              
              `,

      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "grey",
      confirmButtonText: "Connect",

      showLoaderOnConfirm: true,
      preConfirm: () => {
        if (document.getElementById("tagname").value) {
          if (
            document
              .getElementById("tagname")
              .value.indexOf("https://link.brawlstars.com/invite/friend/") > -1
          ) {
            return {
              tagid: document
                .getElementById("tagname")
                .value.split("tag=")[1]
                .split("&")[0],
              tagname:
                "http" +
                document.getElementById("tagname").value.split("http")[1],
            };
          } else {
            Swal.showValidationMessage(`Enter Invite Friends Link!`);
          }
        } else {
          Swal.showValidationMessage(`All fields are required!!`);
        }
      },

      allowOutsideClick: () => !Swal.isLoading(),
    };
  }
  if (filter == "CallOfDuty" || filter == "CallOfDuty Warzone") {
    tagsof = {
      customClass: "tag",
      title: "Expose Public Match Data",
      focusConfirm: false,
      html: `<div class="card-plain card text-left" ><ol><li>Login to the <a target="_blank" rel="noreferrer noopenner" href="https://profile.callofduty.com/cod/login"><span data-ignore="true">Call of Duty</span> website.</a></li><li>Find the <a href="https://profile.callofduty.com/cod/profile" target="_blank" rel="noreferrer noopenner">account preference</a> page.</li><li>Click on the Account Linking tab. Here you will find the <span data-ignore="true">PlayStation</span>, <span data-ignore="true">Xbox</span>, <span data-ignore="true">Battle.net</span>, or <span data-ignore="true">Steam</span> accounts that you've connected.</li><li>Set <strong>Searchable</strong> and <strong>Data Visible</strong> to <strong>All</strong></li></ol></div>`,
      icon: "info",
      showCancelButton: true,
      cancelButtonColor: "grey",
      confirmButtonText: "Continue",

      showLoaderOnConfirm: true,
      preConfirm: () => {
        return {
          tagid: filter + "2",
        };
      },

      allowOutsideClick: () => !Swal.isLoading(),
    };
  }
  if (filter == "LeagueOfLegends") {
    var reg = [
      {
        id: "41cf1a5d-0132-11e6-80f4-1c6f6530855d",
        name: "Brazil",
        regionCode: "br1",
        enabled: true,
        gameService: {
          gameServiceKey: "riot",
          name: "Riot Games",
          banner: null,
        },
      },
      {
        id: "41cef07a-0132-11e6-80f4-1c6f6530855d",
        name: "EU Nordic & East",
        regionCode: "eun1",
        enabled: true,
        gameService: {
          gameServiceKey: "riot",
          name: "Riot Games",
          banner: null,
        },
      },
      {
        id: "41cee1b0-0132-11e6-80f4-1c6f6530855d",
        name: "EU West",
        regionCode: "euw1",
        enabled: true,
        gameService: {
          gameServiceKey: "riot",
          name: "Riot Games",
          banner: null,
        },
      },
      {
        id: "45973855-6a38-11ea-a003-021c3aab9490",
        name: "Japan",
        regionCode: "jp1",
        enabled: true,
        gameService: {
          gameServiceKey: "riot",
          name: "Riot Games",
          banner: null,
        },
      },
      {
        id: "41cefe72-0132-11e6-80f4-1c6f6530855d",
        name: "Latin America North",
        regionCode: "la1",
        enabled: true,
        gameService: {
          gameServiceKey: "riot",
          name: "Riot Games",
          banner: null,
        },
      },
      {
        id: "41cf0c4b-0132-11e6-80f4-1c6f6530855d",
        name: "Latin America South",
        regionCode: "la2",
        enabled: true,
        gameService: {
          gameServiceKey: "riot",
          name: "Riot Games",
          banner: null,
        },
      },
      {
        id: "41ced32d-0132-11e6-80f4-1c6f6530855d",
        name: "North America",
        regionCode: "na1",
        enabled: true,
        gameService: {
          gameServiceKey: "riot",
          name: "Riot Games",
          banner: null,
        },
      },
      {
        id: "41cf454f-0132-11e6-80f4-1c6f6530855d",
        name: "Oceania",
        regionCode: "oc1",
        enabled: true,
        gameService: {
          gameServiceKey: "riot",
          name: "Riot Games",
          banner: null,
        },
      },
      {
        id: "41cf537f-0132-11e6-80f4-1c6f6530855d",
        name: "Republic of Korea",
        regionCode: "kr",
        enabled: true,
        gameService: {
          gameServiceKey: "riot",
          name: "Riot Games",
          banner: null,
        },
      },
      {
        id: "41cf28af-0132-11e6-80f4-1c6f6530855d",
        name: "Russia",
        regionCode: "ru",
        enabled: true,
        gameService: {
          gameServiceKey: "riot",
          name: "Riot Games",
          banner: null,
        },
      },
      {
        id: "41cf3747-0132-11e6-80f4-1c6f6530855d",
        name: "Turkey",
        regionCode: "tr1",
        enabled: true,
        gameService: {
          gameServiceKey: "riot",
          name: "Riot Games",
          banner: null,
        },
      },
    ];
    var regOOption = reg.map((item, i) => {
      return `<option value=${item.regionCode}>${item.name}</option>`;
    });
    tagsof = {
      customClass: "tag",

      title: "Connect Your LeagueOfLegends Account",
      focusConfirm: false,
      html: `<div class="card-plain card text-left" ><ol><li>Log into the <span data-ignore="true">League of Legends</span> game client</li><li>Find your <span data-ignore="true">summoner</span> name in the top right-hand corner. Note that this is different to your <span data-ignore="true">Riot</span> username.</li><li>Paste your ID below
      <div className="form-group">
      <label>Summoner name</label>
      <input class="form-control" id="tagid" type="text" placeholder="Summoner name" /></div>
      <div className="form-group">
      <label>Region</label>
      <select class="form-control" id="tagplatform">
      ${regOOption}
   
      </select>
      </div>
      </li></ol></div>`,
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "grey",
      confirmButtonText: "Connect",

      showLoaderOnConfirm: true,
      preConfirm: () => {
        if (document.getElementById("tagid").value) {
          return {
            tagid: document.getElementById("tagid").value.replace("#", "%23"),
            tagplatform: document.getElementById("tagplatform").value,
          };
        } else {
          Swal.showValidationMessage(`All fields are required!!`);
        }
      },

      allowOutsideClick: () => !Swal.isLoading(),
    };
  }
  if (filter == "Fortnite") {
    tagsof = {
      customClass: "tag",
      title: "Make your Fortnite stats public",
      focusConfirm: false,
      html: `<div class="card-plain card text-left" ><ol><li>Launch the game <span data-ignore="true">Fortnite</span></li><li>Enter the Battle Royale mode</li><li>Go to your Settings</li><li>Navigate to your Account Settings Tab</li><li>Toggle "Show On Leaderboard" option to Yes</li></ol></div>`,
      icon: "info",
      showCancelButton: true,
      cancelButtonColor: "grey",
      confirmButtonText: "Continue",

      showLoaderOnConfirm: true,
      preConfirm: () => {
        return {
          tagid: filter + "2",
        };
      },

      allowOutsideClick: () => !Swal.isLoading(),
    };
  }
  if (filter == "Dota2") {
    tagsof = {
      customClass: "tag",
      title: "Connect Your Dota2 Account",
      focusConfirm: false,
      html: `<div class="4BAFA5321A30-repeatApp-704 4BAFA5321A30-repeatApp-705" data-step-name="connect-steam"><div class="4BAFA5321A30-repeatApp-708"><svg height="110" viewBox="0 0 86 87" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="css-qok3e"><path d="M28.2883 67.2229L19.8276 63.9557C20.9584 68.4983 25.0605 71.8641 29.958 71.8641C35.7234 71.8641 40.404 67.19 40.404 61.4181C40.404 55.6594 35.7234 50.9788 29.958 50.9788C27.8807 50.9788 25.948 51.5901 24.3242 52.6354L32.6796 55.8566C35.8154 57.0728 37.38 60.5964 36.1704 63.7322C34.9542 66.8745 31.4306 68.4457 28.2883 67.2229Z"></path><path d="M60.52 42.8271C67.6593 42.8271 73.464 37.0223 73.464 29.883C73.464 22.7437 67.6593 16.939 60.52 16.939C53.3873 16.939 47.5759 22.7437 47.5759 29.883C47.5759 37.0157 53.3873 42.8271 60.52 42.8271ZM60.52 20.765C65.5556 20.765 69.6446 24.854 69.6446 29.883C69.6446 34.9121 65.5556 39.001 60.52 39.001C55.4909 39.001 51.4019 34.9121 51.4019 29.883C51.4019 24.854 55.4909 20.765 60.52 20.765Z"></path><path d="M74.7257 0.99707H11.2743C5.0422 0.99707 0 6.04584 0 12.2713V43.2279L16.4019 49.5652C19.5771 45.8904 24.2315 43.5369 29.4512 43.4514L39.3055 30.3036C39.3055 18.648 48.7588 9.20132 60.4077 9.20132C72.0633 9.20132 81.51 18.648 81.51 30.3036C81.51 36.7 78.6569 42.4325 74.1604 46.3045C70.4593 49.4797 65.6603 51.4059 60.4077 51.4059C59.8555 51.4059 59.3099 51.3796 58.7708 51.3336L47.3191 59.9651C47.3454 60.3267 47.3585 60.6948 47.3585 61.063C47.3585 70.7924 39.4698 78.6942 29.7404 78.6942C20.011 78.6942 12.1223 70.7989 12.1223 61.063C12.1223 61.0367 12.1223 60.9972 12.1223 60.9644L0 56.2837V75.7097C0 81.9352 5.04877 86.9839 11.2743 86.9839H74.7257C80.9512 86.9839 86 81.9352 86 75.7097V12.2779C86 6.05241 80.9512 0.99707 74.7257 0.99707Z"></path></svg></div><h2 data-ignore="true"><span>Connect&nbsp;<span data-ignore="true">Steam</span></span></h2><section><p>You'll be redirected to the <span data-ignore="true">Steam</span> Login page in order to complete this process</p></section></div>`,
      icon: "warning",
      showCancelButton: true,

      cancelButtonColor: "grey",
      confirmButtonText: "Login to Steam",

      allowOutsideClick: () => !Swal.isLoading(),
    };
  }
  if (filter == "PubG") {
    tagsof = {
      customClass: "tag",
      title: "Connect Your PubG Account",
      focusConfirm: false,
      html: `<ol><li>Login to the game</li><li>Find your player name and copy it.</li><li>Paste it below</li></ol><div class="card-plain card text-left" >
      <div className="form-group">
      <label>Enter your Player Name</label>
        <input class="form-control" id="tagid" type="text" placeholder="Player Name" /></div>
        </div>`,
      icon: "warning",
      showCancelButton: true,

      cancelButtonColor: "grey",
      confirmButtonText: "Connect",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        if (document.getElementById("tagid").value) {
          return {
            tagid: document.getElementById("tagid").value,
          };
        } else {
          Swal.showValidationMessage(`All fields are required!!`);
        }
      },

      allowOutsideClick: () => !Swal.isLoading(),
    };
  }
  if (filter == "CallOfDuty2" || filter == "CallOfDuty Warzone2") {
    tagsof = {
      customClass: "tag",

      title: "Connect Your Activition Account",
      focusConfirm: false,
      html: `<div class="card-plain card text-left" >
         <ol><li>Click/hover on your username and click "Account" or <a href="https://profile.callofduty.com/cod/profile" target="_blank" rel="noreferrer noopener">go here</a></li><li>Under "Account" copy the long string that appears after "ID"</li><li>Paste your ID below
         <div className="form-group">
         <label>ACTIVISION ID</label>
         <input class="form-control" id="tagid" type="text" placeholder="XXXXXX#00000" /></div>
         <div className="form-group">
         <label>Platform</label>
         <select class="form-control" id="tagplatform">
         <option value="psn">Playstation Network</option>
         <option value="xbl">Xbox Live</option>
         <option value="acti">Activision ID</option>
         <option value="steam">Steam</option>
         <option value="battle">Battle.net</option>
         </select>
         </div>
         </li></ol>
           
             </div>
            
            `,
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "grey",
      confirmButtonText: "Connect",

      showLoaderOnConfirm: true,
      preConfirm: () => {
        if (document.getElementById("tagid").value) {
          return {
            tagid: document.getElementById("tagid").value.replace("#", "%23"),
            tagplatform: document.getElementById("tagplatform").value,
          };
        } else {
          Swal.showValidationMessage(`All fields are required!!`);
        }
      },

      allowOutsideClick: () => !Swal.isLoading(),
    };
  }
  if (filter == "Fortnite2") {
    tagsof = {
      customClass: "tag",
      title: "Paste your Epic ID",
      focusConfirm: false,
      html: `
       <div class="card-plain card text-left" >
       <ol><li>Go to <a href="https://epicgames.com" target="_blank" rel="noreferrer noopenner" data-ignore="true">epicgames.com</a> and login to your <span data-ignore="true">Epic</span> account.</li><li>Click/hover on your username and click "Account" or <a href="https://www.epicgames.com/account/personal?productName=epicgames&amp;lang=en" target="_blank" rel="noreferrer noopener">go here</a></li><li>Under "Account ID" copy the long string that appears after "ID"</li><li>Paste the ID below
       <div className="form-group">
          <label>Epic account ID</label>
          <input class="form-control" id="tagid" type="text" placeholder="Your Epic account ID" /></div>
       </li></ol>
            </div>
          
          `,
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "grey",
      confirmButtonText: "Connect",

      showLoaderOnConfirm: true,
      preConfirm: () => {
        if (document.getElementById("tagid").value) {
          return {
            tagid: document.getElementById("tagid").value,
          };
        } else {
          Swal.showValidationMessage(`All fields are required!!`);
        }
      },

      allowOutsideClick: () => !Swal.isLoading(),
    };
  }
  return tagsof;
};
export const addTime = (datetime, hours) => {
  var result = new Date(datetime);

  result.setHours(result.getHours() + hours);

  return result;
};
export const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    //return <Completionist />;
    return <>Started</>;
  } else {
    // Render a countdown
    return (
      <span>
        {days > 0 ? (
          <>
            {days} <small style={{ color: "inherit" }}>days </small>
          </>
        ) : null}
        {hours > 0 ? <>{hours > 9 ? <>{hours}:</> : <>0{hours}:</>}</> : null}
        {minutes > 9 ? <>{minutes}:</> : <>0{minutes}:</>}
        {seconds > 9 ? <>{seconds}</> : <>0{seconds}</>}
      </span>
    );
  }
};
export const getOffset = (el) => {
  var _x = 0;
  var _y = 0;
  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - el.scrollLeft;
    _y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return { top: _y, left: _x };
};
export const printStatus = (
  item,
  _mode,
  _color,
  finish,
  status,
  _anim,
  matchidQ
) => {
  //console.log(item, _mode, _color,finish,status)
  var startdate = moment(item.startTime).format();
  var newD = moment(startdate).add(item.timeMinute, "minutes").format();
  var _track = item.rules;
  if (isJson(_track)) {
    var _JsonTrack = JSON.parse(_track);
    var RuleTrack = _JsonTrack["RuleTrack"];
    var _modeScore;
    RuleTrack.map((win, i) => {
      if (win.text.indexOf("Total ") > -1 || 1 == 1) {
        _modeScore = win.weight;
      }
    });
  }
  return (
    <>
      {item.winner ? (
        <Statistic inverted color={getColorStatus(status)} size="mini">
          <Statistic.Label>{_mode}</Statistic.Label>
          {_mode == "League" && isJson(_track) && (
            <>
              <Statistic.Label>
                {RuleTrack[0]?.weight} | {_modeScore}
              </Statistic.Label>
            </>
          )}
          {_anim == "no" ? (
            <Statistic.Label>
              <div style={{ position: "relative", transform: "scale(.8)" }}>
                <div
                  className="winner avatar"
                  style={{ width: 92, height: 92, borderRadius: 100 }}
                ></div>
                <div>
                  <Icon
                    circular
                    inverted
                    color="yellow"
                    size="mini"
                    name="winner"
                    style={{ position: "absolute", fontSize: 15 }}
                  />
                  <Avatar
                    size="92"
                    round={true}
                    title={item.winner}
                    name={setAvatar(item.winner)}
                  />
                </div>

                <Statistic inverted size="mini" color="yellow">
                  <Statistic.Value>{item.winner}</Statistic.Value>
                  <Statistic.Label>is winner</Statistic.Label>
                </Statistic>
              </div>
            </Statistic.Label>
          ) : (
            <Link to={"/user/" + item.winner} target="_blank">
              <TransitionExampleTransitionExplorer
                objanim={
                  <Statistic.Label>
                    <div
                      style={{ position: "relative", transform: "scale(.8)" }}
                    >
                      <div
                        className="winner avatar"
                        style={{ width: 92, height: 92, borderRadius: 100 }}
                      ></div>
                      <div>
                        <Icon
                          circular
                          inverted
                          color="yellow"
                          size="mini"
                          name="winner"
                          style={{ position: "absolute", fontSize: 15 }}
                        />
                        <Avatar
                          size="92"
                          round={true}
                          title={item.winner}
                          name={setAvatar(item.winner)}
                        />
                      </div>

                      <Statistic inverted size="mini" color="yellow">
                        <Statistic.Value>{item.winner}</Statistic.Value>
                        <Statistic.Label>is winner</Statistic.Label>
                      </Statistic>
                    </div>
                  </Statistic.Label>
                }
                animation="jiggle"
                duration={1000}
              />
            </Link>
          )}
        </Statistic>
      ) : (
        <>
          {(_mode == "Tournament" || _mode == "League") &&
          status == "Pending" &&
          !matchidQ ? (
            <Statistic inverted color={getColorStatus(status)} size="tiny">
              <Statistic.Label>{_mode}</Statistic.Label>
              <Statistic.Value>
                {item?.players?.length}/{item.totalPlayer}
              </Statistic.Value>
              {_mode == "League" && isJson(_track) && (
                <>
                  <Statistic.Label>
                    {RuleTrack[0]?.weight} | {_modeScore}
                  </Statistic.Label>
                </>
              )}
            </Statistic>
          ) : (
            <>
              <Statistic inverted color={getColorStatus(status)} size="tiny">
                <Statistic.Label>{_mode}</Statistic.Label>
                <Statistic.Value>{status}</Statistic.Value>
                {_mode == "League" && isJson(_track) && (
                  <>
                    <Statistic.Label>
                      {item?.players?.length}/{item.totalPlayer}
                    </Statistic.Label>
                    <Statistic.Label>
                      {RuleTrack[0]?.weight} | {_modeScore}
                    </Statistic.Label>
                  </>
                )}
              </Statistic>

              {finish.split("@@@")[1] &&
                _anim == "no" &&
                _mode != "Tournament" && (
                  <>
                    <Divider fitted style={{ opacity: 0 }} />
                    <Statistic inverted size="mini" color="yellow">
                      {finish.split("@@@")[1].indexOf("Not") > -1 ? (
                        <Statistic.Value>
                          {finish.split("@@@")[1]}
                        </Statistic.Value>
                      ) : (
                        <>
                          <Statistic.Value>
                            {finish.split("@@@")[1]}
                          </Statistic.Value>
                          <Statistic.Label>is winner</Statistic.Label>
                        </>
                      )}
                    </Statistic>
                  </>
                )}
            </>
          )}
        </>
      )}
    </>
  );
};
export const rendererBig = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
  props,
}) => {
  var _size = "mini";
  if (props.size) {
    _size = props.size;
  }
  var _color = props.color;
  var _colorFinish = props.colorfinish;
  if (!_colorFinish) {
    _colorFinish = _color;
  }
  if (
    completed ||
    props.match?.winner ||
    (props.match?.status != "Pending" &&
      props.match?.status != "Ready" &&
      props.match?.status != "InPlay" &&
      props.match?.gameMode != "League")
  ) {
    var lastDate = moment(props.date).startOf("second").fromNow();
    if (props.match?.winner || props.match?.status == "InPlay") {
      lastDate = null;
    }
    // Render a complete state
    //return <Completionist />;
    return (
      <>
        <Divider fitted style={{ opacity: 0 }} />
        <Statistic inverted size={_size} color="yellow">
          <Statistic.Label>{lastDate}</Statistic.Label>
        </Statistic>
      </>
    );
  } else {
    // Render a countdown
    return (
      <>
        <Divider fitted style={{ opacity: 0 }} />
        <Statistic inverted size={_size} color="yellow">
          <Statistic.Label>{props.txt.split("@@@")[0]}</Statistic.Label>
          {props.txt.split("@@@")[1] && (
            <Statistic.Label>{props.txt.split("@@@")[1]}</Statistic.Label>
          )}
          <Statistic.Value>
            {days > 0 ? (
              <>
                {days} <small style={{ color: "inherit" }}>days </small>
              </>
            ) : null}
            {hours > 0 ? (
              <>{hours > 9 ? <>{hours}:</> : <>0{hours}:</>}</>
            ) : null}
            {minutes > 9 ? <>{minutes}:</> : <>0{minutes}:</>}
            {seconds > 9 ? <>{seconds}</> : <>0{seconds}</>}
          </Statistic.Value>
        </Statistic>
      </>
    );
  }
};
export const getCode = (code) => {
  if (code) {
    return (
      <span>
        {code
          .toString()
          .split("")
          .map(function (char, index) {
            return (
              <span className="char" key={index}>
                {char}
              </span>
            );
          })}
      </span>
    );
  }
};

export const genLink = (item, match, num) => {
  var _link =
    "/lobby/" +
    item.id +
    "/" +
    item.gameMode +
    " " +
    item.gameName.replace(" ", "+") +
    " for " +
    item.prize +
    item.outSign.replace("Dollar", " USD").replace("Point", " Diamonds") +
    " Prize";
  if (match?.id && item.gameMode == "Tournament") {
    _link =
      _link +
      "/" +
      match.id +
      "/" +
      getMatchTitle(match.level, item.totalPlayer) +
      " No" +
      num +
      "";
  }

  return _link.replace(/ /g, "-").replace("-Noundefined", "");
};
export const findActiveMatch = (event, matchID, username) => {
  var _match;

  event?.matchTables.sort((a, b) => (a.level > b.level ? 1 : -1));
  if (matchID && event?.matchTables.length > 1) {
    event.matchTables.map(function (match) {
      if (match.id == matchID) {
        _match = match;
      }
    });
  } else {
    _match = event.matchTables[0];
    if (event.matchTables?.length > 1) {
      event.matchTables.map(function (match) {
        if (match.status == "InPlay" && isPlayerInMatch(match, username)) {
          _match = match;
        }
      });
    }
  }
  _match?.matchPlayers.sort((a, b) => (a.id > b.id ? 1 : -1));
  return _match;
};
export const findEventByID = (events, id) => {
  var _e = events.filter(function (i) {
    return i.id === id;
  });
  var n;
  try {
    n = _e[0];
  } catch (e) {
    n = {};
  }
  return n;
};
export const findMatch = (item) => {
  var lists = item.matchTables;

  lists.sort((a, b) => (a.level > b.level ? 1 : -1));

  var matchLevelFind = lists[0];
  lists.map((tblmatch, w) => {
    if (tblmatch.status == "InPlay" || tblmatch.status == "Finished") {
      matchLevelFind = tblmatch;
    }
  });
  if (matchLevelFind?.status == "Finished") {
    var _new = lists.filter((list) => list.level === matchLevelFind.level + 1);
  }
  if (_new?.length > 0) {
    matchLevelFind = _new[0];
  }
  lists.map((tblmatch, w) => {
    if (tblmatch.status == "InPlay") {
      matchLevelFind = tblmatch;
    }
  });
  if (item.status == "Finished") {
    matchLevelFind = lists[lists.length - 1];
  }

  matchLevelFind?.matchPlayers.sort((a, b) => (a.id > b.id ? 1 : -1));
  return matchLevelFind;
};
export const isPlayerInMatch = (match, username) => {
  var _is = false;
  match?.matchPlayers?.map(function (user) {
    if (user.username == username) {
      _is = true;
    }
  });

  return _is;
};
export const isPlayerInMatchReady = (match, username) => {
  var _is = false;

  match?.matchPlayers.sort((a, b) => (a.id > b.id ? 1 : -1));
  match?.matchPlayers?.map(function (user, i) {
    if (i == username) {
      _is = user.ready;
    }
  });

  return _is;
};

export const showSocialTag = (game, userTags) => {
  var res = null;
  if (userTags) {
    userTags.map(function (tag) {
      if (tag.accountName == game) {
        res = tag.accountId;
      }
    });
  }
  return res;
};
export const userDetails = (currentUser) => {
  var currentUser = JSON.parse(JSON.stringify(currentUser));
  var flag = "ir";
  var flagLabel = "Iran, Islamic Republic of";
  if (currentUser.country.value && currentUser.country.value != flag) {
    flag = currentUser.country.value.toLowerCase();
    flagLabel = currentUser.country.label;
  }
  var lastLogin = date_edit_card(currentUser.lastLogin);
  lastLogin = moment(lastLogin).local().format();
  lastLogin = moment(lastLogin).startOf("second").fromNow();
  return (
    <>
      <div className="text-center">
        <Statistic size="mini">
          <Statistic.Value as="h1">
            {currentUser.username}
            <br />
            <br />
          </Statistic.Value>
          <Statistic.Label>
            <small className="text-muteds">From </small>
            <br />
            <Flag name={flag} style={{ position: "relative", top: -1 }} />{" "}
            {flagLabel}
            <br />
            <br />
            {currentUser.lastLogin && (
              <>
                <small className="text-mutedd">Last Login</small>
                <br /> {lastLogin}
              </>
            )}
          </Statistic.Label>
        </Statistic>
        <Card.Header style={{ margin: 0 }}></Card.Header>

        <ListGroup horizontal style={{ display: "inline-flex", marginTop: 0 }}>
          {haveSocialTag("Instagram", currentUser.userSocialAccounts) && (
            <ListGroup.Item
              action
              as="a"
              href={
                "https://instagram.com/" +
                showSocialTag("Instagram", currentUser.userSocialAccounts)
              }
              target="_blank"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                style={{ color: "#e95950" }}
              />
            </ListGroup.Item>
          )}
          {haveSocialTag("Twitch", currentUser.userSocialAccounts) && (
            <ListGroup.Item
              action
              as="a"
              href={
                "https://twitch.com/" +
                showSocialTag("Twitch", currentUser.userSocialAccounts)
              }
              target="_blank"
            >
              <FontAwesomeIcon icon={faTwitch} style={{ color: "#6441a5" }} />
            </ListGroup.Item>
          )}
          {haveSocialTag("Youtube", currentUser.userSocialAccounts) && (
            <ListGroup.Item
              action
              as="a"
              href={
                "https://youtube.com/" +
                showSocialTag("Youtube", currentUser.userSocialAccounts)
              }
              target="_blank"
            >
              <FontAwesomeIcon icon={faYoutube} style={{ color: "#FF0000" }} />
            </ListGroup.Item>
          )}
          {haveSocialTag("Twitter", currentUser.userSocialAccounts) && (
            <ListGroup.Item
              action
              as="a"
              href={
                "https://twitter.com/" +
                showSocialTag("Twitter", currentUser.userSocialAccounts)
              }
              target="_blank"
            >
              <FontAwesomeIcon icon={faTwitter} style={{ color: "#00acee" }} />
            </ListGroup.Item>
          )}
        </ListGroup>
      </div>
    </>
  );
};
export const haveSocialTag = (platform, userTags) => {
  var res = "Not Connected";
  if (userTags) {
    userTags.map(function (tag) {
      if (tag.accountName == platform) {
        res = tag.accountId;
      }
    });
  }
  if (res == "Not Connected") {
    return false;
  } else {
    return true;
  }
};
export const getPlayerTag = (player, playerTags, mode, gameName) => {
  var val = "";
  playerTags.map((tag) => {
    if (tag.username == player) {
      if (mode == "nickname") {
        val = tag.nickName;
      } else if (mode == "console") {
        val = tag.gamePlatform;
        if (val == "Mobile") {
          val = gameName;
        }
      } else {
        val = tag.tagId;
        val = val.split("@@")[0];
      }
    }
  });
  return val;
};

export const haveGameTag = (game, userTags) => {
  var res = "Not Connected";
  if (userTags) {
    userTags.map(function (tag) {
      if (tag.gameName == game) {
        res = tag.tagId;
        res = res.split("@@")[0];
        if (game.split(" ")[0] == "Plato") {
          localStorage.setItem(game.split(" ")[0], tag.tagId);
        }
      }
    });
  }
  if (res == "Not Connected") {
    return false;
  } else {
    return true;
  }
};
export const printBlockChallenge = (newItem, filtermode) => {
  // const history = useHistory();
  var filter = filtermode;
  if (filter == "all") {
    filter = "";
  }
  if (filter == "NoMobile") {
    filter = "Console";
  }

  if (newItem.length == 0) {
    //history.push("/home");
    return (
      <Dimmer active inverted>
        <div
          style={{
            textAlign: "center",
            color: "rgba(0,0,0,.5)",
            paddingTop: 30,
            width: "100%",
          }}
        >
          <img
            alt="nodata"
            style={{ height: 80 }}
            src="/assets/images/nodata.svg"
          ></img>
          <h4>Empty List.</h4>
          <h5>There are currently no events.</h5>
        </div>
      </Dimmer>
    );
  } else {
    return newItem.map((item, i) => {
      return <MatchCard key={i.toString()} item={item} />;
    });
  }
};
export const haveGetway = (userTags, game) => {
  var res = "Not Connected";

  if (userTags) {
    userTags.map(function (tag) {
      if (tag.name == game && tag.active) {
        res = tag.name;
      }
    });
  }
  if (res == "Not Connected") {
    return false;
  } else {
    return true;
  }
};
export const haveGetwayMode = (userTags, game) => {
  var res = "Not Connected";

  if (userTags) {
    userTags.map(function (tag) {
      if (tag.mode == game && tag.active) {
        res = tag.name;
      }
    });
  }
  if (res == "Not Connected") {
    return false;
  } else {
    return true;
  }
};
export const handleTagForm = (game, platform, currentUser) => {
  if (currentUser.accessToken) {
    const resetPw = async () => {
      const swalval = await Swal.fire(getModalTag(game));

      let v = (swalval && swalval.value) || swalval.dismiss;

      if (v) {
        if (v.tagid) {
          var gameName, gamePlatform, gameID, gameNickname;
          gameName = game;
          if (v.tagid == game + "2") {
            handleTagForm(game + "2", platform, currentUser);
          } else if (v.tagid == game + "3") {
            handleTagForm(game + "3", platform, currentUser);
          } else {
            gameID = "";
            gameNickname = "";
            if (v.tagid != "") {
              gameID = v.tagid.replace("#", "");
            }
            if (v.tagname && v.tagname != "") {
              gameNickname = v.tagname;
            }
            if (v.tagplatform && v.tagplatform != "") {
              gamePlatform = v.tagplatform;
            }
            if (gameID != "" && gameNickname == "") {
              gameNickname = gameID;
            }

            handleSaveTags(gameName, gamePlatform, gameID, gameNickname);
          }
        }

        //setformdata(swalval);
      }
    };
    if (!haveGameTag(game, currentUser.userTags)) resetPw();
  }
};
export const handleSaveTags = (
  gameName,
  gamePlatform,
  gameID,
  gameNickname
) => {
  Swal.fire({
    title: "<br/>Please Wait...",
    text: "Is working..",
    customClass: "tag",
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  userService
    .saveTags(gameName.replace("2", ""), gamePlatform, gameID, gameNickname)
    .then(
      (response) => {
        if (response.data?.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          eventBus.dispatch("eventsDataUser", response.data);
          //eventBus.remove("eventsDataUser");
          Swal.fire("", "Data saved successfully.", "success").then(
            (result) => {
              $(".joineventbtn:visible").trigger("click");
            }
          );
        } else {
          if (
            gameName.replace("2", "") == "CallOfDuty" &&
            gameID.indexOf("%23") > -1 &&
            gamePlatform != "acti"
          ) {
            handleSaveTags(gameName, "acti", gameID, gameNickname);
          } else {
            Swal.fire("Error!", response.data?.message, "error").then(
              (result) => {
                var currentUser = JSON.parse(localStorage.getItem("user"));
                handleTagForm(gameName, gamePlatform, currentUser);
              }
            );
          }
        }
        //window.location.reload(false);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        Swal.fire("Error!", resMessage, "error");
      }
    );
};
export const haveAdmin = (userTags) => {
  var isAdmin = false;
  if (userTags) {
    userTags.map(function (tag) {
      if (tag.name == "ROLE_ADMIN") {
        isAdmin = true;
      }
    });
  }

  return isAdmin;
};
export const haveModerator = (userTags) => {
  var isAdmin = false;
  if (userTags) {
    userTags.map(function (tag) {
      if (tag.name == "ROLE_MODERATOR") {
        isAdmin = true;
      }
    });
  }

  return isAdmin;
};
export const printRequired = () => {
  return (
    <>
      <div
        className="alert alert-danger "
        role="alert"
        style={{ position: "relative", top: -12, fontSize: 12, padding: 5 }}
      >
        This field is required!
      </div>
    </>
  );
};

export const editDateTime = (datee) => {
  //dt = Moment(dt).format('YYYY-MM-DDThh:mm:ss.0')
  //var date = new Date();
  //console.log(datee);
  try {
    var dt = datee;
    var datenew = new Date(dt);
    // console.log(datenew);
    var dateExpired = datenew.toISOString();
    //  console.log(dateExpired);
  } catch (e) {
    var datenew = new Date();
    var dateExpired = datenew.toISOString();
  }
  return dateExpired;
};

export const genMatch = (lvl, matchCount, title) => {
  var matchSample = {
    startTime: 1619728571000,
    winner: "Salar",
    matchPlayers: [
      {
        ready: false,
        username: "vahid",
      },
      {
        ready: false,
        username: "Yaran12",
      },
    ],
  };
  var nullmatch = {
    id: 100000,
    level: 1,
    title: "",
    matches: [],
  };
  nullmatch.level = lvl;
  nullmatch.title = title;
  for (let index = 0; index < matchCount; index++) {
    if (lvl == 3 && 12 == 1) {
      nullmatch.matches.push(matchSample);
    } else {
      nullmatch.matches.push(matchSample);
    }
    //e.log(item.players[index].username)
    if (index < 9) {
      // nullmatch.matches.matchPlayers[0].push(item.players[index])
    }
  }

  return nullmatch;
};
export const editEvent = (_item, eventIDQ, matchIDQ, currentUser) => {
  var item = JSON.parse(JSON.stringify(_item));
  //console.log('item:'+JSON.stringify(item))
  var nullplayer = {
    id: 100000,

    username: false,
    ready: false,
  };
  var mymatchFind = null;
  var matchLevelFind = null;
  var isJoin = false;

  var isEdit = false;
  var isEditTime = 0;

  if (!item) {
    isEdit = true;

    //  reGetevents()
  } else {
    clearTimeout(isEditTime);
    if (isEdit == false) {
      isEdit = true;
      //console.log('item:'+item)
      // isEdit= true;
      isJoin = false;

      var activePlayer = 0;
      var isInPlayers = false;
      var matchidFind = [];
      var finalChat = [];

      var lists = [];

      activePlayer = 0;

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
        var old = JSON.stringify(item)
          .replace(/"Tournament Player1"/g, false)
          .replace(/"Tournament Player"/g, false); //convert to JSON string
        var newArray = JSON.parse(old);
        newArray.current_brackets = [];
        newArray.potential_brackets = [];
        item = newArray;

        //var events = eventGet;

        if (item.tournamentPayout) {
          var payArr = item.tournamentPayout.split("|");
          var totalPay = item.prize;
          for (var i = 0; i < payArr.length; i++) {
            var paylvl = payArr[i].split(", ");
            var payplyer = paylvl[0].split("-");
            var tItem = item.players.length;
            if (item.status == "Pending" || item.gameMode == "League") {
              tItem = item.totalPlayer;
            }
            // console.log(payplyer[0])
            if (
              parseInt(payplyer[0]) <= tItem &&
              parseInt(payplyer[1]) >= tItem
            ) {
              for (var j = 1; j < paylvl.length; j++) {
                if (paylvl[j].indexOf("x") == -1) {
                  paylvl[j] = paylvl[j] + "x1";
                }
                var intX = paylvl[j].split("x");
                item.current_brackets.push({
                  prize: (intX[0] * totalPay) / 100,
                  percent: intX[0],
                  number: intX[1],
                });
              }
            }
          }
          for (var i = payArr.length - 1; i < payArr.length; i++) {
            var paylvl = payArr[i].split(", ");
            var payplyer = paylvl[0].split("-");
            var tItem = item.players.length;
            if (item.status == "Pending" || item.gameMode == "League") {
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
      if (item.gameMode == "League") {
        if (!item.scoreTemplate) {
          item.scoreTemplate = {
            kills: 20,
            damageDone: 0.06,
            timePlayed: 0.04,
            teamPlacement: [
              {
                type: "eq",
                trigger: "1",
                multiplier: "0",
                addition: "240",
                altText: "1st Place",
              },
              {
                type: "lte",
                trigger: "3",
                multiplier: "0",
                addition: "60",
                altText: "2nd or 3rd Place",
              },
              {
                type: "lte",
                trigger: "8",
                multiplier: "0",
                addition: "20",
                altText: "4th to 8th Place",
              },
            ],
          };
        }

        item.tournamentPayout =
          "1-4, 100.00|5-7, 65.00, 35.00|8-10, 50.00, 30.00, 20.00|11-20, 45.00, 28.00, 17.00, 10.00|21-40, 36.00, 23.00, 15.00, 11.00, 8.00, 7.00|41-70, 30.00, 20.00, 14.00, 10.00, 8.00, 7.00, 6.00, 5.00|71-100, 29.00, 18.00, 12.50, 10.00, 8.00, 6.50, 5.50, 4.50, 3.50, 2.50|101-200, 28.00, 17.50, 11.50, 8.50, 7.00, 5.50, 4.50, 3.50, 2.50, 1.50, 1.00x10|201-400, 27.00, 16.50, 10.50, 8.00, 6.25, 4.75, 3.75, 2.75, 1.75, 1.25, 0.75x10, 0.50x20|401-700, 26.00, 15.50, 10.00, 7.50, 6.00, 4.50, 3.50, 2.50, 1.50, 1.00, 0.65x10, 0.40x20, 0.25x30|701-1000, 25.00, 15.00, 10.00, 7.25, 5.50, 4.25, 3.25, 2.25, 1.25, 0.75, 0.55x10, 0.40x20, 0.25x30, 0.15x30";

        if (!item.rules) {
          item.info = {
            conditions: [
              "Thank you for participating in our COD: Warzone Beta tournament",
              "During the Beta scores may be altered, removed or updated as we test the implementation of our scoring systems",
              "Only games played after you join the tournament are counted",
              "SMURF accounts are not allowed on Loole.gg and will be banned",
            ],
          };
          item.rules =
            "<p>Refer to the tournament details to see what game modes are tracked</p><p>Smurfing (creating a new account to compete with) will result in an immediate and permanent ban from <span data-ignore='true'>Loole.gg</span> and all winnings will be forfeited.</p><p>You must play the minimum number of games in order to get paid out in a tournament. The minimum number of games to play is the same as the number of games we count for your score, which can be found in the Tournament Details.</p>";
        }
      }

      lists = item.matchTables;
      matchidFind = item.matchTables[0];

      if (
        (item.status == "InPlay" ||
          item.status == "Pending" ||
          item.status == "Ready") &&
        item.gameMode == "Tournament"
      ) {
        lists.map((tblmatch) => {
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
            (tblmatch.matchPlayers[0]?.username == currentUser.username ||
              tblmatch.matchPlayers[1]?.username == currentUser.username)
          ) {
            mymatchFind = tblmatch;
          }
        });
      }

      if (item.chats != "null") {
        {
          item.chats.map((itemnew) => {
            finalChat.push(itemnew);
          });
        }

        item.chats = finalChat;
      }

      // this creates the intial state of this component based on the collapse routes
      // that it gets through routes prop

      finalChat = [];
      if (matchidFind.matchChats != "null") {
        {
          matchidFind.matchChats.map((itemnew) => {
            finalChat.push(itemnew);
          });
        }

        matchidFind.matchChats = finalChat;
      }

      var dateExpired = item.expire;

      if (
        matchidFind &&
        item.gameMode != "Tournament" &&
        item.gameMode != "League"
      ) {
        if (!item.players[1]) {
          //item.players.push(nullplayer);
        }
        if (matchidFind && !matchidFind.matchPlayers[0]) {
          matchidFind.matchPlayers.push(nullplayer);
        }
        if (matchidFind && !matchidFind.matchPlayers[1]) {
          matchidFind.matchPlayers.push(nullplayer);
        }
        matchidFind.matchPlayers.sort((a, b) => (a.id > b.id ? 1 : -1));
      }
      isInPlayers = false;
      if (item.gameMode != "League") {
        if (
          matchidFind.matchPlayers[0]?.username == currentUser.username ||
          matchidFind.matchPlayers[1]?.username == currentUser.username
        ) {
          isInPlayers = true;
        }
      }
      if (item.gameMode == "Tournament" && !eventIDQ) {
        var expiryDate = new Date(dateExpired);
        expiryDate.setHours(expiryDate.getHours() + matchidFind.level);
      }
      if (item.gameMode == "Tournament" && matchIDQ) {
        if (!item.players[0]) {
          //item.players.push(nullplayer);
        }
        if (!item.players[1]) {
          //item.players.push(nullplayer);
        }
      }
      item.matchidFind = matchidFind;
      return item;
    } else {
      //isEdit= false;

      isEditTime = setTimeout(() => {
        //console.log('isedit:'+isEdit)
        isEdit = false;
      }, 2000);
    }
  }
};

export const printProductBlock = (item) => {
  return (
    <Link to={"/lobby?id=" + item.id}>
      <Card className="card-user chall">
        <Card.Header className="no-padding">
          <div className="card-image">
            <img alt={item.name} src={item.image}></img>
          </div>
        </Card.Header>
        <Card.Description>
          <Card.Header as="h5" style={{ fontSize: 15 }}>
            {item.name}
          </Card.Header>
          <Row>
            <Col className="text-muted text-right">
              {getGroupBadge("point", item.cost, "small right")}
            </Col>
          </Row>
        </Card.Description>
      </Card>
    </Link>
  );
};
export const printGameBlock = (item) => {
  return (
    <>
      <img
        className="d-block w-100"
        src={"/assets/images/games/" + item.name + ".jpg"}
        alt={item.name}
      />
      <Carousel.Caption>
        <h3>{item.name}</h3>
        <p>Play {item.name} for Real Money.</p>
        <Button
          to={"/game/" + item.name}
          as={Link}
          variant="danger"
          className="btn-fill"
        >
          Play {item.name} for Cash now!
        </Button>
        <p>
          Available for:{" "}
          {item.gameconsole.map((consolename, z) => (
            <small className="text-muted" key={z}>
              <FontAwesomeIcon
                fixedWidth
                icon={getIcon(consolename.consolename)}
              />{" "}
              {consolename.consolename}{" "}
            </small>
          ))}
        </p>
      </Carousel.Caption>
    </>
  );
};
export const printGameBlockMobile = (item) => {
  return (
    <>
      <img
        className="d-block w-100"
        src={"/assets/images/games/" + item.name + ".jpg"}
        alt={item.name}
      />
      <Carousel.Caption>
        <h3>{item.name}</h3>
        <p>Play {item.name} for Real Money.</p>
        <Button
          to={"/game/" + item.name}
          as={Link}
          variant="danger"
          className="btn-fill btn-sm"
        >
          Play {item.name} now!
        </Button>
        <p>
          {item.gameconsole.map((consolename, z) => (
            <small key={z}>
              <FontAwesomeIcon
                fixedWidth
                icon={getIcon(consolename.consolename)}
              />{" "}
              {consolename.consolename}{" "}
            </small>
          ))}
        </p>
      </Carousel.Caption>
    </>
  );
};
