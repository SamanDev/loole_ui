import React from "react";

import { getGroupBadgeBlock } from "components/include.js";
import { Label, Card, Image } from "semantic-ui-react";
// react-bootstrap components

function MatchCard(prop) {
  var item = prop.item;

  return (
    <Card>
      <Image alt={item.title} src={item.images[0].src} />

      <div className="content extra">
        <Card.Header style={{ textAlign: "left" }}>
          {item.title}
          <Label style={{ float: "right" }} size="small" basic></Label>
        </Card.Header>

        <Card.Description>
          <div
            className="content left floated "
            style={{ minHeight: 10, padding: 2 }}
          >
            {getGroupBadgeBlock("Point", item.price, "Fee", "left", "green")}
          </div>
        </Card.Description>
      </div>
    </Card>
  );
}
export default MatchCard;
