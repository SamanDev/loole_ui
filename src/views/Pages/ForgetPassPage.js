import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Col,
} from "react-bootstrap";
import ForgetPass  from "components/forgetpass.component";
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
        data-color="green"
        data-image={require("assets/img/bg.jpg").default}
      >
        <div className="content d-flex align-items-center p-0">
          <Container>
            <Col className="mx-auto" lg="4" md="8" style={{marginTop:30}}>
             
                <Card className={"card-login " + cardClasses}>
                  <Card.Header>
                    <h3 className="header text-center">Password Recovery</h3>
                  </Card.Header>
                  <Card.Body>
                  <ForgetPass/>
                  </Card.Body>
                  
                </Card>
              
            </Col>
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
