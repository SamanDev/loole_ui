import React, { useEffect, useState,Component  } from "react";
import {  withRouter} from 'react-router-dom';
import AuthService from "services/auth.service";
import userService from "services/user.service";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Header } from "semantic-ui-react";
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
      const [myState, setMyState] = useState(prop.myState);
  useEffect(() => {
    setMyState(prop.myState);
  }, [prop.myState]);
  var _key = prop.findStateId(myState, "profileUser")
  if (!_key) { _key = prop.findStateId(myState, "currentUser");}
  const currentUser = _key
     
      return (

  
      <>
      {!prop.myStateLoc && (
      <Header as="h3">
      Game Tags
      </Header>
      )}

    
                         
                        <Row className="card-tags" style={{marginRight:0}}>
                        {arrLogos.map((number,i) =>
                       
                         <Col lg="4" xl="3" key={i.toString()} onClick={() => handleTagForm(arrTagMode[i],arrPlatform[i],currentUser)}>
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

)}


                    </Row>

                
                          
                       
        </>
    );
                        
}

export default withRouter(TagsForm) ;