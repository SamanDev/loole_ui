import React, { lazy } from "react";
const HomeEvents = lazy(() => import("components/events/home.component"));
const GameSlide = lazy(() => import("components/GameSlide"));
const HowIt = lazy(() => import("components/howit"));
const LandStat = lazy(() => import("components/landstat.component"));
const Footer = lazy(() => import("components/Navbars/Footer"));
const Market = lazy(() => import("components/market.component"));
const RegisterBtn = lazy(() => import("components/registerBtn"));
//import HomeEvents from "components/events/home.component";
//import GameSlide from "components/GameSlide";
//import HowIt from "components/howit";
//import LandStat from "components/landstat.component";
//import Market from "components/market.component";
//import RegisterBtn from "components/registerBtn";
import { themeColors } from "const.js";
import { Helmet } from "react-helmet";
//import Footer from "components/Navbars/Footer";
const d = new Date();
let da = d.getSeconds();
let day = da % 7;
function Landing(prop) {
  return (
    <>
      <Helmet>
        <title>Loole App - Play Online Games for Cash</title>
        <meta
          name="description"
          content="Loole.gg is an online global platform where you can compete for real cash and coins in your favorite video games on both consoles, PC and Mobile."
        />
        <meta
          name="keywords"
          content="loole.gg, gaming, video, games, challenge, 8Pool, ClashRoyale, fifa2021, fifa2022, competition, tournament"
        />
      </Helmet>
      <div className="wrapper">
        <div
          className={
            "parallax filter-gradient " +
            themeColors[day + 1].replace("grey", "gray") +
            " section-gray"
          }
          data-color="red"
        >
          <div className="parallax-background">
            <img
              className="parallax-background-image"
              src="/assets/img/showcases/showcase-1/bg-min.webp"
              alt="loole home"
            />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <div className="description">
                  <h1>Loole app lets you earn money with your gaming skills</h1>
                  <br />
                  <p>
                    Gaming today is not only about passing time, but also about
                    earning money and having fun.
                  </p>
                  <p>
                    Any gamer or player who wants to earn money with his skills
                    must install the Loole app on his phone, because with Loole
                    you can earn money. It only plays with gamers around the
                    world who claim to be like you.
                  </p>
                  <br />
                  <br />
                  <RegisterBtn {...prop} color={themeColors[day]} />
                  <br />
                  <br />
                </div>
              </div>
              <div className="col-md-5  hidden-xs">
                <div className="parallax-image">
                  <img
                    className="phone"
                    src="assets/img/showcases/showcase-1/iphone-min.webp"
                    alt="loole dashboard"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section section-gray section-clients section-no-padding">
          <div className="container text-center">
            <h2 className="header-text">They were the first to go PlayIT</h2>
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
        <div className="section " style={{ padding: 0, overflow: "auto" }}>
          <div
            className={
              " filter-gradient " +
              themeColors[day + 2].replace("grey", "gray") +
              " "
            }
            data-color="orange"
            style={{ position: "static" }}
          >
            <div className="container">
              <GameSlide size="2" />
            </div>
          </div>
        </div>
        <div className="section   section-no-padding">
          <div className="container" style={{ minHeight: 500 }}>
            <h4 className="header-text  text-center" id="market">
              Don't ever be out!
            </h4>
            <Market {...prop} />
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
                  <img
                    src="assets/img/showcases/showcase-1/mac-min.webp"
                    alt="loole on pc"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-6 mobile hidden">
                <img
                  src="assets/img/showcases/showcase-1/iphones-min.webp"
                  alt="loole on mobile"
                />
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
        <HowIt />

        <div className="section section-gray section-no-padding">
          <div className="container" style={{ minHeight: 500 }}>
            <h4 className="header-text text-center">Is it Real Cash?</h4>
            <p className="header-text text-center">
              Absolutely YES! Cash on the table.
            </p>

            <HomeEvents {...prop} />
          </div>
        </div>

        <Footer {...prop} />
      </div>
    </>
  );
}

export default Landing;
