import React, { Component, useState, useEffect } from "react";

import { useAllEvents, useUserProfile } from "services/hooks";
import Profile from "views/ProfileUser";
import { useParams } from "react-router";
function profile(prop) {
  const params = useParams();

  const currentUser = params.username;
  useEffect(() => {
    var _title = currentUser + " profile | Loole.gg";
    document.title = _title.replace(/-/g, " ");
    return () => {};
  }, []);
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
