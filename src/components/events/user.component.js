import React, { useState, useEffect, useContext } from "react";

import { printBlockChallenge } from "components/include";
import $ from "jquery";
import { Spinner, Carousel } from "react-bootstrap";
import { Header, Dimmer, Loader, Card } from "semantic-ui-react";
import UserContext from "context/UserState";
import { useUserEvents } from "services/hooks";
var moment = require("moment");
const HomeEvents = (prop) => {
  const [myState, setMyState] = useState(prop.myState);
  useEffect(() => {
    setMyState(prop.myState);
  }, [prop.myState]);
  var _key = prop.findStateId(myState, "profileUser");
  if (!_key) {
    const context = useContext(UserContext);

    _key = context.uList.currentUser;
  }
  if (prop.user) {
    _key = prop.user;
  }
  const currentUser = _key;

  const { data: events } = useUserEvents(currentUser.id);
  var responsive = $(window).width();
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
          //item.players.sort((a, b) => (a.id > b.id) ? 1 : -1)

          {
            item.players.map((player, j) => {
              //if(player.username == currentUser.username && (item.status=='Pending' || item.status=='Ready' || item.status=='InPlay' )){this.props.history.push("/panel/lobby?id="+item.id);}
            });
          }
          var timestring1 = item.expire;
          var timestring2 = new Date();
          var startdate = moment(timestring1).format();
          var expected_enddate = moment(timestring2).format();
          startdate = moment(startdate).add(1, "days").format();

          if (
            item.status != "Pending" &&
            item.status != "InPlay" &&
            item.status != "Finished" &&
            item.status != "Ready"
          ) {
            //item.gameConsole = startdate + ' '+ expected_enddate;
            if (startdate > expected_enddate) {
              newItem.push(item);
            }
          } else {
            newItem.push(item);
          }
          //newItem.push(item);
        }
      });
      return (
        <Card.Group className="fours" style={{ marginBottom: 20 }}>
          {printBlockChallenge(newItem, filtermode, { ...prop })}
        </Card.Group>
      );
    }
  };
  if (!events) {
    return (
      <Dimmer active inverted>
        <Loader size="large">Loading</Loader>
      </Dimmer>
    );
  }
  if (responsive >= 768) {
    return (
      <>
        {!prop.myStateLoc && <Header as="h3">My Events</Header>}
        {getBlockChallenge("all", events)}
      </>
    );
  } else {
    return (
      <>
        {!prop.myStateLoc && <Header as="h3">My Events</Header>}
        <Carousel
          style={{ textAlign: "left", maxWidth: 300, margin: "auto" }}
          controls={false}
        >
          {getBlockChallenge("all", events)}
        </Carousel>
      </>
    );
  }
};

export default HomeEvents;
