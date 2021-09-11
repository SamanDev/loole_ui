import React, { Component } from "react";
import Form from "react-validation/build/form";
import {
    Button,
    Alert,
    
  } from "react-bootstrap";
import {  withRouter} from 'react-router-dom';
import userService from "services/user.service";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AuthService from "services/auth.service";
class Active extends Component {
  constructor(props) {
    super(props);
    this.handleResend = this.handleResend.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    

    this.state = {
      activeLoading: false,
        currentUser: AuthService.getCurrentUser(),
      message: ""
    };
  }
  handleResend(e) {
    e.preventDefault();
    this.setState({
        activeLoading: true,
    });
userService
          .resendActive()
          .then(
            
            (response) => {
              if (response=='Ok'){
                Swal.fire("", "Activation link send to <b>"+this.state.currentUser.email+"</b> successfully.", "success").then(
                  (result) => {
                    this.setState({
                        activeLoading: false,
                    });
                  }
                );
              }else{
                this.setState({
                    activeLoading: false,
                });
              
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
  handleDelete(e) {
    e.preventDefault();
    this.setState({
        activeLoading: true,
    });
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
  
  render() {
   
    if(!this.state.currentUser.userActivate){
        return (
            <>
               
                <Form
                  onSubmit={this.handleRegister}
                  ref={c => {
                    this.form = c;
                  }}
                >
                 
                    <Alert variant="danger">
        
                    <span>
                      <h4 style={{margin:'10px 0'}}>Email Verification Required</h4>
                      <p>We have sent an email to your email address (<b>{this.state.currentUser.email}</b>) with a link for activating your account and proving you are human.</p>
                      
                      <Button
                                                                      className="btn-fill"
                                                                      type="button"
                                                                      variant="danger"
                                                                      disabled={this.state.activeLoading}
                                                                      onClick={
                                                                        this.handleResend
                                                                      }
                                                >
                                                  {this.state.activeLoading && (
                                                    <span className="spinner-border spinner-border-sm  fa-wd"></span>
                                                  )}
                                                  <span> Resend</span>
                                                                      
                                                                    
                                                                      
                                                                    </Button> 
                                                                    <Button
                                                                      style={{marginLeft:10}}
                                                                      type="button"
                                                                      variant="warning"
                                                                      disabled={this.state.activeLoading}
                                                                      onClick={
                                                                        this.handleDelete
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
    
}

export default withRouter(Active) ;