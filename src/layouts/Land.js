import React, {  } from "react";
import { Switch, Route } from "react-router-dom";
import { ConfigProvider } from "react-avatar";
import { DEFCOLORS } from "const";
// react-bootstrap components

import LandNavbar from "components/Navbars/LandNavbar.js";
// dinamically create auth routes
import "assets/css/landing-page.css";
import Landing from "views/Pages/Landing.js";
import User from "views/Pages/User.js";
import routes from "routes.js";
import Games from "views/Pages/Games.js";
import Content from "views/Pages/Content.js";

function scrollToTop() {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
    });
    
    
  


};

function  Auth(props) {
  
  
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
            render={(props2) => (
              <>
             
              {(prop.component=='Landing') && (<Landing {...props} />)}
              {(prop.component=='User') && (<User {...props} />)}
              {(prop.component=='Games') && (<Games {...props} />)}
              {(prop.component=='Content') && (<Content {...props} />)}
            
              
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
        <LandNavbar {...props}/>
        {/* End Navbar */}
       
        <Switch>{getRoutes(routes)}</Switch>
    
      </div>
      </ConfigProvider>
    
    </>
  );
    
}

export default (Auth);
