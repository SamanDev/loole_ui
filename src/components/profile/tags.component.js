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
    userDetails,
    isJson
  } from "components/include";
import {
    Row,
    Col,
    Card,
    Button
  
  } from "react-bootstrap";
  import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';
  import {
    userState
  } from 'atoms';
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
  var arrLogos = ['psn.svg','xbox.svg','8pool.png','clashroyale.png','activition.png','epic.svg']
    var arrTagMode = ['PSN','XBOX','8Pool','ClashRoyale','CallOfDuty','Fortnite']
    var arrPlatform = ['PSN','XBOX','Mobile','Mobile','Activition','All']
    
  function TagsForm(props) {
    const [token,setToken] = useRecoilState(userState);
    const [gameName,setGameName] = useState();
  const [gamePlatform,setGamePlatform] = useState("");
  const [gameID,setGameID] = useState("");
  const [gameNickname,setGameNickname] = useState("");
  const [message,setMessage] = useState("");
  const [loading,setLoading] = useState(false);
  const [submit,setSubmit] = useState(false);
    var currentUser = props.token;
   

    const handleTagForm = (game,platform) => {
    if(currentUser.accessToken){
        const resetPw = async () => {
          const swalval = await Swal.fire(getModalTag(game));
          
          let v = (swalval && swalval.value) || swalval.dismiss;
          console.log(swalval);
          if (v) {
            if (v.tagid) {
              var gameName,gamePlatform,gameID,gameNickname;
              gameName = game;
                if (v.tagid == game+"2") {
                  handleTagForm(game+'2')
                }else if (v.tagid == game+"3") {
                  handleTagForm(game+'3')
                }else{
                  setGameNickname('');
                  setGameID('');
                  gameID = '';
                  gameNickname = '';
                  if (v.tagid != "") {
                  
                  setGameID(v.tagid.replace('#',''));
                    gameID = v.tagid.replace('#','')
                  }
                  if (v.tagname && v.tagname != "") {
                    setGameNickname(v.tagname);
                    gameNickname = v.tagname;
                  }
                  if (v.tagplatform && v.tagplatform != "") {
                    setGamePlatform(v.tagplatform);
                    gamePlatform = v.tagplatform
                  }
                  
                
                    handleSaveTags(gameName,gamePlatform,gameID,gameNickname);
                  
                }
                
              }
              
              //setformdata(swalval);
              
            
          }
        };
    if(!haveGameTag(game,currentUser.userTags))                  resetPw();
    }
      }
    function setSelectedTag (e,p){
        Promise.resolve()
            .then(() => { 
              setGameName(e);
          
          setGamePlatform(p);
            })
            .then(() => {
              setGameName(e);
          
          setGamePlatform(p);
          
              handleTagForm(e,p);
            })
          
          
          
          
          
      }
       
        const setUserTag = (e) => {
          currentUser = e;
        
          
        }
        
        
        const handleSaveTags = (gameName,gamePlatform,gameID,gameNickname) => {
        
          Swal.fire({
            title: '<br/>Please Wait...',
            text: 'Is working..',
            customClass:'tag',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            didOpen: () => {
                Swal.showLoading()
            }
        })
        
          userService
            .saveTags(
             
              gameName,
              gamePlatform,
              gameID,
              gameNickname,
      
            )
            .then(
              (response) => {
               
                let jsonBool = isJson(response);
         
                if (jsonBool) {
                  setToken(AuthService.getCurrentUser())
                    setUserTag(response)
                    
                    Swal.fire("", "Data saved successfully.", "success");
                
                } else {
                 
                    Swal.fire("", response, "error");
                 
                }
              
              },
              (error) => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
                Swal.fire("Error!", resMessage, "error");
              }
            );
        }
        const handleSaveSocial = (accountName,accountID) => {
         
          Swal.fire({
            title: '<br/>Please Wait...',
            text: 'Is working..',
            customClass:'tag',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            didOpen: () => {
                Swal.showLoading()
            }
        })
        
          userService
            .saveSocial(
             
           
              accountName,
              accountID,
          
      
            )
            .then(
              (response) => {
               
                let jsonBool = isJson(response);
         
                if (jsonBool) {
                  setToken(AuthService.getCurrentUser())
                  setUserTag(response)
                    Swal.fire("", "Data saved successfully.", "success");
                
                } else {
                 
                    Swal.fire("", response, "error");
                 
                }
              
              },
              (error) => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
                Swal.fire("Error!", resMessage, "error");
              }
            );
        }
    return (
      <>
    
                         
                        <Row className="card-tags">
                        {arrLogos.map((number,i) =>
                        <>
                       
                         <Col lg="4" xl="3" key={i} onClick={() => setSelectedTag(arrTagMode[i],arrPlatform[i])}>
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

export default withRouter(TagsForm) ;