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
  var nMatch = Number.parseFloat(currentUser.totalMatch).toFixed(0);
  var nWin = Number.parseFloat(currentUser.totalWin).toFixed(0);
  var nBalance = Number.parseFloat(currentUser.balance).toFixed(2);
  currentUser.userAnalyses?.sort((a, b) => (a.id < b.id) ? 1 : -1)
  var nProfit = 0
  try{
    nProfit = Number.parseFloat(currentUser.userAnalyses[0].profit).toFixed(2);
  }catch(e){
    nProfit = 0
  }
   
  return (
    <>
      <Grid className="dash-stat home-stat">
        <Grid.Column mobile={8} tablet={8} computer={4}>
       <Card fluid color="red">
                <div className="content extra">
                  
                      <Statistic size="mini">
                        <Statistic.Value>
                          <CurrencyFormat
                            value={1233}
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
                            value={nAmount}
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
       
            <Card
             
              fluid color="orange"
            >
              <div className="content extra">
                
                    <Statistic size="mini">
                      <Statistic.Value>$
                        <CurrencyFormat
                          value={1001669}
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
       <Card   fluid color="black">
              <div className="content extra">
               
                    <Statistic size="mini">
                      <Statistic.Value className="text-center">
                        $
                        <CurrencyFormat
                          value={nProfit}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={""}
                          renderText={(value) => value}
                        />
                      </Statistic.Value>
                      <Statistic.Label className="text-center">Commissions Paid</Statistic.Label>
                    </Statistic>
               
              </div>
            </Card>
          
        </Grid.Column>
      </Grid>
      <Divider  hidden/>
      
    </>
  );
};
export default DashStat;
