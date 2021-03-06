import React, { useEffect, useState, useContext } from "react";
import { Form, Header, Segment, Icon } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import userService from "services/user.service";
import Swal from "sweetalert2";
import CountryList from "components/CountryList";
import Birthday from "components/Birthday";
import Avatar from "react-avatar";
import { Row, Col, Card } from "react-bootstrap";
import { defUser } from "const";
import UserContext from "context/UserState";
import { userDetails, setAvatar } from "components/include";
import Moment from "moment";
var moment = require("moment");
function editCounry(item) {
  var _val = item.value.toLowerCase();
  var _txt = item.label;
  var newItem = { key: _val, value: _val, flag: _val, text: _txt };

  return newItem;
}

function ProfileForm(prop) {
  const context = useContext(UserContext);
  const { currentUser } = context.uList;

  var [myStateLoc, setMyStateLoc] = useState({
    list: [
      { id: "name", val: currentUser.fullName },
      { id: "country", val: currentUser.country },
      { id: "birthday", val: currentUser.birthday },
      { id: "loading", val: false },
      { id: "submit", val: false },
      { id: "hasError", val: false },
    ],
  });

  const updateHandler = (e, data) => {
    var val = data.value;
    if (!data.value) {
      val = data.checked;
      if (data.checked == false) {
        val = "";
      }
    }
    onUpdateItem(data.name, val);
    if (val && val != "") {
      onUpdateItem("hasError", false);
    }
  };
  const findStateId = (st, val) => {
    return st.list.filter(function (v) {
      return v.id === val;
    })[0].val;
  };
  const onUpdateItem = (key, val) => {
    setMyStateLoc(() => {
      const list = myStateLoc.list.map((item) => {
        if (item.id === key) {
          item.val = val;
        }
        return item;
      });

      return {
        list: list,
      };
    });
  };
  const getError = (data, _content, _pointing) => {
    var _error = null;
    if (findStateId(myStateLoc, "submit")) {
      if (data == "" || !data) {
        _error = { content: _content, pointing: _pointing };
        if (_pointing == "") {
          _error = true;
        }
      }
    }
    if (_error && !findStateId(myStateLoc, "hasError")) {
      onUpdateItem("hasError", true);
    }
    if (_error && findStateId(myStateLoc, "loading")) {
      onUpdateItem("loading", false);
    }
    return _error;
  };

  const printErr = (error) => {
    if (
      error?.response?.data?.status == 401 ||
      error?.data?.status == 401 ||
      error?.response?.data?.details[0] == "Access is denied"
    ) {
      prop.onUpdateItem("openModalLogin", true);
      localStorage.setItem("user", JSON.stringify(defUser));
      prop.onUpdateItem("currentUser", defUser);
    } else {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: resMessage,
      });
    }
  };

  const handleSubmitInfo = () => {
    var name = findStateId(myStateLoc, "name");
    var country = findStateId(myStateLoc, "country");
    var birthday = findStateId(myStateLoc, "birthday");
    if (!birthday) {
      birthday = "01/01/1990";
    } else {
      birthday = moment(birthday).format("MM/DD/YYYY");
    }
    onUpdateItem("loading", true);

    if (
      !findStateId(myStateLoc, "hasError") &&
      findStateId(myStateLoc, "submit")
    ) {
      userService
        .editInfo(name, country, birthday)
        .then(
          (response) => {
            onUpdateItem("loading", false);

            if (response.data.accessToken) {
              //prop.onUpdateItem("currentUser", response.data);
              localStorage.setItem("user", JSON.stringify(response.data));

              context.setUList({
                currentUser: response.data,
              });
              //setCurrentUser(response.data);
              setMyStateLoc({
                list: [
                  { id: "name", val: response.data.fullName },
                  { id: "country", val: response.data.country },
                  { id: "birthday", val: response.data.birthday },
                  { id: "loading", val: false },
                  { id: "submit", val: false },
                  { id: "hasError", val: false },
                ],
              });

              Swal.fire("", "Data saved successfully.", "success");
            }
          },
          (error) => {
            printErr(error);
          }
        )
        .catch((error) => {
          printErr(error);
        });
    }
  };
  var nameLoc = findStateId(myStateLoc, "name");
  var countryLoc = findStateId(myStateLoc, "country");
  var birthdayLoc = findStateId(myStateLoc, "birthday");
  var loading = findStateId(myStateLoc, "loading");
  var str = currentUser.username;
  var res = str.substring(0, 1);
  res = setAvatar(str);
  return (
    <>
      <Header as="h2">
        <Icon name="user" />
        <Header.Content>
          Profile
          <Header.Subheader>Manage your Accounts Performance</Header.Subheader>
        </Header.Content>
      </Header>
      <Row>
        <Col md="8" sm="6" style={{ marginBottom: 30 }}>
          <Segment>
            <Form onSubmit={handleSubmitInfo} size="small">
              <Form.Input
                fluid
                name="username"
                label="Username"
                placeholder="Username"
                value={currentUser.username}
                readOnly
                icon="user"
                iconPosition="left"
                action={{
                  color: "teal",
                  disabled: true,
                  icon: "check",
                }}
              />
              <Form.Input
                fluid
                name="email"
                label="Email"
                placeholder="Email"
                value={currentUser.email}
                readOnly
                icon="at"
                iconPosition="left"
                action={{
                  color: "teal",
                  disabled: true,
                  icon: "check",
                }}
              />

              <Form.Input
                error={getError(nameLoc, "Please enter your name", "")}
                fluid
                name="name"
                label="Full Name"
                placeholder="Full Name"
                value={nameLoc ? nameLoc : ""}
                onChange={updateHandler}
                icon="male"
                iconPosition="left"
              />
              <Form.Field>
                <label>Country</label>
                <CountryList value={countryLoc} onUpdateItem={onUpdateItem} />
              </Form.Field>
              <Form.Field>
                <label>Birthday</label>

                <Birthday
                  onUpdateItem={onUpdateItem}
                  value={birthdayLoc ? birthdayLoc : "01/01/1990"}
                />
              </Form.Field>

              <Form.Button
                loading={loading}
                disabled={loading}
                style={{ marginBottom: 30 }}
                color="green"
                onClick={() => onUpdateItem("submit", true)}
                fluid
                size="large"
                content="Update Profile"
              />
            </Form>
          </Segment>
        </Col>
        <Col md="4" className="text-center">
          <Segment placeholder tertiary>
            <a href={"/user/" + currentUser.username} target="_blank">
              <Avatar
                size="100"
                style={{
                  margin: "-20px auto",
                  position: "relative",
                  top: "-50px",
                }}
                title={currentUser.username}
                name={res}
                round={true}
              />
            </a>

            {userDetails(currentUser)}
          </Segment>
        </Col>
      </Row>
    </>
  );
}

export default ProfileForm;
