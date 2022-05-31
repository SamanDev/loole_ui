import React from "react";

import { Button, Icon, Flag } from "semantic-ui-react";
const LandNavbar = (prop) => {
  var _link = "https://looleblog.blogspot.com";
  var _title = "وبلاگ فارسی لوله";
  var _dir = "ltr";

  if (prop.game) {
    if (prop.lang == "ir") {
      _link = _link + "/search/label/" + prop.game;
      _title = "فارسی";
      _dir = "rtl";
    }
    if (prop.lang == "gb") {
      _link = _link + "/search/label/" + prop.game + "?to=en";
      _title = "English";
    }
    if (prop.lang == "tr") {
      _link = _link + "/search/label/" + prop.game + "?to=tr";
      _title = "Türkçe";
    }
    if (prop.lang == "ru") {
      _link = _link + "/search/label/" + prop.game + "?to=ru";
      _title = "Russian";
    }
    if (prop.lang == "sa") {
      _link = _link + "/search/label/" + prop.game + "?to=ar";
      _title = "Arabic";
      _dir = "rtl";
    }
    if (prop.lang == "es") {
      _link = _link + "/search/label/" + prop.game + "?to=es";
      _title = "Spanish";
    }
  } else {
    if (prop.lang == "ir") {
      _title = "فارسی";
      _dir = "rtl";
    }
    if (prop.lang == "gb") {
      _link = _link + "?to=en";
      _title = "English";
    }
    if (prop.lang == "tr") {
      _link = _link + "?to=tr";
      _title = "Türkçe";
    }
    if (prop.lang == "ru") {
      _link = _link + "?to=ru";
      _title = "Russian";
    }
    if (prop.lang == "sa") {
      _link = _link + "?to=ar";
      _title = "Arabic";
      _dir = "rtl";
    }
    if (prop.lang == "es") {
      _link = _link + "?to=es";
      _title = "Spanish";
    }
  }
  return (
    <>
      <Button as="a" href={_link} target="_blank" fluid color={prop.color}>
        <Flag
          name={prop.lang}
          style={{
            transform: "scale(1.5)",
            transformOrigin: "center",
            margin: 0,
          }}
        />
        <div
          style={{
            direction: _dir,
            display: "block",
            paddingTop: 5,
            fontSize: 12,
          }}
          className="mobile hidden"
        >
          {_title}
        </div>
      </Button>
    </>
  );
};

export default LandNavbar;
