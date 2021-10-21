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
import CountryList from 'components/CountryList'
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
import {
  setAvatar,
  getColor,
  getIcon,
  renderer,
  printMatchBlock,
  getModalTag,
  getGameTag,
  getSocialTag,
  haveGameTag,
  date_locale
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
function profile(props) {
  const [token, setToken] = useRecoilState(userState);
  const [gameName,setGameName] = useState("");
  const [gamePlatform,setGamePlatform] = useState("");
  const [gameID,setGameID] = useState("");
  const [gameNickname,setGameNickname] = useState("");
  const [message,setMessage] = useState("");
  const [loading,setLoading] = useState(false);
  const [submit,setSubmit] = useState(false);
  const [currentUserTag,SetCurrentUserTag] = useState(token);
  const currentUser = token;
  const [name,setName] = useState(currentUser.fullName);
  const [country,setCountry] = useState(currentUser.country);
  const [birthday,setBirthday] = useState(currentUser.birthday);
  const [oldPassword,setOldPassword] = useState("");
  const [newPassword,setNewPassword] = useState("");
  
  const [socialPlatform,setSocialPlatform] = useState("");
  const [socialID,setSocialID] = useState("");
  const [flag,setFlag] = useState('ir');
  const handleSubmitInfo = (evt) => {
    evt.preventDefault();
    setSubmit(true);
    setLoading(true);
    
        userService
          .editInfo(
            name,country,birthday
          )
          .then(
            
            (response) => {
              setSubmit(false);
    setLoading(false);
              if (response=='Ok'){
                Swal.fire("", "Data saved successfully.", "success").then(
                  (result) => {
                    setToken('');
                    props.history.push("/panel/dashboard");
                  }
                );
              }
    })
}
  const handleChangePassword = (evt) => {
    evt.preventDefault();
    setSubmit(true);
    setLoading(true);
    
        userService
          .changePasswoord(
            oldPassword,newPassword
          )
          .then(
            
            (response) => {
              setSubmit(false);
    setLoading(false);
              if (response=='Ok'){
                Swal.fire("", "Data saved successfully.", "success").then(
                  (result) => {
                    setToken('');
                    props.history.push("/panel/dashboard");
                  }
                );
              }
    })
}
  const setSelectedTag = (e,p) => {
    setGameName(e);
    setGamePlatform(p);
    handleTagForm(e,p);
  }
  const setUserTag = (e) => {
    SetCurrentUserTag(e)
  
    
  }
  
  const setLok = (e) => {
    setCountry(e)
   
  }
  const setBirt = (e) => {
    
    var newe = date_locale(e);
    setBirthday(newe)
    
  }
  const handleSaveTags = () => {
  
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
       
        gameName,
        gamePlatform,
        gameID,
        gameNickname,

      )
      .then(
        (response) => {
         
          let jsonBool = isJson(response);
   
          if (jsonBool) {
           
              setUserTag(response)
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
  const handleSaveSocial = () => {
  
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
      .saveSocial(
       
     
        socialPlatform,
        socialID,
    

      )
      .then(
        (response) => {
         
          let jsonBool = isJson(response);
   
          if (jsonBool) {
           
              
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
  const handlecSetInstagram = (game,platform) => {
    setSocialPlatform(platform)
    const resetPw = async () => {
      const swalval = await Swal.fire(getModalTag(game));

      let v = (swalval && swalval.value) || swalval.dismiss;
      console.log(swalval);
      if (v) {
        if (v.tagid) {
          
            
              setSocialID(v.tagid)
            
          handleSaveSocial();
              
            }
            
          }
          
          //setformdata(swalval);
          
        
      }
      resetPw();
    
    
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
  const handleTagForm = (game,platform) => {

   
    const resetPw = async () => {
      const swalval = await Swal.fire(getModalTag(game));

      let v = (swalval && swalval.value) || swalval.dismiss;
      console.log(swalval);
      if (v) {
        if (v.tagid) {
          
            if (v.tagid == game+"2") {
              handleTagForm(game+'2')
            }else if (v.tagid == game+"3") {
              handleTagForm(game+'3')
            }else{
              setGameNickname('');
              setGameID('');
              
              if (v.tagid != "") {
              
              setGameID(v.tagid.replace('#',''));
                
              }
              if (v.tagname && v.tagname != "") {
                setGameNickname(v.tagname);
              
              }
              if (v.tagplatform && v.tagplatform != "") {
                setGamePlatform(v.tagplatform);
                
              }
              
            
                handleSaveTags();
              
            }
            
          }
          
          //setformdata(swalval);
          
        
      }
    };
if(!haveGameTag(game,currentUserTag.userTags))                  resetPw();
  }


  var _mode=' 1 v 1 '
        var _color = '#404040'
       
     
        var str = currentUser.username;
    var res = str;
   var arrLogos = ['psn.svg','xbox.svg','8pool.png','clashroyale.png','activition.png','epic.svg']
    var arrTagMode = ['PSN','XBOX','8Pool','ClashRoyale','CallOfDuty','Fortnite']
    var arrPlatform = ['PSN','XBOX','Mobile','Mobile','Activition','All']
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
<Form

onSubmit={handleSubmitInfo} 
            style={{borderBottom:'1px lightgray solid',paddingBottom:10,marginBottom:30}}
          >
                      <Card className="card-plain" style={{margin: -10}}>
                      <Card.Header>
                         <Card.Title >Proffile</Card.Title></Card.Header>
                        <Card.Body>
                        
                        <div className="form-group">
                              <label>Username</label>
                              <Input
                    type="text"
                    className="form-control"
                    
                    value={currentUser.username}
                    disabled={true}
                  />
                             
                               
                            </div>
                            <div className="form-group">
                              <label>Email</label>
                              <Input
                    type="text"
                    className="form-control"
                    
                    value={currentUser.email}
                    disabled={true}
                  />
                             
                               
                            </div>
                            <div className="form-group">
                              <label>Full Name</label>
                              <Input
                    type="text"
                    className="form-control"
                    name="name"
                    value={name}
                    
                    onChange={e => setName(e.target.value)}
                  />
                             
                               
                            </div>
                            <div className="form-group">
                              <label>Country</label>
                             
<CountryList value={country}
passedFunction={setLok}
/>
                              
                            </div>
                            <div className="form-group">
                              <label>Birthday</label>
                             <Birthday passedFunction={setBirt} value={(birthday != null) ? birthday : "01-01-1990"}/>
                            </div>
                            
                            
                            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            
                          
                        </Card.Body>
                        <Card.Footer>
                        <div className="form-group">
              <button
                className="btn btn-primary btn-wd "
                disabled={loading}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm  fa-wd"></span>
                )}
                <span> Update</span>
              </button>
            </div>
                        </Card.Footer>
                      </Card>
                      </Form>
                      <Form
          
onSubmit={handleChangePassword} 
           
          >
                      <Card className="card-plain" style={{margin: -10}}>
                      <Card.Header>
                         <Card.Title>Change Password</Card.Title></Card.Header>
                        <Card.Body>
                        
                        
                            <div className="form-group">
                              <label>New Password</label>
                              <Input
                    type="password"
                    className="form-control"
                    name="password"
                    
                    
                    onChange={e => setOldPassword(e.target.value)}
                  />
                             
                               
                            </div>
                            <div className="form-group">
                              <label>Repeat Password</label>
                              <Input
                    type="password"
                    className="form-control"
                    name="password"
                    
                    
                    onChange={e => setNewPassword(e.target.value)}
                  />
                             
                               
                            </div>
                            
                            
                            
                            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            
                          
                        </Card.Body>
                        <Card.Footer>
                        <div className="form-group">
              <button
                className="btn btn-primary btn-wd "
                disabled={loading}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm  fa-wd"></span>
                )}
                <span> Save</span>
              </button>
            </div>
                        </Card.Footer>
                      </Card>
                      </Form>
                    
                </Tab.Pane>
                <Tab.Pane eventKey="tags">
               
                  
                      <Card className="card-plain" style={{margin: -10}}>
                      <Card.Header>
                         <Card.Title>Game Tags</Card.Title></Card.Header>
                        <Card.Body>
                         
                        <Row className="card-tags">
                        {arrLogos.map((number,i) =>
                        <>
                       
                         <Col lg="4" xl="3" key={i} onClick={() => setSelectedTag(arrTagMode[i],arrPlatform[i])}>
                        <div className="counter-box bg-color-1 card">
                        <div className="img">
                        <img
                                                    alt={number}
                                                   
                                                    src={"/assets/images/logos/"+number}
                                                  ></img>
                                                  {getGameTag(arrTagMode[i],currentUserTag.userTags)}
                       
                        </div>
                       
                        </div>
                        
                        </Col>
</>
)}


                    </Row>

                          
                          
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
                        <Card.Footer>
                        <div className="form-group">
              <button
                className="btn btn-primary btn-wd "
                disabled={loading}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm  fa-wd"></span>
                )}
                <span> Create Tournament</span>
              </button>
            </div>
                        </Card.Footer>
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
                      
                    <Avatar size="114" round={true} name={res} />
            
                        
                    </div>
                   
                     
                    <div className="card-description text-center" style={{marginBottom:30}}>
                      <Card.Title as="h5" style={{marginBottom:0,marginTop:15}}>{currentUser.username} <img src={"/assets/images/famfamfam_flag_icons/png/"+flag+".png"} /></Card.Title>
                      <small style={{fontSize:10}}>Last Login 5 hours ago</small><br/>
                        <ListGroup horizontal style={{display:'inline-flex',marginTop:10}}>
  <ListGroup.Item action><FontAwesomeIcon  icon={faInstagram} style={{color: '#e95950'}}/></ListGroup.Item>
  <ListGroup.Item action><FontAwesomeIcon  icon={faTwitch} style={{color: '#6441a5'}} /></ListGroup.Item>
  <ListGroup.Item action><FontAwesomeIcon  icon={faYoutube} style={{color: '#FF0000'}}/></ListGroup.Item>
  <ListGroup.Item action><FontAwesomeIcon  icon={faTwitter} style={{color: '#00acee'}} /></ListGroup.Item>
</ListGroup>
                        </div>
                    
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
  function isJson(item) {
    item = typeof item !== "string"
        ? JSON.stringify(item)
        : item;

    try {
        item = JSON.parse(item);
    } catch (e) {
        return false;
    }

    if (typeof item === "object" && item !== null) {
        return true;
    }

    return false;
}

export default withRouter(profile) ;
