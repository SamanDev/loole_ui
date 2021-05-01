import React, { Component,useState, useMemo  } from "react";
import Select from "react-select";
import NotificationAlert from "react-notification-alert";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Avatar from 'react-avatar';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Countdown from "react-countdown";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram,faTwitch, faYoutube,faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faPlaystation, faXbox } from '@fortawesome/free-brands-svg-icons'
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons'
import {  withRouter} from 'react-router-dom';
import AuthService from "services/auth.service";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import userService from "services/user.service";

import MyMatches from 'views/UserMatches.js'
import Birthday from 'components/Birthday'
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
      this.handlecSetInstagram = this.handlecSetInstagram.bind(this);
      
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
    handlecSetInstagram(checked) {
      const MySwal = withReactContent(Swal)
    
      Swal.fire({
        title: 'Connect your Instagram',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText:
        'Back',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
          return fetch(`//api.github.com/users/${login}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(response.statusText)
              }
              return response.json()
            })
            .catch(error => {
              Swal.showValidationMessage(
                `Request failed: ${error}`
              )
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: `${result.value.login}'s avatar`,
            imageUrl: result.value.avatar_url
          })
        }
      })
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
        const currentUser = AuthService.getCurrentUser();
        var str = currentUser.username;
    var res = str.substring(0, 1);
    res  = res + ' '+ str.substring(1, 2);
    
  return (
    <>
    <div className="wrapper">
            <div className="parallax filter-gradient gray section-gray" data-color="red">
                <div className="parallax-background">
                    <img className="parallax-background-image" src="/assets/img/showcases/showcase-1/bg.jpg"/>
                </div>
                <div className= "container">
                <div className="row">
                            <div className="col-md-12">
                                <div className="description">
                                <div
                                  className=" winner avatar"
                                  style={{ width: 92, height: 92 }}
                                ></div>
                                <div className="author  avatar text-center">
                      
                      <Avatar size="114" round={true} name={res} />
              
                          
                      </div>
                      <div className="card-description text-center" style={{marginBottom:30}}>
                      <Card.Title as="h5" style={{marginBottom:0,marginTop:15}}>{currentUser.username} <img src="/assets/images/famfamfam_flag_icons/png/tr.png" /></Card.Title>
                        <small style={{fontSize:10}}>Last Login 5 hours ago</small><br/>
                        <ListGroup horizontal style={{display:'inline-flex',marginTop:10}}>
  <ListGroup.Item action><FontAwesomeIcon  icon={faInstagram} style={{color: '#e95950'}}/></ListGroup.Item>
  <ListGroup.Item action><FontAwesomeIcon  icon={faTwitch} style={{color: '#6441a5'}} /></ListGroup.Item>
  <ListGroup.Item action><FontAwesomeIcon  icon={faYoutube} style={{color: '#FF0000'}}/></ListGroup.Item>
  <ListGroup.Item action><FontAwesomeIcon  icon={faTwitter} style={{color: '#00acee'}} /></ListGroup.Item>
</ListGroup>
                        
                      
                        </div>
                      <div className="row card-stats card-profile">
<div className="col-lg-3 col-md-6 col-xs-12 ">
<div className="counter-box bg-color-1 card">
<div className="fact-count">
<h3>5,285</h3>
<p>Total Match</p>
</div>
<div className="icon-o"><i className="lni-users"></i></div>
</div>
</div>
<div className="col-lg-3 col-md-6 col-xs-12">
<div className="counter-box bg-color-2 card">
<div className="fact-count">
<h3>%76</h3>
<p>% Win</p>
</div>
<div className="icon-o"><i className="lni-thumbs-up"></i></div>
</div>
</div>
<div className="col-lg-3 col-md-6 col-xs-12">
<div className="counter-box bg-color-3 card">
<div className="fact-count">
<h3>%100</h3>
<p>% Trust</p>
</div>
<div className="icon-o"><i className="lni-eye"></i></div>
</div>
</div>
<div className="col-lg-3 col-md-6 col-xs-12">
<div className="counter-box bg-color-4 card">
<div className="fact-count">
<h3>$83.08</h3>
<p>Total Earn</p>
</div>
<div className="icon-o"><i className="lni-emoji-smile"></i></div>
</div>
</div>

                    </div>

                                </div>
                                
                            </div>
                           
                        </div>
                
                </div>
            </div>
            <div className="section section-gray section-clients section-no-padding">
                <div className="container">
                    <h4 className="header-text  text-center">Last Activity</h4>
                    <MyMatches/>
                   
                  
                </div>
            </div>
           
        </div>
      
     
    </>
  );
                            }
}

export default withRouter(CreateMatch) ;
