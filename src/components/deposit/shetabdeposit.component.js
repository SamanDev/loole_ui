import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from "react-select";
import { IMaskInput } from "react-imask";
import {  withRouter} from 'react-router-dom';
import $ from "jquery";
import AuthService from "services/auth.service";
import userService from "services/user.service";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import eventBus from "views/eventBus";
import {
    Row,
    Col,
    Card,
    Button
  
  } from "react-bootstrap";
  const required = (value,props) => {
      
      if(typeof props.passReadyprp !== "undefined"){
        if (!value && props.passReadyprp) {
            return (
              <div className="alert alert-danger" role="alert">
                This field is required!
              </div>
            );
            
          }
       
      }else{
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
      
    }
}
  };
  

class ShetabDeposit extends Component {
  constructor(props) {
    super(props);
    this.setAmount = this.setAmount.bind(this);
    this.setCardDef = this.setCardDef.bind(this);
    this.setMobile = this.setMobile.bind(this);
    this.setMobileCode = this.setMobileCode.bind(this);
    this.setCardNo = this.setCardNo.bind(this);
    this.setExpiration = this.setExpiration.bind(this);
    this.setCvv = this.setCvv.bind(this);
    this.setPass = this.setPass.bind(this);
    
    
    this.setDepositPage = this.setDepositPage.bind(this);

    this.handleGoNext = this.handleGoNext.bind(this);
    this.handleSendVerify = this.handleSendVerify.bind(this);
    this.handleSendVerifyConfirm = this.handleSendVerifyConfirm.bind(this);
    this.handleShetabDeposit = this.handleShetabDeposit.bind(this);
    this.handleShetabMethod = this.handleShetabMethod.bind(this);
    this.handleSendPass = this.handleSendPass.bind(this);
    this.updateCheckbox = this.updateCheckbox.bind(this);

    this.state = {
      currentUserCarts: this.props.token,
      cartSelected: {
        value: "",

        label: "Select Cart...",
      },
      shetabMethod: {
        value: "",

        label: "Select Method...",
      },
      shetabGo: 0,
      Amount: "10",
      Mobile: "9122266208",
      MobileCode: "",
      
      CardNo: "",
      Expiration: "",
      cvv: "1",
      pass: "",
      passReady:false,
      checkbox:"",
      successful: false,
      loading: false,
      message: ""
    };
  }
  setAmount(e) {
    this.setState({
      Amount: e,
      submit: false,
    });
  }
  setMobile(e) {
   
    this.setState({
      Mobile: e,
      submit: false,
    });
  }
  setMobileCode(e) {
    
    this.setState({
      MobileCode: e,
      submit: false,
    });
  }
  handleShetabMethod(e) {
    

    this.setState({
      shetabMethod: e,
      submit: false,
    });
    
  }
  setDepositPage(e) {
    
    this.setState({
      shetabGo: e,
      successful: false,
      message: "",
      submit: false,
      loading: false,
    });
    
  }
  setPass(e) {
    this.setState({
      pass: e,
      submit: false,
      passReady:true,
    });
    
  }
  setCardNo(e) {
    this.setState({
      CardNo: e,
      submit: false,
    });
  
  }
  setCardDef(e) {
   
    if ($(".CardNo:visible").length > 0) {
      setTimeout(function () {
        $(".CardNo").focus();
       
      }, 100);
    }
    this.setState({
      cartSelected: e,
      CardNo: e.value,
      Expiration: e.expiration,
      cvv: e.cvv,
      submit: false,
    });
  }
  setExpiration(e) {
    
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
  
  updateCheckbox(e) {
    this.setState({
      checkbox: e.target.checked
    });
  }
  
  handleGoNext(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
      loading: true
    });
   

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {

        this.setState({
            successful: false,
            loading: false
          });

      this.setState({ shetabGo: this.state.shetabGo + 1 });
    }else {
        this.setState({
          successful: false,
          loading: false
        });
      }
  }
  handleShetabDeposit(e) {
   
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
      
      loading: true
    });
   

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {

      userService
        .createDepositShetab(
          this.state.Mobile,
          this.state.CardNo,
          this.state.Amount,
          
          
          this.state.cvv,
          this.state.Expiration,
         
          this.state.pass
        )
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
          successful: false,
          loading: false
        });
      }
  }
  handleSendVerify(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
      loading: true
    });
   

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      userService.createDepositShetabVerify(this.state.Mobile).then(
        (response) => {
          if (response.data == "OK") {
            Swal.fire("", "Code sent to your mobile number successfully.", "success").then(
              (result) => {
              

                this.setState({
                  shetabGo: this.state.shetabGo + 1,
                  successful: false,
                  message: "",
                  submit: false,
                  loading: false,
                });
              }
            );
          } else {
            const resMessage =
              (response.response &&
                response.response.data &&
                response.response.data.message) ||
              response.message ||
              response.toString();

            this.setState({
              successful: false,
              message: "",
              submit: false,
              loading: false,
            });

            Swal.fire("", resMessage, "error");
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
    }  else {
        this.setState({
          successful: false,
          loading: false
        });
      }
  }
  handleSendVerifyConfirm(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
      loading: true
    });
   

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      userService
        .createDepositShetabVerifyConfirm(
          this.state.Mobile,
          this.state.MobileCode
        )
        .then(
          (response) => {
            if (response == "OK") {
              Swal.fire("", "Data saved successfully.", "success").then(
                (result) => {
                 
                  this.setState({
                    shetabGo: this.state.shetabGo + 1,
                    successful: false,
                    message: "",
                    submit: false,
                    loading: false,
                  });
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
    }  else {
        this.setState({
          successful: false,
          loading: false
        });
      }
  }
  handleSendPass(e) {

    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
   
        
      
     
    });
   

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
        
      userService
        .createDepositShetabPass(
   
          this.state.Mobile,
          this.state.CardNo,
          this.state.Amount,
          
          
          this.state.cvv,
          this.state.Expiration,
        )
        .then(
          (response) => {
            if (response == "Ok") {
              Swal.fire("", "Password sent successfully.", "success").then(
                (result) => {
                  

                  this.setState({
                    passReady:true,
                    successful: false,
                    message: "",
                    submit: false,
                    loading: false,
                  });
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
          successful: false,
          loading: false
        });
      }
  }

  handlePMDeposit(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
      loading: true
    });
   

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
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
        successful: false,
        loading: false
      });
    }
  }
  

  render() {
   
    var currentUser = JSON.parse(JSON.stringify(this.state.currentUserCarts));
    if(this.state.cartSelected.value == '1'){
      this.setCardDef(currentUser.cardsdef[0]);
    }
    
      
      if (!currentUser.payMethod) {
      currentUser.payMethod = [
          
        {
          value: "",

          label: "Select  Method...",
        },
        
      ];
      currentUser.cashierGateways.map((item, i) => {
        if(item.mode=='IranShetab' && item.active){
        currentUser.payMethod.push({
          value: item.name,
          label: item.name,
        })
      }
    
      })
     // this.handleShetabMethod(currentUser.payMethod[0]);
    }
     //eventBus.dispatch("eventsDataUser", currentUser);
    return (
      <>
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
                                    {this.state.shetabGo == 0 && (
                                      <>
                                        <div className="form-group form-group-lg2">
                                          <label>Amount</label>
                                          <div className="input-group">
                                            <span
                                              className="input-group-text"
                                              id="inputGroup-sizing-lg"
                                            >
                                              $
                                            </span>
                                            <IMaskInput
                                              className="form-control Amount form-control-lg2"
                                              type="tel"
                                              pattern="[1-9]{1}[0-9]"
                                              mask={"0000"}
                                              inputRef={(el) =>
                                                (this.input = el)
                                              }
                                              value={this.state.Amount}
                                              onAccept={this.setAmount}
                                              
                                            />
                                          </div>
                                          <Input
                                        type="hidden"
                                        
                                        value={this.state.Amount}
                                       
                                        
                                        validations={[required]}
                                      />
                                        </div>
                                        
                                      </>
                                    )}
                                    {this.state.shetabGo == 1 && (
                                      <>
                                        <div className="form-group form-group-lg2">
                                          <label>Select Method</label>
                                          <Select
                                            className="react-select default selectMethod"
                                            classNamePrefix="react-select selectMethod"
                                            value={this.state.shetabMethod}
                                            onChange={this.handleShetabMethod}
                                            
                                            options={
                                              currentUser
                                                .payMethod
                                            }
                                          />
                                          <Input
                                        type="hidden"
                                        
                                        value={this.state.shetabMethod.value}
                                       
                                        
                                        validations={[required]}
                                      />
                                        </div>
                                        
                                      </>
                                    )}
                                    {this.state.shetabGo == 2 && (
                                      <>
                                        <div className="form-group form-group-lg2">
                                          <label>Mobile</label>
                                          <div className="input-group">
                                            <span
                                              className="input-group-text"
                                              id="inputGroup-sizing-lg"
                                            >
                                              +98
                                            </span>
                                            <IMaskInput
                                              className="form-control Mobile form-control-lg2"
                                              type="tel"
                                              pattern="[0-9]"
                                              unmask={true}
                                              mask={"000 000 0000"}
                                              inputRef={(el) =>
                                                (this.input = el)
                                              }
                                              value={this.state.Mobile}
                                              onAccept={this.setMobile}
                                            />
                                          </div>
                                          <Input
                                        type="hidden"
                                        
                                        value={this.state.Mobile}
                                       
                                        
                                        validations={[required]}
                                      />
                                        </div>

                                       
                                      </>
                                    )}
                                    {this.state.shetabGo == 3 && (
                                      <>
                                        <div className="form-group ">
                                          <label>Code</label>

                                          <IMaskInput
                                            className="form-control MobileCode"
                                            type="tel"
                                            pattern="[0-9]"
                                            unmask={true}
                                            mask={"0000000"}
                                            inputRef={(el) => (this.input = el)}
                                            value={this.state.MobileCode}
                                            onAccept={this.setMobileCode}
                                          />
                                          <Input
                                        type="hidden"
                                        
                                        value={this.state.MobileCode}
                                       
                                        
                                        validations={[required]}
                                      />
                                        </div>

                                        
                                      </>
                                    )}

                                    {this.state.shetabGo == 4 && (
                                      <>
                                        <div className="form-group form-group-lg2">
                                          <label>Cart Number</label>
                                          <Select
                                            className="react-select default selectCart"
                                            classNamePrefix="react-select"
                                            value={this.state.cartSelected}
                                            onChange={this.setCardDef}
                                            options={
                                              currentUser.cardsdef
                                            }
                                            placeholder="Cart Number"
                                          />
                                          
                                        </div>
                                        {!this.state.cartSelected.value && (
                                          <>
                                            <div className="form-group">
                                              <label>Cart Number</label>
                                              <IMaskInput
                                                className="form-control CardNo"
                                                inputMode="numeric"
                                                autoComplete="cc-number"
                                                unmask={true}
                                                name="cardNumber"
                                                placeholder="Cart Number"
                                                value={this.state.CardNo}
                                                onAccept={this.setCardNo}
                                                mask={"0000-0000-0000-0000"}
                                              />
                                              <Input
                                        type="hidden"
                                        
                                        value={this.state.CardNo}
                                       
                                        
                                        validations={[required]}
                                      />
                                            </div>

                                            

                                            <div className="row">
                                              <div className="col">
                                                <div className="form-group">
                                                  <label>
                                                    Expiration (mm/yy)
                                                  </label>
                                                  <IMaskInput
                                                    inputMode="numeric"
                                                    pattern="[0-9]{4}"
                                                    mask={"MM/YY"}
                                                    blocks={{
                                                      YY: {
                                                        mask: "00",
                                                      },
                                                      MM: {
                                                        mask: IMask.MaskedRange,
                                                        from: 1,
                                                        to: 12,
                                                      },
                                                    }}
                                                    className="form-control Expiration"
                                                    autoComplete="cc-exp"
                                                    value={
                                                      this.state.Expiration
                                                    }
                                                    unmask={true}
                                                    name="expDate"
                                                    inputRef={(el) =>
                                                      (this.input = el)
                                                    } // access to nested input
                                                    // DO NOT USE onChange TO HANDLE CHANGES!
                                                    // USE onAccept INSTEAD
                                                    onAccept={
                                                      this.setExpiration
                                                    }
                                                    placeholder="MM/YY"
                                                  />
                                                  <Input
                                        type="hidden"
                                        
                                        value={this.state.Expiration}
                                       
                                        
                                        validations={[required]}
                                      />
                                                </div>

                                                
                                              </div>
                                              <div className="col">
                                                <div className="form-group">
                                                  <label>CVV</label>
                                                  <IMaskInput
                                                    className="form-control cvv"
                                                    pattern="[0-9]*"
                                                    inputMode="numeric"
                                                    type="text"
                                                    maxLength="4"
                                                    mask={Number}
                                                    autoComplete="off"
                                                    unmask={true} // true|false|'typed'
                                                    inputRef={(el) =>
                                                      (this.input = el)
                                                    }
                                                    value={this.state.cvv}
                                                    onAccept={this.setCvv}
                                                  />
                                                  <Input
                                        type="hidden"
                                        
                                        value={this.state.cvv}
                                       
                                        
                                        validations={[required]}
                                      />
                                                </div>

                                                
                                              </div>
                                            </div>
                                          </>
                                        )}
                                        <div className="form-group">
                                          <label>Password</label>
                                          <div className="input-group">
                                            <IMaskInput
                                              className="form-control pass"
                                              pattern="[0-9]*"
                                              inputMode="numeric"
                                              type="text"
                                              mask={Number}
                                              autoComplete="off"
                                              unmask={true} // true|false|'typed'
                                              inputRef={(el) =>
                                                (this.input = el)
                                              }
                                              value={this.state.pass}
                                              onAccept={this.setPass}
                                            />
                                            <Button
                                              className="btn btn-danger"
                                              variant="danger"
                                              type="button"
                                              disabled={this.state.passReady}
                                              onClick={this.handleSendPass}
                                            >
                                              Send Password
                                            </Button>
                                          </div>
                                          <Input
                                        type="hidden"
                                        className="form-control eVoucher"
                                        pattern="[0-9]*"
                                        id="setpass"
                                        value={this.state.pass}
                                        passReadyprp={this.state.passReady}
                                        
                                        validations={[required]}
                                      />
                                        </div>

                                       
                                      </>
                                    )}
                                  </Card.Body>
                                  <Card.Footer>
                                    {this.state.shetabGo < 4 ? (
                                      <>
                                        {this.state.shetabGo == 2 && (
                                          <>
                                            <div className="form-group">
                                              <button
                                                className="btn btn-danger btn-block"
                                                variant="secondary"
                                                type="button"
                                                disabled={this.state.loading}
                                                onClick={this.handleSendVerify}
                                              >
                                                {this.state.loading && (
                                                  <span className="spinner-border spinner-border-sm  fa-wd"></span>
                                                )}

                                                <span> Send Code</span>
                                              </button>
                                            </div>
                                          </>
                                        )}
                                        {this.state.shetabGo == 3 && (
                                          <>
                                            <div className="form-group">
                                              <button
                                                className="btn btn-danger btn-block"
                                                variant="danger"
                                                type="button"
                                                disabled={this.state.loading}
                                                onClick={
                                                  this.handleSendVerifyConfirm
                                                }
                                              >
                                                {this.state.loading && (
                                                  <span className="spinner-border spinner-border-sm  fa-wd"></span>
                                                )}

                                                <span> Verify</span>
                                              </button>
                                            </div>
                                          </>
                                        )}

                                        {this.state.shetabGo < 2 && (
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
                                    ) : (
                                      <div className="form-group">
                                        <button
                                          className="btn btn-danger btn-wd btn-block"
                                          disabled={!this.state.passReady}
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
                                <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
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
                                  <div className="list-group">
                                    <button
                                      type="button"
                                      className={
                                        this.state.shetabGo == 0
                                          ? "list-group-item list-group-item-action  list-group-item-success"
                                          : "list-group-item list-group-item-action list-group-item-warning"
                                      }
                                      onClick={() => {
                                        this.setDepositPage(0);
                                      }}
                                      aria-current="true"
                                    >
                                      Enter Amount
                                    </button>
                                    <button
                                      type="button"
                                      className={
                                        this.state.shetabGo == 1
                                          ? "list-group-item list-group-item-action  list-group-item-success"
                                          : "list-group-item list-group-item-action list-group-item-warning"
                                      }
                                      onClick={() => {
                                        this.setDepositPage(1);
                                      }}
                                    >
                                      Select Method
                                    </button>
                                    <button
                                      type="button"
                                      className={
                                        this.state.shetabGo == 2
                                          ? "list-group-item list-group-item-action  list-group-item-success"
                                          : "list-group-item list-group-item-action list-group-item-warning"
                                      }
                                      onClick={() => {
                                        this.setDepositPage(2);
                                      }}
                                    >
                                      Enter Mobile Number
                                    </button>
                                    <button
                                      type="button"
                                      className={
                                        this.state.shetabGo == 3
                                          ? "list-group-item list-group-item-action  list-group-item-success"
                                          : "list-group-item list-group-item-action list-group-item-warning"
                                      }
                                      onClick={() => {
                                        this.setDepositPage(3);
                                      }}
                                    >
                                      Verify Mobile
                                    </button>
                                    <button
                                      type="button"
                                      className={
                                        this.state.shetabGo == 4
                                          ? "list-group-item list-group-item-action  list-group-item-success"
                                          : "list-group-item list-group-item-action list-group-item-warning"
                                      }
                                      onClick={() => {
                                        this.setDepositPage(4);
                                      }}
                                    >
                                      Enter Cart Number
                                    </button>
                                  </div>
                                </Card.Body>
                              </Card>
                            </Col>
                          </Row>
        </>
    );
  }
}

export default withRouter(ShetabDeposit) ;