import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Avatar, { Cache } from "react-avatar";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { genLink, date_edit_card, isJson } from "components/include.js";
import { faPlaystation, faXbox } from "@fortawesome/free-brands-svg-icons";
import {
  faDesktop,
  faMobileAlt,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import {
  Icon,
  Label,
  Card,
  Statistic,
  Divider,
  Image,
} from "semantic-ui-react";
// react-bootstrap components
const cache = new Cache({
  // Keep cached source failures for up to 7 days
  sourceTTL: 7 * 24 * 3600 * 1000,

  // Keep a maximum of 20 entries in the source cache
  sourceSize: 20000,
});
const moment = require("moment");
const setAvatar = (name) => {
  var str = name;

  if (!isJson(str)) {
    var res = str.substring(0, 1);
    res = res + " " + str.substring(str.length - 3, str.length - 2);
  } else {
    var res = "";
  }

  return res;
};
const getIcon = (name) => {
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
const findMatch = (item) => {
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
const getColorStatus = (status) => {
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
const getMatchTitle = (level, totalPlayer) => {
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
  return mTitle;
};
const printStatus = (item, _mode, _color, finish, status, _anim, matchidQ) => {
  //console.log(item, _mode, _color,finish,status)
  var startdate = moment(item.startTime).format();
  var newD = moment(startdate).add(item.timeMinute, "minutes").format();
  var _track = item.rules;
  if (isJson(_track)) {
    var _JsonTrack = JSON.parse(_track);
    var RuleTrack = _JsonTrack["RuleTrack"];
  }
  return (
    <>
      {item.winner ? (
        <Statistic inverted color={getColorStatus(status)} size="mini">
          <Statistic.Label>{_mode}</Statistic.Label>
          {_mode == "League" && isJson(_track) && (
            <>
              <Statistic.Label>
                {RuleTrack[0]?.weight} | {RuleTrack[4]?.weight}
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
                    {RuleTrack[0]?.weight} | {RuleTrack[4]?.weight}
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
                      {RuleTrack[0]?.weight} | {RuleTrack[4]?.weight}
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
const rendererBig = ({ days, hours, minutes, seconds, completed, props }) => {
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
const getGroupBadgeBlock = (sign, amount, label, pos) => {
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
const EventBlock = (prop) => {
  var _mode = " 1 vs 1 ";
  var _color = "#404040";
  var _finishTxt = "Not Joinable";

  var item = prop.item;
  var lists = item.matchTables;

  lists.sort((a, b) => (a.level > b.level ? 1 : -1));
  item?.players.sort((a, b) => (a.id > b.id ? 1 : -1));

  var matchLevelFind = findMatch(item);

  if (item.gameMode == "Tournament" || item.gameMode == "League") {
    _mode = item.gameMode;
  }

  if (
    item?.status == "Canceled" ||
    item?.status == "Expired" ||
    item?.status == "Finished"
  ) {
    _finishTxt = "Not Available";
  }
  _finishTxt = "";

  var _link = genLink(item);
  var _track = item.rules;

  if (isJson(_track)) {
    var _JsonTrack = JSON.parse(_track);
    RuleTrack = _JsonTrack["RuleTrack"];
    pointTrack = _JsonTrack["pointTrack"];
  }
  return (
    <Card color={getColorStatus(item.status)} as={Link} to={_link}>
      <Label
        color={getColorStatus(item.status)}
        ribbon
        style={{
          zIndex: 2,
          maxWidth: 170,
          position: "absolute",
          top: 15,
          left: -14,
        }}
      >
        {item.status == "Pending" && <Icon loading name="spinner" />}
        {item.status == "Finished" && <Icon name="check" color="green" />}
        {(item.status == "Canceled" || item.status == "Expired") && (
          <Icon name="times" />
        )}
        {item.status}
      </Label>
      <Image
        alt={item.gameName}
        src={"/assets/images/games/" + item.gameName + ".webp"}
        width="800"
        height="450"
        className="img-responsive"
        fluid
        style={{ background: "gray !important" }}
        wrapped
        ui={false}
      />
      <div className={"text-center cover " + item.status}>
        <div style={{ transform: "scale(.8)", padding: "10px 0", height: 185 }}>
          {printStatus(
            item,
            _mode,
            _color,
            item.status + "@@@" + _finishTxt,
            item.status,
            "no"
          )}
          {item.status == "InPlay" &&
            item.gameMode == "Tournament" &&
            !item.winner && (
              <>
                <Divider inverted fitted></Divider>{" "}
                <Statistic inverted color="violet" size="mini">
                  <Statistic.Label>Match Level</Statistic.Label>
                  <Statistic.Value>
                    {getMatchTitle(matchLevelFind.level, item.totalPlayer)}
                  </Statistic.Value>
                </Statistic>
              </>
            )}
          {item.gameMode == "League" ? (
            <Countdown
              renderer={rendererBig}
              txt={
                item.status == "Pending" ? "@@@Start at" : "@@@Available until"
              }
              colorfinish={getColorStatus(item.status)}
              finish={item.status + "@@@Not Available"}
              match={item}
              date={
                item.status == "Pending"
                  ? date_edit_card(item.startTime)
                  : date_edit_card(item.finished)
              }
              mode={_mode}
              color={_color}
            />
          ) : (
            <>
              {item.gameMode == "Tournament" ? (
                <Countdown
                  renderer={rendererBig}
                  txt={
                    item.status == "Pending"
                      ? "@@@Start at"
                      : "@@@Available until"
                  }
                  colorfinish={getColorStatus(item.status)}
                  finish={item.status + "@@@Not Available"}
                  match={item}
                  date={date_edit_card(item.startTime)}
                  mode={_mode}
                  color={_color}
                />
              ) : (
                <>
                  {" "}
                  <Countdown
                    renderer={rendererBig}
                    txt="@@@Available until"
                    colorfinish={getColorStatus(item.status)}
                    finish={item.status + "@@@Not Available"}
                    match={item}
                    date={date_edit_card(item.expire)}
                    mode={_mode}
                    color={_color}
                  />
                </>
              )}
            </>
          )}
          {isJson(_track) && item.gameMode == "League" && 1 == 2 && (
            <div>
              <Statistic inverted color={getColorStatus(status)} size="tiny">
                <Statistic.Label>
                  {RuleTrack[0].weight} | {RuleTrack[4].weight}
                </Statistic.Label>
              </Statistic>
            </div>
          )}
        </div>
        {item.players[0] ? (
          <>
            {item.players.map((user, z) => (
              <span key={z}>
                {z < 5 ? (
                  <>
                    {z < 4 ? (
                      <Avatar
                        size="25"
                        title={user.username}
                        round={true}
                        name={setAvatar(user.username)}
                        cache={cache}
                      />
                    ) : (
                      <Avatar
                        size="25"
                        round={true}
                        value={"+" + (item.players.length - 4)}
                        color="gray"
                        cache={cache}
                      />
                    )}
                  </>
                ) : null}
              </span>
            ))}
          </>
        ) : (
          <span>
            <Avatar
              size="25"
              round={true}
              name="?"
              src="/assets/img/avat.jpg"
              color="lightgray"
              cache={cache}
            />
            <Avatar
              size="25"
              round={true}
              name="?"
              src="/assets/img/avat.jpg"
              color="gray"
              cache={cache}
            />
          </span>
        )}
      </div>
      <div className="content extra">
        <Card.Header>
          {item.gameName}
          <Label style={{ float: "right" }} size="small" basic>
            <FontAwesomeIcon fixedWidth icon={getIcon(item.gameConsole)} />{" "}
            {item.gameConsole}
          </Label>
        </Card.Header>

        <Card.Description>
          <div
            className="content left floated "
            style={{ minHeight: 10, padding: 2 }}
          >
            {getGroupBadgeBlock(
              item.outSign,
              item.prize,
              "Prize",
              "left",
              "green"
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
              "blue"
            )}
          </div>
        </Card.Description>
      </div>
    </Card>
  );
};
export default EventBlock;
