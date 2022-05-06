import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

// react-bootstrap components
import { Link } from "react-router-dom";
import { Header, Dimmer, Loader } from "semantic-ui-react";
import { get_date_locale, getGroupBadgeBlock } from "components/include.js";
import DataTable from "react-data-table-component";
import { useUserReports } from "services/hooks";
function editCounry(options) {
  var newArray = [];
  var newArrayDelete = [];
  options?.sort((a, b) => (a.id > b.id ? 1 : -1));
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

  return newArray;
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
    sortable: true,
    width: "100px",
  },
  {
    name: "Date",
    selector: (row) => row.createDate,
    format: (row) => get_date_locale(row.createDate),
    width: "150px",
  },
  {
    name: "Description",
    selector: (row) => (
      <>
        {row.eventId ? (
          <>
            <Link
              to={
                "/lobby/" +
                row.eventId +
                "/" +
                row.description.split(" - ")[1]?.replace("Dollar", "") +
                "/"
              }
              target="_blank"
            >
              {row.description
                .split("&")[0]
                .split(" - ")[0]
                .replace("Event Id", "EID")}
            </Link>
            {" - "}
            {row.description.split(" - ")[1]?.replace("Dollar", "") +
              " - " +
              row.mode

                .replace("Point", "")
                .replace("Duel", "")
                .replace("Registered", " Join")
                .replace("Unregistered", " Leave")}
          </>
        ) : (
          <>
            {row.description
              .replace("Event Id", "EID")
              .replaceAll('","', " ")
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
    maxWidth: "400px",
  },

  {
    name: "Amount",
    selector: (row) => row.amount,
    format: (row) => getGroupBadgeBlock("Dollar", row.amount, "small left"),
    sortable: true,
    width: "150px",
  },
  {
    name: "EndBank",
    selector: (row) => row.endBalance,
    format: (row) => getGroupBadgeBlock("Dollar", row.endBalance, "small left"),
    sortable: true,
    width: "150px",
  },
];
const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);
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

function Report(prop) {
  const [myData, setMydata] = useState();
  const { data: userReports, isLoading } = useUserReports(prop.user.id);

  useEffect(() => {
    if (userReports) {
      setMydata(editCounry(userReports));
    }
  }, [userReports]);
  if (isLoading) {
    return (
      <>
        <Header as="h3">Transactions</Header>
        <Dimmer active inverted>
          <Loader size="large">Loading</Loader>
        </Dimmer>
      </>
    );
  }
  return (
    <>
      <Header as="h3">Transactions</Header>

      <DataTable
        columns={columns}
        data={myData}
        defaultSortFieldId={1}
        defaultSortAsc={false}
        expandOnRowClicked={true}
        pagination
        conditionalRowStyles={conditionalRowStyles}
        expandableRows
        expandableRowsHideExpander={true}
        expandableRowsComponent={ExpandedComponent}
        noDataComponent={noDataComponent}
      />
    </>
  );
}

export default withRouter(Report);
