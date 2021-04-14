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
import { printMatchBlock } from "components/include";

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



//const EventList = JSON.parse(userService.getEvents());


class Dashboard extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      events: [], //JSON.parse(localStorage.getItem('events')),
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
    
    let { events, isLoading } = this.state;
    events=JSON.parse(events);
   
    const currentUser = AuthService.getCurrentUser();
    var Balance = currentUser.balance;
    if (!Balance) { Balance = 0 }
    //console.log("dash = "+EventList)
    
    console.log('e-l : ' + events);
    const getBlockChallenge = (filtermode) => {
      
      if (events != []) {
        return events.map((item, i) => {
          if ((item.gameConsole == filtermode || item.gameMode == filtermode || filtermode == 'all') || (item.gameConsole != 'Mobile' && filtermode == 'NoMobile')) {
            item.players.sort((a, b) => (a.id > b.id) ? 1 : -1)
            {item.players.map((player, j) => {
             //if(player.username == currentUser.username && (item.status=='Pending' || item.status=='Ready' || item.status=='InPlay' )){this.props.history.push("/panel/lobby?id="+item.id);}
            })}
            var timestamp = item.expire
            var date = new Date(timestamp);
            //date.setMinutes(date.getMinutes() + item.timeMinute);
            var now = new Date();
            var dateExpired = date.toISOString();
            
             
            var dateNow = now.toISOString();
            
            if(dateExpired<dateNow && item.status !='Pending' && item.status !='InPlay' && item.status !='Ready')return null
            return (

              <Col lg="4" xl="3" key={i}>
                {printMatchBlock(item)}

              </Col>
            )
          } else {
            return null;
          }
        }
        )
      }

    }

    return (
      <>

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
                      <Card.Title as="h4">$ {Balance}</Card.Title>
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
                      <i className="nc-icon nc-satisfied text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">% Win</p>
                      <Card.Title as="h4">%23</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock-o mr-1"></i>
                  In the last hour
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
              defaultActiveKey="all-match"

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
                        {getBlockChallenge('all')}
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="mob-match">
                      <Row>
                        {getBlockChallenge('Mobile')}
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="con-match">
                      <Row>
                        {getBlockChallenge('NoMobile')}
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="tour-match">
                      <Row>
                        {getBlockChallenge('Tournament')}
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
