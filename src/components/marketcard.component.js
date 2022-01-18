import React from "react";

import { getGroupBadgeBlock } from "components/include.js";
import { Button, Card, Image } from "semantic-ui-react";
// react-bootstrap components

function MatchCard(prop) {
  var item = prop.item;

  return (
    <Card>
      <Image
        alt={item.title}
        src={item.images[0].src}
        style={{ background: "gray !important", height: 167 }}
      />

      <div className="content extra">
        <Card.Header as="h5" style={{ textAlign: "left" }}>
          {item.title}
        </Card.Header>

        <Card.Description>
          <div
            className="content left floated "
            style={{ minHeight: 10, padding: 2 }}
          >
            {getGroupBadgeBlock("Point", item.price, "Fee", "left", "green")}
          </div>
          <div className="content right floated ">
            <Button color="red" size="mini">
              Buy
            </Button>
          </div>
        </Card.Description>
      </div>
    </Card>
  );
}
export default MatchCard;
