import React, { useState, useEffect, useContext } from "react";

import { useInfo } from "services/hooks";
import HomeEvents from "components/events/home.component";
import GameSlide from "components/GameSlide";
import LandStat from "components/landstat.component";
import Market from "components/market.component";
import { themeColors } from "const.js";
import UserContext from "context/UserState";
const d = new Date();
let da = d.getSeconds();
let day = da % 7;
function Landing(prop) {
  const [myState, setMyState] = useState(prop.myState);
  useEffect(() => {
    setMyState(prop.myState);
  }, [prop.myState]);
  const { data: looleInfo } = useInfo();
  const context = useContext(UserContext);
  const { currentUser } = context.uList;
  const elements = ["1", "2-4_01", "2-4_02", "2-4_03"];
  useEffect(() => {
    if (looleInfo) {
      prop.onUpdateItem("looleInfo", looleInfo);
    }
  }, [looleInfo]);
  return (
    <>
      <div className="wrapper">
        <div
          className={
            "parallax filter-gradient " + themeColors[day] + " section-gray"
          }
          data-color="red"
        >
          <div className="parallax-background">
            <img
              className="parallax-background-image"
              src="/assets/img/showcases/showcase-1/bg.jpg"
            />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <div className="description">
                  <h2>
                    With Loole App you can make money from your games skils
                  </h2>
                  <br />
                  <p>
                    Now gaming is not just about spending time, it is about
                    making money and having fun.
                  </p>
                  <p>
                    Any gamer or player who wants to make money from his skill
                    must install the Loole app on his phone because you can make
                    money with the Loole. He only plays with players around the
                    world who claim to be like you.
                  </p>
                  <h5>
                    <br />
                    <br />
                  </h5>
                </div>
              </div>
              <div className="col-md-5  hidden-xs">
                <div className="parallax-image">
                  <img
                    className="phone"
                    src="assets/img/showcases/showcase-1/iphone.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section section-gray section-clients section-no-padding">
          <div className="container text-center">
            <h4 className="header-text">They were the first to go PlayIT</h4>
            <p>
              How're you? The Loole introduces the players to each other and
              puts my pair of money in a safe place. After the game, the winner
              sends a video according to the Loole guide to prove his victory
              and takes his money.
              <br />
              Also, there is no operator for deposit and withdrawal and
              everything is instant and automatic.
            </p>
            <LandStat {...prop} />
          </div>
        </div>
        <div className="section " style={{ padding: 0 }}>
          <div
            className={
              " filter-gradient " + themeColors[day + 1] + " section-gray"
            }
            data-color="orange"
          >
            <div className="container">
              <GameSlide />
            </div>
          </div>
        </div>
        <div className="section   section-no-padding">
          <div className="container" style={{ minHeight: 500 }}>
            <h4 className="header-text  text-center" id="market">
              Don't ever be out!
            </h4>
            <Market />
          </div>
        </div>
        <div
          className="section section-presentation section-gray  section-no-padding"
          style={{ padding: 0, margin: 0, overflow: "visible" }}
        >
          <div style={{ overflow: "hidden" }}>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="description">
                    <h4 className="header-text">Online Deposit</h4>
                    <p>
                      The account is charged online using the Perfect Money
                      voucher or Cryptocurrency.
                    </p>
                    <h4 className="header-text">Online Cash back</h4>
                    <p>
                      You get dollars online using Perfect Money vouchers or
                      Cryptocurrency. There is no middle operator, everything is
                      automatic
                    </p>
                    <h4 className="header-text">24/7 Support</h4>
                    <p>
                      Whatever problem you have, our supporters are by your side
                      until it is resolved.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 mobile hidden">
                  <img src="assets/img/showcases/showcase-1/mac.png" />
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-6 mobile hidden">
                <img src="assets/img/showcases/showcase-1/iphones.png" />
              </div>
              <div className="col-md-6">
                <div className="description">
                  <h4 className="header-text">Loole proudly</h4>
                  <p>
                    Receives ten percent of the total prizes as a profit for his
                    unique services.
                  </p>
                  <h4 className="header-text">Do not miss the commission</h4>
                  <p>
                    In appreciation of the referral users, Loole pays a
                    commission of ten percent of its profit.
                  </p>
                  <br />
                  <br />
                  <br />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
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
                    for real money on the line. Once you find a match you’ll
                    play on your console (PS4/Xbox One), report results and
                    we’ll deposit the money to the winner. There are other ways
                    to win through multiplayer tourneys and monthly leader-board
                    challenges.
                  </p>
                  <div className="row">
                    {elements.map((value, index) => {
                      return (
                        <div className="col-md-3" key={index}>
                          <img
                            src={
                              "https://www.gamingfrog.com/wp-content/uploads/2020/08/How-it-works-" +
                              value +
                              ".jpg"
                            }
                            style={{
                              maxWidth: "60%",
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

        <div className="section section-gray section-no-padding">
          <div className="container" style={{ minHeight: 500 }}>
            <h4 className="header-text text-center">Is it Real Cash?</h4>
            <p className="header-text text-center">
              Absolutly YES! Cash on the table.
            </p>

            <HomeEvents {...prop} />
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
}

export default Landing;
