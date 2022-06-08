import React from "react";
import { Table } from "semantic-ui-react";
const moment = require("moment");
function getchatTime(date) {
  var thisDate2 = date.replace("-07:00", "+00:00");
  var dateExpired = moment(thisDate2).local().format("MM/DD - HH:mm");

  return dateExpired;
}
const TableExampleCollapsing = (props) => {
  var _data = props.data;
  var _track = props.pointTrack;
  var _ruleTrack = props.ruleTrack;
  if (_ruleTrack[4]?.weight.indexOf(" First") > -1) {
    _data.sort((a, b) => (a.battleTime < b.battleTime ? 1 : -1));
  } else {
    _data.sort((a, b) => (a.score < b.score ? 1 : -1));
  }

  if (_data.length == 0) {
    return null;
  } else {
    return (
      <Table unstackable size="small" className={props.className} id={props.id}>
        <Table.Header>
          <Table.Row>
            <Table.Cell>
              <b>Date</b>
            </Table.Cell>
            <Table.Cell>
              <b>Crowns</b>
            </Table.Cell>
            <Table.Cell>
              <b>HP</b>
            </Table.Cell>
            {_track[1].weight.split(" ")[2] != "0" && (
              <Table.Cell>
                <b>Trophy</b>
              </Table.Cell>
            )}

            <Table.Cell style={{ textAlign: "right" }}>
              <b>Score</b>
            </Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_data.map((item, i) => {
            if (i < parseInt(props.minMatch) * 3 && i < 20) {
              return (
                <Table.Row key={i} disabled={i >= parseInt(props.minMatch)}>
                  <Table.Cell>{getchatTime(item.battleTime)}</Table.Cell>
                  <Table.Cell>{item.crowns}</Table.Cell>
                  <Table.Cell>{item.hp}</Table.Cell>
                  {_track[1].weight.split(" ")[2] != "0" && (
                    <Table.Cell>{item.trophyChange}</Table.Cell>
                  )}
                  <Table.Cell style={{ textAlign: "right" }}>
                    <b>{item.score}</b>
                  </Table.Cell>
                </Table.Row>
              );
            }
          })}
        </Table.Body>
      </Table>
    );
  }
};

export default TableExampleCollapsing;
