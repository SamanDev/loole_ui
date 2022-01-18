import React from "react";
import { Switch, Route } from "react-router-dom";
import { ConfigProvider } from "react-avatar";
import { DEFCOLORS } from "const";
// react-bootstrap components
import LockScreenPage from "views/Pages/LockScreenPage.js";
import LandNavbar from "components/Navbars/LandNavbar.js";
// dinamically create auth routes
import "assets/css/landing-page.css";
import Landing from "views/Pages/Landing.js";
import User from "views/Pages/User.js";
import routes from "routes.js";
import Games from "views/Pages/Games.js";
import Content from "views/Pages/Content.js";
import { getOffset } from "components/include";
function scrollTo(elem) {
  var x = getOffset(document.getElementById(elem)).top;

  window.scrollTo({
    top: x,
    behavior: "smooth",
  });
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
                {prop.component == "Landing" && <Landing {...props} />}
                {prop.component == "User" && <User {...props} />}
                {prop.component == "Games" && <Games {...props} />}
                {prop.component == "Content" && <Content {...props} />}
                {prop.component == "LockScreenPage" && (
                  <LockScreenPage {...props} />
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
      if (window.location.href.indexOf(prop.layout) > -1 && prop.path == "/") {
        if (prop.name) {
          return prop.name;
        }
      }
    });
  };

  return (
    <>
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
    </>
  );
}

export default Auth;
