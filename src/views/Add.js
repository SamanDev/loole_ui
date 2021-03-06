import React, { Component } from "react";

import { withRouter } from "react-router-dom";

// react-bootstrap components
import { Card, Nav, Tab } from "react-bootstrap";

import { haveAdmin, haveModerator } from "components/include";

import AddTournament from "components/add/addtournament.component";
import AddLeague from "components/add/addleague.component";
import AddClashRoyale from "components/add/addclashroyale.component";
import AddWarzone from "components/add/addwarzone.component";
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
        {(haveAdmin(currentUser.roles) || haveModerator(currentUser.roles)) && (
          <>
            <Tab.Container id="plain-tabs-example" defaultActiveKey="league">
              <Nav role="tablist" variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="tournsment">Tournament</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="league">League</Nav.Link>
                </Nav.Item>
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
                    <Tab.Pane
                      eventKey="league"
                      className="ui  segment  tab basic"
                    >
                      <AddLeague token={currentUser} {...this.props} />
                    </Tab.Pane>
                  </Tab.Content>
                </Card.Body>
              </Card>
            </Tab.Container>
          </>
        )}
      </>
    );
  }
}

export default withRouter(CreateMatch);
