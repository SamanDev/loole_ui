import React, { useEffect, useState, lazy } from "react";
// react component used to create charts
// react components used to create a SVG / Vector map
import { Tab, Menu, Label, Breadcrumb, Segment } from "semantic-ui-react";
import Market from "server/MarketNew";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
const Footer = lazy(() => import("components/Navbars/Footer"));
//const EventList = JSON.parse(userService.getEvents());
const MarketsFilter = lazy(() => import("components/blocks/marketsFilter"));
function MarketPlace(prop) {
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
  const sections = [
    { key: "Home", content: "Home", link: true, to: "/home", as: Link },
    {
      key: "MarketPlace",
      content: "MarketPlace",
      active: true,
    },
  ];
  const panes = [
    {
      id: 1,
      menuItem: (
        <Menu.Item key={"1"}>
          All <Label color="red">{findStateId(myStateThis, "All")}</Label>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane as="div">
          <MarketsFilter filtermode="All" {...prop} />
        </Tab.Pane>
      ),
    },
    {
      id: 2,
      menuItem: (
        <Menu.Item key={"2"}>
          PSN <Label color="teal">{findStateId(myStateThis, "PSN")}</Label>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane as="div">
          <MarketsFilter filtermode="PSN" {...prop} />
        </Tab.Pane>
      ),
    },
    {
      id: 3,
      menuItem: (
        <Menu.Item key={"3"}>
          XBox
          <Label color="orange">{findStateId(myStateThis, "XBox")}</Label>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane as="div">
          <MarketsFilter filtermode="XBox" {...prop} />
        </Tab.Pane>
      ),
    },
    {
      id: 4,
      menuItem: (
        <Menu.Item key={"4"}>
          Steam <Label color="black">{findStateId(myStateThis, "Steam")}</Label>
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane as="div">
          <MarketsFilter filtermode="Steam" {...prop} />
        </Tab.Pane>
      ),
    },
  ];
  useEffect(() => {
    updateCount(products);
  }, [products]);

  return (
    <>
      <Helmet>
        <title>MarketPlace</title>
      </Helmet>
      <div className="wrapper">
        <div className="section " style={{ padding: 0, overflow: "auto" }}>
          <div
            className="parallax filter-gradient gray section-gray"
            data-color="black"
            style={{ height: 220, color: "#fff" }}
          >
            <div className="parallax-background"></div>
            <div className="container crump">
              <Breadcrumb icon="right angle" sections={sections} />

              <h1 className="entry-title td-page-title">
                <span>MarketPlace</span>
              </h1>
              <div>Currently Featured in Marketplace</div>
            </div>
          </div>
        </div>
        <Segment
          className="container"
          secondary
          padded
          style={{ position: "relative", zIndex: 5, top: -50 }}
        >
          <Tab
            panes={panes}
            defaultActiveIndex={key}
            onTabChange={(e, data) => {
              prop.onUpdateItem("keyMarket", data.activeIndex);
            }}
          />
        </Segment>
        <Footer {...prop} />
      </div>
    </>
  );
}

export default MarketPlace;
