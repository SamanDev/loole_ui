import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { Redirect, Route } from "react-router";
import AuthService from "services/auth.service";
import {  withRouter} from 'react-router-dom';
import $ from "jquery";
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


class LandNavbar extends Component {
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
        var big_image;
        $().ready(function() {
            $('.selector').click(function() {
                SelectColor(this);
            });
            var selectCol = 0;
            if (selectCol == 0) {
                if ($('body').hasClass('landing-page1')) {
    
                }
            }
    
        });
    
        $(window).on('scroll', function() {
            var responsive = $(window).width();
            if (responsive >= 768) {
              parallax();
          }
          
          if ($(window).scrollTop() >= 100) {
            if (!$('nav.navbar').hasClass('bg-light')) {
              $('nav.navbar').addClass('bg-light navbar-light').removeClass('bg-transparent navbar-dark');
            }
        }else{
          if ($('nav.navbar').hasClass('bg-light')) {
            $('nav.navbar').removeClass('bg-light navbar-light').addClass('bg-transparent navbar-dark');
          }
        }
        });
        $('nav').removeClass('bg-light navbar-light').addClass('bg-transparent navbar-dark');
        function SelectColor(btn) {
            oldColor = $('.filter-gradient').attr('data-color');
            newColor = $(btn).attr('data-color');
    
            oldButton = $('a[id^="Demo"]').attr('data-button');
            newButton = $(btn).attr('data-button');
    
            $('.filter-gradient').removeClass(oldColor).addClass(newColor).attr('data-color', newColor);
    
            $('a[id^="Demo"]').removeClass("btn-" + oldButton).addClass("btn-" + newButton).attr('data-button', newButton);
    
            $('.carousel-indicators').removeClass("carousel-indicators-" + oldColor).addClass("carousel-indicators-" + newColor);
    
            $('.card').removeClass("card-" + oldColor).addClass("card-" + newColor);
    
            $('.selector').removeClass('active');
            $(btn).addClass('active');
        }
    
        $('.switch').each(function() {
            var selector = $(this).parent('li')
            $(this).click(function() {
                if (selector.siblings().hasClass('active')) {
                    selector.addClass('active');
                    selector.siblings().removeClass('active');
                    var slide = $(this).attr('data-slide')
                    var lastClass = $('body').attr('class').split(' ').pop();
                    $('body').removeClass(lastClass);
                    $('body').addClass('landing-page' + slide);
                }
            });
        });
    
        var parallax = debounce(function() {
            
            $('.parallax').each(function() {
                var $elem = $(this);
    
                if (isElementInViewport($elem) ||1==1) {
                    var parent_top = $elem.offset().top;
                    var window_bottom = $(window).scrollTop();
                    var $image = $elem.find('.parallax-background-image')
                    var $oVal = ((window_bottom - parent_top) / 3);
                    $image.css('margin-top', $oVal + 'px');
                }
            });
        }, 6)
    
        function debounce(func, wait, immediate) {
            var timeout;
            return function() {
                var context = this,
                    args = arguments;
                clearTimeout(timeout);
                timeout = setTimeout(function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                }, wait);
                if (immediate && !timeout) func.apply(context, args);
            };
        };
    
    
        function isElementInViewport(elem) {
            var $elem = $(elem);
    
            // Get the scroll position of the page.
            var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
            var viewportTop = $(scrollElem).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
    
            // Get the position of the element on the page.
            var elemTop = Math.round($elem.offset().top);
            var elemBottom = elemTop + $elem.height();
    
            return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
        }
     
        const user = AuthService.getCurrentUser();
        var headerClass = ""
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
            
            <Navbar bg="transparent" expand="lg" fixed="top" >
                <Container>
  <Navbar.Brand to="/home" as={Link} style={{fontFamily: 'Work Sans',paddingLeft:0}}>
                <img
                  src={require("assets/img/logoloole.svg").default}
                  alt="loole.gg logo"
                  style={{height:50,marginRight:10}}
                />
               Loole.gg</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto navbar-dark">
    {currentUser ? (
    <Nav.Link to="/panel/dashboard" as={Link}>Dashboard
</Nav.Link>
    ):(
        <>
        <Nav.Link to="/auth/login-page" as={Link}>Login
</Nav.Link>
 
  <Nav.Link to="/auth/register-page" as={Link}>Register
</Nav.Link>
        </>
    )}

    </Nav>
    
  </Navbar.Collapse>
  </Container>
</Navbar>
           
        );
    }
}

export default withRouter(LandNavbar);
