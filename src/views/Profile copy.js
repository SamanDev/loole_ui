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
const MySwal = withReactContent(Swal)
const required = (value) => {
  
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
  
  class CreateMatch extends Component {
    constructor(props) {
      super(props);
      this.handleTagForm = this.handleTagForm.bind(this);
      this.setSelectedTag = this.setSelectedTag.bind(this);
      this.selectrequired = this.selectrequired.bind(this);
      this.handlecSetInstagram = this.handlecSetInstagram.bind(this);
      
      this.state = {
        selectedtag: '',
        loading: false,
        submit:false,
        message: ""
      };
    }
    setSelectedTag(e) {
      this.setState({
        selectedtag: e,
      });
      
    }
    handlecSetInstagram(checked) {
     
    
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
    handleTagForm(e) {
      e.preventDefault();
                  const resetPw = async () => {
                    const swalval = await Swal.fire(getModalTag(this.state.selectedtag));
          
                    let v = (swalval && swalval.value) || swalval.dismiss;
                    console.log(swalval);
                    if (v) {
                      if (v.tagid) {
                        var tags = v.tagid.split("@@");
                        if(tags.length==0){
                          if (tags[0] != "") {
                            
                            console.log(this.state);
                            this.handleSaveTags();
                          }
                        }
                        if(tags.length==1){
                          if (tags[0] != "" && tags[1] != "") {
                            
                            console.log(this.state);
                            this.handleSaveTags();
                          }
                        }
                        //setformdata(swalval);
                        
                      }
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
    //var arrLogos = ['psn.svg','xbox.svg','8pool.png','clashroyale.png']
    //var arrPlatform = ['PS4','XBOX','8Pool','ClashRoyale']
    var arrLogos = ['psn.svg']
    var arrPlatform = ['PS4']
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
                  <Nav.Link eventKey="tags">Tags</Nav.Link>
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
                         
                        <div className="row  card-tags">
                        {arrLogos.map((number,i) =>
                        <div className="col-lg-3 col-md-6 col-xs-12 " onClick={this.setSelectedTag(arrPlatform[i])}>
                        <div className="counter-box bg-color-1 card">
                        <div className="fact-count">
                        <img
                                                    alt={number}
                                                   
                                                    src={"/assets/images/logos/"+number}
                                                  ></img>
                        <p>Not Connected</p>
                        </div>
                       
                        </div>
                        </div>

)}


                    </div>

                            <div className="form-group">
                              <label>PlayStation  Network ID</label>
                              <Input
                    type="text"
                    className="form-control"
                   
                  />
                               
                            </div>
                            <div className="form-div"></div>
                            <div className="form-group">
                              <label>XBox ID</label>
                              <Input
                    type="text"
                    className="form-control"
                   
                  />
                            </div>
                            <div className="form-div"></div>
                            <div className="form-group">
                              <label>Epic ID</label>
                              <Input
                    type="text"
                    className="form-control"
                   
                  />
                            </div>
                            <div className="form-div"></div>
                            <div className="form-group">
                              <label>Activition ID</label>
                              <Input
                    type="text"
                    className="form-control"
                   
                  />
                            </div>
                            <div className="form-div"></div>
                            <div className="form-group">
                              <label>8Pool ID</label>
                              <Input
                    type="text"
                    className="form-control"
                   
                  />
                            </div>
                            <div className="form-group">
                              <label>8Pool Name</label>
                              <Input
                    type="text"
                    className="form-control"
                   
                  />
                            </div>
                            <div className="form-div"></div>
                            
                            
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
                     
                </Tab.Pane>
                <Tab.Pane eventKey="social">
               
                    
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
                        <small style={{fontSize:10}}>Last Login 5 hours ago</small>
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
