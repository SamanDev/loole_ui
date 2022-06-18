import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ConfigProvider } from "react-avatar";
import { DEFCOLORS } from "const.js";
import { Dimmer, Loader } from "semantic-ui-react";
const LockScreenPage = lazy(() => import("views/Pages/LockScreenPage"));
const LandNavbar = lazy(() => import("components/Navbars/LandNavbar"));
const Landing = lazy(() => import("views/Pages/Landing"));
const Game = lazy(() => import("views/Pages/Game"));
const Content = lazy(() => import("views/Pages/Content"));
const User = lazy(() => import("views/Pages/User"));
const Market = lazy(() => import("views/Pages/MarketPlace"));
const Games = lazy(() => import("views/Pages/Games"));

import routes from "routes";
//import LandNavbar from "components/Navbars/LandNavbar.js";
//import LockScreenPage from "views/Pages/LockScreenPage.js";

import { getOffset } from "components/include";
const renderLoader = (inverted, componentName) => (
  <Dimmer active inverted={inverted}>
    <Loader size="large">Loading {componentName}</Loader>
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
                  <Suspense fallback={renderLoader(true, "Landing")}>
                    <Landing {...props} scrollTo={scrollTo} />
                  </Suspense>
                )}
                {prop.component == "User" && (
                  <Suspense fallback={renderLoader(true)}>
                    <User {...props} scrollTo={scrollTo} />
                  </Suspense>
                )}
                {prop.component == "Game" && (
                  <Suspense fallback={renderLoader(true)}>
                    <Game {...props} scrollTo={scrollTo} />
                  </Suspense>
                )}
                {prop.component == "Games" && (
                  <Suspense fallback={renderLoader(true)}>
                    <Games {...props} scrollTo={scrollTo} />
                  </Suspense>
                )}
                {prop.component == "Market" && (
                  <Suspense fallback={renderLoader(true)}>
                    <Market {...props} scrollTo={scrollTo} />
                  </Suspense>
                )}
                {prop.component == "Content" && (
                  <Suspense fallback={renderLoader(true)}>
                    <Content {...props} scrollTo={scrollTo} />
                  </Suspense>
                )}
                {prop.component == "LockScreenPage" && (
                  <Suspense fallback={renderLoader(true)}>
                    <LockScreenPage {...props} scrollTo={scrollTo} />
                  </Suspense>
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
      <Suspense fallback={renderLoader(true, "land")}>
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
