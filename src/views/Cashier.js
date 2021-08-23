import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AuthService from "services/auth.service";
import NumericInput from 'react-numeric-input';

import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import userService from "services/user.service";
import Select from "react-select";
import NotificationAlert from "react-notification-alert";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
// react-bootstrap components
import {
  Badge,
  Alert,
  Button,
  Card,
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
  Tab,
} from "react-bootstrap";
import {printRequired} from "components/include";
var allValid = true;
var reqnum = 0;
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
class Cashier extends Component {
  constructor(props) {
    super(props);
    this.seteVoucher = this.seteVoucher.bind(this);
    this.setactivatioCode = this.setactivatioCode.bind(this);
    this.selectrequired = this.selectrequired.bind(this);
    this.handlePMDeposit = this.handlePMDeposit.bind(this);

    this.state = {
      eVoucher: "",
      activatioCode: "",
      loading: false,
      submit: false,
      successful: false,
      message: "",
    };
  }
  seteVoucher(e) {
   
    this.setState({
        eVoucher: e.target.value.replace(/\D/,''),
        submit: false,
      });
    
  }
  setactivatioCode(e) {
    this.setState({
      activatioCode: e.target.value.replace(/\D/,''),
      submit: false,
    });
  }
  selectrequired(field,value) {
    if (!value) {
        allValid = false;
        if (this.state.submit && reqnum==0) {
          reqnum = reqnum+1;
         
          $('.'+field).focus()
          return (
            printRequired()
          )
    
}
} else {
    reqnum=0;
  allValid = true;
}
    
  }
  handlePMDeposit(e) {
    
    e.preventDefault();
    reqnum=0;
    if (allValid) {
      this.setState({
        message: "",
        loading: true,
      });
      userService
        .createDepositPM(this.state.eVoucher, this.state.activatioCode)
        .then(
          (response) => {
            if (response == "Create event successful") {
              Swal.fire("", "Data saved successfully.", "success").then(
                (result) => {
                  this.props.history.push("/panel/dashboard");
                }
              );
            } else {
              this.setState({
                successful: false,
                message: "",
                submit: false,
                loading: false,
              });
            }
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            this.setState({
              successful: false,
              message: resMessage,
              submit: false,
              loading: false,
            });
          }
        );
    } else {
      this.setState({
        submit: true,
      });

      this.form.validateAll();
    }
  }
  onKeyPress(event) {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
     if (/\+|-/.test(keyValue))
       event.preventDefault();
   }
  render() {
    return (
      <>
        <Container>
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
                          <Nav.Link eventKey="info-plain">
                            <img
                              alt="pm"
                              style={{ height: 25 }}
                              src="/assets/images/pm.svg"
                            ></img>{" "}
                            PerfectMoney
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="account-plain">
                            <img
                              alt="btc"
                              style={{ height: 25 }}
                              src="/assets/images/btc.svg"
                            ></img>{" "}
                            Crypto Currencies
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                      <Tab.Content>
                        <Tab.Pane eventKey="info-plain">
                          <Row>
                            <Col md="6">
                              <Form
                                onSubmit={this.handlePMDeposit}
                                ref={(c) => {
                                  this.form = c;
                                }}
                              >
                                <Card className="stacked-form border-0">
                                  <Card.Header>
                                    <Card.Title as="h4">
                                      eVoucher PerfectMoney Deposit
                                    </Card.Title>
                                  </Card.Header>
                                  <Card.Body>
                                  <div className="form-group">
                              <label>Voucher Number</label>
                              <Input
                    type="tel"
                    className="form-control eVoucher"
                    pattern="[0-9]*" 
                    value={this.state.eVoucher}
                    onChange={this.seteVoucher}
                    onKeyPress={this.onKeyPress.bind(this)}
                  />
                              
                            </div>
                                    
                                      {this.selectrequired('eVoucher',this.state.eVoucher)}
                                      <div className="form-group">
                              <label>Activation Code</label>
                              <Input
                    type="tel"
                    className="form-control  activatioCode"
                    pattern="[0-9]*" 
                    value={this.state.activatioCode}
                    onChange={this.setactivatioCode}
                    onKeyPress={this.onKeyPress.bind(this)}
                  />
                              
                            </div>
                                    
                                      {this.selectrequired('activatioCode',
                                        this.state.activatioCode
                                      )}
                                   
                                  </Card.Body>
                                  <Card.Footer>
                                    <div className="form-group">
                                      <button
                                        className="btn btn-danger btn-wd "
                                        disabled={this.state.loading}
                                      >
                                        {this.state.loading && (
                                          <span className="spinner-border spinner-border-sm  fa-wd"></span>
                                        )}
                                        <span> Deposit</span>
                                      </button>
                                    </div>
                                   
                                  </Card.Footer>
                                </Card>
                              </Form>
                            </Col>
                            <Col md="6">
                              <Card className="stacked-form border-0">
                                <Card.Header>
                                  <Card.Title as="h4">
                                    How find eVoucher PerfectMoney?
                                  </Card.Title>
                                </Card.Header>
                                <Card.Body>hi</Card.Body>
                              </Card>
                            </Col>
                          </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey="account-plain">
                          <Row>
                            <Col md="6">
                              <Card className="stacked-form border-0">
                                <Card.Header>
                                  <Card.Title as="h4">
                                    Crypto Currency Deposit
                                  </Card.Title>
                                </Card.Header>
                                <Card.Body>
                                 
                                </Card.Body>
                                <Card.Footer>
                                  <Button
                                    className="btn-fill"
                                    type="submit"
                                    variant="danger"
                                  >
                                    Deposit
                                  </Button>
                                </Card.Footer>
                              </Card>
                            </Col>
                            <Col md="6">
                              <Card className="stacked-form border-0">
                                <Card.Header>
                                  <Card.Title as="h4">
                                    How find Crypto Currencies?
                                  </Card.Title>
                                </Card.Header>
                                <Card.Body>hi</Card.Body>
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
                          <Nav.Link eventKey="info-plain">
                            PerfectMoney
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="account-plain">
                            Crypto Currencies
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                      <Tab.Content>
                        <Tab.Pane eventKey="info-plain">
                          <Row>
                            <Col md="6">
                              <Card className="stacked-form border-0">
                                <Card.Header>
                                  <Card.Title as="h4">
                                    eVoucher PerfectMoney Cashout
                                  </Card.Title>
                                </Card.Header>
                                <Card.Body>
                                  
                                </Card.Body>
                                <Card.Footer>
                                  <Button
                                    className="btn-fill"
                                    type="submit"
                                    variant="success"
                                  >
                                    Cashout
                                  </Button>
                                </Card.Footer>
                              </Card>
                            </Col>
                            <Col md="6">
                              <Card className="stacked-form border-0">
                                <Card.Header>
                                  <Card.Title as="h4">
                                    How find eVoucher PerfectMoney?
                                  </Card.Title>
                                </Card.Header>
                                <Card.Body>hi</Card.Body>
                              </Card>
                            </Col>
                          </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey="account-plain">
                          <Row>
                            <Col md="6">
                              <Card className="stacked-form border-0">
                                <Card.Header>
                                  <Card.Title as="h4">
                                    Crypto Currency Cashout
                                  </Card.Title>
                                </Card.Header>
                                <Card.Body>
                                  
                                </Card.Body>
                                <Card.Footer>
                                  <Button
                                    className="btn-fill"
                                    type="submit"
                                    variant="success"
                                  >
                                    Cashout
                                  </Button>
                                </Card.Footer>
                              </Card>
                            </Col>
                            <Col md="6">
                              <Card className="stacked-form border-0">
                                <Card.Header>
                                  <Card.Title as="h4">
                                    How find Crypto Currencies?
                                  </Card.Title>
                                </Card.Header>
                                <Card.Body>hi</Card.Body>
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
                      streamlined profile, every detail was carefully considered
                      to enhance your experience. So while its display is
                      larger, the phone feels just right.
                    </p>
                    <p>
                      Another Text. The first thing you notice when you hold the
                      phone is how great it feels in your hand. The cover glass
                      curves down around the sides to meet the anodized aluminum
                      enclosure in a remarkable, simplified design.
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
}

export default withRouter(Cashier);
