import React, { useEffect, useState, useContext } from "react";
import DataTable from "react-data-table-component";
import { Input, Segment } from "semantic-ui-react";
import CurrencyFormat from "react-currency-format";
import { Col } from "react-bootstrap";
import { Header, Dimmer, Loader } from "semantic-ui-react";
import { getGroupBadgeBlock, get_date_locale } from "components/include";
import GlobalContext from "context/GlobalState";
import { Link } from "react-router-dom";
import { useAdminCosts } from "services/hooks";

const noDataComponent = (
  <div
    style={{
      minHeight: 300,
      position: "relative",
      marginTop: 20,
      width: "100%",
    }}
  >
    <Dimmer active inverted>
      <div
        style={{
          textAlign: "center",
          color: "rgba(0,0,0,.5)",
          paddingTop: 30,
          width: "100%",
        }}
      >
        <img
          alt="nodata"
          style={{ height: 80 }}
          src="/assets/images/nodata.svg"
        ></img>
        <h4>Empty List.</h4>
        <h5>You currently don't have any report.</h5>
      </div>
    </Dimmer>
  </div>
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
  const context = useContext(GlobalContext);
  //const { data: events } = useAllEvents();
  const [myState, setMyState] = useState(prop.myState);
  useEffect(() => {
    setMyState(prop.myState);
  }, [prop.myState]);

  const { data: costs, isLoading } = useAdminCosts();

  useEffect(() => {
    if (costs) {
      setDataTransaction(costs);
    }
  }, [costs]);

  const [filterText, setFilterText] = React.useState("");
  const [exMode, setExMode] = React.useState("Data");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const [dataTransaction, setDataTransaction] = React.useState([]);
  const filteredItems = dataTransaction.filter((item) =>
    item.description.toString().toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      format: (row) => row.id,
      sortable: true,
      width: "100px",
    },
    {
      name: "Date",
      selector: (row) => row.date,
      format: (row) => get_date_locale(row.date),
      width: "150px",
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      grow: 4,
      minWidth: "200px",
    },

    {
      name: "Amount",
      selector: (row) => row.amount,
      format: (row) => getGroupBadgeBlock("Dollar", row.amount, "small left"),
      sortable: true,
    },
    {
      name: "User",
      selector: (row) => row.user,
      format: (row) => row.user,
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
  if (isLoading) {
    return (
      <>
        <Segment style={{ height: "calc(100vh - 150px)", overflow: "auto" }}>
          <Dimmer active inverted>
            <Loader size="large">Loading</Loader>
          </Dimmer>
        </Segment>
      </>
    );
  }
  return (
    <>
      <Segment>
        <div style={{ height: "calc(100vh - 150px)", overflow: "auto" }}>
          <DataTable
            columns={columns}
            data={filteredItems}
            defaultSortFieldId={1}
            defaultSortAsc={false}
            title="Costs List"
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
