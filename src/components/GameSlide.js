import React from "react";
import { Image, Header, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Colors } from "const.js";
// react-bootstrap components
import Games from "server/Games";

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
  return (
    <>
      <div
        style={{
          height: "100%",
          width: "100%",
          position: "relative",
          top: "0",
          zIndex: 3,
        }}
      >
        <div className="container" id="games" style={{ marginTop: 60 }}>
          <h4
            className="header-text text-center"
            style={{
              color: "#fff",
              position: "relative",
              zIndex: 2,
              margin: 0,
              fontWeight: 400,
            }}
          >
            GAMES YOU CAN PLAY
          </h4>
          <p
            className="header-text text-center"
            style={{
              color: "#fff",
              position: "relative",
              zIndex: 2,
              marginTop: 5,
              fontWeight: 400,
            }}
          >
            1 vs 1, Tournament, League
          </p>
          <Card.Group
            centered
            itemsPerRow={prop.size}
            stackable
            style={{
              marginBottom: 20,
              textAlign: "left",
            }}
          >
            {Games.games.map((item, i) => {
              if (prop.size == 2 || item.active) {
                return (
                  <Card key={i.toString()}>
                    <Image
                      wrapped
                      ui={false}
                      bordered
                      rounded
                      centered
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
                  </Card>
                );
              }
            })}
          </Card.Group>
        </div>
      </div>
    </>
  );
}
