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
import {
  getModalTag,
  getSocialTag,
  haveSocialTag,
  isJson,
} from "components/include";
import { Header } from "semantic-ui-react";
import UserContext from "context/UserState";
var arrLogos = [
  "psn.svg",
  "xbox.svg",
  "8pool.png",
  "clashroyale.png",
  "activition.png",
  "epic.svg",
];
var arrTagMode = [
  "PSN",
  "XBOX",
  "8Pool",
  "ClashRoyale",
  "CallOfDuty",
  "Fortnite",
];
var arrPlatform = ["PSN", "XBOX", "Mobile", "Mobile", "Activition", "All"];
function TagsForm(prop) {
  const context = useContext(UserContext);
  const { currentUser } = context.uList;
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
            prop.onUpdateItem("currentUser", response.data);
            localStorage.setItem("user", JSON.stringify(response.data));

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
