import React, { useEffect, useState, useContext } from "react";

import { ConfigProvider } from "react-avatar";
import { Route, Switch, useHistory } from "react-router-dom";

import { Checkbox, Modal, Menu, Sidebar, Segment } from "semantic-ui-react";

import { DEFCOLORS, themeDashColors } from "const";
// core components
import ModalExampleShorthand from "components/modal.component";
import SidebarMy from "components/Sidebar/Sidebar.js";

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import CrCode from "components/cr.component";
import PaparaCode from "components/papara.component";
import routes from "routes.js";

import Admin from "views/Admin.js";
import AdminEvents from "views/AdminEvents.js";
import AdminPapara from "views/AdminPapara.js";
//import AdminEvents from "views/AdminCashout.js";
import AdminController from "views/AdminController.js";
import Dashboard from "views/Dashboard.js";
import Rewards from "views/Rewards.js";
import Market from "views/Market.js";
import Cashier from "views/Cashier.js";
import Profile from "views/Profile.js";
import CreateMatch from "views/Add.js";

import PaparaDeposit from "components/deposit/paparadeposit.component";
import PaparaCashout from "components/deposit/paparacashout.component";
import ShetabDeposit from "components/deposit/shetabdeposit.component";
import ShetabCashout from "components/deposit/shetabcashout.component";
import CrDeposit from "components/deposit/crdeposit.component";
import CrCashout from "components/deposit/crcashout.component";
import VisaDeposit from "components/deposit/visacodedeposit.component";
import PMDeposit from "components/deposit/pmdeposit.component";
import PMCashout from "components/deposit/pmcashout.component";
import AddMatch from "components/add/addmatch.component";
import UserContext from "context/UserState";
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
    if (profileUser) {
      props.onUpdateItem("profileUser", false);
    }
  }, [props.myState]);
  const context = useContext(UserContext);
  const { currentUser } = context.uList;

  const open = props.findStateId(myState, "openModalAdd");
  const openCashier = props.findStateId(props.myState, "openModalCashier");
  const cashierMethod = props.findStateId(props.myState, "cashierMethod");
  const coins = props.findStateId(myState, "coins");
  const myNotification = props.findStateId(props.myState, "Notifications");
  const myNotificationItem = props.findStateId(myState, "NotificationsItem");
  const profileUser = props.findStateId(myState, "profileUser");
  useEffect(() => {
    //console.log(currentUser);
    if (!props.isLoading) {
      if (context.uList.currentUser?.accessToken) {
        if (props.findStateId(myState, "openModalLogin")) {
          //props.onUpdateItem("openModalLogin", false);
        }
      } else {
        if (!props.findStateId(myState, "openModalLogin")) {
          props.onUpdateItem("openModalLogin", true);
        }
      }
    }
  }, [context.uList, props.isLoading]);
  var currpage = "Dashboard";

  const getRoutes = (routes) => {
    scrollToTop();
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/panel") {
        //sconsole.log(prop.component)

        return (
          <Route
            path={prop.layout + prop.path}
            key={key}
            render={() => (
              <>
                {prop.component == "Admin" && <Admin {...props} />}
                {prop.component == "AdminEvents" && <AdminEvents {...props} />}
                {prop.component == "AdminPapara" && <AdminPapara {...props} />}
                {prop.component == "AdminController" && (
                  <AdminController {...props} />
                )}
                {prop.component == "Profile" && <Profile {...props} />}
                {prop.component == "Dashboard" && <Dashboard {...props} />}

                {prop.component == "Cashier" && <Cashier {...props} />}
                {prop.component == "Rewards" && <Rewards {...props} />}
                {prop.component == "Market" && <Market {...props} />}
                {prop.component == "CreateMatch" && <CreateMatch {...props} />}
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
        {getPage(routes).indexOf("Match Lobby") > -1 ? (
          <Switch>{getRoutes(routes)}</Switch>
        ) : (
          <>
            <div className="wrapper ">
              <SidebarMy
                routes={routes}
                image="/assets/img/showcases/showcase-1/bg-min.webp"
                background={themeDashColors[day]}
                token={currentUser}
                page={currpage}
                {...props}
              />

              <Sidebar.Pushable>
                <Sidebar
                  as={Menu}
                  animation="overlay"
                  icon="labeled"
                  direction="right"
                  inverted
                  style={{
                    width: "100vw",
                    maxWidth: 300,
                    height: "100vh !important",
                  }}
                  onHide={() => setVisible(false)}
                  vertical
                  visible={visible}
                  width="thin"
                >
                  <div
                    style={{
                      padding: 10,
                      margin: "auto",
                      position: "relative",
                      zIndex: 10,
                    }}
                  >
                    {myNotification && (
                      <>
                        {myNotification.map((item, i) => (
                          <ModalExampleShorthand
                            key={i.toString()}
                            {...props}
                            mykey={i}
                            note={item}
                          />
                        ))}
                      </>
                    )}
                  </div>
                </Sidebar>

                <Sidebar.Pusher style={{ maxHeight: "100%", overflow: "auto" }}>
                  <div className="main-panel">
                    <div className="content">
                      <AdminNavbar
                        page={getPage(routes)}
                        token={currentUser}
                        {...props}
                      />
                      <Checkbox
                        className="hide"
                        checked={visible}
                        label={{ children: <code>visible</code> }}
                        onChange={(e, data) => setVisible(data.checked)}
                      />
                      <Switch>{getRoutes(routes)}</Switch>

                      <Modal
                        basic
                        dimmer="blurring"
                        closeOnDimmerClick={false}
                        open={open}
                        onClose={() =>
                          props.onUpdateItem("openModalAdd", false)
                        }
                      >
                        <Modal.Content>
                          <Segment inverted padded>
                            <AddMatch token={currentUser} {...props} />
                          </Segment>
                        </Modal.Content>
                      </Modal>
                      <Modal
                        basic
                        size="tiny"
                        open={openCashier}
                        onClose={() =>
                          props.onUpdateItem("openModalCashier", false)
                        }
                      >
                        <Segment inverted padded="very">
                          {cashierMethod == "CryptoCurrenciesDeposit" && (
                            <>
                              {!myNotificationItem ||
                              myNotificationItem.gateway != "CoinPayments" ? (
                                <CrDeposit coins={coins} {...props} />
                              ) : (
                                <CrCode note={myNotificationItem} {...props} />
                              )}
                            </>
                          )}

                          {cashierMethod == "PerfectMoneyDeposit" && (
                            <>
                              {" "}
                              <PMDeposit coins={coins} {...props} />
                            </>
                          )}
                          {cashierMethod == "VisaGiftCodeDeposit" && (
                            <>
                              {" "}
                              <VisaDeposit {...props} />
                            </>
                          )}
                          {cashierMethod == "IranShetabDeposit" && (
                            <>
                              <ShetabDeposit coins={coins} {...props} />
                            </>
                          )}
                          {cashierMethod == "PaparaDeposit" && (
                            <>
                              {!myNotificationItem ||
                              myNotificationItem.gateway != "Papara" ? (
                                <PaparaDeposit coins={coins} {...props} />
                              ) : (
                                <PaparaCode
                                  note={myNotificationItem}
                                  {...props}
                                />
                              )}
                            </>
                          )}

                          {cashierMethod == "CryptoCurrenciesCashout" && (
                            <>
                              <CrCashout coins={coins} {...props} />
                            </>
                          )}
                          {cashierMethod == "PerfectMoneyCashout" && (
                            <>
                              <PMCashout coins={coins} {...props} />
                            </>
                          )}
                          {cashierMethod == "IranShetabCashout" && (
                            <>
                              <ShetabCashout coins={coins} {...props} />
                            </>
                          )}
                          {cashierMethod == "PaparaCashout" && (
                            <>
                              <PaparaCashout coins={coins} {...props} />
                            </>
                          )}
                        </Segment>
                      </Modal>
                    </div>

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
