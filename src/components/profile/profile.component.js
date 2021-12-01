import React, { useEffect, useState  } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from "react-select";
import { IMaskInput } from "react-imask";
import {  withRouter} from 'react-router-dom';
import $ from "jquery";
import AuthService from "services/auth.service";
import userService from "services/user.service";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CountryList from 'components/CountryList'
import Birthday from 'components/Birthday'
import {
    Row,
    Col,
    Card,
    Button
  
  } from "react-bootstrap";
  import {
    setAvatar,
    getColor,
    getIcon,
    renderer,
    printMatchBlock,
    getModalTag,
    getGameTag,
    getSocialTag,
    haveSocialTag,
    haveGameTag,
    date_locale,
    userDetails
  } from "components/include";
  
  const required = (value,props) => {
      
      if(typeof props.passReadyprp !== "undefined"){
        if (!value && props.passReadyprp) {
            return (
              <div className="alert alert-danger" role="alert">
                This field is required!
              </div>
            );
            
          }
       
      }else{
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
      
    }
}
  };
  
  function ProfileForm(prop) {
    const [currentUser,setCurrentUser] = useState(prop.token);
    const [gameName,setGameName] = useState();
    const [gamePlatform,setGamePlatform] = useState("");
    const [gameID,setGameID] = useState("");
    const [gameNickname,setGameNickname] = useState("");
    const [message,setMessage] = useState("");
    const [loading,setLoading] = useState(false);
    const [submit,setSubmit] = useState(false);
    
    const [name,setName] = useState(currentUser.fullName);
    const [country,setCountry] = useState(currentUser.country);
    const [birthday,setBirthday] = useState(currentUser.birthday);
    const [oldPassword,setOldPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    
    const [socialPlatform,setSocialPlatform] = useState("");
    const [socialID,setSocialID] = useState("");
    const [flag,setFlag] = useState('ir');
    const handleSubmitInfo = (evt) => {
      evt.preventDefault();
      setSubmit(true);
      setLoading(true);
      
          userService
            .editInfo(
              name,country,birthday
            )
            .then(
              
              (response) => {
                setSubmit(false);
      setLoading(false);
                if (response=='Ok'){
                  
                  Swal.fire("", "Data saved successfully.", "success")
                  
                }
      })
  }
  const setLok = (e) => {
    setCountry(e)
   
  }
  const setBirt = (e) => {
    
    var newe = date_locale(e);
    setBirthday(newe)
    
  }
  useEffect(() => {
   
    setCurrentUser(() => prop.token)
  

  
}, [prop.token]);
    return (
      <>
    <Form
onSubmit={handleSubmitInfo}


            style={{borderBottom:'1px lightgray solid',paddingBottom:10,marginBottom:30}}
          >
                      <Card className="card-plain" style={{margin: -10}}>
                      <Card.Header>
                         <Card.Title >Proffile</Card.Title></Card.Header>
                        <Card.Body>
                        
                        <div className="form-group">
                              <label>Username</label>
                              <Input
                    type="text"
                    className="form-control"
                    
                    value={currentUser.username}
                    disabled={true}
                  />
                             
                               
                            </div>
                            <div className="form-group">
                              <label>Email</label>
                              <Input
                    type="text"
                    className="form-control"
                    
                    value={currentUser.email}
                    disabled={true}
                  />
                             
                               
                            </div>
                            <div className="form-group">
                              <label>Full Name</label>
                              <Input
                    type="text"
                    className="form-control"
                    name="name"
                    value={(name !== null) ? name : " "}
                    
                    onChange={e => setName(e.target.value)}
                  />
                             
                               
                            </div>
                            <div className="form-group">
                              <label>Country</label>
                             
<CountryList value={country}
passedFunction={setLok}
/>
                              
                            </div>
                            <div className="form-group">
                              <label>Birthday</label>
                             <Birthday passedFunction={setBirt} value={(birthday != null) ? (birthday) : "01/01/1990"}/>
                            </div>
                            
                            
                            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            
                          
                        </Card.Body>
                        <Card.Footer>
                        <div className="form-group">
              <button
                className="btn btn-primary btn-wd "
                disabled={loading}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm  fa-wd"></span>
                )}
                <span> Update</span>
              </button>
            </div>
                        </Card.Footer>
                      </Card>
                      </Form>
        </>
    );
  
}

export default withRouter(ProfileForm) ;