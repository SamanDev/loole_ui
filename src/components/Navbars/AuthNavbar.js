import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { Redirect, Route } from "react-router";
import AuthService from "services/auth.service";
import {  withRouter} from 'react-router-dom';
// import { BurgerIcon } from './'
import styled from "styled-components";
import {
    Button,
    Card,
    Dropdown,
    Form,
    InputGroup,
    Navbar,
    Nav,
    Container,

} from "react-bootstrap";


class AuthNavbar extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
            collapseOpen: false,
          
            isExpanded: false
        };

    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        
        if (user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
               
            });
            if (window.location.href.indexOf('auth') > -1 && window.location.href.indexOf('lock') == -1) { 
              //this.props.history.push("/panel/dashboard");
              //window.location.href="/panel/dashboard";
            }
        } else {
            //window.location.href = "/";
            if (window.location.href.indexOf('lock') > -1) { 
              //window.location.href="/home";
            //this.props.history.push("/home");
            }
        }

    }

    logOut() {
        AuthService.logout();
    }

    handleToggle(e) {
        e.preventDefault();
        this.setState({
            isExpanded: !this.state.isExpanded
        });
    }
    render() {
        const { currentUser, showModeratorBoard, showAdminBoard, collapseOpen, currPage, isExpanded } = this.state;
       
        return (
            <Navbar
                className="position-absolute w-100"
                expand="lg"
                variant={collapseOpen ? "white" : "transparent"}
            >
                <Container>
                    <div className="navbar-wrapper">
                    <Link to={'/home'} className="simple-text logo-mini" style={{    height: 35, width: 45}}>
              <div className="logo-img">
                <img
                  src={require("assets/img/logoloole.svg").default}
                  alt="react-logo"
                />
              </div>
              </Link>
                        <Navbar.Brand to={'/home'} as={Link}>
                            <span className="d-none d-md-block">Loole</span>
                            <span className="d-block d-md-none">Loole</span>
                        </Navbar.Brand>
                    </div>
                    {currentUser ? (
                      <nav className="mynav">
                      <i
                          className="fa fa-bars"
                          aria-hidden="true"
                          onClick={e => this.handleToggle(e)}
                      />
                      
                          <ul className={`collapsed ${isExpanded ? "is-expanded" : ""}`}
                          onClick={e => this.handleToggle(e)}>
                          <li  className={this.props.page =='login' ? "active" : ""}>
                          <Nav.Link onClick={this.logOut} to="/home" as={Link}>

LogOut
</Nav.Link>
                        </li>
                         
                          </ul>
                      

                  </nav>
                    ):(
<nav className="mynav">
<i
    className="fa fa-bars"
    aria-hidden="true"
    onClick={e => this.handleToggle(e)}
/>

    <ul className={`collapsed ${isExpanded ? "is-expanded" : ""}`}
    onClick={e => this.handleToggle(e)}>
    <li  className={this.props.page =='login' ? "active" : ""}>
  <Nav.Link to="/auth/login-page" as={Link}>
<i className="nc-icon nc-mobile"></i>
Login
</Nav.Link>
  </li>
   
        <li className={this.props.page =='register' ? "active" : ""}>
  <Nav.Link to="/auth/register-page" as={Link}>
<i className="nc-icon nc-badge"></i>
Register
</Nav.Link>
</li>
    </ul>


</nav>
                    )}
                    
                    
                </Container>
            </Navbar>
        );
    }
}

export default withRouter(AuthNavbar);
