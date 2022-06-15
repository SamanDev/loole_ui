import React, { useEffect, useState, lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import { Cache, ConfigProvider } from "react-avatar";

//import Swal from "sweetalert2";
import { defUser, TrackingID, startServiceWorker } from "const.js";
import "assets/css/landing-page.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "assets/scss/light-bootstrap-dashboard-pro-react.scss?v=2.0.1";
import "semantic-ui-css/semantic.min.css";

import "assets/css/style.css";
import { useInfo } from "services/hooks";

const Swal = lazy(() => import("sweetalert2"));
const Login = lazy(() => import("components/newlogin.component"));
const Register = lazy(() => import("components/newregister.component"));
const Forget = lazy(() => import("components/newforget.component"));
const Chart = lazy(() => import("components/chart.component"));
const DC = lazy(() => import("components/dc.component"));

//import PanelLayout from "layouts/Panel.js";
//import Login from "components/newlogin.component";
//import Register from "components/newregister.component";
//import Forget from "components/newforget.component";
//import Chart from "components/chart.component";
//import DC from "components/dc.component";
import eventBus from "views/eventBus";
import {
  findActiveMatch,
  isPlayerInMatch,
  genLink,
  findEventByID,
} from "components/include.js";
import {
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  QueryCache,
} from "react-query";
import {
  Grid,
  Header,
  Icon,
  Modal,
  Divider,
  Dimmer,
  Loader,
  Segment,
  Button,
} from "semantic-ui-react";
import {
  useAllEvents,
  useUser,
  useEventByID,
  useUserReports,
} from "services/hooks";
import ReactGA from "react-ga";

import UserWebsocket from "services/user.websocket";
import GlobalContext from "context/GlobalState";
import EventContext from "context/EventState";
import UserContext from "context/UserState";
const LandLayout = lazy(() => import("layouts/Land"));
const PanelLayout = lazy(() => import("layouts/Panel"));
//const Chart = lazy(() => import("components/chart.component"));
const cache = new Cache({
  // Keep cached source failures for up to 7 days
  sourceTTL: 7 * 24 * 3600 * 1000,

  // Keep a maximum of 20 entries in the source cache
  sourceSize: 20,
});
ReactGA.initialize(TrackingID);

var myInterval;
function myTimer() {
  try {
    var el = document.getElementsByTagName("iframe")[0];
    el.remove();
  } catch (e) {}
}

function myStopFunction() {
  clearInterval(myInterval);
}

const myFunc = () => {
  myStopFunction();
  myInterval = setInterval(myTimer, 3000);
};
var unUser = defUser;
if (localStorage.getItem("user")) {
  try {
    unUser = JSON.parse(localStorage.getItem("user"));
  } catch (e) {}
}
var _defEvents = null;
if (localStorage.getItem("_defEvents")) {
  try {
    // _defEvents = JSON.parse(localStorage.getItem("_defEvents"));
  } catch (e) {}
}
var _defEvent = {};
if (localStorage.getItem("_defEvent")) {
  try {
    _defEvent = JSON.parse(localStorage.getItem("_defEvent"));
  } catch (e) {}
}
const renderLoader = (inverted) => (
  <Dimmer active inverted={inverted}>
    <Loader size="large">Loading</Loader>
  </Dimmer>
);

function Main(prop) {
  const queryClient = useQueryClient();
  const history = useHistory();
  const location = useLocation();
  const params = useParams();

  var myPath = location.pathname.split("/")[1];
  const [myList, setMyList] = useState({
    events: _defEvents,
  });
  const [eList, setEList] = useState({
    event: _defEvent,
  });

  const [uList, setUList] = useState({
    currentUser: unUser,
  });

  const [myState, setMyState] = useState({
    list: [
      { id: "profileUser", val: false },
      { id: "eventsUser", val: [] },

      { id: "Notifications", val: null },
      { id: "NotificationsItem", val: null },
      {
        id: "looleInfo",
        val: {
          totalUser: 0,
          totalMatch: 0,
          totalBank: 0,
          totalCommission: 0,
          date: "2022-01-02T14:57:43.810+00:00",
        },
      },

      { id: "keyDash", val: 0 },
      { id: "keyProfile", val: 0 },
      { id: "keyReward", val: 0 },
      { id: "keyCashier", val: 0 },
      { id: "keyMarket", val: 0 },
      { id: "eventMatch", val: null },

      { id: "cashierMethod", val: null },
      { id: "coins", val: null },
      { id: "match", val: null },
      {
        id: "eventIDQ",
        val: null,
      },
      {
        id: "matchIDQ",
        val: null,
      },
      { id: "openModalAdd", val: false },
      { id: "openModalLogin", val: false },
      { id: "openModalChart", val: false },
      { id: "openModalCashier", val: false },
      { id: "openModalSoket", val: false },
      { id: "openModalCrypto", val: false },
      { id: "openModalVideo", val: false },
      { id: "openModalVideoSRC", val: false },
    ],
  });

  const updateNot = (userReports) => {
    var myNot = [];
    console.log(cashierMethod);
    try {
      userReports?.sort((a, b) => (a.id > b.id ? 1 : -1));
      userReports?.map((item, i) => {
        if (
          item.coinValue &&
          item.status === "Pending" &&
          cashierMethod != "PaparaDeposit"
        ) {
          myNot.push(item);
        }
        if (
          item.getway == "Papara" &&
          item.status === "Pending" &&
          cashierMethod == "PaparaDeposit"
        ) {
          myNot.push(item);
        }
      });
      myNot.sort((a, b) => (a.id < b.id ? 1 : -1));
      console.log(myNot);
      onUpdateItem("Notifications", myNot);
      onUpdateItem("NotificationsItem", myNot[0]);
    } catch (e) {}
  };
  const updateNotBlock = (cashierMethod) => {
    var myNot = [];
    try {
      console.log(cashierMethod);
      userReports?.sort((a, b) => (a.id > b.id ? 1 : -1));
      userReports?.map((item, i) => {
        if (cashierMethod == "PaparaDeposit" && item.status === "Pending") {
          myNot.push(item);
        }
        if (
          cashierMethod == "CryptoCurrenciesDeposit" &&
          item.coinValue &&
          item.status === "Pending"
        ) {
          myNot.push(item);
        }
      });
      myNot.sort((a, b) => (a.id < b.id ? 1 : -1));
      console.log(myNot);

      onUpdateItem("NotificationsItem", myNot[0]);
    } catch (e) {}
  };
  const logOut = () => {
    setUList({ currentUser: defUser });
    localStorage.setItem("user", JSON.stringify(defUser));

    if (myPath == "panel") {
      history.push("/home");
      onUpdateItem("openModalLogin", false);
    }
  };
  const myFunction = (classname, title) => {
    if (classname) {
      var x = document.getElementsByClassName(classname);
      x[0]?.classList.toggle("hide");
      x[1]?.classList.toggle("hide");
      x[2]?.classList.toggle("hide");
      x[3]?.classList.toggle("hide");
      x[4]?.classList.toggle("hide");
    }
  };
  const findStateId = (st, val) => {
    return st.list.filter(function (v) {
      return v.id === val;
    })[0].val;
  };
  const onUpdateItem = (key, val) => {
    if (findStateId(myState, key) != val) {
      setMyState(() => {
        const list = myState.list.map((item) => {
          if (item.id === key) {
            item.val = val;
          }
          return item;
        });

        return {
          list: list,
        };
      });
    }
  };
  const onReset = (key, data) => {
    //console.log(key);
    if (key === "Reports") {
      queryClient.resetQueries(["UserReports"]);
    }
    if (key === "User") {
      localStorage.setItem("user", JSON.stringify(defUser));
      setUList({ currentUser: defUser });

      queryClient.setQueryData(["User"], defUser);
      queryClient.resetQueries(["User"]);
    }
    if (key === "UserRefresh") {
      if (data) {
        queryClient.setQueryData(["User"], data);
      }

      queryClient.resetQueries(["User"]);
    }
    if (key === "AdminUsers") {
      queryClient.resetQueries(["AdminUsers"]);
    }
  };
  const forceLobby = (events, username) => {
    var UserEvents = [];
    console.log(events);
    console.log(username);
    events?.map((_item, i) => {
      var item = JSON.parse(JSON.stringify(_item));

      {
        item.players.map((player, j) => {
          if (
            player.username == username &&
            (item.status == "InPlay" || item.status == "Ready") &&
            item.totalPlayer == 2
          ) {
            history.push(genLink(item));
            return false;
          }
          if (
            player.username == username &&
            (item.status == "InPlay" ||
              item.status == "Ready" ||
              item.status == "Pending")
          ) {
            UserEvents.push(item);
          }
        });
      }
      var _find = findActiveMatch(item, matchIDQ, username);

      if (_find) {
        if (_find.status == "InPlay" && item.status == "InPlay") {
          {
            _find.matchPlayers.map((player, j) => {
              if (player.username == username) {
                history.push(genLink(item, _find));
                return false;
              }
            });
          }
        }
      }
    });
    onUpdateItem("eventsUser", UserEvents);
  };
  // const query = mutationCache.findAll("User");
  //const query = mutationCache.getAll()
  const currentUser = uList.currentUser;
  const eventDef = eList.event;
  const eventIDQ = findStateId(myState, "eventIDQ");
  const matchIDQ = findStateId(myState, "matchIDQ");
  const profileUser = findStateId(myState, "profileUser")
    ? findStateId(myState, "profileUser")
    : currentUser;

  var openModalLogin = findStateId(myState, "openModalLogin");
  var openModalChart = findStateId(myState, "openModalChart");
  var openModalSoket = findStateId(myState, "openModalSoket");
  var openModalVideo = findStateId(myState, "openModalVideo");
  var openModalVideoSRC = findStateId(myState, "openModalVideoSRC");
  var cashierMethod = findStateId(myState, "cashierMethod");
  var openModalCashier = findStateId(myState, "openModalCashier");
  const { data: looleInfo } = useInfo();

  useEffect(() => {
    if (looleInfo) {
      onUpdateItem("looleInfo", looleInfo);
    }
  }, [looleInfo]);
  const { data: userGet, isLoading: userLoading } = useUser(currentUser);

  //const { data: eventsGet } = useAllEventsByStatus('All');

  const { data: eventsGet, isLoading: eventsLoading } = useAllEvents();
  if (window.location.pathname.toString().indexOf("/i/") > -1) {
    var _i = window.location.pathname.toString().split("/i/")[1];
    localStorage.setItem("reffer", _i);
  }
  const { data: userReports, isLoading: repLoading } = useUserReports(
    userGet?.id
  );

  useEffect(() => {
    if (cashierMethod) {
      updateNotBlock(cashierMethod);
    }
  }, [cashierMethod]);
  useEffect(() => {
    if (userReports && !repLoading) {
      queryClient.setQueryData(["userReports"], userReports);
      updateNotBlock(cashierMethod);
    }
  }, [userReports]);
  useEffect(() => {
    if (!openModalCashier) {
      onUpdateItem("cashierMethod", null);
    } else {
      //updateNot(userReports);
    }
    //updateNot(userReports);
  }, [openModalCashier, cashierMethod]);
  useEffect(() => {
    if (!userLoading && userGet?.accessToken) {
      setUList({ currentUser: userGet });

      localStorage.setItem("user", JSON.stringify(userGet));

      UserWebsocket.connect(
        userGet.accessToken + "&user=" + userGet.username,
        userGet
      );
    } else {
      if (!userLoading && findStateId(myState, "openModalLogin")) {
        setUList({ currentUser: defUser });
        localStorage.setItem("user", JSON.stringify(defUser));
        //queryClient.setQueryData(["User"], defUser);
      }
    }
  }, [userGet, userLoading]);

  useEffect(() => {
    if (prop.err401) {
      localStorage.setItem("user", JSON.stringify(defUser));
      setUList({ currentUser: defUser });
    }
  }, [prop.err401]);
  useEffect(() => {
    if (eventsGet?.length > 0) {
      _defEvents = eventsGet;
      setMyList({ events: eventsGet });
      localStorage.setItem("_defEvents", JSON.stringify(_defEvents));
    }
  }, [eventsGet]);

  const { data: eventGet, isLoading: eventLoading } = useEventByID(eventIDQ);

  useEffect(() => {
    if (!eventLoading && eventGet?.id && eventIDQ) {
      if (eventGet.id == eventIDQ) {
        // console.log("i: " + eventGet.id);
        _defEvent = eventGet;

        setEList({ event: eventGet });
        localStorage.setItem("_defEvent", JSON.stringify(_defEvent));

        var _find = findActiveMatch(eventGet, matchIDQ, currentUser?.username);
        if (_find?.id && eventGet.matchTables?.length > 1 && matchIDQ) {
          onUpdateItem("matchIDQ", _find.id);
        }

        // queryClient.setQueryData(["Event", eventGet.id], eventGet);
        onUpdateItem("match", _find);
        // console.log(myState);
      }
    }
  }, [eventGet]);
  useEffect(() => {
    if (eventIDQ && myList.events && !eventsLoading) {
      _defEvent = findEventByID(myList.events, eventIDQ);
      if (_defEvent) {
        setEList({ event: _defEvent });
        localStorage.setItem("_defEvent", JSON.stringify(_defEvent));
        var _find = findActiveMatch(_defEvent, matchIDQ, currentUser?.username);

        if (_find?.id && _defEvent.matchTables?.length > 1 && matchIDQ) {
          onUpdateItem("matchIDQ", _find.id);
        }

        // queryClient.setQueryData(["Event", _defEvent.id], _defEvent);
        onUpdateItem("match", _find);
      } else {
        setEList({ event: { status: "Deleted" } });
      }
    } else {
      if (myList.events) {
        forceLobby(myList.events, currentUser.username);
      }
    }
  }, [eventIDQ, myList.events, currentUser.username]);
  useEffect(() => {
    //onUpdateItem("matchIDQ", matchIDQ);
    if (eventDef?.matchTables) {
      var _find = findActiveMatch(eventDef, matchIDQ, currentUser?.username);
      onUpdateItem("match", _find);
    }
  }, [matchIDQ]);

  useEffect(() => {
    eventBus.on("eventsData", (eventsGet) => {
      /* _defEvents = eventsGet;

      setMyList({ events: eventsGet });
      localStorage.setItem("_defEvents", JSON.stringify(_defEvents));
      queryClient.setQueryData(["Events", "All"], eventsGet); */
      queryClient.resetQueries(["Events"]);
    });
    eventBus.on("eventsDataUser", (userGet) => {
      // queryClient.resetQueries(["User"]);
    });
    eventBus.on("eventsDC", () => {
      if (
        !findStateId(myState, "profileUser") &&
        !findStateId(myState, "openModalLogin")
      ) {
        if (userGet?.accessToken) {
          onUpdateItem("openModalSoket", true);
        } else {
          onUpdateItem("openModalSoket", true);
        }
      } else {
        onUpdateItem("openModalSoket", false);
      }
    });
    eventBus.on("eventsConnect", () => {
      if (findStateId(myState, "openModalSoket")) {
        queryClient.resetQueries(["Events"]);
        queryClient.resetQueries(["Event"]);
        queryClient.resetQueries(["Cois"]);
        queryClient.resetQueries(["User"]);
        onUpdateItem("openModalSoket", false);
      }
    });

    eventBus.on("eventsDataActive", (mmyevent) => {
      queryClient.resetQueries(["User"]);
      Swal.fire("", mmyevent, "success");
    });
    eventBus.on("eventsDataEventDo", (eventGet) => {
      queryClient.resetQueries(["Event"]);
    });
    eventBus.on("eventsDataEventDo2", (eventGet) => {
      if (eventGet?.id) {
        //squeryClient.setQueryData(["Event", eventGet.id], eventGet);
        queryClient.resetQueries(["Event", eventGet.id]);
        var _find = findActiveMatch(eventGet, matchIDQ, currentUser.username);

        if (
          isPlayerInMatch(_find, currentUser.username) ||
          eventIDQ == eventGet.id
        ) {
          var newEID = window.location.pathname.split("/")[2];
          var _link = genLink(eventGet);

          if (_find.status == "Ready" || _find.status == "InPlay") {
            if (newEID != eventGet.id) {
              //console.log("history.push");
              history.push(_link);
            }
            if (
              newEID != eventGet.id &&
              _find.id != matchIDQ &&
              eventGet.matchTables.length > 1
            ) {
              _link = genLink(eventGet, _find);

              history.push(_link);
            }
          } else {
            _defEvent = eventGet;
            setEList({ event: eventGet });
            localStorage.setItem("_defEventBus", JSON.stringify(_defEvent));
            onUpdateItem("eventIDQ", eventGet.id);
            _find = findActiveMatch(eventGet, matchIDQ, currentUser.username);
            onUpdateItem("match", _find);
          }
        }
      }
    });
  }, []);
  useEffect(() => {
    var newPath = location.pathname.split("/")[2];

    if (
      (currentUser?.accessToken && newPath == "dashboard" && !eventsLoading) ||
      (myList.events == null && !eventsGet && !eventsLoading)
    ) {
      queryClient.resetQueries(["Events"]);
      queryClient.resetQueries(["UserEvent"]);
    } else {
      if (!currentUser?.accessToken) {
        onUpdateItem("eventsUser", []);
      }
    }

    var newEID = location.pathname.split("/")[2];
    var newMID = location.pathname.split("/")[4];
    //alert(newEID);
    if (eventIDQ != parseInt(newEID) && newEID > 0) {
      //onUpdateItem("eventIDQ", parseInt(newEID));
      //queryClient.resetQueries(["Event"]);
    } else {
      if (eventIDQ != parseInt(newEID)) {
        onUpdateItem("eventIDQ", null);
        setEList({ event: null });
      }
    }

    onUpdateItem("matchIDQ", parseInt(newMID));

    //queryClient.resetQueries(["Events"]);
  }, [location]);
  useEffect(() => {
    ReactGA.pageview(document.location.pathname, document.title);
  }, [document.title]);

  return (
    <GlobalContext.Provider
      value={{
        myList,
        setMyList,
      }}
    >
      <UserContext.Provider
        value={{
          uList,
          setUList,
        }}
      >
        <EventContext.Provider
          value={{
            eList,
            setEList,
          }}
        >
          <Modal size="mini" basic open={openModalSoket}>
            <Segment inverted padded="very">
              <Suspense fallback={renderLoader(false)}>
                <Modal.Header className="text-center">
                  <Icon.Group size="huge">
                    <Icon size="big" color="red" name="dont" />
                    <Icon color="grey" name="user" />
                  </Icon.Group>
                  <br />
                  Connection error...
                  <br />
                  <br />
                  <br />
                </Modal.Header>
                <Modal.Content>
                  <DC onUpdateItem={onUpdateItem} />
                </Modal.Content>
              </Suspense>
            </Segment>
          </Modal>
          <Modal
            basic
            open={openModalChart}
            onClose={() => onUpdateItem("openModalChart", false)}
          >
            <Segment inverted padded>
              <Suspense fallback={renderLoader(false)}>
                <Modal.Header
                  className="header-text"
                  style={{ color: "#fff", fontSize: 22 }}
                >
                  Profit Chart{" "}
                  <div style={{ float: "right" }}>
                    ${" "}
                    {Number.parseFloat(profileUser.profit) > 0 ? (
                      <span className="text-success">
                        +{Number.parseFloat(profileUser.profit).toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-danger">
                        {Number.parseFloat(profileUser.profit).toFixed(2)}
                      </span>
                    )}
                  </div>
                </Modal.Header>

                <Modal.Content
                  style={{
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <Chart
                    myState={myState}
                    onUpdateItem={onUpdateItem}
                    findStateId={findStateId}
                  />
                </Modal.Content>
              </Suspense>
            </Segment>
          </Modal>
          <Modal
            basic
            size="small"
            dimmer
            style={{ maxWidth: 510 }}
            open={openModalLogin}
            onClose={() => {
              if (!userLoading) {
                onUpdateItem("openModalLogin", false);
                if (!currentUser?.accessToken) {
                  logOut();
                }
              }
            }}
          >
            <Modal.Content>
              <Segment inverted padded="very">
                <Suspense fallback={renderLoader(false)}>
                  <Grid relaxed="very">
                    <Grid.Column mobile={16}>
                      <div className="togllehide togllehideforget">
                        <Header as="h2" inverted>
                          Login
                        </Header>

                        <Login
                          onUpdateItem={onUpdateItem}
                          findStateId={findStateId}
                          onReset={onReset}
                          myState={myState}
                        />
                      </div>

                      <div
                        className="togllehide togllehideforget"
                        style={{ marginTop: 10 }}
                      >
                        <a
                          href="#"
                          onClick={() =>
                            myFunction("togllehideforget", "Password Recovery")
                          }
                        >
                          Forgot Password?
                        </a>
                        <Divider horizontal inverted section>
                          Or
                        </Divider>
                        <Button
                          size="small"
                          fluid
                          inverted
                          onClick={() =>
                            myFunction("togllehide", "Create Account")
                          }
                          color="orange"
                        >
                          Don’t have an account?
                          <br />
                          <p style={{ marginTop: 5, fontWeight: "bold" }}>
                            Create Account
                          </p>
                        </Button>
                      </div>
                      <div className="togllehide hide">
                        <Header as="h2" inverted>
                          Create Account
                        </Header>

                        <Register onUpdateItem={onUpdateItem} />
                      </div>

                      <span>
                        <div className="togllehideforget hide">
                          <Header as="h2" inverted>
                            Password Recovery
                          </Header>

                          <Forget onUpdateItem={onUpdateItem} />

                          <Divider horizontal inverted section>
                            Or
                          </Divider>
                          <Button
                            size="small"
                            fluid
                            inverted
                            onClick={() =>
                              myFunction("togllehideforget", "Login")
                            }
                            color="blue"
                            content="Back"
                          />
                        </div>
                      </span>
                    </Grid.Column>
                  </Grid>
                </Suspense>
              </Segment>
            </Modal.Content>
          </Modal>
          <Modal
            basic
            size="small"
            dimmer="blurring"
            open={openModalVideo}
            onClose={() => onUpdateItem("openModalVideo", false)}
          >
            <Modal.Content>
              <Segment inverted>
                <video
                  preload="auto"
                  autoplay="true"
                  width="100%"
                  height="100%"
                  key={openModalVideoSRC}
                  controls
                >
                  <source src={openModalVideoSRC} type="video/mp4" />
                </video>
              </Segment>
            </Modal.Content>
          </Modal>

          <Switch>
            <Route
              path="/panel"
              render={(props) => (
                <Suspense fallback={renderLoader(true)}>
                  <PanelLayout
                    {...props}
                    myState={myState}
                    isLoading={userLoading}
                    onUpdateItem={onUpdateItem}
                    findStateId={findStateId}
                    myFunction={myFunction}
                    onReset={onReset}
                  />
                </Suspense>
              )}
            />

            <Route
              path="/lobby/:id/:title"
              render={(props) => (
                <Suspense fallback={renderLoader(true)}>
                  <LandLayout
                    {...props}
                    myState={myState}
                    onUpdateItem={onUpdateItem}
                    findStateId={findStateId}
                    myFunction={myFunction}
                  />
                </Suspense>
              )}
            />

            <Route
              path="/game/:gamename"
              render={(props) => (
                <Suspense fallback={renderLoader(true)}>
                  <LandLayout
                    {...props}
                    myState={myState}
                    onUpdateItem={onUpdateItem}
                    findStateId={findStateId}
                    myFunction={myFunction}
                  />
                </Suspense>
              )}
            />

            <Route
              path="/home"
              render={(props) => (
                <Suspense fallback={renderLoader(true)}>
                  <LandLayout
                    {...props}
                    myState={myState}
                    onUpdateItem={onUpdateItem}
                    findStateId={findStateId}
                    myFunction={myFunction}
                  />
                </Suspense>
              )}
            />
            <Route
              path="/user/:username"
              render={(props) => (
                <Suspense fallback={renderLoader(true)}>
                  <LandLayout
                    {...props}
                    myState={myState}
                    onUpdateItem={onUpdateItem}
                    findStateId={findStateId}
                    myFunction={myFunction}
                  />
                </Suspense>
              )}
            />
            <Route
              path="/marketplace"
              render={(props) => (
                <Suspense fallback={renderLoader(true)}>
                  <LandLayout
                    {...props}
                    myState={myState}
                    onUpdateItem={onUpdateItem}
                    findStateId={findStateId}
                    myFunction={myFunction}
                  />
                </Suspense>
              )}
            />
            <Route
              path="/games"
              render={(props) => (
                <Suspense fallback={renderLoader(true)}>
                  <LandLayout
                    {...props}
                    myState={myState}
                    onUpdateItem={onUpdateItem}
                    findStateId={findStateId}
                    myFunction={myFunction}
                  />
                </Suspense>
              )}
            />
            <Route
              path="/content"
              render={(props) => (
                <Suspense fallback={renderLoader(true)}>
                  <LandLayout
                    {...props}
                    myState={myState}
                    onUpdateItem={onUpdateItem}
                    findStateId={findStateId}
                    myFunction={myFunction}
                  />
                </Suspense>
              )}
            />
            <Redirect path="/" from="/" to="/home" />
          </Switch>
        </EventContext.Provider>
      </UserContext.Provider>
    </GlobalContext.Provider>
  );
}
function App() {
  startServiceWorker();
  myFunc();
  const [err401, setErr401] = useState(false);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        onError: (error) => {
          if (error.message.indexOf("401") > -1) {
            setErr401(true);
          }
        },
        onSuccess: () => {
          if (err401) {
            setErr401(false);
          }
        },
        retry: (failureCount, error) => {
          //console.log("retry " + error);
          //setErr401(true);
        },
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Suspense fallback={renderLoader(true)}>
        <Main err401={err401} setErr401={setErr401} />
      </Suspense>
    </QueryClientProvider>
  );
}

ReactDOM.render(
  <BrowserRouter>
    <Suspense fallback={renderLoader(true)}>
      <ConfigProvider cache={cache}>
        <div className="application">
          <App />
        </div>
      </ConfigProvider>
    </Suspense>
  </BrowserRouter>,
  document.getElementById("root")
);
