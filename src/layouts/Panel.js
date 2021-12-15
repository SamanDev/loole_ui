import React ,{useEffect, useState} from "react";

import Avatar, { ConfigProvider } from "react-avatar";
import { BrowserRouter, Route, Switch, Redirect,useHistory } from "react-router-dom";

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

import routes from "routes.js";

import Admin from "views/Admin.js";
import Dashboard from "views/Dashboard.js";
import Rewards from "views/Rewards.js";
import MyMatches from "views/MyMatches.js";
import Market from "views/Market.js";
import Cashier from "views/Cashier.js";
import Profile from "views/Profile.js";
import CreateMatch from "views/Add.js";
import LockScreenPage from "views/Pages/LockScreenPage.js";

import AddMatch  from "components/add/addmatch.component"; 
function scrollToTop() {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
    });
    
    
  


};


function  Panel(props) {
 
  
  const [sidebarImage, setSidebarImage] = React.useState();
  const [sidebarBackground, setSidebarBackground] = React.useState("orange");
  const [visible, setVisible] = React.useState(false)
  const [myState, setMyState] = useState(props.myState)
  useEffect(() => {
    setMyState(props.myState)
}, [props.myState]);
const currentUser = props.findStateId(myState,'currentUser');
  const [myNotification,setMyNotification] = useState([]);
  const events = props.findStateId(myState,'events');
  const open = props.findStateId(myState,'openModalAdd');
 

  useEffect(() => {
    
    
      updateNot()
   
  
  
}, []);

  


  
  var currpage = "Dashboard";
  
 
    const updateNot = () => {
    var myNot = [];
     
  
     
     
    currentUser?.usersReports?.sort((a, b) => (a.id < b.id) ? 1 : -1)
    currentUser?.usersReports?.map((item, i) => {
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
  }
  
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
            render={() => (
              <>
              {(prop.component=='Admin') && (<Admin authed={true} />)}
              {(prop.component=='Profile') && (<Profile {...props} />)}
              {(prop.component=='Dashboard') && (<Dashboard  {...props}  />)}
              {(prop.component=='LockScreenPage') && (<LockScreenPage {...props} />)}
              {(prop.component=='Cashier') && (<Cashier {...props} />)}
              {(prop.component=='Rewards') && (<Rewards {...props} />)}
              {(prop.component=='MyMatches') && (<MyMatches {...props} />)}
              {(prop.component=='CreateMatch') && (<CreateMatch {...props}  />)}
              
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
          image="/assets/img/bg.jpg"
          background={sidebarBackground}
          token={currentUser}
          page={currpage}
          {...props}
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
            visible={visible}
            width='thin'
           
          >
             <div
                  
                  style={{padding:10,margin:'auto',position:'relative',zIndex:10}}
                >
                  {myNotification && (<>
                 
                    {myNotification.map((item, i) => <ModalExampleShorthand key={i} mykey={i} note={item}/>)}
                  </>)}
                  
                  
      
                  
        </div>
           
          </Sidebar>

          <Sidebar.Pusher style={{maxHeight:'100%'}}>
        
              
            <div className="main-panel"  style={{minHeight:'100%'}}>
        
        <div className="content" style={{paddingBottom:0}}>
        <AdminNavbar page={getPage(routes)} token={currentUser} {...props} />
            <Switch>{getRoutes(routes)}</Switch>
            <Modal
          inverted
          basic
          dimmer='blurring'
          closeIcon
        closeOnDimmerClick={false}
          open={open}
          onClose={() => props.onUpdateItem('openModalAdd',false)}
        >
          <div style={{ padding: "45px 45px", margin: "auto" }}>
     
        <Modal.Content image scrolling>
          <Segment inverted padded="very">
          <AddMatch token={currentUser} {...props} />
          </Segment>
          </Modal.Content>
          </div>
        </Modal>
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
