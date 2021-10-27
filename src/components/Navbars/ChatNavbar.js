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

} from "react-bootstrap";
class AdminNavbar extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
          currentUser: { username: "" },
            showModeratorBoard: false,
            showAdminBoard: false,
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
        const { currentUser, showModeratorBoard, showAdminBoard, collapseOpen, isExpanded } = this.state;
     
        return (
          <Navbar expand="lg" className="fixed-top " style={{background:'transparent'}}>
           
          <Container fluid>
          
            <div className="navbar-wrapper">
              
            
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
            
            </Navbar>
        );
    }
}

export default (AdminNavbar);
