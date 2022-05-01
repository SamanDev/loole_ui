import React, { useEffect, useState, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ConfigProvider } from "react-avatar";
import { DEFCOLORS } from "const";

//const LockScreenPage = lazy(() => import("views/Pages/LockScreenPage.js"));
//const LandNavbar = lazy(() => import("components/Navbars/LandNavbar.js"));
const Landing = lazy(() => import("views/Pages/Landing.js"));
const Games = lazy(() => import("views/Pages/Games.js"));
const Content = lazy(() => import("views/Pages/Content.js"));
const User = lazy(() => import("views/Pages/User.js"));
import {
  Grid,
  Header,
  Icon,
  Modal,
  Divider,
  Dimmer,
  Loader,
  Segment,
  Button,
} from "semantic-ui-react";
import routes from "routes.js";
import LandNavbar from "components/Navbars/LandNavbar.js";
import LockScreenPage from "views/Pages/LockScreenPage.js";

import { getOffset } from "components/include";
const renderLoader = () => (
  <Dimmer active inverted>
    <Loader size="large">Loading</Loader>
  </Dimmer>
);
function scrollTo(elem) {
  setTimeout(function () {
    var x = getOffset(document.getElementById(elem)).top;

    window.scrollTo({
      top: x - 90,
      behavior: "smooth",
    });
  }, 100);
}
function Auth(props) {
  const getRoutes = (routes) => {
    //scrollToTop();

    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout !== "/panel") {
        //sconsole.log(prop.component)
        return (
          <Route
            path={prop.layout + prop.path}
            key={key}
            render={() => (
              <>
                {prop.component == "Landing" && (
                  <Landing {...props} scrollTo={scrollTo} />
                )}
                {prop.component == "User" && (
                  <User {...props} scrollTo={scrollTo} />
                )}
                {prop.component == "Games" && (
                  <Games {...props} scrollTo={scrollTo} />
                )}
                {prop.component == "Content" && (
                  <Content {...props} scrollTo={scrollTo} />
                )}
                {prop.component == "LockScreenPage" && (
                  <LockScreenPage {...props} scrollTo={scrollTo} />
                )}
              </>
            )}
          />
        );
      } else {
        return null;
      }
    });
  };

  //console.log('Land.js token:'+ JSON.stringify(token))

  const getPage = (routes) => {
    return routes.map((prop) => {
      if (
        window.location.href.indexOf(prop.layout.split("/")[1]) > -1 &&
        prop.path == "/"
      ) {
        if (prop.name) {
          return prop.name;
        }
      }
    });
  };

  useEffect(() => {
    if (window.location.hash) {
      var hash = window.location.hash;
      scrollTo(hash.replace("#", ""));
    } else {
      // Fragment doesn't exist
    }
  }, [window.location.hash]);

  return (
    <>
      <Suspense fallback={renderLoader()}>
        <ConfigProvider colors={DEFCOLORS}>
          {getPage(routes).indexOf("Match Lobby") > -1 ? (
            <Switch>{getRoutes(routes)}</Switch>
          ) : (
            <div className="landing-page landing-page1 landing-mobile">
              {/* Navbar */}
              <LandNavbar {...props} scrollTo={scrollTo} />
              {/* End Navbar */}

              <Switch>{getRoutes(routes)}</Switch>
            </div>
          )}
        </ConfigProvider>
      </Suspense>
    </>
  );
}

export default Auth;
