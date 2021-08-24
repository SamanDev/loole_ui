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
import InputMask from 'react-input-mask';
import {IMaskInput} from 'react-imask';
class Cashier extends Component {
  constructor(props) {
    super(props);
    this.setAmount = this.setAmount.bind(this);
    this.seteVoucher = this.seteVoucher.bind(this);
    this.setCardDef = this.setCardDef.bind(this);
    this.setMobile = this.setMobile.bind(this);
    this.setMobileCode = this.setMobileCode.bind(this);
    this.setCardNo = this.setCardNo.bind(this);
    this.setExpiration = this.setExpiration.bind(this);
    this.setCvv = this.setCvv.bind(this);
    this.setPass = this.setPass.bind(this);
    this.setactivatioCode = this.setactivatioCode.bind(this);
    this.selectrequired = this.selectrequired.bind(this);
   
    this.handleGoNext = this.handleGoNext.bind(this);
    this.handleSendVerify = this.handleSendVerify.bind(this);
    this.handleSendVerifyConfirm = this.handleSendVerifyConfirm.bind(this);
    this.handleShetabDeposit = this.handleShetabDeposit.bind(this);
    this.handleShetabMethod = this.handleShetabMethod.bind(this);
    this.handleSendPass = this.handleSendPass.bind(this);
    this.handlePMDeposit = this.handlePMDeposit.bind(this);

    this.state = {
        currentUserCarts: AuthService.getCurrentUser(),
        cartSelected: {
            value: '',
           
            label: 'Select Cart...',
            
          },
        shetabMethod:{
            value: '',
           
            label: 'Select Method...',
            
          },
        shetabGo:0,
        Amount:"10",
        Mobile: "12137611",
        MobileCode: "",
      eVoucher: "",
      activatioCode: "",
      CardNo:"",
      Expiration:"",
      cvv:"1",
      pass:"",
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
  setAmount(e) {
   
   
    this.setState({
        Amount: e,
        submit: false,
      });
    
  }
  setMobile(e) {
   
    console.log(e)
    console.log(this.state)
    this.setState({
        Mobile: e,
        submit: false,
      });
    
  }
  setMobileCode(e) {
   
    console.log(e)
    console.log(this.state)
    this.setState({
        MobileCode: e,
        submit: false,
      });
    
  }
  handleShetabMethod(e) {
    console.log(e)
   
    this.setState({
        shetabMethod: e,
        submit: false,
      });
      allValid = false;
  }
  setPass(e) {
   
    allValid = false;
    this.setState({
        pass: e,
        submit: false,
      });
    
  }
  setCardNo(e) {
   
   
    this.setState({
        CardNo: e,
        submit: false,
      });
    console.log(e)
    console.log(this.state)
  }
  setCardDef(e) {
    console.log(e)
    console.log(this.state)
      setTimeout(function () {
        $('.CardNo').focus();
      },100)
    
    this.setState({
        cartSelected: e,
        CardNo: e.value,
        Expiration: e.expiration,
        cvv: e.cvv,
        submit: false,
      });
      allValid = false;
  }
  setExpiration(e) {
    
    console.log(e)
    console.log(this.state)
    this.setState({
        Expiration: e,
        submit: false,
      });
    
  }
  setCvv(e) {
    
    this.setState({
        cvv: e,
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
      

      
      
      var _val = value;
      
      
      
      if($("."+field+":visible").length>0){
        if (field == 'CardNo'  && value.length < 16) {_val = false}
        if (field == 'Expiration'  && value.length < 4) {_val = false}
        if (field == 'cvv'  && value.length < 3) {_val = false}
        if (field == 'Mobile'  && value.length < 9) {_val = false}
        if (field == 'selectMethod'  && value=='') {_val = false}
        console.log(field  + ': '+ $("."+field+":visible").length + ' - ' + _val)
    if (!_val) {
        allValid = false;
        sendPass = false;
        if (this.state.submit && reqnum==0) {
          reqnum = reqnum+1;
         
          $('.'+field).focus()
          return (
            printRequired()
          )
    
}
    

}else{
    allValid = true;
}
  }
  }
  handleGoNext(e) {
    e.preventDefault();
    
    reqnum=0;
    if (allValid) {
      
    allValid= false;
                                           
    this.setState({shetabGo:this.state.shetabGo+1});
    }else {
        this.setState({
          submit: true,
        });
  
        this.form.validateAll();
      }
    
  }
  handleShetabDeposit(e) {
    
    e.preventDefault();
    
    reqnum=0;
    if (allValid) {
      this.setState({
        message: "",
        loading: true,
      });
      userService
        .createDepositShetab(this.state.Amount,this.state.CardNo, this.state.Expiration, this.state.cvv,this.state.pass)
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
  handleSendVerify(e) {
    e.preventDefault();
    
    reqnum=0;
    if (allValid) {
      
    allValid= false;
      userService
        .createDepositShetabVerify(this.state.Mobile)
        .then(
          (response) => {
            if (response == "Ok") {
                
                Swal.fire("", "Data saved successfully.", "success").then(
                    (result) => {
                        allValid = false;
                 
                        this.setState({
                            shetabGo:this.state.shetabGo+1, 
                            successful: false,
                        message: "",
                        submit: false,
                        loading: false,
                        })
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
        }else {
            this.setState({
              submit: true,
            });
      
            this.form.validateAll();
          }
  }
  handleSendVerifyConfirm(e) {
    
    
    e.preventDefault();
    
    reqnum=0;
    if (allValid) {
      
    allValid= false;
      this.setState({
        message: "",
        loading: true,
      });
      
      userService
        .createDepositShetabVerifyConfirm(this.state.Mobile,this.state.MobileCode)
        .then(
          (response) => {
            if (response == "Ok") {
                Swal.fire("", "Data saved successfully.", "success").then(
                    (result) => {
                        
                        allValid = false;
                        this.setState({
                            shetabGo:this.state.shetabGo+1, 
                            successful: false,
                        message: "",
                        submit: false,
                        loading: false,
                        })
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
    }else {
        this.setState({
          submit: true,
        });
  
        this.form.validateAll();
      }
  }
  handleSendPass() {
    
    
    reqnum=0;
    
      this.setState({
        message: "",
        loading: true,
      });
      //allValid = false;
      userService
        .createDepositShetabPass(this.state.Amount,this.state.CardNo, this.state.Expiration, this.state.cvv)
        .then(
          (response) => {
            if (response == "Ok") {
                Swal.fire("", "Password sent successfully.", "success").then(
                    (result) => {
                        sendPass=false;
                
            
                this.setState({
                    
                    successful: false,
                message: "",
                submit: false,
                loading: false,
                })
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
   componentDidMount() {
    Swal.close();
    this._isMounted = true;
    if (this._isMounted) {
        
        
        
    }
  }
  render() {
    
   if(!this.state.currentUserCarts.cards){
    var currentUser = this.state.currentUserCarts;
    
    currentUser.cards = [
        {
            value: "",
            id: 0,
            label: 'New Cart...',
            expiration: '',
            cvv: '',
          },
          {
            value: "5022502205225022",
            id: 1,
            label: '5022-5022-0522-5022',
            expiration: '0130',
            cvv: '400',
          },
          {
            value: "6666502205225022",
            id: 2,
            label: '6666-5022-0522-5022',
            expiration: '1020',
            cvv: '6800',
          },
    ]
    currentUser.payMethod = [
        {
            value: "",
            
            label: 'Select  Method...',
           
          },
        {
            value: "HamrahCart",
           
            label: 'HamrahCart',
            
          },
          {
            value: "HamrahCart",
           
            label: 'Iva App',
            
          },
          {
            value: "HamrahCart",
           
            label: 'Kipod',
            
          },
    ]
    this.setCardDef(currentUser.cards[1]) 
    this.handleShetabMethod(currentUser.payMethod[0]) 
   }
    
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
                    onClick={ () => {allValid= false;this.form.validateAll();} }
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
                    onClick={ () => {allValid= false;} }
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
                      defaultActiveKey="shetab"
                      
                    >
                      <Nav role="tablist" variant="tabs" >
                      <Nav.Item>
                          <Nav.Link eventKey="shetab" onClick={ () => {allValid= false;this.form.validateAll();console.log(allValid)} }>
                            <img
                              alt="pm"
                              style={{ height: 20 }}
                              src="/assets/images/shetab.svg"
                            ></img>{" "}
                            Iran Shetab
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="pm" onClick={ () => {allValid= false;this.form.validateAll();console.log(allValid)} }>
                            <img
                              alt="pm"
                              style={{ height: 25 }}
                              src="/assets/images/pm.svg"
                            ></img>{" "}
                            PerfectMoney
                          </Nav.Link>
                        </Nav.Item>
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
                      </Nav>
                      <Tab.Content>
                      <Tab.Pane eventKey="shetab">
                          <Row>
                            <Col md="6">
                              <Form
                                onSubmit={this.handleShetabDeposit}
                                ref={(c) => {
                                  this.form = c;
                                }}
                              >
                                <Card className="stacked-form border-0">
                                  <Card.Header>
                                    <Card.Title as="h4">
                                      Iran Shetab Deposit
                                    </Card.Title>
                                  </Card.Header>
                                  <Card.Body>
                                  {(this.state.shetabGo==0) &&(
                                      <>
                                        <div className="form-group form-group-lg2">
                                  <label>Amount</label>
                                  <div className="input-group">
  <span className="input-group-text" id="inputGroup-sizing-lg">$</span>
  <IMaskInput className="form-control Amount form-control-lg2"  
                              type="tel"
                              pattern="[1-9]{1}[0-9]"
                              mask={"0000"}
                              
                             
  inputRef={el => this.input = el} 
                    value={this.state.Amount}
                    onAccept={this.setAmount}  />
 
</div>
                              
                              

                              
                              
                            </div>
                            {this.selectrequired('Amount',this.state.Amount)} 
                                    </>
                                      )}
                                      {(this.state.shetabGo==1) &&(
                                          <>
                                        <div className="form-group form-group-lg2">
                                        <label>Select Method</label>
                                        <Select
                                          className="react-select default selectMethod"
                                          classNamePrefix="react-select selectMethod"
                                         
                                         value={this.state.shetabMethod}
                                          onChange={this.handleShetabMethod}
                                          options={this.state.currentUserCarts.payMethod}
                                         
                                        />
                                     

                                      </div>
                                      {this.selectrequired('selectMethod',this.state.shetabMethod.value)} 
                                      </>
                                      )}
                                      {(this.state.shetabGo==2) &&(
                                        
                                        <>
                                        <div className="form-group form-group-lg2">
                                  <label>Mobile</label>
                                  <div className="input-group">
  <span className="input-group-text" id="inputGroup-sizing-lg">+98</span>
  <IMaskInput className="form-control Mobile form-control-lg2"  
                              type="tel"
                              pattern="[0-9]"
                              unmask={true}
                              mask={"900 000 0000"}
                             
                             
  inputRef={el => this.input = el} 
                    value={this.state.Mobile}
                    onAccept={this.setMobile}  />
 
</div>
                              
       
                              
                              
                            </div>
                                                   
{this.selectrequired('Mobile',this.state.Mobile)} 
                                    
                                      
                                      </>
                                      )}
                                      {(this.state.shetabGo==3) &&(
                                        
                                        <>
                                        <div className="form-group ">
                                  <label>Code</label>
                                 
  <IMaskInput className="form-control MobileCode"  
                              type="tel"
                              pattern="[0-9]"
                              unmask={true}
                              mask={"0000000"}
                              
                             
  inputRef={el => this.input = el} 
                    value={this.state.MobileCode}
                    onAccept={this.setMobileCode}  />
 
</div>
                              
                              
{this.selectrequired('MobileCode',this.state.MobileCode)} 
                              
                          
                            
                                    
                                      
                                      </>
                                      )}
                                  
                            
                                  {(this.state.shetabGo==4) &&(
<>
<div className="form-group form-group-lg2">
                                        <label>Cart Number</label>
                                        <Select
                                          className="react-select default selectCart"
                                          classNamePrefix="react-select"
                                         
                                         value={this.state.cartSelected}
                                          onChange={this.setCardDef}
                                          options={this.state.currentUserCarts.cards}
                                          placeholder="Cart Number"
                                        />
                                     
                                      </div>
                                      {(!this.state.cartSelected.value) && (
                                          <>
<div className="form-group">
                              <label>Cart Number</label>
                              <IMaskInput className="form-control CardNo" inputMode="numeric"
                              autoComplete="cc-number" 
                              
                              unmask={true}
                              name="cardNumber"
                              placeholder='Cart Number'
                    value={this.state.CardNo}
                    onAccept={this.setCardNo} mask={"0000-0000-0000-0000"}  />
                          
                              
                              
                            </div>
                                    
                                      {this.selectrequired('CardNo',this.state.CardNo)}
                                      
                                      <div className="row">
    <div className="col">
    <div className="form-group">
                              <label>Expiration (mm/yy)</label>
                              <IMaskInput
                               
                               inputMode="numeric"
                               pattern="[0-9]{4}"
  mask={"MM/YY"}
  blocks={{
    YY: {
      mask: "00"
    },
    MM: {
        mask: IMask.MaskedRange,
      from: 1,
      to: 12
    }
  }}
  className="form-control Expiration" 
  autoComplete="cc-exp"
  value={this.state.Expiration}
  unmask={true}
                  name="expDate"
  inputRef={el => this.input = el}  // access to nested input
  // DO NOT USE onChange TO HANDLE CHANGES!
  // USE onAccept INSTEAD
  onAccept={
    this.setExpiration
  }
  placeholder='MM/YY'
  
/>
                             
                          
                              
                              
                            </div>
                                    
                                      {this.selectrequired('Expiration',this.state.Expiration)}
    </div>
    <div className="col">
    <div className="form-group">
                              <label>CVV</label>
                              <IMaskInput className="form-control cvv" pattern="[0-9]*" inputMode="numeric"
                              type="text"
                              maxLength="4"
                              mask={Number}
                              autoComplete="off"
                              unmask={true} // true|false|'typed'
  inputRef={el => this.input = el} 
                    value={this.state.cvv}
                    onAccept={this.setCvv}   />
                              
                          
                              
                              
                            </div>
                                    
                                      {this.selectrequired('cvv',this.state.cvv)}
    </div>
  </div>
  </>
                                      )}
  <div className="form-group">
                              <label>Password</label>
  <div className="input-group">
  <IMaskInput className="form-control pass" pattern="[0-9]*" inputMode="numeric"
                              type="text"
                              
                              mask={Number}
                              autoComplete="off"
                              unmask={true} // true|false|'typed'
  inputRef={el => this.input = el} 
                    value={this.state.pass}
                    onAccept={this.setPass}   />
  <Button
                                    className="btn btn-danger"
                                   
                                    variant="danger"
                                    type="button"
                                    disabled={sendPass}
                                    
                                    onClick={ () => this.handleSendPass() }
                                      >
                                      {sendPass && (
                                        <span className="spinner-border spinner-border-sm  fa-wd"></span>
                                      )}
                                
                                    Send Password
                                  </Button>
                
</div>
                                      
                              
                              
                            </div>
                                    
                                      {this.selectrequired('pass',
                                        this.state.pass
                                      )}
</>
                                     )} 
                                   
  
                                   
                                  </Card.Body>
                                  <Card.Footer>
                                  {(this.state.shetabGo<4) ?(
                                      <>
                                      {(this.state.shetabGo==2) &&(
                                      <>
                                  <div className="form-group">
                                      <button
                                        className="btn btn-danger btn-block"
                                       
                                    variant="secondary"
                                    type="button"
                                    disabled={this.state.loading }
                                    onClick={this.handleSendVerify}
                                      >
                                      {this.state.loading &&  (
                                        <span className="spinner-border spinner-border-sm  fa-wd"></span>
                                      )}
                                        
                                       
                                        <span> Send Code</span>
                                      </button>
                                    </div>
                                    </>
                                      )}
                                      {(this.state.shetabGo==3) &&(
                                      <>
                                  <div className="form-group">
                                      <button
                                        className="btn btn-danger btn-block"
                                       
                                    variant="danger"
                                    type="button"
                                    disabled={this.state.loading}
                                    onClick={this.handleSendVerifyConfirm}
                                      >
                                      {this.state.loading && (
                                        <span className="spinner-border spinner-border-sm  fa-wd"></span>
                                      )}
                                        
                                       
                                        <span> Verify</span>
                                      </button>
                                    </div>
                                    </>
                                      )}

{(this.state.shetabGo<2) &&(
                                      <>
                                  <div className="form-group">
                                      <button
                                        className="btn btn-danger btn-block"
                                       
                                    variant="danger"
                                    type="button"
                                        disabled={this.state.loading}
                                        onClick={this.handleGoNext}
                                                                             >
                                       
                                        <span> Next</span>
                                      </button>
                                    </div>
                                    </>
                                      )}
                                    </>
                                      ):(
<div className="form-group">
                                      <button
                                        className="btn btn-danger btn-wd btn-block"
                                        disabled={this.state.loading}
                                      >
                                        {this.state.loading && (
                                          <span className="spinner-border spinner-border-sm  fa-wd"></span>
                                        )}
                                        <span> Deposit</span>
                                      </button>
                                    </div>
                                      )}
                                      
                                    
                                   
                                  </Card.Footer>
                                </Card>
                              </Form>
                            </Col>
                            <Col md="6">
                              <Card className="stacked-form border-0">
                                <Card.Header>
                                  <Card.Title as="h4">
                                    Select another method.
                                  </Card.Title>
                                </Card.Header>
                                <Card.Body>
                                <div class="list-group">
  <button type="button" className={(this.state.shetabGo > 0)?('list-group-item list-group-item-action  list-group-item-success'):('list-group-item list-group-item-action ')} onClick={ () => {this.setState({shetabGo:0});allValid= false;} } aria-current="true">
    Enter Amount</button>
  <button type="button" className={(this.state.shetabGo > 1)?('list-group-item list-group-item-action  list-group-item-success'):('list-group-item list-group-item-action ')} onClick={ () => {this.setState({shetabGo:1});allValid= false;} }>Select Method</button>
  <button type="button" className={(this.state.shetabGo > 2)?('list-group-item list-group-item-action  list-group-item-success'):('list-group-item list-group-item-action ')} onClick={ () => {this.setState({shetabGo:2});allValid= false;} }>Enter Mobile Number</button>
  <button type="button" className={(this.state.shetabGo > 3)?('list-group-item list-group-item-action  list-group-item-success'):('list-group-item list-group-item-action ')} onClick={ () => {this.setState({shetabGo:3});allValid= false;} }>Verify  Mobile</button>
  <button type="button" className={(this.state.shetabGo > 4)?('list-group-item list-group-item-action  list-group-item-success'):('list-group-item list-group-item-action ')} onClick={ () => {this.setState({shetabGo:4});allValid= false;} }>Enter Cart Number</button>
</div>
                                    
                                </Card.Body>
                              </Card>
                            </Col>
                          </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey="pm">
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
                        <Tab.Pane eventKey="cr">
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
