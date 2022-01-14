import React, { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
function editCounry(options) {
  var newArray = [];

  if (options) {
    var getC = options.result;

    //options.map((item, w) => {
    Object.keys(getC).map(function (key) {
      var _obj = getC[key];
      var _val = key;
      var _txt = key;

      var newItem = {
        key: _val,
        value: _val,
        image: { avatar: true, src: _obj.image },
        text: _txt,
      };

      newArray.push(newItem);
    });
  }

  return newArray;
}
function CountrySelector(props) {
  const [options, setOptions] = useState(editCounry(props.coins));
  useEffect(() => {
    setOptions(() => editCounry(props.coins));
  }, [props.coins]);
  const changeHandler = (value, data) => {
    props.onUpdateItem("coin", data.value);
  };

  //return <Select className="picker form-control" options={options} value={value} onChange={props.passedFunction} />
  return (
    <Dropdown
      placeholder="Select Coin"
      fluid
      value={props.value}
      onChange={changeHandler}
      selection
      options={options}
    />
  );
}

export default CountrySelector;
