import React, { useState, useEffect, useContext } from "react";

import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
// react-bootstrap components
import { Link } from "react-router-dom";
import { Container, Col } from "react-bootstrap";
import {
  Icon,
  Segment,
  Sidebar,
  Dimmer,
  Loader,
  Button,
  Breadcrumb,
} from "semantic-ui-react";
import Active from "components/active.component";

import Chatbar from "components/Sidebar/Chat.js";
import userService from "services/user.service";

//import LeagueSection  from "components/events/league.component";
import LeagueSection from "components/events/league.component";
import TournamentSection from "components/events/tournament.component";
import MatchSection from "components/events/match.component";
import MatchTourSection from "components/events/tournamentmatch.component";
import { haveAdmin, getQueryVariable } from "components/include";
import UserContext from "context/UserState";
import EventContext from "context/EventState";
function LockScreenPage(prop) {
  const history = useHistory();
  const params = useParams();
  const [myState, setMyState] = useState(prop.myState);
  const matchIDQ = params.matchid;

  const context = useContext(UserContext);
  const Econtext = useContext(EventContext);

  const title = params.title;

  const { currentUser } = context.uList;
  const { event } = Econtext.eList;
  const eventDef = event;
  const { setEList } = Econtext;
  const eventIDQ = event?.id;

  useEffect(() => {
    prop.onUpdateItem("eventIDQ", parseInt(event?.id));

    //prop.onUpdateItem("matchIDQ", parseInt(matchIDQ));

    document.title = title.replace(/-/g, " ");
    if (params.matchlevel) {
      document.title =
        document.title + " - " + params.matchlevel.replace(/-/g, " ");
    }
    return () => {};
  }, []);
  useEffect(() => {
    prop.onUpdateItem("matchIDQ", parseInt(params.matchid));
  }, [params.matchid]);

  const match = prop.findStateId(myState, "match");
  const [visible, setVisible] = React.useState(false);
  const devWid = document.documentElement.clientWidth;

  const BackBTC = () => {
    return (
      <>
        {history.length > 1 ? (
          <Button
            animated
            inverted
            color="pink"
            onClick={() => history.goBack()}
          >
            <Button.Content visible>Go Back</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow left" />
            </Button.Content>
          </Button>
        ) : (
          <Button
            animated
            inverted
            color="pink"
            to="/panel/dashboard"
            as={Link}
          >
            <Button.Content visible>Go Home</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow left" />
            </Button.Content>
          </Button>
        )}
      </>
    );
  };
  const handleDelete = (e) => {
    e.preventDefault();

    userService.deleteEvent(eventIDQ).then(
      () => {
        history.push("/panel/dashboard");
        //window.location.replace("/panel/dashboard");
        //return <Redirect to="/panel/dashboard" />;
      },
      () => {}
    );
  };
  const handleAllDelete = (id) => {
    //e.preventDefault();

    userService.deleteEvent(id).then(
      () => {
        //history.push("/panel/dashboard");
        handleAllDelete(id - 1);
        //window.location.replace("/panel/dashboard");
        //return <Redirect to="/panel/dashboard" />;
      },
      () => {}
    );
  };

  if (!eventDef || !currentUser || (!match && eventDef?.gameMode != "League")) {
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
  var secSec = event.gameName;
  var secLink = "/game/" + event.gameName;
  if (currentUser?.accessToken) {
    secSec = "Dashboard";
    secLink = "/panel/dashboard";
  }
  var sections = [
    { key: "Home", content: "Home", link: true, to: "/home", as: Link },
    {
      key: secSec,
      content: secSec,
      link: true,
      as: Link,
      to: secLink,
    },
    {
      key: event.gameMode,
      content: event.gameMode,
      active: true,
    },
  ];
  if (matchIDQ) {
    sections = [
      { key: "Home", content: "Home", link: true, to: "/home", as: Link },
      {
        key: secSec,
        content: secSec,
        link: true,
        as: Link,
        to: secLink,
      },
      {
        key: event.gameMode,
        content: event.gameMode,
        link: true,
        as: Link,
        to: "/lobby/" + event.id + "/" + title + "/",
      },
      {
        key: params.matchlevel.replace(/-/g, " "),
        content: params.matchlevel.replace(/-/g, " "),
        active: true,
      },
    ];
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
                    {matchIDQ ? (
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
                    <Breadcrumb icon="right angle" sections={sections} />
                  </Col>
                </Container>
                <div style={{ height: "calc(100vh - 90px)", overflow: "auto" }}>
                  <Container style={{ paddingBottom: 50 }}>
                    {eventDef.gameMode == "League" ? (
                      <LeagueSection {...prop} event={eventDef} />
                    ) : (
                      <>
                        {eventDef.gameMode == "Tournament" && !matchIDQ ? (
                          <TournamentSection {...prop} event={eventDef} />
                        ) : (
                          <>
                            {eventDef.gameMode == "Tournament" ? (
                              <MatchTourSection
                                {...prop}
                                event={eventDef}
                                matchIDQ={matchIDQ}
                              />
                            ) : (
                              <MatchSection {...prop} event={eventDef} />
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
