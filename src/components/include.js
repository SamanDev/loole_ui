import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaystation, faXbox } from '@fortawesome/free-brands-svg-icons'
import { faDesktop, faMobileAlt } from '@fortawesome/free-solid-svg-icons'
import Avatar from 'react-avatar';
import Countdown from "react-countdown";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link, useLocation } from "react-router-dom";
import CurrencyFormat from 'react-currency-format';
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
  Carousel,
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
    export const  getGroupBadge  = (sign,amount,classes) =>{
    var nAmount = parseInt(amount, 10);
   
      return (
        <div style={{height:30,padding:'2px 0'}}><Badge variant={getColor(amount)} className={"badgegroup "+classes}>
                                      <span className="cur"><img
                            alt={"loole "+sign}
                           
                            src={"/assets/images/"+sign+".svg"}
                          ></img></span>
                          <CurrencyFormat value={nAmount} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => <span className="lable">{value}</span>} />
                                     
                                      </Badge></div>
      )
     
    }
    export const getModalTag = (filtermode) => {
      if(filtermode.indexOf(' - ')>-1){
        var filter = filtermode.value.split(" - ")[0];
        var controlname = filtermode.value.split(" - ")[1];
      }else{
        var filter = filtermode;
      var controlname = filtermode;
      }
      
      let tagsof = {}
      
      if(filter=='8Pool'){
         tagsof = {
          customClass:'tag',
          title: "Connect Your 8Pool Account",
          focusConfirm: false,
          html: `<div class="card-plain card text-left" >
          <ol><li>Open player profile in 8BallPool</li><li>Copy Unique ID</li><li>Paste the Unique ID below
          <div className="form-group">
          <label>Enter your Unique ID</label>
            <input class="form-control" id="tagid" type="tel" pattern="[0-9]" /></div>
   </li><li>and then enter your 8BallPool Nickname below
   <div className="form-group">
   <label>Enter your Nickname</label>
   <input class="form-control" id="tagname" type="text" /></div>
</li></ol>
   
          
          `,
        
          icon: "warning",
          showCancelButton: true,
          cancelButtonColor: "grey",
          confirmButtonText: "Connect",
        
          showLoaderOnConfirm: true,
          preConfirm: (login) => {
            if (
              document.getElementById("tagid").value &&
              document.getElementById("tagname").value
            ) {
              return {
                tagid:
                  document.getElementById("tagid").value +
                  "@@" +
                  document.getElementById("tagname").value,
              };
            } else {
              Swal.showValidationMessage(`All fields are required!!`);
            }
          },
        
          allowOutsideClick: () => !Swal.isLoading(),
        };
      }
      if(controlname=='PS4'||controlname=='PS5'||controlname=='XBOX'){
        if(controlname=='PS4'||controlname=='PS5'){
          var accMode = 'PSN Account'
          var tagMode = 'PSN ID'
          var holderMode = ''
        }
        if(controlname=='XBOX'){
          var accMode = 'XBOX Account'
          var tagMode = 'XBOX ID'
          var holderMode = ''
        }
       
        
         tagsof = {
          customClass:'tag',
          title: 'Connect Your '+accMode+'',
          focusConfirm: false,
          html: `<div class="card-plain card text-left" >
          <div className="form-group">
          <label>Enter your `+tagMode+`</label>
            <input class="form-control" id="tagid" type="text" placeholder="`+holderMode+`" /></div>
            </div>
          
          `,
          icon: "warning",
          showCancelButton: true,
          cancelButtonColor: "grey",
          confirmButtonText: "Connect",
        
          showLoaderOnConfirm: true,
          preConfirm: (login) => {
            if (
              document.getElementById("tagid").value
            ) {
              return {
                tagid:
                  document.getElementById("tagid").value
              };
            } else {
              Swal.showValidationMessage(`All fields are required!!`);
            }
          },
        
          allowOutsideClick: () => !Swal.isLoading(),
        };
      }
      if(filter=='ClashRoyale'){
       
          var accMode = 'ClashRoyale Account'
          var tagMode = 'ClashRoyale PlayerTag'
          var holderMode = '#123456'
    
        
         tagsof = {
          customClass:'tag',
          title: 'Connect Your '+accMode+'',
          focusConfirm: false,
          html: `<div class="card-plain card text-left" >
          <ol><li>Open player profile in Clash Royale</li> <li>Long-press on your player tag</li> <li>Tap “Copy Tag”</li><li>Paste the Player Tag below
          <div className="form-group">
          <label>Clash Royale Player Tag</label>
            <input class="form-control" id="tagid" type="text" placeholder="`+holderMode+`" /></div>
            </div>
   </li></ol>
   
          
          `,
          icon: "warning",
          showCancelButton: true,
          cancelButtonColor: "grey",
          confirmButtonText: "Connect",
        
          showLoaderOnConfirm: true,
          preConfirm: (login) => {
            if (
              document.getElementById("tagid").value
            ) {
              return {
                tagid:
                  document.getElementById("tagid").value
              };
            } else {
              Swal.showValidationMessage(`All fields are required!!`);
            }
          },
        
          allowOutsideClick: () => !Swal.isLoading(),
        };
      }
      if(filter=='Activition'){
        
        
        tagsof = {
          customClass:'tag',
         title: 'Expose Public Match Data',
         focusConfirm: false,
         html: `<div class="card-plain card text-left" ><ol><li>Login to the <a target="_blank" rel="noreferrer noopenner" href="https://profile.callofduty.com/cod/login"><span data-ignore="true">Call of Duty</span> website.</a></li><li>Find the <a href="https://profile.callofduty.com/cod/profile" target="_blank" rel="noreferrer noopenner">account preference</a> page.</li><li>Click on the Account Linking tab. Here you will find the <span data-ignore="true">PlayStation</span>, <span data-ignore="true">Xbox</span>, <span data-ignore="true">Battle.net</span>, or <span data-ignore="true">Steam</span> accounts that you've connected.</li><li>Set <strong>Searchable</strong> and <strong>Data Visible</strong> to <strong>All</strong></li></ol></div>`,
         icon: "info",
         showCancelButton: true,
         cancelButtonColor: "grey",
         confirmButtonText: "Continue",
       
         showLoaderOnConfirm: true,
         preConfirm: (login) => {
           
             return {
               tagid:
               filter+'2'
             };
          
         },
       
         allowOutsideClick: () => !Swal.isLoading(),
       };
     }
     if(filter=='EpicGames'){
        
        
      tagsof = {
        customClass:'tag',
       title: 'Make your Fortnite stats public',
       focusConfirm: false,
       html: `<div class="card-plain card text-left" ><ol><li>Launch the game <span data-ignore="true">Fortnite</span></li><li>Enter the Battle Royale mode</li><li>Go to your Settings</li><li>Navigate to your Account Settings Tab</li><li>Toggle "Show On Leaderboard" option to Yes</li></ol></div>`,
       icon: "info",
       showCancelButton: true,
       cancelButtonColor: "grey",
       confirmButtonText: "Continue",
     
       showLoaderOnConfirm: true,
       preConfirm: (login) => {
         
           return {
             tagid:
             filter+'2'
           };
        
       },
     
       allowOutsideClick: () => !Swal.isLoading(),
     };
   }
   if(filter=='Activition2'){
        
        
    tagsof = {
      customClass:'tag',
     title: 'Connect Your Activition Account',
     focusConfirm: false,
     html: `<div class="card-plain card text-left" >
     <ol><li>Click/hover on your username and click "Account" or <a href="https://profile.callofduty.com/cod/profile" target="_blank" rel="noreferrer noopener">go here</a></li><li>Under "Account" copy the long string that appears after "ID"</li><li>Paste your ID below
     <div className="form-group">
     <label>ACTIVISION ID</label>
     <input class="form-control" id="tagid" type="text" placeholder="XXXXXX#00000" /></div>
     <div className="form-group">
     <label>Platform</label>
     <select class="form-control" id="tagplatform">
     <option value="PSN">Playstation Network</option>
     <option value="XBOX">Xbox Live</option>
     <option value="PC">Steam</option>
     <option value="PC">Battle.net</option>
     </select>
     </div>
     </li></ol>
       
         </div>
        
        `,
        icon: "warning",
        showCancelButton: true,
     cancelButtonColor: "grey",
     confirmButtonText: "Connect",
   
     showLoaderOnConfirm: true,
     preConfirm: (login) => {
      if (
        document.getElementById("tagid").value
      ) {
        return {
          tagid:
            document.getElementById("tagid").value,
            tagplatform:document.getElementById("tagplatform").value,
        };
      } else {
        Swal.showValidationMessage(`All fields are required!!`);
      }
     },
   
     allowOutsideClick: () => !Swal.isLoading(),
   };
 }
 if(filter=='EpicGames2'){
        
        
  tagsof = {
    customClass:'tag',
   title: 'Paste your Epic ID',
   focusConfirm: false,
   html: `
   <div class="card-plain card text-left" >
   <ol><li>Go to <a href="https://epicgames.com" target="_blank" rel="noreferrer noopenner" data-ignore="true">epicgames.com</a> and login to your <span data-ignore="true">Epic</span> account.</li><li>Click/hover on your username and click "Account" or <a href="https://www.epicgames.com/account/personal?productName=epicgames&amp;lang=en" target="_blank" rel="noreferrer noopener">go here</a></li><li>Under "Account ID" copy the long string that appears after "ID"</li><li>Paste the ID below
   <div className="form-group">
      <label>Epic account ID</label>
      <input class="form-control" id="tagid" type="text" placeholder="Your Epic account ID" /></div>
   </li></ol>
        </div>
      
      `,
      icon: "warning",
      showCancelButton: true,
   cancelButtonColor: "grey",
   confirmButtonText: "Connect",
 
   showLoaderOnConfirm: true,
   preConfirm: (login) => {
    if (
      document.getElementById("tagid").value
    ) {
      return {
        tagid:
          document.getElementById("tagid").value
      };
    } else {
      Swal.showValidationMessage(`All fields are required!!`);
    }
   },
 
   allowOutsideClick: () => !Swal.isLoading(),
 };
}
      return tagsof
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
  <Col  xs="7">
  <Card.Title as="h5" style={{fontSize:15}} >{item.gameName}</Card.Title>
  <small className="text-muted">{item.gameMode}<br/></small>
  {item.players[0] ? (
                <small>
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
  </small>
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
  <Col className="text-muted text-right" xs="5">
  <small className="text-muted"><FontAwesomeIcon fixedWidth icon={getIcon(item.gameConsole)}  /> {item.gameConsole}<br/></small>
 
  {getGroupBadge('dollar',item.amount,'small right')}
                                     
  
  <small className="text-muted">{item.players.length}/{item.totalPlayer}<br/></small>
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
        export const  printProductBlock = (item) => {
          var _mode=' 1 v 1 '
          var _color = '#404040'
         
          return (
            <Link  to={'/panel/lobby?id='+item.id}>
            <Card className="card-user chall" >
            <Card.Header className="no-padding">
              <div className="card-image">
              <img
                            alt={item.name}
                           
                            src={item.image}
                          ></img>
              </div>
             
            </Card.Header>
            <Card.Body>
            <Card.Title as="h5" style={{fontSize:15}} >{item.name}</Card.Title>
    <Row>
  
  <Col className="text-muted text-right">
 
  {getGroupBadge('coin',item.cost,'small right')}
      
    </Col>
  </Row>
   
              
            </Card.Body>
            
          </Card>
          </Link>
          )
        }
        export const  printGameBlock = (item) => {
          return(
           <>
            <img
              className="d-block w-100"
              src={"/assets/images/games/"+item.name+".jpg"}
              alt={item.name}
            />
            <Carousel.Caption>
              <h3>{item.name}</h3>
              <p>Play {item.name} for Real Money.</p>
              <Button to={"/game/"+item.name} as={Link} variant="danger" className="btn-fill">Play {item.name} for Cash now!</Button>
              <p>Avalable for: {item.gameconsole.map((consolename, z) => (
    <small className="text-muted" key={z}><FontAwesomeIcon fixedWidth icon={getIcon(consolename.consolename)}  /> {(consolename.consolename)} </small>
  ))}</p>
              
            </Carousel.Caption>
          </>
         
          
          )
        }
        export const  printGameBlockMobile = (item) => {
          return(
           <>
            <img
              className="d-block w-100"
              src={"/assets/images/games/"+item.name+".jpg"}
              alt={item.name}
            />
            <Carousel.Caption>
              <h3>{item.name}</h3>
              <p>Play {item.name} for Real Money.</p>
              <Button to={"/game/"+item.name} as={Link} variant="danger" className="btn-fill btn-sm">Play {item.name} now!</Button>
              <p>{item.gameconsole.map((consolename, z) => (
    <small  key={z}><FontAwesomeIcon fixedWidth icon={getIcon(consolename.consolename)}  /> {(consolename.consolename)} </small>
  ))}</p>
              
            </Carousel.Caption>
          </>
         
          
          )
        }