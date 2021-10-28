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

const getBlockChallenge = (products,filtermode) => {
      
 
    return products.map((item, i) => {
     if (item.name.indexOf(filtermode) > -1){
      return (

        <Col lg="4" xl="3" key={i}>
          {printProductBlock(item)}

        </Col>
      )
     }
        
     
    }
    )
  

}


function Dashboard(props) {
  const [token,setToken] = useRecoilState(userState);
  const products = Market.getMarketplace
  
  if (!token) {return  <h4 style={{textAlign: "center"}}>Loading 
  <Spinner animation="grow" size="sm" />
  <Spinner animation="grow" size="sm" />
  <Spinner animation="grow" size="sm" /></h4>;
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
                  <Nav.Link eventKey="wins-match">Amazon</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="con-match">PSN</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="tour-match">XBox</Nav.Link>
                </Nav.Item>
              </Nav>
              <Card>

                <Card.Body  >

                  <Tab.Content >
                  <Tab.Pane eventKey="all-match" >
                      <Row >
                        {getBlockChallenge(products,' ')}
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="wins-match" >
                      <Row >
                        {getBlockChallenge(products,'Amazon')}
                      </Row>
                    </Tab.Pane>
                   
                    <Tab.Pane eventKey="con-match">
                      <Row>
                        {getBlockChallenge(products,'PSN')}
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="tour-match">
                      <Row>
                        {getBlockChallenge(products,'Xbox')}
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
