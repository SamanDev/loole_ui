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
import {
  Checkbox,
  Grid,
  Header,
  Button, Icon, Modal,
  Image,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react'
import { DEFCOLORS } from "const";
// core components
import ModalExampleShorthand from "components/modal.component";
import SidebarMy from "components/Sidebar/Sidebar.js";
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
import Admin from "views/Admin.js";
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
function exampleReducer(state, action) {
  switch (action.type) {
    case 'close':
      return { open: false }
    case 'open':
      return { open: true, size: action.size }
    default:
      throw new Error('Unsupported action...')
  }
}
function  Panel(prop) {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    closeOnEscape: true,
    closeOnDimmerClick: true,
    open: false,
    dimmer: undefined,
    size: undefined,
  })
  const { open, closeOnEscape, closeOnDimmerClick,size } = state
 
  var loc = window.location.href;

  const [sidebarImage, setSidebarImage] = React.useState(image3);
  const [sidebarBackground, setSidebarBackground] = React.useState("orange");
  const [visible, setVisible] = React.useState(false)
  

    
  const [myNotification,setMyNotification] = useState([]);
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
    var myNot = [];
    loc = window.location.href;
  
  
   
  
    
    
    console.log(currentUser)
    console.log(events)
    console.log(myNotification)
    console.log(loc)
  
   
    currentUser?.usersReports.sort((a, b) => (a.id < b.id) ? 1 : -1)
    currentUser?.usersReports.map((item, i) => {
      if (item.coinValue && item.status ==='Pending' && myNot.length  < 3) {
        myNot.push(item)
     
        
        
       
      } 
    })
    myNot.sort((a, b) => (a.id < b.id) ? 1 : -1)
  
  
    events?.map((item, i) => {
      if (item?.status ==='Pending' || item?.status ==='Ready' || item?.status ==='InPlay') {
      item?.players?.map((user, j) => {
        if(user.username == currentUser?.username){
          myNot.push(item)
          
        }
      })
     } 
    })
  
  
  
    
    
    setMyNotification(myNot)
    
    
  
}, [currentUser,events ,loc]);

  


  
  var currpage = "Dashboard";
  
  useEffect(() => {
  
    if(prop.token){
      setCurrentUser(() => prop.token)}

  }, [prop.token]);
  useEffect(() => {
  
    if(prop.events){setEvents(() => prop.events)}

  }, [prop.events]);
  useEffect(() => {
  
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
              {(prop.component=='Admin') && (<Admin authed={true} />)}
              {(prop.component=='Profile') && (<Profile authed={true}  token={currentUser} tabkey={keyProfile} handleProfileTabID={setKeyProfile} />)}
              {(prop.component=='Dashboard') && (<Dashboard authed={true} events={events} token={currentUser} tabkey={keyDash} handleTabID={setKeyDash}   />)}
              {(prop.component=='LockScreenPage') && (<LockScreenPage authed={true} event={eventID} token={currentUser} handleID={setEventIDQ} handleMatchID={setMatchIDQ} />)}
              {(prop.component=='Cashier') && (<Cashier authed={true} token={currentUser} events={events} />)}
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
<SidebarMy
          routes={routes}
          image={sidebarImage}
          background={sidebarBackground}
          token={currentUser}
          page={currpage}
        />
        
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            direction='right'
            inverted
            style={{ width: "100vw", maxWidth:300,height: "100vh !important"}}
            onHide={() => setVisible(false)}
            vertical
            visible
            width='thin'
           
          >
             <div
                  
                  style={{padding:10,margin:'auto',position:'relative',zIndex:10}}
                >
                  {myNotification && (<>
                    {myNotification.map((item, i) => <ModalExampleShorthand key={i} note={item} defaultOpen={(i==0)&&(true)}/>)}
                  </>)}
                  
                  
      
                  
        </div>
           
          </Sidebar>

          <Sidebar.Pusher>
        
              
            <div className="main-panel">
        <AdminNavbar page={getPage(routes)} token={currentUser}/>
        <div className="content">
        <Checkbox
          checked={visible}
          label={{ children: <code>visible</code> }}
          onChange={(e, data) => setVisible(data.checked)}
        />
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
      
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        
          </div>
          </>
      )}
      
        </ConfigProvider>
       
    </>
    
  );
  
}

export default Panel;
