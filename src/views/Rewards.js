import React, { Component } from "react";
// react component used to create charts
import ChartistGraph from "react-chartist";
import { Link, useLocation } from "react-router-dom";
// react components used to create a SVG / Vector map
import { VectorMap } from "react-jvectormap";
import AuthService from "services/auth.service";
import userService from "services/user.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import eventBus from "views/eventBus";
import { printMatchBlock,getGroupBadge } from "components/include";

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

//const EventList = JSON.parse(userService.getEvents());

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      events: null
    };
  }

  
  componentDidMount() {
  
      
    eventBus.on("eventsData", (event) => {
      // console.log("socket events: "+events);
    
      this.setState({ events: event, isLoading: false });
     // console.log("change state: " + this.state.isLoading);
      
    });

  }
  

  render() {
    if (!this.state.events){
      userService.getEvents();
      
      return <h4 style={{textAlign: "center"}}>Loading 
      <Spinner animation="grow" size="sm" />
      <Spinner animation="grow" size="sm" />
      <Spinner animation="grow" size="sm" /></h4>;
    }

    let { events, isLoading } = this.state;
    events = JSON.parse(events);

    const currentUser = AuthService.getCurrentUser();
    var Balance = currentUser.balance;
    if (!Balance) {
      Balance = 0;
    }
    //console.log("dash = "+EventList)

    console.log("e-l : " + events);
    const getBlockChallenge = (filtermode) => {
      if (events != []) {
        return events.map((item, i) => {
          if (
            item.gameConsole == filtermode ||
            item.gameMode == filtermode ||
            filtermode == "all" ||
            (item.gameConsole != "Mobile" && filtermode == "NoMobile")
          ) {
            item.players.sort((a, b) => (a.id > b.id ? 1 : -1));
            {
              item.players.map((player, j) => {
                //if(player.username == currentUser.username && (item.status=='Pending' || item.status=='Ready' || item.status=='InPlay' )){this.props.history.push("/panel/lobby?id="+item.id);}
              });
            }
            var timestamp = item.expire;
            var date = new Date(timestamp);
            //date.setMinutes(date.getMinutes() + item.timeMinute);
            var now = new Date();
            var dateExpired = date.toISOString();

            var dateNow = now.toISOString();

            if (
              dateExpired < dateNow &&
              item.status != "Pending" &&
              item.status != "InPlay" &&
              item.status != "Ready"
            )
              return null;
            return (
              <Col lg="4" xl="3" key={i}>
                {printMatchBlock(item)}
              </Col>
            );
          } else {
            return null;
          }
        });
      }
    };

    return (
      <>
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
                Maximise your daily earning by taking advantage of Repeat.gg's bonuses and start earning free Points every day. You can earn Points by logging in, playing games, inviting friends and many other ways. Then all you have to do is go to the market place and spend your spare Points on plenty of great things. It's that simple!
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
https://www.repeat.gg/i/salidesign

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
                Maximize your profits and earn big daily at Repeat.gg. By simply logging in, you can earn big!
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
}

export default Dashboard;
