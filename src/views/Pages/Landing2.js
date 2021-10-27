import React, { Component } from "react";
import $ from "jquery";
import Countdown from "react-countdown";
import userService from "services/user.service";
import authService from "services/auth.service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import eventBus from "views/eventBus";
import { printMatchBlock,printGameBlock } from "components/include";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Media,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Spinner,
  Carousel
} from "react-bootstrap";
import GameSlide from "components/GameSlide";
export default class Landing extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      events: userService.getCurrentEvent(),
      serverCheck: authService.serverCheck()
    };

  }

  componentDidMount() {
  
      
    eventBus.on("eventsData", (event) => {
     // alert("socket events: "+event);
    
      this.setState({ events: event, isLoading: false });
      //console.log("change state: " + this.state.isLoading);
      
    });

  }
  
  render() {
    if (!this.state.serverCheck){
        authervice.serverCheck();
        
        return  <div className="parallax filter-gradient gray section-gray" data-color="red">
        <div className="parallax-background">
            <img className="parallax-background-image" src="assets/img/showcases/showcase-1/bg.jpg"/>
        </div>
        <div className= "container">
        <h4 style={{textAlign: "center",marginTop:300,color:'#fff'}}>Loading 
        <Spinner animation="grow" size="sm" />
        <Spinner animation="grow" size="sm" />
        <Spinner animation="grow" size="sm" /></h4>
        </div>
    </div>;
      
      }
      if (!this.state.events){
        userService.getEvents();
        
        return  <div className="parallax filter-gradient gray section-gray" data-color="red">
        <div className="parallax-background">
            <img className="parallax-background-image" src="assets/img/showcases/showcase-1/bg.jpg"/>
        </div>
        <div className= "container">
        <h4 style={{textAlign: "center",marginTop:300,color:'#fff'}}>Loading 
        <Spinner animation="grow" size="sm" />
        <Spinner animation="grow" size="sm" />
        <Spinner animation="grow" size="sm" /></h4>
        </div>
    </div>;
      }
      let { events, isLoading } = this.state;
      events=JSON.parse(events);
      
      
  }
}
