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
  


class ShetabCashout extends Component {
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
          this.state.Amount,
          this.state.CardNo,
          this.state.Expiration,
          this.state.cvv,
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
          this.state.Amount,
          this.state.CardNo,
          this.state.Expiration,
          this.state.cvv
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
    var currentUser = this.state.currentUserCarts;
    
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
                                      Iran Shetab Cashout
                                    </Card.Title>
                                  </Card.Header>
                                  <Card.Body>
                                  <div className="form-group form-group-lg2">
                                          <label>Cart Number</label>
                                          <Select
                                            className="react-select default selectCart"
                                            classNamePrefix="react-select"
                                            value={this.state.cartSelected}
                                            onChange={this.setCardDef}
                                           
                                            placeholder="Cart Number"
                                          />
                                          
                                        </div>
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
                                        </div>
                                        
                                    
                                  </Card.Body>
                                  <Card.Footer>
                                    
                                      <div className="form-group">
                                        <button
                                          className="btn btn-success btn-wd btn-block"
                                          disabled={this.state.loading}
                                        >
                                          {this.state.loading && (
                                            <span className="spinner-border spinner-border-sm  fa-wd"></span>
                                          )}
                                          <span> Cashout</span>
                                        </button>
                                      </div>
                                    
                                  </Card.Footer>
                                </Card>
                              </Form>
                            </Col>
                            <Col md="6">
                             
                            </Col>
                          </Row>
        </>
    );
  }
}

export default withRouter(ShetabCashout) ;