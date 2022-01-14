import React from "react";
import { Dropdown } from "semantic-ui-react";
import myCountry from "server/country.json";
function editCounry(options) {
  var newArray = [];
  options.map((item, w) => {
    var _val = item.value.toLowerCase();
    var _txt = item.label;
    var newItem = { key: _val, value: _val, flag: _val, text: _txt };

    newArray.push(newItem);
  });
  //console.log(newArray);
  return newArray;
}
function CountrySelector(prop) {
  var country = prop.value?.value;
  if (country) {
    country = country.toLowerCase();
  }
  const options = myCountry.myCountryList;
  const changeHandler = (value, data) => {
    //prop.passedFunction(value)

    var _val = {
      value: data.value.toUpperCase(),
      label: value.target.innerText,
    };

    prop.onUpdateItem("country", _val);
  };

  //return <Select className="picker form-control" options={options} value={value} onChange={prop.passedFunction} />
  return (
    <Dropdown
      placeholder="Select Country"
      fluid
      value={country}
      onChange={changeHandler}
      search
      selection
      autoComplete="false"
      options={options}
    />
  );
}

export default CountrySelector;
