import React, { Component } from "react";
import $ from "jquery";
import Countdown from "react-countdown";
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
  Spinner
} from "react-bootstrap";
import { useAllEvents,useUserProfile } from "services/hooks"
import Profile from "views/ProfileUser";
function profile() {
  var currentUser = window.location.href.split('user/')[1].replace('%20',' ');
  const { data: userGet } = useUserProfile(currentUser)
  //const token = userGet;
  
  if ( !userGet) {return  <div className="parallax filter-gradient gray section-gray" data-color="red">
  <div className="parallax-background">
      <img className="parallax-background-image" src="assets/img/showcases/showcase-1/bg.jpg"/>
  </div>
  <div className= "container">
  <h4 style={{textAlign: "center",marginTop:300,color:'#fff'}}>Loading 
  <Spinner animation="grow" size="sm" />
  <Spinner animation="grow" size="sm" />
  <Spinner animation="grow" size="sm" /></h4>
  </div>
</div>;}
    return (
    <>
  <div
        
      >
    
      <Profile token={userGet}/>
	
		
        <div
          className="full-page-background"
          style={{
            backgroundImage:
              "url(" +
              require("assets/img/bg.jpg").default +
              ")",
          }}
        ></div>
      </div>
      </>
    );
  
}

export default (profile) ;