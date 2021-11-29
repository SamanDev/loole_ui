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

import Active  from "components/active.component";

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
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import {
  userState
} from 'atoms';
import { useEventByID } from "services/hooks"
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
      const queryClient = new QueryClient();
      const history = useHistory();
      const eventIDQ = getQueryVariable("id");
      const matchIDQ = getQueryVariable("matchid");
      const [currentUser,setCurrentUser] = useState(prop.token);
  
  const [eventDef,setEventDef] = useState(prop.event);
  const [eventMatch,setEventMatch] = useState();
  const [match,setMatch]  = useState();
  useEffect(() => {
   
    
    if(prop.event){
      
      prop.handleMatchID(matchIDQ)
      if(eventIDQ != prop.event.id){
        prop.handleID(eventIDQ)
      }else{
       
        var  NewEv  = editEvent(prop.event,eventIDQ,matchIDQ,currentUser);
    
        setEventMatch(NewEv);
        setMatch(NewEv.matchidFind);
        $("#jsonhtml").html($("#jsonhtml2").text());
        setEventDef(() => prop.event)
      }
      
    }else{
      prop.handleID(eventIDQ)
    }
    
    
  }, [prop.event]);
  useEffect(() => {
    
    setCurrentUser(() => currentUser)
    
  }, [currentUser]);
 
      
      
      
    
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
          <div className="wrapper">
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
  
            <div className="main-panel lobby">
              <div
                className="full-page lock-page"
                data-color="black"
                style={{ height: "100vh", overflow: "auto" }}
                data-image={require("assets/img/bg.jpg").default}
              >
                <AdminNavbar page="dashboard" />
  
                <div className="content d-flex align-items-center p-0">
                  <Container style={{ marginTop: 50 }}>
                    <Active token={currentUser}/>
                  {(getQueryVariable("matchid")) ? (
                                
                                <Link to={"/panel/lobby?id="+eventMatch.id} className="btn actbtn btn-danger btn-round "> Back </Link>
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
                               
                                
                                   
                                    
                                 
                    {eventMatch.gameMode == "League" ? (
                      <LeagueSection item={eventMatch} matchidFind={match} token={currentUser} />
                    ) : (
                      <>
                        {(eventMatch.gameMode == "Tournament" && !matchIDQ) ? (
                          <TournamentSection item={eventMatch} token={currentUser} passedFunction={setMatch} />
                         
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
                </div>
  
                <div
                  className="full-page-background"
                  style={{
                    backgroundImage:
                      "url(" + require("assets/img/bg.jpg").default + ")",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </>
      );
                }

  
  
  
   
    
 

export default LockScreenPage;
