import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaystation, faXbox } from '@fortawesome/free-brands-svg-icons'
import { faDesktop, faMobileAlt } from '@fortawesome/free-solid-svg-icons'
import Avatar from 'react-avatar';
import Countdown from "react-countdown";

import { Link, useLocation } from "react-router-dom";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,

  Form,
  InputGroup,
  Navbar,
  Nav,
  OverlayTrigger,
  Table,
  Tooltip,
  Container,
  Row,
  Col,
  TabContent,
  TabPane,
  Tab
  
} from "react-bootstrap";
  export const  getQueryVariable  = (variable) =>{
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}
export const  setAvatar  = (name) =>{
      var str = name;
      if (str){
        var res = str.substring(0, 1);
        res  = res + ' '+ str.substring(1, 2);
      }
                      
      return res
    }
    
      export const  getIcon  = (name) =>{
      if(name=='Mobile'){return faMobileAlt}
      if(name=='PS4'||name=='PS5'){return faPlaystation}
      if(name=='XBox'){return faXbox}
      if(name=='PC'){return faDesktop}
      
    }
    export const  getColor  = (amount) =>{
    
      if(amount<10){return 'success'}
      else if(amount<50){return 'warning'}
      else if(amount>=50){return 'danger'}
     
    }
    export const  addTime = (datetime, hours) => {
      var result = new Date(datetime);
    
      result.setHours(result.getHours() + hours);
          
      return result;
    }
    export const renderer = ({ days,hours, minutes, seconds, completed,dateExpired }) => {
      
      if (completed) {
        // Render a complete state
        //return <Completionist />;
        return (
          <>Started</>
          );
      } else {
        // Render a countdown
        return (

        <span>
           {days > 0? (
             <>
          {days} <small>days </small>  
          </>
           ):(null)}
           {hours > 0 ? (
             <>
             {hours > 9 ? (
             <>
          {hours}:
          </>
           ):(
             <>
             0{hours}:
             </>
           )}
          
          </>
           ):(null)}
           {minutes > 9 ? (
             <>
          {minutes}:
          </>
           ):(
             <>
             0{minutes}:
             </>
           )}
           {seconds > 9 ? (
             <>
          {seconds}
          </>
           ):(
             <>
             0{seconds}
             </>
           )}
           
        </span>
        );
      }
      };
      export const getCode = ( code ) => {
        
       
          return(
              <span >
              {code.split("").map(function(char, index){
                  return <span className="char" key={index}>{char}</span>;
              })}
              </span>
          );
     
        
        };
      export const  printMatchBlock = (item) => {
        var _mode=' 1 v 1 '
        var _color = '#404040'
       
        var timestamp = item.expire
var date = new Date(timestamp);
//date.setMinutes(date.getMinutes() + item.timeMinute);
var now = new Date();
var dateExpired = date.toISOString();

 
var dateNow = now.toISOString();


        if(item.gameMode == 'Tournament'){_mode = item.gameMode}
        if(item.gameMode == 'Tournament'){
          _mode = " $"+(item.totalPlayer * item.amount)*90/100+' '
          //_color = 'orange'
        }
        if (item.matchTables[0].winner !== null)  {_mode = setAvatar(item.matchTables[0].winner)}
        return (
          <Link  to={'/panel/lobby?id='+item.id}>
          <Card className="card-user chall" >
          <Card.Header className="no-padding">
            <div className="card-image">
            <img
                          alt={item.gameName}
                         
                          src={require("assets/images/games/"+item.gameName+".jpg").default}
                        ></img>
            </div>
            <div className="text-center"   style={{position:'absolute',right:0,left:0,marginTop:-50}}>
              {item.matchTables[0].winner !== null ? (
                <Avatar size="80"  style={{boxShadow: '0px 0px 20px 20px rgba(0,0,0,0.2)'}}  round={true} name={_mode} />
              ):(
                <Avatar size="80" textSizeRatio={6} style={{boxShadow: '0px 0px 20px 20px rgba(0,0,0,0.2)'}} color={_color} round={true} value={_mode} />
              )}
            
            </div>
          </Card.Header>
          <Card.Body>
            
  <Row>
<Col style={{lineHeight:'33px'}} xs="7">
<Card.Title as="h5" style={{fontSize:15}} >{item.gameName}</Card.Title>
<small className="text-muted">{item.gameMode}</small><br/>
{item.players[0] ? (
              <span>
              {item.players.map((user, z) => (
                <span key={z}>
                {(z<5)?(
                  <>
          {(z<4)?(
            <Avatar size="25"  title={user.username} round={true} name={setAvatar(user.username)} />
          ):(
<Avatar  size="25"  round={true} value={"+"+(item.players.length-4)} color="gray" />
          )}
           
          </>
          ):(null)}
         </span>

))}
</span>
  ):(
    <span>
<Avatar size="25" round={true} name="?" src="https://graph.facebook.com/100008343750912/picture?width=200&height=200" color="lightgray" />
<Avatar size="25" round={true} name="?" src="https://graph.facebook.com/100008343750912/picture?width=200&height=200" color="gray" />
</span>
  )}
  <br/>
  {item.gameMode=='Tournament' ? (
    <span>
  <small className="text-muted">Start Time</small>
  {item.totalPlayer == "4" ? (
    <>
            <br/>
            <small className="text-muted">Final Match</small>
            </>
            ):(
              <>
              <br/>
              <small className="text-muted">SemiFinal Match</small>
              <br/>
              <small className="text-muted">Final Match</small>
              </>
            )}
                   </span>
                    ):(
                      <small className="text-muted">Avalable until</small>
                    )}
  <br/><small className="text-muted">Status</small>
  
</Col>
<Col style={{lineHeight:'30px'}} className="text-muted text-right" xs="5">
<small className="text-muted"><FontAwesomeIcon fixedWidth icon={getIcon(item.gameConsole)}  /> {item.gameConsole}</small><br/>
<Badge variant={getColor(item.amount)}>${item.amount}</Badge><br/>
<small className="text-muted">{item.players.length}/{item.totalPlayer}</small> <br/>
{item.gameMode=='Tournament' ? (
    <span>
 
<small className="text-muted"> <Countdown renderer={renderer} date={addTime(dateExpired,0)} /></small>
  {item.totalPlayer == "4" ? (
    <>
            <br/>
            <small className="text-muted">
              <Countdown renderer={renderer} date={addTime(dateExpired,1)} />
              </small>
            </>
            ):(
              
               <>
             <br/>
            <small className="text-muted">
              <Countdown renderer={renderer} date={addTime(dateExpired,1)} />
              </small>
              <br/>
            <small className="text-muted">
              <Countdown renderer={renderer} date={addTime(dateExpired,2)}/>
              </small>
              
              </>
            )}
                   </span>
                    ):(
                      <small className="text-muted"> {dateExpired? (
                        <div ><Countdown renderer={renderer} date={addTime(dateExpired,0)} /></div>
                        ):(
                          <div> No  limit</div>
                        )}</small>
                    )}

<small className="text-muted">{item.status}</small>

  </Col>
</Row>
 
            
          </Card.Body>
          
        </Card>
        </Link>
        )
      }