import React, { useEffect, useState, useContext, lazy } from "react";
import { Helmet } from "react-helmet";
import { printBlockChallenge } from "components/include.js";
import { Card, Header, Breadcrumb, Segment } from "semantic-ui-react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
// react-bootstrap components
const GameSlide = lazy(() => import("components/GameSlide"));
import Games from "server/Games";
import { themeColors } from "const.js";
const Footer = lazy(() => import("components/Navbars/Footer"));
const Market = lazy(() => import("components/market.component"));
import GlobalContext from "context/GlobalState";
const RegisterBtn = lazy(() => import("components/registerBtn"));
const Helpblog = lazy(() => import("components/help.component"));

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
        <Header
          as="div"
          inverted
          style={{ marginTop: 5, color: "#ccc", fontSize: 20 }}
        >
          {item.haveMatch && "1 vs 1"}
          {item.haveMatch && item.haveTournament && ", "}
          {item.haveTournament && "Tournaments"}
          {item.haveMatch && item.haveLeague && ", "}
          {item.haveLeague && "League"}
        </Header>
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
  const context = useContext(GlobalContext);
  const { events } = context.myList;

  {
    Games.games.map((item, i) => {
      if (item.name.toLowerCase() == _game?.toLowerCase()) {
        _color = themeColors[i].toLowerCase();
        _label = getLabel(item);
      }
    });
  }
  const getBlockChallenge = (filtermode, events) => {
    var newItem = [];
    events?.sort(function (a, b) {
      if (a === b || (a.status === b.status && a.id === b.id)) return 0;

      if (a.status > b.status) return -1;
      if (a.status < b.status) return 1;

      if (a.id > b.id) return -1;
      if (a.id < b.id) return 1;
    });
    events?.map((_item) => {
      var item = JSON.parse(JSON.stringify(_item));
      if (item.gameName == _game) {
        var timestring1 = item.expire;
        var timestring2 = new Date();
        var startdate = moment(timestring1).format();
        var expected_enddate = moment(timestring2).format();
        startdate = moment(startdate).add(1, "days").format();

        if (
          item.status != "Pending" &&
          item.status != "InPlay" &&
          item.status != "Ready"
        ) {
          //item.gameConsole = startdate + ' '+ expected_enddate;
          if (startdate > expected_enddate) {
            //newItem.push(item);
          }
        } else {
          //newItem.push(item);
        }

        newItem.push(item);
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
        {printBlockChallenge(newItem, filtermode)}
      </Card.Group>
    );
  };

  const sections = [
    { key: "Home", content: "Home", link: true, to: "/home", as: Link },
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
        <div
          className={"parallax filter-gradient " + _color + " section-gray"}
          data-color="red"
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
        <Segment
          size="small"
          className="container"
          style={{ position: "relative", zIndex: 5, top: -50 }}
        >
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
              <div className="text-center" style={{ marginTop: 10 }}>
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
                  <strong>thousands of euros in prizes every season. </strong>
                  So, what are you waiting for?{" "}
                  <b>Join our expansive {_game} community </b>and start earning
                  your share of the epic prizes!&nbsp;
                </p>
              </div>
              <div className="clearfix"></div>
            </div>
          </div>
          <div className="text-center" style={{ marginTop: 40 }}>
            <Helpblog {...prop} game={_game} lang="ir" />
          </div>
        </Segment>

        <div className="section section-gray" style={{ margin: 0 }}>
          <div className="container">
            <h4 className="header-text text-center">Is it Real Cash?</h4>
            <p className="header-text text-center">
              Absolutely YES! Cash on the table.
            </p>
            <div
              style={{ minHeight: 300, position: "relative", marginTop: 20 }}
            >
              {getBlockChallenge("all", events)}
            </div>
          </div>
        </div>
        <div className="section " style={{ padding: 0, overflow: "auto" }}>
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
              <GameSlide />
            </div>
          </div>
        </div>

        <div className="section section-gray   section-no-padding mobile hidsden">
          <div className="container" style={{ minHeight: 500 }}>
            <h4 className="header-text  text-center" id="market">
              Don't ever be out!
            </h4>
            <Market {...prop} />
          </div>
        </div>

        <Footer {...prop} />
      </div>
    </>
  );
};
export default Landing;
