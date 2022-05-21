import React from "react";
import { DatePicker } from "react-rainbow-components";
import { Icon } from "semantic-ui-react";
var moment = require("moment");
export default function RainbowDatepicker(props) {
  const date = props.value;

  function onChange(date) {
    var newDate = new Date(date);
    var finaldate = moment(date);
    console.log(finaldate);
    props.onUpdateItem("birthday", finaldate);
  }

  return (
    <div className="rainbow-align-content_center rainbow-m-vertical_large rainbow-p-horizontal_small rainbow-m_auto">
      <DatePicker
        id="datePicker-1"
        className="picker"
        icon={<Icon name="search" />}
        minDate={new Date("01/01/1960")}
        maxDate={new Date("01/01/2005")}
        value={date}
        onChange={onChange}
      />
    </div>
  );
}
