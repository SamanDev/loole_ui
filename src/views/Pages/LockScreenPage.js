import React, { Component, useState,useEffect,useLayoutEffect} from "react";

import $ from "jquery";
import { NavLink, Link } from "react-router-dom";
import { useHistory } from "react-router";
// react-bootstrap components
import {
  Badge,
 
  Container,
  Col,
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
  Dimmer,
  Loader,
  Button
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
 
});



    
    function LockScreenPage(prop) {
     
      const history = useHistory();
      const eventIDQ = getQueryVariable("id");
      const matchIDQ = getQueryVariable("matchid");
      const [myState, setMyState] = useState(prop.myState)
  useEffect(() => {
    setMyState(prop.myState)
   
    
}, [prop.myState]);
useLayoutEffect(() => {
    //prop.onUpdateItem('eventIDQ',getQueryVariable("id"))
   // prop.onUpdateItem('matchIDQ',getQueryVariable("matchid"))
    $("#jsonhtml").html($("#jsonhtml2").text());
    //handleAllDelete(eventIDQ)
}, []);
const currentUser = prop.findStateId(myState,'currentUser');
var eventMatch = prop.findStateId(myState,'eventMatch');

const match = prop.findStateId(myState,'match');

      if(eventIDQ != eventMatch?.id){eventMatch = false}
      const [visible, setVisible] = React.useState(false);
      const devWid = document.documentElement.clientWidth;
  
  
  
  
      
      
      
      const BackBTC =() => {
        return <Button animated  inverted color='pink'  onClick={() => history.goBack()}>
          <Button.Content visible>Go Back</Button.Content>
          <Button.Content hidden>
            <Icon name='arrow left' />
          </Button.Content>
        </Button>
      }
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
      const handleAllDelete =(id) => {
        //e.preventDefault();
    
        userService.deleteEvent(id).then(
          (response) => {
            //history.push("/panel/dashboard");
            handleAllDelete(id-1)
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
              data-image={"/assets/img/bg.jpg"}
            >
              <Segment style={{ height: "100%", width: "100%", position: "absolute",background:'transparent' }}>
            <Dimmer active  style={{ background:'transparent' }}>
              <Loader size="large">Loading
              <br/><br/>
              {BackBTC()}
      {(haveAdmin(currentUser.roles))&&(
                <>
                <br/><br/> <br/><br/> <br/><br/>
                 <Button
                                     inverted color='red' 
                                      onClick={handleDelete}
                             
                                    >
                                      Delet Match
                                    </Button>
                </>
              )}
              </Loader>
            </Dimmer>
          </Segment>
             
              <div
                className="full-page-background"
                style={{
                  backgroundImage:
                    "url('/assets/img/bg.jpg')",
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
              
              data-image={"/assets/img/bg.jpg"}
            >
              <div
                className="content "
                style={{
                 
                  color: "#fff",
                  position: "relative",
                  zIndex: "23",
                  paddingTop:0
                }}
              >
                
                
                <Segment style={{ height: "100%", width: "100%", position: "absolute",background:'transparent',padding:0 ,border:'none'}}>
                
        <Sidebar.Pushable as={Segment} style={{background:'none'}}>
          <Sidebar
          
            animation='push'
            icon='labeled'
            width='thin'
            
            onHide={() => setVisible(false)}
            style={{ width: "100vw", maxWidth:300,height: "100vh !important"}}
            inverted
            vertical
            visible={(devWid > 991) ? (true):(visible)}
         
           
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

          <Sidebar.Pusher  style={{background:'none',padding:0}}>
           
          <Container >
          <Active {...prop}/>
          {BackBTC()}
      <Button inverted color='blue' floated="right" className="mobile tablet only" onClick={() => setVisible(!visible)}>
        Chat...
      </Button>
      {(haveAdmin(currentUser.roles))&&(
                <>
                
                 <Button
                 floated="right"
                                     inverted color='red' 
                                      onClick={handleDelete}
                             
                                    >
                                      Delet Match
                                    </Button>
                </>
              )}
              </Container >
                  <div style={{height: 'calc(100vh - 40px)',overflow:'auto'}}>
                 
                  <Container >
                    
                                   
                                    
                                 
                    {eventMatch.gameMode == "League" ? (
                      <LeagueSection item={eventMatch} matchidFind={match} token={currentUser} />
                    ) : (
                      <>
                        {(eventMatch.gameMode == "Tournament" && !matchIDQ) ? (
                          <TournamentSection item={eventMatch} token={currentUser} {...prop} />
                         
                        ) : (
                          <>
                          {(eventMatch.gameMode == "Tournament") ? (
                          <MatchTourSection item={eventMatch} matchidFind={match} token={currentUser} {...prop} />
                          ) : (
                            
                            <MatchSection item={eventMatch} matchidFind={match} token={currentUser} {...prop} />
                            
                          )}
                          </>
                        )}
                      </>
                    )}
                   
                  </Container>
                
          </div>
           
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        </Segment>
        </div>
              <div
                className="full-page-background"
                style={{
                  backgroundImage:
                    "url('/assets/img/bg.jpg')",
                }}
              ></div>
            </div>
        </>
      );
                }

  
  
  
   
    
 

export default LockScreenPage;
