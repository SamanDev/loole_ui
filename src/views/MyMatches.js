import React, { useEffect, useState } from "react";
// react component used to create charts

import { useUserEvents,useUser,useAllEventsByStatus } from "services/hooks"

import { printBlockChallenge } from "components/include";

import Active  from "components/active.component";
// react-bootstrap components
import { Tab,Card } from 'semantic-ui-react'

function Dashboard(prop) {

  const [myState, setMyState] = useState(prop.myState)
  useEffect(() => {
    setMyState(prop.myState)
}, [prop.myState]);
const key = prop.findStateId(myState,'keyMyMatch');
const currentUser = prop.findStateId(myState,'currentUser');
  const { data: eventsGet , isLoading } = useAllEventsByStatus('All')
  
  
 
  var events=(eventsGet);
  
  
  
  
  if (!events) return <p>loading...</p>
  
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
    {id:1, menuItem: 'Pending', render: () => <Tab.Pane>{getBlockChallenge('Pending',events)}</Tab.Pane> },
    {id:2, menuItem: 'Wins', render: () => <Tab.Pane>{getBlockChallenge('Wins',events)}</Tab.Pane> },
    {id:3, menuItem: 'Expired', render: () => <Tab.Pane>{getBlockChallenge('Expired',events)}</Tab.Pane> },
    {id:4, menuItem: 'All', render: () => <Tab.Pane>{getBlockChallenge('All',events)}</Tab.Pane> },
  ]
  return (
      
        
    <>
    
    <Active {...prop}/>
    <Tab panes={panes} defaultActiveIndex={key} onTabChange={(e, data) => {prop.onUpdateItem('keyMyMatch',data.activeIndex)}}  />

       

      </>
    );
  
}

export default Dashboard;
