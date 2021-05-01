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
  getModalTag
} from "components/include";
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
      
      this.handleSaveTags = this.handleSaveTags.bind(this);
      this.handleTagForm = this.handleTagForm.bind(this);
      this.setSelectedTag = this.setSelectedTag.bind(this);
      this.selectrequired = this.selectrequired.bind(this);
      this.handlecSetInstagram = this.handlecSetInstagram.bind(this);
      
      this.state = {
        
        gameName: '',
        gamePlatform: '',
        gameID: '',
        gameNickname: '',
        loading: false,
        submit:false,
        message: ""
      };
    }
    setSelectedTag(e,p) {
      this.setState({
        gameName: e,
        gamePlatform: p
      });
      
      this.handleTagForm(e,p)
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
    handleSaveTags() {
      userService
        .saveTags(
         
          this.state.gameName,
          this.state.gamePlatform,
          this.state.gameID,
          this.state.gameNickname,
  
        )
        .then(
          (response) => {
            Swal.fire("", "Data saved successfully.", "success");
            //this.props.history.push("/panel/dashboard");
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
    handleTagForm(game,platform) {
     
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
                                gameID: v.tagid,
                                
                              });
                            }
                            if (v.tagname != "") {
                              this.setState({
                                gameNickname: v.tagname,
                                
                              });
                            }
                            if (v.tagplatform != "") {
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
              
    
  render() {
    var _mode=' 1 v 1 '
        var _color = '#404040'
        const currentUser = AuthService.getCurrentUser();
        var str = currentUser.username;
    var res = str.substring(0, 1);
    res  = res + ' '+ str.substring(1, 2);
   var arrLogos = ['psn.svg','xbox.svg','8pool.png','clashroyale.png','activition.png','epic.svg']
    var arrTagMode = ['PS4','XBOX','8Pool','ClashRoyale','CallOfDuty','EpicGames']
    var arrPlatform = ['PSN','XBOX','Mobile','Mobile','Activition','EpicGames']
    
  return (
    <>
      <Row>
              <Col md="8" sm="6">
      <Tab.Container
              id="plain-tabs-profile"
              defaultActiveKey="tags"
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
            onSubmit={this.handleCreateMatch}
            ref={c => {
              this.form = c;
            }}
            style={{borderBottom:'1px lightgray solid',paddingBottom:10,marginBottom:30}}
          >
                      <Card className="card-plain" style={{margin: -10}}>
                      <Card.Header>
                         <Card.Title>Proffile</Card.Title></Card.Header>
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
                    value={currentUser.email}
                    
                  />
                             
                               
                            </div>
                            <div className="form-group">
                              <label>Country</label>
                             
<CountryList  />
                              
                            </div>
                            <div className="form-group">
                              <label>Birthday</label>
                             <Birthday value={new Date("01-01-1990")}/>
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
                <span> Update</span>
              </button>
            </div>
                        </Card.Footer>
                      </Card>
                      </Form>
                      <Form
            onSubmit={this.handleCreateMatch}
            ref={c => {
              this.form = c;
            }}
          >
                      <Card className="card-plain" style={{margin: -10}}>
                      <Card.Header>
                         <Card.Title>Change Password</Card.Title></Card.Header>
                        <Card.Body>
                        
                        <div className="form-group">
                              <label>Old Password</label>
                              <Input
                    type="text"
                    className="form-control"
                   
                  />
                             
                               
                            </div>
                            <div className="form-group">
                              <label>New Password</label>
                              <Input
                    type="text"
                    className="form-control"
                   
                  />
                             
                               
                            </div>
                            <div className="form-group">
                              <label>Repeat Password</label>
                              <Input
                    type="text"
                    className="form-control"
                   
                  />
                             
                               
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
                         <Col lg="4" xl="3" key={i} onClick={() => this.setSelectedTag(arrTagMode[i],arrPlatform[i])}>
                        <div className="counter-box bg-color-1 card">
                        <div className="img">
                        <img
                                                    alt={number}
                                                   
                                                    src={"/assets/images/logos/"+number}
                                                  ></img>
                        <p>Not Connected</p>
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
            onSubmit={this.handleCreateTournament}
            ref={c => {
              this.form = c;
            }}
          >
                      <Card className="card-plain card-social" style={{margin: -10}}>
                      <Card.Header>
                         <Card.Title>Game Tags</Card.Title></Card.Header>
                        <Card.Body>
                        
                        <Card onClick={this.handlecSetInstagram}>
       
          <Card.Body>
          <FontAwesomeIcon  icon={faInstagram} style={{color: '#e95950'}}/>  Connect Your Instagram
          </Card.Body>
          </Card>
          <Card >
       
          <Card.Body>
          <FontAwesomeIcon  icon={faTwitch} style={{color: '#6441a5'}} />  Connect Your Twitch
          </Card.Body>
          </Card>
          <Card >
       
          <Card.Body>
          <FontAwesomeIcon  icon={faYoutube} style={{color: '#FF0000'}}/>  Connect Your Youtube
          </Card.Body>
          </Card>
          <Card >
       
          <Card.Body>
          <FontAwesomeIcon  icon={faTwitter} style={{color: '#00acee'}} />  Connect Your Twitter
          </Card.Body>
          </Card>
                          
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
                      <Card.Title as="h5" style={{marginBottom:0,marginTop:15}}>{currentUser.username} <img src="/assets/images/famfamfam_flag_icons/png/tr.png" /></Card.Title>
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
}

export default withRouter(CreateMatch) ;
