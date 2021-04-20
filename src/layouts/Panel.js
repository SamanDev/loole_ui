import React from "react";
import { Switch, Route,Redirect } from "react-router-dom";
import Avatar, { ConfigProvider } from "react-avatar";
import $ from "jquery";

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

function scrollToTop() {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
    });
    


};

function Panel() {
  
  const [sidebarImage, setSidebarImage] = React.useState(image3);
  const [sidebarBackground, setSidebarBackground] = React.useState("blue");
  const currentUser = AuthService.getCurrentUser();
 // userService.getEvents();
 
  if (!currentUser) {
    return <Redirect to="/auth/login-page"/>
  }else{
    UserWebsocket.connect(currentUser.accessToken+"&user="+currentUser.username);
    setInterval(function(){
      UserWebsocket.connect(currentUser.accessToken+"&user="+currentUser.username);
    },2000)
  }
 

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/panel" ) {
        
        scrollToTop();
        
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
      
      if (window.location.href.indexOf(prop.path)>-1 && prop.path !='/') {
        
    return prop.name
    
      }
    });
  };
  
  return (
    
    <>
   
    
   <ConfigProvider colors={DEFCOLORS}>
      
      {getPage(routes).indexOf('Match Lobby') > -1 ? (
        <Switch>{getRoutes(routes)}</Switch>
      ):(
        <>
        <div className="wrapper" >
<Sidebar
          routes={routes}
          image={sidebarImage}
          background={sidebarBackground}
          
        />
        
        <div className="main-panel">
        <AdminNavbar page={getPage(routes)}/>
        <div className="content">
         
            <Switch>{getRoutes(routes)}</Switch>
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
