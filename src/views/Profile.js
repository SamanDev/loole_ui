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
import { Tab } from 'semantic-ui-react'

function profile(prop) {
  const [myState, setMyState] = useState(prop.myState)
  useEffect(() => {
    setMyState(prop.myState)
}, [prop.myState]);
const key = prop.findStateId(myState,'keyProfile');
var currentUser = prop.findStateId(myState,'currentUser');

  const handlecSetInstagram = (game,platform) => {
    const resetPw2= async () => {
      const swalval = await Swal.fire(getModalTag(game));

      let v = (swalval && swalval.value) || swalval.dismiss;
     
      if (v) {
        if (v.tagid) {
          
        
            
          handleSaveSocial(platform,v.tagid);
              
            }
            
          }
          
          //setformdata(swalval);
          
        
      }
      resetPw2();
    
    
    }
    const handleSaveSocial = (accountName,accountId) => {
     
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
      
          userService.saveSocial(accountName,accountId)
            .then(
              
              (response) => {
                let jsonBool = isJson(response.data);

                if (jsonBool) {
                  Swal.fire("", "Data saved successfully.", "success")
                } else {
                  Swal.fire("", response.data, "error");
                }
                
      },(error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        Swal.fire("Error!", resMessage, "error");
      })
  }
  const panes = [
    {id:1, menuItem: 'Profile', render: () => <Tab.Pane style={{maxHeight: 'calc(100vh - 180px)', overflow: 'auto'}}><ProfileForm {...prop}/></Tab.Pane> },
    {id:2, menuItem: 'Game Tags', render: () => <Tab.Pane style={{maxHeight: 'calc(100vh - 180px)', overflow: 'auto'}}><Card className="card-plain" style={{margin: -10}}>
    <Card.Header>
       <Card.Title>Game Tags</Card.Title></Card.Header>
      <Card.Body>
<TagsForm token={currentUser} {...prop}/>

</Card.Body>
      
      </Card></Tab.Pane> },
    {id:3, menuItem: 'Social Accounts', render: () => <Tab.Pane><Form
           
            
    >
                <Card className="card-plain card-social" style={{margin: -10}}>
                <Card.Header>
                   <Card.Title>Game Tags</Card.Title></Card.Header>
                  <Card.Body>
                  
                  <Card onClick={() => handlecSetInstagram('Social - Instagram','Instagram')}>
 
    <Card.Body>
    <FontAwesomeIcon  icon={faInstagram} style={{color: '#e95950'}}/>  
    {getSocialTag('Instagram',currentUser.userSocialAccounts)}
    </Card.Body>
    </Card>
    <Card  onClick={() => handlecSetInstagram('Social - Twitch','Twitch')}>
 
    <Card.Body>
    <FontAwesomeIcon  icon={faTwitch} style={{color: '#6441a5'}} /> {getSocialTag('Twitch',currentUser.userSocialAccounts)}
    </Card.Body>
    </Card>
    <Card  onClick={() => handlecSetInstagram('Social - Youtube','Youtube')}>
 
    <Card.Body>
    <FontAwesomeIcon  icon={faYoutube} style={{color: '#FF0000'}}/>  {getSocialTag('Youtube',currentUser.userSocialAccounts)}
    </Card.Body>
    </Card>
    <Card  onClick={() => handlecSetInstagram('Social - Twitter','Twitter')}>
 
    <Card.Body>
    <FontAwesomeIcon  icon={faTwitter} style={{color: '#00acee'}} />  {getSocialTag('Twitter',currentUser.userSocialAccounts)}
    </Card.Body>
    </Card>
                    
                  </Card.Body>
                 
                </Card>
                </Form></Tab.Pane> },
    
  ] 
    
        var str = currentUser.username;
        var res = str.substring(0, 1);
        res  = res + ' '+ str.substring(1, 2);
   
   // if (currentUser.country.value && currentUser.country.value !=  flag){setFlag(currentUser.country.value)}
   
  return (
    
    <>
    <Active {...prop}/>
    
      <Row>
              <Col md="8" sm="6">
              <Tab panes={panes} defaultActiveIndex={key} {...prop} onTabChange={(e, data) => {prop.onUpdateItem('keyProfile',data.activeIndex)}}  />

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

export default (profile) ;
