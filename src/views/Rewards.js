import React, { Component,useState,useEffect } from "react";
// react component used to create charts
import ChartistGraph from "react-chartist";
import { Link, useLocation } from "react-router-dom";
// react components used to create a SVG / Vector map
import { VectorMap } from "react-jvectormap";
import AuthService from "services/auth.service";
import userService from "services/user.service";
import { useAllEvents,useUser } from "services/hooks"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import eventBus from "views/eventBus";
import { printMatchBlock,getGroupBadge } from "components/include";
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
  ListGroup
} from "react-bootstrap";

function Dashboard(prop) {
  const [myState, setMyState] = useState(prop.myState)
  useEffect(() => {
    setMyState(prop.myState)
}, [prop.myState]);

const currentUser = prop.findStateId(myState,'currentUser');
  
  
    var Balance = currentUser.balance;
    if (!Balance) {
      Balance = 0;
    }
    //console.log("dash = "+EventList)

    
    

    return (
      <>
      <Active {...prop}/>
        <Row>
        <Col sm="12">
            <Card>
              <Card.Header >
              <img
                            alt="loole Point"
                           
                            src="/assets/images/Point.svg"
                            style={{float:'left',marginRight:10,width:80}}
                          ></img>
                <Card.Title as="h4"> Earn Free Points!</Card.Title>
                <p className="card-category">
                Maximise your daily earning by taking advantage of loole.gg's bonuses and start earning free Points every day. You can earn Points by logging in, playing games, inviting friends and many other ways. Then all you have to do is go to the market place and spend your spare Points on plenty of great things. It's that simple!
                </p>
              </Card.Header>

              <Card.Body></Card.Body>
            </Card>
          </Col>
          <Col sm="7" md="8">
            <Card>
              <Card.Header className="card-stats">
              <div className="icon-big icon-warning" style={{float: 'left',padding:'0 15px'}}>
                      <i className="nc-icon nc-tap-01 text-warning"></i>
                    </div>
                <Card.Title as="h4">Invite A Friend</Card.Title>
                <p className="card-category">
                  When a friend you have invited plays their first challenge you
                  will receive <img
                            alt="loole Point"
                           
                            src="/assets/images/Point.svg"
                            className="Pointicon"
                          ></img> 1,000 and they will receive <img
                          alt="loole Point"
                         
                          src="/assets/images/Point.svg"
                          className="Pointicon"
                        ></img> 500. Then for every
                  challenge they play on the site you get an extra <img
                            alt="loole Point"
                           
                            src="/assets/images/Point.svg"
                            className="Pointicon"
                          ></img> 20 per game
                  they play for life.
                </p>
              </Card.Header>

              <Card.Body>
                <p className="text-center">Share your unique invite link:<br/>
https://loole.gg/i/{currentUser.username}

</p>

<button className="btn-outline btn-block btn-primary" variant="danger">VIEW DETAILED EARNINGS</button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm="5" md="4">
          <Card>
              <Card.Header>
                <Card.Title as="h4">Daily Rewards</Card.Title>
                <p className="card-category">
                Maximize your profits and earn big daily at loole.gg. By simply logging in, you can earn big!
                </p>
              </Card.Header>

              <ListGroup variant="flush">
    <ListGroup.Item className="d-flex justify-content-between align-items-center">Compete in a Points tournament {getGroupBadge('Point','20','small right')}</ListGroup.Item>
    <ListGroup.Item className="d-flex justify-content-between align-items-center">Compete in a real money tournament {getGroupBadge('Point','100','small right')}</ListGroup.Item>
    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
  </ListGroup>
            </Card>
          </Col>
        </Row>

      </>
    );
  
}

export default Dashboard;
