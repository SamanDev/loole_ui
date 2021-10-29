import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { withRouter } from 'react-router';
import AuthService from "services/auth.service";
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
    Spinner

} from "react-bootstrap";

class AdminNavbar extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
          currentUser: false,
            showModeratorBoard: false,
            showAdminBoard: false,
            collapseOpen: false,
            currpage:false,
            isExpanded: false
        };

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
      
      let { currentUser, showModeratorBoard, showAdminBoard, collapseOpen, isExpanded,currpage } = this.state;
        
        return (
          <Navbar expand="lg" fixed="top" variant="dark" style={{background:'#111'}}>
          <Container fluid>
            <div className="navbar-wrapper">
            
              <Navbar.Brand onClick={(e) => e.preventDefault()}>
              <span className={this.props.page.indexOf('Profile')>-1 ? "hide" : ""}>{this.props.page }</span>
              <span className={this.props.page.indexOf('Profile')==-1 ? "hide" : ""}>{currentUser.username} Profile</span>
              </Navbar.Brand>
            </div>
            <button
              className="navbar-toggler navbar-toggler-right border-0"
              type="button"
              onClick={(e) =>
                document.documentElement.classList.toggle("nav-open")
              }
            >
              <span className="navbar-toggler-bar burger-lines"></span>
              <span className="navbar-toggler-bar burger-lines"></span>
              <span className="navbar-toggler-bar burger-lines"></span>
            </button>
            <button
              className="navbar-toggler navbar-toggler-right border-0 hide"
              type="button"
              
              onClick={() => setCollapseOpen(!collapseOpen)}
            >
              <span className="navbar-toggler-bar burger-lines"></span>
              <span className="navbar-toggler-bar burger-lines"></span>
              <span className="navbar-toggler-bar burger-lines"></span>
            </button>
            </Container>
            <div className="d-none d-lg-block d-xs-none">
                    <Nav.Item
                      className={
                        location.pathname === "/panel/dashboard"
                          ? "active mr-1"
                          : "mr-1"
                      }
                    >
                      <Nav.Link onClick={this.logOut} to="/home" as={Link}>

                        LogOut
</Nav.Link>
                    </Nav.Item>
                  </div>
            </Navbar>
        );
    }
}

export default (AdminNavbar);
