import React,{useEffect, useState} from 'react'
import {
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  
} from 'semantic-ui-react'
import {
    setAvatar,
    getColor,
    getIcon,
    renderer,
    getQueryVariable,
    getCode,
    getGroupBadge,
    getGroupBadgeList,
    getGroupBadgePrice,
    getModalTag,
    getGameTag,
    getMatchTitle,
    haveGameTag,
    getPlayerTag,
    vsComponentTitle,
    isJson,
    haveAdmin,
    handleTagForm,
    rendererBig,
    printEventBTN,
    vsComponentPlayer,
    getColorStatus
  } from "components/include";
import TransitionExampleTransitionExplorer  from "components/anim.component";
const SidebarExampleSidebar = (prop) => {
  
  const [objanim, setObjanim] = useState(prop.objanim)
  const [visible, setVisible] = useState(prop.visible)
  const [isUser, setIsUser] = useState(prop.isUser)
  const [user, setUser] =  useState(prop.user)

  useEffect(() => {
    setVisible(prop.visible)
  
     
    
   },[prop.visible]);
   useEffect(() => {
    setObjanim(prop.objanim)
  
     
    
   },[prop.objanim]);
   useEffect(() => {
    setIsUser(prop.isUser)
  
     
    
   },[prop.isUser]);
   useEffect(() => {
    setUser(prop.user)
  
     
    
   },[prop.user]);
   if(prop.item.gameMode == 'Tournament' && visible && !getQueryVariable("matchid")){setVisible(false)}
  return (
    
        <Sidebar.Pushable>
            
          <Sidebar
             className={'sisde'+isUser}
            animation='scale down'
            icon='labeled' inverted vertical
            direction="bottom"
            visible={visible}
            width='thin'
            
          >
              {visible  && (
                <div
                  
                  style={{padding:10,margin:'auto',position:'relative',zIndex:10}}
                >
                    {prop.status == 'Ready' && (<TransitionExampleTransitionExplorer objanim={objanim} animation='jiggle' duration={isUser ? (1000):(0)}/>)}
                    {((prop.status == 'InPlay') ||(prop.item.gameMode == 'Tournament' && prop.status == 'Pending')) && (<TransitionExampleTransitionExplorer objanim={prop.info} animation='jiggle' duration={!isUser ? (1000):(0)}/>)}
              
        </div>
              )}
              
            
          </Sidebar>

          <Sidebar.Pusher>
            {user}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      
  )
}

export default SidebarExampleSidebar