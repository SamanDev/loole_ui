import React, { useEffect, useState  } from "react";


import Active  from "components/active.component";


import ProfileForm  from "components/profile/profile.component"; 
import TagsForm  from "components/profile/tags.component"; 
import SocialForm  from "components/profile/social.component"; 
import UserEvents from "components/events/user.component"
import Report from "components/report.component";
// react-bootstrap components

import { Tab } from 'semantic-ui-react'

function profile(prop) {
  const [myState, setMyState] = useState(prop.myState)
  useEffect(() => {
    setMyState(prop.myState)
}, [prop.myState]);
const key = prop.findStateId(myState,'keyProfile');
var currentUser = prop.findStateId(myState,'currentUser');

  var dataTransaction = currentUser.usersReports;
  const panes = [
    {id:1, menuItem: 'Profile', render: () => <Tab.Pane><ProfileForm {...prop}/></Tab.Pane> },
    {id:2, menuItem: 'Tags', render: () => <Tab.Pane><TagsForm {...prop}/><SocialForm {...prop}/></Tab.Pane>},
    {id:3, menuItem: 'My Events', render: () => <Tab.Pane><UserEvents {...prop}/></Tab.Pane>},
    {
      id: 4,
      menuItem: 'Transactions',
      render: () => (
        <Tab.Pane>
          
              <Report usersReports={dataTransaction} />
            
        </Tab.Pane>
      ),
    },
  ] 
    
       
   
  return (
    
    <>
    <Active {...prop}/>
    
      
              <Tab panes={panes} className="maxheight" defaultActiveIndex={key} onTabChange={(e, data) => {prop.onUpdateItem('keyProfile',data.activeIndex)}}  />

     
    </>
  );
}

export default (profile) ;
