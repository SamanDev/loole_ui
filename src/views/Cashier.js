import React from "react";

import Select from "react-select";
import NotificationAlert from "react-notification-alert";
// react-bootstrap components
import {
    Badge,
    Alert,
    Button,
    Card,
    Form,
    InputGroup,
    Navbar,
    Nav,
    OverlayTrigger,
    Table,
    Tooltip,
    Container,
    Row,
    Col,
    TabContent,
    TabPane,
    Tab
} from "react-bootstrap";


function Cashier() {
    const [singleSelect, setSingleSelect] = React.useState("");
    const [singleSelectAmount, setSingleSelectAmount] = React.useState("");
    const [singleSelectTrans, setSingleSelectTrans] = React.useState("");
    const [modal, setModal] = React.useState(false);
  const notificationAlertRef = React.useRef(null);
    const notify = (place,mode) => {
        var color = Math.floor(Math.random() * 5 + 1);
        var type;
        switch (color) {
          case 1:
            type = "primary";
            break;
          case 2:
            type = "success";
            break;
          case 3:
            type = "danger";
            break;
          case 4:
            type = "warning";
            break;
          case 5:
            type = "info";
            break;
          default:
            break;
        }
        type=mode;
        var options = {};
        options = {
          place: place,
          message: (
            <div>
              <div>
                Welcome to <b>Black Dashboard React</b> - a beautiful premium admin
                for every web developer.
              </div>
            </div>
          ),
          type: type,
          icon: "nc-icon nc-bell-55",
          autoDismiss: 70,
        };
        notificationAlertRef.current.notificationAlert(options);

    };
    return (
        <>
        
        <NotificationAlert ref={notificationAlertRef} />
        <Container >
       
            <Tab.Container
                id="page-subcategories-tabs-example"
                defaultActiveKey="description-page-subcategories"
            >
                <div className="nav-container  nav-justified">
                    <Nav
                        role="tablist"
                        variant="tabs"
                        className="justify-content-center border-0 nav-icons"
                    >
                        <Nav.Item>
                            <Nav.Link
                                eventKey="description-page-subcategories"
                                className="border-0 bg-transparent "
                            >
                                <i className="nc-icon nc-money-coins"></i>
                                <br></br>
                Deposit
              </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                eventKey="location-page-subcategories"
                                className="border-0 bg-transparent" 
                            >
                                <i className="nc-icon nc-credit-card"></i>
                                <br></br>
                Cashout
              </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                eventKey="legal-info-page-subcategories"
                                className="border-0 bg-transparent"
                            >
                                <i className="nc-icon nc-bullet-list-67"></i>
                                <br></br>
                Trasactions
              </Nav.Link>
                        </Nav.Item>

                    </Nav>
                </div>
                <Tab.Content>
                    <Tab.Pane eventKey="description-page-subcategories">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Deposit</Card.Title>
                                <div className="card-category">Select your method</div>
                            </Card.Header>
                            <Card.Body>
                                <Tab.Container
                                    id="plain-tabs-example"
                                    defaultActiveKey="info-plain"
                                >
                                    <Nav role="tablist" variant="tabs">
                                        <Nav.Item>
                                            <Nav.Link eventKey="info-plain">PerfectMoney</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="account-plain">Crypto Currencies</Nav.Link>
                                        </Nav.Item>

                                    </Nav>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="info-plain">
                                            <Row>
                                                <Col md="6">
                                                    <Card className="stacked-form border-0">
                                                        <Card.Header>
                                                            <Card.Title as="h4">eVoucher PerfectMoney Deposit</Card.Title>
                                                        </Card.Header>
                                                        <Card.Body>
                                                            <Form action="#" method="#">
                                                                <Form.Group>
                                                                    <label>Voucher Number</label>
                                                                    <Form.Control
                                                                        placeholder="Voucher Number"
                                                                        type="tel"
                                                                    ></Form.Control>
                                                                </Form.Group>
                                                                <Form.Group>
                                                                    <label>Activation Code</label>
                                                                    <Form.Control
                                                                        placeholder="Activation Code"
                                                                        type="tel"
                                                                    ></Form.Control>
                                                                </Form.Group>

                                                            </Form>
                                                        </Card.Body>
                                                        <Card.Footer>
                                                            <Button className="btn-fill" type="submit" variant="danger" onClick={() => notify("tc","danger")}>Deposit</Button>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                                <Col md="6">
                                                    <Card className="stacked-form border-0">
                                                        <Card.Header>
                                                            <Card.Title as="h4">How find eVoucher PerfectMoney?</Card.Title>
                                                        </Card.Header>
                                                        <Card.Body>
                                                            hi
              </Card.Body>

                                                    </Card>
                                                </Col>
                                            </Row>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="account-plain">
                                        <Row>
                                                <Col md="6">
                                                    <Card className="stacked-form border-0">
                                                        <Card.Header>
                                                            <Card.Title as="h4">Crypto Currency Deposit</Card.Title>
                                                        </Card.Header>
                                                        <Card.Body>
                                                            <Form action="#" method="#">
                                                                <Form.Group>
                                                                    <label>Choose Coin</label>
                                                                    <Select
            className="react-select default"
            classNamePrefix="react-select"
            name="singleSelect"
            value={singleSelect}
            onChange={(value) => setSingleSelect(value)}
            options={[
              { value: "id", label: "ZCash" },
              { value: "ms", label: "LightCoin" },
              { value: "ca", label: "Català" },
              { value: "da", label: "Dansk" },
             
            ]}
            placeholder="Coin"
          />
                                                                </Form.Group>
                                                                <Form.Group>
                                                                    <label>Choose Amount</label>
                                                                    <Select
            className="react-select default"
            classNamePrefix="react-select"
            name="singleSelectAmount"
            value={singleSelectAmount}
            onChange={(value) => setSingleSelectAmount(value)}
            options={[
              { value: "20", label: "$20" },
              { value: "50", label: "$50" },
              { value: "100", label: "$100" },
              { value: "200", label: "$200" },
             
            ]}
            placeholder="Amount"
          />
                                                                </Form.Group>

                                                            </Form>
                                                        </Card.Body>
                                                        <Card.Footer>
                                                            <Button className="btn-fill" type="submit" variant="danger">Deposit</Button>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                                <Col md="6">
                                                    <Card className="stacked-form border-0">
                                                        <Card.Header>
                                                            <Card.Title as="h4">How find Crypto Currencies?</Card.Title>
                                                        </Card.Header>
                                                        <Card.Body>
                                                            hi
              </Card.Body>

                                                    </Card>
                                                </Col>
                                            </Row>
                </Tab.Pane>

                                    </Tab.Content>
                                </Tab.Container>
                            </Card.Body>
                        </Card>
                    </Tab.Pane>
                    <Tab.Pane eventKey="location-page-subcategories">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Cashout</Card.Title>
                                <div className="card-category">Select your method</div>
                            </Card.Header>
                            <Card.Body>
                                <Tab.Container
                                    id="plain-tabs-example"
                                    defaultActiveKey="info-plain"
                                >
                                    <Nav role="tablist" variant="tabs">
                                        <Nav.Item>
                                            <Nav.Link eventKey="info-plain">PerfectMoney</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="account-plain">Crypto Currencies</Nav.Link>
                                        </Nav.Item>

                                    </Nav>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="info-plain">
                                            <Row>
                                                <Col md="6">
                                                    <Card className="stacked-form border-0">
                                                        <Card.Header>
                                                            <Card.Title as="h4">eVoucher PerfectMoney Cashout</Card.Title>
                                                        </Card.Header>
                                                        <Card.Body>
                                                            <Form action="#" method="#">
                                                           
                                                                <Form.Group>
                                                                    <label>Choose Amount</label>
                                                                    <Select
            className="react-select default"
            classNamePrefix="react-select"
            name="singleSelectAmount"
            value={singleSelectAmount}
            onChange={(value) => setSingleSelectAmount(value)}
            options={[
              { value: "20", label: "$20" },
              { value: "50", label: "$50" },
              { value: "100", label: "$100" },
              { value: "200", label: "$200" },
             
            ]}
            placeholder="Amount"
          />
                                                                </Form.Group>
                                                                <Form.Group>
                                                                    <label>Loole Account Password</label>
                                                                    <Form.Control
                                                                        placeholder="Password"
                                                                        type="password"
                                                                    ></Form.Control>
                                                                </Form.Group>
                                                            </Form>
                                                        </Card.Body>
                                                        <Card.Footer>
                                                            <Button className="btn-fill" type="submit" variant="success">
                                                                Cashout
                </Button>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                                <Col md="6">
                                                    <Card className="stacked-form border-0">
                                                        <Card.Header>
                                                            <Card.Title as="h4">How find eVoucher PerfectMoney?</Card.Title>
                                                        </Card.Header>
                                                        <Card.Body>
                                                            hi
              </Card.Body>

                                                    </Card>
                                                </Col>
                                            </Row>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="account-plain">
                                        <Row>
                                                <Col md="6">
                                                    <Card className="stacked-form border-0">
                                                        <Card.Header>
                                                            <Card.Title as="h4">Crypto Currency Cashout</Card.Title>
                                                        </Card.Header>
                                                        <Card.Body>
                                                            <Form action="#" method="#">
                                                                <Form.Group>
                                                                    <label>Choose Coin</label>
                                                                    <Select
            className="react-select default"
            classNamePrefix="react-select"
            name="singleSelect"
            value={singleSelect}
            onChange={(value) => setSingleSelect(value)}
            options={[
              { value: "id", label: "ZCash" },
              { value: "ms", label: "LightCoin" },
              { value: "ca", label: "Català" },
              { value: "da", label: "Dansk" },
             
            ]}
            placeholder="Coin"
          />
                                                                </Form.Group>
                                                                <Form.Group>
                                                                    <label>Choose Amount</label>
                                                                    <Select
            className="react-select default"
            classNamePrefix="react-select"
            name="singleSelectAmount"
            value={singleSelectAmount}
            onChange={(value) => setSingleSelectAmount(value)}
            options={[
              { value: "20", label: "$20" },
              { value: "50", label: "$50" },
              { value: "100", label: "$100" },
              { value: "200", label: "$200" },
             
            ]}
            placeholder="Amount"
          />
                                                                </Form.Group>
                                                                <Form.Group>
                                                                    <label>Loole Account Password</label>
                                                                    <Form.Control
                                                                        placeholder="Password"
                                                                        type="password"
                                                                    ></Form.Control>
                                                                </Form.Group>
                                                            </Form>
                                                        </Card.Body>
                                                        <Card.Footer>
                                                            <Button className="btn-fill" type="submit" variant="success">Cashout</Button>
                                                        </Card.Footer>
                                                    </Card>
                                                </Col>
                                                <Col md="6">
                                                    <Card className="stacked-form border-0">
                                                        <Card.Header>
                                                            <Card.Title as="h4">How find Crypto Currencies?</Card.Title>
                                                        </Card.Header>
                                                        <Card.Body>
                                                            hi
              </Card.Body>

                                                    </Card>
                                                </Col>
                                            </Row>
                </Tab.Pane>

                                    </Tab.Content>
                                </Tab.Container>
                            </Card.Body>
                        </Card>
                    </Tab.Pane>
                    <Tab.Pane eventKey="legal-info-page-subcategories">
                    <Card className="regular-table-with-color">
              <Card.Header>
                <Card.Title as="h4">Trasactions</Card.Title>
                <Form.Group>
                                                                   
                                                                    <Select
            className="react-select default"
            classNamePrefix="react-select"
            name="singleSelectTrans"
            value={singleSelectTrans}
            onChange={(value) => setSingleSelectTrans(value)}
            options={[
              { value: "all", label: "All" },
              { value: "deposit", label: "Deposits" },
              { value: "cashout", label: "Cashouts" },
              { value: "commition", label: "Commitions" },
             
            ]}
            placeholder="Filter"
          />
                                                                </Form.Group>
              </Card.Header>
              <Card.Body className="table-responsive p-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Salary</th>
                      <th>Country</th>
                      <th>City</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="success">
                      <td>1</td>
                      <td>Dakota Rice (Success)</td>
                      <td>$36,738</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Minerva Hooper</td>
                      <td>$23,789</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                    </tr>
                    <tr className="info">
                      <td>3</td>
                      <td>Sage Rodriguez (Info)</td>
                      <td>$56,142</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Philip Chaney</td>
                      <td>$38,735</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                    </tr>
                    <tr className="danger">
                      <td>5</td>
                      <td>Doris Greene (Danger)</td>
                      <td>$63,542</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Mason Porter</td>
                      <td>$78,615</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                    </tr>
                    <tr className="warning">
                      <td>7</td>
                      <td>Mike Chaney (Warning)</td>
                      <td>$38,735</td>
                      <td>Romania</td>
                      <td>Bucharest</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
                    </Tab.Pane>
                    <Tab.Pane eventKey="help-center-page-subcategories">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Help center</Card.Title>
                                <p className="category">More information here</p>
                            </Card.Header>
                            <Card.Body>
                                <p>
                                    From the seamless transition of glass and metal to the
                                    streamlined profile, every detail was carefully
                                    considered to enhance your experience. So while its
                                    display is larger, the phone feels just right.
                </p>
                                <p>
                                    Another Text. The first thing you notice when you hold
                                    the phone is how great it feels in your hand. The cover
                                    glass curves down around the sides to meet the anodized
                                    aluminum enclosure in a remarkable, simplified design.
                </p>
                            </Card.Body>
                        </Card>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
            </Container>
        </>
    );
}

export default Cashier;
