import React, { Component, useState,useEffect} from "react";

import $ from "jquery";
import { NavLink, Link } from "react-router-dom";
import { useHistory } from "react-router";
// react-bootstrap components
import {
  Badge,
  Button,
  
  Container,
  
  Spinner,
  Accordion,
} from "react-bootstrap";
import {
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react'
import Active  from "components/active.component";
import TransitionExampleTransitionExplorer  from "components/anim.component";
import { useAllEvents,useUser,useAllEventsByStatus,useEventByID } from "services/hooks"
import AdminNavbar from "components/Navbars/ChatNavbar.js";

import Chatbar from "components/Sidebar/Chat.js";
import userService from "services/user.service";
import AuthService from "services/auth.service";
import League from "server/league";
import eventBus from "views/eventBus";
import {useQuery,useMutation,useQueryClient,QueryClient,QueryClientProvider, } from 'react-query'

import LeagueSection  from "components/events/league.component"; 
import TournamentSection  from "components/events/tournament.component"; 
import MatchSection  from "components/events/match.component"; 
import MatchTourSection  from "components/events/tournamentmatch.component"; 
import {
  
  getQueryVariable,
 
  haveAdmin,
  editEvent,
  editDateTime
} from "components/include";
import { UPLOADURL, POSTURLTest } from "const";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});



    
    function LockScreenPage(prop) {
     
      const history = useHistory();
      const eventIDQ = getQueryVariable("id");
      const matchIDQ = getQueryVariable("matchid");
      const [myState, setMyState] = useState(prop.myState)
  useEffect(() => {
    setMyState(prop.myState)
   
    
}, [prop.myState]);
  useEffect(() => {
    prop.onUpdateItem('eventIDQ',getQueryVariable("id"))
    prop.onUpdateItem('matchIDQ',getQueryVariable("matchid"))
    $("#jsonhtml").html($("#jsonhtml2").text());
    
}, []);
const currentUser = prop.findStateId(myState,'currentUser');
const eventMatch = prop.findStateId(myState,'eventMatch');

const match = prop.findStateId(myState,'match');

      
      const [visible, setVisible] = React.useState(false);
      const devWid = document.documentElement.clientWidth;
  
  
  
  
      
      
      
    
     const handleDelete =(e) => {
      e.preventDefault();
  
      userService.deleteEvent(eventIDQ).then(
        (response) => {
          history.push("/panel/dashboard");
          //window.location.replace("/panel/dashboard");
          //return <Redirect to="/panel/dashboard" />;
        },
        (error) => {}
      );
    }
        
      if (!eventMatch || !currentUser || (!match)) {
       
      
      
        return (
          <>
            <div
              className="full-page lock-page"
              data-color="black"
              style={{ height: "100vh", overflow: "auto" }}
              data-image={require("assets/img/bg.jpg").default}
            >
              <div
                className="content "
                style={{
                  fontSize: 50,
                  color: "#fff",
                  position: "relative",
                  zIndex: "23",
                }}
              >
                <Container className="text-center">
                  <h4 style={{ textAlign: "center" }}>
                    Loading
                    <Spinner animation="grow" size="sm" />
                    <Spinner animation="grow" size="sm" />
                    <Spinner animation="grow" size="sm" />
                  </h4>
                  {(matchIDQ) ? (
                                
                                <Link to={"/panel/lobby?id="+eventIDQ} className="btn actbtn btn-danger btn-round "> Back </Link>
                              ):(
                                <>
                                {getQueryVariable("ref")? (
                                <>
                                {getQueryVariable("ref") == 'home'? (
                                  <Link to={"/"+getQueryVariable("ref")} className="btn  actbtn btn-danger btn-round "> Back </Link>
                                  ):(
                                    <Link to={"/panel/"+getQueryVariable("ref")} className="btn  actbtn btn-danger btn-round "> Back </Link>
                                    )}
                                </>
                                ):(
                                  <Link to="/panel/dashboard" className="btn actbtn btn-danger btn-round "> Back </Link>
                                  )}
                                  </>
                              )}
                                {(haveAdmin(currentUser.roles))&&(
                <>
                 <Button
                                      className="btn-round actbtn hid2e"
                                      onClick={handleDelete}
                                      variant="primary"
                                    >
                                      Delet Match
                                    </Button>
                </>
              )}
                </Container>
              </div>
              <div
                className="full-page-background"
                style={{
                  backgroundImage:
                    "url(" + require("assets/img/bg.jpg").default + ")",
                }}
              ></div>
            </div>
          </>
        );
              
      }
      
      return (
        <>
          <div
              className="full-page lock-page"
              data-color="black"
              style={{ height: "100vh", overflow: "auto" }}
              data-image={require("assets/img/bg.jpg").default}
            >
              <div
                className="content "
                style={{
                  fontSize: 50,
                  color: "#fff",
                  position: "relative",
                  zIndex: "23",
                  paddingTop:0
                }}
              >
                
                
         
        <Sidebar.Pushable as={Segment} style={{background:'none'}}>
          <Sidebar
          
            animation='push'
            icon='labeled'
            width='thin'
            onHide={() => setVisible(false)}
            style={{ width: "100vw", maxWidth:300,height: "100vh !important"}}
            inverted
            vertical
            visible={(devWid > 500) ? (true):(visible)}
         
           
          >
         
            {match && eventMatch.gameMode != "Tournament" && eventMatch.gameMode != "League" ? (
              <Chatbar
             
                eventID={eventIDQ}
                matchID={matchIDQ}
                eventstatus={eventMatch.status}
                masterplayer={match.matchPlayers[0].username}
                secondplayer={match.matchPlayers[1].username}
                eventchats={eventMatch.chats}
                chats={match.matchChats}
                username={currentUser}
              />
            ) : (
              <>
              {matchIDQ   ? (
              <Chatbar
             
                eventID={eventIDQ}
                matchID={matchIDQ}
                eventstatus={eventMatch.status}
                masterplayer={match.matchPlayers[0].username}
                secondplayer={match.matchPlayers[1].username}
                eventchats={eventMatch.chats}
                chats={match.matchChats}
                username={currentUser}
              />
            ) : (
              <Chatbar
             
                eventID={eventIDQ}
                matchID={matchIDQ}
                eventstatus={eventMatch.status}
                masterplayer="null"
                secondplayer="null"
                eventchats={eventMatch.chats}
                chats="null"
                username={currentUser}
              />
            )}
              </>
             
            )}
          
          </Sidebar>

          <Sidebar.Pusher >
            <Segment basic>
            
            
                  <Container>
                 
                    <Active {...prop}/>
                    <Icon name='rocketchat' className={(devWid > 500) && ('hide')} inverted size='large' circular color='teal' onClick={() => setVisible(!visible)} />
                    <Icon name='chevron left' inverted size='large' circular color='orange' onClick={() => history.goBack()} />
                    
                                {(haveAdmin(currentUser.roles))&&(
                <>
                 <Button
                                      className="btn-round actbtn hid2e"
                                      onClick={handleDelete}
                                      variant="primary"
                                    >
                                      Delet Match
                                    </Button>
                </>
              )}
                               
                                
                                   
                                    
                                 
                    {eventMatch.gameMode == "League" ? (
                      <LeagueSection item={eventMatch} matchidFind={match} token={currentUser} />
                    ) : (
                      <>
                        {(eventMatch.gameMode == "Tournament" && !matchIDQ) ? (
                          <TournamentSection item={eventMatch} token={currentUser} />
                         
                        ) : (
                          <>
                          {(eventMatch.gameMode == "Tournament") ? (
                          <MatchTourSection item={eventMatch} matchidFind={match} token={currentUser} />
                          ) : (
                            
                            <MatchSection item={eventMatch} matchidFind={match} token={currentUser} />
                            
                          )}
                          </>
                        )}
                      </>
                    )}
                   
                  </Container>
                
          
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        </div>
              <div
                className="full-page-background"
                style={{
                  backgroundImage:
                    "url(" + require("assets/img/bg.jpg").default + ")",
                }}
              ></div>
            </div>
        </>
      );
                }

  
  
  
   
    
 

export default LockScreenPage;
