import React, { useEffect, useState, useContext } from "react";

import Active from "components/active.component";
import AdminDeposit from "views/AdminDeposit.js";
import AdminCashout from "views/AdminCashout.js";
import CostList from "components/CostList.component";
import GetwaysList from "components/GetwaysList.component";
import SocialForm from "components/profile/social.component";
import UserEvents from "components/events/user.component";
import Report from "components/report.component";

import ReportDiamond from "components/reportdiamond.component";
import { Helmet } from "react-helmet";
// react-bootstrap components

import { Tab, Segment, Dimmer, Divider } from "semantic-ui-react";
import UserContext from "context/UserState";
function profile(prop) {
  const [myState, setMyState] = useState(prop.myState);
  useEffect(() => {
    setMyState(prop.myState);
  }, [prop.myState]);
  const key = prop.findStateId(myState, "keyProfile");
  const context = useContext(UserContext);
  const { currentUser } = context.uList;

  var dataTransaction = currentUser.usersReports;
  const panes = [
    {
      id: 1,
      menuItem: "Deposit",
      render: () => (
        <Tab.Pane>
          <Segment secondary padded>
            <AdminDeposit {...prop} />
          </Segment>
        </Tab.Pane>
      ),
    },
    {
      id: 2,
      menuItem: "Cashout",
      render: () => (
        <Tab.Pane>
          <Segment secondary padded>
            <AdminCashout {...prop} />
          </Segment>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Active {...prop} />

      <Tab
        panes={panes}
        className="maxheight"
        defaultActiveIndex={key}
        onTabChange={(e, data) => {
          prop.onUpdateItem("keyProfile", data.activeIndex);
        }}
      />
    </>
  );
}

export default profile;
