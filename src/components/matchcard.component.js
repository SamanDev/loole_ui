import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from "react-select";
import Avatar from "react-avatar";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { NavLink, Link } from "react-router-dom";
import { Statistic,Divider,Card,Label,Icon,Image } from 'semantic-ui-react'

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {
  faInstagram,
  faTwitch,
  faYoutube,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import Moment from 'moment';
import CurrencyFormat from "react-currency-format";
import { IMaskInput } from "react-imask";
import {  withRouter} from 'react-router-dom';
import $ from "jquery";
import AuthService from "services/auth.service";
import userService from "services/user.service";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import eventBus from "views/eventBus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Countdown from "react-countdown";
import uploadHeader from "services/upload-header";
import PropTypes from "prop-types";
import axios from "axios";
import {
    Badge,
    Button,
    
    Navbar,
    Nav,
    Container,
    Pagination,
    Col,
    Table,
    Row,
    
    ProgressBar,
    ListGroup,
    Spinner,
    Accordion,
  } from "react-bootstrap";
  import {
    setAvatar,
    getColor,
    getIcon,
    renderer,
    rendererBig,
    getQueryVariable,
    getCode,
    getGroupBadge,
    getGroupBadgeList,
    getGroupBadgePrice,
    getModalTag,
    getGameTag,
    getMatchTitle,
    haveGameTag,
    getPlayerTag,
    isJson,
    haveAdmin,
    handleTagForm,
    vsComponent,
    getColorStatus,
    getGroupBadgeBlock,
    printJoinalerts
  } from "components/include";
  import { UPLOADURL, POSTURLTest } from "const";
       
class MatchCard extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
       
        item : this.props.item,
   
    matchidFind: this.props.matchidFind,
      successful: false,
      loading: false,
      message: ""
    };
  }
  componentWillReceiveProps(newProps) {
    
    
    this.setState({ item: newProps.item });
    this.setState({ matchidFind: newProps.matchidFind });
    this.setState({ isloading:newProps.isLoading });
    
  }

  render() {
    let {item,matchidFind } = this.state;
  
    var _mode = " 1 vs 1 ";
  var _color = "#404040";

  if (item.gameMode == "Tournament" || item.gameMode == "League") {
    _mode = item.gameMode;
  }
 

    var activePlayer = 0; 
    
    return (
      <>
       
      <Card.Group className="fours" style={{ marginBottom: 20 }}>
      <Card   color={getColorStatus(item.status)} centered raised>
       <Label inverted size="mini" color={getColorStatus(item.status)} ribbon style={{zIndex:2,maxWidth:170,position:'absolute',top:15,left:-10}}>
       {item.status == 'Pending' &&  ( <Icon loading name='spinner' />)}
       {item.status == 'Finished' &&  ( <Icon  name='check' color="green" />)}
       {item.status}
        </Label>
      <Image
              alt={item.gameName}
              src={
                require("assets/images/games/" + item.gameName + ".jpg").default
              }
              fluid
        style={{background:'gray !important'}}
              wrapped ui={false}/>
              <div
            className={"text-center cover "+item.status}
             >
            <div style={{ transform: "scale(.8)",padding: '30px 0',height:185}}>
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
  <div  className="content extra text-left">
    <Label size="mini" color='blue' tag>
    Event ID: {item.id}
    </Label>
    <Label size="mini" color='red' tag>
    Match ID: {matchidFind.id}
    </Label>
    
  </div>
      </Card>
      </Card.Group>
      
  
        </>
    );
  }
}

export default withRouter(MatchCard) ;