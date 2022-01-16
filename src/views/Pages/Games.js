import React, { useEffect, useState } from "react";
import { printBlockChallenge } from "components/include";
import { Card, Dimmer, Loader, Header } from "semantic-ui-react";

// react-bootstrap components
import GameSlide from "components/GameSlide";
import Games from "server/Games";
import { themeColors } from "const.js";
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

  const [myState, setMyState] = useState(prop.myState);
  useEffect(() => {
    setMyState(prop.myState);
  }, [prop.myState]);

  const events = prop.findStateId(myState, "events");
  var _game = window.location.href.split("game/")[1].replace("%20", " ");
  var _color = "red";
  var _label;
  {
    Games.games.map((item, i) => {
      if (item.name.toLowerCase() == _game.toLowerCase()) {
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

  return (
    <>
      <div className="wrapper">
        <div
          className={"parallax filter-gradient " + _color + " section-gray"}
          data-color="red"
          style={{ height: 200 }}
        >
          <div className="parallax-background" style={{ height: 200 }}>
            <img
              className="parallax-background-image"
              src={"/assets/images/games/" + _game + ".jpg"}
            />
          </div>
          <div className="container">
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
        <div className="section section-gray" style={{ margin: 0 }}>
          <div className="container">
            <h4 className="header-text text-center">Is it Real Cash?</h4>
            <p className="header-text text-center">
              Absolutly YES! Cash on the table.
            </p>
            <div
              style={{ minHeight: 300, position: "relative", marginTop: 20 }}
            >
              {getBlockChallenge("All", events)}
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
      </div>
    </>
  );
};
export default Landing;
