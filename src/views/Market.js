import React, { useEffect, useState } from "react";
// react component used to create charts
// react components used to create a SVG / Vector map
import { Tab, Card, Menu, Label, Dimmer } from "semantic-ui-react";
import Active from "components/active.component";
// react-bootstrap components
import { Spinner } from "react-bootstrap";
import MarketCard from "components/marketcardNew.component";
import Market from "server/MarketNew";
import { Helmet } from "react-helmet";
//const EventList = JSON.parse(userService.getEvents());

const getBlockChallenge = (filtermode, products) => {
  var newItem = [];

  products.map((item, i) => {
    if (
      item.title.toLowerCase().indexOf(filtermode.toLowerCase()) > -1 ||
      filtermode == "All"
    ) {
      newItem.push(item);
    }
  });
  return (
    <Card.Group
      className="fours"
      stackable
      doubling
      itemsPerRow="4"
      style={{ marginBottom: 20, textAlign: "left" }}
    >
      {printBlockProduct(newItem)}
    </Card.Group>
  );
};
export const printBlockProduct = (newItem) => {
  // const history = useHistory();

  if (newItem.length == 0) {
    //history.push("/home");
    return (
      <Dimmer active inverted>
        <div
          style={{
            textAlign: "center",
            color: "rgba(0,0,0,.5)",
            paddingTop: 30,
            width: "100%",
          }}
        >
          <img
            alt="nodata"
            style={{ height: 80 }}
            src="/assets/images/nodata.svg"
          ></img>
          <h4>Empty List.</h4>
          <h5>You currently don't have any event.</h5>
        </div>
      </Dimmer>
    );
  } else {
    return newItem.map((item, i) => {
      return <MarketCard key={i.toString()} item={item} />;
    });
  }
};

function Dashboard(prop) {
  const [myState, setMyState] = useState(prop.myState);
  useEffect(() => {
    setMyState(prop.myState);
  }, [prop.myState]);
  const [myStateThis, setMyStateThis] = useState({
    list: [
      { id: "All", val: 0 },
      { id: "PSN", val: 0 },

      { id: "XBox", val: 0 },
      { id: "Steam", val: 0 },
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
  const updateCount = (events) => {
    var arrFilters = ["All", "PSN", "XBox", "Steam"];
    if (events) {
      for (var ifil = 0; ifil < arrFilters.length; ifil++) {
        var filtermode = arrFilters[ifil];
        var newItem = [];
        events.map((_item, i) => {
          var item = JSON.parse(JSON.stringify(_item));

          if (
            item.title.toLowerCase().indexOf(filtermode.toLowerCase()) > -1 ||
            filtermode == "All"
          ) {
            newItem.push(item);
          }
        });

        if (findStateId(myStateThis, filtermode) != newItem.length) {
          onUpdateItem(filtermode, newItem.length);
        }
      }
    }
  };

  const products = Market;
  const key = prop.findStateId(myState, "keyMarket");

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
      render: () => <Tab.Pane>{getBlockChallenge("All", products)}</Tab.Pane>,
    },
    {
      id: 2,
      menuItem: (
        <Menu.Item key={"2"}>
          PSN{" "}
          <Label color="teal" size="mini">
            {findStateId(myStateThis, "PSN")}
          </Label>
        </Menu.Item>
      ),
      render: () => <Tab.Pane>{getBlockChallenge("PSN", products)}</Tab.Pane>,
    },
    {
      id: 3,
      menuItem: (
        <Menu.Item key={"3"}>
          XBox
          <Label color="orange" size="mini">
            {findStateId(myStateThis, "XBox")}
          </Label>
        </Menu.Item>
      ),
      render: () => <Tab.Pane>{getBlockChallenge("XBox", products)}</Tab.Pane>,
    },
    {
      id: 4,
      menuItem: (
        <Menu.Item key={"4"}>
          Steam{" "}
          <Label color="black" size="mini">
            {findStateId(myStateThis, "Steam")}
          </Label>
        </Menu.Item>
      ),
      render: () => <Tab.Pane>{getBlockChallenge("Steam", products)}</Tab.Pane>,
    },
  ];
  updateCount(products);
  return (
    <>
      <Helmet>
        <title>MarketPlace</title>
      </Helmet>
      <Active {...prop} />

      <Tab
        panes={panes}
        className="maxheight "
        defaultActiveIndex={key}
        onTabChange={(e, data) => {
          prop.onUpdateItem("keyMarket", data.activeIndex);
        }}
      />
    </>
  );
}

export default Dashboard;
