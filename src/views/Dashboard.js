import React, { useEffect, useState, useContext } from "react";
import { printBlockChallenge, genLink } from "components/include.js";
import { Tab, Card, Menu, Label, Dimmer, Loader } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import Active from "components/active.component";
import DashStat from "components/dashstat.component";
import GlobalContext from "context/GlobalState";
import UserContext from "context/UserState";
import { Helmet } from "react-helmet";
import EventsFilter from "components/blocks/eventsFilter";
import EventsFilterUser from "components/blocks/eventsFilterUser";
import UserEvents from "components/events/userdash.component";
var moment = require("moment");

function Dashboard(prop) {
  const context = useContext(GlobalContext);
  const { events } = context.myList;
  const contextUser = useContext(UserContext);
  const { currentUser } = contextUser.uList;
  const [myState, setMyState] = useState(prop.myState);
  const history = useHistory();
  const [myStateThis, setMyStateThis] = useState({
    list: [
      { id: "All", val: 0 },
      { id: "Mobile", val: 0 },

      { id: "NoMobile", val: 0 },
      { id: "Tournament", val: 0 },
      { id: "League", val: 0 },
    ],
  });
  const findStateId = (st, val) => {
    return st.list.filter(function (v) {
      return v.id === val;
    })[0].val;
  };
  const onUpdateItem = (key, val) => {
    //console.log(val)
    if (findStateId(myStateThis, key) != val) {
      //console.log(key)
      setMyStateThis(() => {
        const list = myStateThis.list.map((item) => {
          if (item.id === key) {
            item.val = val;
          }
          return item;
        });

        return {
          list: list,
        };
      });
    }
  };

  const key = prop.findStateId(myState, "keyDash");

  const updateCount = (events) => {
    var arrFilters = ["All", "Mobile", "NoMobile", "Tournament", "League"];
    if (events) {
      for (var ifil = 0; ifil < arrFilters.length; ifil++) {
        var filtermode = arrFilters[ifil];
        var newItem = [];
        events.map((_item, i) => {
          var item = JSON.parse(JSON.stringify(_item));

          if (
            item.gameConsole == filtermode ||
            item.gameMode == filtermode ||
            filtermode == "All" ||
            (item.gameConsole != "Mobile" && filtermode == "NoMobile")
          ) {
            var timestring1 = item.expire;
            var timestring2 = new Date();
            var startdate = moment(timestring1).format();
            var expected_enddate = moment(timestring2).format();
            startdate = moment(startdate).add(3, "hours").format();

            if (item.status != "Pending" && item.status != "InPlay") {
              if (startdate > expected_enddate) {
                //newItem.push(item)
              }
            } else {
              newItem.push(item);
            }
          }
        });

        if (findStateId(myStateThis, filtermode) != newItem.length) {
          onUpdateItem(filtermode, newItem.length);
        }
      }
    }
  };
  const getBlockChallenge = (filtermode, events) => {
    var newItem = [];
    events?.sort(function (a, b) {
      if (a === b || (a.status === b.status && a.id === b.id)) return 0;

      if (a.status > b.status) return -1;
      if (a.status < b.status) return 1;

      if (a.id > b.id) return -1;
      if (a.id < b.id) return 1;
    });
    events?.map((_item, i) => {
      var item = JSON.parse(JSON.stringify(_item));
      if (
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
        startdate = moment(startdate).add(4, "days").format();

        if (
          item.status != "Pending" &&
          item.status != "InPlay" &&
          item.status != "Ready"
        ) {
          //item.gameConsole = startdate + ' '+ expected_enddate;
          if (startdate > expected_enddate && item.players.length > 1) {
            newItem.push(item);
          }
        } else {
          newItem.push(item);
        }
        //newItem.push(item);
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
        itemsPerRow="4"
        {...prop}
        style={{ marginBottom: 20, marginTop: 5, textAlign: "left" }}
      >
        {printBlockChallenge(newItem, filtermode)}
      </Card.Group>
    );
  };

  const panes = [
    {
      id: 1,
      menuItem: (
        <Menu.Item key={"1"}>
          All{" "}
          <Label color="red" size="mini">
            {findStateId(myStateThis, "All")}
          </Label>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>
          <EventsFilterUser
            filtermode="all"
            min="3"
            days="1"
            itemsPerRow="4"
            {...prop}
          />
          <EventsFilter
            filtermode="all"
            min="8"
            days="2"
            itemsPerRow="4"
            {...prop}
          />
        </Tab.Pane>
      ),
    },
    {
      id: 2,
      menuItem: (
        <Menu.Item
          key={"2"}
          className={
            findStateId(myStateThis, "Mobile") == 0 ? "mobile hidden" : null
          }
        >
          Mobile{" "}
          <Label color="teal" size="mini">
            {findStateId(myStateThis, "Mobile")}
          </Label>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>
          <EventsFilter
            filtermode="Mobile"
            min="8"
            days="2"
            itemsPerRow="4"
            {...prop}
          />
        </Tab.Pane>
      ),
    },
    {
      id: 3,
      menuItem: (
        <Menu.Item
          key={"3"}
          className={
            findStateId(myStateThis, "NoMobile") == 0 ? "mobile hidden" : null
          }
        >
          Console{" "}
          <Label color="orange" size="mini">
            {findStateId(myStateThis, "NoMobile")}
          </Label>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>
          {" "}
          <EventsFilter
            filtermode="NoMobile"
            min="8"
            days="2"
            itemsPerRow="4"
            {...prop}
          />
        </Tab.Pane>
      ),
    },
    {
      id: 4,
      menuItem: (
        <Menu.Item
          key={"4"}
          className={
            findStateId(myStateThis, "Tournament") == 0 ? "mobile hidden" : null
          }
        >
          Tournament{" "}
          <Label size="mini" color="black">
            {findStateId(myStateThis, "Tournament")}
          </Label>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>
          {" "}
          <EventsFilter
            filtermode="Tournament"
            min="8"
            days="2"
            itemsPerRow="4"
            {...prop}
          />
        </Tab.Pane>
      ),
    },
    {
      id: 5,
      menuItem: (
        <Menu.Item
          key={"5"}
          className={
            findStateId(myStateThis, "League") == 0 ? "mobile hidden" : null
          }
        >
          League{" "}
          <Label size="mini" color="grey">
            {findStateId(myStateThis, "League")}
          </Label>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>
          <EventsFilter
            filtermode="League"
            min="8"
            days="2"
            itemsPerRow="4"
            {...prop}
          />
        </Tab.Pane>
      ),
    },
  ];
  useEffect(() => {
    updateCount(events);
  }, [events]);

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Active {...prop} />
      <DashStat {...prop} />
      <Tab
        panes={panes}
        className="maxheight dash"
        defaultActiveIndex={key}
        onTabChange={(e, data) => {
          prop.onUpdateItem("keyDash", data.activeIndex);
        }}
      />
    </>
  );
}

export default Dashboard;
