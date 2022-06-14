import React, { useState, useEffect, useContext } from "react";
import { IMaskInput } from "react-imask";
import { withRouter } from "react-router-dom";
import userService from "services/user.service";
import CryptoList from "components/CryptoList";

import {
  Button,
  Divider,
  Header,
  Form,
  Input,
  Label,
  Modal,
} from "semantic-ui-react";
import Swal from "sweetalert2";
import UserContext from "context/UserState";
import { useHistory } from "react-router";
function CrDeposit(prop) {
  const history = useHistory();
  const context = useContext(UserContext);
  const { currentUser } = context.uList;
  const [myState, setMyState] = useState({
    list: [
      { id: "amount", val: "20" },
      { id: "coin", val: "BTC" },
      { id: "wallet", val: "" },
      { id: "hasError", val: null },
      { id: "loading", val: false },
      { id: "submit", val: false },
    ],
  });
  const setAmount = (e) => {
    if (parseFloat(e) > currentUser.balance && currentUser.balance > 10) {
      e = parseInt(currentUser.balance - 1).toString();
    }

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
    var Coin = findStateId(myState, "coin");
    var Amount = findStateId(myState, "amount");
    var Wallet = findStateId(myState, "wallet");
    onUpdateItem("submit", true);
    onUpdateItem("loading", true);

    if (!findStateId(myState, "hasError") && findStateId(myState, "submit")) {
      userService.createPapara("cashout", Amount, Wallet).then(
        (response) => {
          onUpdateItem("loading", false);

          if (response.data.accessToken) {
            Swal.fire("", "Cashout saved successfully.", "success").then(
              (result) => {
                prop.onUpdateItem("openModalCashier", false);
                prop.onUpdateItem("keyCashier", 2);
              }
            );
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
  var Wallet = findStateId(myState, "wallet");
  return (
    <>
      <Header as="h2" inverted>
        Papara Cashout
      </Header>
      <Form onSubmit={handleSubmit} size="big" inverted style={{ padding: 15 }}>
        <Modal.Content style={{ paddingBottom: 90 }}>
          <Form.Input
            error={getError(Wallet, "Please enter your Papara number", "")}
            fluid
            label={"Papara number"}
            placeholder={"Papara number"}
            name="wallet"
            value={Wallet}
            onChange={updateHandler}
          />
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
            Cashout
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
