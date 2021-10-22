import React ,{useEffect, useState} from "react";
import { Switch, Route,Redirect } from "react-router-dom";
import Avatar, { ConfigProvider } from "react-avatar";
import $ from "jquery";

import Active  from "components/active.component";
// react-bootstrap components
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  Pagination,
  Container,
  Row,
  Col,
  Spinner
} from "react-bootstrap";
import { DEFCOLORS } from "const";
// core components
import Sidebar from "components/Sidebar/Sidebar.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import Chatbar from "components/Sidebar/Chat.js";
// dinamically create dashboard routes
import routes from "routes.js";

import image1 from "assets/img/bg.jpg";
import image2 from "assets/img/bg.jpg";
import image3 from "assets/img/bg.jpg";
import image4 from "assets/img/bg.jpg";

import UserWebsocket from 'services/user.websocket'
import AuthService from "services/auth.service";
import userService from "services/user.service";
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
function scrollToTop() {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
    });
    


};
var getRoutes = (routes,tokensend) => {
    
  return routes.map((prop, key) => {
    
    if (prop.collapse) {
      return getRoutes(prop.views,tokensend);
    }
    if (prop.layout === "/panel" ) {
      
      scrollToTop();
     
      return (
        
        
        <Route
          path={prop.layout + prop.path}
          key={key}
          component={prop.component}
          
          token={tokensend}
          
        />
          
        
      );
    } else {
      return null;
    }
  });
};

const getPage = (routes) => {
  return routes.map((prop, key) => {
    
    if (window.location.href.indexOf(prop.path)>-1 && prop.path !='/') {
      
  return prop.name
  
    }
  });
};
var currentUser = '';
function  Panel() {
  
   
  const [sidebarImage, setSidebarImage] = React.useState(image3);
  const [sidebarBackground, setSidebarBackground] = React.useState("orange");
  const [token,setToken] = useRecoilState(userState);
  
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
    
    
    return <h4 style={{textAlign: "center"}}>Loading 
    <Spinner animation="grow" size="sm" />
    <Spinner animation="grow" size="sm" />
    <Spinner animation="grow" size="sm" /></h4>;
  }
  
  

  

  //console.log(currentUser)
  return (
    
    <>
   
    
   <ConfigProvider colors={DEFCOLORS} >
      
      {getPage(routes).indexOf('Match Lobby') > -1 ? (
        <Switch>{getRoutes(routes,currentUser)}</Switch>
      ):(
        <>
        <div className="wrapper" >
<Sidebar
          routes={routes}
          image={sidebarImage}
          background={sidebarBackground}
          token={token}
          page={currpage}
        />
        
        <div className="main-panel">
        <AdminNavbar page={getPage(routes)} token={token}/>
        <div className="content">
         
            <Switch>{getRoutes(routes,token)}</Switch>
          </div>
          <AdminFooter />
          <div
            className="close-layer"
            onClick={() =>
              document.documentElement.classList.toggle("nav-open")
            }
          />
          </div>
          </div>
          </>
      )}
        
        </ConfigProvider>
       
    </>
    
  );
  
}

export default Panel;
