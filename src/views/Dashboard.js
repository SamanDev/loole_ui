import React, { useEffect, useState } from "react";
// react component used to create charts
import ChartistGraph from "react-chartist";
import { Link, useLocation } from "react-router-dom";
// react components used to create a SVG / Vector map

import PropTypes from "prop-types";
import { VectorMap } from "react-jvectormap";
import AuthService from "services/auth.service";
import userService from "services/user.service";
import { useAllEvents,useUser,useAllEventsByStatus } from "services/hooks"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import eventBus from "views/eventBus";
import { printBlockChallenge,date_locale,date_edit } from "components/include";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Active  from "components/active.component";

import {useQuery,useMutation,useQueryClient,QueryClient,QueryClientProvider, } from 'react-query'
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
function Dashboard(prop) {
  const [key, setKey] = useState(prop.tabkey);
  const [currentUser,setCurrentUser] = useState(prop.token);
  
  const [events,setEvents] = useState(prop.events);
  
  useEffect(() => {
    setEvents(prop.events)
     
    
   },[prop.events]);
   useEffect(() => {
    setKey(prop.tabkey)
     
    
   },[prop.tabkey]);
   useEffect(() => {
    setCurrentUser(prop.token)
     
    
   },[prop.token]);
  
  
  
  const getBlockChallenge = (filtermode,events) => {
    var newItem = []
    if (events) {
     
       events.map((item, i) => {
        if ((item.gameConsole == filtermode || item.gameMode == filtermode || filtermode == 'all') || (item.gameConsole != 'Mobile' && filtermode == 'NoMobile')) {
          item.players.sort((a, b) => (a.id > b.id) ? 1 : -1)
          
          {item.players.map((player, j) => {
           //if(player.username == currentUser.username && (item.status=='Pending' || item.status=='Ready' || item.status=='InPlay' )){this.props.history.push("/panel/lobby?id="+item.id);}
          })}
        
          var dateEdited = date_edit(item.expire);
      
          var dateExpired = date_locale(dateEdited);
          
          var now = new Date();
          var dateNow = now.toISOString();
          
          if(dateExpired<dateNow && item.status !='Pending' && item.status !='InPlay' && item.status !='Ready'){}else{
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
        <Col lg="3" xs="6">
          <Card className="card-stats">
            <Card.Body>
              <Row>
                <Col xs="4">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-tap-01 text-warning"></i>
                  </div>
                </Col>
                <Col xs="8">
                  <div className="numbers">
                    <p className="card-category">Total Match</p>
                    <Card.Title as="h4">150</Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
              <div className="stats">
                <i className="nc-icon nc-simple-add icon-bold mr-1"></i>
                <Link to={'/panel/create'}>Create a Match</Link>

              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" xs="6">
          <Card className="card-stats">
            <Card.Body>
              <Row>
                <Col xs="4">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-bank text-success"></i>
                  </div>
                </Col>
                <Col xs="8">
                  <div className="numbers">
                    <p className="card-category">Balance</p>
                    <Card.Title as="h4"><img
                          alt="loole coin"
                         
                          src="/assets/images/dollar.svg"
                        ></img> {Number.parseFloat(currentUser.balance).toFixed(2)}</Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
              <div className="stats">
                <i className="nc-icon nc-bank icon-bold mr-1"></i>
                <Link to={'/panel/cashier'}>Go to Cashier</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" xs="6">
          <Card className="card-stats">
            <Card.Body>
              <Row>
                <Col xs="5">
                <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-bank text-muted"></i>
                  </div>
                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category">Points</p>
                    <Card.Title as="h4"><img
                          alt="loole coin"
                         
                          src="/assets/images/point.svg"
                        ></img> {Number.parseFloat(currentUser.point).toFixed(0)}</Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
              <div className="stats">
                <i className="nc-icon  nc-notification-70 icon-bold mr-1"></i>
                <Link to={'/panel/rewards'}>Go to Rewards</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col lg="3" xs="6">
          <Card className="card-stats">
            <Card.Body>
              <Row>
                <Col xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className="nc-icon nc-favourite-28 text-primary"></i>
                  </div>
                </Col>
                <Col xs="7">
                  <div className="numbers">
                    <p className="card-category">% Trust</p>
                    <Card.Title as="h4">%100</Card.Title>
                  </div>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
              <div className="stats">
                <i className="fas fa-redo mr-1"></i>
                Update now
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>



      <Row>
        <Col md="12" style={{overflow:'hidden'}}>
          <Tab.Container
            id="matches-tabs"
         
            activeKey={key}
            onSelect={(k) => prop.handleTabID(k)}
          >
            <div style={{width:'90vw',overflow:'auto'}}>
            <Nav role="tablist" variant="tabs" style={{minWidth:600}}>
              <Nav.Item>
                <Nav.Link eventKey="all-match">All</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="mob-match">Mobile</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="con-match">Console</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tour-match">Tournament</Nav.Link>
              </Nav.Item>
             
            </Nav>
            </div>
            <Card>

              <Card.Body  >

                <Tab.Content >
                  <Tab.Pane eventKey="all-match" >
                    <Row >
                      {getBlockChallenge('all',events)}
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="mob-match">
                    <Row>
                      {getBlockChallenge('Mobile',events)}
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="con-match">
                    <Row>
                      {getBlockChallenge('NoMobile',events)}
                    </Row>
                  </Tab.Pane>
                  <Tab.Pane eventKey="tour-match">
                    <Row>
                      {getBlockChallenge('Tournament',events)}
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

export default (Dashboard);
