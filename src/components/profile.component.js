import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import {
  Badge,
  Button,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import OldUser  from "components/olduser.component";
export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: this.props.token
    };
  }
  componentWillReceiveProps(newProps) {
    
    this.setState({ currentUser: newProps.token });
    
    
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <Container fluid>
        <div className="section-image" data-image="../../assets/img/bg5.jpg">
          {/* you can change the color of the filter page using: data-color="blue | purple | green | orange | red | rose " */}
          <Container>
            <Row>
              <Col md="8" sm="6">
      <div className="container">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </div>: null}
      </div>
      <Card className={"card-login " }>
                 
                  <Card.Body>
                  <OldUser/>
                  </Card.Body>
                  
                </Card>
      
      <Form action="" className="form hide" method="">
                  <Card>
                    <Card.Header>
                      <Card.Header>
                        <Card.Title as="h4">Edit Profile</Card.Title>
                      </Card.Header>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col className="pr-1" md="5">
                          <Form.Group>
                            <label>Company (disabled)</label>
                            <Form.Control
                              defaultValue="Creative Code Inc."
                              disabled
                              placeholder="Company"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="px-1" md="3">
                          <Form.Group>
                            <label>Username</label>
                            <Form.Control
                              defaultValue="michael23"
                              placeholder="Username"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="pl-1" md="4">
                          <Form.Group>
                            <label htmlFor="exampleInputEmail1">
                              Email address
                            </label>
                            <Form.Control
                              placeholder="Email"
                              type="email"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="6">
                          <Form.Group>
                            <label>First Name</label>
                            <Form.Control
                              defaultValue="Mike"
                              placeholder="Company"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="pl-1" md="6">
                          <Form.Group>
                            <label>Last Name</label>
                            <Form.Control
                              defaultValue="Andrew"
                              placeholder="Last Name"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <Form.Group>
                            <label>Address</label>
                            <Form.Control
                              defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                              placeholder="Home Address"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="4">
                          <Form.Group>
                            <label>City</label>
                            <Form.Control
                              defaultValue="Mike"
                              placeholder="City"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="px-1" md="4">
                          <Form.Group>
                            <label>Country</label>
                            <Form.Control
                              defaultValue="Andrew"
                              placeholder="Country"
                              type="text"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                        <Col className="pl-1" md="4">
                          <Form.Group>
                            <label>Postal Code</label>
                            <Form.Control
                              placeholder="ZIP Code"
                              type="number"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <Form.Group>
                            <label>About Me</label>
                            <Form.Control
                              cols="80"
                              defaultValue="Mike"
                              placeholder="Here can be your description"
                              rows="4"
                            ></Form.Control>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Button
                        className="btn-fill pull-right"
                        type="submit"
                        variant="info"
                      >
                        Update Profile
                      </Button>
                      <div className="clearfix"></div>
                    </Card.Body>
                  </Card>
                </Form>
              </Col>
              <Col md="4">
                <Card className="card-user">
                  <Card.Header className="no-padding">
                    <div className="card-image">
                      <img
                        alt="..."
                        src={
                          require("assets/img/bg.jpg").default
                        }
                      ></img>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div className="author">
                    <Avatar  color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} name={currentUser.username} />
            
                        <img
                          alt="..."
                          className="avatar border-gray "
                          style={{opacity:1}}
                          src={require("assets/img/avatar.png").default}
                        ></img>
                        
                    </div>
                    <p className="card-description text-center">
                    <Card.Title as="h5">{currentUser.username}</Card.Title>
                      
                      <p className="card-description">{currentUser.email}</p>
                    </p>
                  </Card.Body>
                  
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
    );
  }
}
