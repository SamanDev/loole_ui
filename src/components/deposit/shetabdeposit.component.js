import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { IMaskInput } from "react-imask";
import { withRouter } from "react-router-dom";
import $ from "jquery";
import userService from "services/user.service";
import Swal from "sweetalert2";
import { Row, Col, Card } from "react-bootstrap";
import UserContext from "context/UserState";
import {
  Button,
  Divider,
  Header,
  Label,
  Modal,
  Segment,
  Step,
  Icon,
  Dropdown,
  Select,
} from "semantic-ui-react";
var _showErr = false;
const required = (value, props) => {
  if (typeof props.passReadyprp !== "undefined") {
    if (!value && props.passReadyprp) {
      _showErr = true;
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  } else {
    if (!value) {
      _showErr = true;
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  }
};
var currentUser2;
class ShetabDeposit extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.setAmount = this.setAmount.bind(this);
    this.settxID = this.settxID.bind(this);
    this.setCardDef = this.setCardDef.bind(this);
    this.setMobile = this.setMobile.bind(this);
    this.setMobileCode = this.setMobileCode.bind(this);
    this.setCardNo = this.setCardNo.bind(this);
    this.setExpiration = this.setExpiration.bind(this);
    this.setCvv = this.setCvv.bind(this);
    this.setPass = this.setPass.bind(this);
    this.printErr = this.printErr.bind(this);
    this.setDepositPage = this.setDepositPage.bind(this);

    this.handleGoNext = this.handleGoNext.bind(this);
    this.handleSendVerify = this.handleSendVerify.bind(this);
    this.handleSendVerifyConfirm = this.handleSendVerifyConfirm.bind(this);
    this.handleShetabDeposit = this.handleShetabDeposit.bind(this);
    this.handleSelectCard = this.handleSelectCard.bind(this);
    this.setMethodPay = this.setMethodPay.bind(this);
    this.handleShetabMethod = this.handleShetabMethod.bind(this);
    this.handleSendPass = this.handleSendPass.bind(this);
    this.updateCheckbox = this.updateCheckbox.bind(this);

    this.state = {
      cartSelected: {},
      shetabMethod: {},
      txID: 0,
      shetabGo: 0,
      Amount: "10",
      Mobile: "",
      MobileCode: "",

      CardNo: "",
      Expiration: "",
      cvv: "",
      pass: "",
      passReady: false,
      checkbox: "",
      successful: false,
      loading: false,
      message: "",
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
  handleShetabMethod(value, data) {
    var _val = {
      key: value.target.innerText,
      value: value.target.innerText,
      text: value.target.innerText,
    };
    //console.log(JSON.stringify(_val));
    this.setMethodPay(_val);
  }
  setMethodPay(_val) {
    this.setState({
      shetabMethod: _val,
      submit: false,
    });
  }
  handleSelectCard(value, data) {
    var _val = {};
    data?.options.map((item, i) => {
      if (item.value == data.value) {
        _val = {
          value: data.value,
          text: item.text,
          key: item.key,

          CardNo: item.CardNo,
          Expiration: item.Expiration,
          cvv: item.cvv,
        };
      }
    });
    //console.log(_val);

    this.setCardDef(_val);
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
  printErr = (error) => {
    if (error?.response?.data?.status == 401 || error?.data?.status == 401) {
      prop.onUpdateItem("openModalLogin", true);
      localStorage.setItem("user", JSON.stringify(defUser));
      prop.onUpdateItem("currentUser", defUser);
    } else {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.error ||
        error.toString();

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: resMessage,
      });
    }
    this.setState({
      message: "",
      successful: false,
      loading: false,
    });
  };
  setPass(e) {
    if (e) {
      this.setState({
        pass: e,
        submit: false,
        passReady: true,
      });
    } else {
      this.setState({
        pass: e,
        submit: true,
        passReady: false,
      });
    }
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
    //console.log(e);
    this.setState({
      cartSelected: e,
      CardNo: e.value,
      Expiration: e.Expiration,
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
  settxID(e) {
    this.setState({
      txID: e,
    });
  }
  setCvv(e) {
    this.setState({
      cvv: e,
      submit: false,
      passReady: false,
    });
  }

  updateCheckbox(e) {
    this.setState({
      checkbox: e.target.checked,
    });
  }

  handleGoNext(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
      loading: true,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      this.setState({
        successful: false,
        loading: false,
      });

      this.setState({ shetabGo: this.state.shetabGo + 1 });
    } else {
      this.setState({
        successful: false,
        loading: false,
      });
    }
  }
  handleShetabDeposit(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,

      loading: true,
    });
    _showErr = false;
    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      userService
        .createDepositShetabDoTransaction(
          this.state.Mobile,
          this.state.CardNo,
          this.state.Amount,

          this.state.cvv,
          this.state.Expiration,

          this.state.pass,
          this.state.txID,
          this.state.shetabMethod.value
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
              this.printErr(response);
            }
          },
          (error) => {
            this.printErr(error);
          }
        )
        .catch((error) => {
          this.printErr(error);
        });
    } else {
      this.setState({
        successful: false,
        loading: false,
      });
    }
  }
  handleSendVerify(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
      loading: true,
    });

    this.form.validateAll();
    //console.log(this.state.Mobile, this.state.shetabMethod.value);
    if (this.checkBtn.context._errors.length === 0) {
      userService
        .createDepositShetabVerify(
          this.state.Mobile,
          this.state.shetabMethod.value
        )
        .then(
          (response) => {
            if (response.data == "OK") {
              Swal.fire(
                "",
                "Code sent to your mobile number successfully.",
                "success"
              ).then((result) => {
                this.setState({
                  shetabGo: this.state.shetabGo + 1,
                  successful: false,
                  message: "",
                  submit: false,
                  loading: false,
                });
              });
            } else {
              this.printErr(response.data);
            }
          },
          (error) => {
            this.printErr(error);
          }
        )
        .catch((error) => {
          this.printErr(error);
        });
    } else {
      this.setState({
        successful: false,
        loading: false,
      });
    }
  }
  handleSendVerifyConfirm(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
      loading: true,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      userService
        .createDepositShetabVerifyConfirm(
          this.state.Mobile,
          this.state.MobileCode,
          this.state.shetabMethod.value
        )
        .then(
          (response) => {
            if (response.data == "OK") {
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
              this.printErr(response.data);
            }
          },
          (error) => {
            this.printErr(error);
          }
        )
        .catch((error) => {
          this.printErr(error);
        });
    } else {
      this.setState({
        successful: false,
        loading: false,
      });
    }
  }
  handleSendPass(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
      passReady: true,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      userService
        .createDepositShetabGetPassCode(
          this.state.Mobile,
          this.state.CardNo,
          this.state.Amount,

          this.state.cvv,
          this.state.Expiration,
          this.state.shetabMethod.value
        )
        .then(
          (response) => {
            if (response.txID) {
              this.settxID(response.txID);

              Swal.fire("", "Password sent successfully.", "success").then(
                (result) => {
                  this.setState({
                    passReady: true,
                    successful: false,
                    message: "",
                    submit: false,
                    loading: false,
                  });
                }
              );
            } else {
              this.printErr(response);
            }
          },
          (error) => {
            this.printErr(error);
          }
        )
        .catch((error) => {
          this.printErr(error);
        });
    } else {
      this.setState({
        successful: false,
        loading: false,
      });
    }
  }
  componentDidMount() {
    currentUser2 = this.context.uList.currentUser;
    currentUser2.payMethod = [];
    currentUser2.cardsdef = [];
    currentUser2?.cashierGateways.map((item, i) => {
      if (item.mode == "IranShetab" && item.active) {
        currentUser2.payMethod.push({
          key: i.toString(),
          value: item.name,
          text: item.name,
        });
      }
    });

    currentUser2.cardsdef.push({
      key: "0",
      value: "",
      text: "Add New Cart",
      CardNo: "",
      Expiration: "",
      cvv: "",
    });
    currentUser2?.bankInfos.map((item, i) => {
      if (item.active) {
        let joy = item.cardNumber.match(/.{1,4}/g);
        var cartSpace = joy.join(" ");
        currentUser2.cardsdef.push({
          key: item.id.toString(),
          value: item.cardNumber,
          text: cartSpace,
          CardNo: cartSpace,
          Expiration: item.expiration,
          cvv: item.cvv,
        });
        this.setState({
          Mobile: item.mobile.substring(1),
        });
      }
    });
    if (currentUser2.cardsdef.length > 1) {
      this.setCardDef(currentUser2.cardsdef[1]);
    }
    //console.log(currentUser2.cardsdef);
    this.setMethodPay(currentUser2.payMethod[0]);
  }
  render() {
    const currentUser = this.context.uList.currentUser;

    //eventBus.dispatch("eventsDataUser", currentUser);
    return (
      <>
        <Header as="h2" inverted>
          IranShetab Deposit
        </Header>
        <Step.Group
          unstackable
          size="mini"
          widths={3}
          className="mystep"
          style={{ background: "transparent" }}
        >
          <Step
            active={this.state.shetabGo == 0}
            completed={this.state.shetabGo > 0}
            onClick={() => {
              this.setDepositPage(0);
            }}
          >
            <Icon name="info" />
            <Step.Content>
              <Step.Title>Info</Step.Title>
            </Step.Content>
          </Step>

          <Step
            active={this.state.shetabGo == 1}
            completed={this.state.shetabGo > 1}
            onClick={() => {
              this.setDepositPage(1);
            }}
          >
            <Icon name="mobile" />
            <Step.Content>
              <Step.Title>Confirm</Step.Title>
            </Step.Content>
          </Step>

          <Step
            active={this.state.shetabGo == 2}
            completed={this.state.shetabGo > 2}
            onClick={() => {
              this.setDepositPage(2);
            }}
          >
            <Icon name="payment" />
            <Step.Content>
              <Step.Title>Pay</Step.Title>
            </Step.Content>
          </Step>
        </Step.Group>

        <Form
          onSubmit={this.handleShetabDeposit}
          ref={(c) => {
            this.form = c;
          }}
        >
          {this.state.shetabGo == 0 && (
            <>
              <div className="form-group form-group-lg2">
                <label>Amount</label>
                <div className="input-group">
                  <span className="input-group-text" id="inputGroup-sizing-lg">
                    $
                  </span>
                  <IMaskInput
                    className="form-control Amount form-control-lg2"
                    type="tel"
                    pattern="[1-9]{1}[0-9]"
                    mask={"0000"}
                    inputRef={(el) => (this.input = el)}
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
              <label>Select Method</label>

              <Select
                placeholder="Select Method"
                fluid
                value={this.state.shetabMethod.value}
                onChange={this.handleShetabMethod}
                options={currentUser2?.payMethod}
              />

              <Input
                type="hidden"
                value={this.state.shetabMethod.value}
                validations={[required]}
              />
              <div className="form-group form-group-lg2">
                <label>Mobile</label>
                <div className="input-group">
                  <span className="input-group-text" id="inputGroup-sizing-lg">
                    +98
                  </span>
                  <IMaskInput
                    className="form-control Mobile form-control-lg2"
                    type="tel"
                    pattern="[0-9]"
                    unmask={true}
                    mask={"000 000 0000"}
                    inputRef={(el) => (this.input = el)}
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

          {this.state.shetabGo == 1 && (
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

          {this.state.shetabGo == 2 && (
            <>
              {currentUser2?.cardsdef.length > 1 && (
                <div className="form-group form-group-lg2">
                  <label>Cart Number</label>
                  <Select
                    placeholder="Select Cart"
                    fluid
                    value={this.state.cartSelected.value}
                    onChange={this.handleSelectCard}
                    options={currentUser2?.cardsdef}
                  />
                </div>
              )}
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
                        <label>Expiration (YY/MM)</label>
                        <IMaskInput
                          inputMode="numeric"
                          pattern="[0-9]{4}"
                          mask={"YY/MM"}
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
                          value={this.state.Expiration}
                          unmask={true}
                          name="expDate"
                          inputRef={(el) => (this.input = el)} // access to nested input
                          // DO NOT USE onChange TO HANDLE CHANGES!
                          // USE onAccept INSTEAD
                          onAccept={this.setExpiration}
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
                          inputRef={(el) => (this.input = el)}
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
                    inputRef={(el) => (this.input = el)}
                    value={this.state.pass}
                    onAccept={this.setPass}
                  />
                  <Button
                    color="red"
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

          {this.state.shetabGo < 2 ? (
            <>
              {this.state.shetabGo == 0 && (
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
              {this.state.shetabGo == 1 && (
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

              {this.state.shetabGo < 2 && this.state.shetabGo > 1 && (
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

          <CheckButton
            style={{ display: "none" }}
            ref={(c) => {
              this.checkBtn = c;
            }}
          />
        </Form>
      </>
    );
  }
}

export default withRouter(ShetabDeposit);
