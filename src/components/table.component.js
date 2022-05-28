import React from "react";
import { Header, Image, Table } from "semantic-ui-react";
import { date_edit, get_date_locale, editDateTime } from "components/include";
const moment = require("moment");
const TableExampleCollapsing = (props) => {
  var _data = props.data;
  _data.sort((a, b) => (a.score < b.score ? 1 : -1));

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
            <Table.Cell>
              <b>Trophy</b>
            </Table.Cell>
            <Table.Cell style={{ textAlign: "right" }}>
              <b>Score</b>
            </Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_data.map((item, i) => {
            if (i < parseInt(props.minMatch) * 3 && i < 10) {
              var _date = date_edit(item.battleTime);
              var stdate = moment(_date).format("MM-DD HH:mm");
              return (
                <Table.Row key={i} disabled={i >= parseInt(props.minMatch)}>
                  <Table.Cell>{stdate}</Table.Cell>
                  <Table.Cell>{item.crowns}</Table.Cell>
                  <Table.Cell>{item.hp}</Table.Cell>
                  <Table.Cell>{item.trophyChange}</Table.Cell>
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
