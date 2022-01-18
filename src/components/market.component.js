import React, { useEffect, useState } from "react";
// react component used to create charts
// react components used to create a SVG / Vector map
import { Tab, Card, Menu, Label, Dimmer } from "semantic-ui-react";
import Active from "components/active.component";
// react-bootstrap components
import { Spinner } from "react-bootstrap";
import MarketCard from "components/marketcard.component";
import Market from "server/Market";

//const EventList = JSON.parse(userService.getEvents());

const getBlockChallenge = (filtermode, products) => {
  var newItem = [];

  products.map((item, i) => {
    if (i < 3) {
      newItem.push(item);
    }
  });
  return (
    <Card.Group className="fours" style={{ marginBottom: 20 }}>
      {printBlockProduct(newItem)}
    </Card.Group>
  );
};
export const printBlockProduct = (newItem) => {
  // const history = useHistory();

  if (newItem.length == 0) {
    //history.push("/home");
    return (
      <Dimmer active inverted>
        <div
          style={{
            textAlign: "center",
            color: "rgba(0,0,0,.5)",
            paddingTop: 30,
            width: "100%",
          }}
        >
          <img
            alt="nodata"
            style={{ height: 80 }}
            src="/assets/images/nodata.svg"
          ></img>
          <h4>Empty List.</h4>
          <h5>You currently don't have any event.</h5>
        </div>
      </Dimmer>
    );
  } else {
    return newItem.map((item, i) => {
      return <MarketCard key={i.toString()} item={item} />;
    });
  }
};

function Dashboard(prop) {
  const products = Market.getMarketplace;

  return <>{getBlockChallenge("All", products)}</>;
}

export default Dashboard;
