import React, { useState, useEffect } from "react";
import {
  Card,
  Statistic,
  Icon,
  Grid,
  Popup,
  Modal,
  Button,
  Segment,Divider
} from "semantic-ui-react";
import CurrencyFormat from "react-currency-format";
import { Link, useLocation } from "react-router-dom";
import AddMatch from "components/add/addmatch.component";

const DashStat = (prop) => {
  const [myState, setMyState] = useState(prop.myState);
  useEffect(() => {
    setMyState(prop.myState);
  }, [prop.myState]);
  const currentUser = prop.findStateId(myState, "currentUser");

  var nAmount = Number.parseFloat(currentUser.point).toFixed(0);
  var nBalance = Number.parseFloat(currentUser.balance).toFixed(2);
  return (
    <>
      <Grid className="dash-stat">
        <Grid.Column mobile={8} tablet={8} computer={4}>
          <Popup
            content="Go to Cashier"
            inverted
            trigger={
              <Card as={Link}  to={"/panel/cashier"} fluid color="red">
                <div className="content extra">
                  <Grid columns={2} divided>
                    <Grid.Column  style={{ textAlign: "right" ,width:'auto'}}>
                      <Icon
                        name="dollar"
                        size="large"
                        circular
                        inverted
                        color="red"
                      />
                    </Grid.Column>
                    <Grid.Column >
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
            }
          />
        </Grid.Column>

        <Grid.Column mobile={8} tablet={8} computer={4}>
          <Popup
            content="Go to Rewards"
            inverted
            trigger={
              <Card as={Link} to={"/panel/rewards"} fluid color="teal">
                <div className="content extra">
                  <Grid columns={2} divided>
                    <Grid.Column  style={{ textAlign: "right",width:'auto' }}>
                      <Icon
                        name="diamond"
                        size="large"
                        circular
                        inverted
                        color="teal"
                      />
                    </Grid.Column>
                    <Grid.Column >
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
            }
          />
        </Grid.Column>
        <Grid.Column mobile={8} tablet={8} computer={4}>
        <Popup
          content="Create a Match"
          inverted
          trigger={
            <Card
             
              onClick={() => prop.onUpdateItem("openModalAdd", true)}
              fluid color="orange"
            >
              <div className="content extra">
                <Grid columns={2} divided>
                  <Grid.Column  style={{ textAlign: "right",width:'auto' }}>
                    <Icon
                      name="asl"
                      size="large"
                      circular
                      inverted
                      color="orange"
                    />
                  </Grid.Column>
                  <Grid.Column  >
                    <Statistic size="mini">
                      <Statistic.Value>
                        <CurrencyFormat
                          value={2}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={""}
                          renderText={(value) => value}
                        />{" "}
                        /{" "}
                        <CurrencyFormat
                          value={18}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={""}
                          renderText={(value) => value}
                        />
                      </Statistic.Value>
                      <Statistic.Label>Win/Match</Statistic.Label>
                    </Statistic>
                  </Grid.Column>
                </Grid>
              </div>
            </Card>
          }
        />
        </Grid.Column>
        <Grid.Column mobile={8} tablet={8} computer={4}>
        <Popup
          content="Go to Rewards"
          inverted
          trigger={
            <Card   fluid color="black">
              <div className="content extra">
                <Grid columns={2} divided>
                  <Grid.Column  style={{ textAlign: "right",width:'auto' }}>
                    <Icon
                      name="chart line"
                      size="large"
                      circular
                      inverted
                      color="black"
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Statistic size="mini">
                      <Statistic.Value>
                        +
                        <CurrencyFormat
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
          }
        />
        </Grid.Column>
      </Grid>
      <Divider  hidden/>
    </>
  );
};
export default DashStat;
