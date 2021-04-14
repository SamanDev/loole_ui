import React, { Component } from "react";
import Select from "react-select";
import NotificationAlert from "react-notification-alert";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Avatar from 'react-avatar';

import Countdown from "react-countdown";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaystation, faXbox } from '@fortawesome/free-brands-svg-icons'
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons'
import {  withRouter} from 'react-router-dom';

import AuthService from "services/auth.service";

import userService from "services/user.service";
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

import {setAvatar,getColor,getIcon,renderer,printMatchBlock} from "components/include";
import Games from "server/Games";
var allValid = true;

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
            if (
              'All' == filtermode || consoles.consolename == filtermode ||
              (consoles.consolename != "Mobile" && filtermode == "NoMobile")
            ) {
              
                gamemap.push({
                value: item.name + " - " + consoles.consolename,
                label: item.name + " - " + consoles.consolename,
              });
              
            }
          });
        
        
        });
     
    return gamemap;
  };
  const getBlockTournament = (betval) => {
    var tourmap = [
      { value: "4", label: "4 Players - Prize: $" + (4 * betval)*90/100 },
      { value: "8", label: "8 Players - Prize: $" + (8 * betval)*90/100 }
 
    
     
    ];
    
     
    return tourmap;
  };
  const getBlockTournamentVal = (betval,tourmode) => {
    var tourmap = { value: tourmode, label: tourmode+" Players - Prize: $" + (tourmode * betval)*90/100 };
  
    return tourmap;
  };
  const getBlockGamesVal = (filtermode) => {
    var gamemap = [];
    Games.games.slice(0, 5).map((item, i) => {
        item.gameconsole.slice(0, 5).map((consoles, j) => {
            if (
              'All' == filtermode || consoles.consolename == filtermode ||
              (consoles.consolename != "Mobile" && filtermode == "NoMobile")
            ) {
              
              if(j==0){
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
    
      if(filtermode!=''){
        
        var filter = filtermode.value.split(' - ')[0]
        
        Games.games.map((item, i) => {
            if (
                item.name == filter 
                ) {
          item.modes.map((mode, j) => {
            
            gamemaplocal.push({
                value: mode.modename ,
                label: mode.modename ,
              });
             
          });
        }
        });
      
      }
        
     
      
    return gamemaplocal
  };
  const getBlockGameModesVal = (filtermode) => {
    var gamemaplocal = [];
    
      if(filtermode!=''){
        
        var filter = filtermode.value.split(' - ')[0]
        
        Games.games.map((item, i) => {
            if (
                item.name == filter 
                ) {
          item.modes.map((mode, j) => {
            if(j==0){
            gamemaplocal.push({
                value: mode.modename ,
                label: mode.modename ,
              });
            }
          });
        }
        });
      
      }
        
     
      
    return gamemaplocal[0]
  };
  const currentUser = AuthService.getCurrentUser();
  class CreateMatch extends Component {
    constructor(props) {
      super(props);
      this.handleCreateMatch = this.handleCreateMatch.bind(this);
      this.handleCreateTournament = this.handleCreateTournament.bind(this);
      this.setGameName = this.setGameName.bind(this);
      this.setGameMode = this.setGameMode.bind(this);
      this.setTournamentMode = this.setTournamentMode.bind(this);
      this.setBetAmount = this.setBetAmount.bind(this);
      this.setAvalableFor = this.setAvalableFor.bind(this);
      this.setStartTime = this.setStartTime.bind(this);
      this.selectrequired = this.selectrequired.bind(this);
      
      this.state = {
        GameName: getBlockGamesVal("All"),
        GameMode: getBlockGameModesVal(getBlockGamesVal("All")),
        TournamentMode:getBlockTournamentVal(10,4),
        gamemaplocal : [],
        BetAmount:{ value: "10", label: "$10" },
        AvalableFor:{ value: "60", label: "1 Hour" },
        StartTime:{ value: "60", label: "1 Hour Later" },
        loading: false,
        submit:false,
        message: ""
      };
    }
    
    selectrequired(value) {
      if (!value) {
        allValid = false;
        if(this.state.submit){
          return (
            <div className="alert alert-danger" role="alert">
              This field is required!
            </div>
          );
        }
        
      }else{
        //allValid = true;
      }
    }
    setGameName(e) {
        
        this.setState({
            GameName: e,
            GameMode: getBlockGameModesVal(e),
        });
      }
      setTournamentMode(e) {
        
        this.setState({
           
            TournamentMode: e,
        });
     
      }
    
      setGameMode(e) {
        this.setState({
            GameMode: e
        });
        
      }
      setBetAmount(e) {
        this.setState({
          BetAmount: e
        });
      
        this.setTournamentMode(getBlockTournamentVal(e.value,4))
      }
      setAvalableFor(e) {
        this.setState({
          AvalableFor: e
        });
      }
      setStartTime(e) {
        this.setState({
          StartTime: e
        });
      }
   

  handleCreateMatch(e) {
    e.preventDefault();
    console.log(this.state)
    if(allValid){
      this.setState({
        message: "",
        loading: true,
        
      });
      
        userService.createEvent(
          this.state.GameName.value.split(' - ')[0],
          this.state.GameName.value.split(' - ')[1],
          this.state.GameMode.value,
          this.state.BetAmount.value,
          this.state.AvalableFor.value
        ).then(
          response => {
          
            this.props.history.push("/panel/dashboard");
          },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
              localStorage.clear();
  
            this.setState({
              successful: false,
              message: resMessage,
              submit: false,
              loading: false
            });
            
          }
        );
      
    }
    else{
      this.setState({
   
        submit: true
      });
  
      this.form.validateAll();

    }
    

    
  }
  handleCreateTournament(e) {
    e.preventDefault();
    console.log(this.state)
    if(allValid){
      this.setState({
        message: "",
        loading: true,
        
      });
      
        userService.createTournament(
          this.state.GameName.value.split(' - ')[0],
          this.state.GameName.value.split(' - ')[1],
          this.state.TournamentMode.value,
          this.state.BetAmount.value,
          this.state.AvalableFor.value
        ).then(
          response => {
            
            
            this.props.history.push("/panel/dashboard");
          },
          error => {
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
              loading: false
            });
          }
        );
      
    }
    else{
      this.setState({
   
        submit: true
      });
  
      this.form.validateAll();

    }
    

    
  }
  render() {
    var _mode=' 1 v 1 '
        var _color = '#404040'
  return (
    <>
      
      <Tab.Container
              id="plain-tabs-example"
              defaultActiveKey="info-plain"
            >
              <Nav role="tablist" variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="info-plain">1v1 Match</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="account-plain">Tournament</Nav.Link>
                </Nav.Item>
              </Nav>
      <Card>
            
              <Card.Body  >
            
              <Tab.Content>

                <Tab.Pane eventKey="info-plain">
                  <Row>
                    <Col sm="7" md="8">
                    <Form
            onSubmit={this.handleCreateMatch}
            ref={c => {
              this.form = c;
            }}
          >
                      <Card className="card-plain" style={{margin: -10}}>
                      <Card.Header>
                         <Card.Title>Create 1v1 Match</Card.Title></Card.Header>
                        <Card.Body>
                        
                            <div className="form-group">
                              <label>Game</label>
                              <Select
                                className="react-select default"
                                classNamePrefix="react-select"
                                name="GameName"
                                value={this.state.GameName}
                                onChange={this.setGameName}
                                options={getBlockGames("All")}
                                placeholder=""
                               
                               
                              />
                              {this.selectrequired(this.state.GameName)}
                               
                            </div>
                            <div className="form-group">
                              <label>Mode</label>
                              <Select
                                className="react-select default"
                                classNamePrefix="react-select"
                                name="GameMode"
                                value={this.state.GameMode}
                                onChange={this.setGameMode}
                                options={getBlockGameModes(this.state.GameName)}
                                placeholder=""
                                isSearchable={false}
                               
                              />
                               {this.selectrequired(this.state.GameMode)}
                            </div>
                            <div className="form-group">
                              <label>Bet</label>
                              <Select
                                className="react-select default"
                                classNamePrefix="react-select"
                                name="BetAmount"
                                value={this.state.BetAmount}
                                onChange={this.setBetAmount}
                                options={[
                                  { value: "5", label: "$5" },
                                  { value: "10", label: "$10" },
                                  { value: "25", label: "$25" },
                                  { value: "50", label: "$50" },
                                  { value: "100", label: "$100" },
                                 
                                ]}
                                placeholder=""
                                isSearchable={false}
                               
                              />
                               {this.selectrequired(this.state.BetAmount)}
                            </div>
                            <div className="form-group">
                              <label>Avalable for</label>
                              <Select
                                className="react-select default"
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
                               {this.selectrequired(this.state.AvalableFor)}
                            </div>
                            
                            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
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
                      
                    <Card className="card-user chall" >
          <Card.Header className="no-padding">
                    <div className="card-image">
                    <img
                               
                                  src={require("assets/images/games/"+this.state.GameName.value.split(' - ')[0]+".jpg").default}
                                ></img>
                    </div>
                    <div className="text-center"   style={{position:'absolute',right:0,left:0,marginTop:-50}}>
            <Avatar size="80" textSizeRatio={6} style={{boxShadow: '0px 0px 20px 20px rgba(0,0,0,0.2)'}} color={_color} round={true} value={_mode} />
            </div>
                  </Card.Header>
                  <Card.Body>
                    
          <Row>
    <Col style={{lineHeight:'30px'}}>
      <Card.Title as="h4">{this.state.GameName.value.split(' - ')[0]}</Card.Title>
      <small className="text-muted">{this.state.GameMode.value}</small><br/>
      
            <span>
            <Avatar size="25" title={currentUser.username} round={true} name={setAvatar(currentUser.username)} />
        <Avatar size="25" round={true} name="?" src="https://graph.facebook.com/100008343750912/picture?width=200&height=200" color="lightgray" />
        </span>
         
          <br/>
          <small className="text-muted">Avalable until</small>
          
      </Col>
    <Col style={{lineHeight:'30px'}} className="text-muted text-right">
    <small className="text-muted"><FontAwesomeIcon fixedWidth icon={getIcon(this.state.GameName.value.split(' - ')[1])}  /> {this.state.GameName.value.split(' - ')[1]}</small><br/>
      <Badge variant={getColor(this.state.BetAmount.value)}>${this.state.BetAmount.value}</Badge><br/>
      <small className="text-muted">1/2</small><br/>
      <small className="text-muted"> {this.state.AvalableFor.value? (
                    <div > <Countdown  renderer={renderer} date={Date.now() + this.state.AvalableFor.value * 1000  * 60} /></div>
                    ):(
                      <div> No  limit</div>
                    )}</small>
     
          </Col>
  </Row>
         
                    
                  </Card.Body>
                  
                </Card>
                    </Col>
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="account-plain">
                <Row>
                    <Col md="9">
                    <Form
            onSubmit={this.handleCreateTournament}
            ref={c => {
              this.form = c;
            }}
          >
                      <Card className="card-plain" style={{margin: -10}}>
                      <Card.Header>
                         <Card.Title>Create Tournament</Card.Title></Card.Header>
                        <Card.Body>
                        
                            <div className="form-group">
                              <label>Game</label>
                              <Select
                                className="react-select default"
                                classNamePrefix="react-select"
                                name="GameName"
                                value={this.state.GameName}
                                onChange={this.setGameName}
                                options={getBlockGames("All")}
                                placeholder=""
                               
                               
                              />
                              {this.selectrequired(this.state.GameName)}
                               
                            </div>
                            
                            <div className="form-group">
                              <label>Bet</label>
                              <Select
                                className="react-select default"
                                classNamePrefix="react-select"
                                name="BetAmount"
                                value={this.state.BetAmount}
                                onChange={this.setBetAmount}
                                options={[
                                  { value: "5", label: "$5" },
                                  { value: "10", label: "$10" },
                                  { value: "25", label: "$25" },
                                  { value: "50", label: "$50" },
                                  { value: "100", label: "$100" },
                                 
                                ]}
                                placeholder=""
                                isSearchable={false}
                               
                              />
                               {this.selectrequired(this.state.BetAmount)}
                            </div>
                            <div className="form-group">
                              <label>Mode</label>
                              <Select
                                className="react-select default"
                                classNamePrefix="react-select"
                                name="TournamentMode"
                                value={this.state.TournamentMode}
                                onChange={this.setTournamentMode}
                                options={getBlockTournament(this.state.BetAmount.value)}
                                placeholder=""
                                isSearchable={false}
                               
                              />
                               {this.selectrequired(this.state.TournamentMode)}
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
                                  { value: "360", label: "6 Hours Later" },
                                  
                                 
                                ]}
                                placeholder=""
                                isSearchable={false}
                               
                              />
                               {this.selectrequired(this.state.GameMode)}
                            </div>
                            
                            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
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
                  
                    <Card className="card-user chall">
                  <Card.Header className="no-padding">
                    <div className="card-image">
                    <img
                               
                                  src={require("assets/images/games/"+this.state.GameName.value.split(' - ')[0]+".jpg").default}
                                ></img>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    
          <Row>
    <Col style={{lineHeight:'30px'}}>
      <Card.Title as="h4">{this.state.GameName.value.split(' - ')[0]}</Card.Title>
      <small className="text-muted">Tournament</small><br/>
      
            <span>
            <Avatar size="30" title={currentUser.username} round={true} name={setAvatar(currentUser.username)} />
            {(() => {
        const rows = [];
        for (let i = 0; i < this.state.TournamentMode.value-1; i++) {
          if (i<3){
            rows.push(<Avatar  size="20" key={i} round={true} name="?" src="https://graph.facebook.com/100008343750912/picture?width=200&height=200" color="lightgray" />);
          }else{
            rows.push(<Avatar  size="22" key={i} round={true} name="+ 4" color="gray" />);
            break
          }
          
          
      
        }
        return rows;
      })()}
            
        
        </span>
         
          <br/>
          <small className="text-muted">Start Time</small>
          {this.state.TournamentMode.value == "4"? (
            <>
                    <br/>
                    <small className="text-muted">Final Match</small>
                    </>
                    ):(
                      <>
                      <br/>
                      <small className="text-muted">SemiFinal Match</small>
                      <br/>
                      <small className="text-muted">Final Match</small>
                      </>
                    )}
      </Col>
    <Col style={{lineHeight:'30px'}} className="text-muted text-right">
    <small className="text-muted"><FontAwesomeIcon fixedWidth icon={getIcon(this.state.GameName.value.split(' - ')[1])}  /> {this.state.GameName.value.split(' - ')[1]}</small><br/>
      <Badge variant={getColor(this.state.BetAmount.value)}>${this.state.BetAmount.value}</Badge><br/>
      <small className="text-muted">1/{this.state.TournamentMode.value} </small><br/>
      
      <small className="text-muted"> <Countdown renderer={renderer} date={Date.now() + this.state.StartTime.value * 1000  * 60} /></small>
     {this.state.TournamentMode.value == "4"? (
            <>
                    <br/>
                    <small className="text-muted">
                      <Countdown renderer={renderer} date={Date.now() + (this.state.StartTime.value * 1000  * 60) + (60 * 1000  * 60)} />
                      </small>
                    </>
                    ):(
                      <>
                     <br/>
                    <small className="text-muted">
                      <Countdown renderer={renderer} date={Date.now() + (this.state.StartTime.value * 1000  * 60) + (60 * 1000  * 60)} />
                      </small>
                      <br/>
                    <small className="text-muted">
                      <Countdown renderer={renderer} date={Date.now() + (this.state.StartTime.value * 1000  * 60) + (120 * 1000  * 60)} />
                      </small>
                      </>
                    )}
          </Col>
          
 
  </Row>
         
                    
                  </Card.Body>
                 
                </Card>
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

export default withRouter(CreateMatch) ;
