import React, { useState } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import { Form, Label, Segment } from "semantic-ui-react";
import AuthService from "../services/auth.service";
import UserWebsocket from 'services/user.websocket'
import Swal from 'sweetalert2'
function FormExampleFieldErrorLabel(prop) {
  const history = useHistory();
  const [myState, setMyState] = useState({
    list: [
      { id: "username", val: '' },
      { id: "password", val: '' },
      { id: "email", val: '' },
      { id: "reffer", val: '' },
      { id: "accept", val: false },
      { id: "hasError", val: false },
      { id: "loading", val: false },
      { id: "submit", val: false },
    ],
  });

  const updateHandler = (e, data) => {
    
    var val = data.value;
    if(!data.value){
        val = data.checked
        if(data.checked == false){val = ''}
    }
    onUpdateItem(data.name, val);
    if(val!=''){
        onUpdateItem('hasError', false);
   
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
  const handleSubmit=()=> {
    var username = findStateId(myState, "username");
    var email = findStateId(myState, "email");
    var password = findStateId(myState, "password");
    var reffer = null;
    if(localStorage.getItem('reffer')){reffer=localStorage.getItem('reffer')}

    onUpdateItem('loading', true);
  
    if (!findStateId(myState, "hasError") && findStateId(myState, "submit")) {
        
        AuthService.register(username, email,password,reffer).then(
            (response) => {
                onUpdateItem('loading', false);
                console.log(response.data)
              if (response.data.accessToken) {
                prop.onUpdateItem("currentUser", response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
                UserWebsocket.disconnect()
                UserWebsocket.connect(response.data.accessToken+"&user="+response.data.username,response.data);
                history.push("/panel/dashboard");
              }else{
                onUpdateItem('loading', false);
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
        onUpdateItem('loading', false);
    }
  }
  var username = findStateId(myState, "username");
  var password = findStateId(myState, "password");
  var email = findStateId(myState, "email");
  var accept = findStateId(myState, "accept");
  var loading = findStateId(myState, "loading");
  return (
    
      <Form onSubmit={handleSubmit} inverted size='small'>
        <Form.Input
          error={getError(username, "", "")}
          fluid
          
          name="username"
          label="Username"
          placeholder="Username"
          onChange={updateHandler}
        />
        <Form.Input
          error={getError(password, "", "")}
          fluid
          
          name="password"
          type="password"
          label="Password"
          placeholder="Password"
          onChange={updateHandler}
        />
        <Form.Input
          error={getError(email, "", "")}
          fluid
          
          name="email"
          type="email"
          label="Email"
          placeholder="Email"
          onChange={updateHandler}
        />
    
        
        <Form.Checkbox
        size="small"
        checked={accept}
        error={getError(accept, "", "")}
        name="accept"
        onClick={updateHandler}
        
     label='By clicking Create Account, you are indicating that you have read and acknowledge the Terms Conditions and Privacy policy.'
    >
    </Form.Checkbox>
    <p style={{marginBottom:20}}><a href="/content/terms-and-conditions" target="_blank">Terms Conditions</a> and <a href="/content/privacy-policy" target="_blank">Privacy policy</a>
    </p>
        <Form.Button loading={loading}
        onClick={() => onUpdateItem("submit", true)}
        disabled={loading} inverted color='orange' fluid size='small' content="Create Account" />
       
      </Form>
   
  );
}

export default FormExampleFieldErrorLabel;
