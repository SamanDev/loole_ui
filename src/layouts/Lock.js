import React from "react";
import { Switch, Route } from "react-router-dom";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Container,
  Col,
} from "react-bootstrap";

import SiteNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import Sidebar from "components/Sidebar/Chat.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
// dinamically create auth routes
import routes from "routes.js";
function scrollToTop() {

  window.scrollTo({
top: 0,
behavior: "smooth"
});


};
function Auth() {
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/lock") {
        return (
          <Route
            path={prop.layout + prop.path}
            key={key}
            component={prop.component}
          />
        );
      } else {
        return null;
      }
    });
  };
  const getPage = (routes) => {
    return routes.map((prop, key) => {
      
      if (window.location.href.indexOf(prop.path)>-1) {
        scrollToTop();
    return prop.name
    
      }
    });
  };
  return (
    <>
    <Sidebar  
         
          
        />
         <div className="main-panel">
          <AdminNavbar page={getPage(routes)}/>
        
          <div className="content">
          <Switch>{getRoutes(routes)}</Switch>
          </div>
     
        
      
      </div>
   
    </>
  );
}

export default Auth;
