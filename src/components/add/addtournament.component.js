import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-select";
import { withRouter } from "react-router-dom";
import userService from "services/user.service";
import NumericInput from "react-numeric-input";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Games from "server/Games";
import { Row, Col } from "react-bootstrap";
import MatchCard from "components/matchcard.component";
import { Header, Card } from "semantic-ui-react";
import { handleTagForm } from "components/include";

const getBlockGames = (filtermode) => {
  var gamemap = [];
  Games.games.map((item) => {
    item.gameconsole.map((consoles) => {
      if (filtermode == "Match") {
        if (item.haveMatch == true) {
          gamemap.push({
            value: item.name + " - " + consoles.consolename,
            label: item.name + " - " + consoles.consolename,
          });
        }
      } else if (filtermode == "Tournament") {
        if (item.haveTournament == true) {
          gamemap.push({
            value: item.name + " - " + consoles.consolename,
            label: item.name + " - " + consoles.consolename,
          });
        }
      } else if (filtermode == "League") {
        if (item.haveLeague == true) {
          gamemap.push({
            value: item.name + " - " + consoles.consolename,
            label: item.name + " - " + consoles.consolename,
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
            label: item.name + " - " + consoles.consolename,
          });
        }
      }
    });
  });

  return gamemap;
};

const getBlockGameModesVal = (filtermode) => {
  var gamemaplocal = [];

  if (filtermode != "") {
    var filter = filtermode.value.split(" - ")[0];

    Games.games.map((item) => {
      if (item.name == filter) {
        item.modes.map((mode, j) => {
          if (j == 0) {
            gamemaplocal.push({
              value: mode.modename,
              label: mode.modename,
            });
          }
        });
      }
    });
  }

  return gamemaplocal[0];
};
var moment = require("moment");
var nowS = new Date();
var nowE = moment(nowS).add(1, "hours");

var stdate = moment(nowE).format("YYYY-MM-DDTHH:00");
var _StartTime = new Date(stdate).valueOf();
class AddTour extends Component {
  constructor(props) {
    super(props);
    this.handleCreateTournament = this.handleCreateTournament.bind(this);
    this.setGameName = this.setGameName.bind(this);
    this.setGameMode = this.setGameMode.bind(this);

    this.setBetAmount = this.setBetAmount.bind(this);

    this.setAvalableFor = this.setAvalableFor.bind(this);
    this.setSelectedTag = this.setSelectedTag.bind(this);
    this.setInSign = this.setInSign.bind(this);
    this.setOutSign = this.setOutSign.bind(this);
    this.setTournamentPayout = this.setTournamentPayout.bind(this);
    this.setRules = this.setRules.bind(this);
    this.setTournamentMode = this.setTournamentMode.bind(this);
    this.getBlockTournamentVal = this.getBlockTournamentVal.bind(this);
    this.setStartTimePeriod = this.setStartTimePeriod.bind(this);
    this.setStartTime = this.setStartTime.bind(this);
    this.setPrize = this.setPrize.bind(this);

    this.state = {
      GName: { value: "", label: "" },
      GameMode: { value: "Duel", label: "Duel" },
      TournamentMode: { value: "4", label: "4 Players" },

      currentUser: this.props.token,
      gamemaplocal: [],
      BetAmount: 10,
      Prize: null,
      AvalableFor: { value: "60", label: "1 Hour" },
      StartTimePeriod: { value: "60", label: "1 Hour" },
      StartTime: stdate,
      loading: false,
      submit: false,
      GameTag: "",
      message: "",
      Rules:
        "<p>Refer to the tournament details to see what game modes are tracked</p><p>Smurfing (creating a new account to compete with) will result in an immediate and permanent ban from <span data-ignore='true'>Repeat.gg</span> and all winnings will be forfeited.</p><p>You must play the minimum number of games in order to get paid out in a tournament. The minimum number of games to play is the same as the number of games we count for your score, which can be found in the Tournament Details.</p>",
      inSign: { value: "Dollar", label: "Dollar" },
      outSign: { value: "Dollar", label: "Dollar" },
      tournamentPayout:
        "4,100.00@8,65.00,35.00@16,50.00,30.00,10.00,10.00@32,50.00,30.00,10.00,10.00@64,50.00,30.00,10.00,10.000",

      gamePlatform: "",
      gameName: "",
    };
  }
  getBlockTournamentVal = () => {
    var tourmap = {
      value: this.state.TournamentMode.value,
      label:
        this.state.TournamentMode.value +
        " Players - Prize: " +
        (this.state.TournamentMode.value * this.state.BetAmount * 90) / 100,
    };

    return tourmap;
  };
  setGameName(e) {
    this.setState({
      GName: e,
      GameMode: getBlockGameModesVal(e),
    });
  }
  setInSign(e) {
    this.setState({
      inSign: e,
    });
  }
  setOutSign(e) {
    this.setState({
      outSign: e,
    });
  }
  setRules(e) {
    this.setState({
      Rules: e,
    });
  }
  setTournamentPayout(e) {
    this.setState({
      tournamentPayout: e.target.value,
    });
  }
  setPrize(e) {
    this.setState({
      Prize: e,
    });
  }
  setTournamentMode(e) {
    this.setState({
      TournamentMode: e,
    });
  }
  setGameMode(e) {
    this.setState({
      GameMode: e,
    });
  }
  setBetAmount(e) {
    this.setState({
      BetAmount: e,
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
  setStartTimePeriod(e) {
    this.setState({
      StartTimePeriod: e,
    });
  }
  setStartTime(e) {
    this.setState({
      StartTime: e.target.value,
    });
  }
  handleCreateTournament(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
      loading: true,
    });
    var _Start = new Date(this.state.StartTime).valueOf();
    userService
      .createTournament(
        this.state.GName.value.split(" - ")[0],
        this.state.GName.value.split(" - ")[1],
        "Tournament",

        this.state.BetAmount,
        this.state.StartTimePeriod.value,
        _Start,
        // "1",
        this.state.TournamentMode.value,
        this.state.tournamentPayout,

        this.state.inSign.value,
        this.state.outSign.value,
        this.state.outSign.value,
        this.state.Prize,

        this.state.Rules
      )
      .then(
        (response) => {
          if (response.data == "Tournament event created.") {
            Swal.fire("", "Data saved successfully.", "success").then(() => {
              this.props.history.push("/panel/dashboard");
            });
          } else {
            this.setState({
              successful: false,
              message: "",
              submit: false,
              loading: false,
            });
          }
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage,
            submit: false,
            loading: false,
          });
        }
      );
  }

  render() {
    var { currentUser } = this.state;
    var timestring1 = new Date();
    var startdate = moment(timestring1).format();

    startdate = moment(startdate)
      .add(this.state.StartTimePeriod.value, "minutes")
      .format();
    var _Start = new Date(this.state.StartTime).valueOf();
    var item = {
      commission: 90,
      id: 33,
      gameName: this.state.GName.value.split(" - ")[0],
      gameConsole: this.state.GName.value.split(" - ")[1],
      gameMode: "Tournament",
      status: "Pending",
      totalPlayer: this.state.TournamentMode.value,
      eventLevel: 1,
      nextLevel: 1,
      timeMinute: this.state.AvalableFor.value * 1000 * 60,
      prize: this.state.Prize
        ? this.state.Prize
        : (this.state.BetAmount * this.state.TournamentMode.value * 90) / 100,
      tournamentPayout: null,
      amount: this.state.BetAmount,
      winner: null,
      inSign: this.state.inSign.value,
      outSign: this.state.outSign.value,
      rules: null,
      expire: startdate,
      startTime: _Start,
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
        <Header as="h3">Create a Tournament</Header>
        <Row style={{ marginRight: 0 }}>
          <Col md="8" sm="6">
            <Form
              onSubmit={this.handleCreateTournament}
              ref={(c) => {
                this.form = c;
              }}
            >
              <div className="form-group">
                <label>Game</label>
                <Select
                  className="react-select default"
                  classNamePrefix="react-select"
                  name="GName"
                  value={this.state.GName}
                  onChange={this.setGameName}
                  options={getBlockGames("Tournament")}
                  placeholder=""
                />
              </div>
              <div className="form-group">
                <label>Bet</label>
                <NumericInput
                  min={1}
                  step={1}
                  max={1000}
                  className="form-control"
                  name="BetAmount"
                  value={this.state.BetAmount}
                  onChange={this.setBetAmount}
                />
              </div>
              <div className="form-group">
                <label>InSign</label>
                <Select
                  className="react-select default"
                  classNamePrefix="react-select"
                  name="InSign"
                  value={this.state.inSign}
                  onChange={this.setInSign}
                  options={[
                    { value: "Dollar", label: "Dollar" },
                    { value: "Point", label: "Point" },
                  ]}
                  placeholder=""
                  isSearchable={false}
                />
              </div>
              <div className="form-group">
                <label>Mode</label>
                <Select
                  className="react-select default"
                  classNamePrefix="react-select"
                  name="TournamentMode"
                  value={this.state.TournamentMode}
                  onChange={this.setTournamentMode}
                  options={[
                    { value: "4", label: "4 Players" },
                    { value: "8", label: "8 Players" },
                    { value: "16", label: "16 Players" },
                    { value: "32", label: "32 Players" },
                  ]}
                  placeholder=""
                  isSearchable={false}
                />
              </div>
              <div className="form-group">
                <label>Start Time {this.state.StartTime}</label>
                <Input
                  type="datetime-local"
                  className="form-control"
                  name="StartTime"
                  value={this.state.StartTime}
                  onChange={this.setStartTime}
                />
              </div>
              <div className="form-group">
                <label> Time Period</label>

                <Select
                  className="react-select default"
                  classNamePrefix="react-select"
                  name="StartTime"
                  value={this.state.StartTimePeriod}
                  onChange={this.setStartTimePeriod}
                  options={[
                    { value: "3", label: "15 Minutes" },
                    { value: "30", label: "30 Minutes" },
                    { value: "60", label: "21Hour" },
                    { value: "120", label: "2 Hours" },
                  ]}
                  placeholder=""
                  isSearchable={false}
                />
              </div>
              <div className="form-group">
                <label>Prize</label>
                <NumericInput
                  min={1}
                  step={1}
                  max={1000}
                  className="form-control"
                  name="BetAmount"
                  value={this.state.Prize}
                  onChange={this.setPrize}
                />
              </div>
              <div className="form-group">
                <label>OutSign</label>
                <Select
                  className="react-select default"
                  classNamePrefix="react-select"
                  name="OutSign"
                  value={this.state.outSign}
                  onChange={this.setOutSign}
                  options={[
                    { value: "Dollar", label: "Dollar" },
                    { value: "Point", label: "Point" },
                  ]}
                  placeholder=""
                  isSearchable={false}
                />
              </div>
              <div className="form-group">
                <label>PayOut</label>
                <Input
                  type="textarea"
                  className="form-control"
                  name="name"
                  value={this.state.tournamentPayout}
                  onChange={this.setTournamentPayout}
                />
              </div>
              <div className="form-group">
                <label>Rules</label>
                <Input
                  type="textarea"
                  className="form-control"
                  name="name"
                  value={this.state.Rules}
                  onChange={this.setRules}
                />
              </div>
              {this.state.message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {this.state.message}
                  </div>
                </div>
              )}

              <div className="form-group">
                <button
                  className="btn btn-primary btn-wd "
                  disabled={this.state.loading}
                >
                  {this.state.loading && (
                    <span className="spinner-border spinner-border-sm  fa-wd"></span>
                  )}
                  <span> Create Tournament</span>
                </button>
              </div>
            </Form>
          </Col>
          <Col md="4" sm="6">
            {this.state.GName?.value?.indexOf(" - ") > -1 && (
              <>
                <Card.Group
                  className="fours one"
                  style={{ margin: "20px auto" }}
                >
                  <MatchCard item={item} />
                </Card.Group>
              </>
            )}
          </Col>
        </Row>
      </>
    );
  }
}

export default withRouter(AddTour);
