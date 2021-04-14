import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import {  withRouter} from 'react-router-dom';
import userService from "../services/user.service";
import AuthService from "../services/auth.service";
const required = value => {
  if (!value) {
    
    return (
      <div className={"alert alert-danger  " } role="alert">
        This field is required!
      </div>
    );
    
  }
  
};



class OldUser extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeInstagram = this.onChangeInstagram.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangeOldID = this.onChangeOldID.bind(this);
    this.onChangeBalance = this.onChangeBalance.bind(this);

    this.state = {
      instagram: this.props.data.currentUser.instagram,
      image: "",
      oldid: this.props.data.currentUser.oldUser,
      balance: this.props.data.currentUser.balance,
      successful: false,
      message: ""
    };
  }
 
  onChangeInstagram(e) {
    this.setState({
      instagram: e.target.value
    });
  }
  

  onChangeImage(e) {
    this.setState({
      image: e.target.value
    });
  }

  onChangeOldID(e) {
    this.setState({
      oldid: e.target.value
    });
  }

  onChangeBalance(e) {
    this.setState({
      balance: e.target.value
    });
  }
  
  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      userService.setOldInfo(
        this.state.instagram,
        this.state.image,
        this.state.oldid,
        this.state.balance
      ).then(
        response => {
          
          this.props.handleRefresh(this.state)
          this.setState({
            
            //image:(response.graphql.user.profile_pic_url)
            successful: true,
            message: "hi"
            
          });
          
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
            message: resMessage
          });
        }
      );
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
            
              <div>
                <div className="form-group">
                  <label htmlFor="instagram">Instagram ID</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="instagram"
                    value={this.state.instagram}
                    onChange={this.onChangeInstagram}
                    validations={[required]}
                  />
                </div>

                <div className="form-group hide">
                  <label htmlFor="image">Image</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="image"
                    value={this.state.image}
                    onChange={this.onChangeImage}
                   
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="oldid">Old  Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="oldid"
                    value={this.state.oldid}
                    onChange={this.onChangeOldID}
                    validations={[required]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="balance">Balance</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="balance"
                    value={this.state.balance}
                    onChange={this.onChangeBalance}
                    validations={[required]}
                  />
                </div>

                <div className="form-group" style={{marginTop: 45}}>
                  <button className="btn btn-primary"
                
                  >Save</button>
                </div>
              </div>
            

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

export default withRouter(OldUser) ;