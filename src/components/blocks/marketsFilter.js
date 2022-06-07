import React, { useEffect, useState, useContext } from "react";
import { Card } from "semantic-ui-react";
import MarketsMapBlock from "components/blocks/marketsMap";
import Market from "server/MarketNew";

const MarketsFilter = (prop) => {
  var newItem = [];

  Market?.map((_item, i) => {
    var item = JSON.parse(JSON.stringify(_item));
    var canShow = false;
    if (
      item.title.toLowerCase().indexOf(prop.filtermode.toLowerCase()) > -1 ||
      prop.filtermode == "All"
    ) {
      canShow = true;
    }

    if (canShow) {
      newItem.push(item);
    }
  });

  return (
    <Card.Group
      stackable
      doubling
      itemsPerRow="4"
      style={{ marginBottom: 20, textAlign: "left", marginTop: 20 }}
    >
      <MarketsMapBlock items={newItem} {...prop} />
    </Card.Group>
  );
};
export default MarketsFilter;
