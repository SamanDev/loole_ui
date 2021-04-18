import React, { useState } from "react";
import { DatePicker } from "react-rainbow-components";

export default function RainbowDatepicker() {
  const [date, setDate] = useState(null);

  function onChange(date) {
    setDate(date);
  }

  return (
    <DatePicker
      id="datePicker-1"
      
      className="picker form-control"
      minDate={new Date("01-01-1960")}
      maxDate={new Date("01-01-2002")}
      value={date}
      onChange={onChange}
      
     
    />
  );
}