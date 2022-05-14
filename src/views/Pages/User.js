import React, { Component, useState, useEffect } from "react";

import { useAllEvents, useUserProfile } from "services/hooks";
import Profile from "views/ProfileUser";
import { useParams } from "react-router";
function profile(prop) {
  const params = useParams();

  const currentUser = params.username;

  return (
    <>
      <div>
        <Profile user={currentUser} {...prop} />
      </div>
    </>
  );
}

export default profile;
