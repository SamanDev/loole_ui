import React, { useEffect, useState, useContext } from "react";
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
import AuthService from "services/auth.service";
import { Cache, ConfigProvider } from "react-avatar";

import Swal from "sweetalert2";
import { defUser, TrackingID } from "const";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import LandLayout from "layouts/Land.js";

import PanelLayout from "layouts/Panel.js";
import Login from "components/newlogin.component";
import Register from "components/newregister.component";
import Forget from "components/newforget.component";
import Chart from "components/chart.component";
import DC from "components/dc.component";
import eventBus from "views/eventBus";
import {
  getQueryVariable,
  findActiveMatch,
  isPlayerInMatch,
  getMatchTitle,
  genLink,
} from "components/include";
import { useQueryClient, QueryClient, QueryClientProvider } from "react-query";
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
import "semantic-ui-css/semantic.min.css";
import "assets/css/style.css";
import UserWebsocket from "services/user.websocket";
import GlobalContext from "context/GlobalState";
import EventContext from "context/EventState";
import UserContext from "context/UserState";

const cache = new Cache({
  // Keep cached source failures for up to 7 days
  sourceTTL: 7 * 24 * 3600 * 1000,

  // Keep a maximum of 20 entries in the source cache
  sourceSize: 20,
});
ReactGA.initialize(TrackingID);
function myFunction(classname) {
  var x = document.getElementsByClassName(classname);
  x[0]?.classList.toggle("hide");
  x[1]?.classList.toggle("hide");
  x[2]?.classList.toggle("hide");
  x[3]?.classList.toggle("hide");
  x[4]?.classList.toggle("hide");
}
var unUser = defUser;
if (localStorage.getItem("user")) {
  try {
    unUser = JSON.parse(localStorage.getItem("user"));
  } catch (e) {}
}
var _defEvents = null;
var _defEvent = {};

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

      { id: "Notifications", val: null },
      { id: "NotificationsItem", val: null },
      {
        id: "looleInfo",
        val: {
          id: 555,
          totalUser: 4,
          totalMatch: 43,
          totalBank: 4845.1,
          totalCommission: 4.1000000000000005,
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
    //console.log(userReports);
    userReports?.sort((a, b) => (a.id > b.id ? 1 : -1));
    userReports?.map((item, i) => {
      if (item.coinValue && item.status === "Pending" && myNot.length < 3) {
        myNot.push(item);
      }
    });
    myNot.sort((a, b) => (a.id < b.id ? 1 : -1));
    //console.log(myNot);
    onUpdateItem("Notifications", myNot);
    onUpdateItem("NotificationsItem", myNot[0]);
  };
  const logOut = () => {
    //history.push("/home");
    setUList({ currentUser: defUser });
    localStorage.setItem("user", JSON.stringify(defUser));
    AuthService.logout();
  };
  const findStateId = (st, val) => {
    return st.list.filter(function (v) {
      return v.id === val;
    })[0].val;
  };
  const onUpdateItem = (key, val) => {
    // console.log(val);
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
      //console.log(myState);
    }
  };
  const onReset = (key) => {
    if (key === "Reports") {
      queryClient.resetQueries(["UserReports"]);
    }
    if (key === "AdminUsers") {
      queryClient.resetQueries(["AdminUsers"]);
    }
  };

  // const query = mutationCache.findAll("User");
  //const query = mutationCache.getAll()
  const currentUser = uList.currentUser;
  const eventDef = eList.event;
  const eventIDQ = findStateId(myState, "eventIDQ");
  const matchIDQ = findStateId(myState, "matchIDQ");
  var openModalLogin = findStateId(myState, "openModalLogin");
  var openModalChart = findStateId(myState, "openModalChart");
  var openModalSoket = findStateId(myState, "openModalSoket");
  var openModalVideo = findStateId(myState, "openModalVideo");
  var openModalVideoSRC = findStateId(myState, "openModalVideoSRC");
  const { data: userGet, isLoading } = useUser();

  //const { data: eventsGet } = useAllEventsByStatus('All');

  const { data: eventsGet } = useAllEvents();
  if (window.location.pathname.toString().indexOf("/i/") > -1) {
    var _i = window.location.pathname.toString().split("/i/")[1];
    localStorage.setItem("reffer", _i);
  }
  const { data: userReports } = useUserReports(userGet?.id);
  useEffect(() => {
    if (userReports) {
      updateNot(userReports);
    }
  }, [userReports]);
  useEffect(() => {
    if (userGet?.accessToken) {
      setUList({ currentUser: userGet });

      localStorage.setItem("user", JSON.stringify(userGet));

      if (findStateId(myState, "profileUser") == false) {
        UserWebsocket.connect(
          userGet.accessToken + "&user=" + userGet.username,
          userGet
        );
      }
    } else {
    }
  }, [userGet]);
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
    }
  }, [eventsGet]);

  const { data: eventGet } = useEventByID(eventIDQ);

  useEffect(() => {
    if (eventGet?.id) {
      _defEvent = eventGet;

      setEList({ event: eventGet });
      localStorage.setItem("_defEvent", JSON.stringify(_defEvent));
      onUpdateItem("eventIDQ", eventGet.id);

      var _find = findActiveMatch(eventGet, matchIDQ, currentUser.username);
      if (_find?.id && eventGet.matchTables?.length > 1 && matchIDQ) {
        onUpdateItem("matchIDQ", _find.id);
      }

      queryClient.setQueryData(["Event", eventGet.id], eventGet);
      onUpdateItem("match", _find);
    }
  }, [eventGet]);
  useEffect(() => {
    //onUpdateItem("matchIDQ", matchIDQ);
    if (eventDef?.matchTables) {
      var _find = findActiveMatch(eventDef, matchIDQ, currentUser.username);
      onUpdateItem("match", _find);
    }
  }, [matchIDQ]);

  useEffect(() => {
    eventBus.on("eventsData", (eventsGet) => {
      _defEvents = eventsGet;

      setMyList({ events: eventsGet });
      localStorage.setItem("_defEventsBus", JSON.stringify(_defEvents));
      queryClient.setQueryData(["Events", "All"], eventsGet);
    });
    eventBus.on("eventsDataUser", (userGet) => {
      setUList({ currentUser: userGet });

      localStorage.setItem("user", JSON.stringify(userGet));
    });
    eventBus.on("eventsDC", () => {
      if (
        currentUser?.accessToken &&
        !findStateId(myState, "profileUser") &&
        !findStateId(myState, "openModalLogin")
      ) {
        onUpdateItem("openModalSoket", true);
      } else {
        onUpdateItem("openModalSoket", false);
      }
    });
    eventBus.on("eventsConnect", () => {
      if (findStateId(myState, "openModalSoket")) {
        queryClient.resetQueries(["Events"]);
        queryClient.resetQueries(["Event"]);
        queryClient.resetQueries(["Cois"]);
        onUpdateItem("openModalSoket", false);
      }
    });

    eventBus.on("eventsDataActive", (mmyevent) => {
      var curU = JSON.parse(JSON.stringify(currentUser));
      curU.userActivate = true;
      setUList({ currentUser: curU });
      localStorage.setItem("user", JSON.stringify(curU));
      Swal.fire("", mmyevent, "success");
    });
    eventBus.on("eventsDataEventDo", (eventGet) => {
      if (eventGet?.id) {
        queryClient.setQueryData(["Event", eventGet.id], eventGet);
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
    setInterval(() => {
      try {
        var el = document.getElementsByTagName("iframe")[0];
        el.remove();
      } catch (e) {}
    }, 1000);
  }, []);
  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
    var newPath = location.pathname.split("/")[2];

    if (myList.events == null && !eventsGet) {
      queryClient.resetQueries(["Events"]);
    }
    var newEID = location.pathname.split("/")[2];
    var newMID = location.pathname.split("/")[4];
    //alert(newEID);
    if (eventIDQ != parseInt(newEID) && newEID > 0) {
      onUpdateItem("eventIDQ", parseInt(newEID));

      //queryClient.resetQueries(["Event"]);
    } else {
      if (eventIDQ != parseInt(newEID)) {
        onUpdateItem("eventIDQ", null);
        setEList({ event: null });
      }
    }

    onUpdateItem("matchIDQ", parseInt(newMID));

    //queryClient.resetQueries(["Event"]);
  }, [location]);

  if (!currentUser) {
    return (
      <Segment style={{ height: "100%", width: "100%", position: "absolute" }}>
        <Dimmer active inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>
      </Segment>
    );
  }
  var _key = findStateId(myState, "profileUser");
  if (!_key) {
    _key = currentUser;
  }

  _key.userAnalyses?.sort((a, b) => (a.id < b.id ? 1 : -1));
  var nProfit = 0;
  try {
    nProfit = Number.parseFloat(_key.profit).toFixed(2);
  } catch (e) {
    nProfit = 0;
  }

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
            <Modal.Header className="text-center">
              <Icon.Group size="huge">
                <Icon size="big" color="red" name="dont" />
                <Icon color="grey" name="user" />
              </Icon.Group>
              <br />
              Connection error...
            </Modal.Header>
            <Modal.Content>
              <DC onUpdateItem={onUpdateItem} />
            </Modal.Content>
          </Modal>
          <Modal
            basic
            open={openModalChart}
            onClose={() => onUpdateItem("openModalChart", false)}
          >
            <Modal.Header>
              Profit Chart{" "}
              <div style={{ float: "right" }}>
                {Number.parseFloat(nProfit) > 0 ? (
                  <span className="text-success">+{nProfit}</span>
                ) : (
                  <span className="text-danger">{nProfit}</span>
                )}
              </div>
            </Modal.Header>

            <Modal.Content style={{ overflow: "hidden", position: "relative" }}>
              <Chart
                myState={myState}
                onUpdateItem={onUpdateItem}
                findStateId={findStateId}
              />
            </Modal.Content>
          </Modal>
          <Modal
            basic
            size="small"
            dimmer="blurring"
            open={openModalLogin}
            onClose={() => {
              if (!isLoading) {
                onUpdateItem("openModalLogin", false);
                if (!currentUser?.accessToken) {
                  logOut();
                }
              }
            }}
          >
            <Modal.Content>
              <Segment inverted padded="very">
                <Grid relaxed="very">
                  <Grid.Column mobile={16} tablet={8} computer={8}>
                    <div className="togllehide togllehideforget">
                      <Header as="h3" inverted>
                        Login
                      </Header>

                      <Login onUpdateItem={onUpdateItem} />
                    </div>
                    <span className="mobile only">
                      <div
                        className="togllehide togllehideforget"
                        style={{ marginTop: 10 }}
                      >
                        <Button
                          size="mini"
                          fluid
                          onClick={() => myFunction("togllehideforget")}
                          color="black"
                          content="Password Recovery"
                        />
                        <Divider horizontal inverted style={{ marginTop: 10 }}>
                          Or
                        </Divider>
                        <Button
                          size="small"
                          fluid
                          inverted
                          onClick={() => myFunction("togllehide")}
                          color="orange"
                          content="Create Account"
                        />
                      </div>
                      <div className="togllehide hide">
                        <Header as="h3" inverted>
                          Create Account
                        </Header>

                        <Register onUpdateItem={onUpdateItem} />
                        <Divider horizontal inverted style={{ marginTop: 20 }}>
                          Or
                        </Divider>
                        <Button
                          size="small"
                          fluid
                          inverted
                          onClick={() => myFunction("togllehide")}
                          color="blue"
                          content="Login to your account"
                        />
                      </div>
                    </span>
                    <span>
                      <div className="togllehideforget mobile hidden">
                        <Divider horizontal inverted style={{ marginTop: 40 }}>
                          Or
                        </Divider>
                        <Header as="h4" inverted>
                          Password Recovery
                        </Header>

                        <Forget onUpdateItem={onUpdateItem} />
                      </div>
                      <div className="togllehideforget hide">
                        <Header as="h4" inverted>
                          Password Recovery
                        </Header>

                        <Forget onUpdateItem={onUpdateItem} />

                        <Divider horizontal inverted style={{ marginTop: 20 }}>
                          Or
                        </Divider>
                        <Button
                          size="small"
                          fluid
                          inverted
                          onClick={() => myFunction("togllehideforget")}
                          color="blue"
                          content="Login to your account"
                        />
                      </div>
                    </span>
                  </Grid.Column>

                  <Grid.Column mobile={16} tablet={8} computer={8}>
                    <span className="mobile hidden">
                      <Header as="h3" inverted>
                        Create Account
                      </Header>

                      <Register onUpdateItem={onUpdateItem} />
                    </span>
                  </Grid.Column>
                </Grid>
                <span className="mobile hidden">
                  <Divider vertical inverted>
                    OR
                  </Divider>
                </span>
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
                <PanelLayout
                  {...props}
                  myState={myState}
                  isLoading={isLoading}
                  onUpdateItem={onUpdateItem}
                  findStateId={findStateId}
                  onReset={onReset}
                />
              )}
            />

            <Route
              path="/lobby/:id/:title/"
              render={(props) => (
                <LandLayout
                  {...props}
                  myState={myState}
                  onUpdateItem={onUpdateItem}
                  findStateId={findStateId}
                />
              )}
            />
            <Route
              path="/matchlobby"
              render={(props) => (
                <LandLayout
                  {...props}
                  myState={myState}
                  onUpdateItem={onUpdateItem}
                  findStateId={findStateId}
                />
              )}
            />

            <Route
              path="/game/:gamename"
              render={(props) => (
                <LandLayout
                  {...props}
                  myState={myState}
                  onUpdateItem={onUpdateItem}
                  findStateId={findStateId}
                />
              )}
            />
            <Route
              path="/mobile"
              render={(props) => (
                <LandLayout
                  {...props}
                  myState={myState}
                  onUpdateItem={onUpdateItem}
                  findStateId={findStateId}
                />
              )}
            />
            <Route
              path="/home"
              render={(props) => (
                <LandLayout
                  {...props}
                  myState={myState}
                  onUpdateItem={onUpdateItem}
                  findStateId={findStateId}
                />
              )}
            />
            <Route
              path="/user/:username"
              render={(props) => (
                <LandLayout
                  {...props}
                  myState={myState}
                  onUpdateItem={onUpdateItem}
                  findStateId={findStateId}
                />
              )}
            />
            <Route
              path="/content"
              render={(props) => (
                <LandLayout
                  {...props}
                  myState={myState}
                  onUpdateItem={onUpdateItem}
                  findStateId={findStateId}
                />
              )}
            />
            <Redirect from="/" to="/home" />
          </Switch>
        </EventContext.Provider>
      </UserContext.Provider>
    </GlobalContext.Provider>
  );
}
function App() {
  const [err401, setErr401] = useState(false);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        queryFn: myFunction,
        retry: (failureCount, error) => {
          setErr401(true);
        },
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Main err401={err401} />
    </QueryClientProvider>
  );
}

ReactDOM.render(
  <BrowserRouter>
    <ConfigProvider cache={cache}>
      <App />
    </ConfigProvider>
  </BrowserRouter>,

  document.getElementById("root")
);
