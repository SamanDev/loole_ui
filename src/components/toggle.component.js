import React from "react";
import { Checkbox } from "semantic-ui-react";

const CheckboxToggle = (prop) => (
  <Checkbox
    toggle
    defaultChecked={prop.check}
    user={prop.user}
    userkey={prop.userkey}
    onChange={prop.onChange}
    disabled={prop.disabled}
  />
);

export default CheckboxToggle;
