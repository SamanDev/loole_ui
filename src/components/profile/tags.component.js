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
    
class TagsForm extends Component {
  
    constructor(props) {
      super(props);
     
      
      
      this.state = {
        
        currentUser: this.props.token,
        
      };
    }
  
  componentWillReceiveProps(newProps) {
    
    this.setState({ currentUser: newProps.token });
    
    
  }
    render() {
   let { currentUser} = this.state;
    return (
      <>
    
                         
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
                                                  {getGameTag(arrTagMode[i],currentUser.userTags)}
                       
                        </div>
                       
                        </div>
                        
                        </Col>
</>
)}


                    </Row>

                          
                          
                       
        </>
    );
                        }
}

export default withRouter(TagsForm) ;