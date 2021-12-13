import React, { Component } from "react";

import Moment from "moment";
import CheckButton from "react-validation/build/button";

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
import { Modal,Button,Input,Label,Dropdown,Form,Select,Card,Loader,Dimmer } from "semantic-ui-react";
import {
  Badge,
  Alert,

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
  date_edit,
  printJoinalerts
  
} from "components/include";
var moment = require("moment");
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
              text: item.name + " - " + consoles.consolename,
            });
          }
      }else if(filtermode == 'Tournament'){
        if (item.haveTournament == true
          ) {
            gamemap.push({
              value: item.name + " - " + consoles.consolename,
              text: item.name + " - " + consoles.consolename,
            });
          }
      }else if(filtermode == 'League'){
        if (item.haveLeague == true
          ) {
            gamemap.push({
              value: item.name + " - " + consoles.consolename,
              text: item.name + " - " + consoles.consolename,
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
            text: item.name + " - " + consoles.consolename,
          });
        }
      }
      
    });
  });

  return gamemap;
};
const options = [
  { key: 'dollar', text: 'Dollar', value: 'Dollar' },
  { key: 'point', text: 'Diamonds', value: 'Diamonds' },
  
]

const getBlockGameModes = (filtermode) => {
  var gamemaplocal = [];

  if (filtermode != "") {
    var filter = filtermode.value.split(" - ")[0];

    Games.games.map((item, i) => {
      if (item.name == filter) {
        item.modes.map((mode, j) => {
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

    Games.games.map((item, i) => {
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
      GName: { value: "8Pool - Mobile", text: "8Pool - Mobile" },
      GameMode: { value: "Duel", text: "Duel" },
     
      currentUser: this.props.token,
      gamemaplocal: [],
      BetAmount: 10,
      Prize: '',
      AvalableFor: { value: "60", text: "1 Hour" },
      StartTime: { value: "60", text: "1 Hour Later" },
      loading: false,
      submit: false,
      GameTag: "",
      message: "",
      inSign:{ value: "Dollar", text: "Dollar" },
      gamePlatform:'',
      gameName:'',
    };
  }
  
  setGameName(e,data) {
    this.setState({
      GName: data,
      GameMode: getBlockGameModesVal(data),
    });
    
  }
  setInSign(e,data) {
    
    this.setState({
      inSign: data,
    });
  }
  
  setGameMode(e,data) {
    this.setState({
      GameMode: data,
    });
  }
  setBetAmount(e,data) {
    
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
                    this.props.onUpdateItem('openModalAdd',false)
                
                  }
                );
              }else{
                this.setState({
                  successful: false,
                  message: "",
                  submit: false,
                  loading: false,
                });
                {printJoinalerts(response,this.state.GName,this.state.currentUser,handleTagForm)}
            }
            },
            (error) => {
              this.setState({
                successful: false,
                message: "",
                submit: false,
                loading: false,
              });
              const resMessage =
                (error.response.data 
                  ) ||
               
                error.toString();
          
              if (resMessage.indexOf('Error')>-1){
                {printJoinalerts(resMessage,this.state.GName,this.state.currentUser,handleTagForm)}
            }else{

              this.setState({
                successful: false,
                message: resMessage,
                submit: false,
                loading: false,
              });
            }
            }
          );
      
    
    }
  
  
  render() {
    var { currentUser } = this.state;
    var timestring1 = new Date();
    var startdate = moment(timestring1).format();
     
         startdate = moment(startdate).add(this.state.AvalableFor.value, 'minutes').format()
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
      "expire": date_edit(startdate),
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
      <Modal.Header>Create 1vs1 Match</Modal.Header>
      <Modal.Content image scrolling >
      <Dimmer active={this.state.loading}>
        <Loader>Loading</Loader>
      </Dimmer>
      <Form inverted  
                        onSubmit={this.handleCreateMatch}
                      style={{width: '100%'}}
                      >
      
          
          <Row>
                    <Col  sm="7">
                    <Form.Field
                    inverted
            control={Select}
            label='Game'
        
            placeholder='Game'
            value={this.state.GName.value}
                                onChange={this.setGameName}
                                options={getBlockGames("Match")}
          />
                            <Form.Field
                    inverted
            control={Select}
            label='Mode'
           
            placeholder='Mode'
            value={this.state.GameMode.value}
            onChange={this.setGameMode}
            options={getBlockGameModes(this.state.GName)}
          />
           <Form.Field>
            <label>Bet</label>
                              <Input  fluid
    label={<Dropdown defaultValue={this.state.inSign.value} value={this.state.inSign.value}
    onChange={this.setInSign} options={options} />}
    labelPosition='right'
    placeholder='Bet' maxLength="4" value={this.state.BetAmount}
    onChange={this.setBetAmount}
  />
                                   
                                   </Form.Field>
                                   <Form.Field>
            <label>Avalable for</label>
                           
                              <Button.Group size="" widths='4' type='button'  buttons={[
                                  { key: "30", content: "30 Min",type:'button',active:(this.state.AvalableFor.value == "30"&&(true)),onClick:() => this.setAvalableFor({ value: "30"})},
                                  { key: "60", content: "1 Hour",type:'button',active:(this.state.AvalableFor.value == "60"&&(true)),onClick:() => this.setAvalableFor({ value: "60"}) },
                                  { key: "360", content: "6 Hours",type:'button' ,active:(this.state.AvalableFor.value == "360"&&(true)),onClick:() => this.setAvalableFor({ value: "360"})},
                                  { key: "1440", content: "1 Day",type:'button',active:(this.state.AvalableFor.value == "1440"&&(true)),onClick:() => this.setAvalableFor({ value: "1440"}) },
                                ]} />
                              
                              
                             
                              </Form.Field>

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
                          
                        
                      </Col>
                    <Col sm="5" >
                   
                      {(this.state.GName.value.indexOf(' - ') > -1) && (
                        <>
                        <Card.Group className="fours one" style={{ marginBottom: 20 }}>
                        {printMatchBlock(item)}
                        </Card.Group>
                       
                      </>
                      )}
                   
                    </Col>
                  </Row>
          
         
          <Button.Group size='large' fluid widths='2'>
          <Button positive fluid loading={this.state.loading}>Create Match</Button>
    <Button.Or />
    <Button negative type="button" fluid onClick={() => this.props.onUpdateItem('openModalAdd',false)}>
              Close
            </Button>
  </Button.Group>
          
        
            
      
          
                      </Form>
                      </Modal.Content>
        </>
    );
  }
}

export default withRouter(AddMatch) ;