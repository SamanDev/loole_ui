import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { Dropdown } from 'semantic-ui-react'
import myCountry from "server/country.json"
import CryptoList from "server/crypto.json";
function editCounry(options){
  var  newArray = []
  options.map((item, w) => {
    
      var _val = item.key;
      var _txt = item.text + ' ('+ item.key.toUpperCase()+')';
      
      var newItem = { key: _val, value: _val, image: { avatar: true, src: "https://cdn.jsdelivr.net/npm/cryptocoins-icons@2.9.0/SVG/"+_val.toUpperCase()+".svg"}, text: _txt }
     
      newArray.push(newItem)
    
    
  })
  
  return newArray
}
function CountrySelector(props) {
  
  const options = editCounry(CryptoList.data)
  const changeHandler = (value,data) => {
   
    props.passedFunction(data.value)
  }
  

  //return <Select className="picker form-control" options={options} value={value} onChange={props.passedFunction} />
  return  <Dropdown
  placeholder='Select Coin'
  fluid
  value={props.value}
  onChange={changeHandler}
  
  selection
  autocomplete='false'
  options={options}
/>
}

export default CountrySelector