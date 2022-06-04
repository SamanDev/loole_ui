import React, { useEffect, useState } from "react";
import { Segment, Sidebar, Dimmer } from "semantic-ui-react";
import { getQueryVariable, isPlayerInMatch } from "components/include.js";
import TransitionExampleTransitionExplorer from "components/anim.component";
import { useParams } from "react-router";
const ReadySection = (prop) => {
  const [objanim, setObjanim] = useState(prop.objanim);
  const [visible, setVisible] = useState(prop.visible);
  const [isUser, setIsUser] = useState(prop.isUser);
  const [user, setUser] = useState(prop.user);
  const [objanimInfo, setObjanimInfo] = useState(prop.info);
  const [player, setPlayer] = useState(prop.player);
  const [matchidFind, setMatchidFind] = useState(prop.matchidFind);
  const [isChecked, setIsChecked] = useState(prop.ischeck);
  const params = useParams();

  const matchIDQ = params.matchid;
  useEffect(() => {
    setPlayer(prop.player);
  }, [prop.player]);
  useEffect(() => {
    setIsChecked(prop.ischeck);
  }, [prop.ischeck]);
  useEffect(() => {
    setVisible(prop.visible);
  }, [prop.visible]);
  useEffect(() => {
    setObjanim(prop.objanim);
  }, [prop.objanim]);
  useEffect(() => {
    setObjanimInfo(prop.info);
  }, [prop.info]);
  useEffect(() => {
    setIsUser(prop.isUser);
  }, [prop.isUser]);
  useEffect(() => {
    setUser(prop.user);
  }, [prop.user]);
  if (prop.item.gameMode == "Tournament" && visible && !matchIDQ) {
    setVisible(false);
  }
  var padd = "200px";

  //if(matchidFind.status == "Pending" && item.gameMode == 'Tournament') {padd = padd + 50}
  if (prop.item.gameMode == "Tournament" && !matchIDQ) {
    padd = "100px";
  }

  return (
    <Sidebar.Pushable as={Segment} basic style={{ overflow: "hidden" }}>
      <Sidebar
        animation="scale down"
        inverted
        vertical
        direction="bottom"
        visible={visible}
        width="thin"
        as={Segment}
        basic
      >
        {visible && (
          <div
            style={{
              padding: "10px 0",
              margin: "auto",
              position: "relative",
              zIndex: 10,
            }}
          >
            {prop.matchidFind.status == "Ready" && (
              <>
                {isUser.username == player.username && !isChecked ? (
                  <TransitionExampleTransitionExplorer
                    objanim={objanim}
                    animation="flash"
                    duration={1000}
                  />
                ) : (
                  <div>{objanim}</div>
                )}
              </>
            )}
            {(prop.matchidFind.status == "InPlay" ||
              (prop.item.gameMode == "Tournament" &&
                prop.matchidFind.status == "Pending")) && (
              <>
                {isUser.username == player.username ||
                !isPlayerInMatch(matchidFind, isUser.username) ? (
                  <div>{objanimInfo}</div>
                ) : (
                  <TransitionExampleTransitionExplorer
                    objanim={objanimInfo}
                    animation="flash"
                    duration={1000}
                  />
                )}
              </>
            )}
          </div>
        )}
      </Sidebar>

      <Sidebar.Pusher style={{ minHeight: padd }}>
        <Dimmer
          active
          inverted
          className="cover"
          style={{ background: "none" }}
        >
          {user}
        </Dimmer>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default ReadySection;
