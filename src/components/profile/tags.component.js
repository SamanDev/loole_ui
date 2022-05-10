import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { Header } from "semantic-ui-react";
import { handleTagForm, printTag } from "components/include";
import { Row, Col } from "react-bootstrap";
import UserContext from "context/UserState";
import { Button, Icon } from "semantic-ui-react";
import Swal from "sweetalert2";
import userService from "services/user.service";

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
  const [myState, setMyState] = useState(prop.myState);
  const [isLoading, setIsLoading] = useState(false);
  const [isID, setIsID] = useState(false);
  const context = useContext(UserContext);
  const { uList, setUList } = context;
  useEffect(() => {
    setMyState(prop.myState);
  }, [prop.myState]);
  var _key = prop.findStateId(myState, "profileUser");
  if (!_key) {
    const context = useContext(UserContext);

    _key = context.uList.currentUser;
  }
  const currentUser = _key;
  const getGameTag = (game, userTags) => {
    var res = "Not Connected";
    var resName = "";
    var resID = "";

    if (userTags) {
      userTags.map(function (tag) {
        if (tag.gameName == game) {
          res = tag.tagId;
          resName = tag.nickName;
          resID = tag.id;
          if (resName == "") resName = "Connected";
          if (res != "" && game == "ClashRoyale") res = "#" + res;
          if (res != "" && game == "8Pool") res = printTag(game, res);
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
            onClick={() => {
              handleDelete(resID);
            }}
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
    userService.deleteTag(id).then(
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
  return (
    <>
      {!prop.myStateLoc && <Header as="h3">Game Tags</Header>}

      <Row className="card-tags" style={{ marginRight: 0 }}>
        {arrLogos.map((number, i) => (
          <Col
            lg="4"
            xl="3"
            md="4"
            xs="6"
            key={i.toString()}
            onClick={() =>
              handleTagForm(arrTagMode[i], arrPlatform[i], currentUser)
            }
          >
            <div className="counter-box bg-color-1 card">
              <div className="img">
                <img alt={number} src={"/assets/images/logos/" + number}></img>
                {getGameTag(arrTagMode[i], currentUser?.userTags)}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default withRouter(TagsForm);
