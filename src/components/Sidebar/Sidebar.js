import React, { useContext } from "react";
import Avatar from "react-avatar";
import AuthService from "services/auth.service";
import { haveAdmin } from "components/include";
// react-bootstrap components
import { Nav } from "react-bootstrap";
import { setAvatar } from "components/include";
import { useLocation, useHistory, Link } from "react-router-dom";
import { defUser } from "const.js";
import UserContext from "context/UserState";
function Sidebar({ routes, image, background, token, onUpdateItem }) {
  const context = useContext(UserContext);
  const { setUList } = context;
  const history = useHistory();
  // to check for active links and opened collapses
  let location = useLocation();
  // this is for the user collapse
  var [userCollapseState, setUserCollapseState] = React.useState(false);
  // this is for the rest of the collapses
  var [state, setState] = React.useState({});

  if (token?.accessToken) {
    var str = token.username;
    var res = str.substring(0, 1);
    // onUpdateItem("openModalLogin", false)
  } else {
    var str = "Guest User";
    var res = str.substring(0, 1);
    //onUpdateItem("openModalLogin", true)
  }

  res = setAvatar(str);
  const logOut = () => {
    setUList({ currentUser: defUser });
    localStorage.setItem("user", JSON.stringify(defUser));
    AuthService.logout();

    history.push("/home");
  };
  // this is for the rest of the collapses

  // this creates the intial state of this component based on the collapse routes
  // that it gets through routes prop

  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.jsx - route /admin/regular-forms

  // this function creates the links and collapses that appear in the sidebar (left menu)
  const mycreateLinks = (routes) => {
    const listItems = routes.map(
      (prop, key) => (
        <Nav.Item
          className={activeRoute(prop.layout + prop.path)}
          key={key.toString()}
          as="li"
          style={{ padding: 0 }}
        >
          {prop.show ? (
            <Nav.Link to={prop.layout + prop.path} as={Link}>
              {prop.icon ? (
                <>
                  <i className={prop.icon} />
                  <p>{prop.name}</p>
                </>
              ) : (
                <>
                  <span className="sidebar-mini">{prop.mini}</span>
                  <span className="sidebar-normal">{prop.name}</span>
                </>
              )}
            </Nav.Link>
          ) : (
            <>
              {(prop.name == "Admin" ||
                prop.name == "AdminEvents" ||
                prop.name == "AdminCosts" ||
                prop.name == "CreateEvent") &&
                haveAdmin(token.roles) && (
                  <Nav.Link to={prop.layout + prop.path} as={Link}>
                    {prop.icon ? (
                      <>
                        <i className={prop.icon} />
                        <p>{prop.name}</p>
                      </>
                    ) : (
                      <>
                        <span className="sidebar-mini">{prop.mini}</span>
                        <span className="sidebar-normal">{prop.name}</span>
                      </>
                    )}
                  </Nav.Link>
                )}
              {prop.name == "Profile" && (
                <>
                  <Nav.Link to={prop.layout + prop.path} as={Link}>
                    {prop.icon ? (
                      <>
                        <Avatar
                          size="30"
                          name={res}
                          round={true}
                          title={token.username}
                          style={{ float: "left", marginRight: 15 }}
                        />
                        <p>{token.username}</p>
                      </>
                    ) : (
                      <>
                        <span className="sidebar-mini">{prop.mini}</span>
                        <span className="sidebar-normal">{prop.name}</span>
                      </>
                    )}
                  </Nav.Link>
                  <hr
                    style={{
                      marginTop: 5,
                      marginBottom: "0",
                      borderTop: "1px solid rgba(255,255,255,.4)",
                      width: "90%",
                    }}
                  />
                </>
              )}
              {prop.name == "Create" && (
                <Nav.Link
                  onClick={() => {
                    prop.name == "Create" && onUpdateItem("openModalAdd", true);
                  }}
                >
                  {prop.icon ? (
                    <>
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </>
                  ) : (
                    <>
                      <span className="sidebar-mini">{prop.mini}</span>
                      <span className="sidebar-normal">{prop.name}</span>
                    </>
                  )}
                </Nav.Link>
              )}
              {prop.name == "Logout" && (
                <Nav.Link onClick={() => logOut()}>
                  {prop.icon ? (
                    <>
                      <i className="nc-icon nc-button-power" />
                      <p>Logout</p>
                    </>
                  ) : (
                    <>
                      <span className="sidebar-mini">{prop.mini}</span>
                      <span className="sidebar-normal">Logout</span>
                    </>
                  )}
                </Nav.Link>
              )}
            </>
          )}
        </Nav.Item>
      )
      // Correct! Key should be specified inside the array.
    );

    return (
      <Nav
        as="ul"
        onClick={() => document.documentElement.classList.toggle("nav-open")}
      >
        {listItems}
      </Nav>
    );
  };
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };

  return (
    <>
      <div className="sidebar" data-color={background} data-image={image}>
        <div className="sidebar-wrapper">
          <div className="logo">
            <Link
              to="/home"
              className="simple-text logo-mini"
              style={{ height: 45, width: 45 }}
            >
              <div className="logo-img">
                <img
                  src="/assets/img/logoloole.svg"
                  alt="react-logo"
                  style={{ top: 0 }}
                />
              </div>
            </Link>

            <Link
              to="/home"
              className="simple-text logo-normal"
              style={{ fontFamily: "Work Sans", textTransform: "none" }}
            >
              Loole.gg
            </Link>
          </div>

          {mycreateLinks(routes)}
        </div>
        <div
          className="sidebar-background"
          key={"back"}
          style={{
            backgroundImage: "url('" + image + "')",
          }}
        ></div>
      </div>
    </>
  );
}

export default Sidebar;
