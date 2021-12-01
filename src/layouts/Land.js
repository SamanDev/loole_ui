import React, { Component, useRef, useEffect,useState } from "react";
import { Switch, Route,Redirect } from "react-router-dom";
import { useHistory } from "react-router";
import Avatar, { ConfigProvider } from "react-avatar";
import { DEFCOLORS } from "const";
import {useQuery,useMutation,useQueryClient,QueryClient,QueryClientProvider, } from 'react-query'
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
  Spinner
} from "react-bootstrap";

import eventBus from "views/eventBus";
import LandNavbar from "components/Navbars/LandNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import userService from "services/user.service";
import AuthService from "services/auth.service";
// dinamically create auth routes

import Landing from "views/Pages/Landing.js";
import LandingMobile from "views/Pages/LandingMobile.js";
import Games from "views/Pages/Games.js";
import Content from "views/Pages/Content.js";
import User from "views/Pages/User.js";
import routes from "routes.js";
import authService from "services/auth.service";

import {
  
  getQueryVariable,
 editEvent,
  haveAdmin,
  editDateTime
} from "components/include";

import { useAllEvents,useUser,useAllEventsByStatus,useEventByID } from "services/hooks"
function scrollToTop() {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
    });
    
    


};


function  Auth(prop) {
  
  
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
              {(prop.component=='User') && (<User authed={true} events={events} token={currentUser}  />)}
            
              
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
  
  
  
  
     
      
  return (
    <>
   
    <ConfigProvider colors={DEFCOLORS}>
      <div className="landing-page landing-page1 landing-mobile">
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
