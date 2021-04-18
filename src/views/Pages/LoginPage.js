import React from "react";

import { NavLink, Link } from "react-router-dom";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Login  from "components/login.component";
function LoginPage() {
  
  const [cardClasses, setCardClasses] = React.useState("card-hidden");
  React.useEffect(() => {
    setTimeout(function () {
      setCardClasses("");
    }, 100);
  });
  return (
    <>
    
      <div
        className="full-page section-image"
        data-color="red"
        data-image={require("assets/img/bg.jpg").default}
      >
      <div className="content d-flex align-items-center">
          <Container>
            <Card className="card-register card-plain text-center">
                <Card.Header>
                <Row className="justify-content-center">
                  <Col md="6">
                    <div className="header-text">
                      <Card.Title as="h2">
                        Login
                      </Card.Title>
                      
                      <hr></hr>
                    </div>
                  </Col>
                </Row>
              </Card.Header>
                  <Card.Body>
                  <Row>
                  <Col className="m-auto" md="5" lg="4">
                  <Card className={"card-login " + cardClasses}>
                 
                  <Card.Body>
                  <Login/>
                  </Card.Body>
                  <Card.Footer>
                  <Link
                    to="/auth/forget-page"
                    
                  >
                    Forget your password?
                  </Link>
                </Card.Footer>
                </Card>
                    
                  </Col>
                </Row>
                  
                  </Card.Body>
                  
                </Card>
      
          </Container>
        </div>
        <div
          className="full-page-background"
          style={{
            backgroundImage:
              "url(" +
              require("assets/img/bg.jpg").default +
              ")",
          }}
        ></div>
      </div>
    </>
  );
}

export default LoginPage;
