import React, { useState, useEffect, useContext } from "react";

import { printBlockChallenge } from "components/include";
import { Card } from "semantic-ui-react";
// react-bootstrap components
import { Header } from "semantic-ui-react";
import GlobalContext from "context/GlobalState";
var moment = require("moment");
const HomeEvents = (prop) => {
  const context = useContext(GlobalContext);
  const { events } = context.myList;
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
          startdate = moment(startdate).add(20, "days").format();

          if (
            item.status != "Pending" &&
            item.status != "InPlay" &&
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

  return (
    <>
      {!prop.myStateLoc && <Header as="h3">My Events</Header>}
      {getBlockChallenge("all", events)}
    </>
  );
};

export default HomeEvents;
