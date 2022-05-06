import React, { useEffect, useState, useContext } from "react";
import $ from "jquery";

import { printBlockChallenge } from "components/include.js";
import { Card, Dimmer, Loader } from "semantic-ui-react";
// react-bootstrap components
import GlobalContext from "context/GlobalState";
var moment = require("moment");
const HomeEvents = (prop) => {
  const context = useContext(GlobalContext);
  const { events } = context.myList;

  const getBlockChallenge = (filtermode, events) => {
    var newItem = [];
    if (events) {
      events?.sort(function (a, b) {
        if (a === b || (a.status === b.status && a.id === b.id)) return 0;

        if (a.status > b.status) return -1;
        if (a.status < b.status) return 1;

        if (a.id > b.id) return -1;
        if (a.id < b.id) return 1;
      });
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
        <Card.Group
          className="fours"
          stackable
          doubling
          itemsPerRow="3"
          style={{ marginBottom: 20, textAlign: "left" }}
        >
          {printBlockChallenge(newItem, filtermode, { ...prop })}
        </Card.Group>
      );
    }
  };

  const elements = ["1", "2-4_01", "2-4_02", "2-4_03"];
  var responsive = $(window).width();
  if (!events) {
    return (
      <Dimmer active inverted>
        <Loader size="large">Loading</Loader>
      </Dimmer>
    );
  }
  if (responsive >= 768) {
    return <>{getBlockChallenge("all", events)}</>;
  } else {
    return <>{getBlockChallenge("all", events)}</>;
  }
};

export default HomeEvents;
