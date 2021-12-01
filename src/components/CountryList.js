import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { Dropdown } from 'semantic-ui-react'
import myCountry from "server/country.json"
function editCounry(options){
  var  newArray = []
  options.map((item, w) => {
    var _val = item.value.toLowerCase();
    var _txt = item.label;
    var newItem = { key: _val, value: _val, flag: _val, text: _txt }
   
    newArray.push(newItem)
  })
  console.log(newArray)
  return newArray
}
function CountrySelector(props) {
  const values = props.value;
  const options = (myCountry.myCountryList)
  const changeHandler = (value,data) => {
    //props.passedFunction(value)
   
    var _val = {value: data.value.toUpperCase(), label: value.target.innerText}
    props.passedFunction(_val)
  }
  
  console.log(values.value)

  //return <Select className="picker form-control" options={options} value={value} onChange={props.passedFunction} />
  return  <Dropdown
  placeholder='Select Country'
  fluid
  value={values.value.toLowerCase()}
  
  onChange={changeHandler}
  search
  selection
  autocomplete='false'
  options={options}
/>
}

export default CountrySelector