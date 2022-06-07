import React, { useEffect, useContext, lazy } from "react";
import { Helmet } from "react-helmet";

import { Card, Breadcrumb, Segment } from "semantic-ui-react";

import { Link } from "react-router-dom";
// react-bootstrap components
import Games from "server/Games";

const RegisterBtn = lazy(() => import("components/registerBtn"));
const Helpblog = lazy(() => import("components/helpsectoin.component"));
const Footer = lazy(() => import("components/Navbars/Footer"));
const GameBlock = lazy(() => import("components/blocks/game"));
const EventsFilter = lazy(() => import("components/blocks/eventsFilter"));
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
var moment = require("moment");
const d = new Date();
let da = d.getSeconds();
let day = da % 7;
var _color = "red";
const GamesComponent = (prop) => {
  useEffect(() => {
    scrollToTop();
    return () => {};
  }, []);

  const sections = [
    { key: "Home", content: "Home", link: true, to: "/home", as: Link },
    {
      key: "Games",
      content: "Games",
      active: true,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Loole.gg Games Available</title>
      </Helmet>

      <div className="wrapper">
        <div className="section " style={{ padding: 0, overflow: "auto" }}>
          <div
            className="parallax filter-gradient gray section-gray"
            data-color="black"
            style={{ height: 220, color: "#fff" }}
          >
            <div
              style={{
                height: "100%",
                width: "100%",
                position: "relative",
                top: "0",
                zIndex: 3,
              }}
            >
              <div className="container crumb">
                <Breadcrumb icon="right angle" sections={sections} />

                <h1 className="entry-title td-page-title">
                  <span>Available Games</span>
                </h1>
                <div>1 vs 1, Tournament, League</div>
              </div>
            </div>
          </div>
        </div>

        <Segment
          size="small"
          className="container"
          secondary
          padded
          style={{ position: "relative", zIndex: 5, top: -50 }}
        >
          <div className="section " style={{ margin: 0, padding: "10px 0" }}>
            <div className="td-pb-span8 td-main-content" role="main">
              <div className="td-ss-main-content">
                <div className="clearfix"></div>
                <Card.Group
                  itemsPerRow="3"
                  stackable
                  style={{
                    marginBottom: 20,
                    textAlign: "left",
                  }}
                >
                  {Games.games.map((item, i) => {
                    return (
                      <Card key={i.toString()}>
                        <GameBlock item={item} i={i} />
                      </Card>
                    );
                  })}
                </Card.Group>
                <div className="text-center" style={{ marginTop: 30 }}>
                  <RegisterBtn {...prop} color="red" />
                </div>
              </div>
            </div>
            <div className="text-center" style={{ marginTop: 40 }}>
              <Helpblog {...prop} />
            </div>
          </div>
        </Segment>
        <Segment
          className="container"
          padded
          style={{ position: "relative", zIndex: 5, top: -50 }}
        >
          <h4 className="header-text text-center">Is it Real Cash?</h4>
          <p className="header-text text-center">
            Absolutely YES! Cash on the table.
          </p>
          <div style={{ minHeight: 300, position: "relative", marginTop: 20 }}>
            <EventsFilter filtermode="all" min="6" days="2" itemsPerRow="3" />
          </div>
        </Segment>

        <Footer {...prop} />
      </div>
    </>
  );
};
export default GamesComponent;
