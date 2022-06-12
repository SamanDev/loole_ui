import React from "react";
import { Image, Header, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Colors } from "const.js";
// react-bootstrap components
import Games from "server/Games";
//import Carousel from "react-spring-3d-carousel";
import { Carousel } from "3d-react-carousal";
import GameBlock from "components/blocks/game";

const slides = [];

export default function GameSlide(prop) {
  const getLabel = (item) => {
    return (
      <>
        <h5
          className="header-text"
          style={{ marginBottom: 5, width: 180, color: "#fff", fontSize: 18 }}
        >
          {item.name}
        </h5>
        <div
          style={{
            marginTop: 0,
            color: "#eee",
            fontSize: 13,
            marginBottom: 8,
          }}
        >
          {item.active ? (
            <>
              {item.haveMatch && "1 vs 1"}
              {item.haveMatch && item.haveTournament && ", "}
              {item.haveTournament && "Tournament"}
              {item.haveMatch && item.haveLeague && ", "}
              {item.haveLeague && "League"}
            </>
          ) : (
            <>Coming Soon</>
          )}
        </div>
      </>
    );
  };
  {
    Games.games.map((item, i) => {
      slides.push(
        <Image
          src={"/assets/images/games/" + item.name + ".webp"}
          width="800"
          height="450"
          alt={item.name}
          as={Link}
          label={{
            content: getLabel(item),
            ribbon: true,
            color: Colors[i].toLowerCase(),
          }}
          style={item.active ? {} : { filter: "grayscale(90%)" }}
          to={"/game/" + item.name}
        />
      );
    });
  }
  return null; /* (
    <div
      style={{
        height: 300,
        width: "100%",
        position: "relative",
        top: -50,
        zIndex: 3,
      }}
    >
      <div className="container" id="games" style={{ marginTop: 60 }}>
        <div style={{ height: 300 }}>
          <Carousel
            slides={slides}
            autoplay={false}
            arrows={false}
            interval={3000}
          />
        </div>
      </div>
    </div>
  ); */
}
