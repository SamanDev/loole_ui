
import React, { Component,useState, useEffect } from "react";
import $ from "jquery";

import { printMatchBlock,printGameBlock,date_edit } from "components/include";

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
const HomeEvents = (prop) => {
  const [currentUser,setCurrentUser] = useState(prop.token);
  
  const [events,setEvents] = useState(prop.events);
  useEffect(() => {
    setEvents(prop.events)
     
    
   },[prop.events]);
  
   useEffect(() => {
    setCurrentUser(prop.token)
     
    
   },[prop.token]);

   const getBlockChallenge = (filtermode,events) => {
    var newItem = []
    if (events) {
     
       events.map((item, i) => {
        if ((item.gameConsole == filtermode || item.gameMode == filtermode || filtermode == 'all') || (item.gameConsole != 'Mobile' && filtermode == 'NoMobile')) {
          //item.players.sort((a, b) => (a.id > b.id) ? 1 : -1)
          
          {item.players.map((player, j) => {
           //if(player.username == currentUser.username && (item.status=='Pending' || item.status=='Ready' || item.status=='InPlay' )){this.props.history.push("/panel/lobby?id="+item.id);}
          })}
        
          var dateEdited = date_edit(item.expire);
      
          var dateExpired = date_locale(dateEdited);
          
          var now = new Date();
          var dateNow = now.toISOString();
          item.expire = date_edit(item.expire);
      item.startTime = date_edit(item.startTime);
      item.finished = date_edit(item.finished);
          
          if(dateExpired<dateNow && item.status !='Pending' && item.status !='InPlay' && item.status !='Ready'){}else{
            //newItem.push(item);
          }
          newItem.push(item);
          
          
         
        } 
      }
      
      )
      return printBlockChallenge(newItem,filtermode)
    }

  }
const getBlockChallengeMobile = (filtermode,f,t,events) => {
  var newItem = []
    if (events) {
     
       events.map((item, i) => {
        if ((item.gameConsole == filtermode || item.gameMode == filtermode || filtermode == 'all') || (item.gameConsole != 'Mobile' && filtermode == 'NoMobile')) {
          //item.players.sort((a, b) => (a.id > b.id) ? 1 : -1)
          
          {item.players.map((player, j) => {
           //if(player.username == currentUser.username && (item.status=='Pending' || item.status=='Ready' || item.status=='InPlay' )){this.props.history.push("/panel/lobby?id="+item.id);}
          })}
        
          var dateEdited = date_edit(item.expire);
      
          var dateExpired = date_locale(dateEdited);
          
          var now = new Date();
          var dateNow = now.toISOString();
          item.expire = date_edit(item.expire);
      item.startTime = date_edit(item.startTime);
      item.finished = date_edit(item.finished);
          
          if(dateExpired<dateNow && item.status !='Pending' && item.status !='InPlay' && item.status !='Ready'){}else{
            //newItem.push(item);
          }
          newItem.push(item);
          
          
         
        } 
      }
      
      )
      return printBlockChallenge(newItem,filtermode)
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
if (!events) {return (
  
      <div className="content">
      <h4 style={{textAlign: "center",height: 370,lineHeight:'330px',color:'gray'}}>Loading Data
<Spinner animation="grow" size="sm" />
<Spinner animation="grow" size="sm" />
<Spinner animation="grow" size="sm" /></h4>
         
        </div>
        
);
}
if (responsive >= 768) {
return (
  
<>

                
              
  </>
);
}else{
  return (
  
    <>
    
                    <Carousel style={{ textAlign:'left',maxWidth:300,margin:'auto'}} controls={false}>
                    
                        {getBlockChallengeMobile('all',0,3,events)}
                    
                     
  </Carousel>
                    
                 
               
      </>
    );
}
}

export default HomeEvents