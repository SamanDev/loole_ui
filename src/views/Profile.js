import React, { useEffect, useState  } from "react";
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
import { Redirect, Route } from "react-router";

import AuthService from "services/auth.service";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import userService from "services/user.service";
import Active  from "components/active.component";


import ProfileForm  from "components/profile/profile.component"; 
import PasswordForm  from "components/profile/password.component"; 
import TagsForm  from "components/profile/tags.component"; 
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
  getModalTag,
  getGameTag,
  getSocialTag,
  haveSocialTag,
  haveGameTag,
  date_locale,
  userDetails
} from "components/include";
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
function profile() {
  const [token,setToken] = useRecoilState(userState);
  const [gameName,setGameName] = useState();
  const [gamePlatform,setGamePlatform] = useState("");
  const [gameID,setGameID] = useState("");
  const [gameNickname,setGameNickname] = useState("");
  const [message,setMessage] = useState("");
  const [loading,setLoading] = useState(false);
  const [submit,setSubmit] = useState(false);
  const [currentUserTag,SetCurrentUserTag] = useState(token);
  var currentUser = token;
  
  
  const [socialPlatform,setSocialPlatform] = useState("");
  const [socialID,setSocialID] = useState("");
  const [flag,setFlag] = useState('ir');
  
  useEffect(() => {
    
    //do something here
  }, [gameName,gamePlatform,gameID,gameNickname]);
  
  

  const handlecSetInstagram = (game,platform) => {
    
    setSocialPlatform(platform)
    const resetPw2= async () => {
      const swalval = await Swal.fire(getModalTag(game));

      let v = (swalval && swalval.value) || swalval.dismiss;
      console.log(socialPlatform);
      if (v) {
        if (v.tagid) {
          
            
              setSocialID(v.tagid)
            
          handleSaveSocial(platform,v.tagid);
              
            }
            
          }
          
          //setformdata(swalval);
          
        
      }
      resetPw2();
    
    
    }
    const selectrequired = (value) => {
  
    if (!value) {
      allValid = false;
      if(submit){
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
  


  var _mode=' 1 v 1 '
        var _color = '#404040'
       
     
    
        var str = currentUser.username;
        var res = str.substring(0, 1);
        res  = res + ' '+ str.substring(1, 2);
   
    if (currentUser.country.value && currentUser.country.value !=  flag){setFlag(currentUser.country.value)}
   
  return (
    
    <>
    <Active token={currentUser}/>
      <Row>
              <Col md="8" sm="6">
      <Tab.Container
              id="plain-tabs-profile"
              defaultActiveKey="profile"
            >
              <Nav role="tablist" variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="profile">Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="tags">Game Tags</Nav.Link>
                </Nav.Item>
                
                <Nav.Item>
                  <Nav.Link eventKey="social">Social Accounts</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="notification">Notifications</Nav.Link>
                </Nav.Item>
              </Nav>
      <Card>
            
              <Card.Body  >
            
              <Tab.Content>

                <Tab.Pane eventKey="profile">
                <VerticalTimeline layout="1-column-left" className="hide">
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
    date="2011 - present"
    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
    
  >
    <h3 className="vertical-timeline-element-title">Creative Director</h3>
    <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
    <p>
      Creative Direction, User Experience, Visual Design, Project Management, Team Leading
    </p>
  </VerticalTimelineElement>
  
</VerticalTimeline>
<ProfileForm/>
                      <PasswordForm/>
                    
                </Tab.Pane>
                <Tab.Pane eventKey="tags">
                <Card className="card-plain" style={{margin: -10}}>
                      <Card.Header>
                         <Card.Title>Game Tags</Card.Title></Card.Header>
                        <Card.Body>
                <TagsForm token={currentUser}/>
                  
                </Card.Body>
                        
                        </Card>
                     
                  
                </Tab.Pane>
                <Tab.Pane eventKey="social">
               
                    <Form
           
            
          >
                      <Card className="card-plain card-social" style={{margin: -10}}>
                      <Card.Header>
                         <Card.Title>Game Tags</Card.Title></Card.Header>
                        <Card.Body>
                        
                        <Card onClick={() => handlecSetInstagram('Social - Instagram','Instagram')}>
       
          <Card.Body>
          <FontAwesomeIcon  icon={faInstagram} style={{color: '#e95950'}}/>  
          {getSocialTag('Instagram',currentUserTag.userSocialAccounts)}
          </Card.Body>
          </Card>
          <Card  onClick={() => handlecSetInstagram('Social - Twitch','Twitch')}>
       
          <Card.Body>
          <FontAwesomeIcon  icon={faTwitch} style={{color: '#6441a5'}} /> {getSocialTag('Twitch',currentUserTag.userSocialAccounts)}
          </Card.Body>
          </Card>
          <Card  onClick={() => handlecSetInstagram('Social - Youtube','Youtube')}>
       
          <Card.Body>
          <FontAwesomeIcon  icon={faYoutube} style={{color: '#FF0000'}}/>  {getSocialTag('Youtube',currentUserTag.userSocialAccounts)}
          </Card.Body>
          </Card>
          <Card  onClick={() => handlecSetInstagram('Social - Twitter','Twitter')}>
       
          <Card.Body>
          <FontAwesomeIcon  icon={faTwitter} style={{color: '#00acee'}} />  {getSocialTag('Twitter',currentUserTag.userSocialAccounts)}
          </Card.Body>
          </Card>
                          
                        </Card.Body>
                       
                      </Card>
                      </Form>
                  
                </Tab.Pane>
              </Tab.Content>
              </Card.Body>
            </Card>
            </Tab.Container>
            </Col>
              <Col md="4">
                <Card className="card-user">
                  <Card.Header className="no-padding">
                    <div className="card-image">
                      <img
                        alt="..."
                        src="/assets/img/showcases/showcase-1/bg.jpg"
                      ></img>
                    </div>
                  </Card.Header>
                  <Card.Body>
                  <div className="author  avatar">
                  <a href={"/user/"+currentUser.username}  target="_blank">
                      <Avatar size="114" round={true} title={currentUser.username} name={res} />
              </a>
                          
                      </div>
                    {userDetails(currentUser )}
                  </Card.Body>
                  
                </Card>
              </Col>
            </Row>
     
    </>
  );
}
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
  

export default (profile) ;
