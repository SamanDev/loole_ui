import React, { useContext } from "react";
import { Card, Statistic, Icon, Grid, Popup, Divider } from "semantic-ui-react";
import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";
import UserContext from "context/UserState";
const DashStat = (prop) => {
  const context = useContext(UserContext);
  const { currentUser } = context.uList;

  var nAmount = Number.parseFloat(currentUser.point).toFixed(0);
  var nMatch = Number.parseFloat(currentUser.totalMatch).toFixed(0);
  var nWin = Number.parseFloat(currentUser.totalWin).toFixed(0);
  var nBalance = Number.parseFloat(currentUser.balance).toFixed(2);
  currentUser.userAnalyses?.sort((a, b) => (a.id < b.id ? 1 : -1));
  var nProfit = 0;
  try {
    nProfit = Number.parseFloat(currentUser.profit).toFixed(2);
  } catch (e) {
    nProfit = 0;
  }

  return (
    <>
      <Grid className="dash-stat">
        <Grid.Column mobile={8} tablet={8} computer={4} className="frsrow">
          <Popup
            content="Go to Cashier"
            inverted
            trigger={
              <Card as={Link} to={"/panel/cashier"} fluid color="red">
                <div className="content extra">
                  <Grid columns={2} divided>
                    <Grid.Column style={{ textAlign: "right", width: "auto" }}>
                      <Icon
                        name="dollar"
                        size="large"
                        circular
                        inverted
                        color="red"
                      />
                    </Grid.Column>
                    <Grid.Column>
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

        <Grid.Column mobile={8} tablet={8} computer={4} className="frsrow">
          <Popup
            content="Go to Rewards"
            inverted
            trigger={
              <Card as={Link} to={"/panel/rewards"} fluid color="teal">
                <div className="content extra">
                  <Grid columns={2} divided>
                    <Grid.Column style={{ textAlign: "right", width: "auto" }}>
                      <Icon
                        name="diamond"
                        size="large"
                        circular
                        inverted
                        color="teal"
                      />
                    </Grid.Column>
                    <Grid.Column>
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
        <Grid.Column mobile={8} tablet={8} computer={4} className="secrow">
          <Popup
            content="Create a Match"
            inverted
            trigger={
              <Card
                onClick={() => prop.onUpdateItem("openModalAdd", true)}
                fluid
                color="orange"
              >
                <div className="content extra">
                  <Grid columns={2} divided>
                    <Grid.Column style={{ textAlign: "right", width: "auto" }}>
                      <Icon
                        name="asl"
                        size="large"
                        circular
                        inverted
                        color="orange"
                      />
                    </Grid.Column>
                    <Grid.Column>
                      <Statistic size="mini">
                        <Statistic.Value>
                          <CurrencyFormat
                            value={nWin}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={""}
                            renderText={(value) => value}
                          />{" "}
                          /{" "}
                          <CurrencyFormat
                            value={nMatch}
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
        <Grid.Column mobile={8} tablet={8} computer={4} className="secrow">
          <Popup
            content="Open Profit Chart"
            inverted
            trigger={
              <Card
                fluid
                color="black"
                onClick={() => prop.onUpdateItem("openModalChart", true)}
              >
                <div className="content extra">
                  <Grid columns={2} divided>
                    <Grid.Column style={{ textAlign: "right", width: "auto" }}>
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
                          <CurrencyFormat
                            value={nProfit}
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
      <Divider fitted hidden style={{ margin: 5 }} />
    </>
  );
};
export default DashStat;
