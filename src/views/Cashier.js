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
import Report from "components/report.component";
import ReportDiamond from "components/reportdiamond.component";
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

  var userMethods = currentUser.cashierGateways;

  userMethods = userMethods.filter(
    (li, idx, self) => self.map((itm) => itm.mode).indexOf(li.mode) === idx
  );
  userMethods.sort((a, b) => (a.mode > b.mode ? 1 : -1));
  useEffect(() => {
    prop.onUpdateItem("coins", eventCoins);
  }, [eventCoins]);
  const key = prop.findStateId(myState, "keyCashier");
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
      <Card
        fluid
        color={mode == "Deposit" ? "red" : "green"}
        onClick={() => handleMethod(cashierGateway.mode + mode)}
      >
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
            color="grey"
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
      </Card>
    );
  };
  const panes = [
    {
      id: 1,
      menuItem: "Deposit",
      render: () => (
        <Tab.Pane>
          <Segment secondary padded>
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

            <Header>Select your Deposit method</Header>

            <Card.Group
              className="fours card-tags"
              stackable
              doubling
              itemsPerRow="4"
              style={{ marginBottom: 20, textAlign: "left" }}
            >
              {userMethods.map(function (cashierGateway, u) {
                if (cashierGateway.name != "Digipay" || 1 == 1) {
                  return <>{_block(cashierGateway, "Deposit")}</>;
                }
              })}
            </Card.Group>
          </Segment>
        </Tab.Pane>
      ),
    },
    {
      id: 2,
      menuItem: "Withdrawal",
      render: () => (
        <Tab.Pane>
          <Segment secondary padded>
            <Header as="h2">
              <Icon.Group className="icon" size="big">
                <Icon name="dollar" />
                <Icon corner="center right" color="green" name="share  " />
              </Icon.Group>
              <Header.Content>
                Withdrawal
                <Header.Subheader>
                  Withdraw Cash from your account
                </Header.Subheader>
              </Header.Content>
            </Header>

            <Header>Select your Cashout method</Header>
            <Card.Group
              className="fours card-tags"
              stackable
              doubling
              itemsPerRow="4"
              style={{ marginBottom: 20, textAlign: "left" }}
            >
              {userMethods.map(function (cashierGateway, u) {
                if (cashierGateway.name != "VisaGiftCode") {
                  return <>{_block(cashierGateway, "Cashout")}</>;
                }
              })}
            </Card.Group>
          </Segment>
        </Tab.Pane>
      ),
    },
    {
      id: 3,
      menuItem: "Transactions",
      render: () => (
        <Tab.Pane>
          <Segment secondary padded>
            <Report user={currentUser} />
          </Segment>
        </Tab.Pane>
      ),
    },
    {
      id: 4,
      menuItem: <Menu.Item key={"4"}>Diamonds</Menu.Item>,
      render: () => (
        <Tab.Pane>
          <Segment secondary padded>
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
      <Tab
        panes={panes}
        className="maxheight "
        defaultActiveIndex={key}
        onTabChange={(e, data) => {
          prop.onUpdateItem("keyCashier", data.activeIndex);
        }}
      />
    </>
  );
}

export default withRouter(Cashier);
