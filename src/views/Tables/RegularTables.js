import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  Table,
  Container,
  Row,Modal,
  Col,OverlayTrigger, Tooltip
} from "react-bootstrap";
import ProgressBar from 'react-bootstrap/ProgressBar'
function RegularTables() {
  const [show, setShow] = React.useState(false);
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
    

      <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Row>
                      <Col md="3">
          <Card className="card-user">
            <Card.Header className="no-padding">
              <div className="card-image">
                <img
                  alt="..."
                  src={require("assets/img/sidebar-1.jpg").default}
                ></img>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="author">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img
                    alt="..."
                    className="avatar border-gray"
                    src={require("assets/img/default-avatar.png").default}
                  ></img>
                  <Card.Title as="h5">Tania Keatley</Card.Title>
                </a>
                <p className="card-description">michael24</p>
              </div>
              <p className="card-description text-center">
                Hey there! As you can see, <br></br>
                it is already looking great.
              </p>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
              <div className="button-container text-center">
                <Button
                  
                  href="#"
                  onClick={handleShow}
                  variant="danger"
                >
                  Register
                </Button>
                
              </div>
            </Card.Footer>
          </Card>
        </Col><Col md="3">
          <Card className="card-user">
            <Card.Header className="no-padding">
              <div className="card-image">
                <img
                  alt="..."
                  src={require("assets/img/full-screen-image-3.jpg").default}
                ></img>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="author">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img
                    alt="..."
                    className="avatar border-gray"
                    src={require("assets/img/default-avatar.png").default}
                  ></img>
                  <Card.Title as="h5">Tania Keatley</Card.Title>
                </a>
                <p className="card-description">michael24</p>
              </div>
              <p className="card-description text-center">
                Hey there! As you can see, <br></br>
                it is already looking great.
              </p>
            </Card.Body>
            <Card.Footer>
              <hr></hr>
              <div className="button-container text-center">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
                </Button>
              </div>
            </Card.Footer>
          </Card>
        </Col>
                        </Row>
        <Row>
          <Col md="12">
         
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Striped Table with Hover</Card.Title>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </Card.Header>
              <Card.Body className="table-responsive p-0">
              <Table className="table-bigboy">
        <thead>
          <tr>
            <th className="text-center">Thumb</th>
            <th>Blog Title</th>
            <th className="th-description">Description</th>
            <th className="text-right">Date</th>
            <th className="text-right">Views</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="img-container">
                <img
                  alt="..."
                  src={require("assets/img/blog-1.jpg").default}
                ></img>
              </div>
            </td>
            <td className="td-name">10 Things that all designers do</td>
            <td>
              Most beautiful agenda for the office, really nice paper and black
              cover. Most beautiful agenda for the office.
            </td>
            <td className="td-number">30/08/2016</td>
            <td className="td-number">1,225</td>
            <td className="td-actions">
              <OverlayTrigger
                overlay={<Tooltip id="tooltip-618009180">View Post..</Tooltip>}
                placement="left"
              >
                <Button
                  className="btn-link btn-icon"
                  type="button"
                  variant="info"
                >
                  <i className="far fa-image"></i>
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                overlay={<Tooltip id="tooltip-461494662">Edit Post..</Tooltip>}
                placement="left"
              >
                <Button
                  className="btn-link btn-icon"
                  type="button"
                  variant="success"
                >
                  <i className="fas fa-edit"></i>
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-408856985">Remove Post..</Tooltip>
                }
                placement="left"
              >
                <Button
                  className="btn-link btn-icon"
                  type="button"
                  variant="danger"
                >
                  <i className="fas fa-times"></i>
                </Button>
              </OverlayTrigger>
            </td>
          </tr>
          <tr>
            <td>
              <div className="img-container">
                <img
                  alt="..."
                  src={require("assets/img/blog-2.jpg").default}
                ></img>
              </div>
            </td>
            <td className="td-name">Back to School Offer</td>
            <td>
              Design is not just what it looks like and feels like. Design is
              how it works.
            </td>
            <td className="td-number">17/07/2016</td>
            <td className="td-number">49,302</td>
            <td className="td-actions">
              <OverlayTrigger
                overlay={<Tooltip id="tooltip-65578954">View Post..</Tooltip>}
                placement="left"
              >
                <Button
                  className="btn-link btn-icon"
                  type="button"
                  variant="info"
                >
                  <i className="far fa-image"></i>
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                overlay={<Tooltip id="tooltip-38536367">Edit Post..</Tooltip>}
                placement="left"
              >
                <Button
                  className="btn-link btn-icon"
                  type="button"
                  variant="success"
                >
                  <i className="fas fa-edit"></i>
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-220404926">Remove Post..</Tooltip>
                }
                placement="left"
              >
                <Button
                  className="btn-link btn-icon"
                  type="button"
                  variant="danger"
                >
                  <i className="fas fa-times"></i>
                </Button>
              </OverlayTrigger>
            </td>
          </tr>
        </tbody>
      </Table>
                <Table className="table-hover table-striped w-full">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Salary</th>
                      <th>Country</th>
                      <th>City</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr  onClick={handleShow}>
                      <td>1</td>
                      <td><a
                href="/lock/lock" 
               
              >Dakota Rice</a></td>
                      <td>$36,738</td>
                      <td>Niger</td>
                      <td>60/100<br/><ProgressBar now={60} /></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Minerva Hooper</td>
                      <td>$23,789</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Sage Rodriguez</td>
                      <td>$56,142</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Philip Chaney</td>
                      <td>$38,735</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Doris Greene</td>
                      <td>$63,542</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Mason Porter</td>
                      <td>$78,615</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Table on Plain Background</Card.Title>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </Card.Header>
              <Card.Body className="table-responsive p-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Salary</th>
                      <th>Country</th>
                      <th>City</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Dakota Rice</td>
                      <td>$36,738</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Minerva Hooper</td>
                      <td>$23,789</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Sage Rodriguez</td>
                      <td>$56,142</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Philip Chaney</td>
                      <td>$38,735</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Doris Greene</td>
                      <td>$63,542</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Mason Porter</td>
                      <td>$78,615</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col md="12">
            <Card className="regular-table-with-color">
              <Card.Header>
                <Card.Title as="h4">Regular Table with Colors</Card.Title>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </Card.Header>
              <Card.Body className="table-responsive p-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Salary</th>
                      <th>Country</th>
                      <th>City</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="success">
                      <td>1</td>
                      <td>Dakota Rice (Success)</td>
                      <td>$36,738</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Minerva Hooper</td>
                      <td>$23,789</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                    </tr>
                    <tr className="info">
                      <td>3</td>
                      <td>Sage Rodriguez (Info)</td>
                      <td>$56,142</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Philip Chaney</td>
                      <td>$38,735</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                    </tr>
                    <tr className="danger">
                      <td>5</td>
                      <td>Doris Greene (Danger)</td>
                      <td>$63,542</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Mason Porter</td>
                      <td>$78,615</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                    </tr>
                    <tr className="warning">
                      <td>7</td>
                      <td>Mike Chaney (Warning)</td>
                      <td>$38,735</td>
                      <td>Romania</td>
                      <td>Bucharest</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
     
    </>
  );
}

export default RegularTables;
