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
      Mobile: "9126666820",
      MobileCode: "",

      CardNo: "",
      Expiration: "1105",
      cvv: "842",
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
      value: data.value.toUpperCase(),
      text: value.target.innerText,
    };
    this.setMethodPay(_val);
  }
  setMethodPay(_val) {
    this.setState({
      shetabMethod: _val,
      submit: false,
    });
  }
  handleSelectCard(value, data) {
    var _val = {
      value: data.value.toUpperCase(),
      text: value.target.innerText,
      key: value.target.innerText,

      CardNo: value.target.innerText,
      Expiration: value.target.attributes.Expiration.nodeValue,
      cvv: value.target.attributes.cvv.nodeValue,
    };

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
    console.log(e);
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
          this.state.txID
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

    if (this.checkBtn.context._errors.length === 0) {
      userService.createDepositShetabVerify(this.state.Mobile).then(
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
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      userService
        .createDepositShetabGetPassCode(
          this.state.Mobile,
          this.state.CardNo,
          this.state.Amount,

          this.state.cvv,
          this.state.Expiration
        )
        .then(
          (response) => {
            if (response.status == "SUCCESS") {
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
  }
  render() {
    const currentUser = this.context.uList.currentUser;

    //eventBus.dispatch("eventsDataUser", currentUser);
    return (
      <>
        <Header as="h2" inverted>
          VisaGiftCode Deposit
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
              <div style={{ background: "rgba(0,0,0,0.3)", padding: 8 }}>
                <p style={{ padding: 0 }}>
                  <img
                    src="https://glxy15xx.site/images/visa.png"
                    style={{
                      marginBottom: 15,
                      maxWidth: "80%",
                      display: "block",
                    }}
                  ></img>
                  To use this service you just need to get a visa gift code. For
                  your convenience, here few Visa Gateway vendor sites are
                  listed below. You can easily purchase up to 50 million in
                  online merchandise from the vendor sites and get the chip
                  instantly by entering the visa gift code.
                </p>
                <p>Requires authentication only for the first purchase.</p>
                <p>
                  <a href="http://asanarz.net" target="_blank">
                    http://asanarz.net
                  </a>
                </p>
              </div>
            </>
          )}

          {this.state.shetabGo == 1 && (
            <>
              <div className="form-group " style={{ paddingBottom: 90 }}>
                <label>Visa Gift Code</label>

                <IMaskInput
                  className="form-control MobileCode"
                  type="tel"
                  pattern="[0-9]"
                  unmask={true}
                  mask={"0000000000000"}
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

          {this.state.shetabGo < 2 ? (
            <>
              {this.state.shetabGo == 0 && (
                <>
                  <div className="form-group">
                    <button
                      className="btn btn-danger btn-block"
                      variant="secondary"
                      type="button"
                      onClick={() => {
                        this.setDepositPage(1);
                      }}
                    >
                      {this.state.loading && (
                        <span className="spinner-border spinner-border-sm  fa-wd"></span>
                      )}

                      <span> Ok, Go to pay</span>
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

                      <span> Submit</span>
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
