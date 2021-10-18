import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'

function CountrySelector(props) {
  const value = props.value;
  const options = useMemo(() => countryList().getData(), [])

  const changeHandler = value => {
    setValue(value)
    console.log(value)
  }

  return <Select className="picker form-control" options={options} value={value} onChange={props.passedFunction} />
}

export default CountrySelector