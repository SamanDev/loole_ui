import React, { useEffect, useState, useContext } from "react";

import Active from "components/active.component";

import ProfileForm from "components/profile/profile.component";
import TagsForm from "components/profile/tags.component";
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
      menuItem: "Profile",
      render: () => (
        <Tab.Pane>
          <Segment secondary padded>
            <ProfileForm {...prop} />
          </Segment>
        </Tab.Pane>
      ),
    },
    {
      id: 2,
      menuItem: "Tags",
      render: () => (
        <Tab.Pane>
          <Segment secondary padded>
            <TagsForm {...prop} />

            <SocialForm {...prop} />
          </Segment>
        </Tab.Pane>
      ),
    },
    {
      id: 3,
      menuItem: "My Events",
      render: () => (
        <Tab.Pane>
          <Segment secondary padded>
            <UserEvents {...prop} />
          </Segment>
        </Tab.Pane>
      ),
    },
    {
      id: 4,
      menuItem: "Transactions",
      render: () => (
        <Tab.Pane>
          <Segment secondary padded>
            <Report user={currentUser} />
          </Segment>
        </Tab.Pane>
      ),
    },
    {
      id: 5,
      menuItem: "Diamonds",
      render: () => (
        <Tab.Pane>
          <Segment secondary padded>
            <ReportDiamond user={currentUser} />
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
