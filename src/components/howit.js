import React, { useState, useEffect } from "react";
import { Image, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Colors } from "const.js";
// react-bootstrap components
import Games from "server/Games";
import { themeColors } from "const.js";
export default function GameSlide() {
  const elements = ["1", "2", "3", "4"];
  const d = new Date();
  let da = d.getSeconds();
  let day = da % 7;

  return (
    <>
      <div className="section " style={{ padding: 0 }}>
        <div
          className={
            " filter-gradient " + themeColors[day + 2] + " section-gray"
          }
          data-color="orange"
        >
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
              <div className="info">
                <h4
                  className="header-text text-center"
                  style={{ color: "#fff" }}
                >
                  How it works
                </h4>
                <p style={{ color: "#fff" }}>
                  Loole.gg is a platform where you can challenge other gamers
                  for real money on the line. Once you find a match you’ll play
                  on your console (PS4/Xbox One), report results and we’ll
                  deposit the money to the winner. There are other ways to win
                  through multiplayer tourneys and monthly leader-board
                  challenges.
                </p>
                <div className="row">
                  {elements.map((value, index) => {
                    return (
                      <div className="col-md-3" key={index}>
                        <img
                          src={"/assets/img/" + value + ".jpg"}
                          alt={"how it work " + value}
                          style={{
                            maxWidth: "90%",
                            margin: "10px auto",
                            display: "block",
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
