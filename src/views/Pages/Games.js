import React, { useEffect, useState, useContext } from "react";
import { printBlockChallenge } from "components/include";
import { Card, Dimmer, Loader, Header, Breadcrumb } from "semantic-ui-react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
// react-bootstrap components
import GameSlide from "components/GameSlide";
import Games from "server/Games";
import { themeColors } from "const.js";
import Market from "components/market.component";
import GlobalContext from "context/GlobalState";
import HowIt from "components/howit";
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
const Landing = (prop) => {
  const getLabel = (item) => {
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

  var _color = "red";
  var _label;
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

    if (!events) {
      return (
        <Dimmer active inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>
      );
    }
    return (
      <Card.Group centered className="fours" style={{ marginBottom: 20 }}>
        {printBlockChallenge(newItem, filtermode, { ...prop })}
      </Card.Group>
    );
  };
  useEffect(() => {
    document.title = `Play ${_game} for Real Money.`;

    return () => {};
  }, [prop]);
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
      <div className="wrapper">
        <div
          className={"parallax filter-gradient " + _color + " section-gray"}
          data-color="red"
          style={{ height: 300 }}
        >
          <div className="parallax-background">
            <img
              className="parallax-background-image"
              style={{ filter: "blur(3px)" }}
              alt={_game + " for Real Money."}
              src={"/assets/images/games/" + _game + ".jpg"}
            />
          </div>
          <div className="container crump">
            <Breadcrumb icon="right angle" sections={sections} />
            <h2
              className="header-text text-center"
              style={{
                padding: "40px 20px 10px 20px",
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
          </div>
        </div>
        <div className="section" style={{ margin: 0 }}>
          <div className="container">
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
                    <b>making money just by playing {_game} on your console?</b>
                    &nbsp;Well, this dream is now a reality for thousands of
                    gamers on <b>Loole.gg </b>Loole is a&nbsp;new esports
                    platform that lets you bet money on your
                    {_game} skills against other online players from around the
                    world.
                  </p>
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
                    Every weekend thousands of players make money online
                    competing in our <b>Free {_game} tournaments</b>. We give
                    away&nbsp;
                    <strong>thousands of euros in prizes every season. </strong>
                    So, what are you waiting for?{" "}
                    <b>
                      Join our expansive {_game} community and start earning
                      your share of the epic prizes!&nbsp;
                    </b>
                  </p>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="section section-gray" style={{ margin: 0 }}>
          <div className="container">
            <h4 className="header-text text-center">Is it Real Cash?</h4>
            <p className="header-text text-center">
              Absolutly YES! Cash on the table.
            </p>
            <div
              style={{ minHeight: 300, position: "relative", marginTop: 20 }}
            >
              {getBlockChallenge("all", events)}
            </div>
          </div>
        </div>
        <div className="section section-game " style={{ padding: 0 }}>
          <div
            className={" filter-gradient " + themeColors[day] + ""}
            data-color="orange"
          >
            <GameSlide />
          </div>
        </div>
        <HowIt />
        <div className="section   section-no-padding">
          <div className="container" style={{ minHeight: 500 }}>
            <h4 className="header-text  text-center" id="market">
              Don't ever be out!
            </h4>
            <Market />
          </div>
        </div>
        <footer className="footer">
          <div className="container">
            &copy; 2021 <a href="https://loole.gg">Loole.gg</a>, made with love
          </div>
        </footer>
      </div>
    </>
  );
};
export default Landing;
