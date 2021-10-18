import React, { useEffect, useState } from "react";
import Form from "react-validation/build/form";
import {
    Button,
    Alert,
    
  } from "react-bootstrap";
import {  withRouter} from 'react-router-dom';
import userService from "services/user.service";

import PropTypes from "prop-types";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AuthService from "services/auth.service";
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
function Active(props) {
  const token = useRecoilValue(userState);
  
  const [activeLoading,setLoading] = useState(false);
  const [submit,setSubmit] = useState(false);
  const [currentUser,SetCurrentUser] = useState(token);
  
  
  const handleResend = (e) => {
    e.preventDefault();
    setLoading(true);
    
userService
          .resendActive()
          .then(
            
            (response) => {
              if (response=='Ok'){
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
          showCancelButton: true,
          confirmButtonText: `Go to Cashier`,
          canceleButtonText: `Back`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.props.history.push("/panel/cashier");
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
  if(!currentUser.userActivate){
    return (
        <>
           
            <Form
             
              
            >
             
                <Alert variant="danger">
    
                <span>
                  <h4 style={{margin:'10px 0'}}>Email Verification Required</h4>
                  <p>We have sent an email to your email address (<b>{currentUser.email}</b>) with a link for activating your account and proving you are human.</p>
                  
                  <Button
                                                                  className="btn-fill"
                                                                  type="button"
                                                                  variant="danger"
                                                                  disabled={activeLoading}
                                                                  onClick={
                                                                    handleResend
                                                                  }
                                            >
                                              {activeLoading && (
                                                <span className="spinner-border spinner-border-sm  fa-wd"></span>
                                              )}
                                              <span> Resend</span>
                                                                  
                                                                
                                                                  
                                                                </Button> 
                                                                <Button
                                                                  style={{marginLeft:10}}
                                                                  type="button"
                                                                  variant="warning"
                                                                  disabled={activeLoading}
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