import React, { useEffect, useState, useContext, lazy } from "react";
import { Helmet } from "react-helmet";
import { Card, Breadcrumb, Segment } from "semantic-ui-react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
// react-bootstrap components
const GameSlide = lazy(() => import("components/GameSlide"));
const GameSlide3d = lazy(() => import("components/GameSlide3d"));
import Games from "server/Games";
import { themeColors } from "const.js";

const Footer = lazy(() => import("components/Navbars/Footer"));

const RegisterBtn = lazy(() => import("components/registerBtn"));
const Helpblog = lazy(() => import("components/helpsectoin.component"));
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
var _color = "gray";
var _label;
var _mode;
const Landing = (prop) => {
  const getLabel = (item) => {
    if (item.haveMatch) {
      _mode = "1 vs 1";
    }
    if (item.haveMatch && item.haveTournament) {
      _mode = _mode + ", ";
    }
    if (item.haveTournament) {
      _mode = _mode + "Tournaments";
    }
    if (item.haveMatch && item.haveLeague) {
      _mode = _mode + ", ";
    }
    if (item.haveLeague) {
      _mode = _mode + "League";
    }

    return (
      <>
        {item.name}
        <div
          className="header-text text-center"
          style={{ marginTop: 5, color: "#ccc", fontSize: 20 }}
        >
          {item.haveMatch && "1 vs 1"}
          {item.haveMatch && item.haveTournament && ", "}
          {item.haveTournament && "Tournament"}
          {item.haveMatch && item.haveLeague && ", "}
          {item.haveLeague && "League"}
        </div>
      </>
    );
  };
  const params = useParams();

  var _game = params.gamename;
  const [myState, setMyState] = useState(prop.myState);
  useEffect(() => {
    setMyState(prop.myState);
  }, [prop.myState]);
  useEffect(() => {
    scrollToTop();
    return () => {};
  }, [_game]);

  {
    Games.games.map((item, i) => {
      if (item.name.toLowerCase() == _game?.toLowerCase()) {
        _color = themeColors[i].toLowerCase();
        _label = getLabel(item);
      }
    });
  }

  const sections = [
    { key: "Home", content: "Home", link: true, to: "/home", as: Link },
    { key: "Games", content: "Games", link: true, to: "/games", as: Link },
    {
      key: _game,
      content: _game,
      active: true,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Play {_game} for Real Money.</title>
        <meta
          name="description"
          content={
            "Loole.gg is an online global platform where you can compete for real cash and coins in your " +
            _game +
            " game."
          }
        />
        <meta property="og:url" content={"https://loole.gg/game/" + _game} />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={"Play " + _game + " for Real Money."}
        />
        <meta
          property="og:description"
          content={
            "Loole.gg is an online global platform where you can compete for real cash and coins in your " +
            _game +
            " game."
          }
        />
        <meta
          property="og:image"
          content={"https://loole.gg/assets/images/games/" + _game + ".webp"}
        />
      </Helmet>
      <div className="wrapper">
        <div className="section " style={{ padding: 0, overflow: "auto" }}>
          <div
            className={"parallax filter-gradient gray section-gray"}
            data-color="gray"
            style={{ height: 400, overflow: "hidden" }}
          >
            <div className="parallax-background">
              <img
                className="parallax-background-image"
                style={{ filter: "blur(4px)" }}
                alt={_game + " for Real Money."}
                src={"/assets/images/games/" + _game + ".webp"}
              />
            </div>
            <div className="container crumb">
              <Breadcrumb icon="right angle" sections={sections} />
              <h2
                className="header-text text-center"
                style={{
                  padding: "10px 20px 10px 20px",
                  fontSize: "40px",
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                {_label}
              </h2>
              <h1
                className="header-text text-center"
                style={{ padding: "0px 20px", color: "#eee" }}
              >
                Play {_game} for Real Money.
              </h1>
              <p
                className="text-center"
                style={{ padding: "0px 20px", color: "#eee" }}
              >
                Loole.gg is an online global platform where you can compete for
                real cash and coins in your {_game} game.
              </p>
            </div>
          </div>
        </div>
        <Segment
          className="container"
          secondary
          padded
          style={{ position: "relative", zIndex: 5, top: -50 }}
        >
          <div className="section " style={{ margin: 0, padding: "10px 0" }}>
            <div className="td-pb-span8 td-main-content" role="main">
              <div className="td-ss-main-content">
                <div className="clearfix"></div>
                <div className="td-page-header">
                  <h3 className="entry-title td-page-title">
                    <span>Play {_game} for Money</span>
                  </h3>
                </div>
                <div className="td-page-content tagdiv-type">
                  <p>
                    Have you ever dreamed of{" "}
                    <b>making money just by playing {_game}?</b>
                    &nbsp;Well, this dream is now a reality for thousands of
                    gamers on <b>Loole.gg </b>Loole is a new platform that lets
                    you bet money on your
                    {_game} skills against other online players from around the
                    world.
                  </p>
                </div>
                <div className="text-center" style={{ marginTop: 30 }}>
                  <RegisterBtn {...prop} color="red" />
                </div>
                <br /> <br />
                <div className="td-page-header">
                  <h3 className="entry-title td-page-title">
                    <span>FREE {_game} Tournaments</span>
                  </h3>
                </div>
                <div className="td-page-content tagdiv-type">
                  <p>
                    Loole.gg is the best site to play&nbsp;FREE {_game}{" "}
                    tournaments and stand a chance to win amazing cash prizes.
                    Every weekend thousands sof players make money online
                    competing in our <b>Free {_game} tournaments</b>. We give
                    away&nbsp;
                    <strong>
                      thousands of dollars in prizes every season.{" "}
                    </strong>
                    So, what are you waiting for?{" "}
                    <b>Join our expansive {_game} community </b>and start
                    earning your share of the epic prizes!&nbsp;
                  </p>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
            <div className="text-center" style={{ marginTop: 40 }}>
              <Helpblog {...prop} game={_game} />
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
            <EventsFilter
              game={_game}
              filtermode="all"
              min="6"
              days="2"
              itemsPerRow="3"
            />
          </div>
        </Segment>

        <div className="section " style={{ padding: 0 }}>
          <div
            className={
              " filter-gradient " +
              themeColors[day].replace("grey", "gray") +
              " "
            }
            data-color="orange"
            style={{ position: "static" }}
          >
            <div className="container">
              <GameSlide3d style={{ zIndex: 2 }} />
              <GameSlide size="3" />
            </div>
          </div>
        </div>

        <Footer {...prop} />
      </div>
    </>
  );
};
export default Landing;
