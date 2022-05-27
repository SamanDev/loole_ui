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
import { Header, Card, Grid, Divider } from "semantic-ui-react";
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
var nowE = moment(nowS).add(1, "days");

var stdate = moment(nowE).format("YYYY-MM-DDTHH:00");

var nowS2 = new Date();
var nowE2 = moment(nowS2).add(3, "days");

var endate = moment(nowE2).format("YYYY-MM-DDTHH:00");
var _StartTime = new Date(stdate).valueOf();

function getRules(minMatch, MinCup, MaxCup, hp, tc, w3, w2, w1, drow) {
  var _rules = {
    RuleTrack: [
      { text: "Mode Track", weight: "Battle" },
      { text: "Min Match", weight: "" + minMatch + "" },
      { text: "Min Trophy", weight: "" + MinCup + "" },
      { text: "Max Trophy", weight: "" + MaxCup + "" },
      { text: "Total Point", weight: "Average of Top " + minMatch + "" },
    ],
    pointTrack: [
      { text: "HP", weight: " x " + hp + "" },
      { text: "TrophyChange", weight: " x " + tc + "" },
      { text: "3 - 0 Win", weight: " + " + w3 + "" },
      { text: "+2 Win", weight: " + " + w2 + "" },
      { text: "+1 Win", weight: " + " + w1 + "" },
      { text: "Drew", weight: " + " + drow + "" },
    ],
  };
  return JSON.stringify(_rules);
}

class AddTour extends Component {
  constructor(props) {
    super(props);
    this.handleCreateTournament = this.handleCreateTournament.bind(this);
    this.setGameName = this.setGameName.bind(this);
    this.setGameMode = this.setGameMode.bind(this);
    this.setTotalPlayer = this.setTotalPlayer.bind(this);
    this.setTimePlusEnd = this.setTimePlusEnd.bind(this);
    this.updateEnd = this.updateEnd.bind(this);
    this.setBetAmount = this.setBetAmount.bind(this);

    this.setAvalableFor = this.setAvalableFor.bind(this);
    this.setSelectedTag = this.setSelectedTag.bind(this);
    this.setInSign = this.setInSign.bind(this);
    this.setPlusSign = this.setPlusSign.bind(this);
    this.setOutSign = this.setOutSign.bind(this);
    this.setTournamentPayout = this.setTournamentPayout.bind(this);
    this.setRules = this.setRules.bind(this);
    this.setTournamentMode = this.setTournamentMode.bind(this);
    this.getBlockTournamentVal = this.getBlockTournamentVal.bind(this);
    this.setStartTimeLeague = this.setStartTimeLeague.bind(this);
    this.setEndTimeLeague = this.setEndTimeLeague.bind(this);
    this.setPrize = this.setPrize.bind(this);
    this.setRMinMatch = this.setRMinMatch.bind(this);
    this.setRMinCup = this.setRMinCup.bind(this);
    this.setRMaxCup = this.setRMaxCup.bind(this);
    this.setRHP = this.setRHP.bind(this);
    this.setRTC = this.setRTC.bind(this);
    this.setRW3 = this.setRW3.bind(this);
    this.setRW2 = this.setRW2.bind(this);
    this.setRW1 = this.setRW1.bind(this);
    this.setRDrow = this.setRDrow.bind(this);

    this.state = {
      GName: { value: "ClashRoyale - Mobile", label: "ClashRoyale - Mobile" },
      GameMode: { value: "Duel", label: "Duel" },
      TournamentMode: { value: "4", label: "4 Players" },

      currentUser: this.props.token,
      gamemaplocal: [],
      BetAmount: 10,
      Prize: "",
      AvalableFor: { value: "60", label: "1 Hour" },
      TotalPlayer: 200,
      StartTimeLeague: stdate,
      timePlusEnd: 30,
      timePlusStr: { value: "days", label: "Days" },
      EndTimeLeague: endate,
      loading: false,
      submit: false,
      GameTag: "",
      message: "",
      Rules: "",
      inSign: { value: "Dollar", label: "Dollar" },
      outSign: { value: "Dollar", label: "Dollar" },
      tournamentPayout:
        "2,100.00@5,70.00,30.00@10,50.00,30.00,20.00@20,40.00,30.00,20.00,10.00@50,35.00,25.00,15.00,10.00,8.00,7.00@70,30.00,20.00,14.00,10.00,8.00,7.00,6.00,5.00@100,29.00,18.00,12.50,10.00,8.00,6.50,5.50,4.50,3.50,2.50@200,28.00,17.50,11.50,8.50,7.00,5.50,4.50,3.50,2.50,1.50,1.00x10@400,27.00,16.50,10.50,8.00,6.25,4.75,3.75,2.75,1.75,1.25,0.75x10,0.50x20@700,26.00,15.50,10.00,7.50,6.00,4.50,3.50,2.50,1.50,1.00,0.65x10,0.40x20,0.25x30@1000,25.00,15.00,10.00,7.25,5.50,4.25,3.25,2.25,1.25,0.75,0.55x10,0.40x20,0.25x30,0.15x30",
      gamePlatform: "",
      gameName: "",
      rMinMatch: 2,
      rMinCup: 100,
      rMaxCup: 20000,
      rHP: 0.006,
      rTC: 2,
      rW3: 240,
      rW2: 60,
      rW1: 20,
      rDrow: 500,
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
  setPlusSign(e) {
    console.log(e);
    this.setState({
      timePlusStr: e,
    });
    this.updateEnd();
  }
  setOutSign(e) {
    this.setState({
      outSign: e,
    });
  }
  setRules(e) {
    var _R = getRules(
      this.state.rMinMatch,
      this.state.rMinCup,
      this.state.rMaxCup,
      this.state.rHP,
      this.state.rTC,
      this.state.rW3,
      this.state.rW2,
      this.state.rW1,
      this.state.rDrow
    );
    this.setState({
      Rules: _R,
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
  setRMinMatch(e) {
    this.setState({
      rMinMatch: e,
    });
  }
  setRMinCup(e) {
    this.setState({
      rMinCup: e,
    });
  }
  setRMaxCup(e) {
    this.setState({
      rMaxCup: e,
    });
  }
  setRHP(e) {
    this.setState({
      rHP: e,
    });
  }
  setRTC(e) {
    this.setState({
      rTC: e,
    });
  }
  setRW3(e) {
    this.setState({
      rW3: e,
    });
  }
  setRW2(e) {
    this.setState({
      rW2: e,
    });
  }
  setRW1(e) {
    this.setState({
      rW1: e,
    });
  }
  setRDrow(e) {
    this.setState({
      rDrow: e,
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
  setTotalPlayer(e) {
    this.setState({
      TotalPlayer: e,
    });
  }
  setTimePlusEnd(e) {
    this.setState({
      timePlusEnd: e,
    });

    this.updateEnd();
  }
  updateEnd() {
    var nowS = new Date(this.state.StartTimeLeague);
    var nowE = moment(nowS);

    var nowS2 = new Date(nowE);
    var nowE2 = moment(nowS2).add(
      this.state.timePlusEnd,
      this.state.timePlusStr.value
    );

    var endate = moment(nowE2).format("YYYY-MM-DDTHH:mm");
    this.setState({
      EndTimeLeague: endate,
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
  setStartTimeLeague(e) {
    this.setState({
      StartTimeLeague: e.target.value,
    });
    this.updateEnd();
    this.setRules();
  }
  setEndTimeLeague(e) {
    this.setState({
      EndTimeLeague: e.target.value,
    });
  }
  handleCreateTournament(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
      loading: true,
    });
    var sdate = new Date(this.state.StartTimeLeague).valueOf();
    var edate = new Date(this.state.EndTimeLeague).valueOf();

    userService
      .createLeague(
        this.state.GName.value.split(" - ")[0],
        this.state.GName.value.split(" - ")[1],
        "League",
        this.state.BetAmount,
        sdate,
        edate,
        this.state.TotalPlayer,
        this.state.tournamentPayout,

        this.state.inSign.value,
        this.state.outSign.value,
        this.state.outSign.value,
        this.state.Rules
      )

      .then(
        (response) => {
          if (response.data == "League event created.") {
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

    var nowE = moment(this.state.startTimeLeague);

    var stdate = moment(nowE).format("YYYY-MM-DDTHH:mm");

    var nowE2 = moment(this.state.EndTimeLeague);

    var endate = moment(nowE2).format("YYYY-MM-DDTHH:mm");
    var item = {
      commission: 90,
      id: 33,
      gameName: this.state.GName.value.split(" - ")[0],
      gameConsole: this.state.GName.value.split(" - ")[1],
      gameMode: "Leauge",
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
      expire: endate,
      startTime: stdate,
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
        <Header as="h3">Create a ClashRoyale League</Header>
        <Row style={{ marginRight: 0 }}>
          <Col md="8" sm="6">
            <Form
              onSubmit={this.handleCreateTournament}
              ref={(c) => {
                this.form = c;
              }}
            >
              <Grid columns={3} relaxed>
                <Grid.Row>
                  <Grid.Column>
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
                  </Grid.Column>
                  <Grid.Column>
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
                  </Grid.Column>
                  <Grid.Column>
                    <div className="form-group">
                      <label>Total Players</label>
                      <NumericInput
                        min={1}
                        step={1}
                        max={1000}
                        className="form-control"
                        name="TotalPlayer"
                        value={this.state.TotalPlayer}
                        onChange={this.setTotalPlayer}
                      />
                    </div>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column>
                    <div className="form-group">
                      <label>Start Time</label>
                      <Input
                        type="datetime-local"
                        className="form-control"
                        name="StartTime"
                        value={this.state.StartTimeLeague}
                        onChange={this.setStartTimeLeague}
                        onBlur={this.updateEnd}
                      />
                    </div>
                  </Grid.Column>
                  <Grid.Column>
                    <div className="form-group">
                      <label>Start PlusMode</label>
                      <Select
                        className="react-select default"
                        classNamePrefix="react-select"
                        name="InSign"
                        value={this.state.timePlusStr}
                        onChange={this.setPlusSign}
                        options={[
                          { value: "minutes", label: "Minutes" },
                          { value: "hours", label: "Hours" },
                          { value: "days", label: "Days" },
                          { value: "weeks", label: "Weeks" },
                          { value: "months", label: "Months" },
                        ]}
                        placeholder=""
                        isSearchable={false}
                        onBlur={this.updateEnd}
                      />
                    </div>
                  </Grid.Column>
                  <Grid.Column>
                    <div className="form-group">
                      <label>Start Plus</label>
                      <NumericInput
                        className="form-control"
                        name="Plus"
                        value={this.state.timePlusEnd}
                        onChange={this.setTimePlusEnd}
                        onBlur={this.updateEnd}
                      />
                    </div>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <div className="form-group">
                      <label>End Time</label>
                      <Input
                        type="datetime-local"
                        className="form-control"
                        name="EndTime"
                        value={this.state.EndTimeLeague}
                        onChange={this.setEndTimeLeague}
                      />
                    </div>
                  </Grid.Column>
                  <Grid.Column>
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
                  </Grid.Column>
                  <Grid.Column>
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
                  </Grid.Column>
                </Grid.Row>
                <Divider />
                <Grid.Row>
                  <Grid.Column>
                    <div className="form-group">
                      <label>Min Match</label>
                      <NumericInput
                        min={2}
                        step={1}
                        max={50}
                        className="form-control"
                        value={this.state.rMinMatch}
                        onChange={this.setRMinMatch}
                        onBlur={this.setRules}
                      />
                    </div>
                  </Grid.Column>
                  <Grid.Column>
                    <div className="form-group">
                      <label>Min Trophy</label>
                      <NumericInput
                        min={2}
                        step={1}
                        max={50000}
                        className="form-control"
                        value={this.state.rMinCup}
                        onChange={this.setRMinCup}
                        onBlur={this.setRules}
                      />
                    </div>
                  </Grid.Column>
                  <Grid.Column>
                    <div className="form-group">
                      <label>Max Trophy</label>
                      <NumericInput
                        min={2}
                        step={1}
                        max={50000}
                        className="form-control"
                        value={this.state.rMaxCup}
                        onChange={this.setRMaxCup}
                        onBlur={this.setRules}
                      />
                    </div>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <div className="form-group">
                      <label>HP</label>
                      <NumericInput
                        min={2}
                        step={1}
                        max={50}
                        className="form-control"
                        value={this.state.rHP}
                        onChange={this.setRHP}
                        onBlur={this.setRules}
                      />
                    </div>
                  </Grid.Column>
                  <Grid.Column>
                    <div className="form-group">
                      <label>Win +3</label>
                      <NumericInput
                        min={2}
                        step={1}
                        max={50000}
                        className="form-control"
                        value={this.state.rW3}
                        onChange={this.setRW3}
                        onBlur={this.setRules}
                      />
                    </div>
                  </Grid.Column>
                  <Grid.Column>
                    <div className="form-group">
                      <label>Win +2</label>
                      <NumericInput
                        min={2}
                        step={1}
                        max={50000}
                        className="form-control"
                        value={this.state.rW2}
                        onChange={this.setRW2}
                        onBlur={this.setRules}
                      />
                    </div>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <div className="form-group">
                      <label>Win +1</label>
                      <NumericInput
                        min={2}
                        step={1}
                        max={50}
                        className="form-control"
                        value={this.state.rW1}
                        onChange={this.setRW1}
                        onBlur={this.setRules}
                      />
                    </div>
                  </Grid.Column>
                  <Grid.Column>
                    <div className="form-group">
                      <label>Drow</label>
                      <NumericInput
                        min={2}
                        step={1}
                        max={50000}
                        className="form-control"
                        value={this.state.rDrow}
                        onChange={this.setRDrow}
                        onBlur={this.setRules}
                      />
                    </div>
                  </Grid.Column>
                </Grid.Row>
                <Divider />
              </Grid>
              <div className="form-group hide">
                <label>Game</label>
                <Select
                  className="react-select default"
                  classNamePrefix="react-select"
                  name="GName"
                  value={this.state.GName}
                  onChange={this.setGameName}
                  options={getBlockGames("League")}
                  placeholder=""
                />
              </div>

              <div className="form-group">
                <label>Rules</label>
                <Input
                  type="text"
                  className="form-control"
                  name="name"
                  value={this.state.Rules}
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
                  <span> Create League</span>
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
