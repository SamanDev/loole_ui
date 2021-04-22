import React, { Component, useRef, useEffect } from "react";
import { Switch, Route,Redirect } from "react-router-dom";

import Avatar, { ConfigProvider } from "react-avatar";
import { DEFCOLORS } from "const";

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
import LandNavbar from "components/Navbars/LandNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import AuthService from "services/auth.service";
// dinamically create auth routes
import routes from "routes.js";
function scrollToTop() {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
    });
    try {
      document.getElementById("myCheck").click();
    } catch (error) {
      
    }
  


};
function Auth() {
  const currentUser = AuthService.getCurrentUser();

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout !== "/panel" ) {
     
      scrollToTop();
        return (
          <Route
            path={prop.layout + prop.path}
            key={key}
            component={prop.component}
            page={prop.name}
          
          />
        );
        }
    });
  };
  
  return (
    <>
   
    <ConfigProvider colors={DEFCOLORS}>
      <div className="landing-page landing-mobile">
        {/* Navbar */}
        <LandNavbar/>
        {/* End Navbar */}
        
        <Switch>{getRoutes(routes)}</Switch>
      
      </div>
      </ConfigProvider>
    </>
  );
}

export default (Auth);
