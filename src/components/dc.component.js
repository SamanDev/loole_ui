import React, { useState } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import { Form, Segment } from "semantic-ui-react";
import AuthService from "../services/auth.service";
import UserWebsocket from "services/user.websocket";
import Swal from "sweetalert2";
function FormExampleFieldErrorLabel(prop) {
  const history = useHistory();
  let location = useLocation();
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
    onUpdateItem("loading", true);
    if(localStorage.getItem('user')){
    const usr = JSON.parse(localStorage.getItem('user'));
    if (usr.accessToken) {
    UserWebsocket.connect(usr.accessToken+"&user="+usr.username,usr);
    }else{
      UserWebsocket.connect()
    }
  }else{
    UserWebsocket.connect()
  }
 
  };

  var loading = findStateId(myState, "loading");
  return (
    <Form onSubmit={handleSubmit} inverted size="small">
      

      <Form.Button
          color="red"
        loading={loading}
        disabled={loading}
        fluid
        size="small"
        content="Reconnect to server"
      />
    </Form>
  );
}

export default FormExampleFieldErrorLabel;
