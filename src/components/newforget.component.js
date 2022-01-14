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
      { id: "reffer", val: "" },
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

    var reffer = null;
    if (localStorage.getItem("reffer")) {
      reffer = localStorage.getItem("reffer");
    }

    onUpdateItem("loading", true);

    if (!findStateId(myState, "hasError") && findStateId(myState, "submit")) {
      AuthService.register(email).then(
        (response) => {
          onUpdateItem("loading", false);

          if (response.data.accessToken) {
            prop.onUpdateItem("currentUser", response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
            UserWebsocket.disconnect();
            UserWebsocket.connect(
              response.data.accessToken + "&user=" + response.data.username,
              response.data
            );
            history.push("/panel/dashboard");
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

  var email = findStateId(myState, "email");

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
        onChange={updateHandler}
      />

      <Form.Button
        loading={loading}
        onClick={() => onUpdateItem("submit", true)}
        disabled={loading}
        inverted
        color="red"
        fluid
        size="small"
        content="Submit"
      />
    </Form>
  );
}

export default FormExampleFieldErrorLabel;
