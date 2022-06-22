import React, { useState, useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Form } from "semantic-ui-react";
import AuthService from "../services/auth.service";
import UserWebsocket from "services/user.websocket";
import Swal from "sweetalert2";
import UserContext from "context/UserState";
import {
  getMessaging,
  getToken,
  onMessage,
  onBackgroundMessage,
} from "firebase/messaging";
import $ from "jquery";
import { initializeApp } from "firebase/app";
const defusername = localStorage.getItem("username");
const defpassword = localStorage.getItem("password");
function FormExampleFieldErrorLabel(prop) {
  const history = useHistory();
  let location = useLocation();
  const context = useContext(UserContext);
  const { uList, setUList } = context;
  const [myState, setMyState] = useState(prop.myState);
  useEffect(() => {
    setMyState(prop.myState);
  }, [prop.myState]);
  const [myStateLocal, setMyStateLocal] = useState({
    list: [
      { id: "username", val: defusername },
      { id: "password", val: defpassword },
      { id: "token", val: "" },
      { id: "hasError", val: null },
      { id: "loading", val: false },
      { id: "submit", val: false },
    ],
  });
  useEffect(() => {
    if (prop.findStateId(myState, "openModalLogin")) {
    }
  }, [prop.findStateId(myState, "openModalLogin")]);
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
    setMyStateLocal(() => {
      const list = myStateLocal.list.map((item) => {
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
    if (findStateId(myStateLocal, "submit")) {
      if (data == "" || !data) {
        _error = { content: _content, pointing: _pointing };
        if (_pointing == "") {
          _error = true;
        }
      }
    }
    if (_error && !findStateId(myStateLocal, "hasError")) {
      onUpdateItem("hasError", true);
    }
    if (_error && findStateId(myStateLocal, "loading")) {
      onUpdateItem("loading", false);
    }
    return _error;
  };
  const handleSubmit = () => {
    var username = findStateId(myStateLocal, "username");
    var password = findStateId(myStateLocal, "password");
    var token = findStateId(myStateLocal, "token");

    onUpdateItem("loading", true);

    if (
      !findStateId(myStateLocal, "hasError") &&
      findStateId(myStateLocal, "submit")
    ) {
      AuthService.login(username.trim(), password).then(
        (response) => {
          onUpdateItem("loading", false);

          if (response.data.accessToken) {
            if (response.data.userBlock) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Your account is baned.",
              });
            } else {
              localStorage.setItem("user", JSON.stringify(response.data));
              localStorage.setItem("username", username.trim());
              localStorage.setItem("password", password);
              setUList({ currentUser: response.data });
              prop.onReset("UserRefresh", response.data);
              UserWebsocket.connect(
                response.data.accessToken + "&user=" + response.data.username,
                response.data
              );
              if (location.pathname.indexOf("home") > -1) {
                // prop.onUpdateItem("openModalLogin", false);
                history.push("/panel/dashboard");
              } else {
                prop.onUpdateItem("openModalLogin", false);
                try {
                  $(".joineventbtn:visible").trigger("click");
                } catch (e) {}
              }
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
            text: resMessage.replace(
              "Error: Unauthorized",
              "Username or password is incorrect."
            ),
          });
        }
      );
    } else {
      onUpdateItem("loading", false);
    }
  };
  var username = findStateId(myStateLocal, "username");
  var password = findStateId(myStateLocal, "password");
  var loading = findStateId(myStateLocal, "loading");
  return (
    <Form onSubmit={handleSubmit} inverted size="small">
      <Form.Input
        error={getError(username, "Please enter your username", "")}
        fluid
        inverted
        name="username"
        value={username}
        label="Username"
        minLength="5"
        maxLength="20"
        placeholder="Username"
        onChange={updateHandler}
      />
      <Form.Input
        error={getError(password, "Please enter your password", "")}
        fluid
        name="password"
        type="password"
        minLength="8"
        maxLength="20"
        value={password}
        label="Password"
        placeholder="Password"
        onChange={updateHandler}
      />

      <Form.Button
        loading={loading}
        disabled={loading}
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
