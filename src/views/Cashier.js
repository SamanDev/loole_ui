import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AuthService from "services/auth.service";


import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import NotificationAlert from "react-notification-alert";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Active from "components/active.component";
import PMDeposit  from "components/deposit/pmdeposit.component";
import ShetabDeposit  from "components/deposit/shetabdeposit.component";
import PaparaDeposit  from "components/deposit/paparadeposit.component";
import ShetabCashout  from "components/deposit/shetabcashout.component"; 
import PaparaCashout  from "components/deposit/paparacashout.component"; 
import PMCashout  from "components/deposit/pmcashout.component"; 
import CheckButton from "react-validation/build/button";
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
import { printRequired,haveGetway,haveGetwayMode,get_date_locale,getGroupBadge } from "components/include";
import DataTable from 'react-data-table-component';
const conditionalRowStyles = [
  {
    when: row => row.endBalance < row.startBalance,
    style: {
      backgroundColor: 'rgba(255,0,0,.1)',
      
    },
  },
  // You can also pass a callback to style for additional customization
  {
    when: row => row.endBalance > row.startBalance,
    style: {
      backgroundColor: 'rgba(0,255,0,.1)',
      
    },
  },
];
const columns = [
  {
    name: 'ID',
    selector: row => row.id,
    sortable: true,
    width:'60px',
},
    {
        name: 'Date',
        selector: row => row.createDate,
        format: row => get_date_locale(row.createDate),
        
    },
    {
      name: 'Description',
      selector: row => row.description + ' '+ row.mode,
      sortable: true,
  },
  {
    name: 'Mode',
    selector: row => 'Dollar',
    
    sortable: true,
},
  {
    name: 'Amount',
    selector: row => row.amount,
    format: row =>  getGroupBadge('Dollar', row.amount, "small left"),
    sortable: true,
},
{
  name: 'EndBank',
  selector: row => row.endBalance,
  format: row =>  getGroupBadge('Dollar', row.endBalance, "small left"),
  sortable: true,
},
];

var dataTransaction = [
  {
    "id": 10,
    "amount": 18,
    "startBalance": 5,
    "endBalance": 23,
    "status": "Done",
    "mode": "DuelWin",
    "gateway": "",
    "voucherNumber": "",
    "voucherCode": "",
    "cardNumber": "",
    "description": "25 - Fifa2021",
    "transactionId": "",
    "createDate": "2021-10-30T14:07:40.000+00:00",
    "updateDate": "2021-10-30T14:07:40.000+00:00"
  }
]

var allValid = true;
var sendPass = false;
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
import InputMask from "react-input-mask";
import { IMaskInput } from "react-imask";
class Cashier extends Component {
  constructor(props) {
    super(props);
    this.setAmount = this.setAmount.bind(this);
    
    this.selectrequired = this.selectrequired.bind(this);
   
    
    this.state = {
      currentUser: AuthService.getCurrentUser(),
      Amount: "10",
      
      loading: false,
      submit: false,
      successful: false,
      message: "",
    };
  }
  
  setAmount(e) {
    this.setState({
      Amount: e,
      submit: false,
    });
  }
  

  selectrequired(field, value) {
    var _val = value;
    console.log(
      field + ": " + $("." + field + ":visible").length + " - " + allValid
    );

    if ($("." + field + ":visible").length > 0) {
      if (field == "CardNo" && value.length < 16) {
        _val = false;
      }
      if (field == "Expiration" && value.length < 4) {
        _val = false;
      }
      if (field == "cvv" && value.length < 3) {
        _val = false;
      }
      if (field == "Mobile" && value.length < 9) {
        _val = false;
      }
      if (field == "selectMethod" && value.value == "") {
        _val = false;
      }
      if (field == "Amount" && value != "") {
        _val = true;
      }

      if (!_val) {
        allValid = false;
        sendPass = true;
        if (this.state.submit && reqnum == 0) {
          reqnum = reqnum + 1;

          $("." + field).focus();
          return printRequired();
        } else {
          allValid = false;
        }
        console.log(
          field + ": " + $("." + field + ":visible").length + " - " + _val
        );
      } else {
        console.log(
          field + ": " + $("." + field + ":visible").length + " - " + _val
        );
        allValid = true;
        sendPass = false;
        //return printRequired();
      }
    }else{
      //allValid = true;
      //sendPass = false;
      //return printRequired();
    }
  }
  
  

  
  componentDidMount() {
    Swal.close();
    this._isMounted = true;
    if (this._isMounted) {
    }
  }
  render() {
    dataTransaction = this.state.currentUser.usersReports
    var newToken = this.state.currentUser;
    if (!newToken.cardsdef) {
         
       
        
      newToken.cardsdef = [
        {
          value: "",

          label: "Select Cart...",
        },
        {
          value: "6104337830282164",
          id: 1,
          label: "6104-3378-3028-2164",
          expiration: "0203",
          cvv: "237",
        },
        {
          value: "6666502205225022",
          id: 2,
          label: "6666-5022-0522-5022",
          expiration: "1020",
          cvv: "6800",
        },
      ];
      
     
      
      
    }
    return (
      <>
        <Active />
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
                      
                      defaultActiveKey="shetab"
                    >
                      <Nav role="tablist" variant="tabs">
                      {(haveGetwayMode(this.state.currentUser.cashierGateways,'IranShetab'))&&(
                        <>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="shetab"
                            onClick={() => {
                              allValid = false;
                            }}
                          >
                            <img
                              alt="Shetab"
                              style={{ height: 20 }}
                              src="/assets/images/shetab.svg"
                            ></img>{" "}
                            Iran Shetab
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="papara"
                            onClick={() => {
                              allValid = false;
                            }}
                          >
                            <img
                              alt="PAPARA"
                              style={{ height: 20 }}
                              src="/assets/images/turkey.svg"
                            ></img>{" "}
                            Turkey Papara
                          </Nav.Link>
                        </Nav.Item>
                        </>
                      )}
                        {(haveGetway(this.state.currentUser.cashierGateways,'PerfectMoney'))&&(
                        <Nav.Item>
                          <Nav.Link
                            eventKey="pm"
                           
                          >
                            <img
                              alt="pm"
                              style={{ height: 25 }}
                              src="/assets/images/pm.svg"
                            ></img>{" "}
                            PerfectMoney
                          </Nav.Link>
                        </Nav.Item>
                        )}
                        {(haveGetway(this.state.currentUser.cashierGateways,'Crypto')  ||  haveGetway(this.state.currentUser.cashierGateways,'PerfectMoney'))&&(
                        <Nav.Item>
                          <Nav.Link eventKey="cr">
                            <img
                              alt="btc"
                              style={{ height: 25 }}
                              src="/assets/images/btc.svg"
                            ></img>{" "}
                            Crypto Currencies
                          </Nav.Link>
                        </Nav.Item>
                        )}
                      </Nav>
                      <Tab.Content>
                      <Tab.Pane eventKey="shetab">
                      <ShetabDeposit token={newToken}/>
                          
                        </Tab.Pane>
                        <Tab.Pane eventKey="papara">
                          <PaparaDeposit/>
                          
                        </Tab.Pane>
                        <Tab.Pane eventKey="pm">
                        <PMDeposit/>
                          
                            
                              
                            
                        </Tab.Pane>
                        <Tab.Pane eventKey="cr">
                          <Row>
                            <Col md="6">
                              <Card className="stacked-form border-0">
                                <Card.Header>
                                  <Card.Title as="h4">
                                    Crypto Currency Deposit
                                  </Card.Title>
                                </Card.Header>
                                <Card.Body></Card.Body>
                                <Card.Footer>
                                  <Button
                                    className="btn-fill "
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
                      id="plain-tabs-cash"
                      defaultActiveKey="shetabc"
                    >
                      <Nav role="tablist" variant="tabs">
                      {(haveGetwayMode(this.state.currentUser.cashierGateways,'IranShetab'))&&(
                        <>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="shetabc"
                            onClick={() => {
                              allValid = false;
                            }}
                          >
                            <img
                              alt="pm"
                              style={{ height: 20 }}
                              src="/assets/images/shetab.svg"
                            ></img>{" "}
                            Iran Shetab
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link
                          eventKey="paparac"
                          onClick={() => {
                            allValid = false;
                          }}
                        >
                          <img
                            alt="PAPARA"
                            style={{ height: 20 }}
                            src="/assets/images/turkey.svg"
                          ></img>{" "}
                          Turkey Papara
                        </Nav.Link>
                      </Nav.Item>
                      </>
                      )}
                      {(haveGetway(this.state.currentUser.cashierGateways,'PerfectMoney'))&&(
                        <Nav.Item>
                          <Nav.Link
                            eventKey="pmc"
                            onClick={() => {
                              allValid = false;
                            }}
                          >
                            <img
                              alt="pm"
                              style={{ height: 25 }}
                              src="/assets/images/pm.svg"
                            ></img>{" "}
                            PerfectMoney
                          </Nav.Link>
                          
                        </Nav.Item>
                        )}
                        {(haveGetway(this.state.currentUser.cashierGateways,'Crypto'))&&(
                        <Nav.Item>
                          <Nav.Link eventKey="crc">
                            <img
                              alt="btc"
                              style={{ height: 25 }}
                              src="/assets/images/btc.svg"
                            ></img>{" "}
                            Crypto Currencies
                          </Nav.Link>
                        </Nav.Item>
                        )}
                       
                      </Nav>
                      <Tab.Content>
                      <Tab.Pane eventKey="shetabc">
                      <ShetabCashout token={this.state.currentUser}/>
                        </Tab.Pane>
                      <Tab.Pane eventKey="paparac">
                      <PaparaCashout/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="pmc">
                          <PMCashout/>
                          <Row>
                            <Col md="6">
                              <Card className="stacked-form border-0">
                                <Card.Header>
                                  <Card.Title as="h4">
                                    eVoucher PerfectMoney Cashout
                                  </Card.Title>
                                </Card.Header>
                                <Card.Body></Card.Body>
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
                        <Tab.Pane eventKey="crc">
                          <Row>
                            <Col md="6">
                              <Card className="stacked-form border-0">
                                <Card.Header>
                                  <Card.Title as="h4">
                                    Crypto Currency Cashout
                                  </Card.Title>
                                </Card.Header>
                                <Card.Body></Card.Body>
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
                  <DataTable
                  
            columns={columns}
            data={dataTransaction}
            defaultSortFieldId={1}
            defaultSortAsc={false}
            pagination
            conditionalRowStyles={conditionalRowStyles}
            
        />
                    
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
