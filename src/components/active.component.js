import React, { useEffect, useState } from "react";
import Form from "react-validation/build/form";

import { withRouter } from "react-router-dom";
import userService from "services/user.service";
import { Message,Button,Divider } from "semantic-ui-react";
import Swal from "sweetalert2";

function Active(prop) {
  const [loading, setLoading] = useState(false);

  const [myState, setMyState] = useState(prop.myState);
  useEffect(() => {
    setMyState(prop.myState);
  }, [prop.myState]);
  var currentUser = prop.findStateId(myState, "currentUser");

  const handleResend = (e) => {
    e.preventDefault();
    setLoading(true);

    userService.resendActive().then(
      (response) => {
        if (response == "Activation link sent to your email.") {
          Swal.fire(
            "",
            "Activation link send to <b>" +
              currentUser.email +
              "</b> successfully.",
            "success"
          ).then((result) => {
            setLoading(false);
          });
        } else {
          setLoading(false);

          var resMessage = response;
          Swal.fire({
            title: "Error!",
            text: resMessage,
            icon: "error",
            showCancelButton: false,
            confirmButtonText: `Ok`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              //this.props.history.push("/panel/cashier");
            }
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
  };
  const handleDelete = (e) => {
    e.preventDefault();
    setLoading(true);
    userService.handleDelete().then((response) => {
      if (response == "Ok") {
        this.props.history.push("/auth/register-page");
      }
    });
  };
  if (!currentUser?.userActivate) {
    return (
      <>
        <Form className="myalert">
          <Message negative>
            <Message.Header>Email Verification Required</Message.Header>
            <Message.Content>
              <p>
              We have sent an email to your email address (
              <b>{currentUser.email}</b>) with a link for activating your
              account and proving you are human.
            </p>
            <Button
              inverted color='red' 
              loading={loading}
              onClick={handleResend}
            >
              Resend
            </Button>
            <Button
              style={{ marginLeft: 10 }}
              className=" actbtn"
              type="button"
              variant="warning"
              onClick={handleDelete}
            >
              <span> Edit</span>
            </Button>
            </Message.Content>
          </Message>
        </Form>
        <Divider  hidden/>
      </>
    );
  } else {
    return null;
  }
}
export default withRouter(Active);
