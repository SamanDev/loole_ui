import React, { useState, useEffect } from "react";

import AuthService from "services/auth.service";

import { useHistory } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";

import { defUser } from "const";
const LandNavbar = (prop) => {
  const history = useHistory();
  const [myState, setMyState] = useState(prop.myState);
  useEffect(() => {
    setMyState(prop.myState);
  }, [prop.myState]);
  const currentUser = prop.findStateId(myState, "currentUser");
  const logOut = () => {
    prop.onUpdateItem("currentUser", defUser);

    AuthService.logout();

    history.push("/home");
  };
  return (
    <>
      <Menu
        secondary
        inverted
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          background: "#000",
          height: 60,
          lineHeight: "60px",
        }}
      >
        <Menu.Item>{prop.page}</Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item
            className="tablet hidden mobile hidden"
            onClick={(e) => document.body.classList.toggle("sidebar-mini")}
          >
            <Icon name="bars" size="large" />
          </Menu.Item>
          <Menu.Item
            className="mobile only tablet only"
            onClick={(e) =>
              document.documentElement.classList.toggle("nav-open")
            }
          >
            <Icon name="bars" size="large" />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </>
  );
};

export default LandNavbar;
