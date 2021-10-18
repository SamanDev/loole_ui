import React, { Component } from "react";
import Select from "react-select";
import NotificationAlert from "react-notification-alert";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Avatar from "react-avatar";

import $ from "jquery";
import Countdown from "react-countdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaystation, faXbox } from "@fortawesome/free-brands-svg-icons";
import { faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AuthService from "services/auth.service";
import NumericInput from 'react-numeric-input';
import Active  from "components/active.component";
import userService from "services/user.service";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import {
  userState
} from 'atoms';
// react-bootstrap components
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
  
} from "components/include";
import Games from "server/Games";
import authService from "services/auth.service";
var allValid = true;
var reqnum = 0;
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
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

class CreateMatch extends Component {
  constructor(props) {
    super(props);
    this.handleCreateMatch = this.handleCreateMatch.bind(this);
    this.handleCreateTournament = this.handleCreateTournament.bind(this);
    this.handleCreateLeague = this.handleCreateLeague.bind(this);
    this.setGameName = this.setGameName.bind(this);
    this.setGameMode = this.setGameMode.bind(this);
    this.setTournamentMode = this.setTournamentMode.bind(this);
    this.setBetAmount = this.setBetAmount.bind(this);
    this.setTotalPlayer = this.setTotalPlayer.bind(this);
    this.setAvalableFor = this.setAvalableFor.bind(this);
    this.setStartTime = this.setStartTime.bind(this);
    this.selectrequired = this.selectrequired.bind(this);
    
    this.setInSign = this.setInSign.bind(this);
    this.setOutSign = this.setOutSign.bind(this);
    this.setRules = this.setRules.bind(this);
    this.setStartTimeLeague = this.setStartTimeLeague.bind(this);
    this.setEndTimeLeague = this.setEndTimeLeague.bind(this);
    this.setPrize = this.setPrize.bind(this);
    this.handleSaveTags = this.handleSaveTags.bind(this);
    this.handleTagForm = this.handleTagForm.bind(this);
    this.setSelectedTag = this.setSelectedTag.bind(this);
    this.setUserTag = this.setUserTag.bind(this);

    this.state = {
      GName: { value: "", label: "" },
      GameMode: { value: "", label: "" },
      TournamentMode: getBlockTournamentVal(10, 4),
      gamemaplocal: [],
      BetAmount: 10,
      Prize: '',
      AvalableFor: { value: "60", label: "1 Hour" },
      StartTime: { value: "60", label: "1 Hour Later" },
      loading: false,
      submit: false,
      GameTag: "",
      message: "",
      Rules: "<p>Refer to the tournament details to see what game modes are tracked</p><p>Smurfing (creating a new account to compete with) will result in an immediate and permanent ban from <span data-ignore='true'>Repeat.gg</span> and all winnings will be forfeited.</p><p>You must play the minimum number of games in order to get paid out in a tournament. The minimum number of games to play is the same as the number of games we count for your score, which can be found in the Tournament Details.</p>",
      inSign:{ value: "Dollar", label: "Dollar" },
      outSign:{ value: "Dollar", label: "Dollar" },
      StartTimeLeague:nowS,
      EndTimeLeague:nowE,
      TotalPlayer:200,
      TournamentPayout:"2-4, 100.00|5-7, 65.00, 35.00|8-10, 50.00, 30.00, 20.00",
      gameName: '',
        gamePlatform: '',
        gameID: '',
        gameNickname: '',
    };
  }
  
  
  setSelectedGameName(e) {
    
    //this.handleTagForm(e,getBlockGameModesVal(e))
  }
  setSelectedTag(e,p) {
    if(p=='PS4'||e=='PS4'){e='PSN';p='PSN';}
  if(p=='PS5'||e=='PS5'){e='PSN';p='PSN';}
  if(p=='XBOX'||e=='XBOX'){e='XBOX';p='XBOX';}
    this.setState({
      gameName: e.replace(' Warzone',''),
      gamePlatform: p
    });
    
    this.handleTagForm(e.replace(' Warzone',''),p)
  }
  setUserTag(e) {
    this.setState({
      currentUserTag: e
    });
    
  }
  
handleTagForm(game,platform) {
  
  
 // console.log(game);
                const resetPw = async () => {
                  const swalval = await Swal.fire(getModalTag(game));
        
                  let v = (swalval && swalval.value) || swalval.dismiss;
                  console.log(swalval);
                  if (v) {
                    if (v.tagid) {
                      
                        if (v.tagid == game+"2") {
                          this.handleTagForm(game+'2')
                        }else if (v.tagid == game+"3") {
                          this.handleTagForm(game+'3')
                        }else{
                          this.setState({
                            gameID: '',
                            gameNickname: '',
                          });
                          if (v.tagid != "") {
                            this.setState({
                              gameID: v.tagid.replace('#',''),
                              
                            });
                          }
                          if (v.tagname && v.tagname != "") {
                            this.setState({
                              gameNickname: v.tagname,
                              
                            });
                          }
                          if (v.tagplatform && v.tagplatform != "") {
                            this.setState({
                              gamePlatform: v.tagplatform,
                              
                            });
                          }
                          
                            console.log(this.state);
                            this.handleSaveTags();
                          
                        }
                        
                      }
                      
                      //setformdata(swalval);
                      
                    
                  }
                };
                resetPw();
              }
              selectrequired(field,value) {
                //console.log(field+': '+value+' -' + allValid+': '+reqnum+' -' + this.state.submit);
                if (!value ) {
                    allValid = false;
                    if (this.state.submit && reqnum==0) {
                      //console.log(field)
                      reqnum = reqnum+1;
                     
                      $('input.'+field+'').focus()

                      return (
                        printRequired()
                      )
                
            }
            } else {
              if (reqnum==1 ) {
                reqnum=0;
              allValid = true;
              }
            }
                
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
  setOutSign(e) {
    this.setState({
      outSign: e,
    });
  }
  setRules(e) {
    this.setState({
      Rules: e.target.value
    });
    
  }
  setStartTimeLeague(e) {
    this.setState({
      StartTimeLeague: e.target.value
    });
    
  }
  setEndTimeLeague(e) {
    this.setState({
      EndTimeLeague: e.target.value
    });
    
  }
  setPrize(e) {
    this.setState({
      Prize: e
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
  setStartTime(e) {
    this.setState({
      StartTime: e,
    });
  }
  
  setTotalPlayer(e) {
    console.log(this.state)
    this.setState({
      TotalPlayer: e,
    });
  }
  

  handleCreateMatch(e) {
    e.preventDefault();
    allValid = true;
    reqnum = 0;
    this.setState({
    submit: true,
  });
    if (allValid) {
     
        this.setState({
          message: "",
          loading: true,
        });
        userService
          .createEvent(
            this.state.GName.value.split(" - ")[0],
            this.state.GName.value.split(" - ")[1],
            this.state.GameMode.value,
            this.state.BetAmount,
            this.state.AvalableFor.value
          )
          .then(
            
            (response) => {
              if (response=='Create event successful'){
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
                this.setSelectedTag(this.state.gameName,this.state.gameConsole)
                this.setSelectedTag(this.state.GName.value.split(" - ")[0],this.state.GName.value.split(" - ")[1])
              }
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
      
    } else {
      this.setState({
        submit: true,
      });

      this.form.validateAll();
    }
  }
  handleSaveTags() {
    Swal.fire({
      title: '<br/>Please Wait...',
      text: 'Is working..',
      customClass:'tag',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      didOpen: () => {
          Swal.showLoading()
      }
  })
  
    userService
      .saveTags(
       
        this.state.gameName,
        this.state.gamePlatform,
        this.state.gameID,
        this.state.gameNickname,

      )
      .then(
        (response) => {
         
          let jsonBool = isJson(response);
   
          if (jsonBool) {
           
              this.setUserTag(response)
              localStorage.setItem("user", JSON.stringify(response));
              Swal.fire("", "Data saved successfully.", "success");
          
          } else {
           
              Swal.fire("", response, "error");
           
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
  }
  handleCreateTournament(e) {
    e.preventDefault();

    if (allValid) {
      this.setState({
        message: "",
        loading: true,
      });

      userService
        .createTournament(
          this.state.GName.value.split(" - ")[0],
          this.state.GName.value.split(" - ")[1],
          'Tournament',
          
          this.state.BetAmount,
          this.state.StartTime.value,
         // "1",
          this.state.TournamentMode.value,
          '1-8, 65.00, 35.00|9-16, 50.00, 30.00, 20.00|17-64, 48.00, 27.00, 15.00, 10.00',
          this.state.inSign.value,
          this.state.outSign.value,
          this.state.Rules
        )
        .then(
            
          (response) => {
            if (response=='Tournament event created.'){
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
              this.setSelectedTag(this.state.GName.value.split(" - ")[0],'Activition')
            }
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
    } else {
      this.setState({
        submit: true,
      });

      this.form.validateAll();
    }
  }
  handleCreateLeague(e) {
    e.preventDefault();
    
    if (allValid) {
     var sdate = new Date(this.state.StartTimeLeague).valueOf();
     var edate = new Date(this.state.EndTimeLeague).valueOf();
        this.setState({
          message: "",
          loading: true,
        });
        userService
          .createLeague(
            this.state.GName.value.split(" - ")[0],
            this.state.GName.value.split(" - ")[1],
            'League',
            this.state.BetAmount,
            sdate,
            edate,
            this.state.TotalPlayer,
            
            '0-70, 30.00, 20.00, 14.00, 10.00, 8.00, 7.00, 6.00, 5.00|71-100, 29.00, 18.00, 12.50, 10.00, 8.00, 6.50, 5.50, 4.50, 3.50, 2.50|101-200, 28.00, 17.50, 11.50, 8.50, 7.00, 5.50, 4.50, 3.50, 2.50, 1.50, 1.00x10|201-400, 27.00, 16.50, 10.50, 8.00, 6.25, 4.75, 3.75, 2.75, 1.75, 1.25, 0.75x10, 0.50x20|401-700, 26.00, 15.50, 10.00, 7.50, 6.00, 4.50, 3.50, 2.50, 1.50, 1.00, 0.65x10, 0.40x20, 0.25x30|701-1000, 25.00, 15.00, 10.00, 7.25, 5.50, 4.25, 3.25, 2.25, 1.25, 0.75, 0.55x10, 0.40x20, 0.25x30, 0.15x30',
          this.state.inSign.value,
          this.state.outSign.value,
          this.state.Rules
          )
          .then(
            
            (response) => {
              if (response=='Create event successful'){
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
                this.setSelectedTag(this.state.GName.value.split(" - ")[0],'Activition')
              }
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
      
    } else {
      this.setState({
        submit: true,
      });

      this.form.validateAll();
    }
  }
  
  render() {
    console.log(this.props)
    const currentUser = authService.getCurrentUser();
    var _mode = " 1 v 1 ";
    var _color = "#404040";
    
    return (
      <>
      <Active token={currentUser}/>
        <Tab.Container id="plain-tabs-example" defaultActiveKey="match">
          <Nav role="tablist" variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="match">1v1 Match</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="tournsment">Tournament</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="league">League</Nav.Link>
            </Nav.Item>
          </Nav>
          <Card>
            <Card.Body>
              <Tab.Content>
                <Tab.Pane eventKey="match">
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
                              {this.selectrequired('GameName',this.state.GName.value)}
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
                              {this.selectrequired('GameMode',this.state.GameMode.value)}
                            </div>
                            <div className="form-group">
                              <label>Bet</label>
                              <NumericInput min={1} step={1} max={1000} className="form-control BetAmount"
                    name="BetAmount"
                                value={this.state.BetAmount}
                                onChange={this.setBetAmount}/>
                              
                              
                            
                              {this.selectrequired('BetAmount',this.state.BetAmount)}
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
                                  { value: "1", label: "30 Minutes" },
                                  { value: "60", label: "1 Hour" },
                                  { value: "360", label: "6 Hours" },
                                  { value: "1440", label: "1 Day" },
                                ]}
                                placeholder=""
                                isSearchable={false}
                              />
                              {this.selectrequired('AvalableFor',this.state.AvalableFor.value)}
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
                      </Form>
                    </Col>
                    <Col sm="5" md="4">
                      {(this.state.GName.value.indexOf(' - ') > -1) && (
                        <Card className="card-user chall">
                        <Card.Header className="no-padding">
                          <div className="card-image">
                            <img
                              src={
                                require("assets/images/games/" +
                                  this.state.GName.value.split(" - ")[0] +
                                  ".jpg").default
                              }
                            ></img>
                          </div>
                          <div
                            className="text-center"
                            style={{
                              position: "absolute",
                              right: 0,
                              left: 0,
                              marginTop: -50,
                            }}
                          >
                            <Avatar
                              size="80"
                              textSizeRatio={6}
                              style={{
                                boxShadow: "0px 0px 20px 20px rgba(0,0,0,0.2)",
                              }}
                              color={_color}
                              round={true}
                              value={_mode}
                            />
                          </div>
                        </Card.Header>
                        <Card.Body>
                          <Row>
                            <Col style={{ lineHeight: "30px" }}>
                              <Card.Title as="h4">
                                {this.state.GName.value.split(" - ")[0]}
                              </Card.Title>
                              <small className="text-muted">
                                {this.state.GameMode.value}
                              </small>
                              <br />

                              <span>
                                <Avatar
                                  size="25"
                                  title={currentUser.username}
                                  round={true}
                                  name={setAvatar(currentUser.username)}
                                />
                                <Avatar
                                  size="25"
                                  round={true}
                                  name="?"
                                  src="https://graph.facebook.com/100008343750912/picture?width=200&height=200"
                                  color="lightgray"
                                />
                              </span>

                              <br />
                              <small className="text-muted">
                                Avalable until
                              </small>
                            </Col>
                            <Col
                              style={{ lineHeight: "30px" }}
                              className="text-muted text-right"
                            >
                              <small className="text-muted">
                                <FontAwesomeIcon
                                  fixedWidth
                                  icon={getIcon(
                                    this.state.GName.value.split(" - ")[1]
                                  )}
                                />{" "}
                                {this.state.GName.value.split(" - ")[1]}
                              </small>
                              <br />
                              <Badge
                                variant={getColor(this.state.BetAmount)}
                              >
                                ${this.state.BetAmount}
                              </Badge>
                              <br />
                              <small className="text-muted">1/2</small>
                              <br />
                              <small className="text-muted">
                                {" "}
                                {this.state.AvalableFor.value ? (
                                  <div>
                                    {" "}
                                    <Countdown
                                      renderer={renderer}
                                      date={
                                        Date.now() +
                                        this.state.AvalableFor.value * 1000 * 60
                                      }
                                    />
                                  </div>
                                ) : (
                                  <div> No limit</div>
                                )}
                              </small>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                      )}
                      
                    </Col>
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="tournsment">
                  <Row>
                    <Col md="9">
                      <Form
                        onSubmit={this.handleCreateTournament}
                        ref={(c) => {
                          this.form = c;
                        }}
                      >
                        <Card className="card-plain" style={{ margin: -10 }}>
                          <Card.Header>
                            <Card.Title>Create Tournament</Card.Title>
                          </Card.Header>
                          <Card.Body>
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
                              <NumericInput min={1} step={1} max={1000} className="form-control"
                    name="BetAmount"
                                value={this.state.BetAmount}
                                onChange={this.setBetAmount}/>
                              
                            
                          
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
                                options={getBlockTournament(
                                  this.state.BetAmount
                                )}
                                placeholder=""
                                isSearchable={false}
                              />
                          
                            </div>
                            <div className="form-group">
                              <label>Start Time</label>

                              <Select
                                className="react-select default"
                                classNamePrefix="react-select"
                                name="StartTime"
                                value={this.state.StartTime}
                                onChange={this.setStartTime}
                                options={[
                                  { value: "30", label: "30 Minutes Later" },
                                  { value: "60", label: "1 Hour Later" },
                                  { value: "120", label: "2 Hours Later" },
                                  { value: "3600", label: "6 Hours Later" },
                                ]}
                                placeholder=""
                                isSearchable={false}
                              />
                            
                            </div>
                            <div className="form-group">
                              <label>Prize</label>
                              <NumericInput min={1} step={1} max={1000} className="form-control"
                    name="BetAmount"
                    value={this.state.Prize}
                    onChange={this.setPrize}/>

                              
                            
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
                                <span> Create Tournament</span>
                              </button>
                            </div>
                          </Card.Footer>
                        </Card>
                      </Form>
                    </Col>
                    <Col md="3">
                    {(this.state.GName.value.indexOf(' - ') > -1) && (
                      <Card className="card-user chall">
                        <Card.Header className="no-padding">
                          <div className="card-image">
                            <img
                              src={
                                require("assets/images/games/" +
                                  this.state.GName.value.split(" - ")[0] +
                                  ".jpg").default
                              }
                            ></img>
                          </div>
                        </Card.Header>
                        <Card.Body>
                          <Row>
                            <Col style={{ lineHeight: "30px" }}>
                              <Card.Title as="h4">
                                {this.state.GName.value.split(" - ")[0]}
                              </Card.Title>
                              <small className="text-muted">Tournament</small>
                              <br />

                              <span>
                                <Avatar
                                  size="30"
                                  title={currentUser.username}
                                  round={true}
                                  name={setAvatar(currentUser.username)}
                                />
                                {(() => {
                                  const rows = [];
                                  for (
                                    let i = 0;
                                    i < this.state.TournamentMode.value - 1;
                                    i++
                                  ) {
                                    if (i < 3) {
                                      rows.push(
                                        <Avatar
                                          size="20"
                                          key={i}
                                          round={true}
                                          name="?"
                                          src="https://graph.facebook.com/100008343750912/picture?width=200&height=200"
                                          color="lightgray"
                                        />
                                      );
                                    } else {
                                      rows.push(
                                        <Avatar
                                          size="22"
                                          key={i}
                                          round={true}
                                          name="+ 4"
                                          color="gray"
                                        />
                                      );
                                      break;
                                    }
                                  }
                                  return rows;
                                })()}
                              </span>

                              <br />
                              <small className="text-muted">Start Time</small>
                              {this.state.TournamentMode.value == "4" ? (
                                <>
                                  <br />
                                  <small className="text-muted">
                                    Final Match
                                  </small>
                                </>
                              ) : (
                                <>
                                  <br />
                                  <small className="text-muted">
                                    SemiFinal Match
                                  </small>
                                  <br />
                                  <small className="text-muted">
                                    Final Match
                                  </small>
                                </>
                              )}
                            </Col>
                            <Col
                              style={{ lineHeight: "30px" }}
                              className="text-muted text-right"
                            >
                              <small className="text-muted">
                                <FontAwesomeIcon
                                  fixedWidth
                                  icon={getIcon(
                                    this.state.GName.value.split(" - ")[1]
                                  )}
                                />{" "}
                                {this.state.GName.value.split(" - ")[1]}
                              </small>
                              <br />
                              <Badge
                                variant={getColor(this.state.BetAmount)}
                              >
                                ${this.state.BetAmount}
                              </Badge>
                              <br />
                              <small className="text-muted">
                                1/{this.state.TournamentMode.value}{" "}
                              </small>
                              <br />

                              <small className="text-muted">
                                {" "}
                                <Countdown
                                  renderer={renderer}
                                  date={
                                    Date.now() +
                                    this.state.StartTime.value * 1000 * 60
                                  }
                                />
                              </small>
                              {this.state.TournamentMode.value == "4" ? (
                                <>
                                  <br />
                                  <small className="text-muted">
                                    <Countdown
                                      renderer={renderer}
                                      date={
                                        Date.now() +
                                        this.state.StartTime.value * 1000 * 60 +
                                        60 * 1000 * 60
                                      }
                                    />
                                  </small>
                                </>
                              ) : (
                                <>
                                  <br />
                                  <small className="text-muted">
                                    <Countdown
                                      renderer={renderer}
                                      date={
                                        Date.now() +
                                        this.state.StartTime.value * 1000 * 60 +
                                        60 * 1000 * 60
                                      }
                                    />
                                  </small>
                                  <br />
                                  <small className="text-muted">
                                    <Countdown
                                      renderer={renderer}
                                      date={
                                        Date.now() +
                                        this.state.StartTime.value * 1000 * 60 +
                                        120 * 1000 * 60
                                      }
                                    />
                                  </small>
                                </>
                              )}
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    )}
                    </Col>
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="league">
                  <Row>
                    <Col md="9">
                      <Form
                        onSubmit={this.handleCreateLeague}
                        ref={(c) => {
                          this.form = c;
                        }}
                      >
                        <Card className="card-plain" style={{ margin: -10 }}>
                          <Card.Header>
                            <Card.Title>Create League</Card.Title>
                          </Card.Header>
                          <Card.Body>
                            <div className="form-group">
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
                              <label>Bet</label>
                              <NumericInput min={1} step={1} max={1000} className="form-control"
                    name="BetAmount"
                                value={this.state.BetAmount}
                                onChange={this.setBetAmount}/>
                              
                            
                           
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
                              <label>Total Players</label>
                              <NumericInput min={1} step={1} max={1000} className="form-control"
                    name="TotalPlayer"
                                value={this.state.TotalPlayer}
                                onChange={this.setTotalPlayer}/>
                              
                            
                            </div>
                            <div className="form-group">
                              <label>Start Time</label>
                              <Input
                    type="datetime-local"
                    className="form-control"
                    name="StartTime"
                    value={this.state.StartTimeLeague}
                    onChange={this.setStartTimeLeague}
                  />
                              
                            </div>
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
                            
                            <div className="form-group">
                              <label>Prize</label>
                              <NumericInput min={1} step={1} max={1000} className="form-control"
                    name="BetAmount"
                    value={this.state.Prize}
                    onChange={this.setPrize}/>

                              
                            
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
                              <label>Rules</label>
                              <Input
                    type="text"
                    className="form-control"
                    name="name"
                    value={this.state.Rules}
                    onChange={this.setRules}
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
                                <span> Create Tournament</span>
                              </button>
                            </div>
                          </Card.Footer>
                        </Card>
                      </Form>
                    </Col>
                    <Col md="3">
                    {(this.state.GName.value.indexOf(' - ') > -1) && (
                      <Card className="card-user chall">
                        <Card.Header className="no-padding">
                          <div className="card-image">
                            <img
                              src={
                                require("assets/images/games/" +
                                  this.state.GName.value.split(" - ")[0] +
                                  ".jpg").default
                              }
                            ></img>
                          </div>
                        </Card.Header>
                        <Card.Body>
                          <Row>
                            <Col style={{ lineHeight: "30px" }}>
                              <Card.Title as="h4">
                                {this.state.GName.value.split(" - ")[0]}
                              </Card.Title>
                              <small className="text-muted">Tournament</small>
                              <br />

                              <span>
                                <Avatar
                                  size="30"
                                  title={currentUser.username}
                                  round={true}
                                  name={setAvatar(currentUser.username)}
                                />
                                {(() => {
                                  const rows = [];
                                  for (
                                    let i = 0;
                                    i < this.state.TournamentMode.value - 1;
                                    i++
                                  ) {
                                    if (i < 3) {
                                      rows.push(
                                        <Avatar
                                          size="20"
                                          key={i}
                                          round={true}
                                          name="?"
                                          src="https://graph.facebook.com/100008343750912/picture?width=200&height=200"
                                          color="lightgray"
                                        />
                                      );
                                    } else {
                                      rows.push(
                                        <Avatar
                                          size="22"
                                          key={i}
                                          round={true}
                                          name="+ 4"
                                          color="gray"
                                        />
                                      );
                                      break;
                                    }
                                  }
                                  return rows;
                                })()}
                              </span>

                              <br />
                              <small className="text-muted">Start Time</small>
                              {this.state.TournamentMode.value == "4" ? (
                                <>
                                  <br />
                                  <small className="text-muted">
                                    Final Match
                                  </small>
                                </>
                              ) : (
                                <>
                                  <br />
                                  <small className="text-muted">
                                    SemiFinal Match
                                  </small>
                                  <br />
                                  <small className="text-muted">
                                    Final Match
                                  </small>
                                </>
                              )}
                            </Col>
                            <Col
                              style={{ lineHeight: "30px" }}
                              className="text-muted text-right"
                            >
                              <small className="text-muted">
                                <FontAwesomeIcon
                                  fixedWidth
                                  icon={getIcon(
                                    this.state.GName.value.split(" - ")[1]
                                  )}
                                />{" "}
                                {this.state.GName.value.split(" - ")[1]}
                              </small>
                              <br />
                              <Badge
                                variant={getColor(this.state.BetAmount)}
                              >
                                ${this.state.BetAmount}
                              </Badge>
                              <br />
                              <small className="text-muted">
                                1/{this.state.TournamentMode.value}{" "}
                              </small>
                              <br />

                              <small className="text-muted">
                                {" "}
                                <Countdown
                                  renderer={renderer}
                                  date={
                                    Date.now() +
                                    this.state.StartTime.value * 1000 * 60
                                  }
                                />
                              </small>
                              {this.state.TournamentMode.value == "4" ? (
                                <>
                                  <br />
                                  <small className="text-muted">
                                    <Countdown
                                      renderer={renderer}
                                      date={
                                        Date.now() +
                                        this.state.StartTime.value * 1000 * 60 +
                                        60 * 1000 * 60
                                      }
                                    />
                                  </small>
                                </>
                              ) : (
                                <>
                                  <br />
                                  <small className="text-muted">
                                    <Countdown
                                      renderer={renderer}
                                      date={
                                        Date.now() +
                                        this.state.StartTime.value * 1000 * 60 +
                                        60 * 1000 * 60
                                      }
                                    />
                                  </small>
                                  <br />
                                  <small className="text-muted">
                                    <Countdown
                                      renderer={renderer}
                                      date={
                                        Date.now() +
                                        this.state.StartTime.value * 1000 * 60 +
                                        120 * 1000 * 60
                                      }
                                    />
                                  </small>
                                </>
                              )}
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    )
                                    }
                    </Col>
                  </Row>
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
          </Card>
        </Tab.Container>
      </>
    );
  }
}

export default withRouter(CreateMatch);
