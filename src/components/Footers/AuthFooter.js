import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Container,
  Col,
} from "react-bootstrap";

function AuthFooter() {
  return (
    <>
      <footer className="footer position-absolute fixed-bottom">
        
      <nav>
            
            <p className="copyright text-center">
              © 2019-2020 <a href="https://loole.online">Loole</a>, Allright reserved.
            </p>
          </nav>
      </footer>
    </>
  );
}

export default AuthFooter;
