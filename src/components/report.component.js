import React, { Component,useState, useEffect} from "react";
import { withRouter } from "react-router-dom";

// react-bootstrap components
import {

  Col,
  
} from "react-bootstrap";

import {
  Button,
  Select,
  Divider,
  Header,
  Form,
  Input,
  Label,
  Modal,
  Segment,Dimmer
} from "semantic-ui-react";
import { get_date_locale,getGroupBadgeBlock } from "components/include";
import DataTable from 'react-data-table-component';
function editCounry(item){
  var _des = item.description
  if(item.coin){_des = item.coin}
  
 
  return _des
}
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
    width:'100px',
},
    {
        name: 'Date',
        selector: row => row.createDate,
        format: row => get_date_locale(row.createDate),
        width:'150px',
    },
    {
      name: 'Description',
      selector: row => editCounry(row) + ' '+ row.mode,
      sortable: true,
      grow: 4,
      minWidth: '200px',
     
  },
  
  {
    name: 'Amount',
    selector: row => row.amount,
    format: row =>  getGroupBadgeBlock('Dollar', row.amount, "small left"),
    sortable: true,
    width:'150px',
},
{
  name: 'EndBank',
  selector: row => row.endBalance,
  format: row =>  getGroupBadgeBlock('Dollar', row.endBalance, "small left"),
  sortable: true,
  width:'150px',
},
];
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
const noDataComponent =  (
    
<div style={{minHeight:300,position: 'relative',marginTop:20,width:'100%'}}>
  <Dimmer active inverted >
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
      </Dimmer></div>

)
var dataTransaction = []


function Report(prop) {

  
 

 
    dataTransaction = prop.usersReports
    
    
    return (
      <>
       <Header as="h3">
       Transactions
      </Header>
      
                  <DataTable
                  
            columns={columns}
            data={dataTransaction}
            defaultSortFieldId={1}
            defaultSortAsc={false}
            expandOnRowClicked={true}
            pagination
            conditionalRowStyles={conditionalRowStyles}
            expandableRows expandableRowsHideExpander={true} expandableRowsComponent={ExpandedComponent}
            noDataComponent={noDataComponent}
        />
                    
                 
      </>
    );
  
}

export default withRouter(Report);
