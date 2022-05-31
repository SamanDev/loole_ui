import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import {
  Tab,
  Menu,
  Segment,
  Header,
  Icon,
  Statistic,
  Card,
} from "semantic-ui-react";

import { useAllCoins } from "services/hooks";
import Active from "components/active.component";
import Report from "components/reportUser.component";
import ReportDiamond from "components/reportdiamondUser.component";

import DashStat from "components/dashstat.component";
// react-bootstrap components
import UserContext from "context/UserState";
import { Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
function Cashier(prop) {
  const [myState, setMyState] = useState(prop.myState);

  useEffect(() => {
    setMyState(prop.myState);
  }, [prop.myState]);
  const context = useContext(UserContext);
  const { currentUser } = context.uList;
  const { data: eventCoins } = useAllCoins();
  var key = prop.findStateId(myState, "keyCashier");
  var userMethods = currentUser.cashierGateways;

  userMethods = userMethods.filter(
    (li, idx, self) => self.map((itm) => itm.mode).indexOf(li.mode) === idx
  );
  userMethods.sort((a, b) => (a.mode > b.mode ? 1 : -1));
  useEffect(() => {
    prop.onUpdateItem("coins", eventCoins);
  }, [eventCoins]);

  const handleMethod = (method) => {
    prop.onUpdateItem("cashierMethod", method);
    prop.onUpdateItem("openModalCashier", true);
  };
  const _block = (cashierGateway, mode) => {
    var _img = "btc.svg";
    var _limit = "Unlimited";
    if (cashierGateway.mode == "PerfectMoney") {
      _img = "pm.svg";
    }
    if (cashierGateway.mode == "IranShetab") {
      _img = "iran.png";
      _limit = "Max: $100";
    }
    if (cashierGateway.mode == "VisaGiftCode") {
      _img = "iran.png";
      _limit = "Max: $300";
    }
    return (
      <div>
        <div className="img">
          <img
            alt={cashierGateway.mode}
            style={{ maxHeight: 50 }}
            src={"/assets/images/" + _img}
          ></img>
        </div>
        <Statistic
          size="mini"
          color={mode != "Deposit" ? "red" : "green"}
          style={{
            marginTop: 0,
            opacity: 0.7,
            padding: 20,
            lineHeight: "40px",
          }}
        >
          <Statistic.Value>{cashierGateway.mode}</Statistic.Value>
          <Statistic.Label>{_limit}</Statistic.Label>
        </Statistic>
      </div>
    );
  };
  const panes = [
    {
      id: 1,
      menuItem: "Deposit",
      render: () => (
        <Tab.Pane>
          <Segment secondary>
            <Header as="h2">
              <Icon.Group className="icon" size="big">
                <Icon name="dollar" />
                <Icon corner="top right" color="red" name="add" />
              </Icon.Group>
              <Header.Content>
                Deposit Cash
                <Header.Subheader>Add cash to your Account</Header.Subheader>
              </Header.Content>
            </Header>
            <Segment>
              <Header>Select your Deposit method</Header>

              <Card.Group
                className="fours card-tags cash-card"
                itemsPerRow="4"
                doubling
                stackable
                style={{ marginBottom: 20, textAlign: "left" }}
              >
                {userMethods.map(function (cashierGateway, u) {
                  if (cashierGateway.name != "Digipay" || 1 == 1) {
                    return (
                      <Card
                        fluid
                        color={"green"}
                        onClick={() =>
                          handleMethod(cashierGateway.mode + "Deposit")
                        }
                        key={u}
                      >
                        {_block(cashierGateway, "Deposit")}
                      </Card>
                    );
                  }
                })}
              </Card.Group>
            </Segment>
          </Segment>
        </Tab.Pane>
      ),
    },
    {
      id: 2,
      menuItem: "Withdrawal",
      render: () => (
        <Tab.Pane>
          <Segment secondary>
            <Header as="h2">
              <Icon.Group className="icon" size="big">
                <Icon name="dollar" />
                <Icon corner="bottom right" color="green" name="share" />
              </Icon.Group>
              <Header.Content>
                Withdrawal
                <Header.Subheader>
                  Withdraw Cash from your account
                </Header.Subheader>
              </Header.Content>
            </Header>
            <Segment>
              <Header>Select your Cashout method</Header>
              <Card.Group
                className="fours card-tags cash-card"
                doubling
                stackable
                itemsPerRow="4"
                style={{ marginBottom: 20, textAlign: "left" }}
              >
                {userMethods.map(function (cashierGateway, u) {
                  if (
                    (cashierGateway.name != "VisaGiftCode" &&
                      cashierGateway.mode != "IranShetab") ||
                    (cashierGateway.mode == "IranShetab" &&
                      currentUser.bankInfos.length > 0)
                  ) {
                    return (
                      <Card
                        fluid
                        color={"red"}
                        onClick={() =>
                          handleMethod(cashierGateway.mode + "Cashout")
                        }
                        key={u}
                      >
                        {_block(cashierGateway, "Cashout")}
                      </Card>
                    );
                  }
                })}
              </Card.Group>
            </Segment>
          </Segment>
        </Tab.Pane>
      ),
    },
    {
      id: 3,
      menuItem: "Transactions",
      render: () => (
        <Tab.Pane>
          <Segment secondary>
            <Report user={currentUser} />
          </Segment>
        </Tab.Pane>
      ),
    },
    {
      id: 4,
      menuItem: "Diamonds",
      render: () => (
        <Tab.Pane>
          <Segment secondary>
            <ReportDiamond user={currentUser} />
          </Segment>
        </Tab.Pane>
      ),
    },
  ];
  //if (typeof _title === "undefined") return null;
  return (
    <>
      <Helmet>
        <title>Cashier</title>
      </Helmet>
      <Active {...prop} />
      <DashStat {...prop} />
      <Tab
        panes={panes}
        className="maxheight dash"
        activeIndex={key}
        onTabChange={(e, data) => {
          prop.onUpdateItem("keyCashier", data.activeIndex);
        }}
      />
    </>
  );
}

export default withRouter(Cashier);
