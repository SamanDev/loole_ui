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
import { useAdminUsers, useAllGetways } from "services/hooks";
import CurrencyFormat from "react-currency-format";
import { Col } from "react-bootstrap";

import TableAdmin from "components/adminTable.component";
import Report from "components/reportUser.component";
import ReportDiamond from "components/reportdiamondUser.component";

import CheckboxToggle from "components/toggle.component";
import ButtonGroupColored from "components/adminUseraction.component";
import adminService from "services/admin.service";
import userService from "services/user.service";
import Swal from "sweetalert2";
import {
  setAvatar,
  printBlockChallenge,
  isJson,
  haveAdmin,
  haveModerator,
} from "components/include";
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

function getPathOfKey(object, keys, getwaysList) {
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
              if (isJson(JSON.parse(JSON.stringify(newO2[z])))) {
              } else {
                if (z == "active") {
                  if (x == "cashierGateways") {
                    finalObj.push({
                      name: newO2["name"],

                      value: newO2[z],
                      user: newO,
                    });
                    newOb[newO2["name"]] = newO2[z];
                  }
                  if (x == "bankInfos") {
                    finalObj.push({
                      name:
                        newO2["gatewayName"] +
                        " - " +
                        newO2["cardNumber"] +
                        " - " +
                        newO2["holderName"],

                      value: newO2[z],
                      user: newO,
                    });
                    newOb[newO2["name"]] = newO2[z];
                  }
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
  var finalObj2 = JSON.parse(JSON.stringify(finalObj));
  var newOb2 = {};
  newOb2["final"] = finalObj2;
  getwaysList?.map(function (ways) {
    var blnIs = false;
    for (const y in finalObj2) {
      if (finalObj2[y].name == ways.name) {
        blnIs = true;
      }
    }
    if (!blnIs) {
      finalObj.push({
        name: ways.name,

        value: false,
        user: newO,
      });
    }
  });
  //console.log(finalObj);
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
  </>
);

function Admin(prop) {
  const { data: usersList, isLoading } = useAdminUsers();
  const { data: getwaysList, isLoading: getwaysListLoading } = useAllGetways();
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
      item.username.toLowerCase().includes(filterText.toLowerCase())
  );
  const [userOpen, setUserOpen] = React.useState(false);
  const [userData, setUserData] = React.useState();
  const [user, setUser] = React.useState();
  const [firstOpen, setFirstOpen] = React.useState(false);
  const [cashId, setCashId] = React.useState();
  const [cashUser, setCashUser] = React.useState(false);
  const [cashLoad, setCashLoad] = React.useState(false);
  const [cashAmuont, setCashAmount] = React.useState(10);
  const [cashName, setCashName] = React.useState("add");
  const [cashBankModel, setCashBankModel] = React.useState("Dollar");
  const [notMessage, setNotMessage] = React.useState("");

  const OpenChashier = (open, user, id) => {
    setFirstOpen(open);
    setCashId(id);
    setCashUser(user);
  };
  const setCashAmountVal = (e) => {
    setCashAmount(e.target.value);
  };
  const setNotMessageVal = (e) => {
    setNotMessage(e.target.value);
  };
  const updateUserObj = (e, data) => {
    //console.log(data);
    var _key = data.userkey;
    var curU = JSON.parse(JSON.stringify(data.user));
    //curU[''+_key+'']=data.checked

    //console.log(data);
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
    //.log(data);
    var _key = data.userkey;
    var curU = JSON.parse(JSON.stringify(data.user));
    //curU[''+_key+'']=data.checked

    //console.log(curU);
    adminService.usersDisconnectByAdmin(curU.username).then((response) => {
      if (response) {
        Swal.fire({
          title: "Success",
          text: response.data,

          showCancelButton: false,
          confirmButtonText: `Ok`,
        });
      }
    });
  };
  const updateBalace = (e, data) => {
    if (!cashId || !cashUser) {
      return false;
    }
    setCashLoad(true);
    adminService
      .changeBalance(cashId, cashAmuont, cashName, cashBankModel)
      .then((response) => {
        if (response) {
          Swal.fire({
            title: "Success",
            text: "Saved",
            icon: "success",
            showCancelButton: false,
            confirmButtonText: `Ok`,
          }).then(() => {
            prop.onReset("AdminUsers");
            setFirstOpen(false);
            setCashLoad(false);
          });
        }
      });
  };
  const deletUserConfirm = (e, data) => {
    Swal.fire({
      title: "Are you sure?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletUser();
      }
    });
  };
  const deletUser = (e, data) => {
    if (!cashId || !cashUser) {
      return false;
    }
    setCashLoad(true);
    adminService.deleteUser(cashId).then((response) => {
      if (response) {
        Swal.fire({
          title: "Success",
          text: "Saved",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: `Ok`,
        }).then(() => {
          prop.onReset("AdminUsers");
          setFirstOpen(false);
          setCashLoad(false);
        });
      }
    });
  };
  const sendNot = (e, data) => {
    if (notMessage == "") {
      return false;
    }
    setCashLoad(true);
    userService.notification(cashUser, notMessage, "test").then((response) => {
      if (response) {
        Swal.fire({
          title: "Success",
          text: "Saved",
          icon: "success",
          showCancelButton: false,
          confirmButtonText: `Ok`,
        }).then(() => {
          prop.onReset("AdminUsers");
          setFirstOpen(false);
          setCashLoad(false);
        });
      }
    });
  };

  const ExpandedComponent = (data) => {
    setUserOpen(true);

    var newdata = [
      getPathOfKey(
        data,
        ",email,country,fullName,reffer,birthday,bankInfos,firstLogin,lastLogin,cashierGateways,",
        getwaysList
      ),
    ];

    var jdata = JSON.parse(JSON.stringify(newdata));
    setUser(data);
    setUserData(jdata);
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
        </>
      ),
      sortable: true,
      grow: 2,
    },
    {
      name: "Action",
      selector: (row) => row.username,
      format: (row) => (
        <>
          <Button size="mini" onClick={() => ExpandedComponent(row)}>
            see
          </Button>
        </>
      ),
      sortable: false,
    },
    {
      name: "Refer",
      selector: (row) => row.refer,
      format: (row) => (
        <>
          {row.refer && (
            <a href={"/user/" + row.refer} target="_blank">
              <Avatar
                size="20"
                title={row.refer}
                round={true}
                name={setAvatar(row.refer)}
              />{" "}
              {row.refer.toUpperCase()}
            </a>
          )}
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
      name: "Profit",
      selector: (row) => row.profit,
      format: (row) => (
        <>
          <CurrencyFormat
            value={Number.parseFloat(row.profit).toFixed(0)}
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
          check={haveAdmin(row.roles)}
          user={row}
          userkey="Roles"
          onChange={updateUserObj}
          disabled={true}
        />
      ),
      sortable: true,
    },
    {
      name: "Moderator",
      selector: (row) => row.roles,
      format: (row) => (
        <CheckboxToggle
          check={haveModerator(row.roles)}
          user={row}
          userkey="Roles"
          onChange={updateUserObj}
          disabled={true}
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
      setDataTransaction(usersList);
    }
  }, [usersList]);
  if (isLoading || getwaysListLoading) {
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
                <label>UserName: {cashUser}</label>
              </Form.Field>
              <Form.Field>
                <label>ID: {cashId}</label>
              </Form.Field>
              <Form.Field>
                <label>Amount</label>
                <input value={cashAmuont} onChange={setCashAmountVal} />
              </Form.Field>
              <Button.Group widths="2">
                <Button
                  color={cashBankModel == "Dollar" ? "blue" : "grey"}
                  onClick={() => setCashBankModel("Dollar")}
                >
                  Dollar
                </Button>
                <Button
                  color={cashBankModel == "Point" ? "blue" : "grey"}
                  onClick={() => setCashBankModel("Point")}
                >
                  Point
                </Button>
              </Button.Group>
              <Button.Group widths="2">
                <Button
                  color={cashName == "add" ? "green" : "grey"}
                  onClick={() => setCashName("add")}
                >
                  add
                </Button>
                <Button
                  color={cashName == "remove" ? "red" : "grey"}
                  onClick={() => setCashName("remove")}
                >
                  remove
                </Button>
              </Button.Group>
              <br />
              <br />
              <Button
                type="submit"
                loading={cashLoad}
                disabled={cashLoad}
                color="black"
                fluid
                onClick={updateBalace}
              >
                Submit
              </Button>
              <Button
                type="submit"
                loading={cashLoad}
                disabled={cashLoad}
                color="red"
                fluid
                onClick={deletUserConfirm}
                style={{ marginTop: 20 }}
              >
                DeletUser
              </Button>
              <Form.Field>
                <label>Meessage</label>
                <input value={notMessage} onChange={setNotMessageVal} />
              </Form.Field>
              <Button
                type="submit"
                loading={cashLoad}
                disabled={cashLoad}
                color="red"
                fluid
                onClick={sendNot}
                style={{ marginTop: 20 }}
              >
                Send
              </Button>
            </Form>
          </Modal.Content>
        </Modal>
        <Modal
          onClose={() => setUserOpen(false)}
          onOpen={() => setUserOpen(true)}
          open={userOpen}
          size="large"
          style={{ height: "auto" }}
        >
          <Modal.Header>{user?.username}</Modal.Header>
          <Modal.Content>
            <ButtonGroupColored setExMode={setExMode} />
            <Button
              color="red"
              onClick={() => OpenChashier(true, user.username, user.id)}
            >
              -/+
            </Button>
            {exMode == "Data" && (
              <Segment>
                <TableAdmin data={userData} updateUserObj={updateUserObj} />
              </Segment>
            )}
            {exMode == "Report" && (
              <Segment>
                <div style={{ height: "calc(80vh - 150px)", overflow: "auto" }}>
                  <Report user={user} />
                </div>
              </Segment>
            )}
            {exMode == "Reward" && (
              <Segment>
                <div style={{ height: "calc(80vh - 150px)", overflow: "auto" }}>
                  <ReportDiamond user={user} />
                </div>
              </Segment>
            )}
            {exMode == "Events" && (
              <Segment>
                <div style={{ height: "calc(80vh - 150px)", overflow: "auto" }}>
                  <UserEvents {...prop} user={user} myStateLoc={true} />
                </div>
              </Segment>
            )}
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
