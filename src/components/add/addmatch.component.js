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
  Divider,
  Header,
} from "semantic-ui-react";
import { Row, Col } from "react-bootstrap";
import { handleTagForm, date_edit, printJoinalerts } from "components/include";
import MatchCard from "components/matchcard.component";
var moment = require("moment");


const getBlockGames = (filtermode) => {
  var gamemap = [];
  Games.games.map((item) => {
    item.gameconsole.map((consoles) => {
      if (filtermode == "Match") {
        if (item.haveMatch == true) {
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

class AddMatch extends Component {
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

    this.state = {
      GName: { value: "8Pool - Mobile", text: "8Pool - Mobile" },
      GameMode: { value: "Duel", text: "Duel" },

      currentUser: this.props.token,
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
  }

  setGameMode(e, data) {
    this.setState({
      GameMode: data,
    });
  }
  setBetAmount(e, data) {
    this.setState({
      BetAmount: data.value,
    });

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
    console.log(error?.response?.data);
    if (error?.response?.data?.status == 401) {
      this.props.onUpdateItem("openModalLogin", true);
      localStorage.setItem("user", JSON.stringify(defUser));
      this.props.onUpdateItem("currentUser", defUser);
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
            this.state.currentUser,
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

    userService
      .createEvent(
        this.state.GName.value.split(" - ")[0],
        this.state.GName.value.split(" - ")[1],
        this.state.GameMode.value,
        this.state.BetAmount,
        this.state.inSign.value,
        this.state.inSign.value,
        this.state.inSign.value,
        this.state.AvalableFor.value
      )
      .then(
        (response) => {
          //alert(response)
          if (response.data.accessToken) {
            this.props.onUpdateItem("currentUser", response.data);
            this.props.onUpdateItem("openModalAdd", false);
            Swal.fire("", "Data saved successfully.", "success").then(
              () => {
                this.props.history.push("/panel/dashboard");
              }
            );
          } else {
            this.setState({
              loading: false,
            });

            {
              printJoinalerts(
                response.data,
                this.state.GName,
                this.state.currentUser,
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
    var { currentUser } = this.state;
    var timestring1 = new Date();
    var startdate = moment(timestring1).format();

    startdate = moment(startdate)
      .add(this.state.AvalableFor.value, "minutes")
      .format();
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
      expire: startdate,
      startTime: "2021-11-01T20:34:39.000+00:00",
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
            <Col sm="6">
              <Form.Field
                control={Select}
                label="Game"
                placeholder="Game"
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
                <label>Avalable for</label>

                <Button.Group
                  widths="4"
                  type="button"
                  buttons={[
                    {
                      key: "30",
                      content: "30 M",
                      type: "button",
                      active: this.state.AvalableFor.value == "30" && true,
                      onClick: () => this.setAvalableFor({ value: "1" }),
                    },
                    {
                      key: "60",
                      content: "1 H",
                      type: "button",
                      active: this.state.AvalableFor.value == "60" && true,
                      onClick: () => this.setAvalableFor({ value: "60" }),
                    },
                    {
                      key: "360",
                      content: "6 H",
                      type: "button",
                      active: this.state.AvalableFor.value == "360" && true,
                      onClick: () => this.setAvalableFor({ value: "360" }),
                    },
                    {
                      key: "1440",
                      content: "1 D",
                      type: "button",
                      active: this.state.AvalableFor.value == "1440" && true,
                      onClick: () => this.setAvalableFor({ value: "1440" }),
                    },
                  ]}
                />
              </Form.Field>
            </Col>
            <Col sm="6">
              {this.state.GName.value.indexOf(" - ") > -1 && (
                <>
                  <Divider
                    horizontal
                    inverted
                    className="mobile only"
                    style={{ marginTop: 40 }}
                  >
                    Or
                  </Divider>
                  <Card.Group
                    className="fours "
                    style={{ marginBottom: 20, float: "right" }}
                  >
                    <MatchCard item={item} />
                  </Card.Group>
                </>
              )}
            </Col>
          </Row>

          <Button.Group size="large" inverted fluid widths="2">
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
