import React, { useEffect, useState,Component  } from "react";
import {  withRouter} from 'react-router-dom';
import AuthService from "services/auth.service";
import userService from "services/user.service";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {
    
    getGameTag,
    
    handleTagForm,
    isJson
  } from "components/include";
import {
    Row,
    Col,
    Card,
    Button
  
  } from "react-bootstrap";
  
  
  var arrLogos = ['psn.svg','xbox.svg','8pool.png','clashroyale.png','activition.png','epic.svg']
    var arrTagMode = ['PSN','XBOX','8Pool','ClashRoyale','CallOfDuty','Fortnite']
    var arrPlatform = ['PSN','XBOX','Mobile','Mobile','Activition','All']
    function TagsForm(prop) {
      const [myStateLoc, setMyStateLoc] = useState(prop.myStateLoc);
      const [myState, setMyState] = useState(prop.myState);
      useEffect(() => {
        if(!prop.myStateLoc){
        setMyState(prop.myState);
        setCurrentUser(prop.findStateId(prop.myState, "currentUser"))
        }
      }, [prop.myState]);
      var [currentUser, setCurrentUser] = useState(prop.findStateId(myState, "currentUser"));
      useEffect(() => {
        if(prop.myStateLoc){
          setMyState(prop.myStateLoc);
          setCurrentUser(prop.findStateId(prop.myStateLoc, "currentUser"))
        }
       
  
      }, [prop.myStateLoc]);
     
      return (

  
      <>
      <Card className="card-plain" style={{margin: -10}}>
        {!prop.myStateLoc && (<Card.Header>
       <Card.Title>Game Tags</Card.Title></Card.Header>)}
    
      <Card.Body>
    
                         
                        <Row className="card-tags">
                        {arrLogos.map((number,i) =>
                        <>
                       
                         <Col lg="4" xl="3" key={i} onClick={() => handleTagForm(arrTagMode[i],arrPlatform[i],currentUser)}>
                        <div className="counter-box bg-color-1 card">
                        <div className="img">
                        <img
                                                    alt={number}
                                                   
                                                    src={"/assets/images/logos/"+number}
                                                  ></img>
                                                  {getGameTag(arrTagMode[i],currentUser?.userTags)}
                       
                        </div>
                       
                        </div>
                        
                        </Col>
</>
)}


                    </Row>

                    </Card.Body>
      
      </Card>
                          
                       
        </>
    );
                        
}

export default withRouter(TagsForm) ;