import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Avatar from "react-avatar";
import Countdown from "react-countdown";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link, useLocation } from "react-router-dom";

import {
  faInstagram,
  faTwitch,
  faYoutube,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Moment from "moment";
import {date_edit,setAvatar,getColorStatus,getIcon,getGroupBadgeBlock,rendererBig,printStatus}  from "components/include.js";
import {
  Statistic,
  Button,
  Icon,
  Label,
  Divider,
  Grid,
  Segment,
  Card,
  Image,
  List
} from "semantic-ui-react";
// react-bootstrap components
import {
  Badge,
  
  Alert,
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
  Tab,
  ProgressBar,
  ListGroup,
} from "react-bootstrap";
import { useHistory } from "react-router";

var moment = require("moment");
 function DashStat(prop) {
    var _mode = " 1 vs 1 ";
    var _color = "#404040";
    var item = prop.item;
    item.expire = date_edit(item.expire);
    item.startTime = date_edit(item.startTime);
    item.finished = date_edit(item.finished);
    item.players.sort((a, b) => (a.id > b.id) ? 1 : -1)
   
  
    if (item.gameMode == "Tournament" || item.gameMode == "League") {
      _mode = item.gameMode;
    }
    
    if (!item.winner) {
      item.winner= null;
    }
    if (item.matchTables && item.matchTables[0] && !item.matchTables[0].winner) {
      item.matchTables[0].winner= null;
    }
    if (item.matchTables && !item.matchTables[0] ) {
      item.matchTables.push({winner :null,status: item.status});
    }
    if (item.matchTables && item.matchTables[0] && item.matchTables[0].winner && !item.winner) {
      item.winner = item.matchTables[0].winner;
    }
    if (item.winner) {
      //_mode = setAvatar(item.winner);
    }
    if (item.status=='Canceled' || item.status=='Expired') {
      //_color = "black"; 
    }
    
  
    return (
    
        
     
        <Card   color={getColorStatus(item.status)} >
         <Label inverted size="mini" color={getColorStatus(item.status)} ribbon style={{zIndex:2,maxWidth:170,position:'absolute',top:15,left:-10}}>
         {item.status == 'Pending' &&  ( <Icon loading name='spinner' />)}
         {item.status == 'Finished' &&  ( <Icon  name='check' color="green" />)}
         {(item.status=='Canceled' || item.status=='Expired') &&  ( <Icon  name='times' color="red" />)}
         {item.status}
          </Label>
        <Image
                alt={item.gameName}
                src={
                  "/assets/images/games/" + item.gameName + ".jpg"
                }
                fluid
          style={{background:'gray !important'}}
                wrapped ui={false}/>
                <div
              className={"text-center cover "+item.status}
               >
              <div style={{ transform: "scale(.8)",padding: '30px 0',height:185}}>
              {printStatus(item,_mode,_color ,item.status+'@@@Not Avalable',item.status)}
              <Countdown renderer={rendererBig}  txt="@@@Avalable until" colorfinish={getColorStatus(item.status)} finish={item.status+'@@@Not Avalable'} match={item.matchTables[0]}  date={item.expire} mode={_mode} color={_color} />
        </div>
        {item.players[0] ? (
                  <>
                  
                    {item.players.map((user, z) => (
                      <span key={z}>
                        {z < 5 ? (
                          <>
                            {z < 4 ? (
                              <Avatar
                                size="25"
                                title={user.username}
                                round={true}
                                name={setAvatar(user.username)}
                              />
                            ) : (
                              <Avatar
                                size="25"
                                round={true}
                                value={"+" + (item.players.length - 4)}
                                color="gray"
                              />
                            )}
                          </>
                        ) : null}
                      </span>
                    ))}
                  </>
                ) : (
                  <span>
                    <Avatar
                      size="25"
                      round={true}
                      name="?"
                      src="https://graph.facebook.com/100008343750912/picture?width=200&height=200"
                      color="lightgray"
                    />
                    <Avatar
                      size="25"
                      round={true}
                      name="?"
                      src="https://graph.facebook.com/100008343750912/picture?width=200&height=200"
                      color="gray"
                    />
                  </span>
                )}
            </div>
            <div className="content extra">
              
            <Card.Header style={{textAlign: 'left'}}>
                  {item.gameName}<Label style={{ float: "right"}} size="small" basic>
                  <FontAwesomeIcon fixedWidth icon={getIcon(item.gameConsole)} />{" "}
                  {item.gameConsole}
                
                </Label>
                </Card.Header>
               
          <Card.Description>
          
        <div className="content left floated " style={{minHeight:10,padding:2}}>{getGroupBadgeBlock(item.outSign, item.prize, "Prize","left","green")}</div>
        <div className="content right floated " style={{minHeight:10,padding:2}}>
        {getGroupBadgeBlock(item.inSign, item.amount, "Fee","right","blue")}
        </div>
    </Card.Description>
    </div>
    
        </Card>
    
    
    );
  };
  export default DashStat;