import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "semantic-ui-react";
import AuthService from "../services/auth.service";
import UserWebsocket from "services/user.websocket";
import Swal from "sweetalert2";
function FormExampleFieldErrorLabel(prop) {
  const history = useHistory();
  const [myState, setMyState] = useState({
    list: [
      { id: "email", val: "" },
      { id: "password", val: "" },
      { id: "accept", val: false },
      { id: "hasError", val: false },
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
      if (data == "" || !data) {
        _error = { content: _content, pointing: _pointing };
        if (_pointing == "") {
          _error = true;
        }
      }
    }
    if (_error && !findStateId(myState, "hasError")) {
      onUpdateItem("hasError", true);
    }
    if (_error && findStateId(myState, "loading")) {
      onUpdateItem("loading", false);
    }
    return _error;
  };
  const handleSubmit = () => {
    var email = findStateId(myState, "email");
    var password = findStateId(myState, "password");

    onUpdateItem("loading", true);

    if (!findStateId(myState, "hasError") && findStateId(myState, "submit")) {
      AuthService.forgetPass(email, password).then(
        (response) => {
          onUpdateItem("loading", false);

          if (response.data == "Waiting...") {
            Swal.fire(
              "",
              "Activation link send to <b>" + email + "</b> successfully.",
              "success"
            ).then((result) => {});
          } else {
            onUpdateItem("loading", false);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: response,
            });
          }
        },
        (error) => {
          var resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          if (resMessage == "Validation Failed") {
            var _alarm = error.response.data?.details[0].toString();

            if (error.response.data?.details.length > 1) {
              _alarm =
                _alarm + "\n" + error.response.data?.details[1].toString();
            }
            try {
              _alarm = _alarm
                .replace("\n", "</li><li>")
                .replace("\n", "</li><li>")
                .replace("\n", "</li><li>")
                .replace("\n", "</li><li>");
            } catch (e) {}

            resMessage =
              "<ul style='text-align: left;list-style: circle;font-size: 13px;'><li>" +
              _alarm +
              "</li></ul>";
          }
          onUpdateItem("loading", false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            html: resMessage,
          });
        }
      );
    } else {
      onUpdateItem("loading", false);
    }
  };

  var email = findStateId(myState, "email");
  var password = findStateId(myState, "password");

  var loading = findStateId(myState, "loading");
  return (
    <Form onSubmit={handleSubmit} inverted size="small">
      <Form.Input
        error={getError(email, "", "")}
        fluid
        name="email"
        type="email"
        label="Email"
        placeholder="Email"
        autoComplete="off"
        onChange={updateHandler}
      />
      <Form.Input
        error={getError(password, "Please enter your password", "")}
        fluid
        name="password"
        type="password"
        label="New Password"
        placeholder="New Password"
        onChange={updateHandler}
      />
      <Form.Button
        loading={loading}
        onClick={() => onUpdateItem("submit", true)}
        disabled={loading}
        color="red"
        fluid
        size="small"
        content="Send Verification email"
      />
    </Form>
  );
}

export default FormExampleFieldErrorLabel;
