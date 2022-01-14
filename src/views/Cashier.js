import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Tab, Menu } from "semantic-ui-react";

import { useAllCoins } from "services/hooks";
import Active from "components/active.component";
import Report from "components/report.component";
// react-bootstrap components
import { Card, Row, Col } from "react-bootstrap";
var dataTransaction = [
  {
    id: 10,
    amount: 18,
    startBalance: 5,
    endBalance: 23,
    status: "Done",
    mode: "DuelWin",
    gateway: "",
    voucherNumber: "",
    voucherCode: "",
    cardNumber: "",
    description: "25 - Fifa2021",
    transactionId: "",
    createDate: "2021-10-30T14:07:40.000+00:00",
    updateDate: "2021-10-30T14:07:40.000+00:00",
  },
];

var allValid = true;

function Cashier(prop) {
  const [myState, setMyState] = useState(prop.myState);
  useEffect(() => {
    setMyState(prop.myState);
  }, [prop.myState]);
  const currentUser = prop.findStateId(myState, "currentUser");
  const { data: eventCoins } = useAllCoins();

  var userMethods = currentUser.cashierGateways;
  userMethods.sort((a, b) => (a.mode > b.mode ? 1 : -1));
  dataTransaction = currentUser.usersReports;
  useEffect(() => {
    prop.onUpdateItem("coins", eventCoins);
  }, [eventCoins]);
  const key = prop.findStateId(myState, "keyCashier");
  const handleMethod = (method) => {
    prop.onUpdateItem("cashierMethod", method);
    prop.onUpdateItem("openModalCashier", true);
  };
  const panes = [
    {
      id: 1,
      menuItem: <Menu.Item key={"1"}>Deposit</Menu.Item>,
      render: () => (
        <Tab.Pane attached={false}>
          <Card className="card-plain card-social" style={{ margin: -10 }}>
            <Card.Header>
              <Card.Title>Select your Deposit method</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row className="card-tags">
                {userMethods.map(function (cashierGateway, u) {
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
                    <Col
                      lg="4"
                      xl="3"
                      key={u.toString()}
                      onClick={() =>
                        handleMethod(cashierGateway.name + "Deposit")
                      }
                    >
                      <div className="counter-box bg-color-1 card">
                        <div className="img">
                          <img
                            alt={cashierGateway.mode}
                            style={{ maxHeight: 50 }}
                            src={"/assets/images/" + _img}
                          ></img>
                          <p style={{ margin: 0, lineHeight: "20px" }}>
                            <small className="text-muted">
                              <b>{cashierGateway.name}</b>
                              <br />
                              {_limit}
                            </small>
                          </p>
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Card.Body>
          </Card>
        </Tab.Pane>
      ),
    },
    {
      id: 2,
      menuItem: <Menu.Item key={"2"}>Cashout</Menu.Item>,
      render: () => (
        <Tab.Pane attached={false}>
          <Card className="card-plain card-social" style={{ margin: -10 }}>
            <Card.Header>
              <Card.Title>Select your Cashout method</Card.Title>
            </Card.Header>
            <Card.Body>
              <Row className="card-tags">
                {userMethods.map(function (cashierGateway, u) {
                  var _img = "btc.svg";
                  var _limit = "Unlimited";
                  if (cashierGateway.mode == "PerfectMoney") {
                    _img = "pm.svg";
                  }
                  if (cashierGateway.mode == "IranShetab") {
                    _img = "iran.png";
                    _limit = "Max: $100";
                  }

                  return (
                    <Col
                      lg="4"
                      xl="3"
                      key={u.toString()}
                      onClick={() =>
                        handleMethod(cashierGateway.name + "Cashout")
                      }
                    >
                      <div className="counter-box bg-color-1 card">
                        <div className="img">
                          <img
                            alt={cashierGateway.mode}
                            style={{ maxHeight: 50 }}
                            src={"/assets/images/" + _img}
                          ></img>
                          <p style={{ margin: 0, lineHeight: "20px" }}>
                            <small className="text-muted">
                              <b>{cashierGateway.name}</b>
                              <br />
                              {_limit}
                            </small>
                          </p>
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Card.Body>
          </Card>
        </Tab.Pane>
      ),
    },
    {
      id: 3,
      menuItem: <Menu.Item key={"3"}>Transactions</Menu.Item>,
      render: () => (
        <Tab.Pane attached={false}>
          <Report usersReports={dataTransaction} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <Active {...prop} />
      <Tab
        panes={panes}
        menu={{ pointing: true }}
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
