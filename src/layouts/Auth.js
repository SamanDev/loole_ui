import React, { Component, useState, useEffect}from "react";
import { Switch, Route,Redirect } from "react-router-dom";


import Avatar, { ConfigProvider } from "react-avatar";
import { DEFCOLORS,defUser } from "const";
import { useAllEvents,useUser } from "services/hooks";
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
import LandNavbar from "components/Navbars/LandNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import userService from "services/user.service";
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
     // scrollToTop()
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
function  Auth(prop) {
  const [currentUser,setCurrentUser] = useState(prop.token);
  
  
  
      var responsive = $(window).width();
        if (responsive >= 768) {
          $('.landing-page').removeClass('landing-mobile')
      }
      
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