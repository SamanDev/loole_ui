import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  Pagination,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function AdminFooter() {
  return (
    <>
      <footer className="footer">
          <nav>
            
            <p className="copyright text-center">
              © <script>document.write(new Date().getFullYear())</script>
              <a href="http://www.creative-tim.com">Loole</a>, Allright reserved.
            </p>
          </nav>
       
      </footer>
    </>
  );
}

export default AdminFooter;
