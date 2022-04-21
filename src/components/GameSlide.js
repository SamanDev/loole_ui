import React, { useState, useEffect } from "react";
import { Image, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Colors } from "const.js";
// react-bootstrap components
import Games from "server/Games";

export default function GameSlide() {
  const getLabel = (item) => {
    return (
      <>
        <Header inverted as="h3" style={{ marginBottom: 5, width: 180 }}>
          {item.name}
        </Header>
        <Header as="div" inverted style={{ marginTop: 0 }}>
          {item.active ? (
            <>
              {item.haveMatch && "1 vs 1"}
              {item.haveMatch && item.haveTournament && ", "}
              {item.haveTournament && "Tournaments"}
              {item.haveMatch && item.haveLeague && ", "}
              {item.haveLeague && "League"}
            </>
          ) : (
            <>Coming Soon</>
          )}
        </Header>
      </>
    );
  };
  return (
    <>
      <div
        style={{
          overflow: "auto",
          height: "100%",
          width: "100%",
          position: "relative",
          top: "0",
          zIndex: 3,
        }}
      >
        <div className="container" style={{ marginTop: 60 }}>
          <h4 className="header-text text-center" style={{ color: "#fff" }}>
            GAMES YOU CAN PLAY
          </h4>
          <Image.Group size="large" style={{ textAlign: "center" }}>
            {Games.games.map((item, i) => {
              return (
                <Image
                  bordered
                  rounded
                  centered
                  key={i.toString()}
                  src={"/assets/images/games/" + item.name + ".jpg"}
                  alt={item.name}
                  as={Link}
                  label={{
                    content: getLabel(item),
                    ribbon: true,
                    color: Colors[i].toLowerCase(),
                  }}
                  style={
                    item.active
                      ? { minHeight: 200 }
                      : { minHeight: 200, filter: "grayscale(90%)" }
                  }
                  size="medium"
                  to={"/game/" + item.name}
                />
              );
            })}
          </Image.Group>
        </div>
      </div>
    </>
  );
}
