import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from "react-select";
import { IMaskInput } from "react-imask";
import {  withRouter} from 'react-router-dom';
import $ from "jquery";
import AuthService from "services/auth.service";
import userService from "services/user.service";
import NumericInput from 'react-numeric-input';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Games from "server/Games";
import Avatar from "react-avatar";
import {
  Badge,
  Alert,
  Button,
  Card,
  InputGroup,
  Navbar,
  Nav,
  OverlayTrigger,
  Table,
  Tooltip,
  Container,
  Row,
  ListGroup,
  Col,
  TabContent,
  TabPane,
  Tab,
  
  } from "react-bootstrap";
  import Countdown from "react-countdown";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faPlaystation, faXbox } from "@fortawesome/free-brands-svg-icons";
  import { faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import {
  setAvatar,
  getColor,
  getIcon,
  renderer,
  printMatchBlock,
  isJson,
  getModalTag,
  getGameTag,
  getMatchTitle,
  haveGameTag,
  printRequired,
  handleTagForm,
  haveAdmin,
  date_edit
  
} from "components/include";
  const required = (value,props) => {
      
      if(typeof props.passReadyprp !== "undefined"){
        if (!value && props.passReadyprp) {
            return (
              <div className="alert alert-danger" role="alert">
                This field is required!
              </div>
            );
            
          }
       
      }else{
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
      
    }
}
  };
  
const getBlockGames = (filtermode) => {
  var gamemap = [];
  Games.games.map((item, i) => {
    
    item.gameconsole.map((consoles, j) => {
      if(filtermode == 'Match'){
        if (item.haveMatch == true
          ) {
            gamemap.push({
              value: item.name + " - " + consoles.consolename,
              label: item.name + " - " + consoles.consolename,
            });
          }
      }else if(filtermode == 'Tournament'){
        if (item.haveTournament == true
          ) {
            gamemap.push({
              value: item.name + " - " + consoles.consolename,
              label: item.name + " - " + consoles.consolename,
            });
          }
      }else if(filtermode == 'League'){
        if (item.haveLeague == true
          ) {
            gamemap.push({
              value: item.name + " - " + consoles.consolename,
              label: item.name + " - " + consoles.consolename,
            });
          }
      }else{
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
const getBlockTournament = (betval) => {
  var tourmap = [
    { value: "4", label: "4 Players - Prize: $" + (4 * betval * 90) / 100 },
    { value: "8", label: "8 Players - Prize: $" + (8 * betval * 90) / 100 },
    { value: "16", label: "16 Players - Prize: $" + (16 * betval * 90) / 100 },
    { value: "32", label: "32 Players - Prize: $" + (32 * betval * 90) / 100 },
  ];

  return tourmap;
};
const getBlockTournamentVal = (betval, tourmode) => {
  var tourmap = {
    value: tourmode,
    label: tourmode + " Players - Prize: $" + (tourmode * betval * 90) / 100,
  };

  return tourmap;
};
const getBlockGamesVal = (filtermode) => {
  var gamemap = [];
  Games.games.slice(0, 5).map((item, i) => {
    item.gameconsole.slice(0, 5).map((consoles, j) => {
      if (
        "All" == filtermode ||
        consoles.consolename == filtermode ||
        (consoles.consolename != "Mobile" && filtermode == "NoMobile")
      ) {
        if (j == 0) {
          gamemap.push({
            value: item.name + " - " + consoles.consolename,
            label: item.name + " - " + consoles.consolename,
          });
        }
      }
    });
  });

  return gamemap[0];
};
const getBlockGameModes = (filtermode) => {
  var gamemaplocal = [];

  if (filtermode != "") {
    var filter = filtermode.value.split(" - ")[0];

    Games.games.map((item, i) => {
      if (item.name == filter) {
        item.modes.map((mode, j) => {
          gamemaplocal.push({
            value: mode.modename,
            label: mode.modename,
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
    var filter = filtermode.value.split(" - ")[0];

    Games.games.map((item, i) => {
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

const MySwal = withReactContent(Swal);
var nowS  = new Date()
var nowE  = new Date()
class AddMatch extends Component {
  constructor(props) {
    super(props);
    this.handleCreateMatch = this.handleCreateMatch.bind(this);
    this.setGameName = this.setGameName.bind(this);
    this.setGameMode = this.setGameMode.bind(this);
   
    this.setBetAmount = this.setBetAmount.bind(this);
    
    this.setAvalableFor = this.setAvalableFor.bind(this);
    this.setSelectedTag = this.setSelectedTag.bind(this);
    
    
    this.setInSign = this.setInSign.bind(this);
    
    

    this.state = {
      GName: { value: "8Pool - Mobile", label: "8Pool - Mobile" },
      GameMode: { value: "Duel", label: "Duel" },
     
      currentUser: this.props.token,
      gamemaplocal: [],
      BetAmount: 10,
      Prize: '',
      AvalableFor: { value: "60", label: "1 Hour" },
      StartTime: { value: "60", label: "1 Hour Later" },
      loading: false,
      submit: false,
      GameTag: "",
      message: "",
      inSign:{ value: "Dollar", label: "Dollar" },
      gamePlatform:'',
      gameName:'',
    };
  }
  
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
  
  setSelectedTag(e,p,currentUser) {
    if(p=='PS4'||e=='PS4'){e='PSN';p='PSN';}
  if(p=='PS5'||e=='PS5'){e='PSN';p='PSN';}
  if(p=='XBOX'||e=='XBOX'){e='XBOX';p='XBOX';}
    this.setState({
      gameName: e.replace(' Warzone',''),
      gamePlatform: p
    });
    handleTagForm(e.replace(' Warzone',''),p,currentUser)
    
  }
  setUserTag(e) {
    this.setState({
      currentUserTag: e
    });
    
  }
  
  handleCreateMatch(e) {
    e.preventDefault();
    

    this.setState({
      message: "",
      successful: false,
      loading:true,
        
      
     
    });
   

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
     
      
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
              if (response.indexOf("successful") > -1) {
                Swal.fire("", "Data saved successfully.", "success").then(
                  (result) => {
                    this.props.history.push("/panel/dashboard");
                  }
                );
              }else{
                this.setState({
                  successful: false,
                  message: "",
                  submit: false,
                  loading: false,
                });
                if (response=='balanceError'){
                var resMessage = "To enter this event you need to have more balance!"
        Swal.fire({
          title: 'Error!',
          text:resMessage,
          icon:"error",
          showCancelButton: true,
          confirmButtonText: `Go to Cashier`,
          canceleButtonText: `Back`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.props.history.push("/panel/cashier");
          }
        })
              }else if (response=='tagError'){
               
                this.setSelectedTag(this.state.GName.value.split(" - ")[0],this.state.GName.value.split(" - ")[1],this.state.currentUser)
              }
            }
            },
            (error) => {
              var response  = error.data
              this.setState({
                successful: false,
                message: "",
                submit: false,
                loading: false,
              });
              if (response=='balanceError'){
              var resMessage = "To enter this event you need to have more balance!"
      Swal.fire({
        title: 'Error!',
        text:resMessage,
        icon:"error",
        showCancelButton: true,
        confirmButtonText: `Go to Cashier`,
        canceleButtonText: `Back`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.props.history.push("/panel/cashier");
        }
      })
            }else if (response=='tagError'){
              this.setSelectedTag(this.state.gameName,this.state.gameConsole)
              this.setSelectedTag(this.state.GName.value.split(" - ")[0],this.state.GName.value.split(" - ")[1])
            }else{
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
            }
          );
      
    } else {
      this.setState({
        successful: false,
                message: "",
                submit: false,
                loading: false,
      });

     
    }
  }
  
  render() {
    var { currentUser } = this.state;
    var _mode = " 1 v 1 ";
    var _color = "#404040";
    var item = {
      "commission": 90,
      "id": 33,
      "gameName": this.state.GName.value.split(" - ")[0],
      "gameConsole": this.state.GName.value.split(" - ")[1],
      "gameMode": this.state.GameMode.value,
      "status": "Pending",
      "totalPlayer": 2,
      "eventLevel": 1,
      "nextLevel": 1,
      "timeMinute": this.state.AvalableFor.value * 1000 * 60,
      "prize": this.state.BetAmount * 2*90/100,
      "tournamentPayout": null,
      "amount": this.state.BetAmount,
      "winner": null,
      "inSign": this.state.inSign.value,
      "outSign": this.state.inSign.value,
      "rules": null,
      "expire": date_edit(Date.now() + this.state.AvalableFor.value * 1000 * 60),
      "startTime": "2021-11-01T20:34:39.000+00:00",
      "finished": "2021-11-01T20:34:39.000+00:00",
      "players": [
        {
          "id": 86,
          "username": currentUser.username,
          "ranking": null,
          "totalScore": null,
          "winAmount": null,
          "gamePlatform": "Mobile",
          "nickName": "salar",
          "tagId": "57656",
          "callOfDuties": []
        }
      ],
      "matchTables": [{
        "id": 172,
        "winner": null,
        "status": "Pending",
        "level": null,
        "matchCode": null,
        "startTime": date_edit(Date.now()) + this.state.AvalableFor.value * 1000 * 60,
        "matchPlayers": [{
            "id": 371,
            "username": currentUser.username,
            "ready": false
        }],
        "matchChats": []
    }]
      
    }
    return (
      <>
      <Row>
                    <Col sm="7" md="8">
     <Form
                        onSubmit={this.handleCreateMatch}
                        ref={(c) => {
                          this.form = c;
                        }}
                      >
                        <Card className="card-plain" style={{ margin: -10 }}>
                          <Card.Header>
                            <Card.Title>Create 1v1 Match</Card.Title>
                          </Card.Header>
                          <Card.Body>
                            <div className="form-group">
                              <label>Game</label>
                              <Select
                                className="react-select default GameName"
                                classNamePrefix="react-select"
                                name="GameName"
                                value={this.state.GName}
                                onChange={this.setGameName}
                                options={getBlockGames("Match")}
                                placeholder=""
                              />
                               <Input
                                        type="hidden"
                                        
                                        value={this.state.GName.value}
                                       
                                        
                                        validations={[required]}
                                      />
                             
                            </div>
                            <div className="form-group">
                              <label>Mode</label>
                              <Select
                                className="react-select default GameMode"
                                classNamePrefix="react-select"
                                name="GameMode"
                                value={this.state.GameMode}
                                onChange={this.setGameMode}
                                options={getBlockGameModes(this.state.GName)}
                                placeholder=""
                                isSearchable={false}
                              />
                              <Input
                                        type="hidden"
                                        
                                        value={this.state.GameMode.value}
                                       
                                        
                                        validations={[required]}
                                      />
                            </div>
                            <div className="form-group">
                              <label>Bet</label>
                              <NumericInput min={1} step={1} max={1000}  maxLength="4" className="form-control BetAmount"
                    name="BetAmount"
                                value={this.state.BetAmount}
                                onChange={this.setBetAmount}/>
                              
                              
                            
                              <Input
                                        type="hidden"
                                        
                                        value={this.state.BetAmount}
                                       
                                        
                                        validations={[required]}
                                      />
                            </div>
                            <div className="form-group">
                              <label>Currency</label>
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
                              <label>Avalable for</label>
                              <Select
                                className="react-select default AvalableFor"
                                classNamePrefix="react-select"
                                name="AvalableFor"
                                value={this.state.AvalableFor}
                                onChange={this.setAvalableFor}
                                options={[
                                  { value: "30", label: "30 Minutes" },
                                  { value: "60", label: "1 Hour" },
                                  { value: "360", label: "6 Hours" },
                                  { value: "1440", label: "1 Day" },
                                ]}
                                placeholder=""
                                isSearchable={false}
                              />
                             
                            </div>

                            {this.state.message && (
                              <div className="form-group">
                                <div
                                  className="alert alert-danger"
                                  role="alert"
                                >
                                  {this.state.message}
                                </div>
                              </div>
                            )}
                          </Card.Body>
                          <Card.Footer>
                            <div className="form-group">
                              <button
                                className="btn btn-primary btn-wd "
                                disabled={this.state.loading}
                              >
                                {this.state.loading && (
                                  <span className="spinner-border spinner-border-sm  fa-wd"></span>
                                )}
                                <span> Create Match</span>
                              </button>
                            </div>
                          </Card.Footer>
                        </Card>
                        <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
                      </Form>
                      </Col>
                    <Col sm="5" md="4">
                    <Row className="ui one cards">
                      {(this.state.GName.value.indexOf(' - ') > -1) && (
                        <>
                        {printMatchBlock(item)}
                        
                       
                      </>
                      )}
                      </Row>
                    </Col>
                  </Row>
        </>
    );
  }
}

export default withRouter(AddMatch) ;