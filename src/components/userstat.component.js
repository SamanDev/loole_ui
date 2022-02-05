import React, { useState, useEffect, useContext } from "react";
import { Card, Statistic, Icon, Grid, Divider } from "semantic-ui-react";
import CurrencyFormat from "react-currency-format";
import GlobalContext from "context/GlobalState";
const UserStat = (prop) => {
  const [myState, setMyState] = useState(prop.myState);
  useEffect(() => {
    setMyState(prop.myState);
  }, [prop.myState]);
  var _key = prop.findStateId(myState, "profileUser");
  if (!_key) {
    const context = useContext(GlobalContext);

    _key = context.myList.currentUser;
  }
  const currentUser = _key;

  var nMatch = Number.parseFloat(currentUser.totalMatch).toFixed(0);
  var nWin = Number.parseFloat(currentUser.totalWin).toFixed(0);
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
        <Grid.Column mobile={8} tablet={8} computer={8}>
          <Card
            onClick={() => prop.scrollTo("userlastactivity")}
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
        </Grid.Column>
        <Grid.Column mobile={8} tablet={8} computer={8}>
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
        </Grid.Column>
      </Grid>
      <Divider hidden />
    </>
  );
};
export default UserStat;
