import React, { useEffect, useState, useContext } from "react";
import { Card, Dimmer, Loader } from "semantic-ui-react";
import EventsMapBlock from "components/blocks/eventsMap";
import GlobalContext from "context/GlobalState";
const moment = require("moment");
const EventsFilter = ({
  onUpdateItem,
  filtermode,
  min,
  days,
  game,
  itemsPerRow,
  username,
}) => {
  const context = useContext(GlobalContext);
  const { events } = context.myList;
  var newItem = [];
  events?.sort(function (a, b) {
    if (a === b || (a.status === b.status && a.id === b.id)) return 0;

    if (a.status > b.status) return -1;
    if (a.status < b.status) return 1;

    if (a.outSign > b.outSign) return 1;
    if (a.outSign < b.outSign) return -1;
    if (a.prize > b.prize) return -1;
    if (a.prize < b.prize) return 1;
    if (a.id > b.id) return -1;
    if (a.id < b.id) return 1;
  });
  events?.map((_item, i) => {
    var item = JSON.parse(JSON.stringify(_item));
    var canShow = false;
    if (
      item.gameConsole == filtermode ||
      item.gameMode == filtermode ||
      filtermode == "all" ||
      (item.gameConsole != "Mobile" && filtermode == "NoMobile")
    ) {
      if (!game) {
        canShow = true;
      }
    }
    if (game) {
      if (item.gameName == game) {
        canShow = true;
      }
    }
    {
      item.players.map((player, j) => {
        if (
          player.username == username &&
          (item.status == "InPlay" ||
            item.status == "Ready" ||
            item.status == "Pending")
        ) {
          canShow = false;
        }
      });
    }
    if (canShow) {
      //item.players.sort((a, b) => (a.id > b.id) ? 1 : -1)

      var timestring1 = item.expire;
      var timestring2 = new Date();
      var startdate = moment(timestring1).format();
      var expected_enddate = moment(timestring2).format();
      startdate = moment(startdate).add(days, "days").format();

      if (
        item.status != "Pending" &&
        item.status != "InPlay" &&
        item.status != "Ready"
      ) {
        //item.gameConsole = startdate + ' '+ expected_enddate;
        if (
          (startdate > expected_enddate || newItem.length < min) &&
          item.players.length > 1
        ) {
          newItem.push(item);
        }
      } else {
        newItem.push(item);
      }
    }
  });
  if (!events) {
    return (
      <Dimmer active inverted>
        <Loader size="large">Loading</Loader>
      </Dimmer>
    );
  }
  return (
    <Card.Group
      className="fours"
      stackable
      doubling
      itemsPerRow={itemsPerRow}
      style={{ marginBottom: 20, textAlign: "left" }}
    >
      <EventsMapBlock
        items={newItem}
        filtermode={filtermode}
        onUpdateItem={onUpdateItem}
      />
    </Card.Group>
  );
};
export default EventsFilter;
