import React, { Component } from "react";
import Avatar from "react-avatar";

import { Link } from "react-router-dom";
import { faTwitch } from "@fortawesome/free-brands-svg-icons";

import CurrencyFormat from "react-currency-format";
import {
  Button,
  Label,
  Divider,
  Segment,
  Header,
  List,
  Message,
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import $ from "jquery";
import userService from "services/user.service";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddToCal from "components/addtocal.component";
import Table from "components/table.component";
import Countdown from "react-countdown";
import { Col, ProgressBar } from "react-bootstrap";
import {
  setAvatar,
  rendererBig,
  printEventBTN,
  vsComponentTitle,
  getColorStatus,
  printStatus,
  handleTagForm,
  getGroupBadgeBlock,
  printJoinalerts,
  getIconPlat,
  printTag,
  isJson,
  date_edit,
  date_edit_card,
} from "components/include";

var moment = require("moment");
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function Tracking(prop) {
  const rules = JSON.parse(prop.rules);

  var RuleTrack = rules.RuleTrack;
  var pointTrack = rules.pointTrack;
  return (
    <Segment inverted color="yellow">
      <Header as="h2">Results Tracking Rules</Header>
      <Message color="red">
        <List divided relaxed>
          {RuleTrack.map((win, i) => {
            return (
              <List.Item key={i.toString()}>
                <List.Content style={{ textAlign: "left" }}>
                  <span style={{ fontSize: 17 }}>
                    <Label>{win.text}</Label>
                  </span>
                  <span style={{ float: "right", marginLeft: 5 }}>
                    <Label color="red">
                      {isNumeric(win.weight) ? (
                        <CurrencyFormat
                          value={win.weight}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={""}
                          renderText={(value) => value}
                        />
                      ) : (
                        win.weight
                      )}
                    </Label>
                  </span>
                </List.Content>
              </List.Item>
            );
          })}
        </List>
      </Message>
      <Header as="h2">Results Tracking</Header>
      <Message>
        <List divided inverted relaxed>
          {pointTrack.map((win, i) => {
            return (
              <List.Item key={i.toString()}>
                <List.Content style={{ textAlign: "left" }}>
                  <span style={{ fontSize: 17 }}>
                    <Label>{win.text}</Label>
                  </span>
                  <span style={{ float: "right", marginLeft: 5 }}>
                    <Label color="green">{win.weight}</Label>
                  </span>
                </List.Content>
              </List.Item>
            );
          })}
        </List>
      </Message>
    </Segment>
  );
}
export default Tracking;
