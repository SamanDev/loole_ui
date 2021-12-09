import React, { Component } from "react";
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
import QRCode from "react-qr-code";
import CryptoList from 'components/CryptoList'
import ModalExampleShorthand from "components/modal.component";
import { Icon, Step } from 'semantic-ui-react'
import eventBus from "views/eventBus";
import {
    Row,
    Col,
    Card,
    Button
  
  } from "react-bootstrap";
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
  

class CrDeposit extends Component {
  constructor(props) {
    super(props);
    this.setAmount = this.setAmount.bind(this);
    this.setCoin = this.setCoin.bind(this);
    
    
    
    this.setDepositPage = this.setDepositPage.bind(this);

    this.handleGoNext = this.handleGoNext.bind(this);
    
    this.handleShetabDeposit = this.handleShetabDeposit.bind(this);
    

    this.state = {
      currentUser: this.props.token,
      coins: this.props.coins,
      paydetails: '',
      shetabGo: 0,
      Amount: "10",
      Coin: "btc",
      
      checkbox:"",
      successful: false,
      loading: false,
      message: ""
    };
  }
  componentWillReceiveProps(newProps) {
    
     
    this.setState({ currentUser: newProps.token });
    this.setState({ coins: newProps.coins });

    
  }
  setAmount(e) {
    this.setState({
      Amount: e,
      submit: false,
    });
  }
  setCoin(e) {
   
    this.setState({
      Coin: e,
      submit: false,
    });
  }
  
  setDepositPage(e) {
    
    this.setState({
      shetabGo: e,
      successful: false,
      message: "",
      submit: false,
      loading: false,
    });
    
  }
  
  
  updateCheckbox(e) {
    this.setState({
      checkbox: e.target.checked
    });
  }
  
  handleGoNext(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
      loading: true
    });
   

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {

        this.setState({
            successful: false,
            loading: false
          });

      this.setState({ shetabGo: this.state.shetabGo + 1 });
    }else {
        this.setState({
          successful: false,
          loading: false
        });
      }
  }
  handleShetabDeposit(e) {
   
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
      
      loading: true
    });
   

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {

      userService
        .createDepositCyripto(
          'deposit',
          this.state.Amount,
          this.state.Coin,
         
        )
        .then(
          
          (response) => {
            
            if (response.address) {
              
              this.setDepositPage(1);
              
              this.setState({paydetails: response})
              
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
   let { currentUser,Coin,Amount,coins } = this.state;
  
   
    
    return (
      <>
      <Row>
                            <Col md="6">
                              <Form
                                onSubmit={this.handleShetabDeposit}
                                ref={(c) => {
                                  this.form = c;
                                }}
                              >
                                <Card className="stacked-form border-0">
                                  <Card.Header>
                                    <Card.Title as="h4">
                                      CryptoCurrency Deposit
                                    </Card.Title>
                                  </Card.Header>
                                  <Card.Body>
                                    {this.state.shetabGo == 0 && (
                                      <>
                                         <div className="form-group form-group-lg2">
                                          <label>Select Crypto</label>
                                          <CryptoList passedFunction={this.setCoin} coins={coins} value={Coin}
/>
                                          <Input
                                        type="hidden"
                                        
                                        value={Coin}
                                       
                                        
                                        validations={[required]}
                                      />
                                        </div>
                                        <div className="form-group form-group-lg2">
                                          <label>Amount</label>
                                          <div className="input-group">
                                            <span
                                              className="input-group-text"
                                              id="inputGroup-sizing-lg"
                                            >
                                              $
                                            </span>
                                            <IMaskInput
                                              className="form-control Amount form-control-lg2"
                                              type="tel"
                                              pattern="[1-9]{1}[0-9]"
                                              mask={"0000"}
                                              inputRef={(el) =>
                                                (this.input = el)
                                              }
                                              value={Amount}
                                              onAccept={this.setAmount}
                                              
                                            />
                                          </div>
                                          <Input
                                        type="hidden"
                                        
                                        value={Amount}
                                       
                                        
                                        validations={[required]}
                                      />
                                        </div>
                                        
                                      </>
                                    )}
                                    {this.state.shetabGo == 1 && (
                                      <>
                                      
                                      
                                      </>
                                    )}
                                    
                                  </Card.Body>
                                  <Card.Footer>
                                    {this.state.shetabGo == 0 && (
                                      <>
                                        
                                      <div className="form-group">
                                        <button
                                          className="btn btn-danger btn-wd btn-block"
                                          disabled={this.state.loading}
                                        >
                                          {this.state.loading && (
                                            <span className="spinner-border spinner-border-sm  fa-wd"></span>
                                          )}
                                          <span> Next</span>
                                        </button>
                                      </div>
                                      </>
                                    )}
                                  </Card.Footer>
                                </Card>
                                <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
                              </Form>
                            </Col>
                            <Col md="6">
                            <Step.Group fluid vertical size='mini'>
    <Step completed={(this.state.shetabGo == 0) ? (false):(true)} active={(this.state.shetabGo == 0) ? (true):(false)}>
      <Icon name='dollar sign' />
      <Step.Content>
        <Step.Title>Step 1</Step.Title>
        <Step.Description>Choose your coin and enter Amount</Step.Description>
      </Step.Content>
    </Step>

    <Step completed={(this.state.shetabGo <= 1) ? (false):(true)}   active={(this.state.shetabGo == 1) ? (true):(false)}>
      <Icon name='payment' />
      <Step.Content>
        <Step.Title>Step 2</Step.Title>
        <Step.Description>Pay coin</Step.Description>
      </Step.Content>
    </Step>

    <Step >
      <Icon name='info' />
      <Step.Content>
        <Step.Title>Confirm Order</Step.Title>
      </Step.Content>
    </Step>
  </Step.Group>
                              
                            </Col>
                          </Row>
        </>
    );
  }
}

export default withRouter(CrDeposit) ;