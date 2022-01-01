import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaystation, faXbox } from "@fortawesome/free-brands-svg-icons";
import { faDesktop, faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import Avatar from "react-avatar";
import Countdown from "react-countdown";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link, useLocation } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import userService from "services/user.service";
import MatchCard from "components/matchblock.component";
import TransitionExampleTransitionExplorer from "components/anim.component";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import eventBus from "views/eventBus";
import CopyText  from "components/copy.component";
import {
  faInstagram,
  faTwitch,
  faYoutube,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Moment from "moment";
import SidebarExampleSidebar from "components/ready.component";
import {
  Statistic,
  Button,
  Icon,
  Label,
  Divider,
  Grid,
  Segment,
  Card,
  Image,Dimmer,
  List,Checkbox
} from "semantic-ui-react";
// react-bootstrap components
import {
  Badge,
  Alert,
  Form,
  InputGroup,
  Navbar,
  Nav,
  OverlayTrigger,
  Table,
  Tooltip,
  Container,
  Row,
  Col,
  Carousel,
  TabContent,
  TabPane,
  Tab,
  ProgressBar,
  ListGroup,
} from "react-bootstrap";
import { useHistory } from "react-router";

var moment = require("moment");

export const getQueryVariable = (variable, q) => {
  if (q) {
    var query = q;
  } else {
    var query = window.location.search.substring(1);
  }

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
  var b = d.toLocaleDateString() + " " + d.toTimeString().split(" ")[0];
  return b;
};
export const date_edit = (thisDate) => {
  
  //console.log('thisDate: '+thisDate)
  var mom = moment(thisDate).format("YYYY-MM-DDThh:mm:ss.000-08:00");
  //thisDate = thisDate.replace('+00:00','-08:00');
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
    res = res + " " + str.substring(1, 2);
  } else {
    var res = "";
  }

  return res;
};

export const getIcon = (name) => {
  if (name == "Mobile") {
    return faMobileAlt;
  }
  if (name == "PS4" || name == "PS5") {
    return faPlaystation;
  }
  if (name == "XBox") {
    return faXbox;
  }
  if (name == "PC") {
    return faDesktop;
  }
};
export const getTagName = (game, console) => {
  if (console == "Mobile") {
    return game;
  }
  if (console == "PS4" || console == "PS5") {
    return "PSN";
  }
  if (console == "XBox") {
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
        propsSend.history.push("/panel/cashier")
      }
    });
  } else if (response == "pointBalanceError") {
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
        propsSend.history.push("/panel/cashier")
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

    setSelectedTag(e.replace(" Warzone", ""), p, currentUser);
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

export const getGroupBadgeBlock = (sign, amount, label, pos, color) => {
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

      <Label size="small" basic>
        <Icon name={nIcon} color={nColor} />

        <CurrencyFormat
          value={nAmount}
          displayType={"text"}
          thousandSeparator={true}
          prefix={""}
          renderText={(value) => value}
        />
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
export const vsComponentPlayer = (
  item,
  matchidFind,
  num,
  matchid,
  currentUser,
  isloading,
  handlechangeReadyEvent
) => {
  var player = matchidFind.matchPlayers[num];
  var padd = 10;
  if (matchidFind.status == "Ready" && currentUser.accessToken) {
    padd = 60;
  }
  if (matchidFind.status == "InPlay" && currentUser.accessToken) {
    padd = 60;
  }
  if (matchidFind.status == "InPlay" && item.players[num].nickName && currentUser.accessToken) {
    padd = 150;
  }
  //if(matchidFind.status == "Pending" && item.gameMode == 'Tournament') {padd = padd + 50}
  if (item.gameMode == "Tournament" && !getQueryVariable("matchid")) {
    padd = 0;
  }
  var user = (
    <div style={{ overflow:'hidden',padding: "0px 0 " + padd + "px 0" }}>
      {handlechangeReadyEvent ? (
        <Statistic inverted size="mini" as={Link} to={'/user/'+player?.username} target="_blank">
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
            <Avatar
              size="50"
              round={true}
              src="https://graph.facebook.com/100008343750912/picture?width=200&height=200"
              color="lightgray"
              className="avatar"
            />
          )}
        </Statistic.Value>
        <Statistic.Label>
          <small>
            {player?.username ? (
              <>
               
                  {player.username}
              
              </>
            ) : (
              <>...</>
            )}
          </small>
        </Statistic.Label>
      </Statistic>
      ):(
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
            <Avatar
              size="50"
              round={true}
              src="https://graph.facebook.com/100008343750912/picture?width=200&height=200"
              color="lightgray"
              className="avatar"
            />
          )}
        </Statistic.Value>
        <Statistic.Label>
          <small>
            {player?.username ? (
              <>
               
                  {player.username}
              
              </>
            ) : (
              <>...</>
            )}
          </small>
        </Statistic.Label>
      </Statistic>
      )}
      
    </div>
  );
  var ready = (
    <>
      {player?.username == currentUser.username ? (
        <div
          style={
            matchidFind.status != "Ready" ||
            player.username != currentUser.username ||
            isloading
              ? {
                  
                  width: '90%',
                  maxWidth: 150,
                  margin: "auto",
                  position: "relative",
                  zIndex: 10,
                  opacity: 0.5,
                }
              : {
                width: '90%',
                maxWidth: 150,
                  margin: "auto",
                  position: "relative",
                  zIndex: 10,
                }
          }
        >
          <small>Ready</small><br/>
          <Checkbox toggle defaultChecked={player.ready} disabled={player.username != currentUser.username}
            
            onChange={(checked) => {
              handlechangeReadyEvent(checked);
            }} />
          
        </div>
      ) : (
        <div
          style={{
            
            width: '90%',
                  maxWidth: 150,
            margin: "auto",
            position: "relative",
            zIndex: 10,
            opacity: 0.5,
          }}
        ><small>Ready</small><br/>
          <Checkbox toggle defaultChecked={player?.ready} disabled
            
             />
          
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
      {_p && _p.username != "Tournament Player" && (
        <>
          {_p.tagId && (
            
            <Statistic inverted color="red" size="mini">
              <Statistic.Label>
                {getTagName(item.gameName, item.gameConsole)} iD
              </Statistic.Label>
              <Statistic.Value><CopyText color="red" size="small" myid={_p.tagId}/></Statistic.Value>
            </Statistic>
          )}
          {_p.nickName && (
            <>
              <Divider fitted style={{ opacity: 0 }} />
              <Statistic inverted color="olive" size="mini">
                <Statistic.Label>Nickname</Statistic.Label>
                <Statistic.Value>{_p.nickName}</Statistic.Value>
              </Statistic>
            </>
          )}
        </>
      )}
    </>
  );
  return (
    <>
      <div style={!player?.username ? { opacity: 0.3,overflow:'hidden' } : {overflow:'hidden'}}>
        <SidebarExampleSidebar
          user={user}
          item={item}
          objanim={ready}
          info={info}
          status={matchidFind.status}
          isUser={player?.username == currentUser.username}
          visible={
            (matchidFind.status == "Ready" || matchidFind.status == "InPlay") && currentUser.accessToken
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
  handleLeaveMatch
) => {
  var _res = 'VS';
  {(item.status == "Pending" || item.status == "Ready") && (
    <>
      {match.matchPlayers[0].username == currentUser.username ||
      match.matchPlayers[1].username == currentUser.username ? (
        <>
          {match.matchPlayers[0].username != currentUser.username &&
            !match.matchPlayers[1].ready && (
              <>
                {_res = <>
              <Button
                  animated
                  size="small"
                  className="mobile hidden"
                  inverted
                  onClick={handleLeaveMatch}
                  color="red"
                  disabled={isloading}
                  loading={isloading}
                  style={{position: "relative",top:-10}}
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
                loading={isloading}
                style={{position: "relative",top:-10}}
              >
                <Button.Content visible>Leave</Button.Content>
                
              </Button>
              </>
  }
              </>
            )}
        </>
      ) : (
        <>
          {item.totalPlayer > activePlayer && (
            <>
              {_res = <><Button
                animated
                className="mobile hidden"
                size="small"
                inverted
                onClick={handleJoinMatch}
                color="green"
                disabled={isloading|| !currentUser.userActivate}
                loading={isloading}
                style={{position: "relative",top:-10}}
              >
           
                <Button.Content visible  >Join Match</Button.Content>
                <Button.Content hidden>
                  for {item.inSign.replace("Dollar", "$")} {item.amount}
                </Button.Content>
              </Button>
              <Button
                
                size="small"
                className="mobile only"
                inverted
                onClick={handleJoinMatch}
                color="green"
                disabled={isloading|| !currentUser.userActivate}
                loading={isloading}
                style={{position: "relative",top:-10}}
              >
                <Button.Content visible>Join</Button.Content>
                
              </Button>
              </>
  }
            </>
          )}
        </>
      )}
    </>
  )}
  return _res 
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
  return (
    <>
    {(item.status == "Pending" || item.status == "Ready") && (
      <p style={{ margin: 0 }}>
        {!isJoin && item.totalPlayer > item.players.length ? (
          <>
            <Button
              animated
              size="big"
              inverted
              onClick={handleJoinMatch}
              loading={isloading}
              color="green"
              disabled={isloading|| !currentUser.userActivate}
            >
              <Button.Content visible>Join Event</Button.Content>
              <Button.Content hidden>
                for {item.inSign.replace("Dollar", "$")} {item.amount}
              </Button.Content>
            </Button>
          </>
        ) : (
          <>
            {mymatchFind && (
              <>
                <Link
                onClick={()=>onUpdateItem('matchIDQ', mymatchFind.id)}
                  to={
                    "/panel/matchlobby?id=" +
                    item.id +
                    "&matchid=" +
                    mymatchFind.id
                  }
                >
                  <Button
                    animated
                    size="big"
                    inverted
                    color="orange"
                    disabled={isloading}
                  >
                    <Button.Content visible>Open My Match</Button.Content>
                
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
  return (
    <>
      <Statistic inverted size="small" color={getColor(item.prize)}>
        <Statistic.Value>{item.gameName} </Statistic.Value>
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
  var _finishTxt = 'Not Joinable';
  //if (match.status) { _finishTxt = match.status}
  //if (match.winner) { _finishTxt = match.winner}
  var _mode = " 1 vs 1 ";
    var _color = "#404040";
   
 
   
  
    if (item.gameMode == "Tournament" || item.gameMode == "League") {
      _mode = item.gameMode;
    }
    
   
    if (item.status=='Canceled' || item.status=='Expired') {
      //_color = "black"; 
    }
  return (
    <>
      {vsComponentTitle(item)}
      <Divider fitted style={{ opacity: 0 }} />
      {printStatus(item,_mode,_color ,item.status+'@@@'+_finishTxt,item.status)}
      <Countdown
        renderer={rendererBig}
        finish={item.status + "@@@"+_finishTxt}
        txt="@@@Avalable until"
        match={match}
        colorfinish={getColor(item.prize)}
        date={item.expire}
      />

      <Segment  basic >
        <Grid columns={2}>
          <Grid.Column
            style={{ background: "none !important" }}
            
            
            className={match.winner != null && match.winner == match.matchPlayers[0]?.username ? "coverwinner" : null}>
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
            className={match.winner != null && match.winner == match.matchPlayers[1]?.username ? "coverwinner":null}>
          
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
          {(match.matchPlayers[0].username == currentUser.username ||
            match.matchPlayers[1].username == currentUser.username) && (
            <>
              <Statistic inverted size="small">
                <Statistic.Label>Match Code</Statistic.Label>
                <Statistic.Value className="matchcode">
                  {getCode(match.matchCode)}
                </Statistic.Value>
              </Statistic>

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
export const getGroupBadgePrice = (sign, amount, classes) => {
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
export const getGroupBadgesmall = (sign, amount, classes) => {
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
              <ol><li>Open player profile in 8BallPool</li><li>Copy Unique ID</li><li>Paste the Unique ID below
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
      preConfirm: (login) => {
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
      preConfirm: (login) => {
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
      preConfirm: (login) => {
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
      preConfirm: (login) => {
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
      preConfirm: (login) => {
        return {
          tagid: filter + "2",
        };
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
      preConfirm: (login) => {
        return {
          tagid: filter + "2",
        };
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
         <option value="PSN">Playstation Network</option>
         <option value="xbl">Xbox Live</option>
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
      preConfirm: (login) => {
        if (document.getElementById("tagid").value) {
          return {
            tagid: document.getElementById("tagid").value,
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
      preConfirm: (login) => {
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
export const renderer = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
  dateExpired,
}) => {
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
export const  getOffset=( el ) =>{
  var _x = 0;
  var _y = 0;
  while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
      _x += el.offsetLeft - el.scrollLeft;
      _y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
  }
  return { top: _y, left: _x };
}
export const printStatus = (item, _mode, _color,finish,status) => {
  //console.log(item, _mode, _color,finish,status)
  return (
    <>
      <Divider fitted style={{ opacity: 0 }} />
      {item.winner ? (
        <Statistic inverted color={getColorStatus(status)} size="mini" >
          <Statistic.Label>{_mode}</Statistic.Label>
          <Statistic.Label>
            <div style={{ position: "relative", transform: "scale(.8)" }}>
                    <div
                      className="winner avatar"
                      style={{ width: 92, height: 92, borderRadius: 100 }}
                    ></div>
                    <div className=" ">
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
        </Statistic>
      ) : (
        <>
        {(item.status == "Pending" ) ? (
          <>
        {_mode=='Tournament' && item.status == 'Pending' && !getQueryVariable("matchid") ? (
          <Statistic inverted color={getColorStatus(status)} size="tiny">
          <Statistic.Label>{_mode}</Statistic.Label>
          <Statistic.Value>{item?.players?.length}/{item.totalPlayer}</Statistic.Value>
        </Statistic>
        ):(
<Statistic inverted color={getColorStatus(status)} size="tiny">
<Statistic.Label>{_mode}</Statistic.Label>
<Statistic.Value>{status}</Statistic.Value>
</Statistic>
        )}
        </>
        ): (
          <>
        <Divider fitted style={{ opacity: 0 }} />
      <Statistic inverted size='mini' color='red'>
      <Statistic.Label>{_mode}</Statistic.Label>
    <Statistic.Label>{finish.split("@@@")[0]}</Statistic.Label>
        {finish.split("@@@")[1] && (
          <>
          {finish.split("@@@")[1].indexOf('Not') > -1 ? (
          <Statistic.Value><br/><br/>{finish.split("@@@")[1]}</Statistic.Value>
        ):(
          <>
          <Statistic.Value>{finish.split("@@@")[1]}</Statistic.Value>
          <Statistic.Label>is winner</Statistic.Label>
          </>
        )}
          </>
        )}
        
      </Statistic>
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
  var _mode = props.mode;
  var _color = props.color;
  var _colorFinish = props.colorfinish;
  if (!_colorFinish) {
    _colorFinish = _color;
  }
  if (completed || props.match?.winner || (props.match?.status != 'Pending')) {
    // Render a complete state
    //return <Completionist />;
    return <>
    
    </>;
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
          {hours > 0 ? <>{hours > 9 ? <>{hours}:</> : <>0{hours}:</>}</> : null}
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
export const getGameTag = (game, userTags) => {
  var res = "Not Connected";
  var resName = "";
  if (userTags) {
    userTags.map(function (tag) {
      if (tag.gameName == game) {
        res = tag.tagId;
        resName = tag.nickName;
        if (resName == "") resName = "Connected";
        if (res != "" && game == "ClashRoyale") res = "#" + res;
      }
    });
  }
  res = res.split("@@")[0];
  if (res == "Not Connected") {
    return (
      <p style={{ opacity: 0.5, margin: 0, lineHeight: "20px" }}>
        <small className="text-muted">
          <b>{res}</b>
          <br />
          Click to connect
        </small>
      </p>
    );
  } else {
    return (
      <p style={{ margin: 0, lineHeight: "20px" }}>
        <small>
          <b>{resName}</b>
          <br />
          {res}
        </small>
      </p>
    );
  }
};
export const getSocialTag = (game, userTags) => {
  var res = "Not Connected";
  var resName = "";

  if (userTags) {
    userTags.map(function (tag) {
      if (tag.accountName == game) {
        res = tag.accountId;
        resName = "";
        if (resName == "") resName = "Connected";
      }
    });
  }
  res = res.split("@@")[0];
  if (res == "Not Connected") {
    return (
      <p style={{ opacity: 0.5, margin: 0, lineHeight: "20px" }}>
        <small className="text-muted">
          <b>{res}</b>
          <br />
          Click to connect
        </small>
      </p>
    );
  } else {
    return (
      <p style={{ margin: 0, lineHeight: "20px" }}>
        <small>
          <b>{resName}</b>
          <br />
          {res}
        </small>
      </p>
    );
  }
};
export const showSocialTag = (game, userTags) => {
 
var res  =  null;
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
  var flag = "ir";
  var flagLabel = "Iran, Islamic Republic of";
  if (currentUser.country.value && currentUser.country.value != flag) {
    flag = currentUser.country.value;
    flagLabel = currentUser.country.label;
  }
  var lastLogin = moment(currentUser.lastLogin).startOf('day').fromNow();
  return (
    <>
    
      <div
        className="text-center"
       
      >
          <Statistic size="mini">
              
              <Statistic.Value>{currentUser.username}
          </Statistic.Value>
          <Statistic.Label>
          <small className="text-muted">From </small><br/><img
            src={"/assets/images/famfamfam_flag_icons/png/" + flag + ".png"} style={{position: "relative",top:-1}}
          /> {flagLabel}<br/><br/><small className="text-muted">Last Login</small><br/> {lastLogin}
              </Statistic.Label>
            </Statistic>
        <Card.Header as="h5" style={{ marginBottom: 0, marginTop: 15 }}>
      
          
        </Card.Header>
        
      
        <ListGroup horizontal style={{ display: "inline-flex", marginTop: 10 }}>
          {haveSocialTag("Instagram", currentUser.userSocialAccounts) && (
            <ListGroup.Item action as='a' href={'https://instagram.com/'+showSocialTag("Instagram", currentUser.userSocialAccounts)} target='_blank'>
              <FontAwesomeIcon
                icon={faInstagram}
                style={{ color: "#e95950" }}
              />
            </ListGroup.Item>
          )}
          {haveSocialTag("Twitch", currentUser.userSocialAccounts) && (
            <ListGroup.Item action  as='a' href={'https://twitch.com/'+showSocialTag("Twitch", currentUser.userSocialAccounts)} target='_blank'>
              <FontAwesomeIcon icon={faTwitch} style={{ color: "#6441a5" }} />
            </ListGroup.Item>
          )}
          {haveSocialTag("Youtube", currentUser.userSocialAccounts) && (
            <ListGroup.Item action  as='a' href={'https://youtube.com/'+showSocialTag("Youtube", currentUser.userSocialAccounts)} target='_blank'>
              <FontAwesomeIcon icon={faYoutube} style={{ color: "#FF0000" }} />
            </ListGroup.Item>
          )}
          {haveSocialTag("Twitter", currentUser.userSocialAccounts) && (
            <ListGroup.Item action as='a' href={'https://twitter.com/'+showSocialTag("Twitter", currentUser.userSocialAccounts)} target='_blank'>
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
  var resName = "";
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
  playerTags.map((tag, w) => {
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
  var resName = "";
  if (userTags) {
    userTags.map(function (tag) {
      if (tag.gameName == game) {
        res = tag.tagId;
        res = res.split("@@")[0];
      }
    });
  }
  if (res == "Not Connected") {
    return false;
  } else {
    return true;
  }
};
export const printBlockChallenge = (newItem, filtermode, prop) => {
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
        <h5>You currently don't have any {filter} event.</h5>
      </div>
      </Dimmer>
    );
  } else {
    return newItem.map((item, i) => {
      return <MatchCard key={i.toString()} item={item} {...prop} />;
    });
  }
};
export const printBlockChallenge = (newItem, filtermode, prop) => {
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
        <h5>You currently don't have any {filter} event.</h5>
      </div>
      </Dimmer>
    );
  } else {
    return newItem.map((item, i) => {
      return <MatchCard key={i.toString()} item={item} {...prop} />;
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

  userService.saveTags(gameName, gamePlatform, gameID, gameNickname).then(
    (response) => {
      let jsonBool = isJson(response.data);

      if (jsonBool) {
        if (response.data.accessToken) {
         
            localStorage.setItem("user", JSON.stringify(response.data));
            eventBus.dispatch("eventsDataUser", response.data);
          eventBus.remove("eventsDataUser");
        Swal.fire("", "Data saved successfully.", "success");
        }
        //window.location.reload(false);
      } else {
        Swal.fire("", response.data, "error");
      }
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

  try {
    var dt = datee;
    var datenew = new Date(dt);

    var dateExpired = datenew.toISOString();
  } catch (e) {
    var dt = datee.replace(" ", "T") + "00Z";
    console.log(dt);
    var dtN = Moment(dt).format("YYYY-MM-DDThh:mm:ss.000-08:00");
    console.log(dtN);
    var datenew = new Date(dtN);
    var dateExpired = datenew.toISOString();
  }
  return dateExpired;
};
function genMatch(lvl, matchCount, title) {
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
  var matchSampleull = {
    startTime: 1619728571000,
    winner: null,
    matchPlayers: [
      {
        id: 257,
        username: null,
        tagName: null,
        ready: false,
      },
      {
        id: 257,
        username: null,
        tagName: null,
        ready: false,
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
}
export const editEvent = (_item, eventIDQ, matchIDQ, currentUser) => {
  var item = JSON.parse(JSON.stringify(_item))
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
      }

      if (item.gameMode == "League") {
        item.tournamentPayout =
          "1-4, 100.00|5-7, 65.00, 35.00|8-10, 50.00, 30.00, 20.00|11-20, 45.00, 28.00, 17.00, 10.00|21-40, 36.00, 23.00, 15.00, 11.00, 8.00, 7.00|41-70, 30.00, 20.00, 14.00, 10.00, 8.00, 7.00, 6.00, 5.00|71-100, 29.00, 18.00, 12.50, 10.00, 8.00, 6.50, 5.50, 4.50, 3.50, 2.50|101-200, 28.00, 17.50, 11.50, 8.50, 7.00, 5.50, 4.50, 3.50, 2.50, 1.50, 1.00x10|201-400, 27.00, 16.50, 10.50, 8.00, 6.25, 4.75, 3.75, 2.75, 1.75, 1.25, 0.75x10, 0.50x20|401-700, 26.00, 15.50, 10.00, 7.50, 6.00, 4.50, 3.50, 2.50, 1.50, 1.00, 0.65x10, 0.40x20, 0.25x30|701-1000, 25.00, 15.00, 10.00, 7.25, 5.50, 4.25, 3.25, 2.25, 1.25, 0.75, 0.55x10, 0.40x20, 0.25x30, 0.15x30";
      }

     
      if (!item.rules) {
        item.info = {
          conditions: [
            "Thank you for participating in our COD: Warzone Beta tournament",
            "During the Beta scores may be altered, removed or updated as we test the implementation of our scoring systems",
            "Only games played after you join the tournament are counted",
            "SMURF accounts are not allowed on Repeat.gg and will be banned",
          ],
        };
        item.rules =
          "<p>Refer to the tournament details to see what game modes are tracked</p><p>Smurfing (creating a new account to compete with) will result in an immediate and permanent ban from <span data-ignore='true'>Repeat.gg</span> and all winnings will be forfeited.</p><p>You must play the minimum number of games in order to get paid out in a tournament. The minimum number of games to play is the same as the number of games we count for your score, which can be found in the Tournament Details.</p>";
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

      lists = item.matchTables;
      matchidFind = item.matchTables[0];
//console.log(matchIDQ)
      if (matchIDQ) {
        lists.map((tblmatch, w) => {
          //console.log(tblmatch.id == parseInt(eventIDQ))
          if (parseInt(tblmatch.id) == parseInt(matchIDQ)) {
            matchidFind = tblmatch;
          }
        });

        //matchidFind = lists.filter( (list) => list.id === );
      }

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
            (tblmatch.matchPlayers[0]?.username == currentUser.username ||
              tblmatch.matchPlayers[1]?.username == currentUser.username)
          ) {
            mymatchFind = tblmatch;
          }
        });

        //matchidFind = lists.filter( (list) => list.id === );
      }
      //matchidFind.status = 'InPlay'


      if (!matchidFind) {
        matchidFind = {
          id: item.id,
          winner: null,
          status: item.status,
          level: 1,
          matchCode: null,
          startTime: "2021-11-29T12:18:01.000+00:00",
          matchPlayers: [],
          matchChats: [],
        };
      }
      //console.log(matchidFind);
      if (item.chats != "null") {
        {
          item.chats.map((itemnew, i) => {
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
          matchidFind.matchChats.map((itemnew, i) => {
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
  var _mode = " 1 v 1 ";
  var _color = "#404040";

  return (
    <Link to={"/panel/lobby?id=" + item.id}>
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
          Avalable for:{" "}
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
