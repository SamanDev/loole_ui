import React, { useState, useEffect, useContext } from "react";
// react component used to create charts
// react components used to create a SVG / Vector map
import { getGroupBadgeBlock } from "components/include";
import { Icon, Message, Button } from "semantic-ui-react";
// react-bootstrap components
import CopyText from "components/copy.component";
import UserContext from "context/UserState";
function Dashboard(prop) {
  const context = useContext(UserContext);
  const { currentUser } = context.uList;

  return (
    <>
      <Message icon>
        <Icon
          name="diamond"
          circular
          inverted
          color="teal"
          className="mobile hidden"
        />
        <Message.Content>
          <Message.Header>Earn Free Diamonds!</Message.Header>
          <p>
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
                Maximize your profits and earn big daily at loole.gg. By simply
                logging in, you can earn big!
              </p>
              <Message.List>
                <Message.Item>
                  Compete in a Diamonds tournament{" "}
                  {getGroupBadgeBlock("Point", 20, "small left")}
                </Message.Item>
                <Message.Item>
                  Compete in a real money tournament{" "}
                  {getGroupBadgeBlock("Point", 100, "small left")}
                </Message.Item>
              </Message.List>
            </Message.Content>
          </Message>
        </Message.Content>
      </Message>
      <Message icon>
        <Icon
          name="add user"
          circular
          inverted
          color="blue"
          className="mobile hidden"
        />
        <Message.Content>
          <Message.Header>Invite A Friend</Message.Header>
          <div>
            When a friend you have invited plays their first challenge you will
            receive {getGroupBadgeBlock("Point", 1000, "")}
            and they will receive{" "}
            {getGroupBadgeBlock("Point", 500, "small left")}. Then for every
            challenge they play on the site you get an extra{" "}
            {getGroupBadgeBlock("Point", 20, "small left")} per game they play
            for life.
          </div>
          <p></p>
          <Message attached="bottom" warning>
            <Message.Header>Share your unique invite link:</Message.Header>
            <div>
              <CopyText
                color="red"
                size="small"
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
    </>
  );
}

export default Dashboard;
