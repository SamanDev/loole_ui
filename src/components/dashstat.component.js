import React, { useState, useEffect } from "react";
import { Card, Statistic, Icon, Grid,Popup } from "semantic-ui-react";
import CurrencyFormat from "react-currency-format";
import { Link, useLocation } from "react-router-dom";
const DashStat = (prop) => {
    const [myState, setMyState] = useState(prop.myState)
    useEffect(() => {
      setMyState(prop.myState)
  }, [prop.myState]);
  const currentUser = prop.findStateId(myState,'currentUser');
  

  var nAmount = Number.parseFloat(currentUser.point).toFixed(0);
  var nBalance = Number.parseFloat(currentUser.balance).toFixed(2);
  return (
    <Card.Group style={{ marginBottom: 20 }} className="dash-stat">
        <Popup content='Go to Cashier' inverted trigger={
      <Card as={Link} to={"/panel/cashier"}>
        <div className="content extra">
          <Grid columns={2} divided>
            <Grid.Column width={4} style={{ textAlign: "right" }}>
              <Icon name="dollar" size="large" circular inverted color="red" />
            </Grid.Column>
            <Grid.Column  width={12} >
              <Statistic size="mini">
                <Statistic.Value>
                  <CurrencyFormat
                    value={nBalance}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={""}
                    renderText={(value) => value}
                  />
                </Statistic.Value>
                <Statistic.Label>Balance</Statistic.Label>
              </Statistic>
            </Grid.Column>
          </Grid>
        </div>
      </Card>
      } />
      <Popup content='Go to Rewards' inverted trigger={
      <Card as={Link} to={"/panel/rewards"}>

        <div className="content extra">
          <Grid columns={2} divided>
            <Grid.Column width={4} style={{ textAlign: "right" }}>
              <Icon
                name="diamond"
                size="large"
                circular
                inverted
                color="teal"
              />
            </Grid.Column>
            <Grid.Column  width={12}>
              <Statistic size="mini">
                <Statistic.Value>
                  <CurrencyFormat
                    value={nAmount}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={""}
                    renderText={(value) => value}
                  />
                </Statistic.Value>
                <Statistic.Label>Diamonds</Statistic.Label>
              </Statistic>
            </Grid.Column>
          </Grid>
        </div>
        </Card>
      } />
      <Popup content='Create a Match' inverted trigger={
      <Card as={Link} to={"/panel/create"}>
        <div className="content extra">
          <Grid columns={2} divided>
            <Grid.Column width={4} style={{ textAlign: "right" }}>
              <Icon
                name="asl"
                size="large"
                circular
                inverted
                color="pink"
              />
            </Grid.Column>
            <Grid.Column width={12}>
              <Statistic size="mini">
                <Statistic.Value>
                <CurrencyFormat
                    value={2}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={""}
                    renderText={(value) => value}
                  /> / <CurrencyFormat
                    value={18}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={""}
                    renderText={(value) => value}
                  />
                </Statistic.Value>
                <Statistic.Label>win / Match</Statistic.Label>
              </Statistic>
            </Grid.Column>
          </Grid>
        </div>
        </Card>
      } />
      <Popup content='Go to Rewards' inverted trigger={
      <Card as={Link} to={"/panel/create"}>
      <div className="content extra">
        <Grid columns={2} divided>
          <Grid.Column width={4} style={{ textAlign: "right" }}>
            <Icon
              name="chart line"
              size="large"
              circular
              inverted
              color="black"
            />
          </Grid.Column>
          <Grid.Column width={12}>
            <Statistic size="mini">
              <Statistic.Value>
              +<CurrencyFormat
                  value={1120}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={""}
                  renderText={(value) => value}
                />
              </Statistic.Value>
              <Statistic.Label>Profit</Statistic.Label>
            </Statistic>
          </Grid.Column>
        </Grid>
      </div>
      </Card>
      } />
    </Card.Group>
  );
};
export default DashStat;
