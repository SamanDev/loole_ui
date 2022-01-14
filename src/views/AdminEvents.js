import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Input, Segment } from "semantic-ui-react";
import CurrencyFormat from "react-currency-format";
import { Col } from "react-bootstrap";

function editCounry(options) {
  //options.sort((a, b) => (a.id > b.id) ? 1 : -1)
  var newArray = [];

  options.map((item) => {
    //item.matchTables.sort((a, b) => (a.id < b.id) ? 1 : -1)
    item.matchTables.map((match) => {
      var newitem = {};
      newitem.id = match.id;
      newitem.eventid = item.id;
      newitem.gameName = item.gameName;
      newitem.gameMode = item.gameMode;
      newitem.amount = item.amount;
      newitem.match = match;
      newitem.detail = JSON.stringify(newitem);

      newArray.push(newitem);
    });
  });

  return newArray;
}
const conditionalRowStyles = [
  {
    when: (row) => row.match.status === "InPlay",
    style: {
      backgroundColor: "rgba(255,0,0,.1)",
    },
  },
  {
    when: (row) => row.match.status === "Pending",
    style: {
      backgroundColor: "rgba(0,0,0,.1)",
    },
  },
  // You can also pass a callback to style for additional customization
  {
    when: (row) => row.match.status === "Ready",
    style: {
      backgroundColor: "rgba(0,0,0,.1)",
    },
  },
  {
    when: (row) => row.match.status === "Finished",
    style: {
      backgroundColor: "rgba(0,255,0,.1)",
    },
  },
];

const noDataComponent = (
  <Col xl="12" style={{ textAlign: "center", color: "rgba(0,0,0,.5)" }}>
    <div>
      <h4>Empty List.</h4>
      <h5>You currently don't have any record.</h5>
    </div>
  </Col>
);
var moment = require("moment");

const FilterComponent = ({ filterText, onFilter }) => (
  <>
    <Input
      icon="search"
      placeholder="Search..."
      id="search"
      type="text"
      placeholder="Filter By Name"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
  </>
);

function Admin(prop) {
  //const { data: usersList } = useAllEvents();
  const [myState, setMyState] = useState(prop.myState);
  useEffect(() => {
    setMyState(prop.myState);
  }, [prop.myState]);
  const usersList = prop.findStateId(myState, "events");

  const [filterText, setFilterText] = React.useState("");
  const [exMode, setExMode] = React.useState("Data");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const [dataTransaction, setDataTransaction] = React.useState([]);
  const filteredItems = dataTransaction.filter((item) =>
    item.detail.toString().toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      grow: 0.5,
    },

    {
      name: "info",
      selector: (row) => row.gameName,
      format: (row) => (
        <>
          {row.gameMode == "Tournament" ? (
            <a
              href={"/lobby?id=" + row.eventid + "&matchid=" + row.match.id}
              target="_blank"
            >
              {row.match.id}: {row.gameName}
            </a>
          ) : (
            <a href={"/lobby?id=" + row.eventid} target="_blank">
              {row.eventid}: {row.gameName}
            </a>
          )}
        </>
      ),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      format: (row) => row.match.status,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      format: (row) => (
        <>
          ${" "}
          <CurrencyFormat
            value={Number.parseFloat(row.amount).toFixed(2)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={""}
            renderText={(value) => value}
          />
        </>
      ),
      sortable: true,
    },
    {
      name: "Code",
      selector: (row) => row.match.matchCode,
      format: (row) => row.match.matchCode,
      sortable: true,
    },
    {
      name: "P1",
      selector: (row) => row.match.matchPlayers,
      format: (row) =>
        row.match.matchPlayers[0]?.username
          .replace("Tournament Player1", "")
          .replace("Tournament Player", ""),
      sortable: true,
    },
    {
      name: "P2",
      selector: (row) => row.match.matchPlayers,
      format: (row) =>
        row.match.matchPlayers[1]?.username
          .replace("Tournament Player1", "")
          .replace("Tournament Player", ""),
      sortable: true,
    },
    {
      name: "Winner",
      selector: (row) => row.match.winner,
      format: (row) => row.match.winner,
      sortable: true,
    },
  ];
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        setExMode={setExMode}
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle, dataTransaction]);
  useEffect(() => {
    if (usersList) {
      const newdata = editCounry(usersList);
      setDataTransaction(newdata);
    }
  }, [usersList]);

  return (
    <>
      <Segment>
        <div style={{ height: "calc(100vh - 150px)", overflow: "auto" }}>
          <DataTable
            columns={columns}
            data={filteredItems}
            defaultSortFieldId={1}
            defaultSortAsc={false}
            title="Events List"
            conditionalRowStyles={conditionalRowStyles}
            noDataComponent={noDataComponent}
            pagination
            paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            persistTableHead
          />
        </div>
      </Segment>
    </>
  );
}

export default Admin;
