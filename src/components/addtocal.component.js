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
function getchatTime(date) {
  var thisDate2 = date.replace("-07:00", "+00:00");
  var dateExpired = moment(thisDate2).local().format("YYYYMMDDTHHmmss");

  return dateExpired;
}
class Example extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var startTime = getchatTime(this.props.item.startTime);
    if (this.props.item.timeMinute && this.props.item.gameMode != "League") {
      var endTime = moment(startTime)
        .add(this.props.item.timeMinute * this.props.item.eventLevel, "minutes")
        .format("YYYYMMDDTHHmmss");
      var duration = parseFloat(this.props.item.timeMinute / 60);
    } else {
      var endTime = getchatTime(this.props.item.finished);
      var duration = parseFloat(endTime - startTime);
    }

    if (this.props.match) {
      startTime = getchatTime(this.props.match.startTime);
      endTime = moment(startTime)
        .add(this.props.item.timeMinute, "minutes")
        .format("YYYYMMDDTHHmmss");
    }

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
            <Button key={i} className="add-to-container">
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
