import React, { useState, useMemo, useEffect} from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { Dropdown } from 'semantic-ui-react'
import myCountry from "server/country.json"
import CryptoList from "server/crypto.json";
function editCounry(options){
  var  newArray = []
 
  if(options){
    var getC = options.result;
    console.log(getC)
    //options.map((item, w) => {
      Object.keys(getC).map(function(key) {
      var _obj = getC[key];
      var _val = key;
      var _txt = key;
      
      var newItem = { key: _val, value: _val, image: { avatar: true, src: _obj.image}, text: _txt }
     
      newArray.push(newItem)
    
    
  })
  }
  
  console.log(newArray)
  return newArray
}
function CountrySelector(props) {

  const [options,setOptions] = useState(editCounry(props.coins))
  useEffect(() => {
    
    setOptions(() => editCounry(props.coins))
   
  }, [props.coins]);
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