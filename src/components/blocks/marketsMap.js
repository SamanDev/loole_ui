import React from "react";
import { Dimmer } from "semantic-ui-react";
import MarketBlock from "components/blocks/market";
const MarketsMapBlock = (prop) => {
  if (prop.items.length == 0) {
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
          <h5>There are currently no events.</h5>
        </div>
      </Dimmer>
    );
  } else {
    return prop.items.map((item, i) => {
      return <MarketBlock key={i} item={item} {...prop} />;
    });
  }
};
export default MarketsMapBlock;
