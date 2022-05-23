import React, { useState, useEffect } from "react";

import { getGroupBadgeBlock } from "components/include.js";
import { Button, Card, Image } from "semantic-ui-react";
// react-bootstrap components
import Swal from "sweetalert2";
var newM = [];
function MatchCard(prop) {
  var item = prop.item;
  var itemNew = {};
  var imgARR = item.images[0].src.split("/");
  var imgName = imgARR[imgARR.length - 1].replace(".png", ".webp");
  useEffect(() => {
    itemNew.title = item.title;
    itemNew.image = imgName;
    itemNew.price = item.price;
    newM.push(itemNew);
    console.log(newM);
  }, []);

  const errMs = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.accessToken != "") {
      Swal.fire(
        "Error!",
        "You do not have enough balance in your wallet to complete this transaction.",
        "error"
      ).then(() => {});
    } else {
      prop.onUpdateItem("openModalLogin", true);
    }
  };

  return (
    <Card>
      <Image
        alt={item.title}
        src={"/assets/market/" + imgName}
        width="302"
        height="167"
        className="img-responsive"
        style={{ background: "gray !important" }}
        fluid
      />

      <div className="content extra">
        <Card.Header as="div" style={{ textAlign: "left", fontSize: 15 }}>
          {item.title}
        </Card.Header>

        <Card.Description>
          <div
            className="content left floated "
            style={{ minHeight: 10, padding: 2 }}
          >
            {getGroupBadgeBlock(
              "Point",
              item.price * 100,
              "Fee",
              "left",
              "green"
            )}
          </div>
          <div
            className="content right floated "
            style={{ zIndex: 10, position: "relative" }}
          >
            <Button color="red" size="mini" onClick={() => errMs()}>
              Buy
            </Button>
          </div>
        </Card.Description>
      </div>
    </Card>
  );
}
export default MatchCard;
