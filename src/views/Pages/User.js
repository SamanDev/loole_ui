import React, { Component, useState, useEffect } from "react";

import { useAllEvents, useUserProfile } from "services/hooks";
import Profile from "views/ProfileUser";

function profile(prop) {
  var currentUser = window.location.href.split("user/")[1].replace("%20", " ");

  return (
    <>
      <div>
        <Profile user={currentUser} {...prop} />

        <div
          className="full-page-background"
          style={{
            backgroundImage: "url('/assets/img/bg.jpg')",
          }}
        ></div>
      </div>
    </>
  );
}

export default profile;
