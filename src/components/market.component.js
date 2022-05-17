import React, { lazy } from "react";
// react component used to create charts
// react components used to create a SVG / Vector map
import { Card, Dimmer } from "semantic-ui-react";
// react-bootstrap components
//import MarketCard from "components/marketcard.component";
import Market from "server/MarketNew";
//const Market = lazy(() => import("server/Market"));
const MarketCard = lazy(() => import("components/marketcardNew.component"));
//const EventList = JSON.parse(userService.getEvents());

function Dashboard(prop) {
  const products = Market;
  const getBlockChallenge = (filtermode, products) => {
    var newItem = [];

    products.map((item, i) => {
      if (i == 1 || i == 4 || i == 9 || i == 12 || i == 15 || i == 26) {
        newItem.push(item);
      }
    });
    return (
      <Card.Group
        centered
        className=" market"
        itemsPerRow="3"
        stackable
        doubling
        style={{ marginBottom: 20, textAlign: "left" }}
      >
        {printBlockProduct(newItem)}
      </Card.Group>
    );
  };
  const printBlockProduct = (newItem) => {
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
        return <MarketCard key={i.toString()} item={item} {...prop} />;
      });
    }
  };
  return <>{getBlockChallenge("all", products)}</>;
}

export default Dashboard;
