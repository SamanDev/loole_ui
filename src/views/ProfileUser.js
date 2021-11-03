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
import TagsForm  from "components/profile/tags.component"; 
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

import {setAvatar,getColor,getIcon,renderer,printMatchBlock,userDetails} from "components/include";
import Games from "server/Games";
var allValid = true;


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
     
      
      this.state = {
       
      };
    }
    
  render() {
    var _mode=' 1 v 1 '
        var _color = '#404040'
        const currentUser = this.props.token;
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
                      
                      <Avatar size="114" round={true} title={currentUser.username} name={res} />
              
                          
                      </div>
                      <div className="card-description text-center" style={{marginBottom:30}}>
                      {userDetails(currentUser)}   
                      
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
            
            <div className="section  section-clients section-no-padding">
                <div className="container">
                    <h4 className="header-text  text-center">Game Tags</h4>
                    
                    <TagsForm token={currentUser}/>
                  
                </div>
            </div>
            <div className="section section-gray section-clients section-no-padding">
                <div className="container">
                    <h4 className="header-text  text-center">Last Activity</h4>
                    
                   
                  
                </div>
            </div>
           
        </div>
      
     
    </>
  );
                            }
}

export default withRouter(CreateMatch) ;
