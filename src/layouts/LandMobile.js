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
function Auth(prop) {
  const [events,setEvents] = useState(prop.events);
  
  const [currentUser,setCurrentUser] = useState(prop.token);
  
  useEffect(() => {
   
      setCurrentUser(() => prop.token)
    
  
    
  }, [prop.token]);
  
  useEffect(() => {
    
    setEvents(() => prop.events)
    var responsive = $(window).width();
    if (responsive >= 768) {
      $('.landing-page').removeClass('landing-mobile')
  }
  }, [prop.events]);

  const getRoutes = (routes) => {
    //scrollToTop();
    return routes.map((prop, key) => {
      
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout !== "/panel" ) {
        //sconsole.log(prop.component)
        return (
          
          
          <Route
            path={prop.layout + prop.path}
            key={key}
            render={(props) => (
              <>
             
              {(prop.component=='Landing') && (<Landing authed={true} events={events} token={currentUser}  />)}
            
              
              </>
            )}
           
            
            
          />
            
          
        );
      } else {
        return null;
      }
    });
  };
  
  return (
    <>
   
    <ConfigProvider colors={DEFCOLORS}>
      <div className="landing-page landing-mobile">
        {/* Navbar */}
        <LandNavbar token={currentUser}/>
        {/* End Navbar */}
        
        <Switch>{getRoutes(routes)}</Switch>
      
      </div>
      </ConfigProvider>
    </>
  );
}

export default (Auth);
