import React from "react";
import { Header, Image, Table } from "semantic-ui-react";
import { date_edit, get_date_locale, editDateTime } from "components/include";
const moment = require("moment");
const TableExampleCollapsing = (props) => {
  var _data = props.data;
  _data.sort((a, b) => (a.score < b.score ? 1 : -1));

  console.log(props.minMatch);
  return (
    <Table celled size="small" className={props.className} id={props.id}>
      <Table.Header>
        <Table.Row>
          <Table.Cell>Date</Table.Cell>
          <Table.Cell>Crowns</Table.Cell>
          <Table.Cell>HP</Table.Cell>
          <Table.Cell>Trophy</Table.Cell>
          <Table.Cell>Score</Table.Cell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {_data.map((item, i) => {
          if (i < parseInt(props.minMatch)) {
            var _date = date_edit(item.battleTime);
            var stdate = moment(_date).format("MM-DD HH:mm");
            return (
              <Table.Row>
                <Table.Cell>{stdate}</Table.Cell>
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
