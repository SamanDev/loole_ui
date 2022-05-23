import React, { useState, useEffect } from "react";
import { IMaskInput } from "react-imask";
import { withRouter } from "react-router-dom";
import userService from "services/user.service";
import CryptoList from "components/CryptoList";
import { Card } from "react-bootstrap";

import {
  Button,
  Select,
  Divider,
  Header,
  Form,
  Input,
  Label,
  Modal,
  Segment,
} from "semantic-ui-react";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
function CrDeposit(prop) {
  const history = useHistory();
  const [myState, setMyState] = useState({
    list: [
      { id: "amount", val: "10" },
      { id: "coin", val: "BTC" },
      { id: "hasError", val: null },
      { id: "loading", val: false },
      { id: "submit", val: false },
    ],
  });
  const setAmount = (e) => {
    onUpdateItem("amount", e);
  };
  const updateHandler = (e, data) => {
    var val = data.value;
    if (!data.value) {
      val = data.checked;
      if (data.checked == false) {
        val = "";
      }
    }
    onUpdateItem(data.name, val);
    if (val != "") {
      onUpdateItem("hasError", false);
    }
  };
  const findStateId = (st, val) => {
    return st.list.filter(function (v) {
      return v.id === val;
    })[0].val;
  };
  const onUpdateItem = (key, val) => {
    setMyState(() => {
      var list = myState.list.map((item) => {
        if (item.id === key) {
          item.val = val;
        }
        return item;
      });

      return {
        list: list,
      };
    });
  };
  const getError = (data, _content, _pointing) => {
    var _error = null;
    if (findStateId(myState, "submit")) {
      if (data == "") {
        _error = { content: _content, pointing: _pointing };
        if (_pointing == "") {
          _error = true;
        }
      }
    }
    if (_error && !findStateId(myState, "hasError")) {
      onUpdateItem("hasError", true);
    }
    return _error;
  };
  const handleSubmit = () => {
    console.log(myState);
    var Coin = findStateId(myState, "coin");
    var Amount = findStateId(myState, "amount");
    onUpdateItem("submit", true);
    onUpdateItem("loading", true);

    if (!findStateId(myState, "hasError") && findStateId(myState, "submit")) {
      userService.createDepositCyripto("deposit", Amount, Coin).then(
        (response) => {
          onUpdateItem("loading", false);

          if (response.data.address) {
            //prop.onUpdateItem("openModalCashier", false);
            prop.onReset("Reports");
            //history.push("/panel/dashboard");
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response.data,
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
          onUpdateItem("loading", false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: resMessage,
          });
        }
      );
    } else {
      onUpdateItem("loading", false);
    }
  };
  var Coin = findStateId(myState, "coin");
  var Amount = findStateId(myState, "amount");
  var loading = findStateId(myState, "loading");

  return (
    <>
      <Header as="h2" inverted>
        CryptoCurrency Deposit
      </Header>
      <Form onSubmit={handleSubmit} size="big" inverted style={{ padding: 15 }}>
        <Modal.Content style={{ paddingBottom: 90 }}>
          <Form.Field>
            <label>Select Crypto</label>
            <CryptoList
              onUpdateItem={onUpdateItem}
              coins={prop.coins}
              value={Coin}
            />
          </Form.Field>
          <Form.Field>
            <label>Amount</label>
            <Input
              labelPosition="right"
              fluid
              type="text"
              placeholder="Amount"
              error={getError(Amount, "Please enter amount", "")}
            >
              <Label>$</Label>
              <IMaskInput
                type="tel"
                pattern="[1-9]{1}[0-9]"
                mask={"0000"}
                value={Amount}
                onAccept={setAmount}
              />
              <Label basic size="small">
                .00
              </Label>
            </Input>
          </Form.Field>
        </Modal.Content>

        <Divider />
        <Button.Group size="large" fluid widths="2">
          <Button
            loading={loading}
            disabled={loading}
            color="green"
            onClick={() => onUpdateItem("submit", true)}
          >
            Deposit
          </Button>
          <Button.Or />
          <Button
            type="button"
            color="red"
            onClick={() => prop.onUpdateItem("openModalCashier", false)}
          >
            Close
          </Button>
        </Button.Group>
      </Form>
    </>
  );
}

export default withRouter(CrDeposit);
