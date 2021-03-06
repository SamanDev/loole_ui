import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import userService from "services/user.service";
import Swal from "sweetalert2";
import Games from "server/Games";

import { defUser } from "const";
import {
  Button,
  Input,
  Dropdown,
  Form,
  Select,
  Card,
  Header,
} from "semantic-ui-react";
import { Row, Col } from "react-bootstrap";
import {
  handleTagForm,
  printJoinalerts,
  date_edit,
  editDateTime,
} from "components/include";
import MatchCard from "components/matchcard.component";
import UserContext from "context/UserState";
var moment = require("moment");

const getBlockGames = (filtermode) => {
  var gamemap = [];
  Games.games.map((item) => {
    item.gameconsole.map((consoles) => {
      if (filtermode == "Match") {
        if (item.haveMatch == true && item.active) {
          gamemap.push({
            value: item.name + " - " + consoles.consolename,
            text: item.name + " - " + consoles.consolename,
          });
        }
      } else if (filtermode == "Tournament") {
        if (item.haveTournament == true) {
          gamemap.push({
            value: item.name + " - " + consoles.consolename,
            text: item.name + " - " + consoles.consolename,
          });
        }
      } else if (filtermode == "League") {
        if (item.haveLeague == true) {
          gamemap.push({
            value: item.name + " - " + consoles.consolename,
            text: item.name + " - " + consoles.consolename,
          });
        }
      } else {
        if (
          "All" == filtermode ||
          consoles.consolename == filtermode ||
          (consoles.consolename != "Mobile" && filtermode == "NoMobile")
        ) {
          gamemap.push({
            value: item.name + " - " + consoles.consolename,
            text: item.name + " - " + consoles.consolename,
          });
        }
      }
    });
  });

  return gamemap;
};
const options = [
  { key: "dollar", text: "Dollar", value: "Dollar" },
  { key: "point", text: "Diamonds", value: "Point" },
];

const getBlockGameModes = (filtermode) => {
  var gamemaplocal = [];

  if (filtermode != "") {
    var filter = filtermode.value.split(" - ")[0];

    Games.games.map((item) => {
      if (item.name == filter) {
        item.modes.map((mode) => {
          gamemaplocal.push({
            value: mode.modename,
            text: mode.modename,
          });
        });
      }
    });
  }

  return gamemaplocal;
};
const getBlockGameModesVal = (filtermode) => {
  var gamemaplocal = [];

  if (filtermode != "") {
    var filter = filtermode?.value?.split(" - ")[0];

    Games.games.map((item) => {
      if (item.name == filter) {
        item.modes.map((mode, j) => {
          if (j == 0) {
            gamemaplocal.push({
              value: mode.modename,
              text: mode.modename,
            });
          }
        });
      }
    });
  }

  return gamemaplocal[0];
};

var now = new Date();

var start = moment(now).format();
var startUtc = editDateTime(start);
class AddMatch extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.handleCreateMatch = this.handleCreateMatch.bind(this);
    this.setGameName = this.setGameName.bind(this);

    this.setGameMode = this.setGameMode.bind(this);
    this.printErr = this.printErr.bind(this);
    this.setBetAmount = this.setBetAmount.bind(this);

    this.setAvalableFor = this.setAvalableFor.bind(this);
    this.setSelectedTag = this.setSelectedTag.bind(this);

    this.setInSign = this.setInSign.bind(this);
    this.setMax = this.setMax.bind(this);
    this.state = {
      GName: { value: "Plato Pool - Mobile", text: "Plato Pool - Mobile" },
      GameMode: { value: "Duel", text: "Duel" },

      gamemaplocal: [],
      BetAmount: 10,
      Prize: "",
      AvalableFor: { value: "60", text: "1 Hour" },
      StartTime: { value: "60", text: "1 Hour Later" },
      loading: false,
      submit: false,
      GameTag: "",
      message: "",
      inSign: { value: "Dollar", text: "Dollar" },
      gamePlatform: "",
      gameName: "",
    };
  }
  componentDidMount() {
    if (this.context.uList.currentUser.balance < 10) {
      this.setState({
        inSign: { key: "point", text: "Diamonds", value: "Point" },
      });
    }
  }

  setGameName(e, data) {
    this.setState({
      GName: data,
      GameMode: getBlockGameModesVal(data),
    });
  }
  setInSign(e, data) {
    this.setState({
      inSign: data,
    });
    this.setMax(data, this.state.BetAmount);
  }

  setGameMode(e, data) {
    this.setState({
      GameMode: data,
    });
  }
  setMax(data, amount) {
    var _max = this.context.uList.currentUser.balance;
    var _e = this.state.BetAmount;
    var _mode = this.state.inSign.value;
    if (data) {
      _mode = data.value;
    }
    if (amount) {
      _e = amount;
    }
    if (_mode == "Point") {
      _max = this.context.uList.currentUser.point;
    }
    if (parseFloat(_e) > _max) {
      _e = parseInt(_max - 1);
    }
    if (_e < 0) {
      _e = 0;
    }
    if (_e != this.state.BetAmount) {
      this.setBetAmount("max", { value: _e });
    }
  }
  setBetAmount(e, data) {
    var _e = parseInt(data.value);

    this.setState({
      BetAmount: _e,
    });
    if (e != "max") {
      this.setMax(this.state.inSign, data.value);
    }

    //this.setTournamentMode(getBlockTournamentVal(e, this.state.TournamentMode));
  }
  setAvalableFor(e) {
    this.setState({
      AvalableFor: e,
    });
  }

  setSelectedTag(e, p, currentUser) {
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
    this.setState({
      gameName: e.replace(" Warzone", ""),
      gamePlatform: p,
    });
    handleTagForm(e.replace(" Warzone", ""), p, currentUser);
  }
  setUserTag(e) {
    this.setState({
      currentUserTag: e,
    });
  }
  printErr = (error) => {
    var GName = this.state.GName;
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

      this.context.setUList({
        currentUser: defUser,
      });
    } else {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      if (error?.response?.data.indexOf("Error") > -1) {
        {
          printJoinalerts(
            error?.response?.data,
            GName,
            this.context.uList.currentUser,
            handleTagForm,
            this.props
          );
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: resMessage,
        });
      }
    }
  };

  handleCreateMatch(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
      loading: true,
    });
    var _Start = new Date().valueOf();

    userService
      .createEvent(
        this.state.GName.value.split(" - ")[0],
        this.state.GName.value.split(" - ")[1],
        //this.state.GameMode.value,
        "Duel",
        this.state.BetAmount,
        this.state.inSign.value,
        this.state.inSign.value,
        this.state.inSign.value,
        parseInt(this.state.AvalableFor.value),
        _Start
      )
      .then(
        (response) => {
          //alert(response)
          if (response.data.accessToken) {
            this.context.setUList({ currentUser: response.data });
            localStorage.setItem("user", JSON.stringify(response.data));
            this.props.onUpdateItem("openModalAdd", false);

            Swal.fire("", "Data saved successfully.", "success").then(() => {
              this.props.history.push("/panel/dashboard");
            });
          } else {
            this.setState({
              loading: false,
            });

            {
              printJoinalerts(
                response.data,
                this.state.GName,
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
  render() {
    const currentUser = this.context.uList.currentUser;
    var timestring1 = new Date();

    var utcDate = timestring1.toUTCString();

    var startdate = moment(utcDate).format();

    var enddate = moment(startdate).add(
      this.state.AvalableFor.value,
      "minutes"
    );

    startdate = moment(startdate).format();
    enddate = moment(enddate).format();

    var item = {
      commission: 90,
      id: 33,
      gameName: this.state.GName.value.split(" - ")[0],
      gameConsole: this.state.GName.value.split(" - ")[1],
      gameMode: this.state.GameMode.value,
      status: "Pending",
      totalPlayer: 2,
      eventLevel: 1,
      nextLevel: 1,
      timeMinute: this.state.AvalableFor.value * 1000 * 60,
      prize: (this.state.BetAmount * 2 * 90) / 100,
      tournamentPayout: null,
      amount: this.state.BetAmount,
      winner: null,
      inSign: this.state.inSign.value,
      outSign: this.state.inSign.value,
      rules: null,
      expire: date_edit(enddate),
      startTime: date_edit(startdate),
      finished: "2021-11-01T20:34:39.000+00:00",
      players: [
        {
          id: 86,
          username: currentUser.username,
          ranking: null,
          totalScore: null,
          winAmount: null,
          gamePlatform: "Mobile",
          nickName: "salar",
          tagId: "57656",
          callOfDuties: [],
        },
      ],
      matchTables: [
        {
          id: 172,
          winner: null,
          status: "Pending",
          level: null,
          matchCode: null,
          startTime: Date.now() + this.state.AvalableFor.value * 1000 * 60,
          matchPlayers: [
            {
              id: 371,
              username: currentUser.username,
              ready: false,
            },
          ],
          matchChats: [],
        },
      ],
    };

    return (
      <>
        <Header as="h2" inverted>
          Create 1vs1 Match
        </Header>
        <Form
          inverted
          onSubmit={this.handleCreateMatch}
          style={{ width: "100%" }}
        >
          <Row>
            <Col xs="12" sm="12" md="6">
              <Form.Field
                control={Select}
                label="Game"
                placeholder="Game"
                size="small"
                value={this.state.GName.value}
                onChange={this.setGameName}
                options={getBlockGames("Match")}
              />
              <Form.Field
                className="hide"
                control={Select}
                label="Mode"
                placeholder="Mode"
                value={this.state.GameMode.value}
                onChange={this.setGameMode}
                options={getBlockGameModes(this.state.GName)}
              />
              <Form.Field>
                <label>Bet</label>
                <Input
                  fluid
                  size="small"
                  type="tel"
                  label={
                    <Dropdown
                      value={this.state.inSign.value}
                      onChange={this.setInSign}
                      options={options}
                    />
                  }
                  labelPosition="right"
                  placeholder="Bet"
                  maxLength="4"
                  value={this.state.BetAmount}
                  onChange={this.setBetAmount}
                />
              </Form.Field>
              <Form.Field>
                <label>Available for</label>

                <Button.Group
                  widths="4"
                  type="button"
                  size="small"
                  buttons={[
                    {
                      key: "60",
                      content: "1 H",
                      type: "button",
                      active: this.state.AvalableFor.value == "60" && true,
                      onClick: () => this.setAvalableFor({ value: "60" }),
                    },
                    {
                      key: "120",
                      content: "2 H",
                      type: "button",
                      active: this.state.AvalableFor.value == "120" && true,
                      onClick: () => this.setAvalableFor({ value: "120" }),
                    },
                    {
                      key: "180",
                      content: "3 H",
                      type: "button",
                      active: this.state.AvalableFor.value == "180" && true,
                      onClick: () => this.setAvalableFor({ value: "180" }),
                    },
                  ]}
                />
              </Form.Field>
            </Col>
            <Col xs="12" sm="12" md="6">
              {this.state.GName.value.indexOf(" - ") > -1 && (
                <>
                  <div className="mobile only">
                    <Card.Group
                      className="fours "
                      centered
                      style={{ margin: "20px auto" }}
                    >
                      <MatchCard item={item} />
                    </Card.Group>
                  </div>
                  <div className="mobile hidden">
                    <Card.Group
                      className="fours"
                      itemsPerRow="1"
                      style={{ position: "relative", top: -30, float: "right" }}
                    >
                      <MatchCard item={item} />
                    </Card.Group>
                  </div>
                </>
              )}
            </Col>
          </Row>

          <Button.Group size="small" inverted fluid widths="2">
            <Button
              color="green"
              fluid
              loading={this.state.loading}
              disabled={this.state.loading || !currentUser.userActivate}
            >
              Create Match
            </Button>
            <Button.Or />
            <Button
              color="red"
              type="button"
              disabled={this.state.loading}
              fluid
              onClick={() => this.props.onUpdateItem("openModalAdd", false)}
            >
              Close
            </Button>
          </Button.Group>
        </Form>
      </>
    );
  }
}

export default withRouter(AddMatch);
