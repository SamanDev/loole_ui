import React, { useState, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Form } from "semantic-ui-react";
import AuthService from "../services/auth.service";
import UserWebsocket from "services/user.websocket";
import Swal from "sweetalert2";
import UserContext from "context/UserState";
function FormExampleFieldErrorLabel(prop) {
  const history = useHistory();
  let location = useLocation();
  const context = useContext(UserContext);
  const { uList, setUList } = context;
  const [myState, setMyState] = useState({
    list: [
      { id: "username", val: "" },
      { id: "password", val: "" },
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
    var username = findStateId(myState, "username");
    var password = findStateId(myState, "password");

    onUpdateItem("loading", true);

    if (!findStateId(myState, "hasError") && findStateId(myState, "submit")) {
      AuthService.login(username.trim(), password).then(
        (response) => {
          onUpdateItem("loading", false);
          console.log(response.data);
          if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
            setUList({ currentUser: response.data });

            UserWebsocket.connect(
              response.data.accessToken + "&user=" + response.data.username,
              response.data
            );
            if (location.pathname.indexOf("home") > -1) {
              history.push("/panel/dashboard");
            } else {
              prop.onUpdateItem("openModalLogin", false);
            }
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
  var username = findStateId(myState, "username");
  var password = findStateId(myState, "password");
  var loading = findStateId(myState, "loading");
  return (
    <Form onSubmit={handleSubmit} inverted size="small">
      <Form.Input
        error={getError(username, "Please enter your username", "")}
        fluid
        inverted
        name="username"
        label="Username"
        placeholder="Username"
        onChange={updateHandler}
      />
      <Form.Input
        error={getError(password, "Please enter your password", "")}
        fluid
        name="password"
        type="password"
        label="Password"
        placeholder="Password"
        onChange={updateHandler}
      />

      <Form.Button
        loading={loading}
        disabled={loading}
        inverted
        color="green"
        onClick={() => onUpdateItem("submit", true)}
        fluid
        size="small"
        content="Login"
      />
    </Form>
  );
}

export default FormExampleFieldErrorLabel;
