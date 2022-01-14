import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
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
import { useAllEvents, useUser, useEventByID } from "services/hooks";
import ReactGA from "react-ga";
import "semantic-ui-css/semantic.min.css";
import "assets/css/style.css";
import UserWebsocket from "services/user.websocket";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
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
function Main() {
  const queryClient = useQueryClient();
  const history = useHistory();
  const location = useLocation();
  var unUser = defUser;
  if (localStorage.getItem("user")) {
    try {
      unUser = JSON.parse(localStorage.getItem("user"));
    } catch (e) {}
  }
  const [myState, setMyState] = useState({
    list: [
      { id: "currentUser", val: unUser },
      { id: "profileUser", val: false },
      { id: "events", val: null },
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
      { id: "eventDef", val: null },
      { id: "cashierMethod", val: null },
      { id: "coins", val: null },
      { id: "match", val: null },
      {
        id: "eventIDQ",
        val: getQueryVariable("id", window.location.search.substring(1)),
      },
      {
        id: "matchIDQ",
        val: getQueryVariable("matchid", window.location.search.substring(1)),
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
  const updateNot = (currentUser) => {
    var myNot = [];

    currentUser?.usersReports?.sort((a, b) => (a.id > b.id ? 1 : -1));
    currentUser?.usersReports?.map((item, i) => {
      if (item.coinValue && item.status === "Pending" && myNot.length < 3) {
        myNot.push(item);
      }
    });
    myNot.sort((a, b) => (a.id < b.id ? 1 : -1));
    /*
  
    events?.map((item, i) => {
      if (item?.status ==='Pending' || item?.status ==='Ready' || item?.status ==='InPlay') {
      item?.players?.map((user, j) => {
        if(user.username == currentUser?.username){
          myNot.push(item)
          
        }
      })
     } 
    })
  */
    onUpdateItem("Notifications", myNot);
    onUpdateItem("NotificationsItem", myNot[0]);
  };
  const findStateId = (st, val) => {
    return st.list.filter(function (v) {
      return v.id === val;
    })[0].val;
  };
  const onUpdateItem = (key, val) => {
    //console.log(val)
    if (findStateId(myState, key) != val) {
      //console.log(key)
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
      //console.log(myState)
    }
  };

  // const query = mutationCache.findAll("User");
  //const query = mutationCache.getAll()

  var currentUser = findStateId(myState, "currentUser");
  var events = findStateId(myState, "events");
  var eventDef = findStateId(myState, "eventDef");
  var eventIDQ = findStateId(myState, "eventIDQ");
  var matchIDQ = findStateId(myState, "matchIDQ");
  var openModalLogin = findStateId(myState, "openModalLogin");
  var openModalChart = findStateId(myState, "openModalChart");
  var openModalSoket = findStateId(myState, "openModalSoket");
  var openModalVideo = findStateId(myState, "openModalVideo");
  var openModalVideoSRC = findStateId(myState, "openModalVideoSRC");
  const { data: userGet } = useUser();

  //const { data: eventsGet } = useAllEventsByStatus('All');
  const { data: eventsGet } = useAllEvents();
  if (window.location.pathname.toString().indexOf("/i/") > -1) {
    var _i = window.location.pathname.toString().split("/i/")[1];
    localStorage.setItem("reffer", _i);
  }

  useEffect(() => {
    if (userGet?.accessToken) {
      onUpdateItem("currentUser", userGet);
      updateNot(userGet);
      UserWebsocket.connect(
        userGet.accessToken + "&user=" + userGet.username,
        userGet
      );
    }
  }, [userGet]);
  useEffect(() => {
    if (eventsGet?.length > 0) {
      onUpdateItem("events", eventsGet);
    }
  }, [eventsGet]);

  const { data: eventGet } = useEventByID(eventIDQ);

  useEffect(() => {
    if (eventGet?.id) {
      onUpdateItem("eventDef", eventGet);
      onUpdateItem("eventIDQ", eventGet.id);
      var _find = findActiveMatch(
        eventGet,
        getQueryVariable("matchid", window.location.search.substring(1)),
        currentUser.username
      );
      if (_find?.id) {
        onUpdateItem("matchIDQ", _find.id);
      }

      queryClient.setQueryData(["Event", eventGet.id], eventGet);
      onUpdateItem("match", _find);
    }
  }, [eventGet]);
  useEffect(() => {
    if (eventDef?.matchTables) {
      var _find = findActiveMatch(eventDef, matchIDQ, currentUser.username);
      onUpdateItem("match", _find);
    }
  }, [matchIDQ]);

  useEffect(() => {
    eventBus.on("eventsData", (eventsGet) => {
      onUpdateItem("events", eventsGet);

      queryClient.setQueryData(["Events", "All"], eventsGet);
    });
    eventBus.on("eventsDataUser", (userGet) => {
      onUpdateItem("currentUser", userGet);
      updateNot(userGet);
      localStorage.setItem("user", JSON.stringify(userGet));
    });
    eventBus.on("eventsDC", () => {
      //  alert()
      if (currentUser?.accessToken) {
        onUpdateItem("openModalSoket", true);
      }
    });
    eventBus.on("eventsConnect", () => {
      //  alert()
      if (findStateId(myState, "openModalSoket")) {
        onUpdateItem("openModalSoket", false);
      }
    });

    eventBus.on("eventsDataEventDo", (eventGet) => {
      if (eventGet?.id) {
        queryClient.setQueryData(["Event", eventGet.id], eventGet);
        var _find = findActiveMatch(eventGet, matchIDQ, currentUser.username);

        if (
          isPlayerInMatch(_find, currentUser.username) ||
          (eventIDQ == eventGet.id && _find.id != matchIDQ)
        ) {
          if (eventGet.status == "Ready" || eventGet.status == "InPlay") {
            if (
              window.location.search.toString().indexOf("id=" + eventGet.id) ==
              -1
            ) {
              console.log("history.push");
              history.push("/lobby?id=" + eventGet.id);
            }
            if (
              _find.id != matchIDQ &&
              eventGet.matchTables.length > 1 &&
              window.location.search
                .toString()
                .indexOf("id=" + eventGet.id + "&matchid=" + _find.id) == -1
            ) {
              history.push(
                "/matchlobby?id=" + eventGet.id + "&matchid=" + _find.id
              );
            }
          }
          onUpdateItem("eventDef", eventGet);
          onUpdateItem("eventIDQ", eventGet.id);
          onUpdateItem(
            "match",
            findActiveMatch(eventGet, _find.id, currentUser.username)
          );
        }
      }
    });
    eventBus.on("eventsDataActive", (event) => {
      var curU = JSON.parse(
        JSON.stringify(findStateId(myState, "currentUser"))
      );
      curU.userActivate = true;

      onUpdateItem("currentUser", curU);
      Swal.fire("", event, "success");
    });
  }, []);
  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);

    if (getQueryVariable("id", location.search.substring(1))) {
      onUpdateItem(
        "eventIDQ",
        getQueryVariable("id", location.search.substring(1))
      );
    } else {
      onUpdateItem("eventIDQ", false);
      onUpdateItem("matchIDQ", false);
      onUpdateItem("eventDef", false);
    }
    if (getQueryVariable("matchid", location.search.substring(1))) {
      onUpdateItem(
        "matchIDQ",
        getQueryVariable("matchid", location.search.substring(1))
      );
    }
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
  currentUser.userAnalyses?.sort((a, b) => (a.id < b.id ? 1 : -1));
  var nProfit = 0;
  try {
    nProfit = Number.parseFloat(currentUser.userAnalyses[0].profit).toFixed(2);
  } catch (e) {
    nProfit = 0;
  }
  return (
    <>
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

        <Modal.Content>
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
        onClose={() => onUpdateItem("openModalLogin", false)}
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
              onUpdateItem={onUpdateItem}
              findStateId={findStateId}
            />
          )}
        />

        <Route
          path="/lobby"
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
          path="/game/:id"
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
          path="/user"
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
    </>
  );
}
function App() {
  return (
    <QueryClientProvider
      cache={cache}
      client={queryClient}
      contextSharing={true}
    >
      <Main />
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
