import React, { useState, useEffect, useContext } from "react";
// react component used to create charts
// react components used to create a SVG / Vector map
import { getGroupBadgeBlock } from "components/include";
import {
  Icon,
  Message,
  Button,
  Header,
  Segment,
  Label,
} from "semantic-ui-react";
// react-bootstrap components
import CopyText from "components/copy.component";
import UserContext from "context/UserState";
function Invite(prop) {
  const context = useContext(UserContext);
  const { currentUser } = context.uList;
  if (!currentUser.accessToken) {
    return null;
  } else {
    return (
      <>
        <Message
          color="black"
          className="org"
          size="mini"
          style={{ textAlign: "left" }}
        >
          <p>
            Share your unique invite link to your friends and get %10
            commission:
          </p>
          <div style={{ fontSize: "20px", paddingBottom: 8 }}>
            <CopyText myid={"https://loole.gg/i/" + currentUser.username} />
          </div>
        </Message>
      </>
    );
  }
}
export default Invite;
