import React, { useEffect, useState } from "react";
import { printBlockChallenge,date_locale,date_edit } from "components/include";
import { Tab,Card } from 'semantic-ui-react'
import Active  from "components/active.component";
import DashStat  from "components/dashstat.component";
import Moment from "moment";
var moment = require("moment");
function Dashboard(prop) {
  const [myState, setMyState] = useState(prop.myState)
  useEffect(() => {
    setMyState(prop.myState)
}, [prop.myState]);
const key = prop.findStateId(myState,'keyDash');
const events = prop.findStateId(myState,'events');

  
  
  
  const getBlockChallenge = (filtermode,events) => {
    var newItem = []
    if (events) {
     
       events.map((item, i) => {
        if ((item.gameConsole == filtermode || item.gameMode == filtermode || filtermode == 'all') || (item.gameConsole != 'Mobile' && filtermode == 'NoMobile')) {
          //item.players.sort((a, b) => (a.id > b.id) ? 1 : -1)
          
          {item.players.map((player, j) => {
           //if(player.username == currentUser.username && (item.status=='Pending' || item.status=='Ready' || item.status=='InPlay' )){this.props.history.push("/panel/lobby?id="+item.id);}
          })}
          var timestring1 = item.expire;
          var timestring2 = new Date();
          var startdate = moment(timestring1).format();
          var expected_enddate = moment(timestring2).format();
         startdate = moment(startdate).add(20, 'days').format()
         
          
          if(item.status !='Pending' && item.status !='InPlay' && item.status !='Ready'){
            //item.gameConsole = startdate + ' '+ expected_enddate;
            if(startdate>expected_enddate){newItem.push(item);}
          }else{
            newItem.push(item);
          }
          //newItem.push(item);
          
          
         
        } 
      }
      
      )
      return (<Card.Group className="fours" style={{ marginBottom: 20 }}>{printBlockChallenge(newItem,filtermode)}</Card.Group>)
    }

  }
  
  const panes = [
    {id:1, menuItem: 'All', render: () => <Tab.Pane>{getBlockChallenge('all',events)}</Tab.Pane> },
    {id:2, menuItem: 'Mobile', render: () => <Tab.Pane>{getBlockChallenge('Mobile',events)}</Tab.Pane> },
    {id:3, menuItem: 'Console', render: () => <Tab.Pane>{getBlockChallenge('NoMobile',events)}</Tab.Pane> },
    {id:4, menuItem: 'Tournament', render: () => <Tab.Pane>{getBlockChallenge('Tournament',events)}</Tab.Pane> },
  ]
    
  return (
      
        
    <>
    
    <Active {...prop}/>
    <DashStat {...prop}/>
    <Tab panes={panes} defaultActiveIndex={key} onTabChange={(e, data) => {prop.onUpdateItem('keyDash',data.activeIndex)}}  />

     


    </>
  );
}

export default (Dashboard);
