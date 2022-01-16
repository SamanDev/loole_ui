import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "services/auth.service";
import { Menu } from "semantic-ui-react";

import { Container } from "react-bootstrap";
import { defUser } from "const";
const LandNavbar = (prop) => {
  const [myState, setMyState] = useState(prop.myState);
  useEffect(() => {
    setMyState(prop.myState);
  }, [prop.myState]);
  const currentUser = prop.findStateId(myState, "currentUser");
  if (currentUser?.accessToken) {
    prop.onUpdateItem("openModalLogin", false);
  }
  const logOut = () => {
    prop.onUpdateItem("currentUser", defUser);

    AuthService.logout();
  };
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
              src={"/assets/img/logoloole.svg"}
              alt="loole.gg logo"
              style={{ height: 50, width: 50, marginRight: 10 }}
            />
            Loole.gg
          </Menu.Item>

          <Menu.Menu position="right">
            {currentUser?.accessToken ? (
              <>
                <Menu.Item name="Dashboard" to={"/panel/dashboard"} as={Link} />
                <Menu.Item name="logout" onClick={() => logOut()} />
              </>
            ) : (
              <Menu.Item
                onClick={() => prop.onUpdateItem("openModalLogin", true)}
              >
                Login / Register
              </Menu.Item>
            )}
          </Menu.Menu>
        </Menu>
      </Container>
    </>
  );
};

export default LandNavbar;
