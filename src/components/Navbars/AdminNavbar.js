import React, { useContext } from "react";

import { Menu, Icon } from "semantic-ui-react";

import UserContext from "context/UserState";
const LandNavbar = (prop) => {
  const context = useContext(UserContext);
  const { currentUser } = context.uList;

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
            onClick={() => document.body.classList.toggle("sidebar-mini")}
          >
            <Icon name="bars" size="large" />
          </Menu.Item>
          <Menu.Item
            className="mobile only tablet only"
            onClick={() =>
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
