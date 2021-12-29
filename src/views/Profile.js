import React, { useEffect, useState  } from "react";
import Avatar from 'react-avatar';

import Active  from "components/active.component";


import ProfileForm  from "components/profile/profile.component"; 
import TagsForm  from "components/profile/tags.component"; 
import SocialForm  from "components/profile/social.component"; 
// react-bootstrap components
import {
  Row,
  Col,
} from "react-bootstrap";
import {
  userDetails} from "components/include";
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
