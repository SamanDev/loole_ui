import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { withRouter } from "react-router-dom";
import userService from "services/user.service";
import Swal from "sweetalert2";

import eventBus from "views/eventBus";
import { Card } from "react-bootstrap";
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class PasswordForm extends Component {
  constructor(props) {
    super(props);
    this.setNewPassword = this.setNewPassword.bind(this);

    this.setNewPasswordR = this.setNewPasswordR.bind(this);

    this.handleChangePassword = this.handleChangePassword.bind(this);

    this.state = {
      newPassword: "",
      newPasswordR: "",

      successful: false,
      loading: false,
      message: "",
    };
  }
  componentDidMount() {
    eventBus.on("eventsDataPass", (event) => {
      Swal.fire("", event, "success");
    });
  }
  setNewPassword(e) {
    this.setState({
      newPassword: e.target.value,
      submit: false,
    });
  }
  setNewPasswordR(e) {
    this.setState({
      newPasswordR: e.target.value,
      submit: false,
    });
  }

  handleChangePassword(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
      loading: true,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      if (this.state.newPassword != this.state.newPasswordR) {
        Swal.fire(
          "",
          "NEW PASSWORD and REPEAT PASSWORD is not match.",
          "error"
        );
        this.setState({
          message: "",
          successful: false,
          loading: false,
        });
      } else {
        userService.changePassword(this.state.newPassword).then((response) => {
          if (response == "Waiting...") {
            this.setState({
              message: "",
              successful: false,
              loading: false,
            });
            Swal.fire({
              title: "Confirm action",
              html: "Please check your mailbox and click the link to confirm this action.",
              timer: 300000,
              timerProgressBar: true,
              allowOutsideClick: false,
              allowEscapeKey: false,
              allowEnterKey: false,
              didOpen: () => {
                Swal.showLoading();
              },
              willClose: () => {},
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
              }
            });
          }
        });
      }
    } else {
      this.setState({
        successful: false,
        loading: false,
      });
    }
  }

  render() {
    return (
      <>
        <Form
          onSubmit={this.handleChangePassword}
          ref={(c) => {
            this.form = c;
          }}
        >
          {!this.state.successful && (
            <div>
              <Card className="card-plain" style={{ margin: -10 }}>
                <Card.Header>
                  <Card.Title>Change Password</Card.Title>
                </Card.Header>
                <Card.Body>
                  <div className="form-group">
                    <label>New Password</label>
                    <Input
                      type="password"
                      className="form-control"
                      name="password"
                      value={this.state.newPassword}
                      onChange={this.setNewPassword}
                      validations={[required]}
                    />
                  </div>
                  <div className="form-group">
                    <label>Repeat Password</label>
                    <Input
                      type="password"
                      className="form-control"
                      name="password"
                      value={this.state.newPasswordR}
                      onChange={this.setNewPasswordR}
                      validations={[required]}
                    />
                  </div>

                  {this.state.message && (
                    <div className="form-group">
                      <div className="alert alert-danger" role="alert">
                        {this.state.message}
                      </div>
                    </div>
                  )}
                </Card.Body>
                <Card.Footer>
                  <div className="form-group">
                    <button
                      className="btn btn-primary btn-wd "
                      disabled={this.state.loading}
                    >
                      {this.state.loading && (
                        <span className="spinner-border spinner-border-sm  fa-wd"></span>
                      )}
                      <span> Save</span>
                    </button>
                  </div>
                </Card.Footer>
              </Card>

              <CheckButton
                style={{ display: "none" }}
                ref={(c) => {
                  this.checkBtn = c;
                }}
              />
            </div>
          )}
        </Form>
      </>
    );
  }
}

export default withRouter(PasswordForm);
