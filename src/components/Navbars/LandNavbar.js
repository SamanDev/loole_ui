import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "services/auth.service";
import { Menu } from "semantic-ui-react";

import { Container } from "react-bootstrap";
import { defUser } from "const";
import UserContext from "context/UserState";
const LandNavbar = (prop) => {
  const [myState, setMyState] = useState(prop.myState);
  useEffect(() => {
    setMyState(prop.myState);
  }, [prop.myState]);
  const context = useContext(UserContext);
  const { currentUser } = context.uList;
  const { setUList } = context;
  const openModalLogin = prop.findStateId(myState, "openModalLogin");
  if (currentUser?.accessToken && !openModalLogin) {
    prop.onUpdateItem("openModalLogin", false);
  }
  const logOut = () => {
    setUList({ currentUser: defUser });
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
            <Menu.Item onClick={() => prop.scrollTo("market")}>
              Market
            </Menu.Item>
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
