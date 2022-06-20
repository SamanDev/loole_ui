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

import Tracking from "components/tracking.component";
import {
  Button,
  Label,
  Divider,
  Segment,
  Header,
  List,
  Message,
  Card,
  Grid,
} from "semantic-ui-react";
import {
  handleTagForm,
  date_edit,
  date_edit_dec,
  editDateTime,
  isJson,
} from "components/include";

const getModeGames = (game) => {
  var gamemap = [];
  try {
    Games.games.map((gameitem) => {
      if (gameitem.name == game.value.split(" - ")[0]) {
        var _game = gameitem;
        _game?.modes.map((item) => {
          gamemap.push({
            value: item.name + " - Top Average",
            label: item.name + " - Top Average",
            track: item.track,
            reg: item.reg,
          });
          gamemap.push({
            value: item.name + " - First Matches",
            label: item.name + " - First Matches",
            track: item.track,
            reg: item.reg,
          });
        });
      }
    });
  } catch (e) {}

  return gamemap;
};
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
        if (
          item.haveLeague == true &&
          item.name != "BrawlStars" &&
          item.name != "RocketLeague" &&
          item.name != "Brwalhalla"
        ) {
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

var moment = require("moment");
var now = new Date();

var start = moment(now).format();

var startUtc = date_edit_dec(start);
startUtc = moment(startUtc).format("YYYY-MM-DDTHH:mm");
var startFrmat = startUtc;

var end = moment(start).add(30, "minutes");

var endFormat = moment(end).format("YYYY-MM-DDTHH:mm");
function editTime(date) {
  var end = moment(date).add(7, "hours");
  end = moment(end).utc().format();
  return end;
}

function getRules(mode, minMatch, track, reg) {
  var TrackMode = "Average of Top " + minMatch + "";
  if (mode.value.split(" - ")[1] == "First Matches") {
    TrackMode = "Average of First " + minMatch + "";
  }
  var _pointing = [];
  var _reg = [
    { text: "Mode Track", weight: "" + mode.value.split(" - ")[0] + "" },
    { text: "Min Match", weight: "" + minMatch + "" },
  ];
  track.map((gameitem, i) => {
    _pointing.push({
      text: gameitem.name,
      weight: " " + gameitem.sign + " " + gameitem.value,
    });
  });
  reg.map((gameitem, i) => {
    _reg.push({
      text: gameitem.name,
      weight: gameitem.value,
    });
  });
  _reg.push({ text: "Total Score", weight: TrackMode });
  var _rules = {
    RuleTrack: _reg,

    pointTrack: _pointing,
  };

  return JSON.stringify(_rules);
}

class AddTour extends Component {
  constructor(props) {
    super(props);
    this.handleCreateTournament = this.handleCreateTournament.bind(this);
    this.setGameName = this.setGameName.bind(this);

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

    this.setStartTimeLeague = this.setStartTimeLeague.bind(this);
    this.setEndTimeLeague = this.setEndTimeLeague.bind(this);
    this.setPrize = this.setPrize.bind(this);
    this.setRMinMatch = this.setRMinMatch.bind(this);
    this.setRMode = this.setRMode.bind(this);
    this.setTimeMinute = this.setTimeMinute.bind(this);
    this.setRepeatMinute = this.setRepeatMinute.bind(this);

    this.findStateId = this.findStateId.bind(this);
    this.onUpdateItem = this.onUpdateItem.bind(this);

    this.state = {
      GName: { value: "", label: "" },

      iteem: {},
      currentUser: this.props.token,
      gamemaplocal: [],
      BetAmount: 10,
      Prize: 0,
      repeatMinute: 0,
      timeMinute: 10,
      AvalableFor: { value: "60", label: "1 Hour" },
      TotalPlayer: 200,
      StartTimeLeague: startFrmat,
      timePlusEnd: 30,
      timePlusStr: { value: "minutes", label: "Minutes" },
      EndTimeLeague: endFormat,
      loading: false,
      submit: false,
      track: [],
      reg: [],
      GameTag: "",
      message: "",
      Rules: "",
      RulesJson: {},
      inSign: { value: "Point", label: "Point" },
      outSign: { value: "Point", label: "Point" },
      tournamentPayout:
        "2,100.00@5,70.00,30.00@10,50.00,30.00,20.00@20,40.00,30.00,20.00,10.00@50,35.00,25.00,15.00,10.00,8.00,7.00@70,30.00,20.00,14.00,10.00,8.00,7.00,6.00,5.00@100,29.00,18.00,12.50,10.00,8.00,6.50,5.50,4.50,3.50,2.50@200,28.00,17.50,11.50,8.50,7.00,5.50,4.50,3.50,2.50,1.50,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00,1.00@500,27.00,16.50,10.50,8.00,6.25,4.75,3.75,2.75,1.75,1.25,0.75,0.75,0.75,0.75,0.75,0.75,0.75,0.75,0.75,0.75,0.50,0.50,0.50,0.50,0.50,0.50,0.50,0.50,0.50,0.50,0.50,0.50,0.50,0.50,0.50,0.50,0.50,0.50,0.50,0.50",
      gamePlatform: "",
      gameName: "",
      rMinMatch: 10,
      rMode: {},
    };
  }
  componentDidMount() {
    var now = new Date();
    var start = moment(now).format();
    var startUtc = date_edit_dec(start);
    var startUtc = moment(startUtc).add(30, "minutes");
    startUtc = moment(startUtc).format("YYYY-MM-DDTHH:mm");
    // startUtc = moment.parseZone(startUtc).utc().format();
    var startFrmat = startUtc;
    this.setState({
      StartTimeLeague: startFrmat,
    });
    var end = moment(startFrmat).add(
      this.state.timePlusEnd,
      this.state.timePlusStr.value
    );
    end = moment(end).format("YYYY-MM-DDTHH:mm");
    var endFormat = end;
    this.setState({
      EndTimeLeague: endFormat,
    });
  }

  findStateId = (st, val) => {
    return st.filter(function (v) {
      return v.name === val;
    })[0].value;
  };
  onUpdateItem = (state, key, val, name) => {
    if (this.findStateId(state, key) != val) {
      const list = state.map((item) => {
        if (item.name === key) {
          item.value = val;
        }
        return item;
      });
      if (name == "track") {
        this.setState({
          track: list,
        });
      }
      if (name == "reg") {
        this.setState({
          reg: list,
        });
      }
    }
  };
  setGameName(e) {
    var gameData = getModeGames(e);

    this.setState({
      rMode: gameData[0],
      track: JSON.parse(JSON.stringify(gameData[0].track)),
      reg: JSON.parse(JSON.stringify(gameData[0].reg)),
      GName: e,
    });
  }
  setRMode(e) {
    this.setState({
      rMode: e,
      track: JSON.parse(JSON.stringify(e.track)),
      reg: JSON.parse(JSON.stringify(e.reg)),
    });
  }
  setInSign(e) {
    this.setState({
      inSign: e,
    });
  }
  setPlusSign(e) {
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
      this.state.rMode,
      this.state.rMinMatch,
      this.state.track,
      this.state.reg
    );
    this.setState({
      Rules: _R,
      RulesJson: JSON.parse(_R),
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
  setRepeatMinute(e) {
    this.setState({
      repeatMinute: e,
    });
  }
  setTimeMinute(e) {
    this.setState({
      timeMinute: e,
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

  setBetAmount(e) {
    this.setState({
      BetAmount: e,
    });
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
    var now = new Date(this.state.StartTimeLeague);

    var end = moment(now).add(
      this.state.timePlusEnd,
      this.state.timePlusStr.value
    );

    var endFormat = moment(end).format("YYYY-MM-DDTHH:mm");
    this.setState({
      EndTimeLeague: endFormat,
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
    //var a = editTime(moment(this.state.StartTimeLeague).format());
    var a = moment(this.state.StartTimeLeague).utc().format();
    //var b = editTime(moment(this.state.EndTimeLeague).format());
    var b = moment(this.state.EndTimeLeague).utc().format();

    //return false;
    userService
      .createLeague(
        this.state.GName.value.split(" - ")[0],
        this.state.GName.value.split(" - ")[1],
        "League",
        this.state.BetAmount,
        a,
        b,
        this.state.TotalPlayer,
        this.state.tournamentPayout,
        this.state.timeMinute,
        this.state.inSign.value,
        this.state.outSign.value,
        this.state.outSign.value,
        this.state.Rules,
        this.state.Prize,
        this.state.repeatMinute
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

    var item = {
      commission: 90,
      id: 33,
      gameName: this.state.GName.value.split(" - ")[0],
      gameConsole: this.state.GName.value.split(" - ")[1],
      gameMode: "League",
      status: "Pending",
      totalPlayer: this.state.TotalPlayer,
      eventLevel: 1,
      nextLevel: 1,
      timeMinute: 10,
      prize: this.state.Prize
        ? this.state.Prize
        : (this.state.BetAmount * this.state.TotalPlayer * 90) / 100,
      tournamentPayout: null,
      amount: this.state.BetAmount,
      winner: null,
      inSign: this.state.inSign.value,
      outSign: this.state.outSign.value,
      rules: null,
      expire: moment(this.state.EndTimeLeague).format(),
      startTime: moment(this.state.StartTimeLeague)
        .local()
        .format("YYYY-MM-DD HH:mm:ss"),
      finished: moment(this.state.EndTimeLeague).format(),
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
        <Header as="h3">Create a League</Header>
        <Row style={{ marginRight: 0 }}>
          <Col md="8" sm="6">
            <Form
              onSubmit={this.handleCreateTournament}
              ref={(c) => {
                this.form = c;
              }}
            >
              <Segment secondary>
                <div className="form-group hide2">
                  <label>Game</label>
                  <Select
                    className="react-select default"
                    classNamePrefix="react-select"
                    name="GName"
                    value={this.state.GName}
                    onChange={this.setGameName}
                    options={getBlockGames("League")}
                    placeholder=""
                    onBlur={this.setRules}
                  />
                </div>
                {this.state.GName.value != "" && (
                  <Grid columns={3} relaxed>
                    <Grid.Row style={{ marginRight: 0, marginLeft: 0 }}>
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
                            max={500}
                            className="form-control"
                            name="TotalPlayer"
                            value={this.state.TotalPlayer}
                            onChange={this.setTotalPlayer}
                          />
                        </div>
                      </Grid.Column>
                    </Grid.Row>

                    <Grid.Row style={{ marginRight: 0, marginLeft: 0 }}>
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
                        <small>ServerTime: {moment(now).utc().format()}</small>
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
                        <small>
                          Start:{" "}
                          {moment(this.state.StartTimeLeague).utc().format()}
                        </small>
                        <br />
                        <small>
                          Send:{" "}
                          {editTime(
                            moment(this.state.StartTimeLeague).format()
                          )}
                        </small>
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
                    <Grid.Row style={{ marginRight: 0, marginLeft: 0 }}>
                      <Grid.Column>
                        <div className="form-group">
                          <label>End Time</label>
                          <Input
                            type="datetime-local"
                            className="form-control"
                            name="EndTime"
                            disabled="disabled"
                            value={this.state.EndTimeLeague}
                            onChange={this.setEndTimeLeague}
                            onBlur={this.updateEnd}
                          />
                        </div>
                        <small>
                          EndTime:{" "}
                          {moment(this.state.EndTimeLeague).utc().format()}
                        </small>
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
                    <Grid.Row style={{ marginRight: 0, marginLeft: 0 }}>
                      <Grid.Column>
                        <div className="form-group">
                          <label>Battle Mode</label>
                          <Select
                            className="react-select default"
                            classNamePrefix="react-select"
                            name="InSign"
                            value={this.state.rMode}
                            onChange={this.setRMode}
                            options={getModeGames(this.state.GName)}
                            placeholder=""
                            isSearchable={false}
                            onBlur={this.setRules}
                          />
                        </div>
                      </Grid.Column>
                      {this.state.track.map((gameitem, i) => {
                        if (gameitem.value != 0) {
                          return (
                            <Grid.Column key={i}>
                              <div className="form-group">
                                <label>{gameitem.name}</label>
                                <NumericInput
                                  min={1}
                                  className="form-control"
                                  value={gameitem.value}
                                  onChange={(evt) =>
                                    this.onUpdateItem(
                                      this.state.track,
                                      gameitem.name,
                                      evt,
                                      "track"
                                    )
                                  }
                                  onBlur={this.setRules}
                                />
                              </div>
                            </Grid.Column>
                          );
                        }
                      })}
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
                          <label>Count Minutes</label>
                          <NumericInput
                            min={5}
                            step={1}
                            max={120}
                            className="form-control"
                            value={this.state.timeMinute}
                            onChange={this.setTimeMinute}
                          />
                        </div>
                      </Grid.Column>
                      <Grid.Column>
                        <div className="form-group">
                          <label>Repeat Minutes</label>
                          <NumericInput
                            className="form-control"
                            value={this.state.repeatMinute}
                            onChange={this.setRepeatMinute}
                          />
                        </div>
                      </Grid.Column>
                      {this.state.reg.map((gameitem, i) => {
                        return (
                          <Grid.Column key={i}>
                            <div className="form-group">
                              <label>{gameitem.name}</label>
                              <NumericInput
                                min={1}
                                className="form-control"
                                value={gameitem.value}
                                onChange={(evt) =>
                                  this.onUpdateItem(
                                    this.state.reg,
                                    gameitem.name,
                                    evt,
                                    "reg"
                                  )
                                }
                                onBlur={this.setRules}
                              />
                            </div>
                          </Grid.Column>
                        );
                      })}
                    </Grid.Row>
                  </Grid>
                )}
              </Segment>
              {this.state.GName.value != "" && (
                <Segment secondary>
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
                </Segment>
              )}
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
            {isJson(this.state.Rules) && (
              <Tracking item={item} rules={this.state.Rules} />
            )}
          </Col>
        </Row>
      </>
    );
  }
}

export default withRouter(AddTour);
