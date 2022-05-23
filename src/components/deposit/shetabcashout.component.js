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

    this.setCardDef = this.setCardDef.bind(this);

    this.setCardNo = this.setCardNo.bind(this);

    this.handleShetabCashout = this.handleShetabCashout.bind(this);
    this.handleSelectCard = this.handleSelectCard.bind(this);

    this.updateCheckbox = this.updateCheckbox.bind(this);

    this.state = {
      cartSelected: {},

      Amount: "10",

      CardNo: "",

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

  handleSelectCard(value, data) {
    var _val = {
      value: data.value.toUpperCase(),
      text: value.target.innerText,
      key: value.target.innerText,
    };

    this.setCardDef(_val);
  }

  setCardNo(e) {
    this.setState({
      CardNo: e,
      submit: false,
    });
  }
  setCardDef(e) {
    console.log(e);
    this.setState({
      cartSelected: e,
      CardNo: e.value,

      submit: false,
    });
  }

  updateCheckbox(e) {
    this.setState({
      checkbox: e.target.checked,
    });
  }

  handleShetabCashout(e) {
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
        .createCashoutShetab(this.state.CardNo, this.state.Amount)
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

  componentDidMount() {
    currentUser2 = this.context.uList.currentUser;

    currentUser2.cardsdef = [];

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
      }
    });
    if (currentUser2.cardsdef.length > 1) {
      this.setCardDef(currentUser2.cardsdef[0]);
    }
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
