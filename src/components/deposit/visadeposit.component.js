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
      { id: "Voucher", val: "" },
      { id: "Code", val: "" },
      { id: "hasError", val: null },
      { id: "loading", val: false },
      { id: "submit", val: false },
    ],
  });

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
      const list = myState.list.map((item) => {
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
    var Voucher = findStateId(myState, "Voucher");
    var Code = findStateId(myState, "Code");
    onUpdateItem("submit", true);
    onUpdateItem("loading", true);

    if (!findStateId(myState, "hasError") && findStateId(myState, "submit")) {
      userService.createDepositPM(Voucher, Code).then(
        (response) => {
          onUpdateItem("loading", false);

          if (response.address) {
            //prop.onUpdateItem("openModalCashier", false)
            //history.push("/panel/dashboard");
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response,
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
  var Voucher = findStateId(myState, "Voucher");
  var Code = findStateId(myState, "Code");
  var loading = findStateId(myState, "loading");

  return (
    <>
      <Header as="h2" inverted>
        VisaGiftCode Deposit
      </Header>
      <Form onSubmit={handleSubmit} size="big" inverted style={{ padding: 15 }}>
        <Modal.Content>
          <Form.Input
            error={getError(Voucher, "Please enter Visa Gift Code Number", "")}
            fluid
            label="Visa Gift Code"
            placeholder="Visa Gift Code"
            name="Visa Gift Code"
            onChange={updateHandler}
          />
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
