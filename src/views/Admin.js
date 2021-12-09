import React, { useEffect} from 'react';
import DataTable, { ExpanderComponentProps } from 'react-data-table-component';
import { Input,Segment } from 'semantic-ui-react'
import Avatar from "react-avatar";
import { useAdminUsers } from "services/hooks"
import { JsonToTable } from "react-json-to-table";
import CurrencyFormat from "react-currency-format";
import {
    Badge,
    Alert,
    Button,
    Card,
    InputGroup,
    Navbar,
    Nav,
    OverlayTrigger,
    Table,
    Tooltip,
    Container,
    Row,
    Col,
    TabContent,
    TabPane,
    Tab,
  } from "react-bootstrap";
  
import Report  from "components/report.component";
import CheckboxToggle  from "components/toggle.component";
import ButtonGroupColored  from "components/adminUseraction.component";

  import { printRequired,haveGetway,haveGetwayMode,get_date_locale,getGroupBadge,setAvatar,printBlockChallenge } from "components/include";
  
const conditionalRowStyles = [
  {
    when: row => row.endBalance < row.startBalance,
    style: {
      backgroundColor: 'rgba(255,0,0,.1)',
      
    },
  },
  // You can also pass a callback to style for additional customization
  {
    when: row => row.endBalance > row.startBalance,
    style: {
      backgroundColor: 'rgba(0,255,0,.1)',
      
    },
  },
];


const noDataComponent =  (
    
  <Col xl="12" style={{textAlign: "center",color:'rgba(0,0,0,.5)'}}>
  <div >
 
<h4>Empty List.</h4>
<h5>You currently don't have any record.</h5>
</div>
    

  </Col>
)
var dataTransaction = [
    
]

function getPathOfKey(object,keys){
 
  var  newO = JSON.parse(JSON.stringify(object));

  
      for (const x in newO) {

      if(keys.indexOf(','+x+',') == -1){
        delete newO[x];
      
      }
      
  
  
  }
  
  return newO;
}    
const FilterComponent = ({ filterText, onFilter, onClear,setExMode }) => (
  <>
  <Input icon='search'  placeholder='Search...' id="search"
      type="text"
      placeholder="Filter By Name"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}/>
  <ButtonGroupColored setExMode={setExMode}/>
    
    
  </>
);
function Admin(prop) {
  const { data: usersList } = useAdminUsers();
    const [filterText, setFilterText] = React.useState('');
    const [exMode, setExMode] = React.useState('Data');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const filteredItems = dataTransaction.filter(
        item => item.username && item.username.toLowerCase().includes(filterText.toLowerCase()),
    );
    
    const ExpandedComponent = ({ data }) => {
      
      if(exMode == ''){return <pre>hi</pre>}
      
      if(exMode == 'Data'){var newdata = getPathOfKey(data,",email,fullName,reffer,birthday,bankInfos,firstLogin,lastLogin,");return <Segment><JsonToTable json={newdata} /></Segment>}
      if(exMode == 'Report'){return <Segment><Report usersReports={data.usersReports}/></Segment>}
      if(exMode == 'Events'){return <Segment><Row className="ui fours cards">{printBlockChallenge(data.events,'all')}</Row></Segment>}
    
    };
    const columns = [
      {
        name: 'ID',
        selector: row => row.id,
        sortable: true,
        grow: .5,
    },
        
        {
          name: 'Username',
          selector: row => row.username,
          format:row => <><a href={"/user/"+row.username}  target="_blank"><Avatar
          size="20"
          title={row.username}
          round={true}
          name={setAvatar(row.username)}
        /> {row.username.toUpperCase()}</a></>,
          sortable: true,
      },
      {
        name: 'Active',
        selector: row => row.userActivate,
        format: row => <CheckboxToggle check={row.userActivate}/>,
        sortable: true,
    
    },
    {
      name: 'Balance',
      selector: row => row.balance,
      format: row => <>$ <CurrencyFormat
      value={Number.parseFloat(row.balance).toFixed(2)}
      displayType={"text"}
      thousandSeparator={true}
      prefix={""}
      renderText={(value) => value}
    /></>,
      sortable: true,

    },
    {
      name: 'Points',
      selector: row => row.point,
      format: row => <><CurrencyFormat
      value={Number.parseFloat(row.point).toFixed(0)}
      displayType={"text"}
      thousandSeparator={true}
      prefix={""}
      renderText={(value) => value}
    /></>,
      sortable: true,
    
    },
    {
        name: 'Ban',
        selector: row => row.userBlock,
        format: row => <CheckboxToggle check={row.userBlock}/>,
        sortable: true,
   
    }
    ];
    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };
  
        return (
            <FilterComponent setExMode={setExMode} onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        );
    }, [filterText, resetPaginationToggle]);
    useEffect(() => {
      if(usersList){
        dataTransaction = usersList
      }
   
      
       
      
     },[usersList]);
  return (
      
        
    <>
    <Segment>
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
        </Segment>
    </>
  );
}

export default (Admin);
