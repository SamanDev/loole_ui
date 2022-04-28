import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import { withRouter } from "react-router-dom";
import "react-vertical-timeline-component/style.min.css";
import TagsForm from "components/profile/tags.component";
import UserEvents from "components/events/user.component";
// react-bootstrap components
import { Dimmer, Loader, Segment, Breadcrumb } from "semantic-ui-react";
import { userDetails, getOffset, setAvatar } from "components/include";
import { useUserProfile } from "services/hooks";
import DashStat from "components/userstat.component";
import GlobalContext from "context/GlobalState";
import Market from "components/market.component";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import RegisterBtn from "components/registerBtn";
function scrollTo(elem) {
  var x = getOffset(document.getElementById(elem)).top;

  window.scrollTo({
    top: x,
    behavior: "smooth",
  });
}
var str;
var res;
function profile(prop) {
  const { data: userGet } = useUserProfile(prop.user);
  //const token = userGet;
  const [myState, setMyState] = useState(prop.myState);
  useEffect(() => {
    setMyState(prop.myState);
  }, [prop.myState]);
  useEffect(() => {
    if (userGet) {
      prop.onUpdateItem("profileUser", userGet);
    }
  }, [userGet]);
  const currentUser = prop.findStateId(myState, "profileUser");
  useEffect(() => {
    if (currentUser) {
      str = currentUser.username;
      res = str.substring(0, 1);
      res = res + " " + str.substring(1, 2);
      res = setAvatar(str);
    }
  }, [currentUser]);
  if (!userGet || !currentUser) {
    return (
      <Segment style={{ height: "100%", width: "100%", position: "absolute" }}>
        <Dimmer active inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>
      </Segment>
    );
  }

  const sections = [
    { key: "Home", content: "Home", link: true, to: "/home", as: Link },
    {
      key: str + " Profile",
      content: str + " Profile",
      active: true,
    },
  ];

  return (
    <>
      <Helmet>
        <title>{currentUser.username} Profile - Loole.gg</title>
      </Helmet>
      <div className="wrapper">
        <div
          className="parallax filter-gradient gray section-gray"
          data-color="red"
        >
          <div className="parallax-background">
            <img
              className="parallax-background-image"
              src="/assets/img/showcases/showcase-1/bg.jpg"
            />
          </div>
          <div className="container user crump">
            <Breadcrumb icon="right angle" sections={sections} />
            <div className="row">
              <div className="col-md-12">
                <div className="description">
                  <div
                    className=" winner avatar"
                    style={{ width: 92, height: 92 }}
                  ></div>

                  <div className="author  avatar text-center">
                    <Avatar
                      size="114"
                      round={true}
                      title={currentUser.username}
                      name={res}
                    />
                  </div>
                  <div
                    className="card-description text-center"
                    style={{ marginBottom: 20, marginTop: 20 }}
                  >
                    {userDetails(currentUser)}
                  </div>
                  <DashStat {...prop} scrollTo={scrollTo} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section  section-clients section-no-padding section-gray">
          <div className="text-center" style={{ marginBottom: 40 }}>
            <RegisterBtn {...prop} color="red" />
          </div>
          <div className="container">
            <h2 className="header-text  text-center">Game Tags</h2>
            <TagsForm {...prop} myStateLoc="hi" />
          </div>
        </div>
        <div className="section section-clients section-no-padding">
          <div className="container-fluid">
            <h3 className="header-text  text-center" id="userlastactivity">
              Last Activity
            </h3>
            <div className="container" style={{ minHeight: 500 }}>
              <UserEvents {...prop} user={currentUser} myStateLoc={true} />
            </div>
          </div>
        </div>
        <div className="section   section-gray">
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
}

export default withRouter(profile);
