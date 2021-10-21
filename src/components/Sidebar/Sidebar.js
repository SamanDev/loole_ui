import React ,{useState} from "react";
import { Link, useLocation,Redirect } from "react-router-dom";
import Avatar from 'react-avatar';
import PropTypes from "prop-types";
import AuthService from "services/auth.service";
// react-bootstrap components
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Collapse,
  Form,
  InputGroup,
  Navbar,
  Nav,
  Pagination,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import {
  userState
} from 'atoms';

function Sidebar({ routes, image, background,token }) {
  
  // to check for active links and opened collapses
  let location = useLocation();
  // this is for the user collapse
  var [userCollapseState, setUserCollapseState] = React.useState(false);
  // this is for the rest of the collapses
  var [state, setState] = React.useState({});
  React.useEffect(() => {
    
    setState(getCollapseStates(routes));
    
  }, []);
  
  // this is for the rest of the collapses
  
  // this creates the intial state of this component based on the collapse routes
  // that it gets through routes prop
  var getCollapseStates = (routes) => {
    let initialState = {};
    routes.map((prop, key) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: getCollapseInitialState(prop.views),
          ...getCollapseStates(prop.views),
          ...initialState,
        };
      }
      return null;
    });
    return initialState;
  };
  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.jsx - route /admin/regular-forms
  const getCollapseInitialState = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (location.pathname === routes[i].layout + routes[i].path) {
        return true;
      }
    }
    return false;
  };
  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      
      if (prop.redirect ) {
        return null;
      }
      if (prop.collapse) {
        var st = {};
        st[prop["state"]] = !state[prop.state];
        return (
          <Nav.Item
            className={getCollapseInitialState(prop.views) ? "active" : ""}
            as="li"
            key={key}
          >
            <Nav.Link
              className={state[prop.state] ? "collapsed" : ""}
              data-toggle="collapse"
              onClick={(e) => {
                e.preventDefault();
                setState({ ...state, ...st });
              }}
              aria-expanded={state[prop.state]}
            >
              <i className={prop.icon}></i>
              <p>
                {prop.name} <b className="caret"></b>
              </p>
            </Nav.Link>
            <Collapse in={state[prop.state]}>
              <div>
                <Nav as="ul">{createLinks(prop.views)}</Nav>
              </div>
            </Collapse>
          </Nav.Item>
        );
      }
      if (prop.show && prop.name != 'Profile'){
        return (
          <Nav.Item
            className={activeRoute(prop.layout + prop.path)}
            key={key}
            as="li"
          >
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
          </Nav.Item>
        );
              }
              if (prop.show && prop.name == 'Profile'){
                return (
                  
                  <Nav.Item
            className={activeRoute(prop.layout + prop.path)}
            key={key}
            as="li"
            style={{marginTop:20,marginBottom:20}}
          >
            <Nav.Link to={prop.layout + prop.path} as={Link}>
              {prop.icon ? (
                <>
                  <i className={prop.icon} />
                  <p>{token.username}</p>
                </>
              ) : (
                <>
                  <span className="sidebar-mini">{prop.mini}</span>
                  <span className="sidebar-normal">{prop.name}</span>
                </>
              )}
            </Nav.Link>
            <hr style={{marginTop: '1rem', marginBottom: '1rem',borderTop: '1px solid rgba(255,255,255,.4)',    width: '90%'}}/>
          
            </Nav.Item>
           
                );
                      }
    });
  };
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };

  if(token !=''){

    var str = token.username;
    var res = str.substring(0, 1);
    res  = res + ' '+ str.substring(1, 2);
  return (
    <>
      <div className="sidebar"  data-color={background} data-image={image} >
        <div className="sidebar-wrapper">
          <div className="logo">
           
          <Link to={'/home'} className="simple-text logo-mini" style={{    height: 45, width: 45}}>
              <div className="logo-img">
                <img
                  src={require("assets/img/logoloole.svg").default}
                  alt="react-logo"
                  style={{top:0}}
                />
              </div>
              </Link>
          
               <Link to={'/home'} className="simple-text logo-normal" style={{fontFamily: 'Work Sans',textTransform:'none'}}>
              Loole.gg
              </Link>
          </div>
          <div className="user">
            <div className="photo">
            <Avatar size="30"  name={res} />
            </div>
            <div className="info">
            <Link to={'/panel/profile'} onClick={() =>
      document.documentElement.classList.toggle("nav-open")
    }>
              
                <span>
                {token.username} 
                </span>
                </Link>
             
            </div>
          </div>
          <Nav as="ul" onClick={() =>
      document.documentElement.classList.toggle("nav-open")
    }>{createLinks(routes)}
    
    
    </Nav>
        </div>
        <div
          className="sidebar-background"
          style={{
            backgroundImage: "url('" + image + "')",
          }}
        ></div>
      </div>
    </>
  );
        }else{
          return null;
        }
}

let linkPropTypes = {
  path: PropTypes.string,
  layout: PropTypes.string,
  name: PropTypes.string,
  
  page: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
};

Sidebar.defaultProps = {
  image: "",
  page: "",
  background: "purple",
  routes: [],
  
};

Sidebar.propTypes = {
  image: PropTypes.string,
  
  page: PropTypes.string,
  background: PropTypes.oneOf([
    "blue",
    "azure",
    "green",
    "orange",
    "red",
    "purple",
  ]),
  routes: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        ...linkPropTypes,
        icon: PropTypes.string,
      }),
      PropTypes.shape({
        collapse: true,
        path: PropTypes.string,
        name: PropTypes.string,
        state: PropTypes.string,
        icon: PropTypes.string,
        views: PropTypes.shape({
          ...linkPropTypes,
          mini: PropTypes.string,
        }),
      }),
    ])
  ),
  
};

export default Sidebar;
