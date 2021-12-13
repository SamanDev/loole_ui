import React, { useEffect, useState } from "react";
import Form from "react-validation/build/form";
import {
    Button,
    Alert,
    
  } from "react-bootstrap";
  import $ from "jquery";
import {  withRouter} from 'react-router-dom';
import userService from "services/user.service";
import { bounce } from 'animate.css';

import eventBus from "views/eventBus";
import PropTypes from "prop-types";
import Swal from "sweetalert2";


function Active(prop) {
  
  const [loading, setLoading] = useState(false)

  const [myState, setMyState] = useState(prop.myState)
  useEffect(() => {
    setMyState(prop.myState)
}, [prop.myState]);
const currentUser = prop.findStateId(myState,'currentUser');
  
  
  
  const handleResend = (e) => {
    e.preventDefault();
    setLoading(true);
    
userService
          .resendActive()
          .then(
            
            (response) => {
              if (response=='Activation link sent to your email.'){
                Swal.fire("", "Activation link send to <b>"+currentUser.email+"</b> successfully.", "success").then(
                  (result) => {
                    setLoading(false);
                  }
                );
              }else{
                setLoading(false);
              
                var resMessage = response
        Swal.fire({
          title: 'Error!',
          text:resMessage,
          icon:"error",
          showCancelButton: false,
          confirmButtonText: `Ok`,
          
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            //this.props.history.push("/panel/cashier");
          }
        })
              
            }
        },
            (error) => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
            

              this.setState({
                successful: false,
                message: resMessage,
                submit: false,
                loading: false,
              });
            }
          );
      
    
    
  }
  const handleDelete = (e) => {
  
    e.preventDefault();
    setLoading(true);
userService
          .handleDelete()
          .then(
            
            (response) => {
              if (response=='Ok'){
                this.props.history.push("/auth/register-page");
              }
        }
          )
    
  }
  if(!currentUser?.userActivate){
    
    
    return (
        <>
          
            <Form
             
              className="myalert"
            >
             
                <Alert variant="danger">
    
                <span>
                  <h4 style={{margin:'10px 0'}}>Email Verification Required</h4>
                  <p>We have sent an email to your email address (<b>{currentUser.email}</b>) with a link for activating your account and proving you are human.</p>
                  
                  <Button
                                                                  className="btn-fill actbtn"
                                                                  type="button"
                                                                  variant="danger"
                                                                 
                                                                  onClick={
                                                                    handleResend
                                                                  }
                                            >
                                             
                                              <span> Resend</span>
                                                                  
                                                                
                                                                  
                                                                </Button> 
                                                                <Button
                                                                  style={{marginLeft:10}}
                                                                  className=" actbtn"
                                                                  type="button"
                                                                  variant="warning"
                                                           
                                                                  onClick={
                                                                    handleDelete
                                                                  }
                                            >
                                             
                                              <span> Edit</span>
                                                                  
                                                                
                                                                  
                                                                </Button>
                                                                
                  
                </span>
                </Alert>
              
  
              
            </Form>
          
          </>
      );
    }else{
        return null;
    }
}
export default withRouter(Active) ;