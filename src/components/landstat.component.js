import React, { useState, useEffect } from "react";
import { Card, Statistic, Grid, Divider } from "semantic-ui-react";
import CurrencyFormat from "react-currency-format";

const DashStat = (prop) => {
  const [myState, setMyState] = useState(prop.myState);
  useEffect(() => {
    setMyState(prop.myState);
  }, [prop.myState]);
  const looleInfo = prop.findStateId(myState, "looleInfo");

  var _user = Number.parseFloat(looleInfo.totalUser).toFixed(0);
  var _match = Number.parseFloat(looleInfo.totalMatch).toFixed(0);
  var _bank = Number.parseFloat(looleInfo.totalBank).toFixed(2);
  var _com = Number.parseFloat(looleInfo.totalCommission).toFixed(2);

  return (
    <>
      <Grid className="dash-stat home-stat">
        <Grid.Column mobile={8} tablet={8} computer={4}>
          <Card fluid color="red">
            <div className="content extra">
              <Statistic size="mini">
                <Statistic.Value>
                  <CurrencyFormat
                    value={_user}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={""}
                    renderText={(value) => value}
                  />
                </Statistic.Value>
                <Statistic.Label>Happy Users</Statistic.Label>
              </Statistic>
            </div>
          </Card>
        </Grid.Column>

        <Grid.Column mobile={8} tablet={8} computer={4}>
          <Card fluid color="teal">
            <div className="content extra">
              <Statistic size="mini">
                <Statistic.Value>
                  <CurrencyFormat
                    value={_match}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={""}
                    renderText={(value) => value}
                  />
                </Statistic.Value>
                <Statistic.Label>Total Matches</Statistic.Label>
              </Statistic>
            </div>
          </Card>
        </Grid.Column>
        <Grid.Column mobile={8} tablet={8} computer={4}>
          <Card fluid color="orange">
            <div className="content extra">
              <Statistic size="mini">
                <Statistic.Value>
                  $
                  <CurrencyFormat
                    value={_bank}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={""}
                    renderText={(value) => value}
                  />
                </Statistic.Value>
                <Statistic.Label>Loole Bank</Statistic.Label>
              </Statistic>
            </div>
          </Card>
        </Grid.Column>
        <Grid.Column mobile={8} tablet={8} computer={4}>
          <Card fluid color="black">
            <div className="content extra">
              <Statistic size="mini">
                <Statistic.Value className="text-center">
                  $
                  <CurrencyFormat
                    value={_com}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={""}
                    renderText={(value) => value}
                  />
                </Statistic.Value>
                <Statistic.Label className="text-center">
                  Commissions Paid
                </Statistic.Label>
              </Statistic>
            </div>
          </Card>
        </Grid.Column>
      </Grid>
      <Divider hidden />
    </>
  );
};
export default DashStat;
