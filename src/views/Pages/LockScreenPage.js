import React, { useState, useEffect, useContext, lazy, Suspense } from "react";
import { Helmet } from "react-helmet";
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
import Swal from "sweetalert2";
import Chatbar from "components/Sidebar/Chat.js";
import userService from "services/user.service";
import adminService from "services/admin.service";

//import LeagueSection  from "components/events/league.component";
const LeagueSection = lazy(() => import("components/events/league.component"));
const TournamentSection = lazy(() =>
  import("components/events/tournament.component")
);
const MatchSection = lazy(() => import("components/events/match.component"));
const MatchTourSection = lazy(() =>
  import("components/events/tournamentmatch.component")
);
const Helpblog = lazy(() => import("components/helpsectoin.component"));
//import LeagueSection from "components/events/league.component";
//import TournamentSection from "components/events/tournament.component";
//import MatchSection from "components/events/match.component";
//import MatchTourSection from "components/events/tournamentmatch.component";
import { haveAdmin, getQueryVariable } from "components/include.js";
import UserContext from "context/UserState";
import EventContext from "context/EventState";
var _tit;
var _arrTit;
const renderLoader = (sections) => (
  <div
    className="full-page lock-page"
    data-color="black"
    style={{ height: "100%", overflow: "auto" }}
  >
    <Segment
      style={{
        height: "100%",
        width: "100%",
        position: "absolute",
        background: "transparent",
      }}
    >
      <Container
        style={{
          top: "0",
          width: "100%",
          position: "relative",
          zIndex: 30000,
          color: "#fff",
        }}
      >
        <Breadcrumb icon="right angle" sections={sections} />
      </Container>
      <Dimmer active style={{ background: "transparent" }}>
        <Loader size="large">Loading</Loader>
      </Dimmer>
    </Segment>

    <div
      className="full-page-background"
      style={{
        backgroundImage: "url('/assets/img/bg.webp')",
      }}
    ></div>
  </div>
);
function LockScreenPage(prop) {
  const history = useHistory();
  const params = useParams();
  const [myState, setMyState] = useState(prop.myState);
  const matchIDQ = params.matchid;
  useEffect(() => {
    setMyState(prop.myState);
  }, [prop.myState]);
  const context = useContext(UserContext);
  const Econtext = useContext(EventContext);

  const title = params.title;

  _arrTit = title.replace("+", " ").split("-");
  var _desc =
    title.replace(/-/g, " ") +
    ". Loole.gg is an online global platform where you can compete for real cash and coins in your " +
    _arrTit[1] +
    " game.";
  _tit =
    _arrTit[1] +
    " " +
    _arrTit[0] +
    " - " +
    _arrTit[3] +
    " " +
    _arrTit[4] +
    " " +
    _arrTit[5];
  if (params.matchlevel) {
    _tit =
      _tit +
      " - " +
      params.matchlevel
        .replace(/-/g, " ")
        .replace("Final No1", "Final Match")
        .replace(" No", " No ");
    _desc =
      params.matchlevel
        .replace(/-/g, " ")
        .replace("Final No1", "Final Match")
        .replace(" No", " MatchNo ") +
      " of " +
      _desc;
  }
  const { currentUser } = context.uList;
  const { event } = Econtext.eList;
  const eventDef = event;
  const { setEList } = Econtext;
  const eventIDQ = event?.id;

  useEffect(() => {
    prop.onUpdateItem("eventIDQ", parseInt(params.id));

    //prop.onUpdateItem("matchIDQ", parseInt(matchIDQ));

    return () => {};
  }, []);
  useEffect(() => {
    prop.onUpdateItem("matchIDQ", parseInt(params.matchid));
  }, [params.matchid]);

  const match = prop.findStateId(myState, "match");
  const [visible, setVisible] = React.useState(false);
  const [messageBox, setMessageBox] = React.useState("");
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
  const deletUserConfirm = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete();
      }
    });
  };
  const handleDelete = () => {
    //userService.reScotr(eventIDQ).then(
    adminService.deleteEvent(eventIDQ).then(
      (response) => {
        history.push("/panel/dashboard");
        //window.location.replace("/panel/dashboard");
        //return <Redirect to="/panel/dashboard" />;
      },
      (error) => {
        console.log(error);
        Swal.fire({
          title: "Error",
          text: error.data,
          icon: "error",
          showCancelButton: false,
          confirmButtonText: `Ok`,
        });
      }
    );
  };
  const handleCount = () => {
    userService.reScotr(eventIDQ).then(
      //adminService.deleteEvent(eventIDQ).then(
      (response) => {
        //window.location.replace("/panel/dashboard");
        //return <Redirect to="/panel/dashboard" />;
      },
      (error) => {}
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
  var secSec = _arrTit[1];
  var secLink = "/game/" + _arrTit[1];
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
      key: _arrTit[1] + " " + _arrTit[0],
      content: _arrTit[1] + " " + _arrTit[0],
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
        key: _arrTit[0],
        content: _arrTit[0],
        link: true,
        as: Link,
        to: "/lobby/" + params.id + "/" + title + "",
      },
      {
        key: params.matchlevel
          .replace(/-/g, " ")
          .replace("Final No1", "Final Match")
          .replace(" No", " No "),
        content: params.matchlevel
          .replace(/-/g, " ")
          .replace("Final No1", "Final Match")
          .replace(" No", " No "),
        active: true,
      },
    ];
  }
  if (!eventDef || !currentUser || (!match && eventDef?.gameMode != "League")) {
    return (
      <>
        <Helmet>
          <title>{_tit}</title>
          <meta name="description" content={_desc} />
        </Helmet>
        <div
          className="full-page lock-page"
          data-color="black"
          style={{ height: "100%", overflow: "auto" }}
        >
          <Segment
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              background: "transparent",
            }}
          >
            <Container
              style={{
                top: "0",
                width: "100%",
                position: "relative",
                zIndex: 30000,
                color: "#fff",
              }}
            >
              <Breadcrumb icon="right angle" sections={sections} />
            </Container>
            <Dimmer active style={{ background: "transparent" }}>
              {eventDef?.status == "Deleted" ||
              (!match && eventDef?.gameMode != "League") ? (
                <>
                  {!match && eventDef?.gameMode != "League" && matchIDQ ? (
                    <>
                      {history.push("/lobby/" + params.id + "/" + title + "")}
                    </>
                  ) : (
                    <p>
                      <Icon name="recycle" color="red" size="huge" inverted />
                      <br />
                      Event deleted
                      <br />
                      <br />
                      {BackBTC()}
                    </p>
                  )}
                </>
              ) : (
                <Loader size="large">Loading</Loader>
              )}
            </Dimmer>
          </Segment>

          <div
            className="full-page-background"
            style={{
              backgroundImage: "url('/assets/img/bg.webp')",
            }}
          ></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{_tit}</title>
        <meta name="description" content={_desc} />
      </Helmet>
      <div
        className="full-page lock-page"
        data-color="black"
        data-image={"/assets/img/bg.webp"}
      >
        <div
          className="content "
          style={{
            color: "#fff",
            position: "relative",
            zIndex: "23",
            paddingTop: 0,
            overflow: "auto",
            height: "100vh",
          }}
        >
          <Suspense fallback={renderLoader(sections)}>
            <Sidebar.Pushable as={Segment} basic>
              <Sidebar
                animation="push"
                icon="labeled"
                width="thin"
                onHide={() => setVisible(false)}
                style={{
                  width: "100vw",
                  maxWidth: 300,
                  height: "100% !important",
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
                    messageBox={messageBox}
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
                        messageBox={messageBox}
                      />
                    ) : (
                      <Chatbar
                        eventID={eventIDQ}
                        matchID={matchIDQ}
                        eventstatus={eventDef.status}
                        masterplayer={eventDef.players}
                        secondplayer="null"
                        eventchats={eventDef.chats}
                        chats="null"
                        username={currentUser}
                        messageBox={messageBox}
                      />
                    )}
                  </>
                )}
              </Sidebar>

              <Sidebar.Pusher
                style={{ background: "none", padding: 0, height: "100%" }}
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
                          onClick={deletUserConfirm}
                        >
                          Delet Match
                        </Button>
                        {eventDef.gameMode == "League" && (
                          <Button
                            floated="right"
                            inverted
                            color="yellow"
                            onClick={handleCount}
                          >
                            Count
                          </Button>
                        )}
                      </>
                    )}
                    <Breadcrumb icon="right angle" sections={sections} />
                  </Col>
                </Container>
                <div style={{ height: "calc(100% - 90px)", overflow: "auto" }}>
                  <Container style={{ paddingBottom: 50 }}>
                    <div
                      className="text-center"
                      style={{ maxWidth: 493, margin: "0 auto 20px auto" }}
                    >
                      <Helpblog {...prop} game={eventDef.gameName} />
                    </div>
                    {eventDef.gameMode == "League" ? (
                      <LeagueSection
                        {...prop}
                        event={eventDef}
                        tit={_tit}
                        desc={_desc}
                      />
                    ) : (
                      <>
                        {eventDef.gameMode == "Tournament" && !matchIDQ ? (
                          <TournamentSection
                            {...prop}
                            event={eventDef}
                            tit={_tit}
                            desc={_desc}
                          />
                        ) : (
                          <>
                            {eventDef.gameMode == "Tournament" ? (
                              <MatchTourSection
                                {...prop}
                                event={eventDef}
                                matchIDQ={matchIDQ}
                                setVisible={setVisible}
                                tit={_tit}
                                desc={_desc}
                                setMessageBox={setMessageBox}
                              />
                            ) : (
                              <MatchSection
                                {...prop}
                                event={eventDef}
                                setVisible={setVisible}
                                setMessageBox={setMessageBox}
                              />
                            )}
                          </>
                        )}
                      </>
                    )}
                    <div
                      className="text-center"
                      style={{ maxWidth: 493, margin: "40px auto" }}
                    >
                      <Helpblog {...prop} game={eventDef.gameName} />
                    </div>
                  </Container>
                </div>
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </Suspense>
        </div>
        <div
          className="full-page-background"
          style={{
            backgroundImage: "url('/assets/img/bg.webp')",
          }}
        ></div>
      </div>
    </>
  );
}

export default LockScreenPage;
