import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  Pagination,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import SockJsClient from 'react-stomp';

class SampleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    
      loading: false,
  
    };
  }
  
  sendMessage = (msg) => {
    this.clientRef.sendMessage('/topics/all', msg);
  }

  render() {
    return (
      <div>
        {!this.state.loading && (
          <SockJsClient url='https://loole.gg:8443' topics={['/topics/all']}
            onMessage={(msg) => { console.log(msg); }}
            onConnect={() => { this.setState({loading: true}) }}
            ref={ (client) => { this.clientRef = client }} />
        )}
        
      </div>
    );
  }
}
function AdminFooter() {
  return (
    <>
    
          <SampleComponent/>
    
    </>
  );
}

export default AdminFooter;
