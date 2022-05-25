import React from "react";
import { Header, Image, Table } from "semantic-ui-react";

const moment = require("moment");
const TableExampleCollapsing = (props) => {
  var _data = props.data;
  _data.sort((a, b) => (a.score < b.score ? 1 : -1));
  return (
    <Table celled size="small" className={props.className} id={props.id}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>Crowns</Table.HeaderCell>
          <Table.HeaderCell>HP</Table.HeaderCell>
          <Table.HeaderCell>Trophy</Table.HeaderCell>
          <Table.HeaderCell>Score</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {_data.map((item, i) => {
          if (i < 5) {
            var time = moment(item.battleTime).format("MM-DD hh:mm");
            return (
              <Table.Row>
                <Table.Cell>{time}</Table.Cell>
                <Table.Cell>{item.crowns}</Table.Cell>
                <Table.Cell>{item.hp}</Table.Cell>
                <Table.Cell>{item.trophyChange}</Table.Cell>
                <Table.Cell>{item.score}</Table.Cell>
              </Table.Row>
            );
          }
        })}
      </Table.Body>
    </Table>
  );
};

export default TableExampleCollapsing;
