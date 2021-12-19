import React, { useEffect } from "react";
import DataTable, { ExpanderComponentProps } from "react-data-table-component";
import { Input, Segment, Button, Card, Table } from "semantic-ui-react";
import Avatar from "react-avatar";
import { useAdminUsers } from "services/hooks";
import { JsonToTable } from "react-json-to-table";
import CurrencyFormat from "react-currency-format";
import {
  Badge,
  Alert,
  InputGroup,
  Navbar,
  Nav,
  OverlayTrigger,
  Tooltip,
  Container,
  Row,
  Col,
  TabContent,
  TabPane,
  Tab,
} from "react-bootstrap";

import Report from "components/report.component";
import CheckboxToggle from "components/toggle.component";
import ButtonGroupColored from "components/adminUseraction.component";
import adminService from "services/admin.service";
import Swal from "sweetalert2";
import {
  printRequired,
  haveGetway,
  haveGetwayMode,
  get_date_locale,
  getGroupBadge,
  setAvatar,
  printBlockChallenge,
  isJson,
} from "components/include";

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

function getPathOfKey(object, keys) {
  var newO = JSON.parse(JSON.stringify(object));
  var newOb = {};
  newOb['user'] = newO;
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
                      finalObj.push({name: newO2['mode'],value: newO2[z],user:newO})
                      newOb[newO2['name']] = newO2[z];
                    }
                  }
                
            }
          } else {
            if (y == "label") {
              finalObj.push({name: x,value: newO1[y],user:null})
              newOb[x] = newO1[y];
            }
          }
        }
      } else {
        finalObj.push({name: x,value: newO[x],user:null})
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
  const { data: usersList } = useAdminUsers();
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
  const updateUserObj = (e, data) => {
    var _key = data.userkey;
    var curU = JSON.parse(JSON.stringify(data.user));
    //curU[''+_key+'']=data.checked
    
    //console.log(curU);
    adminService.updateUserByAdmin(curU.id,_key,data.checked).then((response) => {
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
  const headerRow = ['Name', 'Value']
const renderBodyRow = ({name,value,user}, i) => ({
  key: name || `row-${i}`,
  cells: [
    name,
    typeof value == "boolean" ? (<CheckboxToggle
    check={value}
  user={user}
    userkey={name}
    onChange={updateUserObj}
  />) :  value
],
});
  const ExpandedComponent = ({ data }) => {
    if (exMode == "") {
      return <pre>hi</pre>;
    }

    if (exMode == "Data") {
      var newdata = [
        getPathOfKey(
          data,
          ",email,country,fullName,reffer,birthday,bankInfos,firstLogin,lastLogin,cashierGateways,"
        ),
      ];
      var jdata  = JSON.parse(JSON.stringify(newdata));
      console.log( jdata);
      return (
        <Segment>
          <Table renderBodyRow={renderBodyRow} celled
    headerRow={headerRow} tableData={jdata[0]} />
        </Segment>
      );
    }
    if (exMode == "Report") {
      return (
        <Segment>
          <Report usersReports={data.usersReports} />
        </Segment>
      );
    }
    if (exMode == "Events") {
      return (
        <Segment>
          <Card.Group className="fours" style={{ marginBottom: 20 }}>
            {printBlockChallenge(data.events, "all", { ...prop })}
          </Card.Group>
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
        <CheckboxToggle
          check={row.userBlock}
          user={row}
          userkey="userBlock"
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
      setDataTransaction(usersList);
    }
  }, [usersList]);
  return (
    <>
      <Segment>
        <div style={{ height: "calc(100vh - 50px)", overflow: "auto" }}>
          <DataTable
            columns={columns}
            data={filteredItems}
            defaultSortFieldId={1}
            defaultSortAsc={false}
            title="Users List"
            expandOnRowClicked={true}
            expandableRowsHideExpander={false}
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
