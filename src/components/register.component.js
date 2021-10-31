import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import {  withRouter} from 'react-router-dom';
import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
    
  }
};
const check = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert" style={{padding:5}}>
      
    </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
const checked = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.updateCheckbox = this.updateCheckbox.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      checkbox:"",
      successful: false,
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  updateCheckbox(e) {
    this.setState({
      checkbox: e.target.checked
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
      loading: true
    });
   

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        response => {
          this.setState({
            successful: false,
           
            loading: false
          });
          this.props.history.push("/panel/dashboard");
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage,
            loading: false
          });
        }
      );
    }else {
      this.setState({
        successful: false,
        loading: false
      });
    }
  }

  render() {
    return (
      <>
         
          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>
                <div className="form-group" style={{textAlign: 'left'}}>
                  <span style={{float:'left',marginRight: 10,width:20,height:60}}>
                <Input
                    type="checkbox"
                    className="form-control"
                    onChange={this.updateCheckbox}
                    id="terms"
                    value={this.state.checkbox}
                    validations={[check]}
                    
                  />
                  </span>
                  <label for="terms">
                  <small>By clicking Create Account, you are indicating that you have read and acknowledge the <a class="AFA0E7A2B453-repeatApp-396" href="/content/terms-and-conditions" target="_blank">Terms &amp; Conditions</a> and <a class="AFA0E7A2B453-repeatApp-396" href="/content/privacy-policy" target="_blank">Privacy policy</a>.</small>
                    
                    </label>
                   
                </div>
                <div className="form-group" style={{marginTop: 45}}>
              <button
                className="btn btn-warning btn-wd  btn-outline  btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span> Create Account</span>
              </button>
            </div>
               
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </>
    );
  }
}

export default withRouter(Register) ;