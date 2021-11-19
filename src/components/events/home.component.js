
import { useAllEventsByStatus,useAllEvents } from "services/hooks"
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
const HomeEvents = () => {
  const { data: eventsGet  } = useAllEventsByStatus('All')

  
  if ( !eventsGet) {return  <div className= "container">
  <h4 style={{textAlign: "center",marginTop:300,color:'#fff'}}>Loading 
  <Spinner animation="grow" size="sm" />
  <Spinner animation="grow" size="sm" />
  <Spinner animation="grow" size="sm" /></h4>
 
</div>;}
  var events=(eventsGet);
  const getBlockChallenge = (filtermode,f,t) => {
        
    if (events != []) {
      return events.map((item, i) => {
        if ((item.gameConsole == filtermode || item.gameMode == filtermode || filtermode == 'all') || (item.gameConsole != 'Mobile' && filtermode == 'NoMobile')) {
            if (item.status != 'Expired' && item.status != 'Canceled' ){
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
    }
      )
    }

  }
const getBlockChallengeMobile = (filtermode,f,t) => {
  
  if (events != []) {
    return events.map((item, i) => {
      if ((item.gameConsole == filtermode || item.gameMode == filtermode || filtermode == 'all') || (item.gameConsole != 'Mobile' && filtermode == 'NoMobile')) {
        if (item.status != 'Expired' && item.status != 'Canceled' ){

        
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

          <Carousel.Item interval={5000} key={i}>
            {printMatchBlock(item)}

          </Carousel.Item>
        )
        }
      } else {
        return null;
      }
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
var responsive = $(window).width();
if (responsive >= 768) {
return (
  
<>

                <Carousel>
                <Carousel.Item interval={5000}><Row >
                    {getBlockChallenge('all',0,3)}
                  </Row></Carousel.Item>
                  <Carousel.Item interval={5000}><Row >
                    {getBlockChallenge('all',3,6)}
                  </Row></Carousel.Item>
</Carousel>
              
  </>
);
}else{
  return (
  
    <>
    
                    <Carousel style={{ textAlign:'left',maxWidth:300,margin:'auto'}} controls={false}>
                    
                        {getBlockChallengeMobile('all',0,3)}
                    
                     
  </Carousel>
                    
                 
               
      </>
    );
}
}

export default HomeEvents