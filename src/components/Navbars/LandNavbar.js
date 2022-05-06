import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "services/auth.service";
import { Menu, Button } from "semantic-ui-react";

import { Container } from "react-bootstrap";
import { defUser } from "const.js";
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
    localStorage.setItem("user", JSON.stringify(defUser));
    AuthService.logout();
  };
  return (
    <>
      <Container id="homes">
        <Menu
          inverted
          pointing
          borderless
          fixed="top"
          style={{ height: 70, overflow: "hidden", zIndex: 10000 }}
          size="small"
        >
          <Menu.Item
            to="/home"
            as={Link}
            onClick={() => prop.scrollTo("homes")}
          >
            <img
              src={"/assets/img/logoloole.svg"}
              alt="loole.gg logo"
              style={{ height: 45, width: 45 }}
              className="ui"
            />
            <span
              className="mobile hidden"
              style={{
                display: "inline-block",
                marginLeft: 10,
                fontWeight: "bold",
              }}
            >
              Loole.gg
            </span>
          </Menu.Item>

          <Menu.Menu
            position="right"
            style={{ minWidth: "auto", overflow: "auto", height: 70 }}
          >
            <Menu.Item className="mobile hidd3en" to="/home#how" as={Link}>
              How it works
            </Menu.Item>
            <Menu.Item className="mobile hidd3en" to="/home#games" as={Link}>
              Games
            </Menu.Item>
            <Menu.Item className="mobile hidden" to="#market" as={Link}>
              Market
            </Menu.Item>
            {currentUser?.accessToken ? (
              <>
                <Menu.Item>
                  <Button to={"/panel/dashboard"} as={Link} color="red">
                    Dashboard
                  </Button>
                </Menu.Item>
                <Menu.Item className="mobile hidden" onClick={() => logOut()}>
                  Logout
                </Menu.Item>
              </>
            ) : (
              <Menu.Item>
                <Button
                  id="lgnbtn"
                  color="red"
                  onClick={() => prop.onUpdateItem("openModalLogin", true)}
                >
                  Login <span className="mobile hidden"> / Register</span>
                </Button>
              </Menu.Item>
            )}
          </Menu.Menu>
        </Menu>
      </Container>
    </>
  );
};

export default LandNavbar;
