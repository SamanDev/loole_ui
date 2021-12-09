import React from 'react'
import { Checkbox } from 'semantic-ui-react'

const CheckboxToggle = (prop) => <Checkbox toggle defaultChecked={prop.check} />

export default CheckboxToggle