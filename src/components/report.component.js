import React, { Component,useState, useEffect} from "react";
import { withRouter } from "react-router-dom";

// react-bootstrap components
import {

  Col,
  
} from "react-bootstrap";
import { get_date_locale,getGroupBadge } from "components/include";
import DataTable from 'react-data-table-component';
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
const columns = [
  {
    name: 'ID',
    selector: row => row.id,
    sortable: true,
    width:'60px',
},
    {
        name: 'Date',
        selector: row => row.createDate,
        format: row => get_date_locale(row.createDate),
        
    },
    {
      name: 'Description',
      selector: row => row.description + ' '+ row.mode,
      sortable: true,
      grow: 4,
      maxWidth: '200px'
  },
  {
    name: 'Mode',
    selector: row => 'Dollar',
    
    sortable: true,
},
  {
    name: 'Amount',
    selector: row => row.amount,
    format: row =>  getGroupBadge('Dollar', row.amount, "small left"),
    sortable: true,
},
{
  name: 'EndBank',
  selector: row => row.endBalance,
  format: row =>  getGroupBadge('Dollar', row.endBalance, "small left"),
  sortable: true,
},
];
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
const noDataComponent =  (
    
  <Col xl="12" style={{textAlign: "center",color:'rgba(0,0,0,.5)'}}>
  <div >
  <img
                  alt="nodata"
                  style={{ height: 80 }}
                  src="/assets/images/nodata.svg"
                ></img>
<h4>Empty List.</h4>
<h5>You currently don't have any record.</h5>
</div>
    

  </Col>
)
var dataTransaction = []


function Report(prop) {

  
 

 
    dataTransaction = prop.usersReports
    
    
    return (
      <>
       
                  <DataTable
                  
            columns={columns}
            data={dataTransaction}
            defaultSortFieldId={1}
            defaultSortAsc={false}
            pagination
            conditionalRowStyles={conditionalRowStyles}
            expandableRows expandableRowsComponent={ExpandedComponent}
            noDataComponent={noDataComponent}
        />
                    
                 
      </>
    );
  
}

export default withRouter(Report);
