import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Media,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Register  from "components/register.component";
import AuthNavbar from "components/Navbars/AuthNavbar.js";
function RegisterPage() {
  const [cardClasses, setCardClasses] = React.useState("card-hidden");
  React.useEffect(() => {
    setTimeout(function () {
      setCardClasses("");
    }, 100);
  });
  return (
    <>
      <div
        className="full-page register-page section-image"
        data-color="orange"
        data-image={require("assets/img/bg.jpg").default}
      >
        <div className="content d-flex align-items-center">
          <Container>
            <Card className="card-register card-plain text-center">
              <Card.Header>
                <Row className="justify-content-center">
                  <Col md="8">
                    <div className="header-text">
                      <Card.Title as="h2">
                        Create Loole Account for Free
                      </Card.Title>
                      <Card.Subtitle as="h4">
                        Register for free and make  money today
                      </Card.Subtitle>
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
                  <Register/>
                  </Card.Body>
                  
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
              "url(" + require("assets/img/bg.jpg").default + ")",
          }}
        ></div>
      </div>
    </>
  );
}

export default RegisterPage;
