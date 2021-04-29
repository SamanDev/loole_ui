import React, { Component } from "react";
// react component used to create charts
import ChartistGraph from "react-chartist";
import { Link, useLocation } from "react-router-dom";
// react components used to create a SVG / Vector map
import { VectorMap } from "react-jvectormap";
import AuthService from "services/auth.service";
import userService from "services/user.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import eventBus from "views/eventBus";
import { printMatchBlock ,printProductBlock} from "components/include";

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
  Spinner

} from "react-bootstrap";

import Market from "server/Market";

//const EventList = JSON.parse(userService.getEvents());


class Dashboard extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      events: userService.getCurrentEvent(),
      products: Market.getMarketplace
    };

  }

  componentDidMount() {
  
      
    eventBus.on("eventsData", (event) => {
      // console.log("socket events: "+events);
    
      this.setState({ events: event, isLoading: false });
      console.log("change state: " + this.state.isLoading);
      
    });

  }
  

  render() {
    
    if (!this.state.events.length){
      userService.getEvents();
      
      return <h4 style={{textAlign: "center"}}>Loading 
      <Spinner animation="grow" size="sm" />
      <Spinner animation="grow" size="sm" />
      <Spinner animation="grow" size="sm" /></h4>;
    }
    
    let { events, isLoading,products } = this.state;
    
    events=JSON.parse(events);
    
    const currentUser = AuthService.getCurrentUser();
    var Balance = currentUser.balance;
    if (!Balance) { Balance = 0 }
    //console.log("dash = "+EventList)
    
    console.log('e-l : ' + products.length);
    const getBlockChallenge = (filtermode) => {
      
      if (events != []) {
        return products.map((item, i) => {
         
            return (

              <Col lg="4" xl="3" key={i}>
                {printProductBlock(item)}

              </Col>
            )
         
        }
        )
      }

    }

    return (
      <>

        <Row>
          <Col md="12">
            <Tab.Container
              id="matches-tabs"
              defaultActiveKey="all-match"

            >
              <Nav role="tablist" variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="all-match">All</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="wins-match">My Wins</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="con-match">Expired</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="tour-match">Pending</Nav.Link>
                </Nav.Item>
              </Nav>
              <Card>

                <Card.Body  >

                  <Tab.Content >
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
                        {getBlockChallenge('Expire')}
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="tour-match">
                      <Row>
                        {getBlockChallenge('Pending')}
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
}

export default Dashboard;
