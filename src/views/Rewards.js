import React, { useEffect, useState  } from "react";


import Active  from "components/active.component";


import Rewards  from "components/Rewards.component"; 
import TagsForm  from "components/profile/tags.component"; 
import SocialForm  from "components/profile/social.component"; 
import UserEvents from "components/events/user.component"
import Report from "components/reportdiamond.component";
// react-bootstrap components

import { Tab } from 'semantic-ui-react'

function profile(prop) {
  const [myState, setMyState] = useState(prop.myState)
  useEffect(() => {
    setMyState(prop.myState)
}, [prop.myState]);
const key = prop.findStateId(myState,'keyReward');
var currentUser = prop.findStateId(myState,'currentUser');

  var dataTransaction = (currentUser.usersReports);
  const panes = [
    {id:1, menuItem: 'Rewards', render: () => <Tab.Pane><Rewards {...prop}/></Tab.Pane> },
  
    {id:2, menuItem: 'My Earns', render: () => <Tab.Pane><Report usersReports={dataTransaction} /></Tab.Pane>},
    
  ] 
    
       
   
  return (
    
    <>
    <Active {...prop}/>
    
      
              <Tab panes={panes} className="maxheight" defaultActiveIndex={key} onTabChange={(e, data) => {prop.onUpdateItem('keyReward',data.activeIndex)}}  />

     
    </>
  );
}

export default (profile) ;
