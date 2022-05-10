import React, { useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { Header } from "semantic-ui-react";
import {
  handleTagForm,
  printTag,
  haveAdmin,
  haveGameTag,
} from "components/include";
import { Row, Col } from "react-bootstrap";
import UserContext from "context/UserState";
import { Button, Icon, Card, Statistic, Segment } from "semantic-ui-react";
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
  const [userKey, setUserKey] = useState(
    prop.findStateId(myState, "profileUser")
  );
  const [isID, setIsID] = useState(false);
  const context = useContext(UserContext);
  const { uList, setUList } = context;
  useEffect(() => {
    setMyState(prop.myState);
  }, [prop.myState]);
  useEffect(() => {
    if (!userKey) {
      setUserKey(uList.currentUser);
    }
  }, [uList.currentUser]);

  if (!userKey) {
    setUserKey(uList.currentUser);
  }
  const currentUser = userKey;
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
        <>
          <Statistic size="mini" color="red" className="notconnected">
            {uList.currentUser.userTags == userTags ? (
              <Statistic.Value>Click to connect</Statistic.Value>
            ) : (
              <Statistic.Value>Login to connect</Statistic.Value>
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

          {currentUser.userTags == userTags ||
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
    userService.deleteTag(id).then(
      (response) => {
        setIsLoading(false);
        setIsID(false);
        if (response.data?.accessToken) {
          if (response.data?.username == uList.currentUser.username) {
            localStorage.setItem("user", JSON.stringify(response.data));
            setUList({ currentUser: response.data });
            //setUserKey(response.data);
          } else {
            setUserKey(response.data);
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
  return (
    <>
      {!prop.myStateLoc && (
        <Header as="h2">
          <Icon name="hashtag" />
          <Header.Content>
            Game Tags
            <Header.Subheader>Manage your Game Tags</Header.Subheader>
          </Header.Content>
        </Header>
      )}
      <Segment padded basic={prop.myStateLoc ? true : false}>
        <Card.Group
          className="fours card-tags"
          stackable
          doubling
          itemsPerRow="3"
          style={{ marginBottom: 20, textAlign: "left" }}
        >
          {arrLogos.map((number, i) => (
            <Card
              fluid
              key={i.toString()}
              onClick={() =>
                handleTagForm(arrTagMode[i], arrPlatform[i], userKey)
              }
              color={
                haveGameTag(arrTagMode[i], userKey?.userTags) ? "green" : "red"
              }
            >
              <div
                style={
                  haveGameTag(arrTagMode[i], userKey?.userTags)
                    ? { opacity: 1 }
                    : { opacity: 0.5 }
                }
              >
                <div className="img">
                  <img
                    alt={number}
                    src={"/assets/images/logos/" + number}
                    width="auto"
                    height="90"
                  />
                </div>
                {getGameTag(arrTagMode[i], currentUser?.userTags)}
              </div>
            </Card>
          ))}
        </Card.Group>
      </Segment>
    </>
  );
}

export default withRouter(TagsForm);
