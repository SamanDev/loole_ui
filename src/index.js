import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import { POSTURLTest, defUser } from "const";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "assets/scss/light-bootstrap-dashboard-pro-react.scss?v=2.0.0";
import "assets/css/landing-page.css";
import "assets/css/style.css";
import "semantic-ui-css/semantic.min.css";
// sections for this page
export * from "const";
import AuthLayout from "layouts/Auth.js";
import LandLayout from "layouts/Land.js";
import LandMobileLayout from "layouts/LandMobile.js";
import AdminLayout from "layouts/Admin.js";
import LockLayout from "layouts/Lock.js";
import PanelLayout from "layouts/Panel.js";
import Login from "components/newlogin.component";
import Register  from "components/newregister.component";
import { Spinner, Container } from "react-bootstrap";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";

import eventBus from "views/eventBus";
import {
  getQueryVariable,
  editEvent,
  haveAdmin,
  editDateTime,
} from "components/include";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from "react-query";
import {
  Checkbox,
  Grid,
  Header,
  Button,
  Icon,
  Modal,
  Divider,
  Menu,
  Dimmer,
  Loader,
  Image,
  Segment,
  Sidebar,

} from "semantic-ui-react";
import {
  useAllEvents,
  useUser,
  useAllEventsByStatus,
  useEventByID,
} from "services/hooks";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function Main() {
  const queryClient = useQueryClient();
  const history = useHistory();

  const [myState, setMyState] = useState({
    list: [
      { id: "currentUser", val: defUser },
      { id: "events", val: null },

      { id: "keyDash", val: 0 },
      { id: "eventMatch", val: null },
      { id: "eventDef", val: null },
      { id: "match", val: null },
      { id: "eventIDQ", val: getQueryVariable("id") },
      { id: "matchIDQ", val: getQueryVariable("matchid") },
      { id: "openModalAdd", val: false },
      { id: "openModalLogin", val: false },
    ],
  });
  const findStateId = (st, val) => {
    return st.list.filter(function (v) {
      return v.id === val;
    })[0].val;
  };
  const onUpdateItem = (key, val) => {
    if (findStateId(myState, key) != val){
      console.log(myState)
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
  const [keyDash, setKeyDash] = useState(0);
  const [keyMyMatch, setKeyMyMatch] = useState("pending-match");
  const [keyProfile, setKeyProfile] = useState("profile");
  // const query = mutationCache.findAll("User");
  //const query = mutationCache.getAll()

  var currentUser = findStateId(myState, "currentUser");
  var events = findStateId(myState, "events");
  var eventIDQ = findStateId(myState, "eventIDQ");
  var matchIDQ = findStateId(myState, "matchIDQ");
  var openModalLogin = findStateId(myState, "openModalLogin");

  const { data: userGet } = useUser();

  //const { data: eventsGet } = useAllEventsByStatus('All');
  const { data: eventsGet } = useAllEvents();

  useEffect(() => {
    if (userGet?.accessToken) {
      onUpdateItem("currentUser", userGet);
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
      queryClient.setQueryData(["Event", eventGet.id], eventGet);
      var NewEv = editEvent(eventGet, eventIDQ, matchIDQ, currentUser);
      onUpdateItem("eventMatch", NewEv);
      onUpdateItem("match", NewEv.matchidFind);
    }
  }, [eventGet]);
  useEffect(() => {
    eventBus.on("eventsData", (eventsGet) => {
      onUpdateItem("events", eventsGet);
      queryClient.setQueryData(["Events", "All"], eventsGet);
    });
    eventBus.on("eventsDataUser", (userGet) => {
      onUpdateItem("currentUser", userGet);
    });
    eventBus.on("eventsDataEventDo", (eventGet) => {
      if (eventGet?.id) {
        onUpdateItem("eventDef", eventGet);
        queryClient.setQueryData(["Event", eventGet.id], eventGet);
        var NewEv = editEvent(eventGet, eventIDQ, matchIDQ, currentUser);
        onUpdateItem("eventMatch", NewEv);
        onUpdateItem("match", NewEv.matchidFind);
      }
    });
    eventBus.on("eventsDataActive", (event) => {
      var curU = currentUser;
      curU.userActivate = true;
      
      localStorage.setItem("user", JSON.stringify(curU));
      eventBus.dispatch("eventsDataUser", curU);
      Swal.fire("", event, "success");
    });
  }, []);

  if (!currentUser || !events) {
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
        basic
        size="small"
        dimmer='blurring'
        closeIcon
        closeOnDimmerClick={false}
        open={openModalLogin}
        onClose={() => onUpdateItem("openModalLogin", false)}
      >
        <div style={{ padding: "45px 45px", margin: "auto" }}>
          <Segment inverted padded="very">
            <Grid columns={2}  relaxed="very">
              <Grid.Column>
              <Header as='h1' inverted>Login</Header>
              
                <Login onUpdateItem={onUpdateItem}/>
              </Grid.Column>
              <Grid.Column>
              <Header as='h1' inverted>Create Account</Header>
              
                <Register /></Grid.Column>
              
            </Grid>
            <Divider vertical inverted>OR</Divider>
          </Segment>
        </div>
      </Modal>
      <Switch>
        <Route
          path="/auth"
          render={(props) => (
            <AuthLayout
              {...props}
              authed={true}
              token={currentUser}
              tabkey={keyProfile}
              handleTabID={setKeyProfile}
            />
          )}
        />
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
          path="/lock"
          render={(props) => <LockLayout {...props} />}
          authed={true}
          events={events}
          token={currentUser}
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
