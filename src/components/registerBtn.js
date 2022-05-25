import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "services/auth.service";
import { Button } from "semantic-ui-react";
import UserContext from "context/UserState";
const LandNavbar = (prop) => {
  const [myState, setMyState] = useState(prop.myState);
  useEffect(() => {
    setMyState(prop.myState);
  }, [prop.myState]);
  const context = useContext(UserContext);
  const { currentUser } = context.uList;
  const { setUList } = context;
  const openModalLogin = prop.findStateId(myState, "openModalLogin");
  useEffect(() => {
    if (currentUser?.accessToken && openModalLogin == true) {
      prop.onUpdateItem("openModalLogin", false);
    }
  }, [currentUser]);

  return (
    <>
      {currentUser?.accessToken ? (
        <Button
          size="massive"
          color={prop.color}
          as={Link}
          to="/panel/dashboard"
        >
          Go to Dashboard
        </Button>
      ) : (
        <Button
          size="massive"
          color={prop.color}
          onClick={() => {
            prop.onUpdateItem("openModalLogin", true);
            setTimeout(() => {
              prop.myFunction("togllehide", "Create Account");
            }, 10);
          }}
        >
          Don’t have an account?
          <br />
          <p style={{ marginTop: 5, fontWeight: "bold" }}>Create Account</p>
        </Button>
      )}
    </>
  );
};

export default LandNavbar;
