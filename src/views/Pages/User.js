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
} from "react-bootstrap";
import Profile from "views/ProfileUser";
export default class Landing extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    
  }
  render() {
	const renderer = ({ days,hours, minutes, seconds, completed }) => {
		if (completed) {
		  // Render a complete state
		  return <Completionist />;
		} else {
		  // Render a countdown
		  return (
			<span>
			  {days} <small>days</small> {hours}:{minutes}:{seconds}
			</span>
		  );
		}
	  };
    return (
    <>
  <div
        
      >
    
      <Profile/>
	
		
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
}
