import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Redirect, Route } from "react-router";
import AuthService from "services/auth.service";
import { withRouter } from "react-router-dom";
import { Input, Menu } from "semantic-ui-react";

import {
  
  Container,
} from "react-bootstrap";
import UserWebsocket from 'services/user.websocket'
import { POSTURL,defUser } from 'const';
import Swal from 'sweetalert2'
const LandNavbar = (prop) => {
   
  const [myState, setMyState] = useState(prop.myState);
  useEffect(() => {
    setMyState(prop.myState);
  }, [prop.myState]);
  const currentUser = prop.findStateId(myState, "currentUser");
  const logOut=()=> {
      
    prop.onUpdateItem("currentUser", {})
    AuthService.logout();
}
  return (
    <>
      <Container>
        <Menu secondary>
          <Menu.Item
            to="/home"
            as={Link}
            style={{ fontFamily: "Work Sans", paddingLeft: 0, fontSize: 16 }}
          >
            <img
              src={require("assets/img/logoloole.svg").default}
              alt="loole.gg logo"
              style={{ height: 50, width: 50, marginRight: 10 }}
            />
            Loole.gg
          </Menu.Item>

          <Menu.Menu position="right">
            {currentUser && currentUser.accessToken ? (
              <>
                <Menu.Item name="Dashboard" to={"/panel/dashboard"} as={Link} />
                <Menu.Item name="logout" onClick={() =>logOut()} />
              </>
            ) : (
              <Menu.Item
              as={Link}
                onClick={() => prop.onUpdateItem("openModalLogin", true)}
              >Login / Register</Menu.Item>
            )}
          </Menu.Menu>
        </Menu>
      </Container>
    </>
  );
};

export default LandNavbar;
