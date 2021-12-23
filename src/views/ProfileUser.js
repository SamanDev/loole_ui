import React, { Component, useState, useMemo, useEffect } from "react";
import Select from "react-select";
import NotificationAlert from "react-notification-alert";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Avatar from "react-avatar";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Countdown from "react-countdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitch,
  faYoutube,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faPlaystation, faXbox } from "@fortawesome/free-brands-svg-icons";
import { faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import AuthService from "services/auth.service";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import userService from "services/user.service";
import TagsForm from "components/profile/tags.component";
import MyMatches from "views/UserMatches.js";
import Birthday from "components/Birthday";
// react-bootstrap components
import { Row, ListGroup, Col, TabContent, TabPane, Tab } from "react-bootstrap";
import {
  Checkbox,
  Grid,
  Header,
  Button,
  Icon,
  Modal,
  Divider,
  Menu,
  Dimmer,
  Loader,
  Image,
  Segment,
  Sidebar,
  Card
} from "semantic-ui-react";
import {
  setAvatar,
  getColor,
  getIcon,
  renderer,
  printMatchBlock,
  userDetails,
  printBlockChallenge,
  date_locale,
  date_edit,
} from "components/include";
import { useAllEvents, useUserProfile } from "services/hooks";
import DashStat  from "components/userstat.component";
var allValid = true;


function profile(prop) {
  
  const { data: userGet } = useUserProfile(prop.user);
  //const token = userGet;
  const [myState, setMyState] = useState(prop.myState)
  useEffect(() => {
    setMyState(prop.myState)
}, [prop.myState]);
  useEffect(() => {
    console.log(userGet)
    if (userGet) {
      
      prop.onUpdateItem("profileUser", userGet);
      
  }
  }, [userGet]);
  const currentUser = prop.findStateId(myState, "profileUser");
  
  const getBlockChallenge = (filtermode, events) => {
    var newItem = [];
    if (events) {
      events.map((item, i) => {
        if (
          item.gameConsole == filtermode ||
          item.gameMode == filtermode ||
          filtermode == "all" ||
          (item.gameConsole != "Mobile" && filtermode == "NoMobile")
        ) {
          item.players.sort((a, b) => (a.id > b.id ? 1 : -1));
  
          newItem.push(item);
        }
      });
      return (<Card.Group className="fours" style={{ marginBottom: 20 }}>{printBlockChallenge(newItem, filtermode,{...prop})}</Card.Group>)
    }
  };
  if (!userGet || !currentUser) {
    
    return (
      <Segment style={{ height: "100%", width: "100%", position: "absolute" }}>
        <Dimmer active inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>
      </Segment>
    );
  }
 

  var str = currentUser.username;
  
  var res = str.substring(0, 1);
  res = res + " " + str.substring(1, 2);

  return (
    <>
      <div className="wrapper">
        <div
          className="parallax filter-gradient gray section-gray"
          data-color="red"
        >
          <div className="parallax-background">
            <img
              className="parallax-background-image"
              src="/assets/img/showcases/showcase-1/bg.jpg"
            />
          </div>
          <div className="container user">
            <div className="row">
              <div className="col-md-12">
                <div className="description">
                  <div
                    className=" winner avatar"
                    style={{ width: 92, height: 92 }}
                  ></div>

                  <div className="author  avatar text-center">
                    <Avatar
                      size="114"
                      round={true}
                      title={currentUser.username}
                      name={res}
                    />
                  </div>
                  <div
                    className="card-description text-center"
                    style={{ marginBottom: 20,marginTop:20 }}
                  >
                    {userDetails(currentUser)}
                  </div>
                  <DashStat {...prop} />
                 
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section  section-clients section-no-padding">
          <div className="container">
            <h4 className="header-text  text-center">Game Tags</h4>
            <TagsForm {...prop}/>
          </div>
        </div>
        <div className="section section-gray section-clients section-no-padding">
          <div className="container-fluid">
            <h4 className="header-text  text-center">Last Activity</h4>
            {getBlockChallenge("all", currentUser.events)}
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(profile);
