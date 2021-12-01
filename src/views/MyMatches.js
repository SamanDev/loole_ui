import React, { useEffect, useState } from "react";
// react component used to create charts
import ChartistGraph from "react-chartist";
import { Link, useLocation } from "react-router-dom";
// react components used to create a SVG / Vector map

import PropTypes from "prop-types";
import { VectorMap } from "react-jvectormap";
import AuthService from "services/auth.service";
import userService from "services/user.service";
import { useUserEvents,useUser,useAllEventsByStatus } from "services/hooks"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import eventBus from "views/eventBus";
import { printBlockChallenge } from "components/include";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Active  from "components/active.component";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  OverlayTrigger,
  Table,
  Tooltip,
  Container,
  Row,
  Col,
  TabContent,
  TabPane,
  Tab,
  Spinner,
  Alert

} from "react-bootstrap";

function Dashboard(prop) {

  const [key, setKey] = useState(prop.tabkey);
  const [currentUser,setCurrentUser] = useState(prop.token);
  useEffect(() => {
    setKey(prop.tabkey)
     
    
   },[prop.tabkey]);
   useEffect(() => {
    setCurrentUser(prop.token)
     
    
   },[prop.token]);
  const { data: eventsGet , isLoading } = useAllEventsByStatus('All')
  
  
  if (isLoading || !eventsGet ) {return  <h4 style={{textAlign: "center"}}>Loading 
  <Spinner animation="grow" size="sm" />
  <Spinner animation="grow" size="sm" />
  <Spinner animation="grow" size="sm" /></h4>;
  }
  var events=(eventsGet);
  
  
  
  
  if (!events) return <p>loading...</p>
  
  
  const getBlockChallenge = (filtermode) => {
    var newItem = []
    var blnShow = false;
    if (events != []) {
       events.map((item, i) => {
        if ((filtermode == 'Wins' && item.status == 'Finished') ||(filtermode == 'Expired' && item.status == 'Expired') ||(filtermode == 'Pending' && (item.status == 'Pending' || item.status == 'Ready' || item.status == 'InPlay')) || item.status == filtermode || ('All' == filtermode )) {
          item.players.sort((a, b) => (a.id > b.id) ? 1 : -1)
          
          
          {item.players.map((player, j) => {
           if(player.username == currentUser.username ){blnShow=true}
          })}
        
          
          if(!blnShow){}else{
            newItem.push(item);
          }
          
          
         
        } 
      }
      
      )
      return printBlockChallenge(newItem,filtermode)
    }

  }
  
  
    
  
    var Balance = currentUser.balance;
    if (!Balance) { Balance = 0 }
    
  return (
      
        
    <>
    
    <Active token={currentUser}/>

        <Row>
          <Col md="12">
            <Tab.Container
              id="matches-tabs"
              
              activeKey={key}
              onSelect={(k) => prop.handleTabID(k)}
            >
              <Nav role="tablist" variant="tabs">
              <Nav.Item>
                  <Nav.Link eventKey="pending-match">Pending</Nav.Link>
                </Nav.Item>
                
                <Nav.Item>
                  <Nav.Link eventKey="wins-match">My Wins</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="con-match">Expired</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="all-match">All</Nav.Link>
                </Nav.Item>
              </Nav>
              <Card>

                <Card.Body  >

                  <Tab.Content >
                  <Tab.Pane eventKey="pending-match">
                      <Row>
                        {getBlockChallenge('Pending')}
                      </Row>
                    </Tab.Pane>
                  <Tab.Pane eventKey="all-match" >
                    
                      <Row >
                        {getBlockChallenge('All')}
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="wins-match" >
                      <Row >
                        {getBlockChallenge('Wins')}
                      </Row>
                    </Tab.Pane>
                   
                    <Tab.Pane eventKey="con-match">
                      <Row>
                        {getBlockChallenge('Expired')}
                      </Row>
                    </Tab.Pane>
                    
                  </Tab.Content>

                </Card.Body>
              </Card>
            </Tab.Container>
          </Col>
        </Row>


      </>
    );
  
}

export default Dashboard;
