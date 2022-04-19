import React, { Component } from "react";
import Form from "react-validation/build/form";

import CheckButton from "react-validation/build/button";
import { Input } from "semantic-ui-react";
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

    this.setExpiration = this.setExpiration.bind(this);

    this.setDepositPage = this.setDepositPage.bind(this);

    this.handleGoNext = this.handleGoNext.bind(this);

    this.handleShetabDeposit = this.handleShetabDeposit.bind(this);
    this.printErr = this.printErr.bind(this);
    this.updateCheckbox = this.updateCheckbox.bind(this);

    this.state = {
      Expiration: "",
      shetabGo: 0,
      checkbox: "",
      successful: false,
      loading: false,
      message: "",
    };
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

  setExpiration(e) {
    this.setState({
      Expiration: e.target.value,
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
    if (this.state.Expiration.length < 20) {
      return false;
    }
    this.setState({
      message: "",
      successful: false,

      loading: true,
    });
    _showErr = false;
    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      userService
        .createDepositVisaCode(this.state.Expiration)
        .then(
          (response) => {
            if (response.data == "Create event successful") {
              Swal.fire("", "Data saved successfully.", "success").then(
                (result) => {
                  this.props.history.push("/panel/dashboard");
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
  printErr = (error) => {
    if (
      error?.response?.data?.status == 401 ||
      error?.data?.status == 401 ||
      error?.response?.data?.details[0] == "Access is denied"
    ) {
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
              <div style={{ paddingBottom: 90 }}>
                <label>Visa Gift Code</label>

                <Input
                  type="text"
                  value={this.state.Expiration}
                  onChange={this.setExpiration}
                  placeholder="visausd-xxxxxxxxxxxxxx"
                  fluid
                />
              </div>
            </>
          )}

          {this.state.shetabGo < 1 ? (
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
            </>
          ) : (
            <div className="form-group">
              <button
                className="btn btn-danger btn-wd btn-block"
                disabled={this.state.loading}
                loading={this.state.loading}
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
