import React, { Component } from "react";
import $ from "jquery";
import Countdown from "react-countdown";
import userService from "services/user.service";
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

import { useAllEvents } from "services/hooks"
const Landing = () => {
  const { data: eventsGet , isLoading } = useAllEvents()

  

  if (isLoading || !eventsGet) {return  <div className="parallax filter-gradient gray section-gray" data-color="red">
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
  var events=JSON.parse(eventsGet);
  var _game = window.location.href.split('game/')[1].replace('%20',' ')

    const getBlockGames = () => {
      
      if (Games != []) {
        return Games.games.map((item, i) => {
         
            
          
            
            return (
             
              <Carousel.Item key={i}>
              {printGameBlock(item)}
  
              </Carousel.Item>
            )
            
        }
        )
      }
  
    }
    const getBlockChallenge = (filtermode,f,t) => {
      
      if (events != []) {
        return events.map((item, i) => {
          if (item.gameName == filtermode) {
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
            
            if(i>=f  &&  i<t){
            
            return (
  
              <Col md="3" xl="4" key={i}>
                {printMatchBlock(item)}
  
              </Col>
            )
            }
          } else {
            return null;
          }
        }
        )
      }
  
    }
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
    const elements = ['1', '2-4_01', '2-4_02','2-4_03'];
    
    return (
      
    <>
    
    <div className="wrapper">
            <div className="parallax filter-gradient orange section-gray" data-color="red">
                <div className="parallax-background">
                    <img className="parallax-background-image" src={require("assets/images/games/"+_game+".jpg").default}/>
                </div>
                <div className= "container">
                    <div className="row">
                        <div className="col-md-7">
                            <div className="description">
                                <h2>{_game}</h2>
                               
              
                                <br/>
                                <p>Play {_game} for Real Money.</p>
                                <p>Play {_game} for Real Money.</p>
                            </div>
                            <div className="buttons">
                                <button className="btn btn-fill btn-danger" style={{marginRight:10}}>
                                Play {_game} for Cash
                                </button> 
                                <button className="btn btn-fill btn-info">
                                 {_game} Tournament 
                                </button>
                              
                            </div>
                        </div>
                        <div className="col-md-5  hidden-xs">
                            <div className="parallax-image">
                                <img className="phone" src="/assets/img/showcases/showcase-1/iphone.png"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section section-gray"  style={{margin:0}}>
            <div className="container">
                    <h4 className="header-text text-center">Is it Real Cash?</h4>
                    <p className="header-text text-center">Absolutly YES! Cash on the table.</p>
                    <Row >
                    {getBlockChallenge(_game,0,3)}
                      </Row>
                    
                 
                    </div>
            </div>
            <div className="section section-game " style={{padding: 0}}>
                <div className="parallax filter-gradient red" data-color="orange"  >
                    <div className="parallax-background">
                        <img className="parallax-background-image" src="/assets/img/bg.jpg"/>
                    </div>
                    
                    <GameSlide/>
                    
                </div>
            </div>
            
         
        </div>
      </>
    );
  
}
export default Landing