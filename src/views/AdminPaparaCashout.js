import React, { useEffect, useState, useContext } from "react";
import DataTable from "react-data-table-component";
import { Input, Segment } from "semantic-ui-react";
import CurrencyFormat from "react-currency-format";
import { Col } from "react-bootstrap";
import { usePapara } from "services/hooks";
import { Header, Dimmer, Button } from "semantic-ui-react";
import { genLink, getMatchTitle, setAvatar } from "components/include.js";
import Avatar from "react-avatar";
import GlobalContext from "context/GlobalState";
import adminService from "services/admin.service";
import Swal from "sweetalert2";
function editCounry(options) {
  var pay = JSON.parse(options);
  var user = "salar";
  try {
    user = pay.username;
  } catch (err) {}
  if (!user) {
    user = "salar";
  }
  var res = pay.TRY;
  return (
    <>
      <a href={"/user/" + user} target="_blank">
        <Avatar size="20" title={user} round={true} name={setAvatar(user)} />{" "}
        {user.toUpperCase()}
      </a>{" "}
      |<b>{res}</b> TL
    </>
  );
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
  const { data: papara } = usePapara("getCashout");
  const [myState, setMyState] = useState(prop.myState);
  useEffect(() => {
    setMyState(prop.myState);
  }, [prop.myState]);

  const [filterText, setFilterText] = React.useState("");
  const [exMode, setExMode] = React.useState("Data");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const [dataTransaction, setDataTransaction] = React.useState([]);
  const filteredItems = dataTransaction.filter((item) =>
    item.description.toString().toLowerCase().includes(filterText.toLowerCase())
  );
  const updateStatus = (row, status) => {
    var id = row.description.split("userId: ")[1].split(" ")[0];

    adminService.changeReportStatus("cashout", id, status).then((response) => {
      if (response) {
        Swal.fire({
          title: "Success",
          text: "Saved",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: `Ok`,
        }).then(() => {});
      }
    });
  };
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },

    {
      name: "info",
      selector: (row) => row.description,
      format: (row) => (
        <>
          <a href={row.description} target="_blank">
            Open Papara
          </a>
        </>
      ),
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
      name: "Status",
      selector: (row) => row.status,
      format: (row) => row.status,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => row.id,
      format: (row) => (
        <>
          <Button
            size="mini"
            color="green"
            onClick={() => updateStatus(row, "Done")}
          >
            Done
          </Button>{" "}
          <Button
            size="mini"
            color="red"
            onClick={() => updateStatus(row, "Canceled")}
          >
            Canceled
          </Button>
        </>
      ),
      sortable: false,
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
    if (papara) {
      setDataTransaction(papara);
    }
  }, [papara]);

  return (
    <>
      <Segment>
        <div style={{ height: "calc(100vh - 150px)", overflow: "auto" }}>
          <DataTable
            columns={columns}
            data={filteredItems}
            defaultSortFieldId={1}
            defaultSortAsc={false}
            title="Papara Cashout List"
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
