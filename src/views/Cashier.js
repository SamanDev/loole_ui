import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { Tab, Menu } from "semantic-ui-react";

import { useAllCoins } from "services/hooks";
import Active from "components/active.component";
import Report from "components/report.component";
import ReportDiamond from "components/reportdiamond.component";
// react-bootstrap components
import UserContext from "context/UserState";
import { Card, Row, Col } from "react-bootstrap";
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
                  if (cashierGateway.name != "Digipay" || 1 == 1) {
                    return (
                      <Col
                        lg="3"
                        xl="3"
                        md="3"
                        sm="3"
                        key={u.toString()}
                        onClick={() =>
                          handleMethod(cashierGateway.mode + "Deposit")
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
                                <b>{cashierGateway.mode}</b>
                                <br />
                                {_limit}
                              </small>
                            </p>
                          </div>
                        </div>
                      </Col>
                    );
                  }
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
                  if (cashierGateway.mode != "VisaGiftCode") {
                    return (
                      <Col
                        lg="3"
                        xl="3"
                        md="3"
                        sm="3"
                        key={u.toString()}
                        onClick={() =>
                          handleMethod(cashierGateway.mode + "Cashout")
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
                                <b>{cashierGateway.mode}</b>
                                <br />
                                {_limit}
                              </small>
                            </p>
                          </div>
                        </div>
                      </Col>
                    );
                  }
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
          <Report user={currentUser} />
        </Tab.Pane>
      ),
    },
    {
      id: 4,
      menuItem: <Menu.Item key={"4"}>Diamonds</Menu.Item>,
      render: () => (
        <Tab.Pane attached={false}>
          <ReportDiamond user={currentUser} />
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
        menu={{ color: "blue", pointing: true }}
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
