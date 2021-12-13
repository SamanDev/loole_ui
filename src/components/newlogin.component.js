import React, { useState } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import { Form, Segment } from "semantic-ui-react";
import AuthService from "../services/auth.service";
import UserWebsocket from 'services/user.websocket'
import Swal from 'sweetalert2'
function FormExampleFieldErrorLabel(prop) {
  const history = useHistory();
  const [myState, setMyState] = useState({
    list: [
      { id: "username", val: '' },
      { id: "password", val: '' },
      { id: "hasError", val: null },
      { id: "loading", val: false },
      { id: "submit", val: false },
    ],
  });

  const updateHandler = (e, data) => {
    onUpdateItem(data.name, data.value);
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
    if(findStateId(myState, "submit")){
    if (data == "") {
      _error = { content: _content, pointing: _pointing };
      if (_pointing == "") {
        _error = _content;
      }
    }
}
    return _error;
  };
  const handleSubmit=()=> {
    var username = findStateId(myState, "username");
    var password = findStateId(myState, "password");
    onUpdateItem('loading', true);
    if (!findStateId(myState, "hasError")) {
      AuthService.login(username, password).then(
        (response) => {
            onUpdateItem('loading', false);
            console.log(response.data)
          if (response.data.accessToken) {
            prop.onUpdateItem("openModalLogin", false)
            localStorage.setItem("user", JSON.stringify(response.data));
            UserWebsocket.disconnect()
            UserWebsocket.connect(response.data.accessToken+"&user="+response.data.username,response.data);
            history.push("/panel/dashboard");
          }else{
            
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: response,
                
              })
          }
          
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            onUpdateItem('loading', false);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: resMessage,
                
              })
         
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }
  var username = findStateId(myState, "username");
  var password = findStateId(myState, "password");
  var loading = findStateId(myState, "loading");
  return (
    
      <Form onSubmit={handleSubmit} inverted size='small'>
        <Form.Input
          error={getError(username, "Please enter your username", "")}
          fluid
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
        
        <Form.Button loading={loading} inverted color='green' fluid size='small' content="Login" />
      </Form>
   
  );
}

export default FormExampleFieldErrorLabel;
