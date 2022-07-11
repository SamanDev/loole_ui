import React, { useEffect, useState, useContext } from "react";
import DataTable from "react-data-table-component";
import { Input } from "semantic-ui-react";
import CurrencyFormat from "react-currency-format";
import { Col } from "react-bootstrap";
import { useCashier } from "services/hooks";
import {
  Header,
  Dimmer,
  Button,
  Segment,
  Table,
  Loader,
} from "semantic-ui-react";
import { genLink, getMatchTitle, setAvatar } from "components/include.js";
import Avatar from "react-avatar";
import GlobalContext from "context/GlobalState";
import adminService from "services/admin.service";
import {
  date_edit_report,
  getGroupBadgeBlock,
  isJson,
} from "components/include.js";
import Swal from "sweetalert2";
function CleanData(options) {
  var newArray = [];

  if (options) {
    var getC = options;

    //options.map((item, w) => {
    Object.keys(getC).map(function (key) {
      var _obj = getC[key];
      var _val = key;
      if (_obj) {
        newArray.push({
          name: key,

          value: _obj,
        });
      }
    });
  }

  return newArray;
}
function editUser(user) {
  return (
    <>
      <a href={"/user/" + user} target="_blank">
        <Avatar size="20" title={user} round={true} name={setAvatar(user)} />{" "}
        {user.toUpperCase()}
      </a>{" "}
    </>
  );
}
const headerRow = ["Name", "Value"];
const renderBodyRow = ({ name, value }, i) => ({
  key: name || `row-${i}`,
  cells: [name, value],
});
const ExpandedComponent = (props) => {
  var data = props.data;
  if (isJson(data)) {
    var _data = [CleanData(data)];

    var jdata = JSON.parse(JSON.stringify(_data));

    return (
      <Segment>
        <Table
          celled
          color="red"
          renderBodyRow={renderBodyRow}
          tableData={jdata[0]}
        />
      </Segment>
    );
  } else {
    return <Segment>{data}</Segment>;
  }
};
function editCounry(options) {
  if (isJson(options)) {
    var newArray = [];
    var newArrayDelete = [];
    //options?.sort((a, b) => (a.id > b.id ? 1 : -1));
    try {
      options?.map((item, w) => {
        if (
          item.coin != "Point" &&
          item.mode != "Point" &&
          item.status != "Canceled"
        ) {
          newArray.push(item);
        }
      });
    } catch (e) {}

    newArray?.map((itemdelete, w) => {
      newArrayDelete.push(itemdelete.id);
    });

    return newArray;
  } else {
    return options;
  }
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
const CustomLoader = () => (
  <Segment style={{ height: 300, width: "100%" }}>
    <Dimmer active inverted>
      <Loader size="large">Loading...</Loader>
    </Dimmer>
  </Segment>
);

function Admin(prop) {
  const context = useContext(GlobalContext);
  const { isLoading, data: papara } = useCashier(prop.mode);
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
    var pay = JSON.parse(row.description);
    var id = pay.userId;
    adminService.changeReportStatus("deposit", id, status).then((response) => {
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
      width: "80px",
    },
    {
      name: "Date",
      selector: (row) => row.createDate,
      format: (row) => moment(row.createDate).format("YYYY-MM-DD hh:mm"),
      sortable: true,
      width: "150px",
    },
    {
      name: "user",
      selector: (row) => row.username,
      format: (row) => <>{editUser(row.username)}</>,
      width: "200px",
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      format: (row) => (
        <>
          {getGroupBadgeBlock(
            row.coin && prop.mode.indexOf("Admin") >= 1 ? "Point" : "Dollar",
            row.amount,
            "small left"
          )}
        </>
      ),
      sortable: false,
      width: "150px",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      format: (row) => row.status,
      sortable: true,
      width: "150px",
    },
    {
      name: "Gateway",
      selector: (row) => row.gateway,
      format: (row) => (
        <>
          {row.gateway} {row.coin && "-" + row.coin}
        </>
      ),
      sortable: true,
      width: "350px",
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
            title={prop.mode.replace("get", "") + " List"}
            noDataComponent={noDataComponent}
            pagination
            paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            persistTableHead
            progressPending={isLoading}
            progressComponent={<CustomLoader />}
          />
        </div>
      </Segment>
    </>
  );
}

export default Admin;
