import React from "react";
import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Colors } from "const.js";

const GameBlock = ({ item, i }) => {
  const getLabel = (item) => {
    return (
      <>
        <h5
          className="header-text"
          style={{ marginBottom: 5, width: 180, color: "#fff", fontSize: 25 }}
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
  );
};
export default GameBlock;
