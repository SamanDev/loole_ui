import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "services/auth.service";
import Avatar from 'react-avatar';
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
import Notifications  from "views/Components/Notifications";
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.handleRefresh = this.handleRefresh.bind(this)
    
    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }
  handleRefresh = () => {

    this.setState({ redirect: null,
      
      currentUser: { username: "" }});
      const currentUserew = AuthService.getCurrentUser();

      if(currentUserew){
        this.setState({ 
          currentUser: currentUserew, userReady: true,successful: true,
          message: "hi"
        })
       }
    
  };
  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    
    if(currentUser){
      this.setState({ 
        currentUser: currentUser, userReady: true
      })
     }
    
  }

  render() {
   
    const { currentUser } = this.state;
    var str = currentUser.username;
    var res = str.substring(0, 1);
    res  = res + ' '+ str.substring(1, 2);
    return (
      <Container fluid>
        
        <div className="section-image" data-image="../../assets/img/bg5.jpg">
          {/* you can change the color of the filter page using: data-color="blue | purple | green | orange | red | rose " */}
          {(this.state.userReady) ?
          <Container>
            <Row>
              <Col md="8" sm="6">
      <div className="container">
       
        <div>
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <Card className={"card-login " }>
                 
                 <Card.Body>
                 <OldUser  data={this.state}  handleRefresh = {this.handleRefresh}/>
                 </Card.Body>
                 
               </Card>
      </div>
      </div>
     
      
      
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
                    <div className="author  avatar">
                      
                    <Avatar size="114" round={true} name={res} />
            
                        
                    </div>
                   
                    <Card.Title as="h5" className="card-description text-center">{currentUser.username}</Card.Title>
                      
                    <div className="card-description text-center">{currentUser.email}</div>
                    {(currentUser.instagram) ?
                    <div className="card-description text-center"> <i className="nc-icon nc-single-02" />{currentUser.instagram}</div>
                    : null}
                    
                  </Card.Body>
                  
                </Card>
              </Col>
            </Row>
          </Container>
          : null}
        </div>
      </Container>
    );
  }
}
