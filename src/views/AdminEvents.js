import React, { useEffect } from "react";
import DataTable, { ExpanderComponentProps } from "react-data-table-component";
import { Input, Segment, Button, Card, Table,Dropdown } from "semantic-ui-react";
import Avatar from "react-avatar";
import { useAllEvents } from "services/hooks";
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
import Moment from "moment";
function editCounry(options){
    //options.sort((a, b) => (a.id > b.id) ? 1 : -1)
    var moment = require("moment");
    var  newArray = [];

    options.map((item, w) => {
        //item.matchTables.sort((a, b) => (a.id < b.id) ? 1 : -1)
        item.matchTables.map((match, i) => {
            var newitem = {}
            newitem.id = match.id;
            newitem.gameName = item.gameName;
            newitem.gameMode = item.gameMode;
            newitem.amount = item.amount;
            newitem.match = match;
            newitem.detail = JSON.stringify(newitem) 
     
      newArray.push(newitem)
    })
    })
    
    return newArray
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
function isDate(name,myDate,user) {
  if(name ==='country'){
    var res = (<td><img
    src={"/assets/images/famfamfam_flag_icons/png/" + user + ".png"}
  />  {myDate}</td>
  )
  }else{
    var res = myDate;
    if(myDate?.toString().indexOf(":") > -1 && myDate?.toString().indexOf("T") > -1 && myDate?.toString().indexOf(":00:00") == -1 ) res = moment(myDate).fromNow();
    if(myDate?.toString().indexOf(":") > -1 && myDate?.toString().indexOf("T") > -1  && myDate?.toString().indexOf(":00:00") > -1 ) res = moment(myDate).format('MM-DD-YYYY') +" ("+moment(myDate).fromNow()+')'
  
  }
  
  return res
}
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
              finalObj.push({name: x,value: newO1[y],user:newO1['value'].toLowerCase()})
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

const FilterComponent = ({ filterText, onFilter, onClear }) => (
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
  const { data: usersList } = useAllEvents();
  const [filterText, setFilterText] = React.useState("");
  const [exMode, setExMode] = React.useState("Data");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const [dataTransaction, setDataTransaction] = React.useState([]);
  const filteredItems = dataTransaction.filter(
    (item) =>
     
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
        <a href={"/panel/lobby?id="+row.id+'&matchid='+row.match.id} target='_blank'>{row.match.id}: {row.gameName}</a>
        </>
        ),
        sortable: true,
      },
      {
        name: "Status",
        selector: (row) => row.status,
        format: (row) => (row.match.status),
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
      format: (row) => (row.match.matchCode),
      sortable: true,
    },
    {
        name: "P1",
        selector: (row) => row.match.matchPlayers,
        format: (row) => (row.match.matchPlayers[0]?.username.replace("Tournament Player1", '').replace("Tournament Player", '')),
        sortable: true,
      },
      {
        name: "P2",
        selector: (row) => row.match.matchPlayers,
        format: (row) => (row.match.matchPlayers[1]?.username.replace("Tournament Player1", '').replace("Tournament Player", '')),
        sortable: true,
      },
      {
        name: "Winner",
        selector: (row) => row.match.winner,
        format: (row) => (row.match.winner),
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
     const newdata = editCounry(usersList)
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
