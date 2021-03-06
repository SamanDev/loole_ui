import React, { useEffect, useState, useContext } from "react";

import Active from "components/active.component";

import Rewards from "components/Rewards.component";
import Report from "components/reportdiamondUser.component";
import ReportCom from "components/reportcommition.component";
// react-bootstrap components
import UserContext from "context/UserState";
import { Tab, Segment } from "semantic-ui-react";

import DashStat from "components/dashstat.component";
import { Helmet } from "react-helmet";
function profile(prop) {
  const [myState, setMyState] = useState(prop.myState);
  useEffect(() => {
    setMyState(prop.myState);
  }, [prop.myState]);
  var key = prop.findStateId(myState, "keyReward");
  const context = useContext(UserContext);
  const { currentUser } = context.uList;

  const panes = [
    {
      id: 1,
      menuItem: "Rewards",
      render: () => (
        <Tab.Pane>
          <Rewards {...prop} />
        </Tab.Pane>
      ),
    },

    {
      id: 2,
      menuItem: "My Earns",
      render: () => (
        <Tab.Pane>
          <Segment secondary>
            <Report user={currentUser} />
          </Segment>
        </Tab.Pane>
      ),
    },
    {
      id: 3,
      menuItem: "Commitions",
      render: () => (
        <Tab.Pane>
          <Segment secondary>
            <ReportCom user={currentUser} />
          </Segment>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Rewards</title>
      </Helmet>
      <Active {...prop} />
      <DashStat {...prop} />
      <Tab
        panes={panes}
        className="maxheight dash"
        activeIndex={key}
        onTabChange={(e, data) => {
          prop.onUpdateItem("keyReward", data.activeIndex);
        }}
      />
    </>
  );
}

export default profile;
