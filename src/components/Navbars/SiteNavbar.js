import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { withRouter } from 'react-router';
import AuthService from "services/auth.service";
// import { BurgerIcon } from './'
import styled from "styled-components";
import {
    
    Nav,
    Container,

} from "react-bootstrap";


class SiteNavbar extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
            collapseOpen: false,
            currPage: this.props.page,
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
            if (window.location.href.indexOf('login-page') > -1) { 
              //window.location.href = "/panel/dashboard"; 
            }
        } else {
            //window.location.href = "/";
            //this.props.history.push("/home");
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
            
                <header role="banner" id="fh5co-header">
			<div className="container">
				
			    <nav className="navbar navbar-default">
		        <div className="navbar-header">
		        	
					<a href="#" className="js-fh5co-nav-toggle fh5co-nav-toggle" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><i></i></a>
		          	<a className="navbar-brand" href="index.html"><img
                  src={require("assets/img/logoloole.svg").default}
                  alt="loole-logo"
                  style={{    height: 60, width: 45}}
                />Loole</a> 
		        </div>
		        <div id="navbar" className="navbar-collapse collapse">
		          <ul className="nav navbar-nav navbar-right">
		            <li className="active"><a href="#" data-nav-section="home"><span>Home</span></a></li>
		            <li><a href="#" data-nav-section="about"><span>About</span></a></li>
		            <li><a href="#" data-nav-section="services"><span>Services</span></a></li>
		            <li><a href="#" data-nav-section="features"><span>Features</span></a></li>
		            <li><a href="#" data-nav-section="testimonials"><span>Testimonials</span></a></li>
		            <li><a href="#" data-nav-section="pricing"><span>Pricing</span></a></li>
		            <li><a href="#" data-nav-section="press"><span>Press</span></a></li>
                    {currentUser ? (
                         
                                <li>
                                <Link to="/panel/dashboard" className="external" >
                  <i className="nc-icon nc-grid-45"></i>
                  Dashboard
                </Link>
                                </li>
                               
                     
                        ) : (
                    <>
                          <li>
                          <Link to="/auth/login-page" className="external">
            <i className="nc-icon nc-mobile"></i>
            Login
          </Link>
                          </li>
                          <li>
                          <Link to="/auth/register-page" className="external" >
            <i className="nc-icon nc-badge"></i>
            Register
          </Link>
          </li>
                     </>
                        )}
		          </ul>
		        </div>
			    </nav>
			 
		  </div>
	</header>
          
        );
    }
}

export default (SiteNavbar);
