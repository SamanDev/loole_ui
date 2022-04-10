import React, { useEffect, useState, useContext } from "react";
import DataTable from "react-data-table-component";
import {
  Input,
  Segment,
  Button,
  Card,
  Table,
  Dimmer,
  Loader,
  Icon,
  Modal,
  Form,
} from "semantic-ui-react";
import Avatar from "react-avatar";
import { useAdminUsers } from "services/hooks";
import CurrencyFormat from "react-currency-format";
import { Col } from "react-bootstrap";

import Report from "components/report.component";
import ReportDiamond from "components/reportdiamond.component";

import CheckboxToggle from "components/toggle.component";
import ButtonGroupColored from "components/adminUseraction.component";
import adminService from "services/admin.service";
import Swal from "sweetalert2";
import { setAvatar, printBlockChallenge, isJson } from "components/include";
import UserEvents from "components/events/user.component";
import UserContext from "context/UserState";
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

const noDataComponent = (
  <Col xl="12" style={{ textAlign: "center", color: "rgba(0,0,0,.5)" }}>
    <div>
      <h4>Empty List.</h4>
      <h5>You currently don't have any record.</h5>
    </div>
  </Col>
);
var dataTransaction = [];
var moment = require("moment");
function isDate(name, myDate, user) {
  if (name === "country") {
    var res = (
      <td>
        <img src={"/assets/images/famfamfam_flag_icons/png/" + user + ".png"} />{" "}
        {myDate}
      </td>
    );
  } else {
    var res = myDate;
    if (
      myDate?.toString().indexOf(":") > -1 &&
      myDate?.toString().indexOf("T") > -1 &&
      myDate?.toString().indexOf(":00:00") == -1
    )
      res = moment(myDate).startOf("second").fromNow();
    if (
      myDate?.toString().indexOf(":") > -1 &&
      myDate?.toString().indexOf("T") > -1 &&
      myDate?.toString().indexOf(":00:00") > -1
    )
      res =
        moment(myDate).format("MM-DD-YYYY") +
        " (" +
        moment(myDate).startOf("second").fromNow() +
        ")";
  }

  return res;
}
function getPathOfKey(object, keys) {
  var newO = JSON.parse(JSON.stringify(object));
  var newOb = {};
  newOb["user"] = newO;
  var finalObj = [];
  // finalObj.push({'user':newO})
  for (const x in newO) {
    if (keys.indexOf("," + x + ",") == -1) {
    } else {
      if (isJson(JSON.parse(JSON.stringify(newO[x])))) {
        var newO1 = JSON.parse(JSON.stringify(newO[x]));

        for (const y in newO1) {
          if (isJson(JSON.parse(JSON.stringify(newO1[y])))) {
            var newO2 = JSON.parse(JSON.stringify(newO1[y]));
            for (const z in newO2) {
              //console.log(newO2[z]);
              if (isJson(JSON.parse(JSON.stringify(newO2[z])))) {
              } else {
                if (z == "active") {
                  finalObj.push({
                    name: newO2["mode"] + " - " + newO2["name"],
                    value: newO2[z],
                    user: newO,
                  });
                  newOb[newO2["name"]] = newO2[z];
                }
              }
            }
          } else {
            if (y == "label") {
              finalObj.push({
                name: x,
                value: newO1[y],
                user: newO1["value"].toLowerCase(),
              });
              newOb[x] = newO1[y];
            }
          }
        }
      } else {
        finalObj.push({ name: x, value: newO[x], user: null });
        newOb[x] = newO[x];
      }
    }
  }

  //finalObj.push({'data':newOb})

  return finalObj;
}

const FilterComponent = ({ filterText, onFilter, onClear, setExMode }) => (
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
    <ButtonGroupColored setExMode={setExMode} />
  </>
);

function Admin(prop) {
  const { data: usersList, isLoading } = useAdminUsers();
  const context = useContext(UserContext);
  const { currentUser } = context.uList;
  const [filterText, setFilterText] = React.useState("");
  const [exMode, setExMode] = React.useState("Data");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const [dataTransaction, setDataTransaction] = React.useState([]);
  const filteredItems = dataTransaction.filter(
    (item) =>
      item.username &&
      item.username.toLowerCase().indexOf("test") == -1 &&
      item.username != currentUser.username &&
      item.username.toLowerCase().includes(filterText.toLowerCase())
  );
  const [firstOpen, setFirstOpen] = React.useState(false);
  const [cashId, setCashId] = React.useState();
  const [cashUser, setCashUser] = React.useState(false);
  const [cashAmuont, setCashAmount] = React.useState(10);
  const [cashName, setCashName] = React.useState("add");

  const OpenChashier = (open, user, id) => {
    setFirstOpen(open);
    setCashId(id);
    setCashUser(user);
  };
  const setCashAmountVal = (e) => {
    setCashAmount(e.target.value);
  };
  const updateUserObj = (e, data) => {
    var _key = data.userkey;
    var curU = JSON.parse(JSON.stringify(data.user));
    //curU[''+_key+'']=data.checked

    //console.log(curU);
    adminService
      .updateUserByAdmin(curU.id, _key, data.checked)
      .then((response) => {
        if (response) {
          Swal.fire({
            title: "Success",
            text: response.data,
            icon: "success",
            showCancelButton: false,
            confirmButtonText: `Ok`,
          });
        }
      });
  };
  const updateUserDC = (e, data) => {
    console.log(data);
    var _key = data.userkey;
    var curU = JSON.parse(JSON.stringify(data.user));
    //curU[''+_key+'']=data.checked

    //console.log(curU);
    adminService.usersDisconnectByAdmin(curU.username).then((response) => {
      if (response) {
        Swal.fire({
          title: "Success",
          text: response.data,
          icon: "success",
          showCancelButton: false,
          confirmButtonText: `Ok`,
        });
      }
    });
  };
  const updateBalace = (e, data) => {
    console.log(data);
    if (!cashId || !cashUser) {
      return false;
    }
    adminService
      .changeBalance(cashId, cashAmuont, cashName)
      .then((response) => {
        if (response) {
          Swal.fire({
            title: "Success",
            text: response.data,
            icon: "success",
            showCancelButton: false,
            confirmButtonText: `Ok`,
          });
        }
      });
  };
  const headerRow = ["Name", "Value"];
  const renderBodyRow = ({ name, value, user }, i) => ({
    key: name || `row-${i}`,
    cells: [
      name,
      typeof value == "boolean" ? (
        <CheckboxToggle
          check={value}
          user={user}
          userkey={name}
          onChange={updateUserObj}
        />
      ) : (
        isDate(name, value, user)
      ),
    ],
  });
  const ExpandedComponent = (props) => {
    if (exMode == "") {
      return <pre>hi</pre>;
    }
    var data = props.data;
    console.log(data);
    console.log(props.data);
    if (exMode == "Data") {
      var newdata = [
        getPathOfKey(
          data,
          ",email,country,fullName,reffer,birthday,bankInfos,firstLogin,lastLogin,cashierGateways,"
        ),
      ];
      var jdata = JSON.parse(JSON.stringify(newdata));

      return (
        <Segment>
          <Table
            renderBodyRow={renderBodyRow}
            celled
            color="red"
            tableData={jdata[0]}
          />
        </Segment>
      );
    }
    if (exMode == "Report") {
      return (
        <Segment>
          <div style={{ height: "calc(40vh - 150px)", overflow: "auto" }}>
            <Report user={data} />
          </div>
        </Segment>
      );
    }
    if (exMode == "Reward") {
      return (
        <Segment>
          <div style={{ height: "calc(40vh - 150px)", overflow: "auto" }}>
            <ReportDiamond user={data} />
          </div>
        </Segment>
      );
    }
    if (exMode == "Events") {
      return (
        <Segment>
          <div style={{ height: "calc(40vh - 150px)", overflow: "auto" }}>
            <UserEvents {...prop} user={data} myStateLoc={true} />
          </div>
        </Segment>
      );
    }
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      grow: 0.5,
    },

    {
      name: "Username",
      selector: (row) => row.username,
      format: (row) => (
        <>
          <a href={"/user/" + row.username} target="_blank">
            <Avatar
              size="20"
              title={row.username}
              round={true}
              name={setAvatar(row.username)}
            />{" "}
            {row.username.toUpperCase()}
          </a>
          <Button onClick={() => OpenChashier(true, row.username, row.id)}>
            -/+
          </Button>
        </>
      ),
      sortable: true,
    },
    {
      name: "Refer",
      selector: (row) => row.refer,
      format: (row) => (
        <>
          {row.refer ? (
            <a href={"/user/" + row.refer} target="_blank">
              <Avatar
                size="20"
                title={row.refer}
                round={true}
                name={setAvatar(row.refer)}
              />{" "}
              {row.refer.toUpperCase()}
            </a>
          ) : null}
        </>
      ),
      sortable: true,
    },
    {
      name: "Active",
      selector: (row) => row.userActivate,
      format: (row) => (
        <CheckboxToggle
          check={row.userActivate}
          user={row}
          userkey="userActivate"
          onChange={updateUserObj}
        />
      ),
      sortable: true,
    },
    {
      name: "Balance",
      selector: (row) => row.balance,
      format: (row) => (
        <>
          ${" "}
          <CurrencyFormat
            value={Number.parseFloat(row.balance).toFixed(2)}
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
      name: "Points",
      selector: (row) => row.point,
      format: (row) => (
        <>
          <CurrencyFormat
            value={Number.parseFloat(row.point).toFixed(0)}
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
      name: "Ban",
      selector: (row) => row.userBlock,
      format: (row) => (
        <>
          <Button onClick={updateUserDC} user={row} userkey="userBlock">
            DC
          </Button>
          <CheckboxToggle
            check={row.userBlock}
            user={row}
            userkey="userBlock"
            onChange={updateUserObj}
          />
        </>
      ),
      sortable: true,
    },
    {
      name: "Admin",
      selector: (row) => row.roles,
      format: (row) => (
        <CheckboxToggle
          check={row.roles[0]?.name.match("ROLE_ADMIN")}
          user={row}
          userkey="Roles"
          onChange={updateUserObj}
        />
      ),
      sortable: true,
    },
    {
      name: "Moderator",
      selector: (row) => row.roles,
      format: (row) => (
        <CheckboxToggle
          check={row.roles[0]?.name.match("ROLE_MODERATOR")}
          user={row}
          userkey="Roles"
          onChange={updateUserObj}
        />
      ),
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
      console.log(usersList);
      setDataTransaction(usersList);
    }
  }, [usersList]);
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
        <Modal
          onClose={() => setFirstOpen(false)}
          onOpen={() => setFirstOpen(true)}
          open={firstOpen}
          size="mini"
          style={{ height: "auto" }}
        >
          <Modal.Header>Cashier {cashUser}</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>UserName</label>
                <input value={cashUser} />
              </Form.Field>
              <Form.Field>
                <label>ID</label>
                <input value={cashId} />
              </Form.Field>
              <Form.Field>
                <label>Amount</label>
                <input value={cashAmuont} onChange={setCashAmountVal} />
              </Form.Field>
              <Button.Group widths="2">
                <Button
                  color={cashName == "add" && "green"}
                  onClick={() => setCashName("add")}
                >
                  add
                </Button>
                <Button
                  color={cashName == "remove" && "red"}
                  onClick={() => setCashName("remove")}
                >
                  remove
                </Button>
              </Button.Group>
              <br />
              <br />
              <Button type="submit" color="black" fluid onClick={updateBalace}>
                Submit
              </Button>
            </Form>
          </Modal.Content>
        </Modal>
        <div style={{ height: "calc(100vh - 150px)", overflow: "auto" }}>
          <DataTable
            columns={columns}
            data={filteredItems}
            defaultSortFieldId={1}
            defaultSortAsc={false}
            title="Users List"
            expandOnRowClicked={true}
            expandableRowsHideExpander={true}
            conditionalRowStyles={conditionalRowStyles}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
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
