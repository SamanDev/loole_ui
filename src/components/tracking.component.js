import React from "react";

import CurrencyFormat from "react-currency-format";
import { Label, Segment, Header, List, Message } from "semantic-ui-react";

var moment = require("moment");
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function getchatTime(date) {
  var thisDate2 = date.replace("-07:00", "+00:00");
  var dateExpired = moment(thisDate2).local().format("YYYY/MM/DD - HH:mm");

  return dateExpired;
}
function addMinutes(date, add) {
  var startdate = moment(date).format();
  var newD = moment(startdate).add(add, "minutes").format();

  return newD;
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
          <List.Item>
            <List.Content style={{ textAlign: "left" }}>
              <span style={{ fontSize: 17 }}>
                <Label>Start</Label>
              </span>
              <span style={{ float: "right", marginLeft: 5 }}>
                <Label
                  title={addMinutes(prop.item.startTime, prop.item.repeatEvent)}
                  color="blue"
                >
                  {getchatTime(prop.item.startTime)}
                </Label>
              </span>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content style={{ textAlign: "left" }}>
              <span style={{ fontSize: 17 }}>
                <Label>End</Label>
              </span>
              <span style={{ float: "right", marginLeft: 5 }}>
                <Label
                  title={addMinutes(prop.item.finished, prop.item.repeatEvent)}
                  color="blue"
                >
                  {getchatTime(prop.item.finished)}
                </Label>
              </span>
            </List.Content>
          </List.Item>
          {RuleTrack.map((win, i) => {
            if (
              win.text.indexOf(" Trophy") > -1 ||
              win.text.indexOf("Min Play Time2") > -1
            ) {
              return (
                <List.Item key={i.toString()}>
                  <List.Content style={{ textAlign: "left" }}>
                    <span style={{ fontSize: 17 }}>
                      <Label>{win.text}</Label>
                    </span>
                    <span style={{ float: "right", marginLeft: 5 }}>
                      <Label color="teal">
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
                        {win.text.indexOf("Min Play Time") > -1 && " Hours"}
                      </Label>
                    </span>
                  </List.Content>
                </List.Item>
              );
            }
          })}
          {RuleTrack.map((win, i) => {
            if (
              win.text.indexOf(" Trophy") == -1 &&
              win.text.indexOf("Min Play Time") == -1
            ) {
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
            }
          })}
        </List>
      </Message>
      <Header as="h2">Results Tracking</Header>
      <Message>
        <List divided inverted relaxed>
          {pointTrack.map((win, i) => {
            if (win.weight.split(" ")[2] == "0") return null;
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
