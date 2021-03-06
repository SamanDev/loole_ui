import React, { useEffect, useState, useContext } from "react";

import Active from "components/active.component";
import AdminDeposit from "views/AdminDeposit.js";
import AdminCashout from "views/AdminCashout.js";
import AdminPDeposit from "views/AdminPaparaDeposit.js";
import AdminPCashout from "views/AdminPaparaCashout.js";
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
      menuItem: "All Deposit",
      render: () => (
        <Tab.Pane>
          <Segment secondary padded>
            <AdminDeposit {...prop} mode="getDeposit" />
          </Segment>
        </Tab.Pane>
      ),
    },
    {
      id: 2,
      menuItem: "All Cashout ",
      render: () => (
        <Tab.Pane>
          <Segment secondary padded>
            <AdminDeposit {...prop} mode="getCashout" />
          </Segment>
        </Tab.Pane>
      ),
    },
    {
      id: 3,
      menuItem: "Papara Deposit",
      render: () => (
        <Tab.Pane>
          <Segment secondary padded>
            <AdminPDeposit {...prop} />
          </Segment>
        </Tab.Pane>
      ),
    },
    {
      id: 4,
      menuItem: "Papara Cashout",
      render: () => (
        <Tab.Pane>
          <Segment secondary padded>
            <AdminPCashout {...prop} />
          </Segment>
        </Tab.Pane>
      ),
    },
    {
      id: 5,
      menuItem: "Admin Deposit",
      render: () => (
        <Tab.Pane>
          <Segment secondary padded>
            <AdminCashout {...prop} mode="getAdminDeposit" />
          </Segment>
        </Tab.Pane>
      ),
    },
    {
      id: 6,
      menuItem: "Admin Cashout ",
      render: () => (
        <Tab.Pane>
          <Segment secondary padded>
            <AdminCashout {...prop} mode="getAdminCashout" />
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
