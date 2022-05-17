import React from "react";

import { Button, Icon, Flag } from "semantic-ui-react";
const LandNavbar = (prop) => {
  var _link = "https://loolefarsi.blogspot.com/";
  var _title = "وبلاگ فارسی لوله";
  var _dir = "ltr";
  if (prop.game) {
    if (prop.lang == "ir") {
      _link = "https://loolefarsi.blogspot.com/search/label/" + prop.game;
      _title = "راهنمای فارسی بازی " + prop.game;
      _dir = "rtl";
    }
  }
  return (
    <>
      <Button
        icon
        labelPosition="left"
        as="a"
        href={_link}
        target="_blank"
        style={{ direction: _dir, margin: 10 }}
        size="large"
      >
        <Icon name="help circle" />
        <Flag name={prop.lang} style={{ position: "relative", top: -1 }} />{" "}
        {_title}
      </Button>
    </>
  );
};

export default LandNavbar;
