import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import UserWebsocket from "services/user.websocket";
function FormExampleFieldErrorLabel(prop) {
  const [myState, setMyState] = useState({
    list: [
      { id: "username", val: "" },
      { id: "password", val: "" },
      { id: "hasError", val: null },
      { id: "loading", val: false },
      { id: "submit", val: false },
    ],
  });

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
  const handleSubmit = () => {
    onUpdateItem("loading", true);

    if (localStorage.getItem("user")) {
      UserWebsocket.disconnect();
      const usr = JSON.parse(localStorage.getItem("user"));
      if (usr.accessToken) {
        UserWebsocket.connect(usr.accessToken + "&user=" + usr.username, usr);
      } else {
        UserWebsocket.connect();
      }
    } else {
      UserWebsocket.connect();
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
