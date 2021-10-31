import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import {  withRouter} from 'react-router-dom';
import userService from "services/user.service";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
    Row,
    Col,
    Card,
  
  } from "react-bootstrap";
const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
    
  }
};


class PMDeposit extends Component {
  constructor(props) {
    super(props);
    this.seteVoucher = this.seteVoucher.bind(this);
    
    this.setactivatioCode = this.setactivatioCode.bind(this);
   
    this.handlePMDeposit = this.handlePMDeposit.bind(this);
    this.updateCheckbox = this.updateCheckbox.bind(this);

    this.state = {
        eVoucher: "",
        activatioCode: "",
      
      checkbox:"",
      successful: false,
      loading: false,
      message: ""
    };
  }

  seteVoucher(e) {
    this.setState({
      eVoucher: e.target.value.replace(/\D/, ""),
      submit: false,
    });
  }
  setactivatioCode(e) {
    this.setState({
      activatioCode: e.target.value.replace(/\D/, ""),
      submit: false,
    });
  }
  updateCheckbox(e) {
    this.setState({
      checkbox: e.target.checked
    });
  }
  onKeyPress(event) {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (/\+|-/.test(keyValue)) event.preventDefault();
  }
  handlePMDeposit(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
      loading: true
    });
   

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      userService
        .createDepositPM(this.state.eVoucher, this.state.activatioCode)
        .then(
          (response) => {
            if (response == "Create event successful") {
              Swal.fire("", "Data saved successfully.", "success").then(
                (result) => {
                  this.props.history.push("/panel/dashboard");
                }
              );
            } else {
              this.setState({
                successful: false,
                message: "",
                submit: false,
                loading: false,
              });
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
    } else {
      this.setState({
        successful: false,
        loading: false
      });
    }
  }
  

  render() {
    return (
      <>
      <Row>
                            <Col md="6">
         <Form
                                onSubmit={this.handlePMDeposit}
                              
                                ref={(c) => {
                                  this.form = c;
                                }}
                              >
                                  {!this.state.successful && (
                                      <div>
                                <Card className="stacked-form border-0">
                                  <Card.Header>
                                    <Card.Title as="h4">
                                      eVoucher PerfectMoney Deposit
                                    </Card.Title>
                                  </Card.Header>
                                  <Card.Body>
                                 
                                    <div className="form-group">
                                      <label htmlFor="voucher">Voucher Number</label>
                                      <Input
                                        type="tel"
                                        className="form-control eVoucher"
                                        pattern="[0-9]*"
                                        name="voucher"
                                        value={this.state.eVoucher}
                                        onChange={this.seteVoucher}
                                        onKeyPress={this.onKeyPress.bind(this)}
                                        validations={[required]}
                                      />
                                    </div>

                                    <div className="form-group">
                                      <label htmlFor="active">Activation Code</label>
                                      <Input
                                        type="tel"
                                        className="form-control  activatioCode"
                                        pattern="[0-9]*"
                                        name="active"
                                        value={this.state.activatioCode}
                                        onChange={this.setactivatioCode}
                                        onKeyPress={this.onKeyPress.bind(this)}
                                        validations={[required]}
                                      />
                                    </div>

                                  </Card.Body>
                                  <Card.Footer>
                                   
                                      <div className="form-group">
                                        <button
                                          className="btn btn-danger btn-wd btn-block"
                                          disabled={this.state.loading}
                                        >
                                          {this.state.loading && (
                                            <span className="spinner-border spinner-border-sm  fa-wd"></span>
                                          )}
                                          <span> Deposit</span>
                                        </button>
                                      </div>
                                    
                                  </Card.Footer>
                                </Card>
                                <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
            </div>
                                  )}
                              </Form>
                              </Col>
                            <Col md="6">
                              <Card className="stacked-form border-0">
                                <Card.Header>
                                  <Card.Title as="h4">
                                    How find eVoucher PerfectMoney?
                                  </Card.Title>
                                </Card.Header>
                                <Card.Body>hi</Card.Body>
                              </Card>
                            </Col>
                          </Row>
        </>
    );
  }
}

export default withRouter(PMDeposit) ;