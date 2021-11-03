import React, { useEffect, useState } from "react";
// react component used to create charts
import ChartistGraph from "react-chartist";
import { Link, useLocation } from "react-router-dom";
// react components used to create a SVG / Vector map

import PropTypes from "prop-types";
import { VectorMap } from "react-jvectormap";
import AuthService from "services/auth.service";
import userService from "services/user.service";
import { useUserEvents,useUser } from "services/hooks"
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
function Dashboard(props) {
  const [token,setToken] = useRecoilState(userState);
  
  
  if ( !token) {return  <h4 style={{textAlign: "center"}}>Loading 
  <Spinner animation="grow" size="sm" />
  <Spinner animation="grow" size="sm" />
  <Spinner animation="grow" size="sm" /></h4>;
  }
  
 

    var currentUser = token;
  const { data: eventsGet , isLoading } = useUserEvents()
  
  
  if (isLoading || !eventsGet ) {return  <h4 style={{textAlign: "center"}}>Loading 
  <Spinner animation="grow" size="sm" />
  <Spinner animation="grow" size="sm" />
  <Spinner animation="grow" size="sm" /></h4>;
  }
  var events=JSON.parse(eventsGet);
  
  
  
  
  if (!events) return <p>loading...</p>
  
  
  const getBlockChallenge = (filtermode) => {
    var newItem = []
    if (events != []) {
       events.map((item, i) => {
        if ((filtermode == 'Wins' && item.status == 'Finished') ||(filtermode == 'Expired' && item.status == 'Expired') ||(filtermode == 'Pending' && (item.status == 'Pending' || item.status == 'Ready' || item.status == 'InPlay')) || item.status == filtermode || ('All' == filtermode )) {
          item.players.sort((a, b) => (a.id > b.id) ? 1 : -1)
          
          
          {item.players.map((player, j) => {
           if(player.username == currentUser.username ){blnShow=true}
          })}
          var timestamp = item.expire
          var date = new Date(timestamp);
          //date.setMinutes(date.getMinutes() + item.timeMinute);
          var now = new Date();
          var dateExpired = date.toISOString();
          
           
          var dateNow = now.toISOString();
          
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
              defaultActiveKey="pending-match"

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
