import React, { useState, useEffect } from "react";

import { Redirect, Route } from "react-router";
import AuthService from "services/auth.service";

import {
  BrowserRouter,

  Switch,

  useHistory,
  Link
} from "react-router-dom";
import { Input, Menu,Button,Icon } from "semantic-ui-react";

import {
  
  Container,
} from "react-bootstrap";
import UserWebsocket from 'services/user.websocket'
import { POSTURL,defUser } from 'const';
import Swal from 'sweetalert2'
const LandNavbar = (prop) => {
  const history = useHistory();
  const [myState, setMyState] = useState(prop.myState);
  useEffect(() => {
    setMyState(prop.myState);
  }, [prop.myState]);
  const currentUser = prop.findStateId(myState, "currentUser");
  const logOut=()=> {
      
    prop.onUpdateItem("currentUser", defUser)
  
    AuthService.logout();

    history.push("/home");
}
  return (
    <>
     
        <Menu secondary inverted style={{position:'absolute',top:0,left:0,right:0,background:'#000',height:60,lineHeight:'60px'}}>
          <Menu.Item
            
           
          >
            <b>{prop.page}</b>
            
          </Menu.Item>

          <Menu.Menu position="right">
          <Menu.Item  onClick={(e) =>
                document.documentElement.classList.toggle("nav-open")
              }>
    <Icon name='bars' size="large"/>
  </Menu.Item>
         
          </Menu.Menu>
        </Menu>
     
    </>
  );
};

export default LandNavbar;
