
import React,{useEffect, useState} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect,useHistory } from "react-router-dom";
import { POSTURLTest,defUser } from "const";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "assets/scss/light-bootstrap-dashboard-pro-react.scss?v=2.0.0";
import "assets/css/landing-page.css";
import "assets/css/style.css";
import 'semantic-ui-css/semantic.min.css'
// sections for this page
export * from "const";
import AuthLayout from "layouts/Auth.js";
import LandLayout from "layouts/Land.js";
import LandMobileLayout from "layouts/LandMobile.js";
import AdminLayout from "layouts/Admin.js";
import LockLayout from "layouts/Lock.js";
import PanelLayout from "layouts/Panel.js";



import eventBus from "views/eventBus";
import {
  
  getQueryVariable,
 editEvent,
  haveAdmin,
  editDateTime
} from "components/include";
import {useQuery,useMutation,useQueryClient,QueryClient,QueryClientProvider, QueryCache,MutationCache} from 'react-query'

import { useAllEvents,useUser,useAllEventsByStatus,useEventByID } from "services/hooks"
const queryClient = new QueryClient({
defaultOptions: {
queries: {
refetchOnWindowFocus: false,
},
},
})
var eventDefID = getQueryVariable("id");
var eventDefMatchID = getQueryVariable("matchid");

function logProps(WrappedComponent) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return LogProps;
}
function Main() {
 
  const queryClient =  useQueryClient();
  //queryClient.clear()
  
  var loc = window.location.href;
  
  const [keyDash, setKeyDash] = useState('all-match');
  const [keyMyMatch, setKeyMyMatch] = useState('pending-match');
  const [keyProfile, setKeyProfile] = useState('profile');
   // const query = mutationCache.findAll("User");
    //const query = mutationCache.getAll()
const [eventIDQ,setEventIDQ] = useState(eventDefID);
const [matchIDQ,setMatchIDQ] = useState(eventDefMatchID);
  

  

    
  const [events,setEvents] = useState();
  const [eventID,setEventID] = useState();
  const [currentUser,setCurrentUser] = useState();
  
  const { data: userGet  } = useUser();
  
  //const { data: eventsGet } = useAllEventsByStatus('All');
  const { data: eventsGet } = useAllEvents();
  const { data: eventGet } = useEventByID(eventIDQ);

  useEffect(() => {
    //console.log(userGet)
    /*
    if (userGet) {
      setCurrentUser(() => userGet)
    if (userGet.accessToken != '') {
      
      
    }else{
      
    
        if (loc.indexOf("/panel") > -1 && loc.indexOf("/panel/lo") == -1){
          //localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(defUser));
         // history.push("/auth/login-page");
        //window.location.replace("/auth/login-page");
        }
    }
  }else{
      
    
    if (loc.indexOf("/panel") > -1 && loc.indexOf("/panel/lo") == -1){
      localStorage.setItem("user", JSON.stringify(defUser));
      //localStorage.removeItem("user");
      //history.push("/auth/login-page");
    //window.location.replace("/auth/login-page");
    }
}
*/
setCurrentUser(() => userGet)
  eventBus.on("eventsDataUser", (userGet) => {
     
    setCurrentUser(userGet)
 
  
  
  
});

  }, [userGet]);
  eventBus.on("updateUser",()=>{
    queryClient.resetQueries(["User"]);
  })
  useEffect(() => {
    logProps(<PanelLayout salam="hi"/>)
    setEvents(() => eventsGet)
    eventBus.on("eventsData", (eventsGet) => {
      
      if(eventsGet && eventsGet !=events) {
        setEvents(eventsGet);
        queryClient.setQueryData(['Events','All'], eventsGet)
      
      }
     
 
        });
    
  }, [eventsGet]);
  useEffect(() => {
  
    setEventIDQ(() => eventIDQ)
    //queryClient.invalidateQueries()
    //useEventByID(eventIDQ);

  }, [eventIDQ]);
  useEffect(() => {
  
    setKeyDash(() => keyDash)
    //queryClient.invalidateQueries()
    //useEventByID(eventIDQ);

  }, [keyDash]);
  useEffect(() => {
  
    setMatchIDQ(() => matchIDQ)
    //queryClient.invalidateQueries()
    //useEventByID(eventIDQ);

  }, [matchIDQ]);
  useEffect(() => {
    
  }, [eventID]);
  useEffect(() => {
    
  if(eventIDQ && eventGet){
    
    setEventID(() => eventGet)
    eventBus.on("eventsDataEventDo", (eventGet) => {
      if(eventIDQ == eventGet.id){
          //setEventIDQ(eventGet.id)
          setEventID(() => eventGet)
          queryClient.setQueriesData(['Event',eventGet.id], eventGet)
          
       
      }
            });
  }
    
    
  }, [eventGet]);
  
  return (
    
    <Switch>
    
      <Route path="/auth" render={(props) => <AuthLayout {...props} authed={true} token={currentUser}  tabkey={keyProfile} handleTabID={setKeyProfile} />} />
      <Route path="/panel" render={(props) => <PanelLayout {...props}  authed={true} events={events} token={currentUser} tabkey={keyDash} tabkeymatch={keyMyMatch} tabkeyprofile={keyProfile} eventID={eventID} eventIDQ={eventIDQ} matchIDQ={matchIDQ} handleTabID={setKeyDash}  handleProfileTabID={setKeyProfile}  handleID={setEventIDQ} />} />
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/lock" render={(props) => <LockLayout {...props} />}  authed={true} events={events} token={currentUser}/>
      <Route path="/game/:id" render={(props) => <LandLayout {...props}  authed={true} events={events} token={currentUser}/>} />
      <Route path="/mobile" render={(props) => <LandLayout {...props}  authed={true} events={events} token={currentUser}/>} />
      <Route path="/home" render={(props) => <LandLayout {...props}  authed={true} events={events} token={currentUser} tabkey={keyDash} handleTabID={setKeyDash} />} />
      <Route path="/user" render={(props) => <LandLayout {...props}  authed={true} events={events} token={currentUser}/>} />
      <Route path="/content" render={(props) => <LandLayout {...props}  authed={true} events={events} token={currentUser}/>} />
      <Redirect from="/" to="/home" />
     
    </Switch>
      );
}
  function App() {
   
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Main/>
    
    </QueryClientProvider>
  );
}

ReactDOM.render(

  <BrowserRouter>
  <App />
  </BrowserRouter>

  ,
  document.getElementById("root")
);
