import React, { useState } from "react";
import { DatePicker } from "react-rainbow-components";
import Moment from "moment";
var moment = require("moment");
export default function RainbowDatepicker(props) {
  const date = props.value;

  function onChange(date) {
   var newDate = new Date(date)
   var finaldate = moment(date)
   console.log(finaldate)
    props.onUpdateItem('birthday',finaldate)
  }
 
  return (
    <DatePicker
      id="datePicker-1"
      
      className="picker form-control"
      minDate={new Date("01/01/1960")}
      maxDate={new Date("01/01/2022")}
      value={date}
      onChange={onChange}
      
     
    />
  );
}