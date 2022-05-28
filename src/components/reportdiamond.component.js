import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";

// react-bootstrap components
import { Link } from "react-router-dom";
import {
  Header,
  Dimmer,
  Loader,
  Icon,
  Segment,
  Table,
} from "semantic-ui-react";
import {
  date_edit_report,
  getGroupBadgeBlock,
  haveAdmin,
} from "components/include.js";

import DataTable from "react-data-table-component";
import { useUserReports } from "services/hooks";
import UserContext from "context/UserState";
var moment = require("moment");
const genLink = (row) => {
  var _link =
    "/lobby/" +
    row.eventId +
    "/" +
    row.mode.replace("Registered", "") +
    " " +
    row.description.split(" - ")[1] +
    "/";
  return _link.replace(/ /g, "-").replace("-Noundefined", "");
};
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
const headerRow = ["Name", "Value"];
const renderBodyRow = ({ name, value }, i) => ({
  key: name || `row-${i}`,
  cells: [name, value],
});
const ExpandedComponent = (props) => {
  var data = props.data;

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
};
const devWid = document.documentElement.clientWidth;
var _perPage = 10;
var _style = { minHeight: "calc(100vh - 240px)", padding: 0 };
if (devWid < 700) {
  _perPage = 8;
  _style = { minHeight: "calc(100vh - 260px)", padding: 0 };
}
function editCounry(options) {
  var newArray = [];
  var newArrayDelete = [];
  options?.sort((a, b) => (a.id > b.id ? 1 : -1));
  try {
    options.map((item, w) => {
      if (item.coin == "Point" || item.mode == "Point") {
        newArray.push(item);
      }
    });
  } catch (e) {}

  const filteredArr = newArray.reduce((itm, current) => {
    const x = itm.find(
      (item) =>
        item.startBalance === current.endBalance &&
        item.description.split(" - ")[0] == current.description.split(" - ")[0]
    );
    const y = itm.find(
      (item) =>
        item.description.split(" - ")[0] ==
          current.description.split(" - ")[0] &&
        (item.mode.indexOf("Expired") > -1 ||
          current.mode.indexOf("Expired") > -1)
    );
    if (!x || 1 == 1) {
      if (!y || 1 == 1) {
        return itm.concat([current]);
      } else {
        return itm.filter(function (item) {
          return item.id !== current.id && item.id !== y.id;
        });
      }
    } else {
      return itm.filter(function (item) {
        return item.id !== current.id && item.id !== x.id;
      });
    }
  }, []);
  newArray?.map((itemdelete, w) => {
    const z = filteredArr.find((item) => item.id == itemdelete.id);
    if (!z) {
      newArrayDelete.push(itemdelete.id);
    }
  });

  return filteredArr;
}
const conditionalRowStyles = [
  {
    when: (row) => row.endBalance < row.startBalance,
    style: {
      backgroundColor: "rgba(255,0,0,.1)",
    },
  },
  // You can also pass a callback to style for additional customization
  {
    when: (row) => row.endBalance > row.startBalance,
    style: {
      backgroundColor: "rgba(0,255,0,.1)",
    },
  },
];
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
    selector: (row) => row.createDate,
    format: (row) => date_edit_report(row.createDate),
    width: "350px",
  },
  {
    name: "Description",

    selector: (row) => (
      <>
        {row.eventId ? (
          <>
            <Link to={genLink(row)} target="_blank">
              {row.description
                .split("&")[0]
                .split(" - ")[0]
                .replace("Event Id", "EID")}
            </Link>
            {" - "}
            {row.description.split(" - ")[1]?.replace("Point", "") +
              " - " +
              row.mode

                .replace("Point", "Commission")
                .replace("Duel", "")
                .replace("Registered", " Join")
                .replace("Unregistered", " Leave")}
          </>
        ) : (
          <>
            {row.description
              .replace("Event Id", "EID")
              .replace("Point", "Diamonds") +
              " " +
              row.mode
                .replace("Point", "")
                .replace("Duel", "")
                .replace("Registered", " Join")
                .replace("Unregistered", " Leave")}
          </>
        )}
      </>
    ),
    sortable: true,
    grow: 4,
    minWidth: "200px",
  },

  {
    name: "Amount",
    selector: (row) => row.amount,
    format: (row) => getGroupBadgeBlock("Point", row.amount, "small left"),
    sortable: true,
  },
  {
    name: "EndBank",
    selector: (row) => row.endBalance,
    format: (row) => getGroupBadgeBlock("Point", row.endBalance, "small left"),
    sortable: true,
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
var dataTransaction = [];

function Report(prop) {
  const [myData, setMydata] = useState();
  const { data: userReports, isLoading } = useUserReports(prop.user.id);
  const context = useContext(UserContext);
  const { currentUser } = context.uList;
  dataTransaction = userReports;
  useEffect(() => {
    if (userReports) {
      setMydata(editCounry(userReports));
    }
  }, [userReports]);
  if (isLoading) {
    return (
      <>
        <Header as="h2">
          <Icon name="diamond" />
          <Header.Content>
            Diamonds
            <Header.Subheader>See your Diamonds Transactions</Header.Subheader>
          </Header.Content>
        </Header>
        <Dimmer active inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>
      </>
    );
  }
  return (
    <>
      <Header as="h2">
        <Icon.Group className="icon" size="big">
          <Icon name="diamond" />
          <Icon corner="bottom right" color="teal" name="list ul" />
        </Icon.Group>
        <Header.Content>
          Diamonds
          <Header.Subheader>See your Diamonds Transactions</Header.Subheader>
        </Header.Content>
      </Header>
      <Segment style={_style}>
        <DataTable
          columns={columns}
          data={myData}
          defaultSortFieldId={1}
          defaultSortAsc={false}
          expandOnRowClicked={haveAdmin(currentUser.roles) ? true : false}
          pagination
          paginationPerPage={_perPage}
          conditionalRowStyles={conditionalRowStyles}
          expandableRows
          expandableRowsHideExpander={true}
          expandableRowsComponent={ExpandedComponent}
          noDataComponent={noDataComponent}
        />
      </Segment>
    </>
  );
}

export default withRouter(Report);
