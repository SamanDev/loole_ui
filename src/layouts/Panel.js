import React ,{useEffect, useState} from "react";
import { Switch, Route,Redirect } from "react-router-dom";
import Avatar, { ConfigProvider } from "react-avatar";
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
import UserWebsocket from 'services/user.websocket'
import AuthService from "services/auth.service";
import userService from "services/user.service";

import eventBus from "views/eventBus";
import {
  
  getQueryVariable,
 editEvent,
  haveAdmin,
  editDateTime
} from "components/include";
import {useQuery,useMutation,useQueryClient,QueryClient,QueryClientProvider, QueryCache,MutationCache} from 'react-query'
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
import { useAllEvents,useUser,useAllEventsByStatus,useEventByID } from "services/hooks"
function scrollToTop() {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
    });
    
    


};


var eventDefID = getQueryVariable("id");
var eventDefMatchID = getQueryVariable("matchid");
//if(!eventDefID){eventDefID = 203}

function  Panel(prop) {
  
  const queryClient =  useQueryClient();
  //queryClient.clear()
  
  
  
    
   // const query = mutationCache.findAll("User");
    //const query = mutationCache.getAll()
const [eventIDQ,setEventIDQ] = useState(eventDefID);
const [matchIDQ,setMatchIDQ] = useState(eventDefMatchID);
  

  const [sidebarImage, setSidebarImage] = React.useState(image3);
  const [sidebarBackground, setSidebarBackground] = React.useState("orange");
  
  

  
  const url = window.location.search.substring(1);

    
  const [events,setEvents] = useState();
  const [eventID,setEventID] = useState();
  const [currentUser,setCurrentUser] = useState();
  const { data: userGet  } = useUser();
  
  const { data: eventsGet } = useAllEventsByStatus('All');
  const { data: eventGet } = useEventByID(eventIDQ);
  var currpage = "Dashboard";
  useEffect(() => {
    setCurrentUser(() => userGet)
    eventBus.on("eventsDataUser", (userGet) => {
   
        setCurrentUser(userGet)
      queryClient.setQueryData(["User"], userGet)
      
      
      
    });
  }, [userGet]);
  
  useEffect(() => {
    
    setEvents(() => eventsGet)
    eventBus.on("eventsData", (eventsGet) => {
      
      if(eventsGet && eventsGet !=events) {
        setEvents(eventsGet);
        queryClient.setQueryData(['Events','All'], eventsGet)
      
      }
     
 
        });
    
  }, [eventsGet]);
  useEffect(() => {
  
    setEventIDQ(() => eventIDQ)
    //queryClient.invalidateQueries()
    //useEventByID(eventIDQ);

  }, [eventIDQ]);
  useEffect(() => {
  
    setMatchIDQ(() => matchIDQ)
    //queryClient.invalidateQueries()
    //useEventByID(eventIDQ);

  }, [matchIDQ]);
  useEffect(() => {
    
  }, [eventID]);
  useEffect(() => {
    
  if(eventIDQ && eventGet){
    
    setEventID(() => eventGet)
    eventBus.on("eventsDataEventDo", (eventGet) => {
      if(eventIDQ == eventGet.id){
          //setEventIDQ(eventGet.id)
          setEventID(() => eventGet)
        
          
         /queryClient.setQueriesData(['Event',eventGet.id], eventGet)
      }
            });
  }
    
    
  }, [eventGet]);
  
    
    
    
    
   
    
        
      
  
  
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
              {(prop.component=='Profile') && (<Profile authed={true}  token={currentUser} />)}
              {(prop.component=='Dashboard') && (<Dashboard authed={true} events={events} token={currentUser} />)}
              {(prop.component=='LockScreenPage') && (<LockScreenPage authed={true} event={eventID} token={currentUser} handleID={setEventIDQ} handleMatchID={setMatchIDQ} />)}
              {(prop.component=='Cashier') && (<Cashier authed={true} token={currentUser} />)}
              {(prop.component=='Rewards') && (<Rewards authed={true} token={currentUser} />)}
              {(prop.component=='MyMatches') && (<MyMatches authed={true} token={currentUser} />)}
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
  if(eventDefID){
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
  
  <div class="sidebar" data-color="orange" data-image="/static/media/bg.3cef9caf.jpg"><div class="sidebar-wrapper"></div><div class="sidebar-background" style={{backgroundImages: "url(&quot;/static/media/bg.3cef9caf.jpg&quot;)"}}></div></div>
          <div className="main-panel">
          <nav class="navbar navbar-expand-lg navbar-dark fixed-top" style={{background: "rgb(17, 17, 17)"}}><div class="container-fluid"><div class="navbar-wrapper"><span class="navbar-brand"><span class="">Dashboard</span></span></div></div></nav>
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
