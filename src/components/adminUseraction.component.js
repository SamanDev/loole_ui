import React from 'react'
import { Button } from 'semantic-ui-react'

const ButtonGroupColored = (prop) => (
  <Button.Group color='gray'>
    <Button onClick={() => prop.setExMode('Data')}>Data</Button>
    <Button onClick={() => prop.setExMode('Report')}>Report</Button>
    <Button onClick={() => prop.setExMode('Events')}>Events</Button>
  </Button.Group>
)

export default ButtonGroupColored