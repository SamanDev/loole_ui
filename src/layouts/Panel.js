import React ,{useEffect, useState} from "react";
import { Switch, Route,Redirect } from "react-router-dom";
import Avatar, { ConfigProvider } from "react-avatar";
import { useHistory } from "react-router";

import $ from "jquery";
//import { GlobalProvider } from 'context/GlobalState';
import Active  from "components/active.component";
// react-bootstrap components
import {
  Spinner,
  Container
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
import Dashboard from "views/Dashboard.js";
import Rewards from "views/Rewards.js";
import MyMatches from "views/MyMatches.js";
import Market from "views/Market.js";
import Cashier from "views/Cashier.js";
import Profile from "views/Profile.js";
import CreateMatch from "views/Add.js";
import LockScreenPage from "views/Pages/LockScreenPage.js";

function scrollToTop() {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
    });
    
    
  


};

function  Panel(prop) {
  
  
  
  

  const [sidebarImage, setSidebarImage] = React.useState(image3);
  const [sidebarBackground, setSidebarBackground] = React.useState("orange");
  
  

    
  const [events,setEvents] = useState(prop.events);
  const [eventID,setEventID] = useState(prop.eventID);
  const [currentUser,setCurrentUser] = useState(prop.token);
  const [keyDash, setKeyDash] = useState(prop.tabkey);
  const [keyProfile, setKeyProfile] = useState(prop.tabkeyprofile);
  const [keyMyMatch, setKeyMyMatch] = useState(prop.tabkeymatch);
   // const query = mutationCache.findAll("User");
    //const query = mutationCache.getAll()
const [eventIDQ,setEventIDQ] = useState(prop.eventIDQ);
const [matchIDQ,setMatchIDQ] = useState(prop.matchIDQ);
  useEffect(() => {
   
    setCurrentUser(() => prop.token)
  

  
}, [prop.token]);

useEffect(() => {
  
  setEvents(() => prop.events)
  
}, [prop.events]);
  
  var currpage = "Dashboard";
  
  useEffect(() => {
  //alert(eventIDQ)
    //setEventIDQ(() => eventIDQ)
    prop.handleID(eventIDQ)
    //queryClient.invalidateQueries()
    //useEventByID(eventIDQ);

  }, [eventIDQ]);
  useEffect(() => {
  prop.handleTabID(keyDash)
    //setKeyDash(() => keyDash)
    //queryClient.invalidateQueries()
    //useEventByID(eventIDQ);

  }, [keyDash]);
  useEffect(() => {
  prop.handleProfileTabID(keyProfile)
    //setKeyDash(() => keyDash)
    //queryClient.invalidateQueries()
    //useEventByID(eventIDQ);

  }, [keyProfile]);
  useEffect(() => {
  
    setMatchIDQ(() => matchIDQ)
    //queryClient.invalidateQueries()
    //useEventByID(eventIDQ);

  }, [matchIDQ]);
  useEffect(() => {
    prop.handleID(eventIDQ)
  }, [prop.eventIDQ]);
  useEffect(() => {
    
  if(eventIDQ && prop.eventID){
    
    setEventID(() => prop.eventID)
    
  }
    
    
  }, [prop.eventID]);
  
    
    
    
    
   
    
        
      
  
  
  const getRoutes = (routes) => {
    //scrollToTop();
    return routes.map((prop, key) => {
      
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/panel" ) {
        //sconsole.log(prop.component)
        return (
          
          
          <Route
            path={prop.layout + prop.path}
            key={key}
            render={(props) => (
              <>
              {(prop.component=='Profile') && (<Profile authed={true}  token={currentUser} tabkey={keyProfile} handleProfileTabID={setKeyProfile} />)}
              {(prop.component=='Dashboard') && (<Dashboard authed={true} events={events} token={currentUser} tabkey={keyDash} handleTabID={setKeyDash}   />)}
              {(prop.component=='LockScreenPage') && (<LockScreenPage authed={true} event={eventID} token={currentUser} handleID={setEventIDQ} handleMatchID={setMatchIDQ} />)}
              {(prop.component=='Cashier') && (<Cashier authed={true} token={currentUser} />)}
              {(prop.component=='Rewards') && (<Rewards authed={true} token={currentUser} />)}
              {(prop.component=='MyMatches') && (<MyMatches authed={true} token={currentUser} tabkey={keyMyMatch} handleTabID={setKeyMyMatch} />)}
              {(prop.component=='CreateMatch') && (<CreateMatch authed={true} token={currentUser} />)}
              
              </>
            )}
           
            
            
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

    
  
  
  if(!currentUser )
  if(eventIDQ){
return(
  <div
              className="full-page lock-page"
              data-color="black"
              style={{ height: "100vh", overflow: "auto" }}
              data-image={require("assets/img/bg.jpg").default}
            >
              <div
                className="content "
                style={{
                  fontSize: 50,
                  color: "#fff",
                  position: "relative",
                  zIndex: "23",
                }}
              >
                <Container className="text-center">
                  <h4 style={{ textAlign: "center" }}>
                  Loading User Data
                    <Spinner animation="grow" size="sm" />
                    <Spinner animation="grow" size="sm" />
                    <Spinner animation="grow" size="sm" />
                  </h4>
                  
                </Container>
              </div>
              <div
                className="full-page-background"
                style={{
                  backgroundImage:
                    "url(" + require("assets/img/bg.jpg").default + ")",
                }}
              ></div>
            </div>
)
  }else{
    return (
      <div className="wrapper " >
  
  <div className="sidebar" data-color="orange" data-image="/static/media/bg.3cef9caf.jpg"><div className="sidebar-wrapper"></div><div className="sidebar-background" style={{backgroundImages: "url(&quot;/static/media/bg.3cef9caf.jpg&quot;)"}}></div></div>
          <div className="main-panel">
          <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{background: "rgb(17, 17, 17)"}}><div className="container-fluid"><div className="navbar-wrapper"><span className="navbar-brand"><span className="">Dashboard</span></span></div></div></nav>
          <div className="content">
          <h4 style={{textAlign: "center"}}>Loading User Data
    <Spinner animation="grow" size="sm" />
    <Spinner animation="grow" size="sm" />
    <Spinner animation="grow" size="sm" /></h4>
             
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
    );
  }
  
  return (
    
    <>
   
   <ConfigProvider colors={DEFCOLORS} >
  
      {getPage(routes).indexOf('Match Lobby') > -1 ? (
        <Switch>{getRoutes(routes)}</Switch>
      ):(
        <>
        <div className="wrapper " >
<Sidebar
          routes={routes}
          image={sidebarImage}
          background={sidebarBackground}
          token={currentUser}
          page={currpage}
        />
        
        <div className="main-panel">
        <AdminNavbar page={getPage(routes)} token={currentUser}/>
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
