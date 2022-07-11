import React, { useEffect, useState } from "react";
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
import { date_edit_report, getGroupBadgeBlock } from "components/include.js";
import DataTable from "react-data-table-component";
import { useUserReports } from "services/hooks";
const genLink = (row) => {
  var _link =
    "/lobby/" +
    row.eventId +
    "/" +
    row.mode.replace("Registered", "") +
    " " +
    row.description.split(" - ")[1] +
    "";
  return _link.replace(/ /g, "-").replace("-Noundefined", "");
};
const CustomLoader = () => (
  <Segment style={{ height: 300, width: "100%" }}>
    <Dimmer active inverted>
      <Loader size="large">Loading...</Loader>
    </Dimmer>
  </Segment>
);
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
        unstackable
        color="red"
        renderBodyRow={renderBodyRow}
        tableData={jdata[0]}
      />
    </Segment>
  );
};
function editCounry(options) {
  var newArray = [];
  var newArrayDelete = [];
  options?.sort((a, b) => (a.id > b.id ? 1 : -1));
  try {
    options?.map((item, w) => {
      if (item.coin != "Point" && item.mode != "Point") {
        newArray.push(item);
      }
    });
  } catch (e) {}

  return newArray;
}

const devWid = document.documentElement.clientWidth;
var _perPage = 10;
if (devWid < 700) {
  _perPage = 8;
}
const conditionalRowStyles = [
  {
    when: (row) => row.endBalance < row.startBalance,
    style: {
      backgroundColor: "rgba(255,0,0,.1)",
    },
  },
  {
    when: (row) => row.endBalance == row.startBalance && row.status == "Done",
    style: {
      backgroundColor: "rgba(0,255,0,.1)",
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
  const [myData, setMydata] = useState([]);
  const { isLoading: repLoading, data: userReports } = useUserReports(
    prop.user.id
  );
  const columns = [
    {
      name: "Date",
      selector: (row) => row.createDate,
      format: (row) => <small>{date_edit_report(row.createDate)}</small>,
      width: "90px",
      sortable: true,
    },
    {
      name: "Action",

      selector: (row) => (
        <>
          <span style={{ opacity: 0, position: "absolute" }}>
            {getGroupBadgeBlock("Dollar", row.startBalance, "small left ")} +
          </span>
          {getGroupBadgeBlock("Dollar", row.startBalance, "small left")}
          {row.endBalance < row.startBalance ? " - " : " + "}
          {getGroupBadgeBlock("Dollar", row.amount, "small left")} {" = "}
          {row.status != "Pending"
            ? getGroupBadgeBlock(
                "Dollar",
                row.endBalance == row.startBalance
                  ? row.startBalance + row.amount
                  : row.endBalance,
                "small left"
              )
            : row.status}
        </>
      ),

      width: "300px",
    },

    {
      name: "Description",
      selector: (row) => (
        <>
          {row.eventId ? (
            <>
              <Link to={genLink(row)}>
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
              {(row.mode == "Deposit" || row.mode == "Cashout") &&
              row.status == "Pending" ? (
                <>
                  <div
                    onClick={() => {
                      prop.onUpdateItem("NotificationsItem", row);
                      prop.onUpdateItem(
                        "cashierMethod",
                        row.gateway.replace(
                          "CoinPayments",
                          "CryptoCurrencies"
                        ) + "Deposit"
                      );
                      prop.onUpdateItem("openModalCashier", true);
                    }}
                  >
                    {row.mode} {" - "}
                    {row.coin ? row.coin : row.gateway}
                  </div>
                </>
              ) : (
                <>
                  {row.mode == "Deposit" || row.mode == "Cashout" ? (
                    <>
                      <div
                        onClick={() => {
                          prop.onUpdateItem("NotificationsItem", row);
                          prop.onUpdateItem(
                            "cashierMethod",
                            row.gateway.replace(
                              "CoinPayments",
                              "CryptoCurrencies"
                            ) + "Deposit"
                          );
                          prop.onUpdateItem("openModalCashier", true);
                        }}
                      >
                        {row.mode} {" - "}
                        {row.coin ? row.coin : row.gateway}
                      </div>
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
              )}
            </>
          )}
        </>
      ),

      grow: 4,
      minWidth: "200px",
      maxWidth: "600px",
    },
  ];
  useEffect(() => {
    if (userReports) {
      setMydata(editCounry(userReports));
    }
  }, [userReports]);

  return (
    <>
      <Header as="h2">
        <Icon.Group className="icon" size="big">
          <Icon name="dollar" />
          <Icon corner="bottom right" color="red" name="list ul" />
        </Icon.Group>
        <Header.Content>
          Transactions
          <Header.Subheader>See your Bank Transactions</Header.Subheader>
        </Header.Content>
      </Header>
      <Segment style={{ minHeight: "calc(100vh - 340px)", padding: 0 }}>
        <DataTable
          columns={columns}
          data={myData}
          defaultSortFieldId={1}
          defaultSortAsc={false}
          expandOnRowClicked={true}
          pagination
          paginationPerPage={_perPage}
          conditionalRowStyles={conditionalRowStyles}
          expandableRows
          expandableRowsHideExpander={true}
          expandableRowsComponent={ExpandedComponent}
          progressPending={repLoading}
          progressComponent={<CustomLoader />}
          noDataComponent={noDataComponent}
        />
      </Segment>
    </>
  );
}

export default withRouter(Report);
