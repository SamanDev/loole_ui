import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
// react-bootstrap components
import { Container, Col } from "react-bootstrap";
import {
  Icon,
  Segment,
  Sidebar,
  Dimmer,
  Loader,
  Button,
} from "semantic-ui-react";
import Active from "components/active.component";

import Chatbar from "components/Sidebar/Chat.js";
import userService from "services/user.service";

//import LeagueSection  from "components/events/league.component";
import LeagueSection from "components/events/league.component";
import TournamentSection from "components/events/tournament.component";
import MatchSection from "components/events/match.component";
import MatchTourSection from "components/events/tournamentmatch.component";
import { findActiveMatch, haveAdmin,getQueryVariable } from "components/include";
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
  // alert(location)

  const [myState, setMyState] = useState(prop.myState);
  useEffect(() => {
    setMyState(prop.myState);
  }, [prop.myState]);
  const eventIDQ = prop.findStateId(myState, "eventIDQ");
  const matchIDQ = prop.findStateId(myState, "matchIDQ");
  const currentUser = prop.findStateId(myState, "currentUser");
  
  const eventDef = prop.findStateId(myState, "eventDef");
  const match = prop.findStateId(myState, "match");
  const [visible, setVisible] = React.useState(false);
  const devWid = document.documentElement.clientWidth;

  const BackBTC = () => {
    return (
      <Button animated inverted color="pink" onClick={() => history.goBack()}>
        <Button.Content visible>Go Back</Button.Content>
        <Button.Content hidden>
          <Icon name="arrow left" />
        </Button.Content>
      </Button>
    );
  };
  const handleDelete = (e) => {
    e.preventDefault();

    userService.deleteEvent(eventIDQ).then(
      (response) => {
        history.push("/panel/dashboard");
        //window.location.replace("/panel/dashboard");
        //return <Redirect to="/panel/dashboard" />;
      },
      (error) => {}
    );
  };
  const handleAllDelete = (id) => {
    //e.preventDefault();

    userService.deleteEvent(id).then(
      (response) => {
        //history.push("/panel/dashboard");
        handleAllDelete(id - 1);
        //window.location.replace("/panel/dashboard");
        //return <Redirect to="/panel/dashboard" />;
      },
      (error) => {}
    );
  };

  if (!eventDef || !currentUser || (!match && eventDef?.gameMode != 'League')) {
    return (
      <>
        <div
          className="full-page lock-page"
          data-color="black"
          style={{ height: "100vh", overflow: "auto" }}
          data-image={"/assets/img/bg.jpg"}
        >
          <Segment
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              background: "transparent",
            }}
          >
            <Dimmer active style={{ background: "transparent" }}>
              <Loader size="large">
                Loading
                <br />
                <br />
                {BackBTC()}
                {haveAdmin(currentUser.roles) && (
                  <>
                    <br />
                    <br /> <br />
                    <br /> <br />
                    <br />
                    <Button inverted color="red" onClick={handleDelete}>
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
              backgroundImage: "url('/assets/img/bg.jpg')",
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
            paddingTop: 0,
          }}
        >
          <Segment
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              background: "transparent",
              padding: 0,
              border: "none",
            }}
          >
            <Sidebar.Pushable as={Segment} basic>
              <Sidebar
                animation="push"
                icon="labeled"
                width="thin"
                onHide={() => setVisible(false)}
                style={{
                  width: "100vw",
                  maxWidth: 300,
                  height: "100vh !important",
                  padding: 0,
                }}
                vertical
                visible={devWid > 991 ? true : visible}
                as={Segment}
                basic
              >
                {match &&
                eventDef.gameMode != "Tournament" &&
                eventDef.gameMode != "League" ? (
                  <Chatbar
                    eventID={eventIDQ}
                    matchID={matchIDQ}
                    eventstatus={eventDef.status}
                    masterplayer={match.matchPlayers[0]?.username}
                    secondplayer={match.matchPlayers[1]?.username}
                    eventchats={eventDef.chats}
                    chats={match.matchChats}
                    username={currentUser}
                    onUpdateItem={prop.onUpdateItem}
                  />
                ) : (
                  <>
                    {getQueryVariable("matchid", window.location.search.substring(1)) ? (
                      <Chatbar
                        eventID={eventIDQ}
                        matchID={matchIDQ}
                        eventstatus={eventDef.status}
                        masterplayer={match.matchPlayers[0]?.username}
                        secondplayer={match.matchPlayers[1]?.username}
                        eventchats="null"
                        chats={match.matchChats}
                        username={currentUser}
                        onUpdateItem={prop.onUpdateItem}
                      />
                    ) : (
                      <Chatbar
                        eventID={eventIDQ}
                        matchID={matchIDQ}
                        eventstatus={eventDef.status}
                        masterplayer="null"
                        secondplayer="null"
                        eventchats={eventDef.chats}
                        chats="null"
                        username={currentUser}
                        
                      />
                    )}
                  </>
                )}
              </Sidebar>

              <Sidebar.Pusher
                style={{ background: "none", padding: 0, height: "100vh" }}
              >
                <Container>
                  <Col
                    className="mx-auto "
                    lg="8"
                    md="10"
                    style={{ padding: 0, marginTop: 20 }}
                  >
                    <Active {...prop} />
                    {BackBTC()}
                    <Button
                      inverted
                      color="blue"
                      floated="right"
                      className="mobile tablet only"
                      onClick={() => setVisible(!visible)}
                    >
                      Chat...
                    </Button>
                    {haveAdmin(currentUser.roles) && (
                      <>
                        <Button
                          floated="right"
                          inverted
                          color="red"
                          onClick={handleDelete}
                        >
                          Delet Match
                        </Button>
                      </>
                    )}
                  </Col>
                </Container>
                <div style={{ height: "calc(100vh - 50px)", overflow: "auto" }}>
                  <Container style={{ paddingBottom: 50 }}>
                    {eventDef.gameMode == "League" ? (
                      <LeagueSection
                      {...prop}
                      />
                    ) : (
                      <>
                        {eventDef.gameMode == "Tournament" && !getQueryVariable("matchid", window.location.search.substring(1)) ? (
                          <TournamentSection
                            
                            {...prop}
                          />
                        ) : (
                          <>
                            {eventDef.gameMode == "Tournament" ? (
                              <MatchTourSection
                               
                                {...prop}
                              />
                            ) : (
                              <MatchSection
                             
                               
                               
                                {...prop}
                              />
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
            backgroundImage: "url('/assets/img/bg.jpg')",
          }}
        ></div>
      </div>
    </>
  );
}

export default LockScreenPage;
