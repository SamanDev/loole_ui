import React from "react";
import AddToCalendarHOC from "react-add-to-calendar-hoc";
import Moment from "moment";
import {
  Statistic,
  Button,
  Icon,
  Divider,
  Grid,
  Segment,
  Accordion,
  Header,
  List,
  Dropdown,
} from "semantic-ui-react";
var moment = require("moment");
class Example extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var startTime = moment(this.props.item.startTime).format("YYYYMMDDTHHmmss");

    var endTime = moment(startTime)
      .add(this.props.item.timeMinute * this.props.item.eventLevel, "minutes")
      .format("YYYYMMDDTHHmmss");
    if (this.props.match) {
      startTime = moment(this.props.match.startTime).format("YYYYMMDDTHHmmss");
      endTime = moment(startTime)
        .add(this.props.item.timeMinute, "minutes")
        .format("YYYYMMDDTHHmmss");
    }
    const duration = parseFloat(this.props.item.timeMinute / 60);
    const eventInDifferentTimezone = {
      description: window.location.toString() + " " + this.props.desc,
      duration,
      endDatetime: endTime,
      startDatetime: startTime,
      title: this.props.tit,
    };

    const ATCDropdown = (args) => (
      <>
        <Button.Group
          vertical
          size="large"
          style={{ position: "absolute", left: 0, width: "100%", top: 45 }}
        >
          {args.children.map((link, i) => (
            <Button key={i} color="gray" className="add-to-container">
              {link}
            </Button>
          ))}
        </Button.Group>
      </>
    );

    const ATCWrapper = (args) => (
      <Button
        onClick={args.onClick}
        color="red"
        size="large"
        icon
        labelPosition="left"
        fluid
      >
        <Icon size="large" name="calendar plus outline" />
        {args.children}
      </Button>
    );
    const AddToCalendarDropdown = AddToCalendarHOC(ATCWrapper, ATCDropdown);

    return <AddToCalendarDropdown event={eventInDifferentTimezone} />;
  }
}
export default Example;
