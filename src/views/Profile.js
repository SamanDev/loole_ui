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
import SocialForm  from "components/profile/social.component"; 
// react-bootstrap components
import {
  Badge,
  Alert,
  Button,
 
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
  userDetails,isJson
} from "components/include";
import { Tab, Card } from 'semantic-ui-react'

function profile(prop) {
  const [myState, setMyState] = useState(prop.myState)
  useEffect(() => {
    setMyState(prop.myState)
}, [prop.myState]);
const key = prop.findStateId(myState,'keyProfile');
var currentUser = prop.findStateId(myState,'currentUser');

  
  const panes = [
    {id:1, menuItem: 'Profile', render: () => <Tab.Pane><ProfileForm {...prop}/></Tab.Pane> },
    {id:2, menuItem: 'Tags', render: () => <Tab.Pane><TagsForm {...prop}/><SocialForm {...prop}/></Tab.Pane>},
    
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
              <Tab panes={panes} className="maxheight" defaultActiveIndex={key} {...prop} onTabChange={(e, data) => {prop.onUpdateItem('keyProfile',data.activeIndex)}}  />

            </Col>
              <Col md="4">
              <a href={"/user/"+currentUser.username}  target="_blank">
              <Card>
                <div style={{height:160,overflow: 'hidden'}}><Avatar size="290" title={currentUser.username} name={res} style={{position: 'relative',top:-55}} /></div>
              
    <Card.Content>
     
   
      <Card.Description>
      {userDetails(currentUser )}
      </Card.Description>
    </Card.Content>
    
  </Card>
  </a>
              </Col>
            </Row>
     
    </>
  );
}

export default (profile) ;
