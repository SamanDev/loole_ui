import React, { useState, useEffect, useContext } from "react";

import { printBlockChallenge } from "components/include.js";
import $ from "jquery";
import { Header, Dimmer, Loader, Card, Icon, Segment } from "semantic-ui-react";
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
      events?.sort(function (a, b) {
        if (a === b || (a.status === b.status && a.id === b.id)) return 0;

        if (a.id > b.id) return -1;
        if (a.id < b.id) return 1;
      });
      events.map((item, i) => {
        if (
          item.status == filtermode ||
          item.gameConsole == filtermode ||
          item.gameMode == filtermode ||
          filtermode == "all" ||
          (item.gameConsole != "Mobile" && filtermode == "NoMobile")
        ) {
          //item.players.sort((a, b) => (a.id > b.id) ? 1 : -1)

          var timestring1 = item.expire;
          var timestring2 = new Date();
          var startdate = moment(timestring1).format();
          var expected_enddate = moment(timestring2).format();
          startdate = moment(startdate).add(1, "days").format();

          if (
            item.status != "Pending" &&
            item.status != "InPlay" &&
            //item.status != "Finished" &&
            item.status != "Ready"
          ) {
            //item.gameConsole = startdate + ' '+ expected_enddate;
            if (startdate > expected_enddate && 1 == 2) {
              newItem.push(item);
            }
          } else {
            newItem.push(item);
          }
          //newItem.push(item);
        }
      });
      return (
        <Card.Group
          className="fours"
          itemsPerRow={prop.myStateLoc ? 3 : 4}
          stackable
          doubling
          style={{ marginBottom: 20, textAlign: "left", marginTop: 5 }}
        >
          {printBlockChallenge(newItem, filtermode, { ...prop })}
        </Card.Group>
      );
    }
  };
  if (!events) {
    return (
      <>
        <Header as="h2">
          <Icon name="osi" />
          <Header.Content>
            My Events
            <Header.Subheader>See your Events</Header.Subheader>
          </Header.Content>
        </Header>
        <Segment padded className="segmentmax">
          {" "}
          <Dimmer active inverted>
            <Loader size="large">Loading</Loader>
          </Dimmer>
        </Segment>
      </>
    );
  }

  return (
    <>
      {!prop.myStateLoc ? (
        <>
          <Header as="h2">
            <Icon name="osi" />
            <Header.Content>
              My Events
              <Header.Subheader>See your Events</Header.Subheader>
            </Header.Content>
          </Header>

          {getBlockChallenge("all", events)}
        </>
      ) : (
        <>{getBlockChallenge("all", events)}</>
      )}
    </>
  );
};

export default HomeEvents;
