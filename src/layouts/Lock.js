import React, { useEffect, useState } from "react";

import { ConfigProvider } from "react-avatar";
import { Route, Switch ,useHistory} from "react-router-dom";

import { Checkbox, Modal, Menu, Segment, Sidebar } from "semantic-ui-react";

import { DEFCOLORS, themeDashColors } from "const";
// core components
import ModalExampleShorthand from "components/modal.component";
import SidebarMy from "components/Sidebar/Sidebar.js";
import "assets/scss/light-bootstrap-dashboard-pro-react.scss?v=2.0.0";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import CrCode from "components/cr.component";
import routes from "routes.js";

import Admin from "views/Admin.js";
import AdminEvents from "views/AdminEvents.js";
import Dashboard from "views/Dashboard.js";
import Rewards from "views/Rewards.js";
import Market from "views/Market.js";
import Cashier from "views/Cashier.js";
import Profile from "views/Profile.js";
import CreateMatch from "views/Add.js";
import LockScreenPage from "views/Pages/LockScreenPage.js";
import CrDeposit from "components/deposit/crdeposit.component";
import CrCashout from "components/deposit/crcashout.component";
import PMDeposit from "components/deposit/pmdeposit.component";
import PMCashout from "components/deposit/pmcashout.component";
import AddMatch from "components/add/addmatch.component";

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
const d = new Date();
let da = d.getSeconds();
let day = da % 7;
function Panel(props) {
  const history = useHistory();
  const [sidebarImage, setSidebarImage] = React.useState();
  const [sidebarBackground, setSidebarBackground] = React.useState("orange");
  const [visible, setVisible] = React.useState(false);
  const [myState, setMyState] = useState(props.myState);
  useEffect(() => {
    setMyState(props.myState);
    
   
  }, [props.myState]);
  
  const currentUser = props.findStateId(myState, "currentUser");
  
 


  const getRoutes = (routes) => {
    //scrollToTop();
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
   
       
        
        return (
          <Route
            path={prop.layout + prop.path}
            key={key}
            render={() => (
              <>
            
                {prop.component == "LockScreenPage" && (
                  <LockScreenPage {...props} />
                )}
            
              </>
            )}
          />
        );
      
    });
  };
  const getPage = (routes) => {
    return routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.path) > -1 && prop.path != "/") {
        if (prop.name) {
          return prop.name;
        }
      }
    });
  };

  return (
    <>
      <ConfigProvider colors={DEFCOLORS}>
     
          <Switch>{getRoutes(routes)}</Switch>
       
      </ConfigProvider>
    </>
  );
}

export default Panel;
