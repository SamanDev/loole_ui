import React, { Component } from "react";
import Select from "react-select";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Avatar from "react-avatar";

import $ from "jquery";
import Countdown from "react-countdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AuthService from "services/auth.service";
import NumericInput from "react-numeric-input";
import Active from "components/active.component";
import userService from "services/user.service";

// react-bootstrap components
import { Badge, Card, Nav, Row, Col, Tab } from "react-bootstrap";

import {
  setAvatar,
  getColor,
  getIcon,
  renderer,
  isJson,
  getModalTag,
  printRequired,
  haveAdmin,
} from "components/include";
import Games from "server/Games";

import AddTournament from "components/add/addtournament.component";
import AddLeague from "components/add/addleague.component";
import UserContext from "context/UserState";
class CreateMatch extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
  }

  render() {
    var currentUser = this.context.uList.currentUser;

    return (
      <>
        <Tab.Container id="plain-tabs-example" defaultActiveKey="tournsment">
          <Nav role="tablist" variant="tabs">
            {haveAdmin(currentUser.roles) && (
              <>
                <Nav.Item>
                  <Nav.Link eventKey="tournsment">Tournament</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="league">League</Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
          <Card>
            <Card.Body>
              <Tab.Content className="maxheight ">
                <Tab.Pane
                  eventKey="tournsment"
                  className="ui  segment  tab basic"
                >
                  <AddTournament token={currentUser} {...this.props} />
                </Tab.Pane>
                <Tab.Pane eventKey="league" className="ui  segment  tab basic">
                  <AddLeague token={currentUser} {...this.props} />
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
          </Card>
        </Tab.Container>
      </>
    );
  }
}

export default withRouter(CreateMatch);
