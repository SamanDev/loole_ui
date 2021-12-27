import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import Swal from "sweetalert2";
import { defUser,TrackingID } from "const";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "assets/scss/light-bootstrap-dashboard-pro-react.scss?v=2.0.0";
import "assets/css/landing-page.css";

import "semantic-ui-css/semantic.min.css";
import "assets/css/style.css";
// sections for this page
export * from "const";
import LandLayout from "layouts/Land.js";
import AdminLayout from "layouts/Admin.js";
import PanelLayout from "layouts/Panel.js";
import Login from "components/newlogin.component";
import Register  from "components/newregister.component";
import Chart  from "components/chart.component"; 
import DC  from "components/dc.component"; 
import eventBus from "views/eventBus";
import {
  getQueryVariable,
  editEvent,
} from "components/include";
import {
  useQueryClient,
  QueryClient,
  QueryClientProvider,
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

} from "semantic-ui-react";
import {
  useAllEvents,
  useUser,
  useEventByID,
} from "services/hooks";
import ReactGA from 'react-ga';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
ReactGA.initialize(TrackingID);
function Main() {
  
ReactGA.pageview(window.location.pathname + window.location.search);
  const queryClient = useQueryClient();
  const history = useHistory();
  var unUser = defUser;
  if(localStorage.getItem('user')){
    unUser = JSON.parse(localStorage.getItem('user'));
  }
  const [myState, setMyState] = useState({
    list: [
      { id: "currentUser", val: unUser },
      { id: "profileUser", val: false },
      { id: "events", val: null },

      { id: "keyDash", val: 0 },
      { id: "keyProfile", val: 0 },
      { id: "keyMyMatch", val: 0 },
      { id: "eventMatch", val: null },
      { id: "eventDef", val: null },
      { id: "match", val: null },
      { id: "eventIDQ", val: getQueryVariable("id") },
      { id: "matchIDQ", val: getQueryVariable("matchid") },
      { id: "openModalAdd", val: false },
      { id: "openModalLogin", val: false },
      { id: "openModalChart", val: false },
      { id: "openModalSoket", val: false },
    ],
  });
  
  const findStateId = (st, val) => {
    return st.list.filter(function (v) {
      return v.id === val;
    })[0].val;
  };
  const onUpdateItem = (key, val) => {
    //console.log(val)
    if (findStateId(myState, key) != val){
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
  var eventIDQ = findStateId(myState, "eventIDQ");
  var matchIDQ = findStateId(myState, "matchIDQ");
  var openModalLogin = findStateId(myState, "openModalLogin");
  var openModalChart = findStateId(myState, "openModalChart");
  var openModalSoket = findStateId(myState, "openModalSoket");
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
      onUpdateItem("openModalSoket", false)
      onUpdateItem("currentUser", userGet);
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
        onUpdateItem("eventDef", eventGet);
        queryClient.setQueryData(["Event", eventGet.id], eventGet);
        var NewEv = editEvent(eventGet, eventIDQ, matchIDQ, currentUser);
        onUpdateItem("eventMatch", NewEv);
        onUpdateItem("match", NewEv?.matchidFind);
      }
    });
    eventBus.on("eventsDataActive", (event) => {
      var curU = JSON.parse(JSON.stringify(findStateId(myState, "currentUser")));
      curU.userActivate = true;
      
      onUpdateItem("currentUser", curU);
      Swal.fire("", event, "success");
    });
  }, []);

  if (!currentUser ) {
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
        <Modal.Header className="text-center"><Icon.Group size='huge'>
      <Icon size='big' color='red' name='dont' />
      <Icon color='grey' name='user' />
    </Icon.Group><br/>Connection error...</Modal.Header>
      <Modal.Content><DC onUpdateItem={onUpdateItem}/></Modal.Content>
        
        </Modal>
        <Modal
        
        basic
        
        
        open={openModalChart}
        
        onClose={() => onUpdateItem("openModalChart", false)}
      >
        <Modal.Header>Profit Chart</Modal.Header>
      <Modal.Content><Chart myState={myState}
              onUpdateItem={onUpdateItem}
              findStateId={findStateId} /></Modal.Content>
        
        </Modal>
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
        <Modal.Content image scrolling>
          <Segment inverted padded="very">
            <Grid  relaxed="very">
              <Grid.Column mobile={16} tablet={8} computer={8}>
              <Header as='h2' inverted>Login</Header>
              
                <Login onUpdateItem={onUpdateItem}/>
                <Divider horizontal inverted className="mobile only" style={{marginTop: 40}}>Or</Divider>
              </Grid.Column>
              
              <Grid.Column mobile={16} tablet={8} computer={8}>
              
              <Header as='h2' inverted>Create Account</Header>
              
                <Register onUpdateItem={onUpdateItem} /></Grid.Column>
              
            </Grid>
            
            <Divider vertical inverted  className="mobile hidden">OR</Divider>
          </Segment>
          </Modal.Content>
        </div>
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
