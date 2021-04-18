import React, { Component, useRef, useEffect } from "react";
import { Switch, Route,Redirect } from "react-router-dom";

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

function Auth() {
  const currentUser = AuthService.getCurrentUser();

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
   
        return (
          <Route
            path={prop.layout + prop.path}
            key={key}
            component={prop.component}
            page={prop.name}
          />
        );
      
    });
  };
  
  return (
    <>
   
    <link href="/assets/css/landing-page.css" rel="stylesheet"/>
   
      <div className="landing-page landing-page1">
        {/* Navbar */}
        <LandNavbar/>
        {/* End Navbar */}
        <Switch>{getRoutes(routes)}</Switch>
      
      </div>
    
    </>
  );
}

export default (Auth);
