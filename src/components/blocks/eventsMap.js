import React from "react";
import { Dimmer } from "semantic-ui-react";
import EventBlock from "components/blocks/event";
const EventsMapBlock = ({ items, filtermode, onUpdateItem }) => {
  // const history = useHistory();
  var filter = filtermode;
  if (filter == "all") {
    filter = "";
  }
  if (filter == "NoMobile") {
    filter = "Console";
  }

  if (items.length == 0) {
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
    return items.map((item, i) => {
      return <EventBlock key={i} item={item} onUpdateItem={onUpdateItem} />;
    });
  }
};
export default EventsMapBlock;
