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
function Dashboard(prop) {
  const context = useContext(UserContext);
  const { currentUser } = context.uList;

  return (
    <>
      <Segment secondary>
        <Header as="h2">
          <Icon.Group className="icon" size="big">
            <Icon name="dollar" />
            <Icon corner="top right" color="red" name="add" />
          </Icon.Group>
          <Header.Content>
            Earn Cash
            <Header.Subheader>
              Earn Cash by invite your friends
            </Header.Subheader>
          </Header.Content>
        </Header>

        <Message icon style={{ lineHeight: "30px" }}>
          <Icon
            name="add user"
            circular
            inverted
            color="red"
            className="mobile hidden"
          />
          <Message.Content>
            <Message.Header>Invite A Friend</Message.Header>
            <div style={{ margin: "10px 0" }}>
              When a friend you have invited plays their first challenge you
              will receive {getGroupBadgeBlock("Point", 1000, "")}
              and they will receive{" "}
              {getGroupBadgeBlock("Point", 500, "small left")}. Then for every
              challenge they play on the site you get an extra{" "}
              {getGroupBadgeBlock("Point", 20, "small left")} per game they play
              for life.
            </div>
            <div style={{ margin: "10px 0" }}>
              And also yu get{" "}
              <Label color="blue" basic size="small">
                <Icon name="percent" />
                10 Comissions
              </Label>{" "}
              for{" "}
              <Label color="red" basic size="small">
                <Icon name="dollar" />
                Real Money Event
              </Label>{" "}
              for life.
            </div>
            <Message attached="bottom" warning>
              <Message.Header>Share your unique invite link:</Message.Header>
              <div>
                <CopyText
                  size="large"
                  myid={"https://loole.gg/i/" + currentUser.username}
                />
              </div>
            </Message>

            <Button
              size="small"
              fluid
              color="red"
              content="VIEW DETAILED EARNINGS"
              onClick={() => prop.onUpdateItem("keyReward", 1)}
            />
          </Message.Content>
        </Message>
        <Header as="h2">
          <Icon.Group className="icon" size="big">
            <Icon name="diamond" />
            <Icon corner="top right" color="teal" name="add" />
          </Icon.Group>
          <Header.Content>
            Free Diamonds
            <Header.Subheader>Earn Free Diamonds!</Header.Subheader>
          </Header.Content>
        </Header>

        <Message icon style={{ lineHeight: "30px" }}>
          <Icon
            name="diamond"
            circular
            inverted
            color="teal"
            className="mobile hidden"
          />
          <Message.Content>
            <Message.Header>Earn Free Diamonds!</Message.Header>
            <p style={{ margin: "10px 0" }}>
              Maximise your daily earning by taking advantage of loole.gg's
              bonuses and start earning free Diamonds every day. You can earn
              Diamonds by logging in, playing games, inviting friends and many
              other ways. Then all you have to do is go to the market place and
              spend your spare Diamonds on plenty of great things. It's that
              simple!
            </p>
            <Message icon>
              <Message.Content>
                <Message.Header>Daily Rewards</Message.Header>
                <p>
                  Maximize your profits and earn big daily at loole.gg. By
                  simply logging in, you can earn big!
                </p>
                <Message.List>
                  <Message.Item>
                    Daily Login {getGroupBadgeBlock("Point", 20, "small left")}
                  </Message.Item>
                  <Message.Item>
                    Compete in a Diamonds Event{" "}
                    {getGroupBadgeBlock("Point", 20, "small left")}
                  </Message.Item>
                  <Message.Item>
                    Compete in a real money Event{" "}
                    {getGroupBadgeBlock("Point", 100, "small left")}
                  </Message.Item>
                </Message.List>
              </Message.Content>
            </Message>
            <Button
              size="small"
              fluid
              color="teal"
              content="VIEW DETAILED EARNINGS"
              onClick={() => prop.onUpdateItem("keyReward", 1)}
            />
          </Message.Content>
        </Message>
      </Segment>
    </>
  );
}

export default Dashboard;
