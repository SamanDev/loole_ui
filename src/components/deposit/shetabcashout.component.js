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
class ShetabCashout extends Component {
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

    currentUser2.cardsdef.push({
      key: "1",
      value: "6104138910794789",
      text: "6104 1389 1079 4789",
      CardNo: "6104 1389 1079 4789",
      Expiration: "1105",
      cvv: "842",
    });
    this.setCardDef(currentUser2.cardsdef[0]);
  }
  render() {
    const currentUser = this.context.uList.currentUser;
    let { loading } = this.state;
    //eventBus.dispatch("eventsDataUser", currentUser);
    return (
      <>
        <Header as="h2" inverted>
          IranShetab Cashout
        </Header>

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
              {currentUser2?.cardsdef.length > 0 && (
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
            </>
          )}
          <Divider />
          <Button.Group size="large" fluid widths="2">
            <Button
              loading={loading}
              disabled={loading}
              color="green"
              onClick={() => onUpdateItem("submit", true)}
            >
              Cashout
            </Button>
            <Button.Or />
            <Button
              type="button"
              color="red"
              onClick={() => this.props.onUpdateItem("openModalCashier", false)}
            >
              Close
            </Button>
          </Button.Group>

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

export default withRouter(ShetabCashout);
