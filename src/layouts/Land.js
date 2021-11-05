import React, { Component, useRef, useEffect } from "react";
import { Switch, Route,Redirect } from "react-router-dom";

import Avatar, { ConfigProvider } from "react-avatar";
import { DEFCOLORS } from "const";
import { useAllEvents,useUser } from "services/hooks"
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

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import {
  userState
} from 'atoms';
import routes from "routes.js";
function scrollToTop() {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
    });
    
    


};

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout !== "/panel" ) {
     
      
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
  var currentUser = '';
  
function  Auth() {
  const queryClient = new QueryClient()
  const [token,setToken] = useRecoilState(userState);
  currentUser = token;
  console.log(token)
  var currpage = "Dashboard"
  useEffect(() => {
    //userService.getUser()
    
    //setToken(AuthService.getCurrentUser())
    
      //alert()
     // console.log("change state: " + this.state.loading);
      
   
    // return a function to execute at unmount
    return () => {
      
      //setEvents('');
    
    }
  }, []) // notice the empty array
  
  if (currentUser==''){
    userService.getUser()
    
    setToken(AuthService.getCurrentUser())
     currentUser = token;
     console.log(token)
    
    return <h4 style={{textAlign: "center"}}>Loading 
    <Spinner animation="grow" size="sm" />
    <Spinner animation="grow" size="sm" />
    <Spinner animation="grow" size="sm" /></h4>;
  }
  
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
        <QueryClientProvider client={queryClient}>
        <Switch>{getRoutes(routes)}</Switch>
        </QueryClientProvider>
      </div>
      </ConfigProvider>
    
    </>
  );
    
}

export default (Auth);
