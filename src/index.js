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
import Swal from "sweetalert2";
import { defUser, TrackingID } from "const";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

// sections for this page
export * from "const";
import LandLayout from "layouts/Land.js";
import AdminLayout from "layouts/Admin.js";
import PanelLayout from "layouts/Panel.js";
import Login from "components/newlogin.component";
import Register from "components/newregister.component";
import Forget from "components/newforget.component";
import Chart from "components/chart.component";
import DC from "components/dc.component";
import eventBus from "views/eventBus";
import {
  getQueryVariable,
  editEvent,
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
} from "semantic-ui-react";
import { useAllEvents, useUser, useEventByID } from "services/hooks";
import ReactGA from "react-ga";
import "semantic-ui-css/semantic.min.css";
import "assets/css/style.css";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
ReactGA.initialize(TrackingID);
function Main() {
  const queryClient = useQueryClient();
  const history = useHistory();
  const location = useLocation();
  var unUser = defUser;
  if (localStorage.getItem("user")) {
    try{unUser = JSON.parse(localStorage.getItem("user"));}catch(e){}
    
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
      { id: "eventIDQ", val: getQueryVariable("id") },
      { id: "matchIDQ", val: getQueryVariable("matchid") },
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
      onUpdateItem("matchIDQ", getQueryVariable("matchid"));
      queryClient.setQueryData(["Event", eventGet.id], eventGet);
      onUpdateItem("match", findActiveMatch(eventGet, matchIDQ));
    }
  }, [eventGet]);
  useEffect(() => {
    if (eventDef?.matchTables) {
      onUpdateItem("match", findActiveMatch(eventDef, matchIDQ));
    }
  }, [matchIDQ]);
  useEffect(() => {
    eventBus.on("eventsData", (eventsGet) => {
      onUpdateItem("events", eventsGet);

      queryClient.setQueryData(["Events", "All"], eventsGet);
    });
    eventBus.on("eventsDataUser", (userGet) => {
      onUpdateItem("openModalSoket", false);
      onUpdateItem("currentUser", userGet);
      updateNot(userGet);
      localStorage.setItem("user", JSON.stringify(userGet));
      queryClient.resetQueries(["Events"]);
      queryClient.resetQueries(["Event"]);
    });
    eventBus.on("eventsDC", () => {
      //  alert()
      onUpdateItem("openModalSoket", true);
    });
    eventBus.on("eventsConnect", () => {
      //  alert()
      onUpdateItem("openModalSoket", false);
    });
    eventBus.on("eventsDataEventDo", (eventGet) => {
      if (eventGet?.id) {
        queryClient.setQueryData(["Event", eventGet.id], eventGet);
        if (
          eventIDQ == eventGet.id ||
          isPlayerInMatch(
            findActiveMatch(eventGet, matchIDQ),
            currentUser.username
          )
        ) {
          onUpdateItem("eventDef", eventGet);
          onUpdateItem("eventIDQ", eventGet.id);
          onUpdateItem("match", findActiveMatch(eventGet, matchIDQ));
          if (
            isPlayerInMatch(
              findActiveMatch(eventGet, matchIDQ),
              currentUser.username
            ) &&
            window.location.pathname + window.location.search !=
              "/panel/lobby?id=" + eventGet.id  && !matchIDQ
          ) {
            if (eventGet.status == "Ready" || eventGet.status == "InPlay" ) {
              history.push("/panel/lobby?id=" + eventGet.id);
            }
          }
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
    if (getQueryVariable("id")) {
      onUpdateItem("eventIDQ", getQueryVariable("id"));
    } else {
      onUpdateItem("eventIDQ", false);
      onUpdateItem("eventDef", false);
    }
    if (getQueryVariable("matchid", location.pathname + location.search)) {
      onUpdateItem(
        "matchIDQ",
        getQueryVariable("matchid", location.pathname + location.search)
      );
    } else {
      onUpdateItem("matchIDQ", false);
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
  return (
    <>
      <Modal
        size="mini"
        basic
        open={openModalSoket}
        onClose={() => onUpdateItem("openModalSoket", false)}
      >
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
        <Modal.Header>Profit Chart</Modal.Header>
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
        <Modal.Content scrolling>
          <Segment inverted padded="very">
            <Grid relaxed="very">
              <Grid.Column mobile={16} tablet={8} computer={8}>
                <Header as="h3" inverted>
                  Login
                </Header>

                <Login onUpdateItem={onUpdateItem} />

                <span className="mobile only">
                  <Divider horizontal inverted style={{ marginTop: 40 }}>
                    Or
                  </Divider>
                  <Header as="h3" inverted>
                    Create Account
                  </Header>

                  <Register onUpdateItem={onUpdateItem} />
                </span>
                <span>
                  <Divider horizontal inverted style={{ marginTop: 40 }}>
                    Or
                  </Divider>
                  <Header as="h4" inverted>
                    Password Recovery
                  </Header>

                  <Forget onUpdateItem={onUpdateItem} />
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
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />

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
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Main />
    </QueryClientProvider>
  );
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,

  document.getElementById("root")
);
