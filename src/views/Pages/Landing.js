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
        className="full-page section-image"
        data-color="azure"
        data-image={require("assets/img/bg.jpg").default}
      >
        <div className="content " style={{fontSize:50,'color':'#fff','position': 'relative',zIndex: '23'}}>
		<Container className="text-center">
		<Countdown date={'2021-05-01T12:00:00'} renderer={renderer} />
		<p>Until to reopening LooleApp</p>
		</Container>
    <Container className="text-center">
    <h2 >With Loole App you can make money from your games skils</h2>
<p>Now gaming is not just about spending time, it is about making money and having fun.<br/>Any gamer or player who wants to make money from his skill must install the Loole app on his phone because you can make money with the Loole. He only plays with players around the world who claim to be like you.<br/>How're you? The Loole introduces the players to each other and puts my pair of money in a safe place. After the game, the winner sends a video according to the Loole guide to prove his victory and takes his money.<br/>Also, there is no operator for deposit and withdrawal and everything is instant and automatic.</p>
</Container>
		</div>
		
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
