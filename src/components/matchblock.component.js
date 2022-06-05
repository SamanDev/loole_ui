import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Avatar from "react-avatar";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";

import {
  setAvatar,
  getColorStatus,
  getIcon,
  getGroupBadgeBlock,
  rendererBig,
  printStatus,
  getMatchTitle,
  findMatch,
  genLink,
  date_edit_card,
  isJson,
} from "components/include.js";
import {
  Icon,
  Label,
  Card,
  Statistic,
  Divider,
  Image,
} from "semantic-ui-react";
// react-bootstrap components
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

function MatchBlock(prop) {
  var _mode = " 1 vs 1 ";
  var _color = "#404040";
  var _finishTxt = "Not Joinable";
  var item = prop.item;
  var lists = item.matchTables;

  lists.sort((a, b) => (a.level > b.level ? 1 : -1));

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

  item?.players.sort(function (a, b) {
    if (a === b || (a.ranking === b.ranking && a.totalScore === b.totalScore))
      return 0;
    if (a.totalScore > b.totalScore) return -1;
    if (a.totalScore < b.totalScore) return 1;
    if (a.ranking > b.ranking) return 1;
    if (a.ranking < b.ranking) return -1;
  });
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
        ) : (
          <span>
            <Avatar
              size="25"
              round={true}
              name="?"
              src="/assets/img/avat.jpg"
              color="lightgray"
            />
            <Avatar
              size="25"
              round={true}
              name="?"
              src="/assets/img/avat.jpg"
              color="gray"
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
}
export default MatchBlock;
