import React, { useEffect, useState, useContext } from "react";
import { printBlockChallenge } from "components/include";
import { Tab, Card, Menu, Label, Dimmer, Loader } from "semantic-ui-react";
import Active from "components/active.component";
import DashStat from "components/dashstat.component";
import GlobalContext from "context/GlobalState";
var moment = require("moment");

function Dashboard(prop) {
  const context = useContext(GlobalContext);
  const { events } = context.myList;
  const [myState, setMyState] = useState(prop.myState);

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

            if (item.status != "Pending") {
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

    events?.sort((a, b) => (a.id < b.id ? 1 : -1));
    events?.map((_item, i) => {
      var item = JSON.parse(JSON.stringify(_item));
      if (
        item.gameConsole == filtermode ||
        item.gameMode == filtermode ||
        filtermode == "All" ||
        (item.gameConsole != "Mobile" && filtermode == "NoMobile")
      ) {
        //item.players.sort((a, b) => (a.id > b.id) ? 1 : -1)

        var timestring1 = item.expire;
        var timestring2 = new Date();
        var startdate = moment(timestring1).format();
        var expected_enddate = moment(timestring2).format();
        startdate = moment(startdate).add(1, "hours").format();

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

    if (!events) {
      return (
        <Dimmer active inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>
      );
    }
    return (
      <Card.Group className="fours" style={{ marginBottom: 20 }}>
        {printBlockChallenge(newItem, filtermode, { ...prop })}
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
            {findStateId(myStateThis, "all")}
          </Label>
        </Menu.Item>
      ),
      render: () => <Tab.Pane>{getBlockChallenge("all", events)}</Tab.Pane>,
    },
    {
      id: 2,
      menuItem: (
        <Menu.Item
          key={"2"}
          className={findStateId(myStateThis, "Mobile") == 0 && "mobile hidden"}
        >
          Mobile{" "}
          <Label color="teal" size="mini">
            {findStateId(myStateThis, "Mobile")}
          </Label>
        </Menu.Item>
      ),
      render: () => <Tab.Pane>{getBlockChallenge("Mobile", events)}</Tab.Pane>,
    },
    {
      id: 3,
      menuItem: (
        <Menu.Item
          key={"3"}
          className={
            findStateId(myStateThis, "NoMobile") == 0 && "mobile hidden"
          }
        >
          Console{" "}
          <Label color="orange" size="mini">
            {findStateId(myStateThis, "NoMobile")}
          </Label>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>{getBlockChallenge("NoMobile", events)}</Tab.Pane>
      ),
    },
    {
      id: 4,
      menuItem: (
        <Menu.Item
          key={"4"}
          className={
            findStateId(myStateThis, "Tournament") == 0 && "mobile hidden"
          }
        >
          Tournament{" "}
          <Label size="mini" color="black">
            {findStateId(myStateThis, "Tournament")}
          </Label>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane>{getBlockChallenge("Tournament", events)}</Tab.Pane>
      ),
    },
    {
      id: 5,
      menuItem: (
        <Menu.Item
          key={"5"}
          className={findStateId(myStateThis, "League") == 0 && "mobile hidden"}
        >
          League{" "}
          <Label size="mini" color="grey">
            {findStateId(myStateThis, "League")}
          </Label>
        </Menu.Item>
      ),
      render: () => <Tab.Pane>{getBlockChallenge("League", events)}</Tab.Pane>,
    },
  ];
  updateCount(events);

  return (
    <>
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
