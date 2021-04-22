import React, { Component }from "react";
import { Switch, Route,Redirect } from "react-router-dom";

import $ from "jquery";
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
import AuthNavbar from "components/Navbars/LandNavbar.js";
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
    
    
  


};
const getRoutes = (routes) => {
  return routes.map((prop, key) => {
    
    if (prop.collapse) {
      return getRoutes(prop.views);
    }
    if (prop.layout === "/auth") {
      //alert(prop.name )
      scrollToTop()
      return (
        <Route
          path={prop.layout + prop.path}
          key={key}
          component={prop.component}
          page={prop.name}
        />
      );
    } else {
      return null;
    }
  });
};
  class Auth extends Component {
  
componentDidMount() {
  
  
      var responsive = $(window).width();
      if (responsive >= 768) {
        $('.landing-page').removeClass('landing-mobile')
    }
    

}
  
  render() {
    return (
      <>
        
     <div className="landing-page landing-page1 landing-mobile">
          {/* Navbar */}
          <AuthNavbar/>
          {/* End Navbar */}
          <Switch>{getRoutes(routes)}</Switch>
        
        </div>
      
      </>
    );
  }
 
}

export default (Auth);
