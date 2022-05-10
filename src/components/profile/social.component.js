import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import userService from "services/user.service";
import Swal from "sweetalert2";
import Form from "react-validation/build/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTwitch,
  faYoutube,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Row, Col } from "react-bootstrap";
import {
  getModalTag,
  haveSocialTag,
  isJson,
  haveAdmin,
} from "components/include";

import {
  Button,
  Icon,
  Header,
  Card,
  Statistic,
  Segment,
} from "semantic-ui-react";
import UserContext from "context/UserState";

function TagsForm(prop) {
  const context = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isID, setIsID] = useState(false);
  const { uList, setUList } = context;
  const [userKey, setUserKey] = useState(
    prop.findStateId(prop.myState, "profileUser")
  );
  useEffect(() => {
    setUserKey(uList.currentUser);
  }, [uList.currentUser]);
  if (!userKey) {
    setUserKey(uList.currentUser);
  }
  const currentUser = userKey;

  const getSocialTag = (game, userTags) => {
    var res = "Not Connected";
    var resName = "";
    var resID = "";
    if (userTags) {
      userTags.map(function (tag) {
        if (tag.accountName == game) {
          res = tag.accountId;
          resID = tag.id;
          resName = "";
          if (resName == "") resName = "Connected";
        }
      });
    }
    res = res.split("@@")[0];
    if (res == "Not Connected") {
      return (
        <>
          <Statistic size="mini" color="red" className="notconnected">
            {currentUser.userSocialAccounts == userTags ? (
              <Statistic.Value>Click to connect</Statistic.Value>
            ) : (
              <Statistic.Label>Login to connect</Statistic.Label>
            )}
            <Statistic.Label>{res}</Statistic.Label>
          </Statistic>
          <Button
            icon
            color="red"
            size="mini"
            style={{ position: "absolute", top: 5, right: 5, opacity: 0 }}
          >
            <Icon name="delete" />
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Statistic size="mini" color="green">
            <Statistic.Value>{res}</Statistic.Value>
            <Statistic.Label>{resName}</Statistic.Label>
          </Statistic>

          {uList.currentUser.userSocialAccounts == userTags ||
          haveAdmin(uList.currentUser.roles) ? (
            <Button
              icon
              color="red"
              size="mini"
              loading={isLoading && isID == resID}
              disabled={isLoading && isID == resID}
              onClick={() => {
                handleDelete(resID);
              }}
              style={{ position: "absolute", top: 5, right: 5 }}
            >
              <Icon name="delete" />
            </Button>
          ) : (
            <Button
              icon
              color="red"
              size="mini"
              style={{ position: "absolute", top: 5, right: 5, opacity: 0 }}
            >
              <Icon name="delete" />
            </Button>
          )}
        </>
      );
    }
  };
  const handleDelete = (id) => {
    setIsLoading(true);
    setIsID(id);
    userService.deleteSocial(id).then(
      (response) => {
        setIsLoading(false);
        setIsID(false);
        if (response.data?.accessToken) {
          if (response.data?.username == uList.currentUser.username) {
            localStorage.setItem("user", JSON.stringify(response.data));
            setUList({ currentUser: response.data });
          }

          Swal.fire("", "Data saved successfully.", "success");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data,
          });
        }
      },
      (error) => {
        setIsLoading(false);
        setIsID(false);
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
    );
  };
  const handlecSetInstagram = (game, platform) => {
    const resetPw2 = async () => {
      const swalval = await Swal.fire(getModalTag(game));

      let v = (swalval && swalval.value) || swalval.dismiss;

      if (v) {
        if (v.tagid) {
          handleSaveSocial(platform, v.tagid);
        }
      }

      //setformdata(swalval);
    };
    if (!haveSocialTag(platform, currentUser.userSocialAccounts)) resetPw2();
  };
  const handleSaveSocial = (accountName, accountId) => {
    Swal.fire({
      title: "<br/>Please Wait...",
      text: "Is working..",
      customClass: "tag",
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    userService.saveSocial(accountName, accountId).then(
      (response) => {
        if (response.data?.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          setUList({ currentUser: response.data });

          Swal.fire("", "Data saved successfully.", "success");
        }
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        Swal.fire("Error!", resMessage, "error");
      }
    );
  };
  const _block = (mode, icon) => {
    return (
      <Card
        fluid
        onClick={() => handlecSetInstagram("Social - " + mode, mode)}
        color={
          haveSocialTag(mode, currentUser.userSocialAccounts) ? "green" : "grey"
        }
      >
        <div
          style={
            haveSocialTag(mode, currentUser.userSocialAccounts)
              ? { opacity: 1 }
              : { opacity: 0.5 }
          }
        >
          <div className="img">{icon}</div>
          {getSocialTag(mode, currentUser.userSocialAccounts)}
        </div>
      </Card>
    );
  };
  return (
    <>
      <Header as="h2">
        <Icon name="osi" />
        <Header.Content>
          Social Accounts
          <Header.Subheader>Manage your Social Accounts</Header.Subheader>
        </Header.Content>
      </Header>
      <Segment padded>
        <Card.Group
          className="fours card-social card-tags"
          stackable
          doubling
          itemsPerRow="4"
          style={{ marginBottom: 20, textAlign: "left" }}
        >
          {_block(
            "Instagram",
            <FontAwesomeIcon icon={faInstagram} style={{ color: "#e95950" }} />
          )}
          {_block(
            "Twitch",
            <FontAwesomeIcon icon={faTwitch} style={{ color: "#6441a5" }} />
          )}
          {_block(
            "Youtube",
            <FontAwesomeIcon icon={faYoutube} style={{ color: "#FF0000" }} />
          )}
          {_block(
            "Twitter",
            <FontAwesomeIcon icon={faTwitter} style={{ color: "#00acee" }} />
          )}
        </Card.Group>
      </Segment>
    </>
  );
}

export default withRouter(TagsForm);
