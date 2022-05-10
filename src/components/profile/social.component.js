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
import { Card, Row, Col } from "react-bootstrap";
import { getModalTag, haveSocialTag, isJson } from "components/include";

import { Button, Icon, Header } from "semantic-ui-react";
import UserContext from "context/UserState";

function TagsForm(prop) {
  const context = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isID, setIsID] = useState(false);
  const { uList, setUList } = context;
  const { currentUser } = uList;
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
        <p style={{ opacity: 0.5, margin: 0, lineHeight: "20px" }}>
          <small className="text-muted">
            <b>{res}</b>
            <br />
            Click to connect
          </small>
        </p>
      );
    } else {
      return (
        <p style={{ margin: 0, lineHeight: "20px" }}>
          <small>
            <b>{resName}</b>
            <br />
            {res}
          </small>
          <Button
            icon
            color="red"
            size="mini"
            loading={isLoading && isID == resID}
            onClick={() => handleDelete(resID)}
            style={{ position: "absolute", top: -10, right: -10 }}
          >
            <Icon name="delete" />
          </Button>
        </p>
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
          localStorage.setItem("user", JSON.stringify(response.data));
          setUList({ currentUser: response.data });

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
        let jsonBool = isJson(response.data);

        if (jsonBool) {
          if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
            setUList({ currentUser: response.data });

            Swal.fire("", "Data saved successfully.", "success");
          }
        } else {
          Swal.fire("", response.data, "error");
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
  return (
    <>
      <Header as="h3">Social Accounts</Header>
      <div className="card-social">
        <Row className="card-tags" style={{ marginRight: 0 }}>
          <Col
            lg="4"
            xl="3"
            onClick={() =>
              handlecSetInstagram("Social - Instagram", "Instagram")
            }
          >
            <div className="counter-box bg-color-1 card">
              <div className="img">
                <FontAwesomeIcon
                  icon={faInstagram}
                  style={{ color: "#e95950" }}
                />
                {getSocialTag("Instagram", currentUser.userSocialAccounts)}
              </div>
            </div>
          </Col>
          <Col
            lg="4"
            xl="3"
            onClick={() => handlecSetInstagram("Social - Twitch", "Twitch")}
          >
            <div className="counter-box bg-color-1 card">
              <div className="img">
                <FontAwesomeIcon icon={faTwitch} style={{ color: "#6441a5" }} />
                {getSocialTag("Twitch", currentUser.userSocialAccounts)}
              </div>
            </div>
          </Col>
          <Col
            lg="4"
            xl="3"
            onClick={() => handlecSetInstagram("Social - Youtube", "Youtube")}
          >
            <div className="counter-box bg-color-1 card">
              <div className="img">
                <FontAwesomeIcon
                  icon={faYoutube}
                  style={{ color: "#FF0000" }}
                />
                {getSocialTag("Youtube", currentUser.userSocialAccounts)}
              </div>
            </div>
          </Col>
          <Col
            lg="4"
            xl="3"
            onClick={() => handlecSetInstagram("Social - Twitter", "Twitter")}
          >
            <div className="counter-box bg-color-1 card">
              <div className="img">
                <FontAwesomeIcon
                  icon={faTwitter}
                  style={{ color: "#00acee" }}
                />
                {getSocialTag("Twitter", currentUser.userSocialAccounts)}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default withRouter(TagsForm);
