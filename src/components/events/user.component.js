
import React, { Component,useState, useEffect } from "react";
import $ from "jquery";

import { printBlockChallenge,date_locale,date_edit } from "components/include";
import { Tab,Card } from 'semantic-ui-react'
// react-bootstrap components
import {
  Badge,
  Button,
 
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
import Moment from "moment";
var moment = require("moment");
const HomeEvents = (prop) => {
  const [myState, setMyState] = useState(prop.myState)
  useEffect(() => {
    setMyState(prop.myState)
}, [prop.myState]);
const { data: userEvent } = useUserProfile(prop.user);
const events = prop.findStateId(myState,'events');
const getBlockChallenge = (filtermode,events) => {
  var newItem = []
  if (events) {
   
     events.map((item, i) => {
      if ((item.gameConsole == filtermode || item.gameMode == filtermode || filtermode == 'all') || (item.gameConsole != 'Mobile' && filtermode == 'NoMobile')) {
        //item.players.sort((a, b) => (a.id > b.id) ? 1 : -1)
        
        {item.players.map((player, j) => {
         //if(player.username == currentUser.username && (item.status=='Pending' || item.status=='Ready' || item.status=='InPlay' )){this.props.history.push("/panel/lobby?id="+item.id);}
        })}
        var timestring1 = item.expire;
        var timestring2 = new Date();
        var startdate = moment(timestring1).format();
        var expected_enddate = moment(timestring2).format();
       startdate = moment(startdate).add(20, 'days').format()
       
        
        if(item.status !='Pending' && item.status !='InPlay' && item.status !='Ready'){
          //item.gameConsole = startdate + ' '+ expected_enddate;
          if(startdate>expected_enddate){newItem.push(item);}
        }else{
          newItem.push(item);
        }
        //newItem.push(item);
        
        
       
      } 
    }
    
    )
    return (<Card.Group className="fours" style={{ marginBottom: 20 }}>{printBlockChallenge(newItem,filtermode,{...prop})}</Card.Group>)
  }

}

   
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

{getBlockChallenge('all',events)}    
              
  </>
);
}else{
  return (
  
    <>
    
                    <Carousel style={{ textAlign:'left',maxWidth:300,margin:'auto'}} controls={false}>
                    
                    {getBlockChallenge('all',events)} 
                    
                     
  </Carousel>
                    
                 
               
      </>
    );
}
}

export default HomeEvents