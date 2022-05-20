import React from "react";

import { Button, Icon, Flag } from "semantic-ui-react";
const LandNavbar = (prop) => {
  var _link = "https://loolefarsi.blogspot.com/";
  var _title = "وبلاگ فارسی لوله";
  var _dir = "ltr";

  if (prop.lang == "gb") {
    _link = "https://loolefarsi.blogspot.com/search/label/" + prop.game;
    _title = "Loole.gg Blog";
  }
  if (prop.lang == "tr") {
    _link = "https://loolefarsi.blogspot.com/search/label/" + prop.game;
    _title = "Türkçe Loole.gg Blogu";
  }
  if (prop.game) {
    if (prop.lang == "ir") {
      _link = "https://loolefarsi.blogspot.com/search/label/" + prop.game;
      _title = "راهنمای فارسی بازی " + prop.game;
      _dir = "rtl";
    }
    if (prop.lang == "gb") {
      _link = "https://loolefarsi.blogspot.com/search/label/" + prop.game;
      _title = "English " + prop.game + " game guide";
    }
    if (prop.lang == "tr") {
      _link = "https://loolefarsi.blogspot.com/search/label/" + prop.game;
      _title = "Türkçe " + prop.game + " oyun rehberi ";
    }
  }
  return (
    <>
      <Button as="a" href={_link} target="_blank" size="small" fluid>
        <Flag name={prop.lang} />
        <div style={{ direction: _dir, display: "inline-block" }}>{_title}</div>
      </Button>
    </>
  );
};

export default LandNavbar;
