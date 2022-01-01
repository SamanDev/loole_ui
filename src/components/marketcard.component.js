import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Avatar from "react-avatar";
import Countdown from "react-countdown";

import {setAvatar,getColorStatus,getIcon,getGroupBadgeBlock,rendererBig,printStatus}  from "components/include.js";
import {
  Icon,
  Label,
  Card,
  Image} from "semantic-ui-react";
// react-bootstrap components

var moment = require("moment");
 function MatchCard(prop) {
    var _mode = " 1 vs 1 ";
    var _color = "#404040";
    var item = prop.item;
   
  
  
    return (
    
        
     
        <Card    >
       
        <Image
                alt={item.title}
                src={ item.images[0].src }
                
                
          />
                
            <div className="content extra">
              
            <Card.Header style={{textAlign: 'left'}}>
                  {item.title}<Label style={{ float: "right"}} size="small" basic>
                 
                
                </Label>
                </Card.Header>
               
          <Card.Description>
          
        <div className="content left floated " style={{minHeight:10,padding:2}}>{getGroupBadgeBlock('Point', item.price, "Fee","left","green")}</div>
       
        
    </Card.Description>
    </div>
    
        </Card>
    
    
    );
  };
  export default MatchCard;